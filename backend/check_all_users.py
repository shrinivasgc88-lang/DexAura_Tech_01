#!/usr/bin/env python
"""
Check all users in the database and their password status
"""
import asyncio
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

ROOT_DIR = Path(__file__).parent / 'backend'
sys.path.insert(0, str(ROOT_DIR))
load_dotenv(ROOT_DIR / '.env')

async def main():
    mongo_url = os.environ['MONGO_URL']
    db_name = os.environ['DB_NAME']
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print("=" * 70)
    print("DATABASE USERS CHECK")
    print("=" * 70)
    print()
    
    customers = await db.customers.find({}, {"_id": 0}).to_list(100)
    
    print(f"Total users in database: {len(customers)}")
    print()
    print("-" * 70)
    
    for i, user in enumerate(customers, 1):
        print(f"\nUser {i}:")
        print(f"  Email: {user.get('email')}")
        print(f"  Name: {user.get('name')}")
        print(f"  Role: {user.get('role')}")
        print(f"  Has password_hash: {bool(user.get('password_hash'))}")
        if user.get('password_hash'):
            print(f"  Password hash: {user.get('password_hash')[:30]}...")
        print(f"  Is active: {user.get('is_active')}")

if __name__ == "__main__":
    asyncio.run(main())
