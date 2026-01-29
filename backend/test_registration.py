"""Test registration endpoint"""
import requests
import json
from datetime import datetime
import traceback

def test_registration():
    """Test the registration endpoint"""
    base_url = "http://127.0.0.1:8000"
    
    # Test data - simple email
    test_email = f"test{int(datetime.now().timestamp())}@test.com"
    test_data = {
        "email": test_email,
        "password": "password123",
        "name": "Test User"
    }
    
    print(f"\n{'='*70}")
    print(f"[TEST] Testing Registration Endpoint")
    print(f"{'='*70}")
    print(f"URL: {base_url}/api/auth/register")
    print(f"Data: {json.dumps({**test_data, 'password': '[HIDDEN]'}, indent=2)}")
    print(f"{'='*70}")
    
    try:
        response = requests.post(
            f"{base_url}/api/auth/register",
            json=test_data,
            timeout=10
        )
        
        print(f"\n[TEST] HTTP Status: {response.status_code}")
        
        if response.status_code == 200:
            response_data = response.json()
            print(f"\n✓ REGISTRATION SUCCESS")
            print(json.dumps(response_data, indent=2, default=str))
        else:
            print(f"\n✗ REGISTRATION FAILED (Status {response.status_code})")
            print(f"Response: {response.text}")
                    
    except Exception as e:
        print(f"\n✗ ERROR: {str(e)}")
        traceback.print_exc()
    
    print(f"\n{'='*70}\n")

if __name__ == "__main__":
    test_registration()
