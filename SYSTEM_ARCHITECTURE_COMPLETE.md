# DexAura Manufacturing Marketplace - Complete System Architecture

## Overview

DexAura is a comprehensive manufacturing marketplace platform that connects customers needing custom parts with qualified suppliers who can produce them. The platform supports complex projects containing multiple parts, with independent processing workflows for each part while maintaining project-level oversight.

## System Architecture

### Technology Stack
- **Frontend**: React.js with Tailwind CSS
- **Backend**: Python FastAPI
- **Database**: MongoDB with GridFS for file storage
- **Authentication**: JWT-based role-based access control
- **File Storage**: GridFS for CAD files and documents
- **Real-time**: WebSocket support for live updates

### Core Components

#### 1. User Management System
- **Roles**: Customer, Supplier, Admin
- **Authentication**: Secure JWT-based auth with Google OAuth
- **Profile Management**: Company details, preferences, certifications

#### 2. Project Management
- **Project Structure**: Hierarchical (Customer → Project → Parts)
- **Status Tracking**: Draft → Quoting → Approved → Production → Quality → Shipped → Completed
- **Multi-part Support**: Each part processed independently

#### 3. Part Management
- **CAD File Support**: STEP, STL, DXF formats
- **Specifications**: Material, process, finish, tolerance, quantity
- **DFM Analysis**: Automated design for manufacturability checks
- **Supplier Assignment**: Intelligent matching algorithm

#### 4. Quotation System
- **Dynamic Pricing**: Part-level pricing with project totals
- **Negotiation**: Customer-supplier interaction
- **Validity Periods**: Time-limited quotes
- **Version Control**: Quote revision history

#### 5. Order Management
- **Order Lifecycle**: From quote acceptance to delivery
- **Progress Tracking**: Real-time production updates
- **Quality Control**: Inspection and approval workflows
- **Payment Integration**: Secure payment processing

#### 6. Supplier Network
- **Supplier Profiles**: Capabilities, certifications, ratings
- **Performance Tracking**: Quality scores, delivery rates
- **Assignment Algorithm**: AI-powered supplier matching
- **Load Balancing**: Workload distribution

#### 7. Quality Control
- **Inspection Types**: Standard, CMM, First Article, Source
- **Report Management**: Digital inspection reports
- **Approval Workflows**: Pass/fail with rework options
- **Audit Trail**: Complete quality history

## Database Schema

### Core Collections

