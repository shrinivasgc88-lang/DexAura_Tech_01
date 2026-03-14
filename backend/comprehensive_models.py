from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
import uuid
from enum import Enum

class UserRole(str, Enum):
    CUSTOMER = "CUSTOMER"
    SUPPLIER = "SUPPLIER"
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

class ProjectStatus(str, Enum):
    DRAFT = "Draft"
    QUOTING = "Quoting"
    APPROVED = "Approved"
    IN_PRODUCTION = "In Production"
    QUALITY_CHECK = "Quality Check"
    SHIPPED = "Shipped"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"

class PartStatus(str, Enum):
    PENDING = "Pending"
    DFM_ANALYSIS = "DFM Analysis"
    QUOTED = "Quoted"
    ASSIGNED = "Assigned to Supplier"
    IN_PRODUCTION = "In Production"
    QUALITY_CHECK = "Quality Check"
    COMPLETED = "Completed"
    REJECTED = "Rejected"

class SupplierStatus(str, Enum):
    ACTIVE = "Active"
    INACTIVE = "Inactive"
    SUSPENDED = "Suspended"

class LeadStatus(str, Enum):
    NEW = "New"
    CONTACTED = "Contacted"
    QUALIFIED = "Qualified"
    MEETING_SCHEDULED = "Meeting Scheduled"
    PROPOSAL_SENT = "Proposal Sent"
    NEGOTIATION = "Negotiation"
    CONVERTED = "Converted"
    LOST = "Lost"

class NotificationType(str, Enum):
    ORDER_UPDATE = "order_update"
    QUOTE_READY = "quote_ready"
    PART_ASSIGNED = "part_assigned"
    QUALITY_ISSUE = "quality_issue"
    SHIPMENT_UPDATE = "shipment_update"
    PAYMENT_RECEIVED = "payment_received"
    SYSTEM_ALERT = "system_alert"

# ===== USER MANAGEMENT =====
class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    password_hash: Optional[str] = None
    google_id: Optional[str] = None
    company: Optional[str] = None
    name: str
    phone: Optional[str] = None
    role: UserRole
    is_active: bool = True
    email_verified: bool = False
    profile_complete: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserCreate(BaseModel):
    email: EmailStr
    password: Optional[str] = None
    google_id: Optional[str] = None
    company: Optional[str] = None
    name: str
    phone: Optional[str] = None
    role: UserRole = UserRole.CUSTOMER

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserProfile(BaseModel):
    company: Optional[str] = None
    name: str
    phone: Optional[str] = None
    address: Optional[Dict[str, Any]] = None
    preferences: Optional[Dict[str, Any]] = None

# ===== PROJECT MANAGEMENT =====
class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_id: str
    project_name: str
    project_number: str  # Auto-generated unique identifier
    description: Optional[str] = None
    status: ProjectStatus = ProjectStatus.DRAFT
    total_value: float = 0.0
    currency: str = "USD"
    priority: str = "normal"  # low, normal, high, urgent
    target_delivery_date: Optional[datetime] = None
    actual_delivery_date: Optional[datetime] = None
    notes: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProjectCreate(BaseModel):
    project_name: str
    description: Optional[str] = None
    priority: str = "normal"
    target_delivery_date: Optional[datetime] = None
    tags: List[str] = Field(default_factory=list)

class ProjectUpdate(BaseModel):
    project_name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[ProjectStatus] = None
    priority: Optional[str] = None
    target_delivery_date: Optional[datetime] = None
    notes: Optional[str] = None
    tags: Optional[List[str]] = None

