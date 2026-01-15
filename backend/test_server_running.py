"""
Test if the server is running and responding
"""
import urllib.request
import urllib.error
import json
import time
import sys

def test_server():
    """Test if server is running"""
    base_url = "http://127.0.0.1:8000"
    
    print("=" * 60)
    print("Testing Backend Server")
    print("=" * 60)
    print()
    
    # Wait a bit for server to start
    print("[INFO] Waiting for server to start...")
    time.sleep(5)
    
    # Test endpoints
    endpoints = [
        ("/api/test-route", "Test Route"),
        ("/api/db-info", "Database Info"),
    ]
    
    all_passed = True
    
    for endpoint, name in endpoints:
        try:
            url = f"{base_url}{endpoint}"
            print(f"[TEST] Testing {name} ({endpoint})...")
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=5) as response:
                status_code = response.getcode()
                if status_code == 200:
                    print(f"[SUCCESS] {name}: OK (Status: {status_code})")
                    if endpoint == "/api/db-info":
                        data = json.loads(response.read().decode())
                        print(f"         Database: {data.get('database_name', 'N/A')}")
                else:
                    print(f"[WARNING] {name}: Unexpected status {status_code}")
                    all_passed = False
        except urllib.error.URLError as e:
            print(f"[ERROR] {name}: Server is not running or not accessible")
            print(f"         Error: {str(e)}")
            print(f"         Make sure the server is started with: uvicorn server:app --host 127.0.0.1 --port 8000")
            all_passed = False
        except Exception as e:
            print(f"[ERROR] {name}: {str(e)}")
            all_passed = False
        print()
    
    print("=" * 60)
    if all_passed:
        print("[RESULT] Server is running and responding correctly!")
        print("=" * 60)
        return True
    else:
        print("[RESULT] Server test failed. Check errors above.")
        print("=" * 60)
        return False

if __name__ == "__main__":
    try:
        result = test_server()
        sys.exit(0 if result else 1)
    except KeyboardInterrupt:
        print("\n[INFO] Test interrupted by user")
        sys.exit(1)