#### Users
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password_hash: String,
  role: Enum(CUSTOMER, SUPPLIER, ADMIN),
  company: String,
  profile: {
    name: String,
    phone: String,
    address: Object,
    preferences: Object
  },
  is_active: Boolean,
  created_at: Date,
  updated_at: Date
}
```

#### Projects
```javascript
{
  _id: ObjectId,
  customer_id: ObjectId,
  project_name: String,
  project_number: String (auto-generated),
  description: String,
  status: Enum(DRAFT, QUOTING, APPROVED, IN_PRODUCTION, QUALITY_CHECK, SHIPPED, COMPLETED, CANCELLED),
  total_value: Number,
  priority: Enum(LOW, NORMAL, HIGH, URGENT),
  target_delivery_date: Date,
  actual_delivery_date: Date,
  tags: [String],
  created_at: Date,
  updated_at: Date
}
```

#### Parts
```javascript
{
  _id: ObjectId,
  project_id: ObjectId,
  part_number: String,
  part_name: String,
  quantity: Number,
  material: String,
  manufacturing_process: String,
  surface_finish: String,
  tolerance: String,
  specifications: Object,
  status: Enum(PENDING, DFM_ANALYSIS, QUOTED, ASSIGNED, IN_PRODUCTION, QUALITY_CHECK, COMPLETED, REJECTED),
  unit_price: Number,
  total_price: Number,
  supplier_id: ObjectId,
  cad_file_id: ObjectId,
  drawing_file_id: ObjectId,
  dfm_analysis: Object,
  due_date: Date,
  completed_at: Date,
  created_at: Date,
  updated_at: Date
}
```

#### Suppliers
```javascript
{
  _id: ObjectId,
  company_name: String,
  contact_person: String,
  email: String,
  phone: String,
  address: Object,
  capabilities: [String],
  certifications: [String],
  materials: [String],
  rating: Number (0-5),
  on_time_delivery_rate: Number (0-100),
  quality_score: Number (0-100),
  status: Enum(ACTIVE, INACTIVE, SUSPENDED),
  payment_terms: String,
  lead_time_days: Number,
  minimum_order_value: Number,
  created_at: Date,
  updated_at: Date
}
```

#### Orders
```javascript
{
  _id: ObjectId,
  customer_id: ObjectId,
  project_id: ObjectId,
  quote_id: ObjectId,
  order_number: String (auto-generated),
  status: Enum(NEW, IN_REVIEW, QUOTED, IN_PRODUCTION, SHIPPED, CLOSED),
  total_amount: Number,
  currency: String,
  payment_status: Enum(PENDING, PARTIAL, PAID, OVERDUE),
  shipping_address: Object,
  billing_address: Object,
  timeline_events: [Object],
  created_at: Date,
  updated_at: Date
}
```

#### Quality Reports
```javascript
{
  _id: ObjectId,
  part_id: ObjectId,
  order_id: ObjectId,
  inspection_type: Enum(STANDARD, STANDARD_WITH_REPORT, CMM_WITH_REPORT, FIRST_ARTICLE, SOURCE, ADDITIVE, CUSTOM),
  inspector_id: ObjectId,
  status: Enum(PENDING, PASSED, FAILED, REWORK_REQUIRED),
  findings: [Object],
  measurements: Object,
  report_file_id: ObjectId,
  notes: String,
  inspected_at: Date,
  created_at: Date,
  updated_at: Date
}
```

## API Structure

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Project Endpoints
- `POST /api/projects` - Create project
- `GET /api/projects` - List projects
- `GET /api/projects/{id}` - Get project details
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Part Endpoints
- `POST /api/projects/{project_id}/parts` - Add part
- `GET /api/projects/{project_id}/parts` - List parts
- `GET /api/parts/{id}` - Get part details
- `PUT /api/parts/{id}` - Update part
- `POST /api/parts/{id}/upload-cad` - Upload CAD file
- `POST /api/parts/{id}/dfm-analysis` - Trigger DFM analysis

### Supplier Endpoints
- `POST /api/suppliers` - Create supplier
- `GET /api/suppliers` - List suppliers
- `GET /api/suppliers/{id}` - Get supplier
- `PUT /api/suppliers/{id}` - Update supplier
- `POST /api/suppliers/{id}/assign-part` - Assign part

### Order Endpoints
- `POST /api/orders` - Create order
- `GET /api/orders` - List orders
- `GET /api/orders/{id}` - Get order
- `PUT /api/orders/{id}` - Update order
- `POST /api/orders/{id}/timeline` - Add timeline event

### Quality Endpoints
- `POST /api/quality-reports` - Create report
- `GET /api/quality-reports` - List reports
- `GET /api/quality-reports/{id}` - Get report
- `PUT /api/quality-reports/{id}` - Update report

## Workflow Automation

### Project Creation Workflow
1. Customer creates project
2. System assigns project number
3. Customer adds parts
4. Parts undergo DFM analysis
5. System generates quotes
6. Customer reviews and accepts
7. Order created and suppliers assigned

### Part Processing Workflow
1. Part created in project
2. CAD file uploaded
3. DFM analysis performed
4. Supplier matching algorithm runs
5. Best supplier assigned
6. Production begins
7. Quality inspection
8. Shipping and delivery

### Quality Control Workflow
1. Part reaches quality check stage
2. Inspection scheduled
3. Inspection performed
4. Results documented
5. Pass/fail decision
6. Rework or approval

## Role-Based Permissions

### Customer Permissions
- Create/manage own projects
- Add parts to projects
- Upload CAD files
- Request quotes
- Accept/reject quotes
- Track orders
- View quality reports
- Download invoices

### Supplier Permissions
- View assigned parts/orders
- Accept/reject job requests
- Update production progress
- Upload quality reports
- Manage shipping
- View earnings/payments

### Admin Permissions
- Full system access
- Manage users and suppliers
- Override workflows
- View all analytics
- System configuration
- Audit logs

## Supplier Assignment Algorithm

### Scoring Criteria (Weighted)
- **Capability Match (25%)**: Exact process matching
- **Material Expertise (20%)**: Material experience
- **Quality Score (15%)**: Historical performance
- **Delivery Performance (15%)**: On-time delivery rate
- **Capacity Availability (10%)**: Current workload
- **Cost Competitiveness (10%)**: Pricing competitiveness
- **Location Proximity (5%)**: Geographic factors

### Assignment Process
1. Filter eligible suppliers
2. Calculate scores for each criterion
3. Apply weights and compute total score
4. Rank suppliers by score
5. Assign highest-scoring supplier
6. Check capacity constraints
7. Reassign if necessary

## Dashboard Layouts

### Customer Dashboard
- **Overview**: Active projects, orders, spend metrics
- **Projects**: Project list with status and progress
- **Parts**: Part-level details and status
- **Orders**: Order tracking and history
- **Quotes**: Quote management and negotiation
- **Support**: Ticket system and contact

### Supplier Dashboard
- **Job Requests**: New part assignments to accept/reject
- **Active Orders**: Current production jobs
- **Production Progress**: Status updates and timelines
- **Quality Reports**: Inspection results and uploads
- **Shipping**: Delivery coordination
- **Payments**: Earnings and payment tracking

### Admin Dashboard
- **Overview**: System metrics and KPIs
- **Lead Management**: Sales pipeline and conversion
- **Project Management**: All projects across platform
- **Supplier Management**: Network oversight
- **Order Management**: Platform-wide order tracking
- **Quality Control**: Inspection oversight
- **Analytics**: Revenue, performance, and trends

## Security Features

### Authentication
- JWT tokens with expiration
- Password hashing (bcrypt)
- Google OAuth integration
- Session management

### Authorization
- Role-based access control
- Resource-level permissions
- API endpoint protection
- Data filtering by ownership

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- File upload security

### Audit Trail
- All actions logged
- User activity tracking
- Change history
- Compliance reporting

## Performance Optimization

### Database
- Indexed queries
- Aggregation pipelines
- Connection pooling
- Read/write separation

### API
- Response caching
- Pagination
- Async operations
- Rate limiting

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- CDN integration

### File Storage
- GridFS for large files
- Compression
- CDN delivery
- Backup and recovery

## Deployment Architecture

### Production Setup
- Load balancer (nginx)
- Application servers (FastAPI)
- Database cluster (MongoDB)
- File storage (GridFS/S3)
- Redis for caching
- Monitoring and logging

### Scalability
- Horizontal scaling
- Microservices architecture
- Database sharding
- CDN for static assets

### Monitoring
- Application performance
- Error tracking
- User analytics
- Business metrics

## Conclusion

DexAura provides a comprehensive manufacturing marketplace solution with:

- **Multi-part project support** with independent processing
- **Intelligent supplier matching** based on capabilities and performance
- **Automated workflows** for streamlined operations
- **Role-based dashboards** for different user types
- **Quality control** throughout the manufacturing process
- **Real-time tracking** and communication
- **Scalable architecture** for growing business needs

The platform enables efficient collaboration between customers, suppliers, and administrators while maintaining quality standards and operational efficiency in the manufacturing ecosystem.