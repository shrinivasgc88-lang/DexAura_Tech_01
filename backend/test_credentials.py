import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

async def check_database():
    """Check what users are in the database"""
    mongo_url = os.environ['MONGO_URL']
    db_name = os.environ['DB_NAME']
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print(f"\n{'='*70}")
    print(f"Checking MongoDB Database: {db_name}")
    print(f"{'='*70}\n")
    
    try:
        # Get all customers
        customers = await db.customers.find().to_list(None)
        
        if not customers:
            print("No customers found in database!")
            return
        
        print(f"Found {len(customers)} customer(s):\n")
        
        for customer in customers:
            print(f"Email:        {customer.get('email')}")
            print(f"Name:         {customer.get('name')}")
            print(f"Has Password: {bool(customer.get('password_hash'))}")
            if customer.get('password_hash'):
                print(f"Hash Length:  {len(customer.get('password_hash'))} chars")
            print(f"Is Active:    {customer.get('is_active', True)}")
            print(f"Role:         {customer.get('role')}")
            print(f"ID:           {customer.get('id')}")
            print(f"-" * 70)
        
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(check_database())
