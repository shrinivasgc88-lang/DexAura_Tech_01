#!/usr/bin/env python3
"""
Test script to verify backend login endpoint is working
"""
import asyncio
import httpx

async def test_login():
    """Test the login endpoint directly"""
    
    print("\n" + "="*70)
    print("TESTING BACKEND LOGIN ENDPOINT")
    print("="*70 + "\n")
    
    backend_url = "http://127.0.0.1:8000"
    
    print(f"Backend URL: {backend_url}\n")
    
    # Test 1: Check if server is running
    print("[TEST 1] Checking if backend server is running...")
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{backend_url}/api/test-route")
            print(f"✓ Server is responding: {response.status_code}")
            print(f"  Response: {response.json()}\n")
    except Exception as e:
        print(f"✗ Server is NOT responding: {e}")
        print(f"  Make sure backend is running: python start_server.py\n")
        return
    
    # Test 2: Test login endpoint exists
    print("[TEST 2] Checking if /api/auth/login endpoint exists...")
    try:
        async with httpx.AsyncClient() as client:
            # Send an empty POST to test endpoint
            response = await client.post(
                f"{backend_url}/api/auth/login",
                json={}
            )
            print(f"✓ Endpoint is accessible: {response.status_code}")
            print(f"  Response: {response.json()}\n")
    except Exception as e:
        print(f"✗ Endpoint error: {e}\n")
    
    # Test 3: Test with wrong password
    print("[TEST 3] Testing login with WRONG password...")
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{backend_url}/api/auth/login",
                json={
                    "email": "test@dexaura.com",
                    "password": "WRONGPASSWORD123"
                }
            )
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.json()}")
            
            if response.status_code == 401:
                print(f"✓ CORRECT: Wrong password rejected with 401\n")
            else:
                print(f"✗ WRONG: Should be 401 but got {response.status_code}\n")
    except Exception as e:
        print(f"✗ Error: {e}\n")
    
    # Test 4: Test with correct password
    print("[TEST 4] Testing login with CORRECT password...")
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{backend_url}/api/auth/login",
                json={
                    "email": "test@dexaura.com",
                    "password": "testpassword"
                }
            )
            print(f"Status Code: {response.status_code}")
            data = response.json()
            
            if response.status_code == 200:
                print(f"✓ CORRECT: Login succeeded with 200")
                print(f"  Has token: {'access_token' in data}")
                print(f"  Has customer: {'customer' in data}")
                if 'customer' in data:
                    print(f"  Customer email: {data['customer'].get('email')}\n")
            else:
                print(f"✗ WRONG: Should be 200 but got {response.status_code}")
                print(f"  Response: {data}\n")
    except Exception as e:
        print(f"✗ Error: {e}\n")
    
    print("="*70)
    print("TESTS COMPLETE")
    print("="*70 + "\n")

if __name__ == "__main__":
    asyncio.run(test_login())
