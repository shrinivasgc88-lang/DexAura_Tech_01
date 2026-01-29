#!/usr/bin/env python3
"""Test password verification against actual database hash"""

from pymongo import MongoClient
import os
from dotenv import load_dotenv
import sys

sys.path.insert(0, '/e/manufacturing_web/DexAura_Tech-main/backend')
from auth_service import verify_password

load_dotenv()

mongo_url = os.getenv('MONGO_URL')
db_name = os.getenv('DB_NAME')

client = MongoClient(mongo_url)
db = client[db_name]

# Get admin user
admin = db.customers.find_one({"email": "admin@dexaura.com"})

if not admin or 'password_hash' not in admin:
    print("ERROR: Admin user or password_hash not found")
    exit(1)

password_hash = admin['password_hash']

print("Password Verification Against Database Hash")
print("="*60)
print(f"Email: {admin.get('email')}")
print(f"Stored Hash: {password_hash}")
print()

# Test various passwords
test_cases = [
    ("admin123", True, "Correct password"),
    ("wrongpass", False, "Wrong password"),
    ("Admin123", False, "Wrong case"),
    ("", False, "Empty password"),
    ("admin", False, "Partial password"),
]

print("Test Results:")
print("-"*60)

all_passed = True
for password, expected, description in test_cases:
    result = verify_password(password, password_hash)
    status = "✓" if result == expected else "✗"
    passed = result == expected
    all_passed = all_passed and passed
    
    print(f"{status} {description:30} password='{password:20}' => {result} (expected {expected})")

print()
print("="*60)
if all_passed:
    print("✓ All tests PASSED - Password verification working correctly!")
else:
    print("✗ Some tests FAILED - There may be a problem with password hashing/verification")

client.close()
