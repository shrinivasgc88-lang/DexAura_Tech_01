from datetime import datetime, timezone, timedelta
import uuid

def get_seed_quotes():
    return [
        {
            "id": str(uuid.uuid4()),
            "customer_id": "seed_customer_1",
            "quote_type": "instant",
            "parts": [
                {
                    "part_name": "Bracket_Assembly.step",
                    "complexity": "moderate",
                    "estimated_price": 285.50,
                    "lead_time_days": 7,
                    "recommended_material": "Aluminum 6061",
                    "recommended_process": "CNC Milling"
                }
            ],
            "total_price": 285.50,
            "lead_time_days": 7,
            "dfm_insights": [
                "Part geometry suitable for CNC machining",
                "Estimated complexity: Moderate",
                "Consider adding draft angles for better machinability"
            ],
            "status": "completed",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=5)).isoformat(),
            "updated_at": (datetime.now(timezone.utc) - timedelta(days=5)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "customer_id": "seed_customer_2",
            "quote_type": "high_volume",
            "parts": [
                {
                    "part_name": "Housing_Component.stp",
                    "quantity": 1000,
                    "unit_price": 12.50
                }
            ],
            "total_price": 12500.00,
            "lead_time_days": 30,
            "status": "pending",
            "created_at": (datetime.now(timezone.utc) - timedelta(days=2)).isoformat(),
            "updated_at": (datetime.now(timezone.utc) - timedelta(days=2)).isoformat()
        }
    ]

def get_seed_orders():
    return [
        {
            "id": str(uuid.uuid4()),
            "customer_id": "seed_customer_1",
            "order_number": "ORD-2025-001",
            "status": "In Production",
            "order_type": "on_demand",
            "total_amount": 285.50,
            "notes": "Standard finish required",
            "timeline_events": [
                {"status": "New", "timestamp": (datetime.now(timezone.utc) - timedelta(days=5)).isoformat()},
                {"status": "In Review", "timestamp": (datetime.now(timezone.utc) - timedelta(days=4)).isoformat()},
                {"status": "Quoted", "timestamp": (datetime.now(timezone.utc) - timedelta(days=3)).isoformat()},
                {"status": "In Production", "timestamp": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat()}
            ],
            "created_at": (datetime.now(timezone.utc) - timedelta(days=5)).isoformat(),
            "updated_at": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "customer_id": "seed_customer_2",
            "order_number": "ORD-2025-002",
            "status": "New",
            "order_type": "on_demand",
            "total_amount": 450.00,
            "timeline_events": [
                {"status": "New", "timestamp": datetime.now(timezone.utc).isoformat()}
            ],
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "customer_id": "seed_customer_1",
            "order_number": "ORD-2025-003",
            "status": "Shipped",
            "order_type": "on_demand",
            "total_amount": 1250.00,
            "timeline_events": [
                {"status": "New", "timestamp": (datetime.now(timezone.utc) - timedelta(days=10)).isoformat()},
                {"status": "In Review", "timestamp": (datetime.now(timezone.utc) - timedelta(days=9)).isoformat()},
                {"status": "Quoted", "timestamp": (datetime.now(timezone.utc) - timedelta(days=8)).isoformat()},
                {"status": "In Production", "timestamp": (datetime.now(timezone.utc) - timedelta(days=5)).isoformat()},
                {"status": "Shipped", "timestamp": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat()}
            ],
            "created_at": (datetime.now(timezone.utc) - timedelta(days=10)).isoformat(),
            "updated_at": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat()
        }
    ]

