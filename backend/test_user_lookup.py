#!/usr/bin/env python3

import sys
import asyncio
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv('MONGO_URL'))
db = client[os.getenv('DB_NAME')]

# Find admin user
user = db.customers.find_one({'email': 'admin@dexaura.com'})
if user:
    print(f'✓ User found:')
    print(f'  ID: {user.get("id")}')
    print(f'  Email: {user.get("email")}')
    print(f'  Name: {user.get("name")}')
    print(f'  Has password: {"password_hash" in user}')
else:
    print('✗ User not found in database')

# List all users
print('\n' + '='*50)
print('All users in database:')
all_users = list(db.customers.find({}, {"_id": 0, "id": 1, "email": 1, "name": 1}))
for u in all_users:
    print(f'  - {u.get("email")} (ID: {u.get("id")})')
