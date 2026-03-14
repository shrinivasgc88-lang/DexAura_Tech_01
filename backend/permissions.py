"""
DexAura Manufacturing Marketplace - Role-Based Permissions System
Controls access to resources and actions based on user roles
"""

from enum import Enum
from typing import Dict, List, Set, Optional, Callable
from functools import wraps
import inspect

class Permission(Enum):
    # User Management
    CREATE_USER = "create_user"
    READ_USER = "read_user"
    UPDATE_USER = "update_user"
    DELETE_USER = "delete_user"

    # Project Management
    CREATE_PROJECT = "create_project"
    READ_PROJECT = "read_project"
    UPDATE_PROJECT = "update_project"
    DELETE_PROJECT = "delete_project"

    # Part Management
    CREATE_PART = "create_part"
    READ_PART = "read_part"
    UPDATE_PART = "update_part"
    DELETE_PART = "delete_part"
    UPLOAD_CAD = "upload_cad"
    DFM_ANALYZE = "dfm_analyze"

    # Supplier Management
    CREATE_SUPPLIER = "create_supplier"
    READ_SUPPLIER = "read_supplier"
    UPDATE_SUPPLIER = "update_supplier"
    DELETE_SUPPLIER = "delete_supplier"
    ASSIGN_SUPPLIER = "assign_supplier"

    # Order Management
    CREATE_ORDER = "create_order"
    READ_ORDER = "read_order"
    UPDATE_ORDER = "update_order"
    DELETE_ORDER = "delete_order"

    # Quote Management
    CREATE_QUOTE = "create_quote"
    READ_QUOTE = "read_quote"
    UPDATE_QUOTE = "update_quote"
    DELETE_QUOTE = "delete_quote"
    APPROVE_QUOTE = "approve_quote"

    # Quality Control
    CREATE_QC_REPORT = "create_qc_report"
    READ_QC_REPORT = "read_qc_report"
    UPDATE_QC_REPORT = "update_qc_report"
    APPROVE_QC_REPORT = "approve_qc_report"

    # Lead Management
    CREATE_LEAD = "create_lead"
    READ_LEAD = "read_lead"
    UPDATE_LEAD = "update_lead"
    CONVERT_LEAD = "convert_lead"

    # File Management
    UPLOAD_FILE = "upload_file"
    DOWNLOAD_FILE = "download_file"
    DELETE_FILE = "delete_file"

    # Analytics
    VIEW_ANALYTICS = "view_analytics"
    EXPORT_DATA = "export_data"

    # System Administration
    SYSTEM_CONFIG = "system_config"
    AUDIT_LOGS = "audit_logs"
    BACKUP_DATA = "backup_data"

class UserRole(str, Enum):
    CUSTOMER = "CUSTOMER"
    SUPPLIER = "SUPPLIER"
    ADMIN = "ADMIN"

# Permission mappings for each role
ROLE_PERMISSIONS: Dict[UserRole, Set[Permission]] = {
    UserRole.CUSTOMER: {
        # Project management
        Permission.CREATE_PROJECT,
        Permission.READ_PROJECT,
        Permission.UPDATE_PROJECT,
        Permission.DELETE_PROJECT,

        # Part management
        Permission.CREATE_PART,
        Permission.READ_PART,
        Permission.UPDATE_PART,
        Permission.DELETE_PART,
        Permission.UPLOAD_CAD,

        # Orders and quotes
        Permission.READ_ORDER,
        Permission.READ_QUOTE,

        # File management
        Permission.UPLOAD_FILE,
        Permission.DOWNLOAD_FILE,

        # Quality reports (read-only for their orders)
        Permission.READ_QC_REPORT,
    },

    UserRole.SUPPLIER: {
        # Read access to assigned parts and orders
        Permission.READ_PART,
        Permission.READ_ORDER,
        Permission.READ_QUOTE,

        # Quality reports for their work
        Permission.CREATE_QC_REPORT,
        Permission.READ_QC_REPORT,
        Permission.UPDATE_QC_REPORT,

        # File management
        Permission.UPLOAD_FILE,
        Permission.DOWNLOAD_FILE,

        # Basic analytics for their performance
        Permission.VIEW_ANALYTICS,
    },

    UserRole.ADMIN: {
        # Full access to everything
        Permission.CREATE_USER,
        Permission.READ_USER,
        Permission.UPDATE_USER,
        Permission.DELETE_USER,

        Permission.CREATE_PROJECT,
        Permission.READ_PROJECT,
        Permission.UPDATE_PROJECT,
        Permission.DELETE_PROJECT,

        Permission.CREATE_PART,
        Permission.READ_PART,
        Permission.UPDATE_PART,
        Permission.DELETE_PART,
        Permission.UPLOAD_CAD,
        Permission.DFM_ANALYZE,

        Permission.CREATE_SUPPLIER,
        Permission.READ_SUPPLIER,
        Permission.UPDATE_SUPPLIER,
        Permission.DELETE_SUPPLIER,
        Permission.ASSIGN_SUPPLIER,

        Permission.CREATE_ORDER,
        Permission.READ_ORDER,
        Permission.UPDATE_ORDER,
        Permission.DELETE_ORDER,

        Permission.CREATE_QUOTE,
        Permission.READ_QUOTE,
        Permission.UPDATE_QUOTE,
        Permission.DELETE_QUOTE,
        Permission.APPROVE_QUOTE,

        Permission.CREATE_QC_REPORT,
        Permission.READ_QC_REPORT,
        Permission.UPDATE_QC_REPORT,
        Permission.APPROVE_QC_REPORT,

        Permission.CREATE_LEAD,
        Permission.READ_LEAD,
        Permission.UPDATE_LEAD,
        Permission.CONVERT_LEAD,

        Permission.UPLOAD_FILE,
        Permission.DOWNLOAD_FILE,
        Permission.DELETE_FILE,

        Permission.VIEW_ANALYTICS,
        Permission.EXPORT_DATA,

        Permission.SYSTEM_CONFIG,
        Permission.AUDIT_LOGS,
        Permission.BACKUP_DATA,
    }
}

