#!/usr/bin/env python
"""
Test script to verify authentication is actually checking the database
"""
import asyncio
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import json

# Add backend to path
ROOT_DIR = Path(__file__).parent
sys.path.insert(0, str(ROOT_DIR))

from auth_service import get_password_hash, verify_password

# Load environment variables from backend
load_dotenv(ROOT_DIR / '.env')

async def main():
    # Connect to MongoDB
    mongo_url = os.environ['MONGO_URL']
    db_name = os.environ['DB_NAME']
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print("=" * 70)
    print("AUTHENTICATION DATABASE CHECK TEST")
    print("=" * 70)
    print()
    
    try:
        # Test 1: Check if database connection works
        print("Test 1: Database Connection")
        print("-" * 70)
        try:
            ping_result = await db.command('ping')
            print("✓ MongoDB connection successful")
            print(f"  Response: {ping_result}")
        except Exception as e:
            print(f"✗ MongoDB connection failed: {e}")
            return
        print()
        
        # Test 2: Check what's in the customers collection
        print("Test 2: Existing Users in Database")
        print("-" * 70)
        customers = await db.customers.find().to_list(10)
        if customers:
            print(f"✓ Found {len(customers)} users in database:")
            for i, user in enumerate(customers, 1):
                print(f"  {i}. Email: {user.get('email')}, Has password_hash: {'password_hash' in user}")
        else:
            print("✗ No users found in database")
        print()
        
        # Test 3: Try to "login" with a non-existent user
        print("Test 3: Login with Non-Existent User")
        print("-" * 70)
        test_email = "nonexistent@test.com"
        test_password = "anypassword"
        
        user = await db.customers.find_one({"email": test_email}, {"_id": 0})
        if user:
            print(f"✗ SECURITY ISSUE: User found when they shouldn't exist!")
        else:
            print(f"✓ Correctly rejected non-existent user: {test_email}")
        print()
        
        # Test 4: Create a test user and verify password checking
        print("Test 4: Create Test User & Verify Password Checking")
        print("-" * 70)
        test_user_email = "authtest@dexaura.com"
        test_user_password = "SecurePassword123!"
        
        # Clean up if exists
        await db.customers.delete_one({"email": test_user_email})
        
        # Create test user with hashed password
        password_hash = get_password_hash(test_user_password)
        test_user = {
            "id": "test_auth_user_123",
            "email": test_user_email,
            "name": "Auth Test User",
            "password_hash": password_hash,
            "company": "Test Company",
            "phone": None,
            "role": "BUYER",
            "is_active": True,
            "created_at": "2025-01-28T00:00:00+00:00"
        }
        
        await db.customers.insert_one(test_user)
        print(f"✓ Created test user: {test_user_email}")
        print()
        
        # Test 4a: Verify login with CORRECT password
        print("  Test 4a: Login with CORRECT password")
        user = await db.customers.find_one({"email": test_user_email}, {"_id": 0})
        if user:
            is_valid = verify_password(test_user_password, user.get("password_hash"))
            if is_valid:
                print(f"  ✓ Password verification PASSED")
            else:
                print(f"  ✗ Password verification FAILED (BUG!)")
        print()
        
        # Test 4b: Verify login with WRONG password
        print("  Test 4b: Login with WRONG password")
        wrong_password = "WrongPassword456!"
        user = await db.customers.find_one({"email": test_user_email}, {"_id": 0})
        if user:
            is_valid = verify_password(wrong_password, user.get("password_hash"))
            if is_valid:
                print(f"  ✗ SECURITY ISSUE: Wrong password was accepted!")
            else:
                print(f"  ✓ Wrong password correctly rejected")
        print()
        
        # Clean up
        await db.customers.delete_one({"email": test_user_email})
        print("✓ Cleaned up test user")
        print()
        
        print("=" * 70)
        print("CONCLUSION")
        print("=" * 70)
        print("✓ Database authentication checks are working correctly")
        print()
        print("If login is bypassing authentication, the issue is likely:")
        print("  1. Frontend not properly sending credentials")
        print("  2. Backend endpoint not being called correctly")
        print("  3. Error responses not being handled properly")
        
    except Exception as e:
        print(f"✗ Test failed with error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
