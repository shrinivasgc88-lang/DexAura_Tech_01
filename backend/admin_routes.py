from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from datetime import datetime, timezone
import uuid

from models import Customer, UserRole
from admin_models import (
    Lead, LeadStatus, FollowUp, Meeting, Project, ProjectStatus,
    Part, PartStatus, Supplier, SupplierAssignment, BlogPostCreate, BlogPostUpdate
)
from models import BlogPost

admin_router = APIRouter(prefix="/admin", tags=["admin"])

# Dependency for admin check
async def require_admin(current_user: Customer):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

# ===== LEAD MANAGEMENT =====
@admin_router.get("/leads")
async def get_leads(db, status: Optional[str] = None, skip: int = 0, limit: int = 50):
    query = {}
    if status:
        query["status"] = status
    
    total = await db.leads.count_documents(query)
    leads = await db.leads.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    
    return {"total": total, "leads": leads}

@admin_router.post("/leads")
async def create_lead(db, lead: Lead):
    lead_doc = lead.model_dump()
    lead_doc['created_at'] = lead_doc['created_at'].isoformat()
    lead_doc['updated_at'] = lead_doc['updated_at'].isoformat()
    await db.leads.insert_one(lead_doc)
    return lead

@admin_router.patch("/leads/{lead_id}")
async def update_lead(db, lead_id: str, status: Optional[str] = None, notes: Optional[str] = None, assigned_to: Optional[str] = None):
    update_data = {"updated_at": datetime.now(timezone.utc).isoformat()}
    
    if status:
        update_data["status"] = status
    if notes is not None:
        update_data["notes"] = notes
    if assigned_to is not None:
        update_data["assigned_to"] = assigned_to
    
    await db.leads.update_one({"id": lead_id}, {"$set": update_data})
    return {"message": "Lead updated"}

