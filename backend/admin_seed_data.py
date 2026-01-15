from datetime import datetime, timezone, timedelta
import uuid

def get_demo_leads():
    return [
        {
            "id": str(uuid.uuid4()),
            "name": "Rajesh Kumar",
            "email": "rajesh.kumar@techstart.com",
            "phone": "+91 98765 43210",
            "company": "TechStart Robotics",
            "source": "contact_form",
            "status": "Qualified",
            "notes": "Interested in CNC machining for robot arm components. Budget: $15,000",
            "estimated_value": 15000.00,
            "assigned_to": "admin",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=10)).isoformat(),
            "updated_at": (datetime.now(timezone.utc) - timedelta(days=2)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Priya Sharma",
            "email": "priya.sharma@medtech.in",
            "phone": "+91 98765 12345",
            "company": "MedTech Solutions",
            "source": "quote_request",
            "status": "Proposal Sent",
            "notes": "Medical device components requiring ISO 13485 compliance. Sent proposal on 2025-01-05",
            "estimated_value": 25000.00,
            "assigned_to": "admin",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=7)).isoformat(),
            "updated_at": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Amit Patel",
            "email": "amit@aeroparts.com",
            "phone": "+91 98765 67890",
            "company": "AeroParts India",
            "source": "contact_form",
            "status": "Negotiation",
            "notes": "Aerospace brackets requiring AS9100 certification. Price negotiation in progress",
            "estimated_value": 40000.00,
            "assigned_to": "admin",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=15)).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Sneha Reddy",
            "email": "sneha@evmotors.in",
            "phone": "+91 98765 11111",
            "company": "EV Motors India",
            "source": "referral",
            "status": "New",
            "notes": "EV battery enclosure project. Initial contact made",
            "estimated_value": 50000.00,
            "created_at": (datetime.now(timezone.utc) - timedelta(days=2)).isoformat(),
            "updated_at": (datetime.now(timezone.utc) - timedelta(days=2)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Vikram Singh",
            "email": "vikram@autoparts.co",
            "phone": "+91 98765 22222",
            "company": "Auto Components Ltd",
            "source": "contact_form",
            "status": "Converted to Customer",
            "notes": "Successfully converted. Created customer account and first project",
            "estimated_value": 30000.00,
            "converted_to_customer_id": "customer_vikram_123",
            "assigned_to": "admin",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=20)).isoformat(),
            "updated_at": (datetime.now(timezone.utc) - timedelta(days=5)).isoformat()
        }
    ]

def get_demo_followups(leads):
    return [
        {
            "id": str(uuid.uuid4()),
            "lead_id": leads[0]["id"],
            "follow_up_date": (datetime.now(timezone.utc) - timedelta(days=5)).isoformat(),
            "method": "phone",
            "notes": "Discussed technical requirements. Sent sample parts for reference",
            "completed": True,
            "outcome": "Positive - Ready to proceed with quote",
            "next_action": "Send formal quote by end of week",
            "created_by": "admin",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=6)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "lead_id": leads[1]["id"],
            "follow_up_date": (datetime.now(timezone.utc) - timedelta(days=3)).isoformat(),
            "method": "email",
            "notes": "Sent proposal with ISO 13485 compliance details and pricing",
            "completed": True,
            "outcome": "Waiting for approval from procurement team",
            "next_action": "Follow up in 3 days",
            "created_by": "admin",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=4)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "lead_id": leads[2]["id"],
            "follow_up_date": datetime.now(timezone.utc).isoformat(),
            "method": "meeting",
            "notes": "Scheduled meeting to discuss pricing and lead times",
            "completed": False,
            "outcome": None,
            "next_action": "Finalize pricing and send updated proposal",
            "created_by": "admin",
            "created_at": (datetime.now(timezone.utc) - timedelta(hours=2)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "lead_id": leads[3]["id"],
            "follow_up_date": (datetime.now(timezone.utc) + timedelta(days=1)).isoformat(),
            "method": "phone",
            "notes": "Initial contact call scheduled",
            "completed": False,
            "outcome": None,
            "next_action": "Understand project requirements",
            "created_by": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]

