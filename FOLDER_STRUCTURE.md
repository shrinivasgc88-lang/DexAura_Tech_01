```
dexaura-manufacturing-marketplace/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                    # FastAPI application entry point
│   │   ├── config.py                  # Configuration settings
│   │   ├── database.py                # Database connection and setup
│   │   └── dependencies.py            # Dependency injection
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py                    # User-related models
│   │   ├── project.py                 # Project and Part models
│   │   ├── supplier.py                # Supplier models
│   │   ├── order.py                   # Order and Quote models
│   │   ├── quality.py                 # Quality control models
│   │   └── notification.py            # Notification models
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py                    # Authentication routes
│   │   ├── projects.py                # Project management routes
│   │   ├── parts.py                   # Part management routes
│   │   ├── suppliers.py               # Supplier management routes
│   │   ├── orders.py                  # Order management routes
│   │   ├── quotes.py                  # Quotation routes
│   │   ├── quality.py                 # Quality control routes
│   │   ├── leads.py                   # Lead management routes
│   │   ├── notifications.py           # Notification routes
│   │   ├── files.py                   # File upload/download routes
│   │   └── analytics.py               # Analytics and reporting routes
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth_service.py            # Authentication logic
│   │   ├── email_service.py           # Email notifications
│   │   ├── file_service.py            # File storage and management
│   │   ├── cad_analyzer.py            # CAD file analysis
│   │   ├── workflow_service.py        # Workflow automation
│   │   ├── supplier_matcher.py        # Supplier assignment algorithm
│   │   ├── notification_service.py    # Notification management
│   │   └── audit_service.py           # Audit logging
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── validators.py              # Data validation utilities
│   │   ├── helpers.py                 # General helper functions
│   │   ├── constants.py               # System constants
│   │   └── permissions.py             # Role-based permissions
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py                # Test configuration
│   │   ├── test_auth.py               # Authentication tests
│   │   ├── test_projects.py           # Project tests
│   │   ├── test_orders.py             # Order tests
│   │   ├── test_suppliers.py          # Supplier tests
│   │   └── test_workflow.py           # Workflow tests
│   ├── scripts/
│   │   ├── seed_data.py               # Database seeding
│   │   ├── backup.py                  # Database backup
│   │   └── migrate.py                 # Database migrations
│   ├── requirements.txt               # Python dependencies
│   ├── Dockerfile                     # Docker configuration
│   ├── docker-compose.yml             # Docker Compose setup
│   └── .env.example                   # Environment variables template
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── assets/
│   │       ├── images/
│   │       └── icons/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── styles/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Table.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   └── Loading.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Breadcrumb.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── Overview.jsx
│   │   │   │   ├── MetricsCard.jsx
│   │   │   │   ├── RecentActivity.jsx
│   │   │   │   └── Charts.jsx
│   │   │   ├── projects/
│   │   │   │   ├── ProjectList.jsx
│   │   │   │   ├── ProjectCard.jsx
│   │   │   │   ├── ProjectForm.jsx
│   │   │   │   ├── PartList.jsx
│   │   │   │   ├── PartForm.jsx
│   │   │   │   └── CADUploader.jsx
│   │   │   ├── orders/
│   │   │   │   ├── OrderList.jsx
│   │   │   │   ├── OrderDetails.jsx
│   │   │   │   ├── OrderTimeline.jsx
│   │   │   │   └── OrderForm.jsx
│   │   │   ├── suppliers/
│   │   │   │   ├── SupplierList.jsx
│   │   │   │   ├── SupplierCard.jsx
│   │   │   │   ├── SupplierProfile.jsx
│   │   │   │   └── SupplierAssignment.jsx
│   │   │   ├── quality/
│   │   │   │   ├── QualityReportList.jsx
│   │   │   │   ├── QualityReportForm.jsx
│   │   │   │   ├── InspectionChecklist.jsx
│   │   │   │   └── QualityDashboard.jsx
│   │   │   ├── admin/
│   │   │   │   ├── LeadManagement.jsx
│   │   │   │   ├── UserManagement.jsx
│   │   │   │   ├── SupplierManagement.jsx
│   │   │   │   ├── AnalyticsDashboard.jsx
│   │   │   │   └── SystemSettings.jsx
│   │   │   └── notifications/
│   │   │       ├── NotificationList.jsx
│   │   │       ├── NotificationItem.jsx
│   │   │       └── NotificationCenter.jsx
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   └── ResetPassword.jsx
│   │   │   ├── customer/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Projects.jsx
│   │   │   │   ├── ProjectDetails.jsx
│   │   │   │   ├── Orders.jsx
│   │   │   │   ├── Quotes.jsx
│   │   │   │   ├── Support.jsx
│   │   │   │   └── Profile.jsx
│   │   │   ├── supplier/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── JobRequests.jsx
│   │   │   │   ├── ActiveOrders.jsx
│   │   │   │   ├── ProductionProgress.jsx
│   │   │   │   ├── QualityReports.jsx
│   │   │   │   ├── Shipping.jsx
│   │   │   │   └── Payments.jsx
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── LeadManagement.jsx
│   │   │   │   ├── ProjectManagement.jsx
│   │   │   │   ├── SupplierManagement.jsx
│   │   │   │   ├── OrderManagement.jsx
│   │   │   │   ├── QualityControl.jsx
│   │   │   │   ├── Analytics.jsx
│   │   │   │   ├── UserManagement.jsx
│   │   │   │   └── Settings.jsx
│   │   │   ├── public/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Services.jsx
│   │   │   │   ├── Capabilities.jsx
│   │   │   │   ├── Contact.jsx
│   │   │   │   ├── Blog.jsx
│   │   │   │   └── InstantQuote.jsx
│   │   │   └── shared/
│   │   │       ├── NotFound.jsx
│   │   │       ├── Unauthorized.jsx
│   │   │       └── Maintenance.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useProjects.js
│   │   │   ├── useOrders.js
│   │   │   ├── useSuppliers.js
│   │   │   ├── useNotifications.js
│   │   │   ├── useFileUpload.js
│   │   │   └── useWebSocket.js
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── NotificationContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   ├── projectService.js
│   │   │   ├── orderService.js
│   │   │   ├── supplierService.js
│   │   │   ├── fileService.js
│   │   │   └── notificationService.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   ├── validators.js
│   │   │   ├── formatters.js
│   │   │   └── permissions.js
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── styles/
│   │       ├── globals.css
│   │       ├── components.css
│   │       └── themes.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── craco.config.js
│   ├── jsconfig.json
│   └── Dockerfile
├── docs/
│   ├── API.md
│   ├── architecture.md
│   ├── workflow.md
│   ├── deployment.md
│   ├── user-guides/
│   │   ├── customer-guide.md
│   │   ├── supplier-guide.md
│   │   └── admin-guide.md
│   └── technical/
│       ├── database-schema.md
│       ├── authentication.md
│       └── security.md
├── scripts/
│   ├── setup.sh
│   ├── deploy.sh
│   ├── backup.sh
│   └── monitoring.sh
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   ├── docker-compose.yml
│   ├── docker-compose.prod.yml
│   └── nginx.conf
├── tests/
│   ├── e2e/
│   │   ├── customer-workflow.spec.js
│   │   ├── supplier-workflow.spec.js
│   │   └── admin-workflow.spec.js
│   └── integration/
│       ├── api-tests.js
│       └── workflow-tests.js
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── cd.yml
│   │   └── security.yml
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       ├── feature_request.md
│       └── security_issue.md
├── .gitignore
├── README.md
├── docker-compose.yml
├── package.json
└── requirements.txt
```