#!/usr/bin/env python3
"""
Fix role values in existing database records
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent / '.env')

async def fix_roles():
    """Convert role values from title case to uppercase"""
    
    mongo_url = os.environ['MONGO_URL']
    db_name = os.environ['DB_NAME']
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print(f"\n{'='*70}")
    print("FIXING ROLE VALUES IN DATABASE")
    print(f"{'='*70}\n")
    
    try:
        # Define role mappings
        role_mappings = {
            "Owner": "OWNER",
            "Buyer": "BUYER",
            "Viewer": "VIEWER",
            "Admin": "ADMIN"
        }
        
        # Fix each role in customers collection
        for old_role, new_role in role_mappings.items():
            result = await db.customers.update_many(
                {"role": old_role},
                {"$set": {"role": new_role}}
            )
            
            if result.modified_count > 0:
                print(f"✓ Updated {result.modified_count} customer(s) from '{old_role}' to '{new_role}'")
        
        # Show all customers after update
        print(f"\n{'='*70}")
        print("CUSTOMERS IN DATABASE (AFTER FIX)")
        print(f"{'='*70}\n")
        
        customers = await db.customers.find().to_list(None)
        
        for customer in customers:
            print(f"Email: {customer.get('email')}")
            print(f"Name:  {customer.get('name')}")
            print(f"Role:  {customer.get('role')}")
            print()
        
        print(f"{'='*70}")
        print(f"✓ COMPLETE - {len(customers)} customers in database")
        print(f"{'='*70}\n")
        
    except Exception as e:
        print(f"❌ ERROR: {e}")
        import traceback
        traceback.print_exc()
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(fix_roles())