# Resource ownership rules
class OwnershipRules:
    @staticmethod
    def owns_project(user_id: str, user_role: UserRole, project_customer_id: str) -> bool:
        """Check if user owns a project"""
        if user_role == UserRole.ADMIN:
            return True
        return user_id == project_customer_id

    @staticmethod
    def owns_order(user_id: str, user_role: UserRole, order_customer_id: str) -> bool:
        """Check if user owns an order"""
        if user_role == UserRole.ADMIN:
            return True
        return user_id == order_customer_id

    @staticmethod
    def can_access_supplier_data(user_id: str, user_role: UserRole, supplier_id: str) -> bool:
        """Check if user can access supplier data"""
        if user_role in [UserRole.ADMIN, UserRole.SUPPLIER]:
            return True
        return False

    @staticmethod
    def can_access_part(user_id: str, user_role: UserRole, part_project_customer_id: str, part_supplier_id: Optional[str] = None) -> bool:
        """Check if user can access a part"""
        if user_role == UserRole.ADMIN:
            return True
        if user_role == UserRole.CUSTOMER and user_id == part_project_customer_id:
            return True
        if user_role == UserRole.SUPPLIER and part_supplier_id and user_id == part_supplier_id:
            return True
        return False

class PermissionChecker:
    def __init__(self):
        self.ownership_rules = OwnershipRules()

    def has_permission(self, user_role: UserRole, permission: Permission) -> bool:
        """Check if a role has a specific permission"""
        return permission in ROLE_PERMISSIONS.get(user_role, set())

    def check_resource_access(self, user_id: str, user_role: UserRole, resource_type: str,
                            resource_id: str, action: str, **kwargs) -> bool:
        """Check if user can perform action on specific resource"""
        permission = self._get_permission_for_action(resource_type, action)
        if not permission:
            return False

        # Check basic permission
        if not self.has_permission(user_role, permission):
            return False

        # Check resource ownership/rules
        return self._check_ownership_rules(user_id, user_role, resource_type, resource_id, **kwargs)

    def _get_permission_for_action(self, resource_type: str, action: str) -> Optional[Permission]:
        """Map resource type and action to permission"""
        permission_map = {
            ("user", "create"): Permission.CREATE_USER,
            ("user", "read"): Permission.READ_USER,
            ("user", "update"): Permission.UPDATE_USER,
            ("user", "delete"): Permission.DELETE_USER,

            ("project", "create"): Permission.CREATE_PROJECT,
            ("project", "read"): Permission.READ_PROJECT,
            ("project", "update"): Permission.UPDATE_PROJECT,
            ("project", "delete"): Permission.DELETE_PROJECT,

            ("part", "create"): Permission.CREATE_PART,
            ("part", "read"): Permission.READ_PART,
            ("part", "update"): Permission.UPDATE_PART,
            ("part", "delete"): Permission.DELETE_PART,

            ("supplier", "create"): Permission.CREATE_SUPPLIER,
            ("supplier", "read"): Permission.READ_SUPPLIER,
            ("supplier", "update"): Permission.UPDATE_SUPPLIER,
            ("supplier", "delete"): Permission.DELETE_SUPPLIER,

            ("order", "create"): Permission.CREATE_ORDER,
            ("order", "read"): Permission.READ_ORDER,
            ("order", "update"): Permission.UPDATE_ORDER,
            ("order", "delete"): Permission.DELETE_ORDER,

            ("quote", "create"): Permission.CREATE_QUOTE,
            ("quote", "read"): Permission.READ_QUOTE,
            ("quote", "update"): Permission.UPDATE_QUOTE,
            ("quote", "delete"): Permission.DELETE_QUOTE,

            ("qc_report", "create"): Permission.CREATE_QC_REPORT,
            ("qc_report", "read"): Permission.READ_QC_REPORT,
            ("qc_report", "update"): Permission.UPDATE_QC_REPORT,

            ("lead", "create"): Permission.CREATE_LEAD,
            ("lead", "read"): Permission.READ_LEAD,
            ("lead", "update"): Permission.UPDATE_LEAD,

            ("file", "upload"): Permission.UPLOAD_FILE,
            ("file", "download"): Permission.DOWNLOAD_FILE,
            ("file", "delete"): Permission.DELETE_FILE,
        }

        return permission_map.get((resource_type, action))

    def _check_ownership_rules(self, user_id: str, user_role: UserRole, resource_type: str,
                             resource_id: str, **kwargs) -> bool:
        """Check resource-specific ownership rules"""
        if user_role == UserRole.ADMIN:
            return True

        if resource_type == "project":
            customer_id = kwargs.get("customer_id")
            return self.ownership_rules.owns_project(user_id, user_role, customer_id)

        elif resource_type == "part":
            project_customer_id = kwargs.get("project_customer_id")
            supplier_id = kwargs.get("supplier_id")
            return self.ownership_rules.can_access_part(user_id, user_role, project_customer_id, supplier_id)

        elif resource_type == "order":
            customer_id = kwargs.get("customer_id")
            return self.ownership_rules.owns_order(user_id, user_role, customer_id)

        elif resource_type == "supplier":
            return self.ownership_rules.can_access_supplier_data(user_id, user_role, resource_id)

        # Default to allowing access if no specific rules
        return True

