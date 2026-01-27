"""
Test login authentication with various credentials
"""
import requests
import json

BASE_URL = "http://127.0.0.1:8000/api"

def test_login(email, password, description):
    """Test login with given credentials"""
    print(f"\n{description}")
    print("-" * 60)
    print(f"Email: {email}")
    print(f"Password: {password}")
    
    try:
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={"email": email, "password": password},
            timeout=5
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Login successful!")
            print(f"  Token: {data['access_token'][:20]}...")
            print(f"  User: {data['customer']['name']} ({data['customer']['role']})")
            return True
        else:
            print(f"✗ Login failed!")
            print(f"  Error: {response.json().get('detail', 'Unknown error')}")
            return False
            
    except Exception as e:
        print(f"✗ Error: {str(e)}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("Login Authentication Tests")
    print("=" * 60)
    
    # Test 1: Correct admin credentials
    test_login("admin@dexaura.com", "admin123", "Test 1: Admin with correct password")
    
    # Test 2: Admin with wrong password
    test_login("admin@dexaura.com", "wrongpassword", "Test 2: Admin with WRONG password")
    
    # Test 3: Correct user credentials
    test_login("test@dexaura.com", "test123", "Test 3: User with correct password")
    
    # Test 4: User with wrong password
    test_login("test@dexaura.com", "wrongpassword", "Test 4: User with WRONG password")
    
    # Test 5: Non-existent user
    test_login("nonexistent@example.com", "anypassword", "Test 5: Non-existent user")
    
    # Test 6: Empty password
    test_login("admin@dexaura.com", "", "Test 6: Admin with EMPTY password")
    
    print("\n" + "=" * 60)
    print("Testing completed!")
    print("=" * 60)