def get_demo_meetings(leads):
    return [
        {
            "id": str(uuid.uuid4()),
            "lead_id": leads[0]["id"],
            "customer_id": None,
            "title": "Technical Requirements Discussion - TechStart Robotics",
            "meeting_date": (datetime.now(timezone.utc) - timedelta(days=4)).isoformat(),
            "duration_minutes": 60,
            "attendees": ["Rajesh Kumar", "Engineering Team"],
            "location": "Virtual - Google Meet",
            "agenda": "Discuss robot arm component specifications, tolerances, materials, and lead times",
            "notes": "Customer needs 10 custom brackets with ±0.005 tolerance. Material: Aluminum 6061-T6. Quantity: 50 units per month starting March.",
            "action_items": ["Send formal quote", "Provide material certificate samples", "Schedule factory visit"],
            "status": "completed",
            "created_by": "admin",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=5)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "lead_id": leads[1]["id"],
            "customer_id": None,
            "title": "Compliance Review - MedTech Solutions",
            "meeting_date": (datetime.now(timezone.utc) - timedelta(days=2)).isoformat(),
            "duration_minutes": 90,
            "attendees": ["Priya Sharma", "Quality Manager", "Engineering Team"],
            "location": "DexAura Office, Bengaluru",
            "agenda": "Review ISO 13485 compliance, inspection protocols, and documentation requirements",
            "notes": "Customer satisfied with our quality processes. Need to provide sample inspection reports and material certifications",
            "action_items": ["Send sample inspection reports", "Provide ISO 13485 certificate", "Schedule pilot run"],
            "status": "completed",
            "created_by": "admin",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=3)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "lead_id": leads[2]["id"],
            "customer_id": None,
            "title": "Pricing Negotiation - AeroParts",
            "meeting_date": (datetime.now(timezone.utc) + timedelta(hours=4)).isoformat(),
            "duration_minutes": 45,
            "attendees": ["Amit Patel", "Sales Team"],
            "location": "Virtual - Zoom",
            "agenda": "Discuss volume pricing, payment terms, and delivery schedule",
            "notes": None,
            "action_items": [],
            "status": "scheduled",
            "created_by": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]

def get_demo_projects():
    return [
        {
            "id": str(uuid.uuid4()),
            "customer_id": "customer_vikram_123",
            "project_name": "Automotive Brake System Components",
            "project_number": "PRJ-2025-0001",
            "description": "CNC machined brake caliper brackets and mounting components",
            "status": "In Production",
            "total_value": 28500.00,
            "team_members": ["member_1", "member_2"],
            "admin_assigned": "admin",
            "target_delivery_date": (datetime.now(timezone.utc) + timedelta(days=15)).isoformat(),
            "notes": "High priority - Customer needs parts for testing by end of month",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=8)).isoformat(),
            "updated_at": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "customer_id": "customer_vikram_123",
            "project_name": "Suspension Components Prototype",
            "project_number": "PRJ-2025-0002",
            "description": "Prototype suspension arms and mounting brackets for new vehicle model",
            "status": "Quoting",
            "total_value": 15000.00,
            "team_members": ["member_1"],
            "admin_assigned": "admin",
            "target_delivery_date": (datetime.now(timezone.utc) + timedelta(days=25)).isoformat(),
            "notes": "Awaiting final design approval from customer",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=3)).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "customer_id": "seed_customer_1",
            "project_name": "Medical Device Housing",
            "project_number": "PRJ-2025-0003",
            "description": "Precision CNC machined housings for diagnostic equipment",
            "status": "Quality Check",
            "total_value": 18000.00,
            "team_members": ["member_3"],
            "admin_assigned": "admin",
            "target_delivery_date": (datetime.now(timezone.utc) + timedelta(days=5)).isoformat(),
            "notes": "Parts completed, awaiting final CMM inspection",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=12)).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
    ]

