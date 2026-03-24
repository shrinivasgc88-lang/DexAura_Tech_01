"""
Test script to verify server startup and database connection
"""
import asyncio
import os
import sys
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def test_database_connection():
    """Test MongoDB connection"""
    try:
        mongo_url = os.environ.get('MONGO_URL')
        db_name = os.environ.get('DB_NAME')
        
        if not mongo_url:
            print("[ERROR] MONGO_URL environment variable is not set")
            return False
        
        if not db_name:
            print("[ERROR] DB_NAME environment variable is not set")
            return False
        
        print(f"[INFO] Testing MongoDB connection...")
        print(f"   Database: {db_name}")
        
        # Create client
        client = AsyncIOMotorClient(mongo_url)
        db = client[db_name]
        
        # Test connection by running a simple command
        await client.admin.command('ping')
        print("[SUCCESS] MongoDB connection: OK")
        
        # Test database access
        collections = await db.list_collection_names()
        print(f"[INFO] Found {len(collections)} collection(s) in database")
        
        # Close connection
        client.close()
        return True
        
    except Exception as e:
        print(f"[ERROR] MongoDB connection failed: {str(e)}")
        return False

def test_imports():
    """Test if all required modules can be imported"""
    try:
        print("[INFO] Testing imports...")
        from server import app, db, client
        print("[SUCCESS] Server imports: OK")
        return True
    except Exception as e:
        print(f"[ERROR] Server import failed: {str(e)}")
        return False

async def main():
    print("=" * 60)
    print("Backend Server & Database Connection Test")
    print("=" * 60)
    print()
    
    # Test imports
    import_ok = test_imports()
    print()
    
    # Test database connection
    db_ok = await test_database_connection()
    print()
    
    print("=" * 60)
    if import_ok and db_ok:
        print("[RESULT] All tests passed! Server is ready to run.")
        print("=" * 60)
        return True
    else:
        print("[RESULT] Some tests failed. Please check the errors above.")
        print("=" * 60)
        return False

if __name__ == "__main__":
    result = asyncio.run(main())
    sys.exit(0 if result else 1)

