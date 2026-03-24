#!/usr/bin/env python3
"""Test the login endpoint with various credentials"""

import requests
import json

API_URL = "http://127.0.0.1:8000"

def test_login(email, password, description):
    """Test login with given credentials"""
    print(f"\n{'='*60}")
    print(f"Test: {description}")
    print(f"Email: {email}, Password: {password}")
    print(f"{'='*60}")
    
    try:
        response = requests.post(
            f"{API_URL}/api/auth/login",
            json={"email": email, "password": password},
            timeout=5
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response:")
        print(json.dumps(response.json(), indent=2))
        
        if response.status_code == 200:
            print("✓ LOGIN SUCCESSFUL")
            return True
        else:
            print("✗ LOGIN FAILED")
            return False
            
    except Exception as e:
        print(f"✗ ERROR: {e}")
        return False

# Run tests
print("Testing Login Endpoint")
print("="*60)

test_login("admin@dexaura.com", "admin123", "Correct credentials")
test_login("admin@dexaura.com", "wrongpassword", "Wrong password")
test_login("wrong@email.com", "admin123", "Wrong email")
test_login("wrong@email.com", "wrongpassword", "Both wrong")
test_login("admin@dexaura.com", "", "Empty password")

print("\n" + "="*60)
print("Test Complete")
