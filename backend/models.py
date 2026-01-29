from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
import uuid
from enum import Enum

class UserRole(str, Enum):
    OWNER = "OWNER"
    BUYER = "BUYER"
    VIEWER = "VIEWER"
    ADMIN = "ADMIN"

class OrderStatus(str, Enum):
    NEW = "New"
    IN_REVIEW = "In Review"
    QUOTED = "Quoted"
    IN_PRODUCTION = "In Production"
    SHIPPED = "Shipped"
    CLOSED = "Closed"

class InspectionType(str, Enum):
    STANDARD = "Standard Inspection"
    STANDARD_WITH_REPORT = "Standard Inspection with Dimensional Report"
    CMM_WITH_REPORT = "CMM Inspection with Dimensional Report"
    FIRST_ARTICLE = "First Article Inspection Report (per AS9102)"
    SOURCE = "Source Inspection"
    ADDITIVE = "Additive Part Inspections"
    CUSTOM = "Custom Inspection"

class Customer(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    password_hash: Optional[str] = None
    google_id: Optional[str] = None
    company: Optional[str] = None
    name: str
    phone: Optional[str] = None
    role: UserRole = UserRole.BUYER
    team_members: List[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_active: bool = True

class CustomerCreate(BaseModel):
    email: EmailStr
    password: Optional[str] = None
    google_id: Optional[str] = None
    company: Optional[str] = None
    name: str
    phone: Optional[str] = None
    role: UserRole = UserRole.BUYER

class CustomerLogin(BaseModel):
    email: EmailStr
    password: str

class Quote(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_id: str
    quote_type: str  # "instant" or "high_volume"
    parts: List[Dict[str, Any]] = Field(default_factory=list)
    total_price: float = 0.0
    lead_time_days: int = 0
    dfm_insights: List[str] = Field(default_factory=list)
    status: str = "pending"
    share_token: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class QuoteCreate(BaseModel):
    customer_id: str
    quote_type: str
    parts: List[Dict[str, Any]]

class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_id: str
    quote_id: Optional[str] = None
    order_number: str
    status: OrderStatus = OrderStatus.NEW
    order_type: str  # "on_demand" or "high_volume"
    total_amount: float = 0.0
    notes: Optional[str] = None
    internal_notes: Optional[str] = None
    timeline_events: List[Dict[str, Any]] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class OrderCreate(BaseModel):
    customer_id: str
    quote_id: Optional[str] = None
    order_type: str
    total_amount: float
    notes: Optional[str] = None

class OrderItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_id: str
    part_name: str
    quantity: int
    unit_price: float
    material: Optional[str] = None
    process: Optional[str] = None
    specifications: Optional[Dict[str, Any]] = None

class Attachment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    entity_type: str  # "quote", "order", "customer"
    entity_id: str
    file_name: str
    file_size: int
    file_type: str
    gridfs_id: str  # MongoDB GridFS file ID
    uploaded_by: str
    uploaded_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class InspectionRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_id: str
    inspection_type: InspectionType
    requirements: Optional[str] = None
    status: str = "pending"
    report_file_id: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    category: str  # "CNC Machining", "Sheet Metals", "3D Printing", "Special Process"
    summary: str
    content: str
    hero_image: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    read_time_minutes: int = 8
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    author: str = "DexAura Team"
    published: bool = True
    published_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Notification(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    recipient_id: str
    title: str
    message: str
    type: str  # "order", "quote", "system", "contact"
    related_entity_id: Optional[str] = None
    read: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    submission_type: str  # "high_volume", "general", "quote_request"
    name: str
    email: EmailStr
    phone: Optional[str] = None
    country: Optional[str] = None  # Country code (e.g., 'US', 'IN', 'GB')
    company: Optional[str] = None
    monthly_volume: Optional[str] = None
    message: str
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AuditLog(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    action: str
    entity_type: str
    entity_id: str
    changes: Optional[Dict[str, Any]] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
