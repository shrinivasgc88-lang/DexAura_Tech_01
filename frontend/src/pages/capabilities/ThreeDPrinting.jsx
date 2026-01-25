import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, ArrowRight, Zap, Box, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ThreeDPrinting = () => {
  const navigate = useNavigate();

  const technologies = [
    {
      name: 'FDM (Fused Deposition Modeling)',
      icon: <Layers className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop',
      description: 'Most accessible additive technology building parts layer-by-layer with thermoplastic filaments. Ideal for functional prototypes, jigs, fixtures, and concept models with excellent strength and durability at economical pricing.',
      specs: [
        { param: 'Build Volume', value: 'Up to 400mm x 400mm x 400mm' },
        { param: 'Layer Height', value: '0.1mm to 0.4mm' },
        { param: 'Dimensional Accuracy', value: '±0.5% (lower limit ±0.5mm)' },
        { param: 'Surface Finish', value: 'Visible layer lines, post-processing available' },
        { param: 'Wall Thickness', value: '1mm minimum recommended' },
        { param: 'Lead Time', value: '1-3 business days' },
        { param: 'Cost', value: '$' }
      ],
      materials: [
        {
          name: 'PLA (Polylactic Acid)',
          properties: 'Easy to print, biodegradable, good detail, brittle under stress',
          temp: '60-65°C heat deflection',
          strength: '50 MPa tensile strength',
          applications: 'Concept models, visual prototypes, non-functional parts',
          cost: 'Low'
        },
        {
          name: 'ABS (Acrylonitrile Butadiene Styrene)',
          properties: 'Strong, impact resistant, heat resistant, good layer adhesion',
          temp: '95-105°C heat deflection',
          strength: '40 MPa tensile strength',
          applications: 'Functional prototypes, tooling, automotive parts, enclosures',
          cost: 'Low'
        },
        {
          name: 'PETG',
          properties: 'Good chemical resistance, food safe, transparent options, strong',
          temp: '70-80°C heat deflection',
          strength: '53 MPa tensile strength',
          applications: 'Containers, protective covers, transparent parts',
          cost: 'Low-Medium'
        },
        {
          name: 'Nylon (PA)',
          properties: 'Excellent wear resistance, flexible, chemical resistant, durable',
          temp: '85°C heat deflection',
          strength: '75 MPa tensile strength',
          applications: 'Living hinges, wear parts, gears, functional assemblies',
          cost: 'Medium'
        },
        {
          name: 'TPU (Thermoplastic Polyurethane)',
          properties: 'Rubber-like flexibility, impact resistant, abrasion resistant',
          temp: 'Shore 95A hardness',
          strength: 'Flexible - 26 MPa',
          applications: 'Gaskets, seals, grips, phone cases, wearables',
          cost: 'Medium'
        }
      ],
      advantages: [
        'Most cost-effective 3D printing technology',
        'Wide material selection including engineering grades',
        'Large build volumes available',
        'Quick turnaround for prototypes',
        'No support removal for simple geometries'
      ],
      limitations: [
        'Visible layer lines on surface',
        'Anisotropic strength (weaker between layers)',
        'Limited fine detail compared to resin',
        'Post-processing may be required'
      ]
    },
    {
      name: 'SLA (Stereolithography)',
      icon: <Zap className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1612832021824-601a4dc8f9a7?w=800&h=500&fit=crop',
      description: 'High-resolution resin-based 3D printing producing parts with smooth surface finishes and fine details. Perfect for visual prototypes, master patterns for casting, dental and medical models, and parts requiring intricate features.',
      specs: [
        { param: 'Build Volume', value: 'Up to 300mm x 300mm x 300mm' },
        { param: 'Layer Height', value: '0.025mm to 0.1mm' },
        { param: 'Dimensional Accuracy', value: '±0.1% (lower limit ±0.1mm)' },
        { param: 'Surface Finish', value: 'Smooth, minimal post-processing' },
        { param: 'Minimum Feature Size', value: '0.5mm' },
        { param: 'Lead Time', value: '2-4 business days' },
        { param: 'Cost', value: '$$' }
      ],
      materials: [
        {
          name: 'Standard Resin',
          properties: 'General purpose, smooth finish, good detail, brittle',
          temp: '55-60°C heat deflection',
          strength: '65 MPa tensile strength',
          applications: 'Visual prototypes, display models, concept validation',
          cost: 'Medium'
        },
        {
          name: 'Tough Resin',
          properties: 'ABS-like properties, impact resistant, some flexibility',
          temp: '60-70°C heat deflection',
          strength: '55 MPa tensile strength',
          applications: 'Functional prototypes, snap-fit assemblies, housings',
          cost: 'Medium-High'
        },
        {
          name: 'Flexible Resin',
          properties: 'Shore 80A hardness, rubber-like, impact absorbing',
          temp: 'Shore 80A',
          strength: 'Flexible material',
          applications: 'Gaskets, seals, soft-touch grips, wearable parts',
          cost: 'High'
        },
        {
          name: 'High Temp Resin',
          properties: 'Heat resistant, dimensionally stable at temperature',
          temp: '238°C heat deflection',
          strength: '60 MPa tensile strength',
          applications: 'Hot air/fluid flow testing, injection mold inserts, under-hood parts',
          cost: 'High'
        },
        {
          name: 'Castable Resin',
          properties: 'Burns out cleanly for investment casting, high detail',
          temp: 'Casting pattern',
          strength: 'Pattern material',
          applications: 'Jewelry casting, dental crowns, investment casting patterns',
          cost: 'High'
        },
        {
          name: 'Clear Resin',
          properties: 'Transparent, can be polished to optical clarity',
          temp: '60°C heat deflection',
          strength: '65 MPa tensile strength',
          applications: 'Light pipes, fluid flow visualization, lenses, displays',
          cost: 'Medium-High'
        }
      ],
      advantages: [
        'Excellent surface finish and fine details',
        'Isotropic mechanical properties',
        'Wide range of specialized resins',
        'Smooth surfaces require minimal post-processing',
        'Ideal for small, intricate parts'
      ],
      limitations: [
        'More expensive than FDM',
        'Parts require washing and UV curing',
        'Materials can be brittle',
        'UV sensitivity over time'
      ]
    },
    {
      name: 'SLS/MJF (Selective Laser Sintering / Multi Jet Fusion)',
      icon: <Box className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1565114925726-28c3e671fa5f?w=800&h=500&fit=crop',
      description: 'Industrial-grade powder-based 3D printing producing strong, functional parts without support structures. Excellent for complex geometries, living hinges, snap-fits, and end-use production parts with superior mechanical properties.',
      specs: [
        { param: 'Build Volume', value: 'Up to 350mm x 350mm x 350mm' },
        { param: 'Layer Height', value: '0.1mm' },
        { param: 'Dimensional Accuracy', value: '±0.3mm or ±0.3% (greater)' },
        { param: 'Surface Finish', value: 'Slightly grainy, can be tumbled/dyed' },
        { param: 'Wall Thickness', value: '0.7mm minimum' },
        { param: 'Lead Time', value: '3-7 business days' },
        { param: 'Cost', value: '$$$' }
      ],
      materials: [
        {
          name: 'Nylon PA12 (Polyamide 12)',
          properties: 'Strong, durable, chemical resistant, excellent for functional parts',
          temp: '172°C heat deflection',
          strength: '48 MPa tensile strength, 20% elongation',
          applications: 'End-use parts, functional prototypes, living hinges, snap-fits, complex assemblies',
          cost: 'Medium-High'
        },
        {
          name: 'Nylon PA11 (Bio-based)',
          properties: 'Flexible, impact resistant, sustainable, good chemical resistance',
          temp: '184°C heat deflection',
          strength: '50 MPa tensile strength, 35% elongation',
          applications: 'Flexible parts, impact-resistant components, sustainable products',
          cost: 'High'
        },
        {
          name: 'TPU (Thermoplastic Polyurethane)',
          properties: 'Flexible, rubber-like, Shore 90A, excellent rebound',
          temp: 'Shore 90A hardness',
          strength: 'Flexible - 10 MPa',
          applications: 'Cushioning, seals, flexible joints, footwear, sports equipment',
          cost: 'High'
        },
        {
          name: 'Glass-Filled Nylon',
          properties: 'Increased stiffness and dimensional stability, heat resistant',
          temp: '185°C heat deflection',
          strength: '55 MPa tensile strength',
          applications: 'Structural parts, high-temperature applications, stiff assemblies',
          cost: 'High'
        }
      ],
      advantages: [
        'No support structures needed',
        'Isotropic mechanical properties',
        'Excellent for complex geometries',
        'Production-grade material properties',
        'Can nest multiple parts in single build'
      ],
      limitations: [
        'Higher cost than FDM and SLA',
        'Longer lead times',
        'Slightly porous surface finish',
        'Limited color options (can be dyed)'
      ]
    }
  ];

  const designGuidelines = [
    {
      title: 'Wall Thickness',
      fdm: 'Minimum 1.0mm recommended, 2mm+ for structural',
      sla: 'Minimum 0.6mm, 1mm+ recommended',
      sls: 'Minimum 0.7mm, 1mm+ recommended'
    },
    {
      title: 'Hole Diameter',
      fdm: 'Minimum 2mm, add clearance for press-fits',
      sla: 'Minimum 0.5mm possible, 1mm+ practical',
      sls: 'Minimum 1.5mm, may require post-drilling'
    },
    {
      title: 'Text/Engraving',
      fdm: 'Minimum 1mm height, embossed preferred',
      sla: 'Minimum 0.3mm height, excellent detail',
      sls: 'Minimum 0.5mm height, consider depth'
    },
    {
      title: 'Moving Parts',
      fdm: 'Add 0.3-0.5mm clearance',
      sla: 'Add 0.2-0.3mm clearance',
      sls: 'Add 0.4-0.5mm clearance'
    }
  ];

  const applications = [
    {
      category: 'Rapid Prototyping',
      examples: ['Design validation', 'Fit and function testing', 'User feedback models', 'Form studies']
    },
    {
      category: 'Manufacturing Aids',
      examples: ['Jigs and fixtures', 'Assembly tools', 'Quality inspection gauges', 'Soft tooling']
    },
    {
      category: 'End-Use Parts',
      examples: ['Low-volume production', 'Custom components', 'Replacement parts', 'Personalized products']
    },
    {
      category: 'Medical & Dental',
      examples: ['Surgical guides', 'Anatomical models', 'Dental aligners', 'Prosthetic prototypes']
    }
  ];

  const postProcessing = [
    { name: 'Sanding & Polishing', tech: 'FDM, SLA', result: 'Smooth surfaces, remove layer lines' },
    { name: 'Vapor Smoothing', tech: 'FDM (ABS)', result: 'Glass-like surface finish' },
    { name: 'Painting', tech: 'All', result: 'Custom colors and finishes' },
    { name: 'Dyeing', tech: 'SLS (Nylon)', result: 'Color throughout material' },
    { name: 'Coating', tech: 'All', result: 'Protective clear coat or texture' },
    { name: 'Metal Plating', tech: 'SLA, FDM', result: 'Metallic appearance and conductivity' }
  ];

  return (
    <div className="min-h-screen bg-[#151515] ">
          <div className="bg-[#0d0d0d] border-b border-[#301B3F]/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            onClick={() => navigate('/capabilities')}
            variant="ghost"
            className="text-gray-300 hover:text-white"
            data-testid="back-btn"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>


      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            3D Printing & Additive Manufacturing
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-4xl">
            Access multiple additive manufacturing technologies for rapid prototyping and production. From concept validation to end-use parts, our 3D printing services deliver design freedom, fast turnaround, and cost-effective low-volume manufacturing without tooling investment.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-[#301B3F]/30">
          <img 
            src="https://images.unsplash.com/photo-1612832021824-601a4dc8f9a7?w=1200&h=500&fit=crop"
            alt="3D Printing Technology"
            className="w-full h-[400px] object-cover"
            loading="eager"
          />
        </div>

        {/* Key Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            'No tooling costs - ideal for prototypes',
            'Complex geometries impossible with traditional methods',
            'Same-day to 1-week turnaround',
            '100+ materials from commodity to engineering grade',
            'Bridge production while tooling is made',
            'Design iterations at minimal cost'
          ].map((cap, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-[#1a1a1a] border border-[#301B3F]/30 rounded-lg p-4">
              <CheckCircle className="w-5 h-5 text-[#910A67] flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">{cap}</span>
            </div>
          ))}
        </div>

        {/* Technologies Tabs */}
        <Tabs defaultValue="fdm" className="space-y-8">
          <TabsList className="bg-[#1a1a1a] p-1.5 rounded-xl flex-wrap h-auto">
            <TabsTrigger value="fdm" className="text-sm sm:text-base">FDM</TabsTrigger>
            <TabsTrigger value="sla" className="text-sm sm:text-base">SLA</TabsTrigger>
            <TabsTrigger value="sls" className="text-sm sm:text-base">SLS/MJF</TabsTrigger>
            <TabsTrigger value="design" className="text-sm sm:text-base">Design Guidelines</TabsTrigger>
            <TabsTrigger value="applications" className="text-sm sm:text-base">Applications</TabsTrigger>
            <TabsTrigger value="finishing" className="text-sm sm:text-base">Post-Processing</TabsTrigger>
          </TabsList>

          {/* Technology Tabs */}
          {technologies.map((tech, idx) => (
            <TabsContent key={idx} value={tech.name === 'FDM (Fused Deposition Modeling)' ? 'fdm' : tech.name.includes('SLA') ? 'sla' : 'sls'} className="space-y-6">
              <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-2xl overflow-hidden">
                {/* Tech Image */}
                <div className="relative h-64">
                  <img 
                    src={tech.image}
                    alt={tech.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515] to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="text-[#910A67]">{tech.icon}</div>
                    <h2 className="text-3xl font-bold text-white">{tech.name}</h2>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">{tech.description}</p>

                  {/* Specifications */}
                  <h3 className="text-2xl font-semibold text-white mb-4">Technical Specifications</h3>
                  <div className="overflow-x-auto mb-8">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-[#301B3F]">
                          <th className="text-left py-3 px-4 text-[#910A67] font-semibold">Parameter</th>
                          <th className="text-left py-3 px-4 text-[#910A67] font-semibold">Specification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tech.specs.map((spec, sidx) => (
                          <tr key={sidx} className="border-b border-[#301B3F]/30">
                            <td className="py-3 px-4 text-gray-300">{spec.param}</td>
                            <td className="py-3 px-4 text-white font-medium">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Materials */}
                  <h3 className="text-2xl font-semibold text-white mb-4">Available Materials</h3>
                  <div className="space-y-4 mb-8">
                    {tech.materials.map((material, midx) => (
                      <div key={midx} className="bg-[#151515] rounded-xl p-6 border border-[#301B3F]/20">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-xl font-bold text-white">{material.name}</h4>
                          <span className="text-sm text-gray-400 bg-[#1a1a1a] px-3 py-1 rounded-full">{material.cost}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <span className="text-xs text-gray-400">Temperature/Hardness</span>
                            <p className="text-white font-medium">{material.temp}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-400">Strength</span>
                            <p className="text-white font-medium">{material.strength}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-semibold text-gray-400">Properties: </span>
                            <span className="text-gray-300 text-sm">{material.properties}</span>
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-400">Best For: </span>
                            <span className="text-gray-300 text-sm">{material.applications}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Advantages & Limitations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Advantages</h4>
                      <ul className="space-y-2">
                        {tech.advantages.map((adv, aidx) => (
                          <li key={aidx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[#910A67] mt-1 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Limitations</h4>
                      <ul className="space-y-2">
                        {tech.limitations.map((lim, lidx) => (
                          <li key={lidx} className="flex items-start gap-2">
                            <div className="w-4 h-4 border-2 border-gray-500 rounded-full mt-1 flex-shrink-0"></div>
                            <span className="text-gray-300 text-sm">{lim}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}

          {/* Design Guidelines Tab */}
          <TabsContent value="design" className="space-y-6">
            <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Design for Additive Manufacturing (DfAM)</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Optimize your designs for 3D printing to ensure manufacturability, reduce costs, and improve part quality. Follow these guidelines for each technology.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-[#301B3F]">
                      <th className="text-left py-3 px-4 text-[#910A67] font-semibold">Design Element</th>
                      <th className="text-left py-3 px-4 text-[#910A67] font-semibold">FDM</th>
                      <th className="text-left py-3 px-4 text-[#910A67] font-semibold">SLA</th>
                      <th className="text-left py-3 px-4 text-[#910A67] font-semibold">SLS/MJF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {designGuidelines.map((guide, idx) => (
                      <tr key={idx} className="border-b border-[#301B3F]/30">
                        <td className="py-3 px-4 text-white font-medium">{guide.title}</td>
                        <td className="py-3 px-4 text-gray-300 text-sm">{guide.fdm}</td>
                        <td className="py-3 px-4 text-gray-300 text-sm">{guide.sla}</td>
                        <td className="py-3 px-4 text-gray-300 text-sm">{guide.sls}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 bg-[#151515] rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">General DfAM Best Practices</h3>
                <ul className="space-y-2">
                  {[
                    'Orient parts to minimize support material (especially FDM)',
                    'Avoid large flat surfaces parallel to build platform (warping risk)',
                    'Add fillets to internal corners to reduce stress concentration',
                    'Design with draft angles for easier support removal',
                    'Consider anisotropic strength when designing for FDM',
                    'Use lattice structures for lightweight designs (SLS/MJF)',
                    'Account for shrinkage and thermal expansion in your design'
                  ].map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#910A67] mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">3D Printing Applications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {applications.map((app, idx) => (
                  <div key={idx} className="bg-[#151515] rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">{app.category}</h3>
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
          </TabsContent>

          {/* Post-Processing Tab */}
          <TabsContent value="finishing" className="space-y-6">
            <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Post-Processing & Finishing</h2>
              <p className="text-gray-300 mb-8">
                Enhance your 3D printed parts with professional finishing services for improved aesthetics and functionality.
              </p>

              <div className="space-y-4">
                {postProcessing.map((process, idx) => (
                  <div key={idx} className="bg-[#151515] rounded-xl p-6 flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">{process.name}</h4>
                      <p className="text-sm text-gray-400 mb-1">Compatible: {process.tech}</p>
                      <p className="text-gray-300">{process.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Gallery */}
        <div className="my-12">
          <h2 className="text-3xl font-bold text-white mb-6">3D Printing Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop',
              'https://images.unsplash.com/photo-1612832021824-601a4dc8f9a7?w=600&h=400&fit=crop',
              'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=600&h=400&fit=crop'
            ].map((image, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden border border-[#301B3F]/30 hover:border-[#720455] transition-all duration-300 group">
                <img 
                  src={image}
                  alt={`3D printing example ${idx + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#301B3F] via-[#720455] to-[#910A67] rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to 3D Print Your Design?</h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Upload your files for instant analysis and pricing across multiple 3D printing technologies. Get your parts in days, not weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              // onClick={() => navigate('/instant-quote')}
              onClick={() => navigate('/contact')}
              className="bg-white text-[#720455] hover:bg-gray-100 px-8 py-6 rounded-full font-semibold text-lg"
            >
              Share CAD Files <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            {/* <Button
              onClick={() => navigate('/contact')}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-full font-semibold text-lg"
            >
              Material Selection Help
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDPrinting;
