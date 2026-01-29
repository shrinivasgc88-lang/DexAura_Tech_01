"""Test the fixed update role endpoint"""
import requests
import json

base_url = "http://127.0.0.1:8000"

# Login as admin
print("Logging in as admin...")
login_response = requests.post(
    f"{base_url}/api/auth/login",
    json={"email": "admin@dexaura.com", "password": "admin123"}
)

if login_response.status_code != 200:
    print(f"✗ Login failed: {login_response.text}")
    exit(1)

admin_data = login_response.json()
admin_token = admin_data["access_token"]
admin_id = admin_data["customer"]["id"]
print(f"✓ Logged in as admin")

# Get customers to find one to update
print("\nFetching customers...")
headers = {"Authorization": f"Bearer {admin_token}"}
customers_response = requests.get(
    f"{base_url}/api/admin/customers?limit=100",
    headers=headers
)

if customers_response.status_code != 200:
    print(f"✗ Failed to get customers: {customers_response.status_code}")
    print(customers_response.text)
    exit(1)

customers = customers_response.json().get("customers", [])
print(f"✓ Found {len(customers)} customers")

# Find a test customer
test_customer = None
for customer in customers:
    if customer["id"] != admin_id and customer["email"] != "admin@dexaura.com":
        test_customer = customer
        break

if not test_customer:
    print("✗ No suitable test customer found")
    exit(1)

print(f"  Testing with: {test_customer['email']} (current role: {test_customer['role']})")

# Test the endpoint with new role
new_role = "OWNER" if test_customer["role"] != "OWNER" else "VIEWER"
print(f"\nUpdating role to {new_role}...")

update_response = requests.put(
    f"{base_url}/api/admin/customers/{test_customer['id']}/role",
    json={"role": new_role},
    headers=headers
)

print(f"Response status: {update_response.status_code}")
if update_response.status_code == 200:
    print(f"Response: {json.dumps(update_response.json(), indent=2)}")
    print(f"\n✓ SUCCESS! Role updated to {new_role}")
else:
    print(f"✗ Failed: {update_response.text}")
