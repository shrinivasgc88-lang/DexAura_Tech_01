# Comprehensive content for DexAura Manufacturing Platform
# This file contains all detailed content for pages

HOME_CONTENT = {
    "hero": {
        "title": "Precision Manufacturing On-Demand in Bengaluru",
        "subtitle": "Upload CAD files for instant quotes with manufacturability analysis. From rapid prototyping to full-scale production across CNC machining, sheet metal, 3D printing, and specialized processes.",
        "stats": [
            {"label": "Parts Delivered", "value": "50,000+"},
            {"label": "Active Customers", "value": "500+"},
            {"label": "Manufacturing Partners", "value": "150+"},
            {"label": "Average Lead Time", "value": "3-7 Days"}
        ]
    },
    "value_props": [
        {
            "title": "Instant Digital Quoting",
            "description": "Upload your CAD files and receive comprehensive quotes within minutes, not days. Our platform analyzes manufacturability, suggests optimizations, and provides transparent pricing with no hidden costs."
        },
        {
            "title": "Quality-Assured Network",
            "description": "Access a vetted network of ISO 9001:2015 certified manufacturers in Bengaluru and across India. Every supplier undergoes rigorous qualification including capability audits and quality system reviews."
        },
        {
            "title": "Engineering Support",
            "description": "Dedicated applications engineers provide DFM feedback, material recommendations, and process selection guidance. Get expert support throughout your product development cycle."
        },
        {
            "title": "End-to-End Traceability",
            "description": "Complete documentation from quote to delivery including material certificates, inspection reports, and process certifications. Full supply chain visibility with real-time order tracking."
        }
    ],
    "process_steps": [
        {
            "step": 1,
            "title": "Upload CAD Files",
            "description": "Start by uploading your 3D CAD models in formats like STEP, STL, IGES, or Solidworks. Our platform accepts all major CAD file formats."
        },
        {
            "step": 2,
            "title": "Instant Analysis & Quote",
            "description": "Within minutes, receive detailed manufacturability analysis, material recommendations, and real-time pricing for multiple manufacturing processes."
        },
        {
            "step": 3,
            "title": "Review & Optimize",
            "description": "Review DFM feedback and make design adjustments if needed. Our team provides suggestions to improve manufacturability and reduce costs."
        },
        {
            "step": 4,
            "title": "Order & Track",
            "description": "Place your order and track progress in real-time. Receive quality documentation, inspection reports, and on-time delivery guaranteed."
        }
    ]
}

