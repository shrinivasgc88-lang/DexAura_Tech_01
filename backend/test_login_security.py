#!/usr/bin/env python3
"""
Test login with wrong credentials
This script tests the authentication system
"""
import asyncio
import httpx
import json
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

async def main():
    # First, check what users exist in the database
    print(f"\n{'='*70}")
    print("STEP 1: Checking what users exist in the database")
    print(f"{'='*70}\n")
    
    mongo_url = os.environ['MONGO_URL']
    db_name = os.environ['DB_NAME']
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    customers = await db.customers.find().to_list(None)
    
    if not customers:
        print("❌ NO USERS FOUND IN DATABASE!")
        print("Please create test users first")
        client.close()
        return
    
    print(f"✓ Found {len(customers)} user(s):\n")
    test_email = None
    for customer in customers:
        email = customer.get('email', 'NO EMAIL')
        name = customer.get('name', 'NO NAME')
        has_pass = bool(customer.get('password_hash'))
        is_active = customer.get('is_active', True)
        print(f"  Email: {email}")
        print(f"  Name:  {name}")
        print(f"  Has password: {has_pass}")
        print(f"  Is active: {is_active}\n")
        if not test_email and has_pass and is_active:
            test_email = email
    
    client.close()
    
    if not test_email:
        print("❌ No valid user found (must have password and be active)")
        return
    
    # Now test login
    print(f"{'='*70}")
    print("STEP 2: Testing login with CORRECT credentials")
    print(f"{'='*70}\n")
    
    backend_url = "http://127.0.0.1:8000"
    
    async with httpx.AsyncClient() as client:
        # TEST 1: Login with correct password
        print(f"Test 1: Login with CORRECT credentials")
        print(f"  Email: {test_email}")
        print(f"  Password: (correct)\n")
        
        try:
            response = await client.post(
                f"{backend_url}/api/auth/login",
                json={"email": test_email, "password": "testpassword"}
            )
            print(f"Status: {response.status_code}")
            if response.status_code == 200:
                print(f"✓ LOGIN SUCCESSFUL")
                data = response.json()
                print(f"  Token: {data.get('access_token', 'NONE')[:50]}...")
                print(f"  Customer: {data.get('customer', {}).get('email')}")
            else:
                print(f"✗ LOGIN FAILED")
                print(f"  Error: {response.json().get('detail', response.text)}")
        except Exception as e:
            print(f"✗ CONNECTION ERROR: {e}")
        
        # TEST 2: Login with WRONG password
        print(f"\n{'='*70}")
        print(f"Test 2: Login with WRONG credentials (wrong password)")
        print(f"  Email: {test_email}")
        print(f"  Password: wrongpassword123\n")
        
        try:
            response = await client.post(
                f"{backend_url}/api/auth/login",
                json={"email": test_email, "password": "wrongpassword123"}
            )
            print(f"Status: {response.status_code}")
            if response.status_code == 401:
                print(f"✓ CORRECTLY REJECTED with 401")
                print(f"  Error: {response.json().get('detail')}")
            else:
                print(f"✗ FAILED - Should be 401 but got {response.status_code}")
                print(f"  Response: {response.json()}")
        except Exception as e:
            print(f"✗ CONNECTION ERROR: {e}")
        
        # TEST 3: Login with NON-EXISTENT email
        print(f"\n{'='*70}")
        print(f"Test 3: Login with NON-EXISTENT email")
        print(f"  Email: nonexistent@test.com")
        print(f"  Password: anypassword\n")
        
        try:
            response = await client.post(
                f"{backend_url}/api/auth/login",
                json={"email": "nonexistent@test.com", "password": "anypassword"}
            )
            print(f"Status: {response.status_code}")
            if response.status_code == 401:
                print(f"✓ CORRECTLY REJECTED with 401")
                print(f"  Error: {response.json().get('detail')}")
            else:
                print(f"✗ FAILED - Should be 401 but got {response.status_code}")
                print(f"  Response: {response.json()}")
        except Exception as e:
            print(f"✗ CONNECTION ERROR: {e}")

if __name__ == "__main__":
    asyncio.run(main())