def get_demo_parts(projects):
    return [
        # Project 1 Parts - Automotive Brake System
        {
            "id": str(uuid.uuid4()),
            "project_id": projects[0]["id"],
            "part_number": "BRK-001",
            "part_name": "Brake Caliper Bracket",
            "description": "Main mounting bracket for brake caliper assembly",
            "quantity": 100,
            "material": "Steel 4140",
            "process": "CNC Milling",
            "unit_price": 85.00,
            "total_price": 8500.00,
            "status": "In Production",
            "supplier_id": "supplier_cnc_1",
            "specifications": {"tolerance": "±0.005\"", "finish": "Black oxide"},
            "due_date": (datetime.now(timezone.utc) + timedelta(days=12)).isoformat(),
            "created_at": (datetime.now(timezone.utc) - timedelta(days=8)).isoformat(),
            "updated_at": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "project_id": projects[0]["id"],
            "part_number": "BRK-002",
            "part_name": "Mounting Plate",
            "description": "Secondary mounting plate with 4 bolt holes",
            "quantity": 100,
            "material": "Steel 1018",
            "process": "CNC Milling",
            "unit_price": 45.00,
            "total_price": 4500.00,
            "status": "In Production",
            "supplier_id": "supplier_cnc_1",
            "specifications": {"tolerance": "±0.010\"", "finish": "Zinc plated"},
            "due_date": (datetime.now(timezone.utc) + timedelta(days=12)).isoformat(),
            "created_at": (datetime.now(timezone.utc) - timedelta(days=8)).isoformat(),
            "updated_at": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "project_id": projects[0]["id"],
            "part_number": "BRK-003",
            "part_name": "Spacer Bushings",
            "description": "Precision bushings for caliper alignment",
            "quantity": 200,
            "material": "Brass C360",
            "process": "CNC Turning",
            "unit_price": 12.50,
            "total_price": 2500.00,
            "status": "Assigned to Supplier",
            "supplier_id": "supplier_cnc_2",
            "specifications": {"tolerance": "±0.002\"", "finish": "Polished"},
            "due_date": (datetime.now(timezone.utc) + timedelta(days=10)).isoformat(),
            "created_at": (datetime.now(timezone.utc) - timedelta(days=8)).isoformat(),
            "updated_at": (datetime.now(timezone.utc) - timedelta(days=2)).isoformat()
        },
        
        # Project 2 Parts - Suspension Components
        {
            "id": str(uuid.uuid4()),
            "project_id": projects[1]["id"],
            "part_number": "SUS-001",
            "part_name": "Lower Control Arm",
            "description": "Main suspension control arm",
            "quantity": 20,
            "material": "Aluminum 7075-T6",
            "process": "CNC Milling",
            "unit_price": 450.00,
            "total_price": 9000.00,
            "status": "Pending Assignment",
            "supplier_id": None,
            "specifications": {"tolerance": "±0.005\"", "finish": "Anodized black"},
            "due_date": (datetime.now(timezone.utc) + timedelta(days=20)).isoformat(),
            "created_at": (datetime.now(timezone.utc) - timedelta(days=3)).isoformat(),
            "updated_at": (datetime.now(timezone.utc) - timedelta(days=3)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "project_id": projects[1]["id"],
            "part_number": "SUS-002",
            "part_name": "Mounting Bracket Set",
            "description": "Upper and lower mounting brackets",
            "quantity": 40,
            "material": "Steel 1045",
            "process": "CNC Milling",
            "unit_price": 150.00,
            "total_price": 6000.00,
            "status": "Pending Assignment",
            "supplier_id": None,
            "specifications": {"tolerance": "±0.010\"", "finish": "Powder coated"},
            "due_date": (datetime.now(timezone.utc) + timedelta(days=20)).isoformat(),
            "created_at": (datetime.now(timezone.utc) - timedelta(days=3)).isoformat(),
            "updated_at": (datetime.now(timezone.utc) - timedelta(days=3)).isoformat()
        },
        
        # Project 3 Parts - Medical Device
        {
            "id": str(uuid.uuid4()),
            "project_id": projects[2]["id"],
            "part_number": "MED-001",
            "part_name": "Device Housing - Top",
            "description": "Upper housing with integrated mounting points",
            "quantity": 50,
            "material": "Polycarbonate Medical Grade",
            "process": "CNC Milling",
            "unit_price": 180.00,
            "total_price": 9000.00,
            "status": "Quality Check",
            "supplier_id": "supplier_cnc_1",
            "specifications": {"tolerance": "±0.005\"", "finish": "Smooth, biocompatible"},
            "due_date": (datetime.now(timezone.utc) + timedelta(days=3)).isoformat(),
            "created_at": (datetime.now(timezone.utc) - timedelta(days=12)).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "project_id": projects[2]["id"],
            "part_number": "MED-002",
            "part_name": "Device Housing - Bottom",
            "description": "Lower housing with port openings",
            "quantity": 50,
            "material": "Polycarbonate Medical Grade",
            "process": "CNC Milling",
            "unit_price": 180.00,
            "total_price": 9000.00,
            "status": "Completed",
            "supplier_id": "supplier_cnc_1",
            "specifications": {"tolerance": "±0.005\"", "finish": "Smooth, biocompatible"},
            "due_date": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat(),
            "created_at": (datetime.now(timezone.utc) - timedelta(days=12)).isoformat(),
            "updated_at": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat()
        }
    ]

def get_demo_suppliers():
    return [
        {
            "id": "supplier_cnc_1",
            "company_name": "Precision CNC Works",
            "contact_person": "Suresh Iyer",
            "email": "suresh@precisioncnc.com",
            "phone": "+91 80 2345 6789",
            "address": "Peenya Industrial Area, Bengaluru 560058",
            "capabilities": ["CNC Milling", "CNC Turning", "Quality Inspection"],
            "certifications": ["ISO 9001:2015", "ISO 13485:2016"],
            "rating": 4.8,
            "on_time_delivery_rate": 95.5,
            "quality_score": 96.0,
            "active": True,
            "notes": "Excellent for precision medical and aerospace components. 5-axis milling capability",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=180)).isoformat()
        },
        {
            "id": "supplier_cnc_2",
            "company_name": "Modern Machining Solutions",
            "contact_person": "Ramesh Nair",
            "email": "ramesh@modernmachining.in",
            "phone": "+91 80 3456 7890",
            "address": "Whitefield, Bengaluru 560066",
            "capabilities": ["CNC Turning", "Swiss Machining", "Thread Rolling"],
            "certifications": ["ISO 9001:2015"],
            "rating": 4.5,
            "on_time_delivery_rate": 92.0,
            "quality_score": 93.0,
            "active": True,
            "notes": "Specializes in high-volume turning and small diameter parts",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=150)).isoformat()
        },
        {
            "id": "supplier_sheet_1",
            "company_name": "Karnataka Sheet Metals",
            "contact_person": "Lakshmi Rao",
            "email": "lakshmi@karnatakasheet.com",
            "phone": "+91 80 4567 8901",
            "address": "Bommasandra, Bengaluru 560099",
            "capabilities": ["Laser Cutting", "CNC Bending", "Welding", "Powder Coating"],
            "certifications": ["ISO 9001:2015", "IATF 16949:2016"],
            "rating": 4.7,
            "on_time_delivery_rate": 94.0,
            "quality_score": 95.0,
            "active": True,
            "notes": "Best for automotive sheet metal. Large capacity laser cutter",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=200)).isoformat()
        },
        {
            "id": "supplier_3d_1",
            "company_name": "Additive Tech India",
            "contact_person": "Arjun Mehta",
            "email": "arjun@additivetech.in",
            "phone": "+91 80 5678 9012",
            "address": "HSR Layout, Bengaluru 560102",
            "capabilities": ["FDM 3D Printing", "SLA 3D Printing", "SLS 3D Printing"],
            "certifications": ["ISO 9001:2015"],
            "rating": 4.6,
            "on_time_delivery_rate": 98.0,
            "quality_score": 92.0,
            "active": True,
            "notes": "Fast turnaround for prototypes. Multiple 3D printing technologies",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=120)).isoformat()
        },
        {
            "id": "supplier_heat_1",
            "company_name": "Thermal Processing Services",
            "contact_person": "Deepak Kumar",
            "email": "deepak@thermalprocessing.co",
            "phone": "+91 80 6789 0123",
            "address": "Jigani, Bengaluru 560105",
            "capabilities": ["Heat Treatment", "Hardening", "Anodizing", "Plating"],
            "certifications": ["ISO 9001:2015", "NADCAP"],
            "rating": 4.9,
            "on_time_delivery_rate": 96.0,
            "quality_score": 97.0,
            "active": True,
            "notes": "Aerospace approved. Excellent for critical heat treatment",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=250)).isoformat()
        }
    ]

