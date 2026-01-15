import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, ArrowRight, Flame, Droplet, Hammer, Sparkles, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SpecialProcess = () => {
  const navigate = useNavigate();

  const heatTreatments = [
    {
      name: 'Annealing',
      purpose: 'Soften material, relieve internal stresses, improve machinability',
      temperature: '550-900°C depending on alloy',
      materials: 'Steel, aluminum, copper, brass',
      applications: 'Pre-machining preparation, stress relief after welding, improve ductility',
      process: 'Heat to transformation temperature, hold, slow cool in furnace'
    },
    {
      name: 'Hardening & Quenching',
      purpose: 'Increase hardness and wear resistance',
      temperature: '800-950°C for steel',
      materials: 'Tool steel, carbon steel, alloy steel',
      applications: 'Cutting tools, dies, wear-resistant components, gears',
      process: 'Heat above critical temperature, rapid quench in oil/water/polymer',
      hardness: '55-65 HRC achievable'
    },
    {
      name: 'Tempering',
      purpose: 'Reduce brittleness while maintaining hardness',
      temperature: '150-650°C',
      materials: 'Previously hardened steels',
      applications: 'Spring steels, tools, structural components',
      process: 'Reheat hardened part to specific temperature, hold, air cool',
      hardness: 'Controlled reduction from 65 HRC to desired level'
    },
    {
      name: 'Carburizing (Case Hardening)',
      purpose: 'Create hard wear-resistant surface on tough core',
      temperature: '900-950°C',
      materials: 'Low carbon steel',
      applications: 'Gears, shafts, pins requiring surface hardness with tough core',
      process: 'Diffuse carbon into surface in carbon-rich atmosphere, quench',
      depth: '0.5-2mm case depth typical'
    },
    {
      name: 'Nitriding',
      purpose: 'Surface hardening without distortion',
      temperature: '500-580°C (below transformation)',
      materials: 'Nitriding steels, stainless steel, titanium',
      applications: 'Precision parts where distortion must be minimal, corrosion resistance',
      process: 'Introduce nitrogen into surface via gas or plasma',
      hardness: 'Up to 70 HRC surface hardness'
    },
    {
      name: 'Stress Relieving',
      purpose: 'Remove residual stresses from machining/welding',
      temperature: '550-650°C',
      materials: 'All steels, aluminum alloys',
      applications: 'Precision parts, welded assemblies, prevent warping',
      process: 'Heat below transformation temperature, hold, slow cool'
    }
  ];

  const coatings = [
    {
      name: 'Anodizing (Type II)',
      material: 'Aluminum alloys',
      thickness: '5-25 microns',
      colors: 'Clear, black, red, blue, green, purple, yellow, custom colors',
      properties: 'Corrosion resistance, wear resistance, electrical insulation, decorative',
      applications: 'Consumer electronics, aerospace components, architectural',
      standards: 'MIL-A-8625 Type II',
      leadTime: '3-5 days'
    },
    {
      name: 'Hard Anodizing (Type III)',
      material: 'Aluminum alloys',
      thickness: '25-50 microns',
      colors: 'Natural gray/black',
      properties: 'Extreme hardness (65+ HRC), wear resistance, corrosion protection',
      applications: 'Hydraulic cylinders, pistons, wear surfaces, high-cycle parts',
      standards: 'MIL-A-8625 Type III',
      leadTime: '5-7 days'
    },
    {
      name: 'Powder Coating',
      material: 'Steel, aluminum, stainless steel',
      thickness: '50-100 microns',
      colors: 'Full RAL/Pantone range, custom matching',
      properties: 'Durable finish, UV resistant, chemical resistant, decorative',
      applications: 'Outdoor equipment, appliances, automotive parts, furniture',
      finish: 'Matte, semi-gloss, high-gloss, textured',
      leadTime: '3-5 days'
    },
    {
      name: 'Electroplating - Zinc',
      material: 'Steel, cast iron',
      thickness: '5-25 microns',
      finish: 'Clear, yellow chromate, black chromate',
      properties: 'Corrosion resistance, sacrificial protection',
      applications: 'Fasteners, brackets, automotive hardware',
      standards: 'ASTM B633',
      leadTime: '3-5 days'
    },
    {
      name: 'Electroplating - Nickel',
      material: 'Steel, aluminum, copper',
      thickness: '5-25 microns',
      finish: 'Bright nickel, satin nickel, black nickel',
      properties: 'Corrosion resistance, wear resistance, decorative',
      applications: 'Decorative trim, electronics, hydraulic components',
      standards: 'ASTM B689',
      leadTime: '5-7 days'
    },
    {
      name: 'Electropolishing',
      material: 'Stainless Steel',
      thickness: 'Eching',
      process: 'Sulphuric acid treatment,Phosphoric acid treatment',
      applications: 'Medical devices, food processing, pharmaceuticals',
      Properties: 'Enhanced asthetic,polished surface, corrosion resistance',
      standards: 'ASTM B689',
      leadTime: '5-7 days'
    },
    {
      name: 'Chromate Conversion (Chem Film)',
      material: 'Aluminum, magnesium, zinc',
      thickness: '0.5-2 microns (no dimensional change)',
      colors: 'Clear, gold, olive',
      properties: 'Corrosion resistance, paint adhesion, electrical conductivity',
      applications: 'Electronics housings, aerospace, pre-paint treatment',
      standards: 'MIL-DTL-5541',
      leadTime: '2-3 days'
    },
    {
      name: 'Passivation',
      material: 'Stainless steel',
      thickness: 'Molecular (no dimensional change)',
      process: 'Citric or nitric acid treatment',
      properties: 'Enhanced corrosion resistance, clean surface, remove free iron',
      applications: 'Medical devices, food processing, pharmaceuticals',
      standards: 'ASTM A967, AMS 2700',
      leadTime: '2-3 days'
    }
    // ,
    // {
    //   name: 'PVD Coating',
    //   material: 'Metals, ceramics',
    //   thickness: '1-5 microns',
    //   types: 'TiN (gold), TiCN (blue-gray), CrN (silver)',
    //   properties: 'Extreme hardness, low friction, decorative',
    //   applications: 'Cutting tools, medical instruments, decorative hardware',
    //   hardness: '2000-3000 HV',
    //   leadTime: '7-10 days'
    // }
  ];

  const dieServices = [
    {
      type: 'Progressive Dies',
      description: 'Multi-station dies performing multiple operations in sequence as strip advances',
      applications: 'High-volume production, complex flat parts, automotive stampings',
      volumes: '50,000+ parts',
      leadTime: '8-12 weeks'
    },
    {
      type: 'Compound Dies',
      description: 'Single-station dies performing multiple operations in one press stroke',
      applications: 'Medium volumes, precise parts, washers, gaskets',
      volumes: '10,000-100,000 parts',
      leadTime: '6-10 weeks'
    },
    {
      type: 'Transfer Dies',
      description: 'Part transfers between stations for deep drawing and forming',
      applications: 'Deep drawn parts, multi-stage forming, automotive parts',
      volumes: '25,000+ parts',
      leadTime: '10-14 weeks'
    },
    {
      type: 'Blanking Dies',
      description: 'Cut flat shapes from sheet metal',
      applications: 'Prototyping, low-volume production, simple shapes',
      volumes: '100-10,000 parts',
      leadTime: '4-6 weeks'
    }
  ];

  const otherProcesses = [
    {
      name: 'Welding Services',
      icon: <Flame className="w-6 h-6" />,
      types: 'TIG, MIG, Stick, Spot welding',
      materials: 'Steel, stainless steel, aluminum',
      certifications: 'AWS D1.1, ISO 9606 certified welders',
      applications: 'Fabrications, assemblies, repairs, structural'
    },
    {
      name: 'EDM (Electrical Discharge Machining)',
      icon: <Sparkles className="w-6 h-6" />,
      types: 'Wire EDM, Sinker EDM',
      materials: 'All conductive materials including hardened steel',
      accuracy: '±0.005mm',
      applications: 'Complex shapes, hardened tool steel, micro features'
    },
    {
      name: 'Grinding Services',
      icon: <Shield className="w-6 h-6" />,
      types: 'Surface grinding, cylindrical grinding, centerless grinding',
      finish: 'Ra 0.4-0.8 μm achievable',
      tolerance: '±0.005mm or tighter',
      applications: 'Precision flat surfaces, bearing surfaces, gauge blocks'
    },
    {
      name: 'Lapping & Polishing',
      icon: <Droplet className="w-6 h-6" />,
      finish: 'Ra 0.1 μm or better (mirror finish)',
      flatness: '1-2 μm per 25mm',
      materials: 'Metals, ceramics, glass',
      applications: 'Optical surfaces, sealing surfaces, gauge blocks'
    }
  ];

  return (
    <div className="min-h-screen bg-[#151515] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Special Process Services
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-4xl">
            Comprehensive secondary operations and specialty processes to enhance your parts. From heat treatment and surface coatings to die manufacturing and precision finishing, we provide the critical processes that transform machined parts into finished, production-ready components.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-[#301B3F]/30">
          <img 
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=500&fit=crop"
            alt="Special manufacturing processes"
            className="w-full h-[400px] object-cover"
            loading="eager"
          />
        </div>

        {/* Key Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            'Heat treatment up to 65 HRC',
            '20+ coating and plating options',
            'Custom die design & manufacturing',
            'Full traceability & certifications'
          ].map((cap, idx) => (
            <div key={idx} className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-6 text-center">
              <CheckCircle className="w-8 h-8 text-[#910A67] mx-auto mb-3" />
              <p className="text-gray-300 font-medium">{cap}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="heat" className="space-y-8">
          <TabsList className="bg-[#1a1a1a] p-1.5 rounded-xl flex-wrap h-auto">
            <TabsTrigger value="heat" className="text-sm sm:text-base">Heat Treatment</TabsTrigger>
            <TabsTrigger value="coating" className="text-sm sm:text-base">Surface Coatings</TabsTrigger>
            <TabsTrigger value="die" className="text-sm sm:text-base">Die Manufacturing</TabsTrigger>
            <TabsTrigger value="other" className="text-sm sm:text-base">Other Processes</TabsTrigger>
          </TabsList>

          {/* Heat Treatment Tab */}
          <TabsContent value="heat" className="space-y-6">
            <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Flame className="w-10 h-10 text-[#910A67]" />
                <h2 className="text-3xl font-bold text-white">Heat Treatment Services</h2>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed">
                Modify material properties through controlled heating and cooling cycles. Our heat treatment services enhance hardness, strength, wear resistance, and machinability for optimal part performance.
              </p>

              <div className="space-y-6">
                {heatTreatments.map((treatment, idx) => (
                  <div key={idx} className="bg-[#151515] rounded-xl p-6 border border-[#301B3F]/20">
                    <h3 className="text-2xl font-bold text-white mb-4">{treatment.name}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-400 mb-1">Purpose</p>
                        <p className="text-gray-300">{treatment.purpose}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-400 mb-1">Temperature Range</p>
                        <p className="text-white font-medium">{treatment.temperature}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-400 mb-1">Suitable Materials</p>
                        <p className="text-gray-300">{treatment.materials}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-400 mb-1">Applications</p>
                        <p className="text-gray-300">{treatment.applications}</p>
                      </div>
                    </div>
                    
                    <div className="bg-[#1a1a1a] rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-400 mb-1">Process</p>
                      <p className="text-gray-300">{treatment.process}</p>
                      {treatment.hardness && (
                        <p className="text-[#910A67] font-semibold mt-2">Hardness: {treatment.hardness}</p>
                      )}
                      {treatment.depth && (
                        <p className="text-[#910A67] font-semibold mt-2">Case Depth: {treatment.depth}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Coatings Tab */}
          <TabsContent value="coating" className="space-y-6">
            <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Droplet className="w-10 h-10 text-[#910A67]" />
                <h2 className="text-3xl font-bold text-white">Surface Coating & Plating</h2>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed">
                Enhance corrosion resistance, wear properties, and aesthetics with our comprehensive coating and plating services. All processes performed to industry standards with full documentation.
              </p>

              <div className="space-y-6">
                {coatings.map((coating, idx) => (
                  <div key={idx} className="bg-[#151515] rounded-xl p-6 border border-[#301B3F]/20">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">{coating.name}</h3>
                      {coating.leadTime && (
                        <span className="text-sm text-gray-400 bg-[#1a1a1a] px-3 py-1 rounded-full">
                          {coating.leadTime}
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-400 mb-1">Material</p>
                        <p className="text-white font-medium">{coating.material}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-400 mb-1">Thickness</p>
                        <p className="text-white font-medium">{coating.thickness}</p>
                      </div>
                      {coating.colors && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400 mb-1">Colors Available</p>
                          <p className="text-white font-medium">{coating.colors}</p>
                        </div>
                      )}
                      {coating.finish && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400 mb-1">Finish Options</p>
                          <p className="text-white font-medium">{coating.finish}</p>
                        </div>
                      )}
                      {coating.types && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400 mb-1">Types</p>
                          <p className="text-white font-medium">{coating.types}</p>
                        </div>
                      )}
                      {coating.process && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400 mb-1">Process</p>
                          <p className="text-white font-medium">{coating.process}</p>
                        </div>
                      )}
                      {coating.hardness && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400 mb-1">Hardness</p>
                          <p className="text-white font-medium">{coating.hardness}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-400 mb-1">Properties</p>
                        <p className="text-gray-300">{coating.properties}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-400 mb-1">Applications</p>
                        <p className="text-gray-300">{coating.applications}</p>
                      </div>
                      {coating.standards && (
                        <div className="mt-3 bg-[#1a1a1a] rounded-lg p-3">
                          <p className="text-sm font-semibold text-[#910A67]">Standards: {coating.standards}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Die Manufacturing Tab */}
          <TabsContent value="die" className="space-y-6">
            <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Hammer className="w-10 h-10 text-[#910A67]" />
                <h2 className="text-3xl font-bold text-white">Die Design & Manufacturing</h2>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed">
                Custom die design and manufacturing for metal stamping and forming operations. From simple blanking dies to complex progressive tooling, we deliver precision dies that ensure consistent, high-quality stamped parts.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dieServices.map((die, idx) => (
                  <div key={idx} className="bg-[#151515] rounded-xl p-6 border border-[#301B3F]/20">
                    <h3 className="text-xl font-bold text-white mb-4">{die.type}</h3>
                    <p className="text-gray-300 mb-4">{die.description}</p>
                    
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-400">Best For</p>
                        <p className="text-white">{die.applications}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-400">Production Volumes</p>
                        <p className="text-white">{die.volumes}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-400">Lead Time</p>
                        <p className="text-[#910A67] font-semibold">{die.leadTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-[#151515] rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Die Services Include</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'CAD design and DFM analysis',
                    'Die simulation and optimization',
                    'Precision die machining',
                    'Heat treatment and hardening',
                    'Die tryout and validation',
                    'Production pilot runs',
                    'Die maintenance and repair',
                    'Modifications and updates'
                  ].map((service, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#910A67] mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Other Processes Tab */}
          <TabsContent value="other" className="space-y-6">
            <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Additional Special Processes</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherProcesses.map((process, idx) => (
                  <div key={idx} className="bg-[#151515] rounded-xl p-6 border border-[#301B3F]/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-[#910A67]">{process.icon}</div>
                      <h3 className="text-xl font-bold text-white">{process.name}</h3>
                    </div>
                    
                    <div className="space-y-2">
                      {process.types && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400">Types</p>
                          <p className="text-gray-300">{process.types}</p>
                        </div>
                      )}
                      {process.materials && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400">Materials</p>
                          <p className="text-gray-300">{process.materials}</p>
                        </div>
                      )}
                      {process.certifications && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400">Certifications</p>
                          <p className="text-white font-medium">{process.certifications}</p>
                        </div>
                      )}
                      {process.accuracy && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400">Accuracy</p>
                          <p className="text-white font-medium">{process.accuracy}</p>
                        </div>
                      )}
                      {process.tolerance && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400">Tolerance</p>
                          <p className="text-white font-medium">{process.tolerance}</p>
                        </div>
                      )}
                      {process.finish && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400">Surface Finish</p>
                          <p className="text-white font-medium">{process.finish}</p>
                        </div>
                      )}
                      {process.flatness && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400">Flatness</p>
                          <p className="text-white font-medium">{process.flatness}</p>
                        </div>
                      )}
                      {process.applications && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400">Applications</p>
                          <p className="text-gray-300">{process.applications}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Gallery */}
        <div className="my-12">
          <h2 className="text-3xl font-bold text-white mb-6">Process Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop',
              'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
              'https://images.unsplash.com/photo-1565114925726-28c3e671fa5f?w=600&h=400&fit=crop'
            ].map((image, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden border border-[#301B3F]/30 hover:border-[#720455] transition-all duration-300 group">
                <img 
                  src={image}
                  alt={`Special process example ${idx + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#301B3F] via-[#720455] to-[#910A67] rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Need Special Processing?</h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Contact our engineering team to discuss your heat treatment, coating, or specialty process requirements. We'll recommend the optimal solution for your application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/contact')}
              className="bg-white text-[#720455] hover:bg-gray-100 px-8 py-6 rounded-full font-semibold text-lg"
            >
              Contact Engineering <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            {/* <Button
              onClick={() => navigate('/instant-quote')}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-full font-semibold text-lg"
            >
              Get Quote with Processing
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProcess;
