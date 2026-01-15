import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Plane, Car, Heart, Cpu, Wrench, Package, CheckCircle, ArrowRight, Award, Clock, Shield } from 'lucide-react';

const Industries = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState('aerospace');

  const industries = {
    aerospace: {
      icon: <Plane className="w-12 h-12" />,
      name: 'Aerospace & Defense',
      tagline: 'Mission-Critical Precision for Flight-Ready Components',
      heroImage: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&h=600&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1436262513933-a0b06755c784?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1583468323330-9032ad490fed?w=600&h=400&fit=crop'
      ],
      description: 'Supporting aerospace innovation from prototype to production with AS9100D certified manufacturing. We deliver precision components that meet the stringent requirements of commercial aviation, defense systems, and space exploration.',
      
      challenges: [
        'Extreme tolerance requirements (±0.001" or tighter)',
        'Complex geometries with thin walls and deep cavities',
        'Exotic material machining (titanium, Inconel, composites)',
        'Full traceability and extensive documentation',
        'Long-term part availability and configuration control',
        'ITAR compliance for defense applications'
      ],
      
      capabilities: [
        {
          title: 'AS9100D Certified Manufacturing',
          description: 'Full aerospace quality management system compliance with certified suppliers and comprehensive process controls.'
        },
        {
          title: 'First Article Inspection (FAI)',
          description: 'Complete AS9102 documentation including dimensional reports, material certifications, and process verification.'
        },
        {
          title: 'Advanced Materials',
          description: 'Machining of titanium (Ti-6Al-4V), Inconel 718, aluminum aerospace alloys (7075-T6, 2024-T3), and composites.'
        },
        {
          title: 'Precision Tolerances',
          description: 'Achieving ±0.001" tolerances with full GD&T capability and CMM inspection verification.'
        }
      ],
      
      applications: [
        {
          category: 'Structural Components',
          examples: ['Wing brackets and fittings', 'Bulkhead components', 'Landing gear parts', 'Fuselage frames']
        },
        {
          category: 'Engine Components',
          examples: ['Turbine housings', 'Compressor components', 'Fuel system parts', 'Heat shields']
        },
        {
          category: 'Avionics & Systems',
          examples: ['Mounting brackets', 'Electronic enclosures', 'Sensor housings', 'Connector bodies']
        },
        {
          category: 'UAV/Drone Components',
          examples: ['Frame structures', 'Motor mounts', 'Camera gimbals', 'Payload housings']
        }
      ],
      
      standards: [
        'AS9100D - Aerospace Quality Management',
        'AS9102 - First Article Inspection',
        'NADCAP - Special Process Certification',
        'MIL-STD-130 - Identification Marking',
        'ITAR - Defense Trade Regulations'
      ],
      
      materials: [
        { name: 'Aluminum 7075-T6', use: 'High-strength structural components' },
        { name: 'Aluminum 2024-T3', use: 'Fuselage and wing structures' },
        { name: 'Titanium Ti-6Al-4V', use: 'High-temperature engine components' },
        { name: 'Inconel 718', use: 'Extreme temperature applications' },
        { name: 'Stainless Steel 15-5 PH', use: 'High-strength fasteners and fittings' }
      ],
      
      stats: [
        { label: 'Typical Tolerance', value: '±0.001"' },
        { label: 'Lead Time', value: '2-4 weeks' },
        { label: 'Max Part Size', value: '1500mm' }
      ]
    },
    
    automotive: {
      icon: <Car className="w-12 h-12" />,
      name: 'Automotive & EV',
      tagline: 'Accelerating Innovation in Traditional and Electric Vehicles',
      heroImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=600&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop'
      ],
      description: 'Supporting automotive manufacturers with rapid prototyping and production capabilities. From concept validation to tooling and production parts, we enable faster time-to-market for traditional, electric, and autonomous vehicle development.',
      
      challenges: [
        'High-volume production readiness validation',
        'Rapid prototype iteration for design validation',
        'Cost-effective tooling for low-volume production',
        'PPAP documentation and APQP compliance',
        'Material validation and testing requirements',
        'Crash test and safety component manufacturing'
      ],
      
      capabilities: [
        {
          title: 'IATF 16949 Ready Manufacturing',
          description: 'Automotive quality management system capable suppliers with PPAP and APQP experience.'
        },
        {
          title: 'Rapid Prototyping',
          description: 'Fast-turn prototypes in production materials for fit, form, and function testing before tooling investment.'
        },
        {
          title: 'Bridge Production',
          description: 'Low-volume production using CNC and additive manufacturing while production tooling is being developed.'
        },
        {
          title: 'EV-Specific Components',
          description: 'Battery enclosures, thermal management, power electronics housings, and charging system components.'
        }
      ],
      
      applications: [
        {
          category: 'Powertrain',
          examples: ['Transmission housings', 'Engine mounts', 'Intake manifolds', 'Fuel system components']
        },
        {
          category: 'Electric Vehicle',
          examples: ['Battery pack enclosures', 'Motor housings', 'Thermal management', 'Charging port assemblies']
        },
        {
          category: 'Chassis & Suspension',
          examples: ['Control arms', 'Knuckles', 'Subframe components', 'Mounting brackets']
        },
        {
          category: 'Interior & Trim',
          examples: ['Dashboard components', 'Center console parts', 'HVAC housings', 'Seat mechanisms']
        }
      ],
      
      standards: [
        'IATF 16949:2016 - Automotive QMS',
        'PPAP - Production Part Approval Process',
        'APQP - Advanced Product Quality Planning',
        'FMEA - Failure Mode Effects Analysis',
        'ISO 26262 - Automotive Functional Safety'
      ],
      
      materials: [
        { name: 'Aluminum A356', use: 'Cast components and housings' },
        { name: 'Steel 4140', use: 'High-strength structural parts' },
        { name: 'ABS/PC Blend', use: 'Interior trim and housings' },
        { name: 'Nylon 6/6 GF', use: 'Under-hood components' },
        { name: 'Aluminum 6061-T6', use: 'Structural and chassis components' }
      ],
      
      stats: [
        { label: 'Typical Tolerance', value: '±0.010"' },
        { label: 'Prototype Lead Time', value: '3-5 days' },
        { label: 'Production Capacity', value: '10K+ units' }
      ]
    },
    
    medical: {
      icon: <Heart className="w-12 h-12" />,
      name: 'Medical Devices',
      tagline: 'Precision Manufacturing for Life-Saving Healthcare Solutions',
      heroImage: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=1200&h=600&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=600&h=400&fit=crop'
      ],
      description: 'ISO 13485:2016 certified manufacturing for medical devices and healthcare products. We support the entire product lifecycle from concept prototypes to commercial production with full regulatory compliance and traceability.',
      
      challenges: [
        'Biocompatibility and material requirements',
        'Sterilization compatibility considerations',
        'FDA and regulatory compliance documentation',
        'Clean room manufacturing requirements',
        'Patient safety and risk management',
        'Design validation and verification testing'
      ],
      
      capabilities: [
        {
          title: 'ISO 13485:2016 Certified',
          description: 'Medical device quality management system with comprehensive process validation and documentation control.'
        },
        {
          title: 'Biocompatible Materials',
          description: 'Processing of USP Class VI materials, medical-grade stainless steel, titanium, and FDA-approved plastics.'
        },
        {
          title: 'Clean Manufacturing',
          description: 'Class 7 (ISO 10,000) clean room capabilities for critical medical components with particle control.'
        },
        {
          title: 'Sterilization-Ready Design',
          description: 'Design for sterilization (autoclave, EtO, gamma radiation) with material and geometry validation.'
        }
      ],
      
      applications: [
        {
          category: 'Surgical Instruments',
          examples: ['Forceps and clamps', 'Retractors', 'Scissors and scalpels', 'Endoscopic tools']
        },
        {
          category: 'Implantable Devices',
          examples: ['Orthopedic implants', 'Spinal hardware', 'Dental implants', 'Surgical screws and plates']
        },
        {
          category: 'Diagnostic Equipment',
          examples: ['Imaging system components', 'Sensor housings', 'Optical assemblies', 'Test equipment parts']
        },
        {
          category: 'Patient Monitoring',
          examples: ['Device housings', 'Sensor mounts', 'Display enclosures', 'Wearable device components']
        }
      ],
      
      standards: [
        'ISO 13485:2016 - Medical Device QMS',
        'FDA 21 CFR Part 820 - Quality System Regulation',
        'ISO 10993 - Biocompatibility Testing',
        'ISO 14971 - Risk Management',
        'IEC 60601 - Medical Electrical Equipment'
      ],
      
      materials: [
        { name: 'Titanium Grade 5', use: 'Implants and surgical instruments' },
        { name: 'Stainless Steel 316L', use: 'Surgical tools and implants' },
        { name: 'PEEK', use: 'Spinal implants and surgical instruments' },
        { name: 'Ultem (PEI)', use: 'Sterilizable device housings' },
        { name: 'Polycarbonate Medical', use: 'Transparent device components' }
      ],
      
      stats: [
        { label: 'Typical Tolerance', value: '±0.002"' },
        { label: 'Lead Time', value: '1-3 weeks' },
        { label: 'Biocompatibility', value: 'USP Class VI' }
      ]
    },
    
    robotics: {
      icon: <Cpu className="w-12 h-12" />,
      name: 'Robotics & Automation',
      tagline: 'Enabling the Future of Intelligent Machines',
      heroImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1563207153-f403bf289096?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1561144257-e32e8eeb6c4b?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=600&h=400&fit=crop'
      ],
      description: 'Precision components for robotics, automation systems, and mechatronic devices. From collaborative robots to industrial automation, we manufacture the mechanical and structural components that bring robotic systems to life.',
      
      challenges: [
        'Tight tolerances for precise motion control',
        'Low-friction bearing surfaces and wear resistance',
        'Lightweight yet strong structural components',
        'Integration with sensors and electronics',
        'Rapid iteration for design optimization',
        'Cost-effective small batch production'
      ],
      
      capabilities: [
        {
          title: 'Precision Machining',
          description: 'Tight tolerance machining (±0.002") for gears, shafts, and motion control components with excellent repeatability.'
        },
        {
          title: 'Lightweight Structures',
          description: 'Optimized designs in aluminum and composites to minimize robot weight while maintaining strength.'
        },
        {
          title: 'Assembly Services',
          description: 'Component assembly, bearing installation, and sub-assembly integration to reduce your assembly time.'
        },
        {
          title: 'Surface Treatments',
          description: 'Hard anodizing, PVD coating, and specialized treatments for wear resistance and low friction.'
        }
      ],
      
      applications: [
        {
          category: 'Robot Arms & Joints',
          examples: ['Joint housings', 'Gear boxes', 'Actuator mounts', 'Link structures']
        },
        {
          category: 'End Effectors',
          examples: ['Gripper fingers', 'Tool changers', 'Suction cup mounts', 'Custom tooling']
        },
        {
          category: 'Motion Systems',
          examples: ['Linear stages', 'Rotary tables', 'Precision gears', 'Bearing blocks']
        },
        {
          category: 'Sensor Mounts',
          examples: ['Camera brackets', 'LIDAR mounts', 'Force sensor housings', 'Vision system brackets']
        }
      ],
      
      standards: [
        'ISO 9283 - Robot Performance Testing',
        'ISO/TS 15066 - Collaborative Robots',
        'IEC 61508 - Functional Safety',
        'RIA R15.06 - Robot Safety Standards'
      ],
      
      materials: [
        { name: 'Aluminum 6061-T6', use: 'Lightweight structural frames' },
        { name: 'Delrin (POM)', use: 'Low-friction bearings and gears' },
        { name: 'Stainless Steel 304', use: 'Shafts and high-load components' },
        { name: 'Carbon Fiber Composite', use: 'Ultra-lightweight structures' },
        { name: 'Nylon 6/6', use: 'Wear-resistant gears and bushings' }
      ],
      
      stats: [
        { label: 'Typical Tolerance', value: '±0.002"' },
        { label: 'Lead Time', value: '5-10 days' },
        { label: 'Weight Optimization', value: 'Up to 40%' }
      ]
    },
    
    electronics: {
      icon: <Package className="w-12 h-12" />,
      name: 'Consumer Electronics',
      tagline: 'Precision Enclosures and Components for Connected Devices',
      heroImage: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=600&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=400&fit=crop'
      ],
      description: 'High-quality enclosures, brackets, and structural components for consumer electronics. From smartphones to smart home devices, we deliver the precision and aesthetics demanded by modern consumer products.',
      
      challenges: [
        'Aesthetic surface finish requirements',
        'Thin-wall design and manufacturing',
        'EMI/RFI shielding requirements',
        'Thermal management integration',
        'High-volume production scalability',
        'Cost optimization for consumer pricing'
      ],
      
      capabilities: [
        {
          title: 'Cosmetic Finishes',
          description: 'Mirror polish, bead blasting, anodizing in custom colors, and powder coating for premium product aesthetics.'
        },
        {
          title: 'Thin-Wall Technology',
          description: 'Machining and molding of thin walls (0.5mm) for lightweight enclosures without sacrificing strength.'
        },
        {
          title: 'EMI Shielding',
          description: 'Conductive coatings, gasket integration, and shielding can assemblies for electromagnetic compatibility.'
        },
        {
          title: 'Rapid Prototyping',
          description: 'Fast-turn prototypes for industrial design validation, user testing, and market feedback.'
        }
      ],
      
      applications: [
        {
          category: 'Device Enclosures',
          examples: ['Smartphone cases', 'Tablet housings', 'Smartwatch bodies', 'Wireless earbud cases']
        },
        {
          category: 'Smart Home',
          examples: ['Speaker grilles', 'Camera housings', 'Sensor enclosures', 'Hub devices']
        },
        {
          category: 'Wearable Tech',
          examples: ['Fitness tracker bodies', 'Smart glasses frames', 'Health monitor housings', 'VR headset components']
        },
        {
          category: 'Computer Hardware',
          examples: ['Laptop chassis', 'External drive enclosures', 'Cooling system components', 'Port assemblies']
        }
      ],
      
      standards: [
        'IPC Standards - Electronics Manufacturing',
        'FCC Part 15 - EMI/EMC Compliance',
        'UL Standards - Safety Certification',
        'RoHS - Hazardous Substance Restrictions',
        'IP Ratings - Ingress Protection'
      ],
      
      materials: [
        { name: 'Aluminum 6061 Anodized', use: 'Premium device housings' },
        { name: 'PC/ABS Blend', use: 'Impact-resistant enclosures' },
        { name: 'Magnesium Alloy', use: 'Ultra-lightweight laptop chassis' },
        { name: 'Stainless Steel 304', use: 'Decorative trim and bezels' },
        { name: 'Polycarbonate', use: 'Transparent covers and displays' }
      ],
      
      stats: [
        { label: 'Surface Finish', value: 'Ra 0.4 μm' },
        { label: 'Lead Time', value: '3-7 days' },
        { label: 'Volume Capacity', value: '100K+ units' }
      ]
    },
    
    industrial: {
      icon: <Wrench className="w-12 h-12" />,
      name: 'Industrial & Manufacturing',
      tagline: 'Durable Components for Heavy-Duty Applications',
      heroImage: 'https://images.unsplash.com/photo-1565114925726-28c3e671fa5f?w=1200&h=600&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop'
      ],
      description: 'Robust manufacturing solutions for industrial equipment, machinery, and tooling. We produce the components that keep factories running, from custom fixtures to replacement parts for legacy equipment.',
      
      challenges: [
        'High-load and high-wear applications',
        'Reverse engineering of legacy components',
        'Custom tooling and fixture requirements',
        'Material hardness and heat treatment',
        'Minimal downtime for critical parts',
        'Cost-effective solutions for maintenance parts'
      ],
      
      capabilities: [
        {
          title: 'Heavy-Duty Machining',
          description: 'Large capacity machining up to 2000mm with high-powered equipment for steel and hardened materials.'
        },
        {
          title: 'Heat Treatment',
          description: 'Hardening, tempering, carburizing, and nitriding for wear resistance and extended component life.'
        },
        {
          title: 'Welding & Fabrication',
          description: 'TIG, MIG, and stick welding for steel structures, frames, and heavy assemblies with certified welders.'
        },
        {
          title: 'Reverse Engineering',
          description: 'CMM scanning and CAD reconstruction for obsolete or undocumented parts to create replacement components.'
        }
      ],
      
      applications: [
        {
          category: 'Jigs & Fixtures',
          examples: ['Welding fixtures', 'Assembly jigs', 'Inspection gauges', 'Work holding devices']
        },
        {
          category: 'Machine Components',
          examples: ['Shafts and couplings', 'Gears and sprockets', 'Bearing housings', 'Guide rails']
        },
        {
          category: 'Conveyor Systems',
          examples: ['Rollers and idlers', 'Chain guides', 'Belt tensioners', 'Transfer mechanisms']
        },
        {
          category: 'Hydraulic & Pneumatic',
          examples: ['Manifold blocks', 'Cylinder bodies', 'Valve housings', 'Fittings and adapters']
        }
      ],
      
      standards: [
        'ISO 9001:2015 - Quality Management',
        'ASME Standards - Mechanical Engineering',
        'AWS D1.1 - Structural Welding',
        'AGMA Standards - Gear Manufacturing'
      ],
      
      materials: [
        { name: 'Steel 4140 HT', use: 'High-strength shafts and gears' },
        { name: 'Cast Iron', use: 'Machine bases and housings' },
        { name: 'Bronze', use: 'Bushings and bearings' },
        { name: 'Tool Steel (D2, O1)', use: 'Cutting tools and dies' },
        { name: 'Stainless Steel 304', use: 'Corrosion-resistant components' }
      ],
      
      stats: [
        { label: 'Maximum Part Size', value: '2000mm' },
        { label: 'Hardness Range', value: 'Up to 62 HRC' },
        { label: 'Lead Time', value: '1-2 weeks' }
      ]
    }
  };

  const currentIndustry = industries[selectedIndustry];

  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#301B3F]/20 via-transparent to-[#720455]/10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Industries We Serve
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Precision manufacturing expertise across critical sectors. From aerospace to medical devices, we deliver quality-assured components that meet the most stringent industry requirements.
            </p>
          </div>

          {/* Industry Selection Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {Object.entries(industries).map(([key, industry]) => (
              <button
                key={key}
                onClick={() => setSelectedIndustry(key)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${
                  selectedIndustry === key
                    ? 'bg-gradient-to-br from-[#720455] to-[#910A67] border-[#910A67] shadow-lg shadow-[#720455]/30'
                    : 'bg-[#1a1a1a] border-[#301B3F]/30 hover:border-[#720455] hover:bg-[#1a1a1a]/80'
                }`}
                data-testid={`industry-tab-${key}`}
              >
                <div className={`${selectedIndustry === key ? 'text-white' : 'text-[#910A67]'}`}>
                  {industry.icon}
                </div>
                <span className={`text-sm font-medium text-center ${selectedIndustry === key ? 'text-white' : 'text-gray-300'}`}>
                  {industry.name.split(' &')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Industry Content */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Industry Header with Hero Image */}
          <div className="mb-12">
            {/* Hero Image */}
            <div className="mb-8 rounded-2xl overflow-hidden border border-[#301B3F]/30">
              <img 
                src={currentIndustry.heroImage} 
                alt={currentIndustry.name}
                className="w-full h-[400px] object-cover"
                loading="lazy"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-[#910A67]">
                {currentIndustry.icon}
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {currentIndustry.name}
                </h2>
                <p className="text-[#910A67] text-lg font-medium mt-1">
                  {currentIndustry.tagline}
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {currentIndustry.description}
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {currentIndustry.stats.map((stat, idx) => (
              <div key={idx} className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-6 text-center">
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Capabilities */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Award className="w-7 h-7 text-[#910A67]" />
              Our Capabilities for {currentIndustry.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentIndustry.capabilities.map((capability, idx) => (
                <div key={idx} className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-white mb-3">{capability.title}</h4>
                  <p className="text-gray-300 leading-relaxed">{capability.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Manufacturing Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentIndustry.galleryImages.map((image, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden border border-[#301B3F]/30 hover:border-[#720455] transition-all duration-300 group">
                  <img 
                    src={image} 
                    alt={`${currentIndustry.name} example ${idx + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Package className="w-7 h-7 text-[#910A67]" />
              Common Applications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentIndustry.applications.map((app, idx) => (
                <div key={idx} className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">{app.category}</h4>
                  <ul className="space-y-2">
                    {app.examples.map((example, eidx) => (
                      <li key={eidx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#910A67] mt-1 flex-shrink-0" />
                        <span className="text-gray-300">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Challenges */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="w-7 h-7 text-[#910A67]" />
              Industry Challenges We Solve
            </h3>
            <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentIndustry.challenges.map((challenge, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#910A67] mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Standards & Certifications */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Quality Standards & Certifications</h3>
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#151515] border border-[#301B3F]/30 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentIndustry.standards.map((standard, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-[#151515] rounded-lg p-4">
                    <Award className="w-5 h-5 text-[#910A67] flex-shrink-0" />
                    <span className="text-gray-300">{standard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Materials */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Recommended Materials</h3>
            <div className="space-y-4">
              {currentIndustry.materials.map((material, idx) => (
                <div key={idx} className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-6 flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{material.name}</h4>
                    <p className="text-gray-400 text-sm">{material.use}</p>
                  </div>
                  <Button
                    onClick={() => navigate('/capabilities')}
                    variant="ghost"
                    className="text-[#910A67] hover:text-white"
                    size="sm"
                  >
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Manufacturing Process Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Our Manufacturing Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[#301B3F] to-[#720455] flex items-center justify-center">
                  <span className="text-white text-6xl font-bold">1</span>
                </div>
                <div className="p-4">
                  <h4 className="text-white font-semibold mb-2">Share CAD Models</h4>
                  <p className="text-gray-400 text-sm">Submit your design files in any format</p>
                </div>
              </div>
              
              <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[#301B3F] to-[#720455] flex items-center justify-center">
                  <span className="text-white text-6xl font-bold">2</span>
                </div>
                <div className="p-4">
                  <h4 className="text-white font-semibold mb-2">DFM Analysis</h4>
                  <p className="text-gray-400 text-sm">Receive manufacturability feedback</p>
                </div>
              </div>
              
              <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[#301B3F] to-[#720455] flex items-center justify-center">
                  <span className="text-white text-6xl font-bold">3</span>
                </div>
                <div className="p-4">
                  <h4 className="text-white font-semibold mb-2">Production</h4>
                  <p className="text-gray-400 text-sm">Certified manufacturing begins</p>
                </div>
              </div>
              
              <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[#301B3F] to-[#720455] flex items-center justify-center">
                  <span className="text-white text-6xl font-bold">4</span>
                </div>
                <div className="p-4">
                  <h4 className="text-white font-semibold mb-2">Quality & Delivery</h4>
                  <p className="text-gray-400 text-sm">Inspection reports and on-time shipping</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#301B3F] via-[#720455] to-[#910A67] rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your {currentIndustry.name} Project?
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Upload your CAD files now for instant analysis and pricing, or speak with our engineering team about your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Button
                onClick={() => navigate('/instant-quote')}
                className="bg-white text-[#720455] hover:bg-gray-100 px-8 py-6 rounded-full font-semibold text-lg"
                data-testid="industry-get-quote-btn"
              >
                Get Instant Quote <ArrowRight className="ml-2 w-5 h-5" />
              </Button> */}
              <Button
                onClick={() => navigate('/contact')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-full font-semibold text-lg"
              >
                Talk to an Engineer
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;