CNC_MACHINING_CONTENT = {
    "overview": {
        "title": "CNC Machining Services",
        "description": "Precision CNC machining for metals and plastics with tolerances down to ±0.002\" (±0.05mm). From prototype to production volumes, we deliver complex geometries with exceptional surface finishes and dimensional accuracy.",
        "capabilities": [
            "3, 4, and 5-axis CNC milling",
            "CNC turning and Swiss turning",
            "Wire EDM and sinker EDM",
            "Tolerances to ±0.002\" (±0.05mm)",
            "Surface finishes from Ra 3.2 to Ra 0.4 μm",
            "Batch sizes from 1 to 10,000+ parts"
        ]
    },
    "milling": {
        "title": "CNC Milling Services",
        "description": "Multi-axis CNC milling delivers precise parts from solid metal or plastic stock. Our network includes machines with work envelopes from 200mm to 2000mm, supporting everything from miniature components to large industrial parts.",
        "specifications": [
            {"parameter": "Axis Configuration", "value": "3-axis, 4-axis, 5-axis"},
            {"parameter": "Maximum Part Size", "value": "2000mm x 1500mm x 1000mm"},
            {"parameter": "Minimum Feature Size", "value": "0.5mm diameter"},
            {"parameter": "Standard Tolerance", "value": "±0.005\" (±0.127mm)"},
            {"parameter": "Precision Tolerance", "value": "±0.002\" (±0.05mm)"},
            {"parameter": "Surface Finish (As-machined)", "value": "Ra 3.2 μm (125 μin)"},
            {"parameter": "Lead Time", "value": "3-10 business days"}
        ],
        "applications": [
            "Complex housings and enclosures",
            "Heat sinks and thermal management",
            "Brackets and structural components",
            "Jigs, fixtures, and tooling",
            "Prototype and functional testing parts"
        ]
    },
    "turning": {
        "title": "CNC Turning Services",
        "description": "Precision turning for cylindrical parts, shafts, pins, and threaded components. Our turning capabilities include both conventional CNC lathes and Swiss-type automatic lathes for high-precision, high-volume production.",
        "specifications": [
            {"parameter": "Maximum Diameter", "value": "500mm (conventional), 32mm (Swiss)"},
            {"parameter": "Maximum Length", "value": "1000mm (conventional), 300mm (Swiss)"},
            {"parameter": "Minimum Diameter", "value": "2mm"},
            {"parameter": "Thread Types", "value": "Metric, UNC, UNF, NPT, custom"},
            {"parameter": "Concentricity", "value": "±0.005mm TIR"},
            {"parameter": "Surface Finish", "value": "Ra 0.8 μm achievable"}
        ],
        "features": [
            "Live tooling for mill-turn operations",
            "Sub-spindle for complex geometries",
            "Thread milling and thread rolling",
            "Knurling and grooving",
            "Custom thread profiles"
        ]
    },
    "materials": {
        "metals": [
            {
                "name": "Aluminum Alloys",
                "grades": "6061-T6, 6082-T6, 7075-T6, 2024-T3",
                "properties": "Excellent machinability, lightweight, good corrosion resistance",
                "applications": "Aerospace, automotive, consumer electronics",
                "finishing": "Anodizing (Type II/III), powder coating, painting"
            },
            {
                "name": "Stainless Steel",
                "grades": "304, 316, 316L, 17-4 PH, 303",
                "properties": "Corrosion resistant, high strength, magnetic (some grades)",
                "applications": "Medical, food processing, marine",
                "finishing": "Passivation, electropolishing, bead blasting"
            },
            {
                "name": "Carbon Steel",
                "grades": "1018, 1045, A36, 4140",
                "properties": "High strength, economical, heat treatable",
                "applications": "Industrial machinery, structural components",
                "finishing": "Black oxide, zinc plating, powder coating"
            },
            {
                "name": "Titanium",
                "grades": "Grade 2 (commercially pure), Grade 5 (Ti-6Al-4V)",
                "properties": "High strength-to-weight ratio, biocompatible, corrosion resistant",
                "applications": "Aerospace, medical implants, high-performance",
                "finishing": "Anodizing, bead blasting"
            },
            {
                "name": "Brass & Copper",
                "grades": "C360 (free-cutting brass), C110 (copper)",
                "properties": "Excellent machinability, electrical conductivity",
                "applications": "Electrical components, fittings, decorative",
                "finishing": "Polishing, plating, patina"
            }
        ],
        "plastics": [
            {
                "name": "ABS",
                "properties": "Tough, impact resistant, easy to machine",
                "temperature_range": "-20°C to 80°C",
                "applications": "Enclosures, automotive parts, consumer products"
            },
            {
                "name": "Acrylic (PMMA)",
                "properties": "Transparent, scratch resistant, UV stable",
                "temperature_range": "-40°C to 90°C",
                "applications": "Optical components, displays, lighting"
            },
            {
                "name": "Nylon 6/6 (PA)",
                "properties": "High strength, wear resistant, chemical resistant",
                "temperature_range": "-40°C to 120°C",
                "applications": "Gears, bearings, structural parts"
            },
            {
                "name": "Polycarbonate (PC)",
                "properties": "High impact strength, transparent, heat resistant",
                "temperature_range": "-40°C to 130°C",
                "applications": "Safety equipment, lighting, medical devices"
            },
            {
                "name": "PEEK",
                "properties": "Exceptional strength, chemical resistant, high temperature",
                "temperature_range": "-60°C to 250°C",
                "applications": "Aerospace, medical, semiconductor"
            },
            {
                "name": "Delrin (POM)",
                "properties": "Low friction, dimensional stability, wear resistant",
                "temperature_range": "-40°C to 90°C",
                "applications": "Gears, bushings, precision parts"
            }
        ]
    },
    "tolerances": {
        "description": "Our CNC machining services achieve industry-leading tolerances with full GD&T capability. All dimensions are verified using CMM inspection and documented in detailed inspection reports.",
        "standard_tolerances": [
            {"feature": "Linear dimensions", "tolerance": "±0.005\" (±0.127mm)"},
            {"feature": "Hole diameters", "tolerance": "±0.002\" (±0.05mm)"},
            {"feature": "Shaft diameters", "tolerance": "±0.002\" (±0.05mm)"},
            {"feature": "Surface flatness", "tolerance": "0.002\" per inch (0.05mm per 25mm)"},
            {"feature": "Perpendicularity", "tolerance": "0.005\" (0.127mm)"},
            {"feature": "Concentricity", "tolerance": "0.005\" TIR (0.127mm)"}
        ],
        "precision_tolerances": [
            {"feature": "Linear dimensions", "tolerance": "±0.001\" (±0.025mm)"},
            {"feature": "Hole diameters (reamed)", "tolerance": "±0.0005\" (±0.0127mm)"},
            {"feature": "Surface flatness (ground)", "tolerance": "0.0005\" (0.0127mm)"},
            {"feature": "Roundness", "tolerance": "0.001\" (0.025mm)"}
        ]
    }
}

