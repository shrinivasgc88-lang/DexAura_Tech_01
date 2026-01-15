from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form, Depends, Header
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
from contextlib import asynccontextmanager
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime, timezone
import uuid
import io

from models import (
    Customer, CustomerCreate, CustomerLogin, Quote, QuoteCreate,
    Order, OrderCreate, OrderItem, Attachment, InspectionRequest,
    BlogPost, Notification, ContactSubmission, AuditLog,
    OrderStatus, UserRole
)
from admin_models import (
    Lead, LeadStatus, FollowUp, Meeting, Project, ProjectStatus,
    Part, PartStatus, Supplier, SupplierAssignment, BlogPostCreate, BlogPostUpdate
)
from auth_service import get_password_hash, verify_password, create_access_token, verify_token
from cad_analyzer import CADAnalyzer
from email_service import email_service
from file_service import FileService

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize services
file_service = FileService(db)
cad_analyzer = CADAnalyzer()

# Create API router
api_router = APIRouter(prefix="/api")

@api_router.get("/test-route")
async def test_route():
    return {"message": "Route works"}

@api_router.get("/db-info")
async def db_info():
    return {
        "mongo_url": os.environ.get("MONGO_URL"),
        "database_name": os.environ.get("DB_NAME")
    }


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Dependency for getting current user
async def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.split("Bearer ")[1]
    payload = verify_token(token)
    
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user_id = payload.get("sub")
    user = await db.customers.find_one({"id": user_id}, {"_id": 0})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return Customer(**user)

