from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
import uuid
from enum import Enum

class LeadStatus(str, Enum):
    NEW = "New"
    CONTACTED = "Contacted"
    QUALIFIED = "Qualified"
    PROPOSAL_SENT = "Proposal Sent"
    NEGOTIATION = "Negotiation"
    CONVERTED = "Converted to Customer"
    LOST = "Lost"
    ON_HOLD = "On Hold"

class ProjectStatus(str, Enum):
    QUOTING = "Quoting"
    APPROVED = "Approved"
    IN_PRODUCTION = "In Production"
    QUALITY_CHECK = "Quality Check"
    SHIPPED = "Shipped"
    COMPLETED = "Completed"
    ON_HOLD = "On Hold"

class PartStatus(str, Enum):
    PENDING = "Pending Assignment"
    ASSIGNED = "Assigned to Supplier"
    IN_PRODUCTION = "In Production"
    QUALITY_CHECK = "Quality Check"
    COMPLETED = "Completed"
    REJECTED = "Rejected"

class Lead(BaseModel):
    model_config = {"extra": "ignore"}
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    source: str = "contact_form"  # contact_form, quote_request, referral, etc.
    status: LeadStatus = LeadStatus.NEW
    contact_submission_id: Optional[str] = None
    assigned_to: Optional[str] = None  # Admin user ID
    notes: Optional[str] = None
    estimated_value: Optional[float] = None
    converted_to_customer_id: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class FollowUp(BaseModel):
    model_config = {"extra": "ignore"}
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    lead_id: str
    follow_up_date: datetime
    method: str  # email, phone, meeting, demo
    notes: str
    completed: bool = False
    outcome: Optional[str] = None
    next_action: Optional[str] = None
    created_by: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Meeting(BaseModel):
    model_config = {"extra": "ignore"}
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    lead_id: Optional[str] = None
    customer_id: Optional[str] = None
    title: str
    meeting_date: datetime
    duration_minutes: int = 60
    attendees: List[str] = Field(default_factory=list)
    location: Optional[str] = None  # Physical address or meeting link
    agenda: Optional[str] = None
    notes: Optional[str] = None
    action_items: List[str] = Field(default_factory=list)
    status: str = "scheduled"  # scheduled, completed, cancelled
    created_by: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Project(BaseModel):
    model_config = {"extra": "ignore"}
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_id: str
    project_name: str
    project_number: str
    description: Optional[str] = None
    status: ProjectStatus = ProjectStatus.QUOTING
    total_value: float = 0.0
    team_members: List[str] = Field(default_factory=list)  # Customer team member IDs
    admin_assigned: Optional[str] = None
    target_delivery_date: Optional[datetime] = None
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Part(BaseModel):
    model_config = {"extra": "ignore"}
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    project_id: str
    part_number: str
    part_name: str
    description: Optional[str] = None
    quantity: int
    material: Optional[str] = None
    process: Optional[str] = None
    unit_price: Optional[float] = None
    total_price: Optional[float] = None
    status: PartStatus = PartStatus.PENDING
    supplier_id: Optional[str] = None
    cad_file_id: Optional[str] = None
    drawing_file_id: Optional[str] = None
    specifications: Optional[Dict[str, Any]] = None
    due_date: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Supplier(BaseModel):
    model_config = {"extra": "ignore"}
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company_name: str
    contact_person: str
    email: EmailStr
    phone: Optional[str] = None
    address: Optional[str] = None
    capabilities: List[str] = Field(default_factory=list)  # CNC, Sheet Metal, 3D Printing, etc.
    certifications: List[str] = Field(default_factory=list)  # ISO 9001, AS9100, etc.
    rating: float = 0.0  # 0-5 rating
    on_time_delivery_rate: float = 0.0  # percentage
    quality_score: float = 0.0  # 0-100
    active: bool = True
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SupplierAssignment(BaseModel):
    model_config = {"extra": "ignore"}
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    supplier_id: str
    project_id: Optional[str] = None  # If whole project assigned
    part_ids: List[str] = Field(default_factory=list)  # If individual parts assigned
    assignment_type: str  # "project" or "parts"
    assigned_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    expected_completion: Optional[datetime] = None
    status: str = "active"  # active, completed, cancelled
    notes: Optional[str] = None
    created_by: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogPostCreate(BaseModel):
    title: str
    category: str
    summary: str
    content: str
    hero_image: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    read_time_minutes: int = 8
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    published: bool = False

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    summary: Optional[str] = None
    content: Optional[str] = None
    hero_image: Optional[str] = None
    tags: Optional[List[str]] = None
    read_time_minutes: Optional[int] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    published: Optional[bool] = None