@admin_router.post("/leads/{lead_id}/convert")
async def convert_lead_to_customer(db, lead_id: str, customer_data: dict):
    lead = await db.leads.find_one({"id": lead_id})
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    # Create customer
    customer = Customer(
        email=customer_data.get("email", lead["email"]),
        name=customer_data.get("name", lead["name"]),
        phone=customer_data.get("phone", lead.get("phone")),
        company=customer_data.get("company", lead.get("company")),
        role=UserRole.BUYER
    )
    
    customer_doc = customer.model_dump()
    customer_doc['created_at'] = customer_doc['created_at'].isoformat()
    await db.customers.insert_one(customer_doc)
    
    # Update lead
    await db.leads.update_one(
        {"id": lead_id},
        {"$set": {
            "status": LeadStatus.CONVERTED,
            "converted_to_customer_id": customer.id,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    return {"message": "Lead converted", "customer_id": customer.id}

# ===== FOLLOW-UP MANAGEMENT =====
@admin_router.get("/leads/{lead_id}/followups")
async def get_followups(db, lead_id: str):
    followups = await db.followups.find({"lead_id": lead_id}, {"_id": 0}).sort("follow_up_date", -1).to_list(100)
    return followups

@admin_router.post("/followups")
async def create_followup(db, followup: FollowUp):
    followup_doc = followup.model_dump()
    followup_doc['follow_up_date'] = followup_doc['follow_up_date'].isoformat()
    followup_doc['created_at'] = followup_doc['created_at'].isoformat()
    await db.followups.insert_one(followup_doc)
    return followup

@admin_router.patch("/followups/{followup_id}")
async def update_followup(db, followup_id: str, completed: bool, outcome: Optional[str] = None, next_action: Optional[str] = None):
    update_data = {"completed": completed}
    if outcome:
        update_data["outcome"] = outcome
    if next_action:
        update_data["next_action"] = next_action
    
    await db.followups.update_one({"id": followup_id}, {"$set": update_data})
    return {"message": "Follow-up updated"}

# ===== MEETING MANAGEMENT =====
@admin_router.get("/meetings")
async def get_meetings(db, lead_id: Optional[str] = None, customer_id: Optional[str] = None):
    query = {}
    if lead_id:
        query["lead_id"] = lead_id
    if customer_id:
        query["customer_id"] = customer_id
    
    meetings = await db.meetings.find(query, {"_id": 0}).sort("meeting_date", -1).to_list(100)
    return meetings

@admin_router.post("/meetings")
async def create_meeting(db, meeting: Meeting):
    meeting_doc = meeting.model_dump()
    meeting_doc['meeting_date'] = meeting_doc['meeting_date'].isoformat()
    meeting_doc['created_at'] = meeting_doc['created_at'].isoformat()
    await db.meetings.insert_one(meeting_doc)
    return meeting

@admin_router.patch("/meetings/{meeting_id}")
async def update_meeting(db, meeting_id: str, status: Optional[str] = None, notes: Optional[str] = None, action_items: Optional[List[str]] = None):
    update_data = {}
    if status:
        update_data["status"] = status
    if notes is not None:
        update_data["notes"] = notes
    if action_items is not None:
        update_data["action_items"] = action_items
    
    await db.meetings.update_one({"id": meeting_id}, {"$set": update_data})
    return {"message": "Meeting updated"}

# ===== PROJECT MANAGEMENT =====
@admin_router.get("/projects")
async def get_projects(db, customer_id: Optional[str] = None, status: Optional[str] = None, skip: int = 0, limit: int = 50):
    query = {}
    if customer_id:
        query["customer_id"] = customer_id
    if status:
        query["status"] = status
    
    total = await db.projects.count_documents(query)
    projects = await db.projects.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    
    return {"total": total, "projects": projects}

@admin_router.post("/projects")
async def create_project(db, project: Project):
    # Generate project number
    count = await db.projects.count_documents({})
    project.project_number = f"PRJ-{datetime.now().year}-{str(count + 1).zfill(4)}"
    
    project_doc = project.model_dump()
    project_doc['created_at'] = project_doc['created_at'].isoformat()
    project_doc['updated_at'] = project_doc['updated_at'].isoformat()
    if project_doc.get('target_delivery_date'):
        project_doc['target_delivery_date'] = project_doc['target_delivery_date'].isoformat()
    
    await db.projects.insert_one(project_doc)
    return project

@admin_router.patch("/projects/{project_id}")
async def update_project(db, project_id: str, update_data: dict):
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.projects.update_one({"id": project_id}, {"$set": update_data})
    return {"message": "Project updated"}

# ===== PART MANAGEMENT =====
@admin_router.get("/projects/{project_id}/parts")
async def get_project_parts(db, project_id: str):
    parts = await db.parts.find({"project_id": project_id}, {"_id": 0}).to_list(100)
    return parts

@admin_router.post("/parts")
async def create_part(db, part: Part):
    part_doc = part.model_dump()
    part_doc['created_at'] = part_doc['created_at'].isoformat()
    part_doc['updated_at'] = part_doc['updated_at'].isoformat()
    if part_doc.get('due_date'):
        part_doc['due_date'] = part_doc['due_date'].isoformat()
    
    await db.parts.insert_one(part_doc)
    return part

@admin_router.patch("/parts/{part_id}")
async def update_part(db, part_id: str, update_data: dict):
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.parts.update_one({"id": part_id}, {"$set": update_data})
    return {"message": "Part updated"}

# ===== SUPPLIER MANAGEMENT =====
@admin_router.get("/suppliers")
async def get_suppliers(db, capability: Optional[str] = None, active: Optional[bool] = None):
    query = {}
    if capability:
        query["capabilities"] = capability
    if active is not None:
        query["active"] = active
    
    suppliers = await db.suppliers.find(query, {"_id": 0}).sort("company_name", 1).to_list(100)
    return suppliers

@admin_router.post("/suppliers")
async def create_supplier(db, supplier: Supplier):
    supplier_doc = supplier.model_dump()
    supplier_doc['created_at'] = supplier_doc['created_at'].isoformat()
    await db.suppliers.insert_one(supplier_doc)
    return supplier

@admin_router.patch("/suppliers/{supplier_id}")
async def update_supplier(db, supplier_id: str, update_data: dict):
    await db.suppliers.update_one({"id": supplier_id}, {"$set": update_data})
    return {"message": "Supplier updated"}

# ===== SUPPLIER ASSIGNMENTS =====
@admin_router.post("/assignments")
async def create_assignment(db, assignment: SupplierAssignment):
    assignment_doc = assignment.model_dump()
    assignment_doc['assigned_date'] = assignment_doc['assigned_date'].isoformat()
    assignment_doc['created_at'] = assignment_doc['created_at'].isoformat()
    if assignment_doc.get('expected_completion'):
        assignment_doc['expected_completion'] = assignment_doc['expected_completion'].isoformat()
    
    await db.supplier_assignments.insert_one(assignment_doc)
    
    # Update part/project status
    if assignment.assignment_type == "project" and assignment.project_id:
        await db.projects.update_one(
            {"id": assignment.project_id},
            {"$set": {"status": ProjectStatus.IN_PRODUCTION, "updated_at": datetime.now(timezone.utc).isoformat()}}
        )
        await db.parts.update_many(
            {"project_id": assignment.project_id},
            {"$set": {"status": PartStatus.ASSIGNED, "supplier_id": assignment.supplier_id, "updated_at": datetime.now(timezone.utc).isoformat()}}
        )
    elif assignment.assignment_type == "parts" and assignment.part_ids:
        for part_id in assignment.part_ids:
            await db.parts.update_one(
                {"id": part_id},
                {"$set": {"status": PartStatus.ASSIGNED, "supplier_id": assignment.supplier_id, "updated_at": datetime.now(timezone.utc).isoformat()}}
            )
    
    return assignment

@admin_router.get("/suppliers/{supplier_id}/assignments")
async def get_supplier_assignments(db, supplier_id: str):
    assignments = await db.supplier_assignments.find({"supplier_id": supplier_id}, {"_id": 0}).sort("assigned_date", -1).to_list(100)
    
    # Enrich with project/part details
    for assignment in assignments:
        if assignment.get("project_id"):
            project = await db.projects.find_one({"id": assignment["project_id"]}, {"_id": 0})
            assignment["project_details"] = project
        
        if assignment.get("part_ids"):
            parts = await db.parts.find({"id": {"$in": assignment["part_ids"]}}, {"_id": 0}).to_list(100)
            assignment["parts_details"] = parts
    
    return assignments

# ===== BLOG MANAGEMENT =====
@admin_router.get("/blog/posts")
async def get_all_blog_posts(db, published: Optional[bool] = None):
    query = {}
    if published is not None:
        query["published"] = published
    
    posts = await db.blog_posts.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return posts

@admin_router.post("/blog/posts")
async def create_blog_post(db, post_data: BlogPostCreate):
    # Generate slug from title
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

@admin_router.patch("/blog/posts/{post_id}")
async def update_blog_post(db, post_id: str, update_data: BlogPostUpdate):
    update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}
    
    if update_dict:
        await db.blog_posts.update_one({"id": post_id}, {"$set": update_dict})
    
    return {"message": "Blog post updated"}

@admin_router.delete("/blog/posts/{post_id}")
async def delete_blog_post(db, post_id: str):
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Blog post deleted"}

@admin_router.get("/blog/posts/{post_id}/preview")
async def preview_blog_post(db, post_id: str):
    post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post