def get_demo_assignments(projects, parts):
    return [
        {
            "id": str(uuid.uuid4()),
            "supplier_id": "supplier_cnc_1",
            "project_id": projects[0]["id"],
            "part_ids": [parts[0]["id"], parts[1]["id"]],
            "assignment_type": "project",
            "assigned_date": (datetime.now(timezone.utc) - timedelta(days=7)).isoformat(),
            "expected_completion": (datetime.now(timezone.utc) + timedelta(days=12)).isoformat(),
            "status": "active",
            "notes": "Full project assigned. Regular progress updates scheduled",
            "created_by": "admin",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=7)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "supplier_id": "supplier_cnc_2",
            "project_id": None,
            "part_ids": [parts[2]["id"]],
            "assignment_type": "parts",
            "assigned_date": (datetime.now(timezone.utc) - timedelta(days=6)).isoformat(),
            "expected_completion": (datetime.now(timezone.utc) + timedelta(days=10)).isoformat(),
            "status": "active",
            "notes": "Single part assignment - bushings only",
            "created_by": "admin",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=6)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "supplier_id": "supplier_cnc_1",
            "project_id": projects[2]["id"],
            "part_ids": [parts[5]["id"], parts[6]["id"]] if len(parts) > 6 else [parts[5]["id"]],
            "assignment_type": "project",
            "assigned_date": (datetime.now(timezone.utc) - timedelta(days=12)).isoformat(),
            "expected_completion": (datetime.now(timezone.utc) + timedelta(days=3)).isoformat(),
            "status": "active",
            "notes": "Medical device project. ISO 13485 compliance required",
            "created_by": "admin",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=12)).isoformat()
        }
    ]