# ===== PART MANAGEMENT =====
class Part(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    project_id: str
    part_number: str  # Auto-generated within project
    part_name: str
    description: Optional[str] = None
    quantity: int
    material: Optional[str] = None
    manufacturing_process: Optional[str] = None
    surface_finish: Optional[str] = None
    tolerance: Optional[str] = None
    notes: Optional[str] = None
    specifications: Optional[Dict[str, Any]] = None
    status: PartStatus = PartStatus.PENDING
    unit_price: Optional[float] = None
    total_price: Optional[float] = None
    supplier_id: Optional[str] = None
    cad_file_id: Optional[str] = None
    drawing_file_id: Optional[str] = None
    dfm_analysis: Optional[Dict[str, Any]] = None
    due_date: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PartCreate(BaseModel):
    part_name: str
    description: Optional[str] = None
    quantity: int
    material: Optional[str] = None
    manufacturing_process: Optional[str] = None
    surface_finish: Optional[str] = None
    tolerance: Optional[str] = None
    notes: Optional[str] = None
    specifications: Optional[Dict[str, Any]] = None

class PartUpdate(BaseModel):
    part_name: Optional[str] = None
    description: Optional[str] = None
    quantity: Optional[int] = None
    material: Optional[str] = None
    manufacturing_process: Optional[str] = None
    surface_finish: Optional[str] = None
    tolerance: Optional[str] = None
    notes: Optional[str] = None
    specifications: Optional[Dict[str, Any]] = None
    status: Optional[PartStatus] = None

# ===== SUPPLIER MANAGEMENT =====
class Supplier(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company_name: str
    contact_person: str
    email: EmailStr
    phone: Optional[str] = None
    address: Optional[Dict[str, Any]] = None
    capabilities: List[str] = Field(default_factory=list)  # CNC, Sheet Metal, 3D Printing, etc.
    certifications: List[str] = Field(default_factory=list)  # ISO 9001, AS9100, etc.
    materials: List[str] = Field(default_factory=list)  # Aluminum, Steel, Plastic, etc.
    rating: float = 0.0  # 0-5 rating
    on_time_delivery_rate: float = 100.0  # percentage
    quality_score: float = 100.0  # 0-100
    status: SupplierStatus = SupplierStatus.ACTIVE
    payment_terms: str = "Net 30"
    lead_time_days: int = 14
    minimum_order_value: float = 0.0
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SupplierCreate(BaseModel):
    company_name: str
    contact_person: str
    email: EmailStr
    phone: Optional[str] = None
    address: Optional[Dict[str, Any]] = None
    capabilities: List[str] = Field(default_factory=list)
    certifications: List[str] = Field(default_factory=list)
    materials: List[str] = Field(default_factory=list)
    payment_terms: str = "Net 30"
    lead_time_days: int = 14
    minimum_order_value: float = 0.0

class SupplierUpdate(BaseModel):
    company_name: Optional[str] = None
    contact_person: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[Dict[str, Any]] = None
    capabilities: Optional[List[str]] = None
    certifications: Optional[List[str]] = None
    materials: Optional[List[str]] = None
    status: Optional[SupplierStatus] = None
    payment_terms: Optional[str] = None
    lead_time_days: Optional[int] = None
    minimum_order_value: Optional[float] = None
    notes: Optional[str] = None

# ===== QUOTATION SYSTEM =====
class Quote(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    project_id: str
    customer_id: str
    quote_number: str  # Auto-generated
    parts: List[Dict[str, Any]] = Field(default_factory=list)
    total_price: float = 0.0
    currency: str = "USD"
    lead_time_days: int = 0
    validity_days: int = 30
    dfm_insights: List[str] = Field(default_factory=list)
    status: str = "draft"  # draft, sent, accepted, rejected, expired
    share_token: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    expires_at: Optional[datetime] = None

class QuoteCreate(BaseModel):
    project_id: str
    parts: List[Dict[str, Any]]
    lead_time_days: int = 0
    validity_days: int = 30
    notes: Optional[str] = None

class QuoteUpdate(BaseModel):
    parts: Optional[List[Dict[str, Any]]] = None
    total_price: Optional[float] = None
    lead_time_days: Optional[int] = None
    validity_days: Optional[int] = None
    dfm_insights: Optional[List[str]] = None
    status: Optional[str] = None
    notes: Optional[str] = None

# ===== ORDER MANAGEMENT =====
class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_id: str
    project_id: str
    quote_id: Optional[str] = None
    order_number: str  # Auto-generated
    status: OrderStatus = OrderStatus.NEW
    total_amount: float = 0.0
    currency: str = "USD"
    notes: Optional[str] = None
    internal_notes: Optional[str] = None
    timeline_events: List[Dict[str, Any]] = Field(default_factory=list)
    payment_status: str = "pending"  # pending, partial, paid, overdue
    shipping_address: Optional[Dict[str, Any]] = None
    billing_address: Optional[Dict[str, Any]] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class OrderCreate(BaseModel):
    project_id: str
    quote_id: Optional[str] = None
    notes: Optional[str] = None
    shipping_address: Optional[Dict[str, Any]] = None
    billing_address: Optional[Dict[str, Any]] = None

class OrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None
    notes: Optional[str] = None
    internal_notes: Optional[str] = None
    payment_status: Optional[str] = None
    shipping_address: Optional[Dict[str, Any]] = None
    billing_address: Optional[Dict[str, Any]] = None

class OrderItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_id: str
    part_id: str
    part_name: str
    quantity: int
    unit_price: float
    total_price: float
    material: Optional[str] = None
    process: Optional[str] = None
    supplier_id: Optional[str] = None
    status: str = "pending"  # pending, assigned, in_production, completed, shipped
    specifications: Optional[Dict[str, Any]] = None

# ===== QUALITY CONTROL =====
class QualityReport(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    part_id: str
    order_id: str
    inspection_type: InspectionType
    inspector_id: str
    status: str = "pending"  # pending, passed, failed, rework_required
    findings: List[Dict[str, Any]] = Field(default_factory=list)
    measurements: Optional[Dict[str, Any]] = None
    report_file_id: Optional[str] = None
    notes: Optional[str] = None
    inspected_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class QualityReportCreate(BaseModel):
    part_id: str
    order_id: str
    inspection_type: InspectionType
    findings: List[Dict[str, Any]] = Field(default_factory=list)
    measurements: Optional[Dict[str, Any]] = None
    notes: Optional[str] = None

# ===== LEAD MANAGEMENT =====
class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    source: str = "website"
    status: LeadStatus = LeadStatus.NEW
    estimated_value: Optional[float] = None
    assigned_to: Optional[str] = None  # Admin user ID
    notes: Optional[str] = None
    converted_to_customer_id: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    source: str = "website"
    estimated_value: Optional[float] = None
    notes: Optional[str] = None

class LeadUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    status: Optional[LeadStatus] = None
    estimated_value: Optional[float] = None
    assigned_to: Optional[str] = None
    notes: Optional[str] = None

# ===== NOTIFICATION SYSTEM =====
class Notification(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    recipient_id: str
    recipient_role: UserRole
    title: str
    message: str
    type: NotificationType
    related_entity_type: str  # project, part, order, quote, etc.
    related_entity_id: str
    read: bool = False
    action_url: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class NotificationCreate(BaseModel):
    recipient_id: str
    recipient_role: UserRole
    title: str
    message: str
    type: NotificationType
    related_entity_type: str
    related_entity_id: str
    action_url: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

# ===== FILE MANAGEMENT =====
class Attachment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    entity_type: str  # project, part, order, quality_report
    entity_id: str
    file_name: str
    file_size: int
    file_type: str
    mime_type: str
    gridfs_id: str
    uploaded_by: str
    uploaded_by_role: UserRole
    is_public: bool = False
    tags: List[str] = Field(default_factory=list)
    uploaded_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AttachmentCreate(BaseModel):
    entity_type: str
    entity_id: str
    file_name: str
    tags: List[str] = Field(default_factory=list)

# ===== AUDIT LOG =====
class AuditLog(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    user_role: UserRole
    action: str
    entity_type: str
    entity_id: str
    changes: Optional[Dict[str, Any]] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# ===== ANALYTICS =====
class DashboardMetrics(BaseModel):
    total_projects: int = 0
    active_projects: int = 0
    total_orders: int = 0
    total_revenue: float = 0.0
    avg_order_value: float = 0.0
    on_time_delivery_rate: float = 0.0
    quality_pass_rate: float = 0.0
    customer_satisfaction: float = 0.0

class SupplierMetrics(BaseModel):
    total_orders: int = 0
    completed_orders: int = 0
    on_time_delivery_rate: float = 0.0
    quality_score: float = 0.0
    avg_rating: float = 0.0
    total_earnings: float = 0.0
    pending_payments: float = 0.0