# ===== AUTH ROUTES =====
@api_router.post("/auth/register")
async def register(customer_data: CustomerCreate):
    # Check if user exists
    existing = await db.customers.find_one({"email": customer_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create customer
    customer_dict = customer_data.model_dump()
    if customer_data.password:
        customer_dict["password_hash"] = get_password_hash(customer_data.password)
        del customer_dict["password"]
    
    customer_obj = Customer(**customer_dict)
    doc = customer_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.customers.insert_one(doc)
    
    # Create token
    token = create_access_token({"sub": customer_obj.id, "email": customer_obj.email})
    
    return {
        "customer": customer_obj,
        "access_token": token,
        "token_type": "bearer"
    }

@api_router.post("/auth/login")
async def login(credentials: CustomerLogin):
    user = await db.customers.find_one({"email": credentials.email}, {"_id": 0})
    
    if not user or not user.get("password_hash"):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": user["id"], "email": user["email"]})
    
    return {
        "customer": Customer(**user),
        "access_token": token,
        "token_type": "bearer"
    }

@api_router.post("/auth/google")
async def google_auth(google_token: dict):
    google_id = google_token.get("google_id")
    email = google_token.get("email")
    name = google_token.get("name")
    
    if not google_id or not email:
        raise HTTPException(status_code=400, detail="Invalid Google token")
    
    # Check if user exists
    user = await db.customers.find_one({"google_id": google_id}, {"_id": 0})
    
    if not user:
        # Create new user
        customer_data = CustomerCreate(
            email=email,
            name=name,
            google_id=google_id
        )
        customer_dict = customer_data.model_dump()
        customer_obj = Customer(**customer_dict)
        doc = customer_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.customers.insert_one(doc)
        user = doc
    
    token = create_access_token({"sub": user["id"], "email": user["email"]})
    
    return {
        "customer": Customer(**user),
        "access_token": token,
        "token_type": "bearer"
    }

@api_router.get("/auth/me")
async def get_me(current_user: Customer = Depends(get_current_user)):
    return current_user

# ===== QUOTE ROUTES =====
@api_router.post("/quotes/instant")
async def create_instant_quote(
    files: List[UploadFile] = File(...),
    customer_id: str = Form(...)
):
    try:
        # Analyze uploaded CAD files
        file_analyses = []
        attachments = []
        
        for file in files:
            # Upload to GridFS
            gridfs_id = await file_service.upload_file(file, {
                "entity_type": "quote",
                "uploaded_by": customer_id
            })
            
            # Mock CAD analysis (no AI/LLM)
            file_analyses.append({
                "file_name": file.filename,
                "file_size": file.size
            })
            
            # Create attachment record
            attachment = Attachment(
                entity_type="quote",
                entity_id="",
                file_name=file.filename,
                file_size=file.size,
                file_type=file.content_type or "application/octet-stream",
                gridfs_id=gridfs_id,
                uploaded_by=customer_id
            )
            attachments.append(attachment)
        
        # Batch analyze
        batch_result = cad_analyzer.batch_analyze(file_analyses)
        
        # Create quote
        quote = Quote(
            customer_id=customer_id,
            quote_type="instant",
            parts=batch_result["parts"],
            total_price=batch_result["total_price"],
            lead_time_days=batch_result["estimated_lead_time"],
            dfm_insights=batch_result["parts"][0]["dfm_insights"] if batch_result["parts"] else [],
            status="completed"
        )
        
        # Save quote
        quote_doc = quote.model_dump()
        quote_doc['created_at'] = quote_doc['created_at'].isoformat()
        quote_doc['updated_at'] = quote_doc['updated_at'].isoformat()
        await db.quotes.insert_one(quote_doc)
        
        # Update attachments with quote ID
        for attachment in attachments:
            attachment.entity_id = quote.id
            att_doc = attachment.model_dump()
            att_doc['uploaded_at'] = att_doc['uploaded_at'].isoformat()
            await db.attachments.insert_one(att_doc)
        
        # Notify admin
        await email_service.notify_admin_quote_request(quote_doc)
        
        # Create notification
        notification = Notification(
            recipient_id="admin",
            title="New Quote Request",
            message=f"Instant quote generated for {len(batch_result['parts'])} parts",
            type="quote",
            related_entity_id=quote.id
        )
        notif_doc = notification.model_dump()
        notif_doc['created_at'] = notif_doc['created_at'].isoformat()
        await db.notifications.insert_one(notif_doc)
        
        return {
            "quote": quote,
            "analysis": batch_result
        }
    except Exception as e:
        logger.error(f"Quote creation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/quotes")
async def get_quotes(customer_id: Optional[str] = None):
    query = {}
    if customer_id:
        query["customer_id"] = customer_id
    
    quotes = await db.quotes.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    
    for quote in quotes:
        if isinstance(quote['created_at'], str):
            quote['created_at'] = datetime.fromisoformat(quote['created_at'])
        if isinstance(quote['updated_at'], str):
            quote['updated_at'] = datetime.fromisoformat(quote['updated_at'])
    
    return quotes

@api_router.get("/quotes/{quote_id}")
async def get_quote(quote_id: str):
    quote = await db.quotes.find_one({"id": quote_id}, {"_id": 0})
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    if isinstance(quote['created_at'], str):
        quote['created_at'] = datetime.fromisoformat(quote['created_at'])
    if isinstance(quote['updated_at'], str):
        quote['updated_at'] = datetime.fromisoformat(quote['updated_at'])
    
    return quote

@api_router.post("/quotes/{quote_id}/share")
async def share_quote(quote_id: str, current_user: Customer = Depends(get_current_user)):
    quote = await db.quotes.find_one({"id": quote_id})
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    share_token = str(uuid.uuid4())
    await db.quotes.update_one(
        {"id": quote_id},
        {"$set": {"share_token": share_token}}
    )
    
    return {"share_token": share_token, "share_url": f"/quotes/shared/{share_token}"}

@api_router.get("/quotes/shared/{token}")
async def get_shared_quote(token: str):
    quote = await db.quotes.find_one({"share_token": token}, {"_id": 0})
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    return quote

# ===== ORDER ROUTES =====
@api_router.post("/orders")
async def create_order(order_data: OrderCreate, current_user: Customer = Depends(get_current_user)):
    order_count = await db.orders.count_documents({})
    order_number = f"ORD-2025-{str(order_count + 1).zfill(3)}"
    
    order = Order(
        customer_id=order_data.customer_id,
        quote_id=order_data.quote_id,
        order_number=order_number,
        order_type=order_data.order_type,
        total_amount=order_data.total_amount,
        notes=order_data.notes,
        timeline_events=[{
            "status": "New",
            "timestamp": datetime.now(timezone.utc).isoformat()
        }]
    )
    
    order_doc = order.model_dump()
    order_doc['created_at'] = order_doc['created_at'].isoformat()
    order_doc['updated_at'] = order_doc['updated_at'].isoformat()
    await db.orders.insert_one(order_doc)
    
    await email_service.notify_admin_new_order(order_doc)
    
    notification = Notification(
        recipient_id="admin",
        title="New Order Received",
        message=f"Order {order_number} has been placed",
        type="order",
        related_entity_id=order.id
    )
    notif_doc = notification.model_dump()
    notif_doc['created_at'] = notif_doc['created_at'].isoformat()
    await db.notifications.insert_one(notif_doc)
    
    audit = AuditLog(
        user_id=current_user.id,
        action="create_order",
        entity_type="order",
        entity_id=order.id
    )
    audit_doc = audit.model_dump()
    audit_doc['timestamp'] = audit_doc['timestamp'].isoformat()
    await db.audit_logs.insert_one(audit_doc)
    
    return order

@api_router.get("/orders")
async def get_orders(
    customer_id: Optional[str] = None,
    status: Optional[str] = None
):
    query = {}
    if customer_id:
        query["customer_id"] = customer_id
    if status:
        query["status"] = status
    
    orders = await db.orders.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    
    for order in orders:
        if isinstance(order['created_at'], str):
            order['created_at'] = datetime.fromisoformat(order['created_at'])
        if isinstance(order['updated_at'], str):
            order['updated_at'] = datetime.fromisoformat(order['updated_at'])
    
    return orders

@api_router.get("/orders/{order_id}")
async def get_order(order_id: str):
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if isinstance(order['created_at'], str):
        order['created_at'] = datetime.fromisoformat(order['created_at'])
    if isinstance(order['updated_at'], str):
        order['updated_at'] = datetime.fromisoformat(order['updated_at'])
    
    return order

@api_router.patch("/orders/{order_id}/status")
async def update_order_status(
    order_id: str,
    status: str,
    internal_notes: Optional[str] = None,
    current_user: Customer = Depends(get_current_user)
):
    order = await db.orders.find_one({"id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    timeline_events = order.get("timeline_events", [])
    timeline_events.append({
        "status": status,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "updated_by": current_user.id
    })
    
    update_data = {
        "status": status,
        "timeline_events": timeline_events,
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
    
    if internal_notes:
        update_data["internal_notes"] = internal_notes
    
    await db.orders.update_one(
        {"id": order_id},
        {"$set": update_data}
    )
    
    audit = AuditLog(
        user_id=current_user.id,
        action="update_order_status",
        entity_type="order",
        entity_id=order_id,
        changes={"status": status}
    )
    audit_doc = audit.model_dump()
    audit_doc['timestamp'] = audit_doc['timestamp'].isoformat()
    await db.audit_logs.insert_one(audit_doc)
    
    return {"message": "Order status updated"}

# ===== BLOG ROUTES =====
@api_router.get("/blog/posts")
async def get_blog_posts(category: Optional[str] = None):
    query = {"published": True}
    if category:
        query["category"] = category
    
    posts = await db.blog_posts.find(query, {"_id": 0}).sort("published_at", -1).to_list(100)
    
    for post in posts:
        if isinstance(post['published_at'], str):
            post['published_at'] = datetime.fromisoformat(post['published_at'])
        if isinstance(post['created_at'], str):
            post['created_at'] = datetime.fromisoformat(post['created_at'])
    
    return posts

@api_router.get("/blog/posts/{slug}")
async def get_blog_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    if isinstance(post['published_at'], str):
        post['published_at'] = datetime.fromisoformat(post['published_at'])
    if isinstance(post['created_at'], str):
        post['created_at'] = datetime.fromisoformat(post['created_at'])
    
    return post

# ===== CONTACT ROUTES =====
@api_router.post("/contact")
async def submit_contact(submission: ContactSubmission):
    submission_doc = submission.model_dump()
    submission_doc['created_at'] = submission_doc['created_at'].isoformat()
    await db.contact_submissions.insert_one(submission_doc)
    
    await email_service.notify_admin_contact_submission(submission_doc)
    
    notification = Notification(
        recipient_id="admin",
        title="New Contact Submission",
        message=f"{submission.submission_type} inquiry from {submission.name}",
        type="contact",
        related_entity_id=submission.id
    )
    notif_doc = notification.model_dump()
    notif_doc['created_at'] = notif_doc['created_at'].isoformat()
    await db.notifications.insert_one(notif_doc)
    
    return {"message": "Submission received", "id": submission.id}

# ===== NOTIFICATION ROUTES =====
@api_router.get("/notifications")
async def get_notifications(recipient_id: str):
    notifications = await db.notifications.find(
        {"recipient_id": recipient_id},
        {"_id": 0}
    ).sort("created_at", -1).limit(50).to_list(50)
    
    for notif in notifications:
        if isinstance(notif['created_at'], str):
            notif['created_at'] = datetime.fromisoformat(notif['created_at'])
    
    return notifications

@api_router.patch("/notifications/{notif_id}/read")
async def mark_notification_read(notif_id: str):
    await db.notifications.update_one(
        {"id": notif_id},
        {"$set": {"read": True}}
    )
    return {"message": "Notification marked as read"}

# ===== ADMIN ROUTES =====
@api_router.get("/admin/customers")
async def get_all_customers(
    skip: int = 0,
    limit: int = 50,
    search: Optional[str] = None,
    current_user: Customer = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    query = {}
    if search:
        query["$or"] = [
            {"email": {"$regex": search, "$options": "i"}},
            {"name": {"$regex": search, "$options": "i"}},
            {"company": {"$regex": search, "$options": "i"}}
        ]
    
    total = await db.customers.count_documents(query)
    customers = await db.customers.find(query, {"_id": 0}).skip(skip).limit(limit).to_list(limit)
    
    return {"total": total, "customers": customers}

@api_router.get("/admin/orders")
async def get_all_orders(
    skip: int = 0,
    limit: int = 50,
    status: Optional[str] = None,
    order_type: Optional[str] = None,
    current_user: Customer = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    query = {}
    if status:
        query["status"] = status
    if order_type:
        query["order_type"] = order_type
    
    total = await db.orders.count_documents(query)
    orders = await db.orders.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    
    return {"total": total, "orders": orders}

@api_router.get("/admin/audit-logs")
async def get_audit_logs(
    skip: int = 0,
    limit: int = 100,
    current_user: Customer = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    logs = await db.audit_logs.find({}, {"_id": 0}).sort("timestamp", -1).skip(skip).limit(limit).to_list(limit)
    
    for log in logs:
        if isinstance(log['timestamp'], str):
            log['timestamp'] = datetime.fromisoformat(log['timestamp'])
    
    return logs

@api_router.get("/admin/contact-submissions")
async def get_contact_submissions(
    skip: int = 0,
    limit: int = 50,
    current_user: Customer = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    total = await db.contact_submissions.count_documents({})
    submissions = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    
    return {"total": total, "submissions": submissions}

@api_router.patch("/admin/contact-submissions/{submission_id}")
async def update_contact_submission(
    submission_id: str,
    status: Optional[str] = None,
    current_user: Customer = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    update_data = {}
    if status:
        update_data["status"] = status
    
    result = await db.contact_submissions.update_one(
        {"id": submission_id},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Contact submission not found")
    
    return {"message": "Contact submission updated successfully"}

# ===== LEAD MANAGEMENT =====
@api_router.get("/admin/leads")
async def get_leads(
    status: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
    current_user: Customer = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    query = {}
    if status:
        query["status"] = status
    
    total = await db.leads.count_documents(query)
    leads = await db.leads.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    
    return {"total": total, "leads": leads}

@api_router.post("/admin/leads")
async def create_lead(lead_data: Lead, current_user: Customer = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    lead_doc = lead_data.model_dump()
    lead_doc['created_at'] = lead_doc['created_at'].isoformat()
    lead_doc['updated_at'] = lead_doc['updated_at'].isoformat()
    await db.leads.insert_one(lead_doc)
    return lead_data

@api_router.patch("/admin/leads/{lead_id}")
async def update_lead(
    lead_id: str,
    update_data: dict,
    current_user: Customer = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.leads.update_one({"id": lead_id}, {"$set": update_data})
    return {"message": "Lead updated"}

@api_router.get("/admin/leads/{lead_id}/followups")
async def get_followups(lead_id: str, current_user: Customer = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    followups = await db.followups.find({"lead_id": lead_id}, {"_id": 0}).sort("follow_up_date", -1).to_list(100)
    return followups

@api_router.post("/admin/followups")
async def create_followup(followup_data: FollowUp, current_user: Customer = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    followup_doc = followup_data.model_dump()
    followup_doc['follow_up_date'] = followup_doc['follow_up_date'].isoformat()
    followup_doc['created_at'] = followup_doc['created_at'].isoformat()
    await db.followups.insert_one(followup_doc)
    return followup_data

@api_router.post("/admin/meetings")
async def create_meeting(meeting_data: Meeting, current_user: Customer = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    meeting_doc = meeting_data.model_dump()
    meeting_doc['meeting_date'] = meeting_doc['meeting_date'].isoformat()
    meeting_doc['created_at'] = meeting_doc['created_at'].isoformat()
    await db.meetings.insert_one(meeting_doc)
    return meeting_data

@api_router.get("/admin/meetings")
async def get_meetings(
    lead_id: Optional[str] = None,
    customer_id: Optional[str] = None,
    current_user: Customer = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    query = {}
    if lead_id:
        query["lead_id"] = lead_id
    if customer_id:
        query["customer_id"] = customer_id
    
    meetings = await db.meetings.find(query, {"_id": 0}).sort("meeting_date", -1).to_list(100)
    return meetings

# ===== PROJECT MANAGEMENT =====
@api_router.get("/admin/projects")
async def get_projects(
    customer_id: Optional[str] = None,
    status: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
    current_user: Customer = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    query = {}
    if customer_id:
        query["customer_id"] = customer_id
    if status:
        query["status"] = status
    
    total = await db.projects.count_documents(query)
    projects = await db.projects.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    
    return {"total": total, "projects": projects}

@api_router.post("/admin/projects")
async def create_project(project_data: Project, current_user: Customer = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    count = await db.projects.count_documents({})
    project_data.project_number = f"PRJ-{datetime.now().year}-{str(count + 1).zfill(4)}"
    
    project_doc = project_data.model_dump()
    project_doc['created_at'] = project_doc['created_at'].isoformat()
    project_doc['updated_at'] = project_doc['updated_at'].isoformat()
    if project_doc.get('target_delivery_date'):
        project_doc['target_delivery_date'] = project_doc['target_delivery_date'].isoformat()
    
    await db.projects.insert_one(project_doc)
    return project_data

@api_router.get("/admin/projects/{project_id}/parts")
async def get_project_parts(project_id: str, current_user: Customer = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    parts = await db.parts.find({"project_id": project_id}, {"_id": 0}).to_list(100)
    return parts

@api_router.post("/admin/parts")
async def create_part(part_data: Part, current_user: Customer = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    part_doc = part_data.model_dump()
    part_doc['created_at'] = part_doc['created_at'].isoformat()
    part_doc['updated_at'] = part_doc['updated_at'].isoformat()
    if part_doc.get('due_date'):
        part_doc['due_date'] = part_doc['due_date'].isoformat()
    
    await db.parts.insert_one(part_doc)
    return part_data

@api_router.patch("/admin/parts/{part_id}")
async def update_part(part_id: str, update_data: dict, current_user: Customer = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.parts.update_one({"id": part_id}, {"$set": update_data})
    return {"message": "Part updated"}

# ===== SUPPLIER MANAGEMENT =====
@api_router.get("/admin/suppliers")
async def get_suppliers(
    capability: Optional[str] = None,
    active: Optional[bool] = None,
    current_user: Customer = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    query = {}
    if capability:
        query["capabilities"] = capability
    if active is not None:
        query["active"] = active
    
    suppliers = await db.suppliers.find(query, {"_id": 0}).sort("company_name", 1).to_list(100)
    return suppliers

@api_router.post("/admin/suppliers")
async def create_supplier(supplier_data: Supplier, current_user: Customer = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    supplier_doc = supplier_data.model_dump()
    supplier_doc['created_at'] = supplier_doc['created_at'].isoformat()
    await db.suppliers.insert_one(supplier_doc)
    return supplier_data

@api_router.post("/admin/assignments")
async def create_assignment(assignment_data: SupplierAssignment, current_user: Customer = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    assignment_doc = assignment_data.model_dump()
    assignment_doc['assigned_date'] = assignment_doc['assigned_date'].isoformat()
    assignment_doc['created_at'] = assignment_doc['created_at'].isoformat()
    if assignment_doc.get('expected_completion'):
        assignment_doc['expected_completion'] = assignment_doc['expected_completion'].isoformat()
    
    await db.supplier_assignments.insert_one(assignment_doc)
    
    # Update part/project status
    if assignment_data.assignment_type == "project" and assignment_data.project_id:
        await db.projects.update_one(
            {"id": assignment_data.project_id},
            {"$set": {"status": ProjectStatus.IN_PRODUCTION, "updated_at": datetime.now(timezone.utc).isoformat()}}
        )
        await db.parts.update_many(
            {"project_id": assignment_data.project_id},
            {"$set": {"status": PartStatus.ASSIGNED, "supplier_id": assignment_data.supplier_id, "updated_at": datetime.now(timezone.utc).isoformat()}}
        )
    elif assignment_data.assignment_type == "parts" and assignment_data.part_ids:
        for part_id in assignment_data.part_ids:
            await db.parts.update_one(
                {"id": part_id},
                {"$set": {"status": PartStatus.ASSIGNED, "supplier_id": assignment_data.supplier_id, "updated_at": datetime.now(timezone.utc).isoformat()}}
            )
    
    return assignment_data

@api_router.get("/admin/suppliers/{supplier_id}/assignments")
async def get_supplier_assignments(supplier_id: str, current_user: Customer = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    assignments = await db.supplier_assignments.find({"supplier_id": supplier_id}, {"_id": 0}).sort("assigned_date", -1).to_list(100)
    
    for assignment in assignments:
        if assignment.get("project_id"):
            project = await db.projects.find_one({"id": assignment["project_id"]}, {"_id": 0})
            assignment["project_details"] = project
        
        if assignment.get("part_ids"):
            parts = await db.parts.find({"id": {"$in": assignment["part_ids"]}}, {"_id": 0}).to_list(100)
            assignment["parts_details"] = parts
    
    return assignments

# ===== BLOG MANAGEMENT =====
@api_router.post("/admin/blog/posts")
async def create_admin_blog_post(post_data: BlogPostCreate, current_user: Customer = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    slug = post_data.title.lower().replace(' ', '-').replace(':', '').replace(',', '')
    slug = ''.join(c for c in slug if c.isalnum() or c == '-')
    
    post = BlogPost(
        title=post_data.title,
        slug=slug,
        category=post_data.category,
        summary=post_data.summary,
        content=post_data.content,
        hero_image=post_data.hero_image,
        tags=post_data.tags,
        read_time_minutes=post_data.read_time_minutes,
        meta_title=post_data.meta_title,
        meta_description=post_data.meta_description,
        published=post_data.published
    )
    
    post_doc = post.model_dump()
    post_doc['published_at'] = post_doc['published_at'].isoformat()
    post_doc['created_at'] = post_doc['created_at'].isoformat()
    await db.blog_posts.insert_one(post_doc)
    
    return post

@api_router.get("/admin/blog/posts/all")
async def get_all_admin_blog_posts(published: Optional[bool] = None, current_user: Customer = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    query = {}
    if published is not None:
        query["published"] = published
    
    posts = await db.blog_posts.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return posts

@api_router.patch("/admin/blog/posts/{post_id}")
async def update_admin_blog_post(post_id: str, update_data: BlogPostUpdate, current_user: Customer = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}
    
    if update_dict:
        await db.blog_posts.update_one({"id": post_id}, {"$set": update_dict})
    
    return {"message": "Blog post updated"}

@api_router.delete("/admin/blog/posts/{post_id}")
async def delete_admin_blog_post(post_id: str, current_user: Customer = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Blog post deleted"}

# ===== FILE ROUTES =====
@api_router.get("/files/{file_id}")
async def download_file(file_id: str):
    try:
        file_info = await file_service.get_file_info(file_id)
        if not file_info:
            raise HTTPException(status_code=404, detail="File not found")
        
        contents = await file_service.download_file(file_id)
        
        return StreamingResponse(
            io.BytesIO(contents),
            media_type="application/octet-stream",
            headers={"Content-Disposition": f"attachment; filename={file_info['filename']}"}
        )
    except Exception as e:
        logger.error(f"File download failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/admin/upload-image")
async def upload_blog_image(
    file: UploadFile = File(...),
    current_user: Customer = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        allowed_types = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
        if file.content_type not in allowed_types:
            raise HTTPException(status_code=400, detail="Invalid file type. Only images allowed.")
        
        gridfs_id = await file_service.upload_file(file, {
            "entity_type": "blog_image",
            "uploaded_by": current_user.id
        })
        
        attachment = Attachment(
            entity_type="blog_image",
            entity_id=gridfs_id,
            file_name=file.filename,
            file_size=file.size,
            file_type=file.content_type,
            gridfs_id=gridfs_id,
            uploaded_by=current_user.id
        )
        
        att_doc = attachment.model_dump()
        att_doc['uploaded_at'] = att_doc['uploaded_at'].isoformat()
        await db.attachments.insert_one(att_doc)
        
        backend_url = os.environ.get('BACKEND_URL')
        if not backend_url:
            backend_url = os.environ.get('REACT_APP_BACKEND_URL')
        if not backend_url:
            raise HTTPException(status_code=500, detail="BACKEND_URL not configured")
        image_url = f"{backend_url}/api/images/{gridfs_id}"
        
        return {
            "success": True,
            "image_url": image_url,
            "file_id": gridfs_id,
            "file_name": file.filename
        }
    except Exception as e:
        logger.error(f"Image upload failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/images/{file_id}")
async def get_image(file_id: str):
    try:
        file_info = await file_service.get_file_info(file_id)
        if not file_info:
            raise HTTPException(status_code=404, detail="Image not found")
        
        contents = await file_service.download_file(file_id)
        
        return StreamingResponse(
            io.BytesIO(contents),
            media_type=file_info.get('contentType', 'image/jpeg')
        )
    except Exception as e:
        logger.error(f"Image retrieval failed: {str(e)}")
        raise HTTPException(status_code=404, detail="Image not found")

# ===== SEED DATA ROUTE =====
@api_router.post("/seed-data")
async def seed_database():
    from seed_data import get_seed_quotes, get_seed_orders, get_seed_notifications, get_seed_blog_posts
    from admin_seed_data import (
        get_demo_leads, get_demo_followups, get_demo_meetings,
        get_demo_projects, get_demo_parts, get_demo_suppliers,
        get_demo_assignments, get_demo_contact_submissions
    )
    
    try:
        await db.quotes.delete_many({"customer_id": {"$regex": "^seed_"}})
        await db.orders.delete_many({"customer_id": {"$regex": "^seed_"}})
        await db.notifications.delete_many({"recipient_id": {"$in": ["admin", "seed_customer_1", "seed_customer_2"]}})
        await db.blog_posts.delete_many({})
        
        # Clear admin data
        await db.leads.delete_many({})
        await db.followups.delete_many({})
        await db.meetings.delete_many({})
        await db.projects.delete_many({})
        await db.parts.delete_many({})
        await db.suppliers.delete_many({})
        await db.supplier_assignments.delete_many({})
        await db.contact_submissions.delete_many({})
        
        quotes = get_seed_quotes()
        if quotes:
            await db.quotes.insert_many(quotes)
        
        orders = get_seed_orders()
        if orders:
            await db.orders.insert_many(orders)
        
        notifications = get_seed_notifications()
        if notifications:
            await db.notifications.insert_many(notifications)
        
        blog_posts = get_seed_blog_posts()
        if blog_posts:
            await db.blog_posts.insert_many(blog_posts)
        
        # Insert admin demo data
        leads = get_demo_leads()
        if leads:
            await db.leads.insert_many(leads)
        
        followups = get_demo_followups(leads)
        if followups:
            await db.followups.insert_many(followups)
        
        meetings = get_demo_meetings(leads)
        if meetings:
            await db.meetings.insert_many(meetings)
        
        projects = get_demo_projects()
        if projects:
            await db.projects.insert_many(projects)
        
        parts = get_demo_parts(projects)
        if parts:
            await db.parts.insert_many(parts)
        
        suppliers = get_demo_suppliers()
        if suppliers:
            await db.suppliers.insert_many(suppliers)
        
        assignments = get_demo_assignments(projects, parts)
        if assignments:
            await db.supplier_assignments.insert_many(assignments)
        
        contact_subs = get_demo_contact_submissions()
        if contact_subs:
            await db.contact_submissions.insert_many(contact_subs)
        
        return {
            "message": "Database seeded successfully",
            "counts": {
                "quotes": len(quotes),
                "orders": len(orders),
                "notifications": len(notifications),
                "blog_posts": len(blog_posts),
                "leads": len(leads),
                "followups": len(followups),
                "meetings": len(meetings),
                "projects": len(projects),
                "parts": len(parts),
                "suppliers": len(suppliers),
                "assignments": len(assignments),
                "contact_submissions": len(contact_subs)
            }
        }
    except Exception as e:
        logger.error(f"Seed failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Lifespan event handler
@asynccontextmanager
async def lifespan(app: FastAPI):
    # ---- Startup (optional) ----
    # client is already lazy-connected, so no need to do anything
    
    yield  # App is running
    
    # ---- Shutdown ----
    client.close()

# Create the main app with lifespan
app = FastAPI(lifespan=lifespan)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
