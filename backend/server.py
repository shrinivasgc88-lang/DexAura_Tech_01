from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form, Depends, Header, Body, BackgroundTasks
from fastapi.responses import StreamingResponse
from fastapi import Request
from dotenv import load_dotenv
# from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
from contextlib import asynccontextmanager
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime, timezone
import uuid
import io
from fastapi.middleware.cors import CORSMiddleware
# used directly in this module
from pydantic import BaseModel, Field
from models import (
    Customer, CustomerCreate, CustomerLogin, Quote, QuoteCreate,
    Order, OrderCreate, OrderItem, Attachment, InspectionRequest,
    BlogPost, Notification, ContactSubmission, AuditLog,
    OrderStatus, UserRole, QualityReport
)
from admin_models import (
    Lead, LeadStatus, FollowUp, Meeting, Project, ProjectStatus,
    Part, PartStatus, Supplier, SupplierAssignment, BlogPostCreate, BlogPostUpdate
)
from auth_service import get_password_hash, verify_password, create_access_token, verify_token
from cad_analyzer import CADAnalyzer
from email_service import email_service
from file_service import FileService

# Lifespan event handler
@asynccontextmanager
async def _lifespan(app: FastAPI):
    # ---- Startup (optional) ----
    # client is already lazy-connected, so no need to do anything
    
    yield  # App is running
    
    # ---- Shutdown ----
    client.close()

# Create the main app with lifespan
app = FastAPI(lifespan=_lifespan)

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

# Configure CORS origins safely (avoid empty origin list)
_cors_origins_env = os.environ.get('CORS_ORIGINS', '').strip()
if _cors_origins_env:
    _cors_origins = [o.strip() for o in _cors_origins_env.split(',') if o.strip()]
else:
    _cors_origins = ["*"]

# When allow_origins is '*' we cannot set allow_credentials=True (browsers reject this).
# Use credentials only when specific origins are listed.
_allow_credentials = False if _cors_origins == ["*"] else True

app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_credentials=_allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Debug middleware: log response headers for /api/contact and /api/test-route
@app.middleware("http")
async def _log_response_headers(request, call_next):
    response = await call_next(request)
    if request.url.path.startswith("/api/contact") or request.url.path.startswith("/api/test-route"):
        print(f"[CORS DEBUG] {request.method} {request.url.path} -> status={response.status_code} headers={dict(response.headers)}")
    return response

@app.get("/")
async def root():
    return {"status": "ok", "message": "DexAura API running"}

@api_router.get("/test-route")
async def test_route():
    return {"message": "Route works"}

@api_router.get("/db-info")
async def db_info():
    return {
        "mongo_url": os.environ.get("MONGO_URL"),
        "database_name": os.environ.get("DB_NAME")
    }
# @api_router.post("/contact")
# async def contact(request: Request):
#     try:
#         data = await request.json()
#         print("DATA:", data)

#         # Mongo insert
#         collection.insert_one(data)

#         return {"message": "Lead saved"}