def get_demo_contact_submissions():
    return [
        {
            "id": str(uuid.uuid4()),
            "submission_type": "high_volume",
            "name": "Arjun Verma",
            "email": "arjun.verma@electronics.com",
            "phone": "+91 98765 33333",
            "company": "Smart Electronics Pvt Ltd",
            "monthly_volume": "5000 units",
            "message": "Need aluminum enclosures for smart home devices. Monthly volume of 5000 units",
            "status": "new",
            "created_at": (datetime.now(timezone.utc) - timedelta(hours=6)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "submission_type": "quote_request",
            "name": "Kavya Nair",
            "email": "kavya@industrialtools.com",
            "phone": "+91 98765 44444",
            "company": "Industrial Tools India",
            "monthly_volume": None,
            "message": "Require custom jigs and fixtures for production line. Need quote for 15 different designs",
            "status": "contacted",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "submission_type": "general",
            "name": "Rahul Desai",
            "email": "rahul@dronetech.in",
            "phone": "+91 98765 55555",
            "company": "DroneTech Solutions",
            "monthly_volume": None,
            "message": "Interested in carbon fiber and aluminum drone frames. Can you handle composite materials?",
            "status": "new",
            "created_at": (datetime.now(timezone.utc) - timedelta(hours=12)).isoformat()
        }
    ]