SHEET_METAL_CONTENT = {
    "overview": {
        "title": "Sheet Metal Fabrication Services",
        "description": "Complete sheet metal fabrication from laser cutting to welding and assembly. We process materials from 0.5mm to 25mm thickness with precision bending, forming, and finishing capabilities.",
        "capabilities": [
            "Laser cutting up to 25mm thickness",
            "Waterjet cutting for any material",
            "CNC press brake bending",
            "Welding (TIG, MIG, spot)",
            "Hardware insertion and assembly",
            "Comprehensive finishing options"
        ]
    },
    "laser_cutting": {
        "title": "Laser Cutting Services",
        "description": "High-precision fiber laser cutting delivers clean edges, tight tolerances, and fast turnaround. Our laser cutting capabilities handle everything from intricate patterns to large panels.",
        "specifications": [
            {"parameter": "Maximum Sheet Size", "value": "3000mm x 1500mm"},
            {"parameter": "Material Thickness Range", "value": "0.5mm to 25mm"},
            {"parameter": "Cutting Tolerance", "value": "±0.1mm"},
            {"parameter": "Minimum Feature Size", "value": "1x material thickness"},
            {"parameter": "Edge Quality", "value": "Smooth, minimal dross"},
            {"parameter": "Kerf Width", "value": "0.1mm to 0.4mm depending on thickness"}
        ],
        "materials": [
            {"name": "Mild Steel", "thickness": "0.5mm - 25mm"},
            {"name": "Stainless Steel", "thickness": "0.5mm - 20mm"},
            {"name": "Aluminum", "thickness": "0.5mm - 15mm"},
            {"name": "Copper", "thickness": "0.5mm - 8mm"},
            {"name": "Brass", "thickness": "0.5mm - 8mm"}
        ]
    },
    "bending": {
        "title": "Sheet Metal Bending & Forming",
        "description": "CNC press brake bending ensures consistent, repeatable bends with precise angles. Our bending capabilities support complex multi-bend parts with tight tolerances.",
        "specifications": [
            {"parameter": "Maximum Bend Length", "value": "3000mm"},
            {"parameter": "Maximum Force", "value": "200 tons"},
            {"parameter": "Bend Angle Tolerance", "value": "±0.5°"},
            {"parameter": "Minimum Flange Length", "value": "3x material thickness"},
            {"parameter": "Minimum Bend Radius", "value": "1x to 2x material thickness"}
        ],
        "design_guidelines": [
            "Minimum bend radius: 1x material thickness for soft materials, 2x for hard materials",
            "Minimum flange length: 3x material thickness",
            "Hole to bend distance: minimum 2.5x material thickness",
            "K-factor: typically 0.33 to 0.45 depending on material and tooling",
            "Bend relief required for perpendicular bends to prevent tearing"
        ]
    },
    "finishing": {
        "title": "Sheet Metal Finishing Options",
        "description": "Comprehensive finishing services protect parts and enhance aesthetics. All finishes are applied to industry standards with proper surface preparation.",
        "options": [
            {
                "name": "Powder Coating",
                "description": "Durable, uniform coating in a wide range of colors and textures",
                "thickness": "50-100 microns",
                "colors": "RAL, Pantone, custom colors available",
                "finish_types": "Matte, semi-gloss, high-gloss, textured"
            },
            {
                "name": "Wet Painting",
                "description": "Liquid paint application for smooth, high-quality finishes",
                "types": "Enamel, epoxy, polyurethane",
                "application": "Spray, brush, dip"
            },
            {
                "name": "Anodizing (Aluminum)",
                "description": "Electrochemical surface treatment creating protective oxide layer",
                "types": "Type II (decorative), Type III (hard coat)",
                "thickness": "Type II: 5-25 microns, Type III: 25-75 microns",
                "colors": "Clear, black, gold, red, blue"
            },
            {
                "name": "Plating",
                "description": "Electroplating for corrosion protection and conductivity",
                "types": "Zinc, nickel, chrome, tin",
                "thickness": "5-25 microns typical"
            },
            {
                "name": "Passivation (Stainless)",
                "description": "Chemical treatment to enhance corrosion resistance",
                "standards": "ASTM A967, AMS 2700"
            }
        ]
    }
}

