"""
Test script to debug login authentication
"""
import asyncio
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

# Add backend to path
ROOT_DIR = Path(__file__).parent
sys.path.insert(0, str(ROOT_DIR))

from auth_service import get_password_hash, verify_password

# Load environment variables
load_dotenv(ROOT_DIR / '.env')

async def test_login():
    # Connect to MongoDB
    mongo_url = os.environ['MONGO_URL']
    db_name = os.environ['DB_NAME']
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    try:
        # Create a test customer with password
        test_email = "testuser@example.com"
        test_password = "testpassword123"
        
        # Remove if exists
        await db.customers.delete_one({"email": test_email})
        
        # Create test customer
        hashed_password = get_password_hash(test_password)
        print(f"Original password: {test_password}")
        print(f"Hashed password: {hashed_password}")
        print()
        
        customer = {
            "id": "test_user_123",
            "email": test_email,
            "name": "Test User",
            "password_hash": hashed_password,
            "role": "BUYER",
            "is_active": True,
            "created_at": "2025-01-27T00:00:00+00:00"
        }
        
        await db.customers.insert_one(customer)
        print(f"✓ Created test customer with email: {test_email}")
        print()
        
        # Test 1: Login with correct password
        print("Test 1: Login with CORRECT password")
        print("-" * 50)
        user = await db.customers.find_one({"email": test_email}, {"_id": 0})
        if user:
            password_valid = verify_password(test_password, user.get("password_hash"))
            print(f"Password verification result: {password_valid}")
            if password_valid:
                print("✓ Correct password accepted")
            else:
                print("✗ Correct password REJECTED (BUG!)")
        else:
            print("✗ User not found")
        print()
        
        # Test 2: Login with wrong password
        print("Test 2: Login with WRONG password")
        print("-" * 50)
        wrong_password = "wrongpassword"
        user = await db.customers.find_one({"email": test_email}, {"_id": 0})
        if user:
            password_valid = verify_password(wrong_password, user.get("password_hash"))
            print(f"Password verification result: {password_valid}")
            if password_valid:
                print("✗ Wrong password ACCEPTED (BUG!)")
            else:
                print("✓ Wrong password rejected")
        else:
            print("✗ User not found")
        print()
        
        # Test 3: Login with empty password
        print("Test 3: Login with EMPTY password")
        print("-" * 50)
        empty_password = ""
        user = await db.customers.find_one({"email": test_email}, {"_id": 0})
        if user:
            try:
                password_valid = verify_password(empty_password, user.get("password_hash"))
                print(f"Password verification result: {password_valid}")
                if password_valid:
                    print("✗ Empty password ACCEPTED (BUG!)")
                else:
                    print("✓ Empty password rejected")
            except Exception as e:
                print(f"Error during verification: {e}")
        else:
            print("✗ User not found")
        print()
        
        # Test 4: Check if password_hash is stored correctly
        print("Test 4: Verify password_hash storage")
        print("-" * 50)
        user = await db.customers.find_one({"email": test_email}, {"_id": 0})
        print(f"password_hash type: {type(user.get('password_hash'))}")
        print(f"password_hash value: {user.get('password_hash')}")
        print(f"password_hash is None: {user.get('password_hash') is None}")
        print(f"password_hash is empty: {user.get('password_hash') == ''}")
        print()
        
        # Clean up
        await db.customers.delete_one({"email": test_email})
        print("✓ Cleaned up test data")
        
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(test_login())
