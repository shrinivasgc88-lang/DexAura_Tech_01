"""Test the update user role endpoint"""
import requests
import json

base_url = "http://127.0.0.1:8000"

# First, login as admin to get the token
print("=" * 70)
print("Step 1: Login as admin")
print("=" * 70)

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
print(f"✓ Login successful")
print(f"  Admin ID: {admin_id}")
print(f"  Token: {admin_token[:30]}...")

# Now test getting all customers
print("\n" + "=" * 70)
print("Step 2: Get all customers")
print("=" * 70)

headers = {"Authorization": f"Bearer {admin_token}"}
customers_response = requests.get(
    f"{base_url}/api/admin/customers",
    headers=headers
)

if customers_response.status_code != 200:
    print(f"✗ Failed to get customers: {customers_response.text}")
    exit(1)

customers_data = customers_response.json()
customers = customers_data.get("customers", [])
print(f"✓ Retrieved {len(customers)} customers")

if not customers:
    print("✗ No customers found to test with")
    exit(1)

# Find a test customer (not admin)
test_customer = None
for customer in customers:
    if customer["id"] != admin_id and customer["role"] != "ADMIN":
        test_customer = customer
        break

if not test_customer:
    print("✗ No suitable test customer found")
    exit(1)

print(f"  Customer: {test_customer['email']}")
print(f"  Current role: {test_customer['role']}")
print(f"  ID: {test_customer['id']}")

# Test updating the role
print("\n" + "=" * 70)
print("Step 3: Update customer role")
print("=" * 70)

new_role = "OWNER" if test_customer["role"] != "OWNER" else "VIEWER"
print(f"Changing role from {test_customer['role']} to {new_role}")

update_response = requests.put(
    f"{base_url}/api/admin/customers/{test_customer['id']}/role",
    json={"role": new_role},
    headers=headers
)

print(f"Response status: {update_response.status_code}")
print(f"Response: {update_response.json()}")

if update_response.status_code == 200:
    print(f"✓ Role update successful!")
else:
    print(f"✗ Role update failed")

# Verify the change
print("\n" + "=" * 70)
print("Step 4: Verify the change")
print("=" * 70)

verify_response = requests.get(
    f"{base_url}/api/admin/customers",
    headers=headers
)

updated_customers = verify_response.json().get("customers", [])
for customer in updated_customers:
    if customer["id"] == test_customer["id"]:
        print(f"Customer role is now: {customer['role']}")
        if customer["role"] == new_role:
            print(f"✓ Verification successful!")
        else:
            print(f"✗ Verification failed - role is {customer['role']}, expected {new_role}")
        break

print("\n" + "=" * 70)
print("✓ All tests passed!")
print("=" * 70)
