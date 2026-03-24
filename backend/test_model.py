"""Quick test of the CustomerCreate model"""
from models import CustomerCreate

try:
    data = {
        "email": "test@test.com",
        "password": "password123",
        "name": "Test User"
    }
    print(f"Creating CustomerCreate with: {data}")
    customer = CustomerCreate(**data)
    print(f"✓ Success: {customer}")
except Exception as e:
    print(f"✗ Error: {e}")
    import traceback
    traceback.print_exc()