def get_seed_notifications():
    return [
        {
            "id": str(uuid.uuid4()),
            "recipient_id": "admin",
            "title": "New Order Received",
            "message": "Order ORD-2025-002 has been placed",
            "type": "order",
            "related_entity_id": "seed_order_2",
            "read": False,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "recipient_id": "admin",
            "title": "New Quote Request",
            "message": "High volume quote requested",
            "type": "quote",
            "related_entity_id": "seed_quote_2",
            "read": False,
            "created_at": (datetime.now(timezone.utc) - timedelta(hours=2)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "recipient_id": "admin",
            "title": "Contact Form Submission",
            "message": "New high volume manufacturing inquiry",
            "type": "contact",
            "read": True,
            "created_at": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "recipient_id": "seed_customer_1",
            "title": "Order Status Update",
            "message": "Your order ORD-2025-001 is now in production",
            "type": "order",
            "related_entity_id": "seed_order_1",
            "read": False,
            "created_at": (datetime.now(timezone.utc) - timedelta(hours=6)).isoformat()
        }
    ]

def get_seed_blog_posts():
    posts = []
    
    # CNC Machining Posts
    posts.extend([
        {
            "id": str(uuid.uuid4()),
            "title": "Ultimate Guide to CNC Milling: Processes, Materials, and Best Practices",
            "slug": "cnc-milling-guide",
            "category": "CNC Machining",
            "summary": "Comprehensive guide covering multi-axis CNC milling, material selection, tolerance standards, and design optimization for precision manufacturing.",
            "content": "# Ultimate Guide to CNC Milling\n\nCNC milling is a subtractive manufacturing process...\n\n## Multi-Axis Machining Capabilities\n\nModern CNC mills range from 3-axis to 5-axis configurations...\n\n## Material Selection\n\nChoosing the right material is critical...\n\n## Tolerance Standards\n\nStandard tolerances for CNC machining...\n\n## FAQs\n\n### What is the typical tolerance for CNC milling?\n\nStandard tolerances are ±0.005\" (±0.127mm)...",
            "hero_image": "/images/blog/cnc-milling-hero.jpg",
            "tags": ["CNC", "Milling", "Precision", "Manufacturing"],
            "read_time_minutes": 12,
            "meta_title": "CNC Milling Guide - Precision Manufacturing | DexAura",
            "meta_description": "Learn about CNC milling processes, materials, tolerances, and best practices for precision manufacturing in Bengaluru.",
            "published": True,
            "published_at": (datetime.now(timezone.utc) - timedelta(days=15)).isoformat(),
            "created_at": (datetime.now(timezone.utc) - timedelta(days=15)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "CNC Turning vs Milling: When to Use Each Process",
            "slug": "cnc-turning-vs-milling",
            "category": "CNC Machining",
            "summary": "Deep dive into the differences between CNC turning and milling, including ideal applications, cost considerations, and design guidelines.",
            "content": "# CNC Turning vs Milling\n\nUnderstanding when to use turning versus milling...\n\n## CNC Turning Fundamentals\n\nTurning is ideal for cylindrical parts...\n\n## When to Choose Milling\n\nMilling excels at complex geometries...\n\n## Cost Optimization\n\nChoosing the right process saves time and money...\n\n## FAQs\n\n### Can one process replace the other?\n\nWhile there is overlap, each has distinct advantages...",
            "hero_image": "/images/blog/turning-vs-milling.jpg",
            "tags": ["CNC", "Turning", "Milling", "Process Selection"],
            "read_time_minutes": 10,
            "meta_title": "CNC Turning vs Milling - Process Selection Guide | DexAura",
            "meta_description": "Compare CNC turning and milling processes to choose the optimal manufacturing method for your parts.",
            "published": True,
            "published_at": (datetime.now(timezone.utc) - timedelta(days=10)).isoformat(),
            "created_at": (datetime.now(timezone.utc) - timedelta(days=10)).isoformat()
        }
    ])
    
    # Sheet Metal Posts
    posts.extend([
        {
            "id": str(uuid.uuid4()),
            "title": "Sheet Metal Fabrication Design Guide: Bends, Holes, and Tolerances",
            "slug": "sheet-metal-design-guide",
            "category": "Sheet Metals",
            "summary": "Essential design guidelines for sheet metal parts including bend radii, hole-to-edge distances, K-factors, and material-specific considerations.",
            "content": "# Sheet Metal Fabrication Design Guide\n\nDesigning for sheet metal requires understanding...\n\n## Bend Radius Guidelines\n\nMinimum bend radius depends on material thickness...\n\n## Hole and Feature Placement\n\nProper spacing prevents distortion...\n\n## Material Selection\n\nEach material has unique forming characteristics...\n\n## FAQs\n\n### What is the minimum bend radius?\n\nTypically 1x material thickness for soft materials...",
            "hero_image": "/images/blog/sheet-metal-design.jpg",
            "tags": ["Sheet Metal", "Design", "Fabrication", "DFM"],
            "read_time_minutes": 11,
            "meta_title": "Sheet Metal Design Guide - DFM Best Practices | DexAura",
            "meta_description": "Master sheet metal design with our comprehensive guide covering bends, tolerances, and manufacturability.",
            "published": True,
            "published_at": (datetime.now(timezone.utc) - timedelta(days=12)).isoformat(),
            "created_at": (datetime.now(timezone.utc) - timedelta(days=12)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Laser Cutting vs Waterjet: Choosing the Right Sheet Cutting Process",
            "slug": "laser-vs-waterjet-cutting",
            "category": "Sheet Metals",
            "summary": "Comparative analysis of laser cutting and waterjet technologies, including material compatibility, edge quality, and cost considerations.",
            "content": "# Laser Cutting vs Waterjet\n\nBoth processes excel at sheet cutting...\n\n## Laser Cutting Advantages\n\nFast, precise, excellent for metals...\n\n## Waterjet Benefits\n\nNo heat-affected zone, cuts any material...\n\n## Process Selection Criteria\n\nMaterial, thickness, and tolerance requirements...\n\n## FAQs\n\n### Which is more cost-effective?\n\nDepends on material and production volume...",
            "hero_image": "/images/blog/laser-waterjet.jpg",
            "tags": ["Laser Cutting", "Waterjet", "Sheet Cutting", "Process Comparison"],
            "read_time_minutes": 9,
            "meta_title": "Laser vs Waterjet Cutting - Technology Comparison | DexAura",
            "meta_description": "Compare laser cutting and waterjet technologies to select the optimal sheet cutting process for your project.",
            "published": True,
            "published_at": (datetime.now(timezone.utc) - timedelta(days=8)).isoformat(),
            "created_at": (datetime.now(timezone.utc) - timedelta(days=8)).isoformat()
        }
    ])
    
    # 3D Printing Posts
    posts.extend([
        {
            "id": str(uuid.uuid4()),
            "title": "3D Printing Technology Comparison: FDM, SLA, SLS, and MJF",
            "slug": "3d-printing-technologies",
            "category": "3D Printing",
            "summary": "Detailed comparison of additive manufacturing technologies including capabilities, materials, applications, and cost analysis.",
            "content": "# 3D Printing Technology Comparison\n\nAdditive manufacturing offers multiple technologies...\n\n## FDM (Fused Deposition Modeling)\n\nMost accessible, great for prototypes...\n\n## SLA (Stereolithography)\n\nHigh resolution, smooth surface finish...\n\n## SLS and MJF\n\nFunctional parts without support structures...\n\n## FAQs\n\n### Which technology is best for prototypes?\n\nDepends on required resolution and material...",
            "hero_image": "/images/blog/3d-printing-tech.jpg",
            "tags": ["3D Printing", "Additive Manufacturing", "FDM", "SLA", "SLS"],
            "read_time_minutes": 13,
            "meta_title": "3D Printing Technologies Guide - FDM, SLA, SLS | DexAura",
            "meta_description": "Comprehensive comparison of 3D printing technologies to help you choose the right process for your application.",
            "published": True,
            "published_at": (datetime.now(timezone.utc) - timedelta(days=7)).isoformat(),
            "created_at": (datetime.now(timezone.utc) - timedelta(days=7)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Design for Additive Manufacturing: Optimization Strategies",
            "slug": "design-for-additive-manufacturing",
            "category": "3D Printing",
            "summary": "Learn how to design parts specifically for 3D printing, including topology optimization, support minimization, and material efficiency.",
            "content": "# Design for Additive Manufacturing\n\n3D printing enables design freedom...\n\n## Topology Optimization\n\nReduce weight while maintaining strength...\n\n## Support Structure Considerations\n\nMinimize supports for cost and quality...\n\n## Material-Specific Design\n\nEach material has unique requirements...\n\n## FAQs\n\n### Do all 3D printed parts need supports?\n\nDepends on geometry and technology...",
            "hero_image": "/images/blog/dfam.jpg",
            "tags": ["DFAM", "3D Printing", "Design Optimization", "Additive"],
            "read_time_minutes": 10,
            "meta_title": "Design for Additive Manufacturing Guide | DexAura",
            "meta_description": "Master design optimization for 3D printing with strategies for support reduction and material efficiency.",
            "published": True,
            "published_at": (datetime.now(timezone.utc) - timedelta(days=5)).isoformat(),
            "created_at": (datetime.now(timezone.utc) - timedelta(days=5)).isoformat()
        }
    ])
    
    # Special Process Posts
    posts.extend([
        {
            "id": str(uuid.uuid4()),
            "title": "Heat Treatment for Precision Parts: Processes and Applications",
            "slug": "heat-treatment-guide",
            "category": "Special Process",
            "summary": "Comprehensive guide to heat treatment processes including annealing, hardening, tempering, and their impact on material properties.",
            "content": "# Heat Treatment Guide\n\nHeat treatment modifies material properties...\n\n## Common Heat Treatment Processes\n\nAnnealing, hardening, tempering, normalizing...\n\n## Material-Specific Treatments\n\nSteel, aluminum, titanium requirements...\n\n## Quality Control\n\nHardness testing and verification...\n\n## FAQs\n\n### What is the purpose of heat treatment?\n\nEnhances mechanical properties like hardness...",
            "hero_image": "/images/blog/heat-treatment.jpg",
            "tags": ["Heat Treatment", "Material Science", "Quality", "Hardening"],
            "read_time_minutes": 11,
            "meta_title": "Heat Treatment Guide - Processes and Applications | DexAura",
            "meta_description": "Learn about heat treatment processes and their applications in precision manufacturing.",
            "published": True,
            "published_at": (datetime.now(timezone.utc) - timedelta(days=6)).isoformat(),
            "created_at": (datetime.now(timezone.utc) - timedelta(days=6)).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Surface Finishing: Coating, Plating, and Anodizing Options",
            "slug": "surface-finishing-guide",
            "category": "Special Process",
            "summary": "Explore surface finishing options including powder coating, electroplating, anodizing, and their applications in manufacturing.",
            "content": "# Surface Finishing Guide\n\nSurface treatments enhance appearance and durability...\n\n## Coating Options\n\nPowder coating, e-coating, wet painting...\n\n## Plating Processes\n\nElectroplating, electroless plating...\n\n## Anodizing\n\nType II and Type III anodizing...\n\n## FAQs\n\n### What is the most durable finish?\n\nDepends on application and environment...",
            "hero_image": "/images/blog/surface-finishing.jpg",
            "tags": ["Surface Finishing", "Coating", "Anodizing", "Plating"],
            "read_time_minutes": 10,
            "meta_title": "Surface Finishing Guide - Coating and Plating | DexAura",
            "meta_description": "Comprehensive guide to surface finishing options for precision manufactured parts.",
            "published": True,
            "published_at": (datetime.now(timezone.utc) - timedelta(days=4)).isoformat(),
            "created_at": (datetime.now(timezone.utc) - timedelta(days=4)).isoformat()
        }
    ])
    
    return posts
