"""Test registration flow directly"""
import asyncio
from models import CustomerCreate
from auth_service import get_password_hash, create_access_token
import uuid
from datetime import datetime, timezone

async def test_register_flow():
    """Test the registration flow directly"""
    
    print(f"\n{'='*70}")
    print(f"[TEST] Testing Registration Flow")
    print(f"{'='*70}")
    
    # Test data
    test_email = "testdirect@test.com"
    test_password = "password123"
    test_name = "Test User"
    
    try:
        # Step 1: Create CustomerCreate object
        print(f"\n[STEP 1] Creating CustomerCreate object...")
        customer_data = CustomerCreate(
            email=test_email,
            password=test_password,
            name=test_name
        )
        print(f"✓ CustomerCreate created: {customer_data}")
        
        # Step 2: Hash password
        print(f"\n[STEP 2] Hashing password...")
        password_hash = get_password_hash(test_password)
        print(f"✓ Password hashed: {password_hash[:20]}...")
        
        # Step 3: Create customer dict
        print(f"\n[STEP 3] Creating customer dict...")
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
        print(f"✓ Customer dict created: {customer_dict}")
        
        # Step 4: Create token
        print(f"\n[STEP 4] Creating token...")
        token = create_access_token({"sub": customer_dict["id"], "email": customer_dict["email"]})
        print(f"✓ Token created: {token[:20]}...")
        
        # Step 5: Prepare response
        print(f"\n[STEP 5] Preparing response...")
        response_customer = {k: v for k, v in customer_dict.items() if k != "password_hash"}
        print(f"✓ Response ready: {list(response_customer.keys())}")
        
        response = {
            "customer": response_customer,
            "access_token": token,
            "token_type": "bearer"
        }
        print(f"✓ Final response prepared")
        
        print(f"\n{'='*70}")
        print(f"✓ REGISTRATION FLOW SUCCESSFUL")
        print(f"{'='*70}\n")
        
    except Exception as e:
        print(f"\n✗ ERROR: {e}")
        import traceback
        traceback.print_exc()
        print(f"{'='*70}\n")

if __name__ == "__main__":
    asyncio.run(test_register_flow())
