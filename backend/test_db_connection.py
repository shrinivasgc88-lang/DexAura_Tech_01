"""
Test script to check MongoDB database connection
"""
import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def test_connection():
    """Test MongoDB connection"""
    try:
        mongo_url = os.environ.get('MONGO_URL')
        db_name = os.environ.get('DB_NAME')
        
        if not mongo_url:
            print("[ERROR] MONGO_URL environment variable is not set")
            print("   Please set MONGO_URL in your .env file or environment")
            return False
        
        if not db_name:
            print("[ERROR] DB_NAME environment variable is not set")
            print("   Please set DB_NAME in your .env file or environment")
            return False
        
        print(f"[INFO] Attempting to connect to MongoDB...")
        print(f"   URL: {mongo_url.split('@')[1] if '@' in mongo_url else 'Hidden'}")
        print(f"   Database: {db_name}")
        
        # Create client
        client = AsyncIOMotorClient(mongo_url)
        db = client[db_name]
        
        # Test connection by running a simple command
        await client.admin.command('ping')
        print("[SUCCESS] Successfully connected to MongoDB!")
        
        # List collections
        collections = await db.list_collection_names()
        print(f"\n[INFO] Database '{db_name}' contains {len(collections)} collection(s):")
        for collection in collections:
            count = await db[collection].count_documents({})
            print(f"   - {collection}: {count} document(s)")
        
        # Close connection
        client.close()
        print("\n[SUCCESS] Database connection test passed!")
        return True
        
    except Exception as e:
        print(f"\n[ERROR] Database connection failed!")
        print(f"   Error: {str(e)}")
        print("\n[TIPS] Troubleshooting tips:")
        print("   1. Check if MongoDB is running")
        print("   2. Verify MONGO_URL is correct in .env file")
        print("   3. Check network connectivity")
        print("   4. Verify database credentials")
        return False

if __name__ == "__main__":
    result = asyncio.run(test_connection())
    exit(0 if result else 1)