THREE_D_PRINTING_CONTENT = {
    "overview": {
        "title": "3D Printing & Additive Manufacturing",
        "description": "Access multiple additive manufacturing technologies for rapid prototyping and production. From functional testing to end-use parts, our 3D printing services deliver speed and design freedom.",
        "technologies": [
            "FDM (Fused Deposition Modeling)",
            "SLA (Stereolithography)",
            "SLS (Selective Laser Sintering)",
            "MJF (Multi Jet Fusion)",
            "DMLS (Direct Metal Laser Sintering)",
            "PolyJet"
        ]
    },
    "fdm": {
        "title": "FDM 3D Printing",
        "description": "Fused Deposition Modeling builds parts layer-by-layer using thermoplastic filaments. Ideal for functional prototypes, jigs, fixtures, and concept models with excellent strength and durability.",
        "specifications": [
            {"parameter": "Build Volume", "value": "Up to 400mm x 400mm x 400mm"},
            {"parameter": "Layer Height", "value": "0.1mm to 0.4mm"},
            {"parameter": "Dimensional Accuracy", "value": "±0.5% (lower limit ±0.5mm)"},
            {"parameter": "Surface Finish", "value": "Visible layer lines, can be post-processed"},
            {"parameter": "Wall Thickness", "value": "1mm minimum"},
            {"parameter": "Lead Time", "value": "1-3 business days"}
        ],
        "materials": [
            {"name": "PLA", "properties": "Easy to print, biodegradable, good detail", "applications": "Concept models, visual prototypes"},
            {"name": "ABS", "properties": "Strong, impact resistant, heat resistant to 80°C", "applications": "Functional prototypes, tooling"},
            {"name": "PETG", "properties": "Good chemical resistance, food safe, transparent", "applications": "Containers, protective covers"},
            {"name": "Nylon", "properties": "Flexible, durable, chemical resistant", "applications": "Living hinges, wear parts"},
            {"name": "TPU (Flexible)", "properties": "Rubber-like, impact resistant, flexible", "applications": "Gaskets, seals, grips"}
        ]
    },
    "sla": {
        "title": "SLA 3D Printing",
        "description": "Stereolithography produces high-resolution parts with smooth surface finishes. Ideal for visual prototypes, master patterns, and parts requiring fine details and complex geometries.",
        "specifications": [
            {"parameter": "Build Volume", "value": "Up to 300mm x 300mm x 300mm"},
            {"parameter": "Layer Height", "value": "0.025mm to 0.1mm"},
            {"parameter": "Dimensional Accuracy", "value": "±0.1% (lower limit ±0.1mm)"},
            {"parameter": "Surface Finish", "value": "Smooth, minimal post-processing required"},
            {"parameter": "Minimum Feature Size", "value": "0.5mm"},
            {"parameter": "Lead Time", "value": "2-4 business days"}
        ],
        "resins": [
            {"name": "Standard Resin", "properties": "General purpose, smooth finish"},
            {"name": "Tough Resin", "properties": "ABS-like properties, impact resistant"},
            {"name": "Flexible Resin", "properties": "Shore 80A hardness, rubber-like"},
            {"name": "High Temp Resin", "properties": "Heat deflection up to 238°C"},
            {"name": "Castable Resin", "properties": "For investment casting, burns out cleanly"}
        ]
    },
    "sls": {
        "title": "SLS/MJF 3D Printing",
        "description": "Selective Laser Sintering and Multi Jet Fusion produce strong, functional parts without support structures. Ideal for complex geometries, end-use parts, and production quantities.",
        "specifications": [
            {"parameter": "Build Volume", "value": "Up to 350mm x 350mm x 350mm"},
            {"parameter": "Layer Height", "value": "0.1mm"},
            {"parameter": "Dimensional Accuracy", "value": "±0.3mm"},
            {"parameter": "Surface Finish", "value": "Slightly grainy, can be tumbled smooth"},
            {"parameter": "Wall Thickness", "value": "0.7mm minimum"},
            {"parameter": "Lead Time", "value": "3-7 business days"}
        ],
        "materials": [
            {"name": "Nylon PA12", "properties": "Strong, durable, chemical resistant, excellent for functional parts"},
            {"name": "Nylon PA11", "properties": "Flexible, impact resistant, bio-based"},
            {"name": "TPU", "properties": "Flexible, rubber-like, Shore 90A"},
            {"name": "Glass-Filled Nylon", "properties": "Increased stiffness and thermal stability"}
        ]
    }
}

