"""
Script to seed the database directly
"""
import asyncio
import os
from pathlib import Path
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def seed_database():
    # Connect to MongoDB
    mongo_url = os.environ['MONGO_URL']
    db_name = os.environ['DB_NAME']
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    try:
        # Import seed data functions
        from seed_data import (
            get_seed_quotes, get_seed_orders, get_seed_notifications, get_seed_blog_posts
        )
        from admin_seed_data import (
            get_demo_leads, get_demo_followups, get_demo_meetings,
            get_demo_projects, get_demo_parts, get_demo_suppliers,
            get_demo_assignments, get_demo_contact_submissions
        )
        
        print("=" * 60)
        print("Starting Database Seeding")
        print("=" * 60)
        print(f"Database: {db_name}")
        print()
        
        # Clear existing seed data
        print("Clearing existing seed data...")
        await db.quotes.delete_many({"customer_id": {"$regex": "^seed_"}})
        await db.orders.delete_many({"customer_id": {"$regex": "^seed_"}})
        await db.notifications.delete_many({"recipient_id": {"$in": ["admin", "seed_customer_1", "seed_customer_2"]}})
        await db.blog_posts.delete_many({})
        
        # Clear admin data
        await db.leads.delete_many({})
        await db.followups.delete_many({})
        await db.meetings.delete_many({})
        await db.projects.delete_many({})
        await db.parts.delete_many({})
        await db.suppliers.delete_many({})
        await db.supplier_assignments.delete_many({})
        await db.contact_submissions.delete_many({})
        
        print("Cleared existing data")
        print()
        
        # Insert quotes
        print("Inserting quotes...")
        quotes = get_seed_quotes()
        if quotes:
            await db.quotes.insert_many(quotes)
            print(f"✓ Inserted {len(quotes)} quotes")
        
        # Insert orders
        print("Inserting orders...")
        orders = get_seed_orders()
        if orders:
            await db.orders.insert_many(orders)
            print(f"✓ Inserted {len(orders)} orders")
        
        # Insert notifications
        print("Inserting notifications...")
        notifications = get_seed_notifications()
        if notifications:
            await db.notifications.insert_many(notifications)
            print(f"✓ Inserted {len(notifications)} notifications")
        
        # Insert blog posts
        print("Inserting blog posts...")
        blog_posts = get_seed_blog_posts()
        if blog_posts:
            await db.blog_posts.insert_many(blog_posts)
            print(f"✓ Inserted {len(blog_posts)} blog posts")
        
        # Insert admin data
        print("Inserting admin data...")
        leads = get_demo_leads()
        if leads:
            await db.leads.insert_many(leads)
            print(f"✓ Inserted {len(leads)} leads")
        
        followups = get_demo_followups(leads)
        if followups:
            await db.followups.insert_many(followups)
            print(f"✓ Inserted {len(followups)} follow-ups")
        
        meetings = get_demo_meetings(leads)
        if meetings:
            await db.meetings.insert_many(meetings)
            print(f"✓ Inserted {len(meetings)} meetings")
        
        projects = get_demo_projects()
        if projects:
            await db.projects.insert_many(projects)
            print(f"✓ Inserted {len(projects)} projects")
        
        parts = get_demo_parts(projects)
        if parts:
            await db.parts.insert_many(parts)
            print(f"✓ Inserted {len(parts)} parts")
        
        suppliers = get_demo_suppliers()
        if suppliers:
            await db.suppliers.insert_many(suppliers)
            print(f"✓ Inserted {len(suppliers)} suppliers")
        
        assignments = get_demo_assignments(projects, parts)
        if assignments:
            await db.supplier_assignments.insert_many(assignments)
            print(f"✓ Inserted {len(assignments)} supplier assignments")
        
        contact_subs = get_demo_contact_submissions()
        if contact_subs:
            await db.contact_submissions.insert_many(contact_subs)
            print(f"✓ Inserted {len(contact_subs)} contact submissions")
        
        print()
        print("=" * 60)
        print("Database seeding completed successfully!")
        print("=" * 60)
        
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
