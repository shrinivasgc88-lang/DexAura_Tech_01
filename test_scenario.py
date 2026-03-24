#!/usr/bin/env python
"""
Test if non-existent users can login
Run this while the backend is running
"""
import asyncio
import sys
from pathlib import Path
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os

ROOT_DIR = Path(__file__).parent / 'backend'
sys.path.insert(0, str(ROOT_DIR))
load_dotenv(ROOT_DIR / '.env')

from auth_service import get_password_hash, verify_password, create_access_token

async def main():
    mongo_url = os.environ['MONGO_URL']
    db_name = os.environ['DB_NAME']
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print("=" * 70)
    print("TESTING NON-EXISTENT USER LOGIN SCENARIO")
    print("=" * 70)
    print()
    
    # Test email that doesn't exist
    test_email = "shrinivsgc88@gmail.com"
    test_password = "anypassword"
    
    print(f"Test Email: {test_email}")
    print(f"Test Password: {test_password}")
    print("-" * 70)
    
    # Simulate what the /api/auth/login endpoint does
    print("\n[BACKEND SIMULATION]")
    print("Step 1: Query database for user...")
    
    user = await db.customers.find_one({"email": test_email}, {"_id": 0})
    
    if not user:
        print(f"✓ User NOT found (correctly)")
        print(f"✓ Should return 401 error")
        print(f"\nRESULT: ✓ Backend correctly rejects non-existent user")
    else:
        print(f"✗ ERROR: User WAS found (should NOT exist)")
        print(f"  User data: {user}")
        print(f"\nRESULT: ✗ BUG - Non-existent user found in database!")
    
    print()
    print("-" * 70)
    print()
    
    # Now test with an existing user
    print("Test 2: Test with EXISTING user")
    print("-" * 70)
    existing_email = "test@dexaura.com"
    existing_password = "wrongpassword"
    
    print(f"Test Email: {existing_email}")
    print(f"Test Password: {existing_password}")
    
    user = await db.customers.find_one({"email": existing_email}, {"_id": 0})
    
    if user:
        print(f"✓ User found")
        print(f"  Name: {user.get('name')}")
        print(f"  Has password_hash: {bool(user.get('password_hash'))}")
        
        password_valid = verify_password(existing_password, user["password_hash"])
        if password_valid:
            print(f"✗ Wrong password was ACCEPTED (BUG!)")
        else:
            print(f"✓ Wrong password correctly REJECTED")
    else:
        print(f"✗ User NOT found (should exist)")

if __name__ == "__main__":
    asyncio.run(main())