#     except Exception as e:
#         print("ERROR:", str(e))
#         return {"error": str(e)}

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
    """
    CRITICAL SECURITY ENDPOINT - Register new user with email/password
    Must validate all inputs and ensure password is hashed
    """
    print(f"\n{'='*70}")
    print(f"[REGISTER] Email: {customer_data.email}")
    print(f"[REGISTER] Name: {customer_data.name}")
    
    # STEP 1: Validate inputs
    if not customer_data.email or '@' not in customer_data.email:
        print(f"[REGISTER] ✗ REJECTED: Invalid email")
        print(f"{'='*70}\n")
        raise HTTPException(status_code=400, detail="Invalid email address")
    
    if not customer_data.name or len(customer_data.name.strip()) == 0:
        print(f"[REGISTER] ✗ REJECTED: Name required")
        print(f"{'='*70}\n")
        raise HTTPException(status_code=400, detail="Name is required")
    
    if not customer_data.password or len(customer_data.password) < 6:
        print(f"[REGISTER] ✗ REJECTED: Password too short")
        print(f"{'='*70}\n")
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
    
    # STEP 2: Check if user already exists
    existing = await db.customers.find_one({"email": customer_data.email.lower()})
    if existing:
        print(f"[REGISTER] ✗ REJECTED: Email already registered")
        print(f"{'='*70}\n")
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # STEP 3: Hash password
    try:
        password_hash = get_password_hash(customer_data.password)
        print(f"[REGISTER] ✓ Password hashed successfully")
    except Exception as e:
        print(f"[REGISTER] ✗ PASSWORD HASHING ERROR: {e}")
        import traceback
        traceback.print_exc()
        print(f"{'='*70}\n")
        raise HTTPException(status_code=500, detail="Error processing password")
    
    # STEP 4: Create customer object
    customer_dict = {
        "id": str(uuid.uuid4()),
        "email": customer_data.email.lower(),
        "name": customer_data.name.strip(),
        "password_hash": password_hash,
        "company": customer_data.company or None,
        "phone": customer_data.phone or None,
        "role": "BUYER",
        "is_active": True,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    # STEP 5: Insert into database
    try:
        result = await db.customers.insert_one(customer_dict)
        print(f"[REGISTER] ✓ User created in database")
    except Exception as e:
        print(f"[REGISTER] ✗ DATABASE ERROR: {e}")
        import traceback
        traceback.print_exc()
        print(f"[REGISTER] Customer dict: {customer_dict}")
        print(f"{'='*70}\n")
        raise HTTPException(status_code=500, detail="Error creating user")
    
    # STEP 6: Create token
    token = create_access_token({"sub": customer_dict["id"], "email": customer_dict["email"]})
    print(f"[REGISTER] ✓ Token created")
    
    # STEP 7: Prepare response (remove password_hash and handle ObjectId)
    response_customer = {}
    for k, v in customer_dict.items():
        if k != "password_hash":
            # Convert ObjectId to string
            if hasattr(v, '__str__') and type(v).__name__ == 'ObjectId':
                response_customer[k] = str(v)
            elif isinstance(v, dict) and '_id' in v:
                response_customer[k] = {mk: str(mv) if type(mv).__name__ == 'ObjectId' else mv for mk, mv in v.items()}
            else:
                response_customer[k] = v
    
    print(f"[REGISTER] ✓ Registration successful for: {response_customer['email']}")
    print(f"{'='*70}\n")
    
    return {
        "customer": response_customer,
        "access_token": token,
        "token_type": "bearer"
    }

@api_router.post("/auth/login")
async def login(credentials: CustomerLogin):
    """
    CRITICAL SECURITY ENDPOINT - Must ALWAYS check database
    Any user without valid credentials MUST be rejected with 401
    """
    print(f"\n{'='*70}")
    print(f"[LOGIN] ╔═══════════════════════════════════════════════════════╗")
    print(f"[LOGIN] ║  AUTHENTICATION ATTEMPT - STRICT VALIDATION MODE       ║")
    print(f"[LOGIN] ╚═══════════════════════════════════════════════════════╝")
    print(f"[LOGIN] Email: {credentials.email}")
    print(f"[LOGIN] Password: [PROVIDED - will verify below]")
    
    # STEP 1: Validate input format
    print(f"[LOGIN] \n[STEP 1] Validating input...")
    if not credentials.email or not credentials.password:
        print(f"[LOGIN]   ✗ VALIDATION FAILED: Missing email or password")
        print(f"[LOGIN] {'='*70}\n")
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    print(f"[LOGIN]   ✓ Email and password fields present")
    
    # STEP 2: Query database for user
    print(f"[LOGIN] \n[STEP 2] Querying database for user...")
    print(f"[LOGIN]   Looking for: {credentials.email}")
    try:
        user = await db.customers.find_one({"email": credentials.email.lower()}, {"_id": 0})
        print(f"[LOGIN]   Database query completed")
    except Exception as e:
        print(f"[LOGIN]   ✗ DATABASE ERROR: {e}")
        print(f"[LOGIN] {'='*70}\n")
        raise HTTPException(status_code=500, detail="Database error")
    
    # STEP 3: Check if user exists
    print(f"[LOGIN] \n[STEP 3] Checking if user exists...")
    if user is None:
        print(f"[LOGIN]   ✗ REJECTED: Email '{credentials.email}' NOT FOUND in database")
        print(f"[LOGIN]   No user with this email exists!")
        print(f"[LOGIN] {'='*70}\n")
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    print(f"[LOGIN]   ✓ User found: {user.get('email')} (Name: {user.get('name')})")
    
    # STEP 4: Check if password_hash exists
    print(f"[LOGIN] \n[STEP 4] Checking password hash...")
    password_hash = user.get("password_hash")
    if not password_hash:
        print(f"[LOGIN]   ✗ REJECTED: User has NO password hash stored!")
        print(f"[LOGIN]   This user cannot authenticate with password")
        print(f"[LOGIN] {'='*70}\n")
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    print(f"[LOGIN]   ✓ Password hash exists (length: {len(password_hash)} chars)")
    
    # STEP 5: Verify password
    print(f"[LOGIN] \n[STEP 5] Verifying password...")
    print(f"[LOGIN]   Comparing provided password against stored hash...")
    try:
        password_valid = verify_password(credentials.password, password_hash)
        print(f"[LOGIN]   Verification result: {password_valid}")
    except Exception as e:
        print(f"[LOGIN]   ✗ PASSWORD VERIFICATION ERROR: {e}")
        print(f"[LOGIN] {'='*70}\n")
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not password_valid:
        print(f"[LOGIN]   ✗ REJECTED: Password DOES NOT MATCH!")
        print(f"[LOGIN]   The provided password is INCORRECT for this user")
        print(f"[LOGIN] {'='*70}\n")
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    print(f"[LOGIN]   ✓ Password verification SUCCESSFUL")
    
    # STEP 6: Check if user is active
    print(f"[LOGIN] \n[STEP 6] Checking user status...")
    is_active = user.get("is_active", True)
    print(f"[LOGIN]   User active status: {is_active}")
    if not is_active:
        print(f"[LOGIN]   ✗ REJECTED: User account is INACTIVE")
        print(f"[LOGIN] {'='*70}\n")
        raise HTTPException(status_code=401, detail="Account is inactive")
    
    print(f"[LOGIN]   ✓ User account is ACTIVE")
    
    # STEP 7: Create token - ONLY after ALL checks pass
    print(f"[LOGIN] \n[STEP 7] Creating authentication token...")
    token = create_access_token({"sub": user["id"], "email": user["email"]})
    print(f"[LOGIN]   ✓ Token created successfully")
    
    # STEP 8: Prepare response
    print(f"[LOGIN] \n[STEP 8] Preparing response...")
    customer_data = {k: v for k, v in user.items() if k != "password_hash"}
    
    # Convert datetime to ISO string
    if customer_data.get('created_at') and not isinstance(customer_data['created_at'], str):
        customer_data['created_at'] = customer_data['created_at'].isoformat()
    
    print(f"[LOGIN] \n[LOGIN] ╔═══════════════════════════════════════════════════════╗")
    print(f"[LOGIN] ║  ✓ AUTHENTICATION SUCCESSFUL - USER AUTHENTICATED            ║")
    print(f"[LOGIN] ╚═══════════════════════════════════════════════════════╝")
    print(f"[LOGIN] Email: {customer_data.get('email')}")
    print(f"[LOGIN] Name:  {customer_data.get('name')}")
    print(f"[LOGIN] Token will expire in 7 days")
    print(f"[LOGIN] {'='*70}\n")
    
    return {
        "customer": customer_data,
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
    status: Optional[str] = None,
    current_user: Customer = Depends(get_current_user)
):
    query = {}
    
    # Filter based on user role
    if current_user.role == UserRole.ADMIN:
        # Admins can see all orders, or filter by customer if specified
        if customer_id:
            query["customer_id"] = customer_id
    elif current_user.role == UserRole.SUPPLIER:
        # Suppliers can only see orders assigned to them
        query["assigned_supplier"] = current_user.id
    else:
        # Customers can only see their own orders
        query["customer_id"] = current_user.id
    
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

# helper type used for extending chat logs
class ChatMessage(BaseModel):
    sender: str  # "user" or "admin"
    text: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

async def send_contact_notifications(submission_doc: dict, lead_id: str):
    """Background task to send email and create notification"""
    try:
        await email_service.notify_admin_contact_submission(submission_doc)
    except Exception as e:
        print(f"[CONTACT] Email notification failed: {e}")

    try:
        notification = Notification(
            recipient_id="admin",
            title="New Lead Generated",
            message=f"New lead from {submission_doc.get('name')} ({submission_doc.get('email')})",
            type="lead",
            related_entity_id=lead_id
        )
        notif_doc = notification.model_dump()
        notif_doc['created_at'] = notif_doc['created_at'].isoformat()
        await db.notifications.insert_one(notif_doc)
    except Exception as e:
        print(f"[CONTACT] Notification creation failed: {e}")

async def process_contact_submission_background(submission_doc: dict):
    try:
        from admin_models import Lead, LeadStatus

        lead = Lead(
            name=submission_doc.get('name'),
            email=submission_doc.get('email'),
            phone=submission_doc.get('phone'),
            company=submission_doc.get('company'),
            source="contact_form",
            status=LeadStatus.NEW,
            contact_submission_id=submission_doc.get('id'),
            notes=f"Subject: {submission_doc.get('submission_type', 'general')}\nMessage: {submission_doc.get('message')}\nCountry: {submission_doc.get('country', '')}\nMonthly Volume: {submission_doc.get('monthly_volume', '')}"
        )

        lead_doc = lead.model_dump()
        lead_doc['created_at'] = lead_doc['created_at'].isoformat()
        lead_doc['updated_at'] = lead_doc['updated_at'].isoformat()

        lead_insert_result = await db.leads.insert_one(lead_doc)

        await db.contact_submissions.update_one(
            {"id": submission_doc.get('id')},
            {"$set": {"lead_id": lead.id}}
        )

        await send_contact_notifications(submission_doc, lead.id)

    except Exception as exc:
        print(f"[CONTACT] Background processing failed: {exc}")

@api_router.post("/contact")
async def submit_contact(background_tasks: BackgroundTasks, submission: dict):
    print(f"[CONTACT] Received submission: {submission}")

    submission_type = submission.get("submission_type") or submission.get("subject") or "general"
    submission_payload = {**submission, "submission_type": submission_type}

    try:
        contact_submission = ContactSubmission(**submission_payload)
    except Exception as e:
        print(f"[CONTACT] Validation error: {e}")
        raise HTTPException(status_code=400, detail=f"Invalid contact submission: {e}")

    submission_doc = contact_submission.model_dump()

    if not submission_doc.get("country") and submission_doc.get("phone"):
        match = re.match(r"^(\+\d+)", submission_doc["phone"])
        if match:
            submission_doc["country"] = match.group(1)

    if isinstance(submission_doc.get('created_at'), datetime):
        submission_doc['created_at'] = submission_doc['created_at'].isoformat()

    try:
        insert_result = await db.contact_submissions.insert_one(submission_doc)
        inserted_id = str(insert_result.inserted_id)

        background_tasks.add_task(process_contact_submission_background, submission_doc)

        return {
            "message": "Contact submission received",
            "contact_submission_id": submission_doc.get("id"),
            "mongo_id": inserted_id
        }

    except Exception as e:
        print(f"[CONTACT] Internal error: {e}")
        import traceback
        traceback.print_exc()
        raise

@api_router.patch("/contact/{submission_id}/chat")
async def append_chat_message(submission_id: str, message: ChatMessage):
    # store the new message in the submission document for later review
    msg_doc = message.model_dump()
    msg_doc['timestamp'] = msg_doc['timestamp'].isoformat()
    result = await db.contact_submissions.update_one(
        {"id": submission_id},
        {"$push": {"chat_history": msg_doc}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Contact submission not found")
    return {"message": "Chat message appended"}

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

@api_router.put("/admin/customers/{customer_id}/role")
async def update_customer_role(
    customer_id: str,
    role: str = Body(..., embed=True),
    current_user: Customer = Depends(get_current_user)
):
    """Update a customer's role - admin only"""
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    # Validate role
    valid_roles = [e.value for e in UserRole]
    if role not in valid_roles:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid role. Must be one of: {', '.join(valid_roles)}"
        )
    
    # Don't allow changing your own role
    if customer_id == current_user.id:
        raise HTTPException(
            status_code=400, 
            detail="You cannot change your own role"
        )
    
    # Update the role
    result = await db.customers.update_one(
        {"id": customer_id},
        {"$set": {"role": role}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    return {"message": f"Customer role updated to {role}", "customer_id": customer_id, "role": role}

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
