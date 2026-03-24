#!/usr/bin/env python3
"""Check user data in database"""

from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

mongo_url = os.getenv('MONGO_URL')
db_name = os.getenv('DB_NAME')

if not mongo_url or not db_name:
    print("ERROR: MONGO_URL or DB_NAME not set in .env")
    print(f"MONGO_URL: {mongo_url}")
    print(f"DB_NAME: {db_name}")
    exit(1)

try:
    client = MongoClient(mongo_url)
    db = client[db_name]
    
    print("Database Connection Test")
    print("="*60)
    print(f"Connected to: {db_name}")
    print()
    
    # Find admin user
    admin = db.customers.find_one({"email": "admin@dexaura.com"})
    
    if admin:
        print("Admin User Found:")
        print("-"*60)
        print(f"ID: {admin.get('id')}")
        print(f"Email: {admin.get('email')}")
        print(f"Name: {admin.get('name')}")
        print(f"Has password_hash: {'password_hash' in admin}")
        if 'password_hash' in admin:
            print(f"Password hash (first 50 chars): {admin.get('password_hash')[:50]}...")
        print()
    else:
        print("✗ Admin user NOT found in database")
        print()
        print("All users in database:")
        users = list(db.customers.find({}, {"_id": 0, "email": 1, "name": 1}))
        for user in users:
            print(f"  - {user.get('email')}")
    
    client.close()
    
except Exception as e:
    print(f"ERROR: {e}")
    import traceback
    traceback.print_exc()
