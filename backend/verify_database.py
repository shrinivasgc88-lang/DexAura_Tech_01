#!/usr/bin/env python3
"""
Database verification script - Check if test user exists and has proper password hash
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from auth_service import verify_password

load_dotenv()

async def main():
    print(f"\n{'='*70}")
    print("DATABASE VERIFICATION SCRIPT")
    print(f"{'='*70}\n")
    
    mongo_url = os.environ.get('MONGO_URL')
    db_name = os.environ.get('DB_NAME')
    
    if not mongo_url or not db_name:
        print("❌ ERROR: MONGO_URL or DB_NAME not set in environment")
        return
    
    print(f"MongoDB URL: {mongo_url}")
    print(f"Database: {db_name}\n")
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    try:
        # Check connection
        print("[1] Testing MongoDB connection...")
        await db.command('ping')
        print("    ✓ Connected successfully\n")
        
        # List all customers
        print("[2] Checking customers in database...")
        customers = await db.customers.find().to_list(None)
        
        if not customers:
            print("    ❌ NO CUSTOMERS FOUND")
            print("    Please register a user through the app first\n")
            return
        
        print(f"    ✓ Found {len(customers)} customer(s)\n")
        
        # Check each customer
        for i, customer in enumerate(customers, 1):
            email = customer.get('email', 'NO EMAIL')
            name = customer.get('name', 'NO NAME')
            password_hash = customer.get('password_hash')
            is_active = customer.get('is_active', True)
            
            print(f"    [{i}] {email}")
            print(f"        Name: {name}")
            print(f"        Active: {is_active}")
            print(f"        Has password: {bool(password_hash)}")
            
            if password_hash:
                # Test password verification
                test_password = "testpassword"
                try:
                    is_valid = verify_password(test_password, password_hash)
                    if is_valid:
                        print(f"        ✓ Password 'testpassword' matches this user!")
                    else:
                        print(f"        ✗ Password 'testpassword' does NOT match")
                except Exception as e:
                    print(f"        ✗ Password verification error: {e}")
            print()
        
        # Final check
        print("[3] Checking for test user (test@dexaura.com)...")
        test_user = await db.customers.find_one(
            {"email": "test@dexaura.com"}, 
            {"_id": 0}
        )
        
        if test_user:
            print("    ✓ Test user exists!")
            print(f"      Email: {test_user.get('email')}")
            print(f"      Name: {test_user.get('name')}")
            
            password_hash = test_user.get('password_hash')
            if password_hash:
                # Test the default password
                is_valid = verify_password("testpassword", password_hash)
                if is_valid:
                    print(f"      ✓ Password 'testpassword' is CORRECT")
                else:
                    print(f"      ✗ Password 'testpassword' is INCORRECT")
            else:
                print(f"      ❌ NO PASSWORD HASH")
        else:
            print("    ❌ Test user (test@dexaura.com) NOT FOUND")
            print("    You need to register this user first")
        
        print(f"\n{'='*70}")
        print("DATABASE CHECK COMPLETE")
        print(f"{'='*70}\n")
        
    except Exception as e:
        print(f"❌ ERROR: {e}\n")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(main())
