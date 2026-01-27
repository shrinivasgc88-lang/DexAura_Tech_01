"""
Generate proper bcrypt hashes using the bcrypt module directly
"""
import bcrypt

passwords = {
    "admin123": None,
    "test123": None,
    "password123": None
}

print("=" * 60)
print("Generating bcrypt password hashes")
print("=" * 60)
print()

for password, _ in passwords.items():
    # Encode password
    password_bytes = password.encode('utf-8')
    # Generate hash
    salt = bcrypt.gensalt(rounds=12)
    hashed = bcrypt.hashpw(password_bytes, salt)
    hashed_str = hashed.decode('utf-8')
    passwords[password] = hashed_str
    
    print(f"Password: {password}")
    print(f"Hash: {hashed_str}")
    print()

# Output for use in seed_users.py
print("=" * 60)
print("Copy this for seed_users.py:")
print("=" * 60)
print()
print('test_users = [')
print('    {')
print('        "email": "admin@dexaura.com",')
print(f'        "password_hash": "{passwords["admin123"]}",')
print('        "name": "Admin User",')
print('        "role": "ADMIN",')
print('        "company": "DexAura Technologies"')
print('    },')
print('    {')
print('        "email": "test@dexaura.com",')
print(f'        "password_hash": "{passwords["test123"]}",')
print('        "name": "Test User",')
print('        "role": "BUYER",')
print('        "company": "Test Company"')
print('    },')
print('    {')
print('        "email": "customer@example.com",')
print(f'        "password_hash": "{passwords["password123"]}",')
print('        "name": "John Customer",')
print('        "role": "BUYER",')
print('        "company": "Example Corp"')
print('    }')
print(']')
