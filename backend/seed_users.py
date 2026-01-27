"""
Generate password hashes manually and insert them into the database
"""
import asyncio
import os
from pathlib import Path
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import uuid

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def seed_users():
    # Connect to MongoDB
    mongo_url = os.environ['MONGO_URL']
    db_name = os.environ['DB_NAME']
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    try:
        print("=" * 60)
        print("Seeding Test Users")
        print("=" * 60)
        print()
        
        # Define test users with pre-generated bcrypt hashes
        # These are bcrypt hashes for the given passwords
        # Password: admin123 -> Hash: $2b$12$R5V3B3785bG8S7qjT./yk.DDP3eNIFrfYj1A/1YUVvoU1aTanudgm
        # Password: test123 -> Hash: $2b$12$prlQv/wo/cTuavWdPbeafuMP.grHa.l17ebrErhPFj3P5JATNZvaC
        # Password: password123 -> Hash: $2b$12$pzOXyPryXjdYraXfvIIBI.B8h7OTjdq2eAlUlHlCOf2994fUoea1.
        
        test_users = [
            {
                "email": "admin@dexaura.com",
                "password_hash": "$2b$12$R5V3B3785bG8S7qjT./yk.DDP3eNIFrfYj1A/1YUVvoU1aTanudgm",
                "name": "Admin User",
                "role": "ADMIN",
                "company": "DexAura Technologies"
            },
            {
                "email": "test@dexaura.com",
                "password_hash": "$2b$12$prlQv/wo/cTuavWdPbeafuMP.grHa.l17ebrErhPFj3P5JATNZvaC",
                "name": "Test User",
                "role": "BUYER",
                "company": "Test Company"
            },
            {
                "email": "customer@example.com",
                "password_hash": "$2b$12$pzOXyPryXjdYraXfvIIBI.B8h7OTjdq2eAlUlHlCOf2994fUoea1.",
                "name": "John Customer",
                "role": "BUYER",
                "company": "Example Corp"
            }
        ]
        
        # Clear existing test users
        print("Clearing existing test users...")
        for user_data in test_users:
            await db.customers.delete_one({"email": user_data["email"]})
        print("Cleared existing test users")
        print()
        
        # Insert new users with pre-hashed passwords
        print("Creating test users...")
        for user_data in test_users:
            # Create customer document
            customer = {
                "id": str(uuid.uuid4()),
                "email": user_data["email"],
                "password_hash": user_data["password_hash"],
                "name": user_data["name"],
                "role": user_data["role"],
                "company": user_data.get("company"),
                "phone": None,
                "team_members": [],
                "is_active": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            }
            
            # Insert into database
            result = await db.customers.insert_one(customer)
            
            print(f"[OK] Created user: {user_data['email']}")
            print(f"     Role: {user_data['role']}")
            print()
        
        print("=" * 60)
        print("User seeding completed successfully!")
        print("=" * 60)
        print()
        print("Test credentials:")
        print("-" * 60)
        print("Email: admin@dexaura.com")
        print("Password: admin123")
        print("Role: ADMIN")
        print()
        print("Email: test@dexaura.com")
        print("Password: test123")
        print("Role: BUYER")
        print()
        print("Email: customer@example.com")
        print("Password: password123")
        print("Role: BUYER")
        print()
        
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_users())