QUALITY_CONTENT = {
    "certifications": [
        {
            "name": "ISO 9001:2015",
            "description": "International standard for quality management systems. Ensures consistent quality, customer satisfaction, and continuous improvement.",
            "scope": "All manufacturing processes and quality management"
        },
        {
            "name": "ISO 13485:2016",
            "description": "Medical devices quality management system. Ensures compliance with regulatory requirements for medical device manufacturing.",
            "scope": "Medical device components and assemblies"
        },
        {
            "name": "AS9100D",
            "description": "Aerospace quality management system based on ISO 9001 with additional aerospace-specific requirements.",
            "scope": "Aerospace components and critical parts"
        },
        {
            "name": "IATF 16949:2016",
            "description": "Automotive quality management system focusing on defect prevention and reduction of variation.",
            "scope": "Automotive components and production parts"
        }
    ],
    "inspection_services": [
        {
            "name": "Standard Inspection",
            "description": "Visual and dimensional inspection of critical features per drawing specifications. Includes verification of key dimensions using calibrated measuring instruments.",
            "deliverables": ["Visual inspection report", "Critical dimension verification", "Material certification"],
            "suitable_for": "General manufacturing, non-critical applications"
        },
        {
            "name": "Standard Inspection with Dimensional Report",
            "description": "Comprehensive dimensional inspection with documented measurements for all specified dimensions. Includes statistical analysis and capability data.",
            "deliverables": ["Complete dimensional report", "Measurement uncertainty analysis", "Process capability indices (Cp, Cpk)"],
            "suitable_for": "Production parts, quality-critical components"
        },
        {
            "name": "CMM Inspection with Dimensional Report",
            "description": "Coordinate Measuring Machine (CMM) inspection providing high-accuracy 3D measurement of complex geometries. Includes full GD&T analysis and detailed documentation.",
            "deliverables": ["CMM inspection report", "3D color map deviation analysis", "GD&T verification", "CAD comparison"],
            "accuracy": "±0.002mm (±0.0001\")",
            "suitable_for": "Precision parts, complex geometries, tight tolerances"
        },
        {
            "name": "First Article Inspection Report (per AS9102)",
            "description": "Complete First Article Inspection following AS9102 requirements. Includes comprehensive documentation of all features, materials, and processes per aerospace standards.",
            "deliverables": ["AS9102 Form 1 (Part Number Accountability)", "AS9102 Form 2 (Product Accountability)", "AS9102 Form 3 (Process Verification)", "Material certifications", "Process certifications"],
            "suitable_for": "Aerospace, defense, new product introduction"
        },
        {
            "name": "Source Inspection",
            "description": "On-site inspection at the supplier facility before shipment. Customer or third-party inspector verifies parts meet all requirements prior to delivery.",
            "scope": ["Dimensional verification", "Visual inspection", "Material verification", "Functional testing"],
            "suitable_for": "High-value parts, critical applications, risk mitigation"
        },
        {
            "name": "Additive Part Inspections",
            "description": "Specialized inspection protocols for 3D printed components including layer adhesion, surface finish, dimensional accuracy, and material properties verification.",
            "tests": ["Dimensional inspection", "Surface roughness measurement", "Tensile testing (sample)", "Build orientation verification"],
            "suitable_for": "All additive manufacturing technologies"
        },
        {
            "name": "Custom Inspection",
            "description": "Tailored inspection services based on customer specifications. Can include NDT (non-destructive testing), serialization, custom sampling plans, or customer-provided inspection procedures.",
            "options": [
                "NDT: Penetrant testing, magnetic particle, ultrasonic",
                "Hardness testing: Rockwell, Brinell, Vickers",
                "Surface roughness measurement",
                "Leak testing",
                "Functional testing per customer specifications",
                "Serialization and traceability marking"
            ],
            "suitable_for": "Special applications, regulatory requirements, customer-specific needs"
        }
    ],
    "quality_processes": [
        {
            "stage": "Pre-Production",
            "activities": ["Design review and DFM analysis", "Material verification", "Process capability assessment", "First article inspection planning"]
        },
        {
            "stage": "In-Process",
            "activities": ["Statistical process control", "In-process dimensional checks", "Material traceability", "Equipment calibration verification"]
        },
        {
            "stage": "Final Inspection",
            "activities": ["100% visual inspection", "Dimensional inspection per sampling plan", "Surface finish verification", "Functional testing as applicable"]
        },
        {
            "stage": "Documentation",
            "activities": ["Inspection reports", "Material certificates", "Process certifications", "Certificate of Conformance"]
        }
    ]
}
