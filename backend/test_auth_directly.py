#!/usr/bin/env python3
"""Direct test of authentication functions without starting server"""

import sys
sys.path.insert(0, '/e/manufacturing_web/DexAura_Tech-main/backend')

from auth_service import verify_password, get_password_hash

# Test with known hash from database
# admin@dexaura.com's password_hash should be in the database

# First, let's create a test hash
test_password = "admin123"
test_hash = get_password_hash(test_password)

print("Password Hash Test")
print("="*60)
print(f"Original Password: {test_password}")
print(f"Generated Hash: {test_hash}")
print()

# Test verification
print("Verification Tests:")
print("-"*60)

result1 = verify_password("admin123", test_hash)
print(f"verify_password('admin123', hash) = {result1}")
assert result1 == True, "Should return True for correct password"

result2 = verify_password("wrongpass", test_hash)
print(f"verify_password('wrongpass', hash) = {result2}")
assert result2 == False, "Should return False for wrong password"

result3 = verify_password("", test_hash)
print(f"verify_password('', hash) = {result3}")
assert result3 == False, "Should return False for empty password"

print()
print("="*60)
print("✓ All tests passed!")
print("Password verification is working correctly")