# Decorator for API endpoints
def require_permission(resource_type: str, action: str):
    """Decorator to require specific permission for API endpoint"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Extract user from request context (implementation depends on your auth system)
            # This is a placeholder - actual implementation would get user from request
            user = kwargs.get('current_user')
            if not user:
                # Try to find user in args
                for arg in args:
                    if hasattr(arg, 'role') and hasattr(arg, 'id'):
                        user = arg
                        break

            if not user:
                raise HTTPException(status_code=401, detail="Authentication required")

            permission_checker = PermissionChecker()

            # Get additional context for ownership checks
            ownership_kwargs = {}
            if resource_type == "project" and 'project_id' in kwargs:
                # Would need to fetch project to get customer_id
                ownership_kwargs['customer_id'] = "placeholder"  # Replace with actual lookup
            elif resource_type == "part" and 'part_id' in kwargs:
                # Would need to fetch part and project data
                ownership_kwargs.update({
                    'project_customer_id': "placeholder",
                    'supplier_id': "placeholder"
                })

            if not permission_checker.check_resource_access(
                user.id, user.role, resource_type, kwargs.get(f'{resource_type}_id', ''), action, **ownership_kwargs
            ):
                raise HTTPException(status_code=403, detail="Insufficient permissions")

            return await func(*args, **kwargs)
        return wrapper
    return decorator

# Field-level permissions for data filtering
class DataFilter:
    @staticmethod
    def filter_user_data(user_role: UserRole, data: Dict[str, Any]) -> Dict[str, Any]:
        """Filter sensitive data based on user role"""
        if user_role == UserRole.ADMIN:
            return data

        # Remove sensitive fields for non-admin users
        sensitive_fields = ['internal_notes', 'profit_margin', 'supplier_cost']
        filtered_data = data.copy()

        for field in sensitive_fields:
            filtered_data.pop(field, None)

        return filtered_data

    @staticmethod
    def filter_project_list(user_id: str, user_role: UserRole, projects: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Filter project list based on user permissions"""
        if user_role == UserRole.ADMIN:
            return projects

        if user_role == UserRole.CUSTOMER:
            return [p for p in projects if p.get('customer_id') == user_id]

        if user_role == UserRole.SUPPLIER:
            # Suppliers can see projects where they have assigned parts
            return [p for p in projects if any(
                part.get('supplier_id') == user_id for part in p.get('parts', [])
            )]

        return []

# Initialize global permission checker
permission_checker = PermissionChecker()