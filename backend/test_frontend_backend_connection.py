"""
Test script to verify frontend-backend connection
"""
import urllib.request
import urllib.error
import json
import time
import sys
import os
from pathlib import Path

def test_backend_server():
    """Test if backend server is running"""
    base_url = "http://127.0.0.1:8000"
    
    print("=" * 60)
    print("Frontend-Backend Connection Test")
    print("=" * 60)
    print()
    
    # Test endpoints that frontend uses
    endpoints = [
        ("/api/test-route", "Test Route", "GET"),
        ("/api/db-info", "Database Info", "GET"),
    ]
    
    all_passed = True
    
    for endpoint, name, method in endpoints:
        try:
            url = f"{base_url}{endpoint}"
            print(f"[TEST] {name} ({method} {endpoint})...")
            req = urllib.request.Request(url, method=method)
            with urllib.request.urlopen(req, timeout=5) as response:
                status_code = response.getcode()
                if status_code == 200:
                    data = json.loads(response.read().decode())
                    print(f"[SUCCESS] Status: {status_code}")
                    if endpoint == "/api/db-info":
                        print(f"         Database: {data.get('database_name', 'N/A')}")
                        print(f"         MongoDB URL: {data.get('mongo_url', 'N/A')[:50]}...")
                else:
                    print(f"[WARNING] Unexpected status: {status_code}")
                    all_passed = False
        except urllib.error.URLError as e:
            print(f"[ERROR] Connection failed: {str(e)}")
            print(f"         Make sure backend is running:")
            print(f"         cd backend && python start_server.py")
            all_passed = False
        except Exception as e:
            print(f"[ERROR] {str(e)}")
            all_passed = False
        print()
    
    # Check frontend .env file
    print("[INFO] Checking frontend configuration...")
    frontend_env = Path(__file__).parent.parent / "frontend" / ".env"
    if frontend_env.exists():
        with open(frontend_env, 'r') as f:
            content = f.read()
            if "REACT_APP_BACKEND_URL" in content:
                print(f"[SUCCESS] Frontend .env file exists")
                for line in content.split('\n'):
                    if line.strip() and not line.strip().startswith('#'):
                        print(f"         {line.strip()}")
            else:
                print(f"[WARNING] Frontend .env exists but REACT_APP_BACKEND_URL not found")
    else:
        print(f"[WARNING] Frontend .env file not found at {frontend_env}")
        print(f"         Creating it...")
        try:
            with open(frontend_env, 'w') as f:
                f.write("REACT_APP_BACKEND_URL=http://127.0.0.1:8000\n")
            print(f"[SUCCESS] Created frontend .env file")
        except Exception as e:
            print(f"[ERROR] Failed to create frontend .env: {str(e)}")
            all_passed = False
    print()
    
    print("=" * 60)
    if all_passed:
        print("[RESULT] All tests passed! Frontend-Backend connection is ready.")
        print("=" * 60)
        print()
        print("To start the backend server:")
        print("  cd backend")
        print("  python start_server.py")
        print()
        print("To start the frontend:")
        print("  cd frontend")
        print("  yarn start")
        return True
    else:
        print("[RESULT] Some tests failed. Check errors above.")
        print("=" * 60)
        return False

if __name__ == "__main__":
    try:
        result = test_backend_server()
        sys.exit(0 if result else 1)
    except KeyboardInterrupt:
        print("\n[INFO] Test interrupted by user")
        sys.exit(1)

