#!/usr/bin/env python
"""
Test backend login endpoint with non-existent user
"""
import requests
import json

BASE_URL = "http://127.0.0.1:8000/api"

print("=" * 70)
print("TESTING LOGIN ENDPOINT DIRECTLY")
print("=" * 70)
print()

# Test 1: Non-existent user that you're testing with
print("Test 1: Login with NON-EXISTENT user (shrinivsgc88@gmail.com)")
print("-" * 70)
try:
    response = requests.post(
        f"{BASE_URL}/auth/login",
        json={"email": "shrinivsgc88@gmail.com", "password": "anypassword"},
        timeout=5
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    if response.status_code == 401:
        print("✓ CORRECT: Non-existent user rejected (401)")
    else:
        print("✗ BUG: Non-existent user was ACCEPTED (should be 401)")
except Exception as e:
    print(f"Error: {e}")
print()

# Test 2: Non-existent user with different email
print("Test 2: Login with another NON-EXISTENT user (fake@test.com)")
print("-" * 70)
try:
    response = requests.post(
        f"{BASE_URL}/auth/login",
        json={"email": "fake@test.com", "password": "wrongpassword"},
        timeout=5
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    if response.status_code == 401:
        print("✓ CORRECT: Non-existent user rejected (401)")
    else:
        print("✗ BUG: Non-existent user was ACCEPTED (should be 401)")
except Exception as e:
    print(f"Error: {e}")
print()

# Test 3: Existing user with correct password
print("Test 3: Login with EXISTING user with CORRECT password")
print("-" * 70)
try:
    response = requests.post(
        f"{BASE_URL}/auth/login",
        json={"email": "test@dexaura.com", "password": "testpassword"},
        timeout=5
    )
    print(f"Status Code: {response.status_code}")
    data = response.json()
    if response.status_code == 200:
        print(f"✓ Status: 200 OK")
        print(f"  Token: {data.get('access_token', 'MISSING')[:30]}...")
        print(f"  Customer: {data.get('customer', {}).get('email', 'MISSING')}")
    else:
        print(f"Response: {json.dumps(data, indent=2)}")
except Exception as e:
    print(f"Error: {e}")
print()

# Test 4: Existing user with WRONG password
print("Test 4: Login with EXISTING user with WRONG password")
print("-" * 70)
try:
    response = requests.post(
        f"{BASE_URL}/auth/login",
        json={"email": "test@dexaura.com", "password": "wrongpassword"},
        timeout=5
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    if response.status_code == 401:
        print("✓ CORRECT: Wrong password rejected (401)")
    else:
        print("✗ BUG: Wrong password was ACCEPTED")
except Exception as e:
    print(f"Error: {e}")
