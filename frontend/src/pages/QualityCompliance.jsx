import React, { useState } from 'react';
import { CheckCircle, Award, Shield, FileCheck, Microscope, ClipboardCheck, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import inspection01 from '@/assects/Images/Inspection01.jpg';
import inspection02 from '@/assects/Images/Inspection02.jpg';
import inspection03 from '@/assects/Images/Inspection03-1.jpg';

const QualityCompliance = () => {
  const navigate = useNavigate();
  const [selectedCert, setSelectedCert] = useState(null);

  const certifications = [
    {
      name: 'ISO 9001:2015',
      icon: <Award className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop',
      description: 'International standard for quality management systems ensuring consistent quality, customer satisfaction, and continuous improvement across all operations.',
      scope: 'All manufacturing processes and quality management systems',
      benefits: [
        'Consistent quality across all suppliers',
        'Customer satisfaction focus',
        'Continuous improvement culture',
        'Risk-based thinking approach'
      ]
    },
    {
      name: 'ISO 13485:2016',
      icon: <Shield className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&h=500&fit=crop',
      description: 'Medical devices quality management system ensuring compliance with regulatory requirements for medical device manufacturing and distribution.',
      scope: 'Medical device components, assemblies, and finished devices',
      benefits: [
        'FDA and international regulatory compliance',
        'Risk management integration',
        'Traceability throughout product lifecycle',
        'Validated manufacturing processes'
      ]
    },
    {
      name: 'AS9100D',
      icon: <Target className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=500&fit=crop',
      description: 'Aerospace quality management system based on ISO 9001 with additional aerospace-specific requirements for safety and reliability.',
      scope: 'Aerospace components and critical flight-ready parts',
      benefits: [
        'Aerospace industry recognition',
        'Configuration management',
        'First Article Inspection compliance',
        'Counterfeit parts prevention'
      ]
    },
    {
      name: 'IATF 16949:2016',
      icon: <FileCheck className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop',
      description: 'Automotive quality management system focusing on defect prevention, reduction of variation, and waste in the supply chain.',
      scope: 'Automotive components and production parts',
      benefits: [
        'PPAP and APQP compliance',
        'Defect prevention focus',
        'Continuous improvement methodology',
        'Supplier development programs'
      ]
    }
  ];

  const inspectionServices = [
    {
      name: 'Standard Inspection',
      icon: <ClipboardCheck className="w-6 h-6" />,
      description: 'Visual and dimensional inspection of critical features per drawing specifications. Includes verification of key dimensions using calibrated measuring instruments.',
      deliverables: ['Visual inspection report', 'Critical dimension verification', 'Material certification'],
      suitableFor: 'General manufacturing, non-critical applications',
      leadTime: '1-2 days',
      cost: '$'
    },
    {
      name: 'Standard Inspection with Dimensional Report',
      icon: <FileCheck className="w-6 h-6" />,
      description: 'Comprehensive dimensional inspection with documented measurements for all specified dimensions. Includes statistical analysis and capability data.',
      deliverables: ['Complete dimensional report', 'Measurement uncertainty analysis', 'Process capability indices (Cp, Cpk)', 'Material certifications'],
      suitableFor: 'Production parts, quality-critical components',
      leadTime: '2-3 days',
      cost: '$$'
    },
    {
      name: 'CMM Inspection with Dimensional Report',
      icon: <Microscope className="w-6 h-6" />,
      description: 'Coordinate Measuring Machine (CMM) inspection providing high-accuracy 3D measurement of complex geometries. Includes full GD&T analysis and detailed documentation.',
      deliverables: ['CMM inspection report', '3D color map deviation analysis', 'GD&T verification', 'CAD comparison', 'Certification of calibration'],
      suitableFor: 'Precision parts, complex geometries, tight tolerances',
      accuracy: '±0.002mm (±0.0001")',
      leadTime: '3-5 days',
      cost: '$$$'
    },
    {
      name: 'First Article Inspection Report (per AS9102)',
      icon: <Shield className="w-6 h-6" />,
      description: 'Complete First Article Inspection following AS9102 requirements. Includes comprehensive documentation of all features, materials, and processes per aerospace standards.',
      deliverables: [
        'AS9102 Form 1 (Part Number Accountability)',
        'AS9102 Form 2 (Product Accountability)',
        'AS9102 Form 3 (Process Verification)',
        'Material certifications',
        'Process certifications',
        'Functional test results'
      ],
      suitableFor: 'Aerospace, defense, new product introduction',
      leadTime: '5-7 days',
      cost: '$$$$'
    },
    {
      name: 'Source Inspection',
      icon: <Target className="w-6 h-6" />,
      description: 'On-site inspection at the supplier facility before shipment. Customer or third-party inspector verifies parts meet all requirements prior to delivery.',
      scope: ['Dimensional verification', 'Visual inspection', 'Material verification', 'Functional testing', 'Packaging verification'],
      suitableFor: 'High-value parts, critical applications, risk mitigation',
      leadTime: 'Scheduled',
      cost: '$$$$'
    },
    {
      name: 'Additive Part Inspections',
      icon: <Microscope className="w-6 h-6" />,
      description: 'Specialized inspection protocols for 3D printed components including layer adhesion, surface finish, dimensional accuracy, and material properties verification.',
      tests: ['Dimensional inspection', 'Surface roughness measurement', 'Tensile testing (sample)', 'Build orientation verification', 'Density measurement'],
      suitableFor: 'All additive manufacturing technologies',
      leadTime: '3-5 days',
      cost: '$$$'
    },
    {
      name: 'Custom Inspection',
      icon: <Award className="w-6 h-6" />,
      description: 'Tailored inspection services based on customer specifications. Can include NDT (non-destructive testing), serialization, custom sampling plans, or customer-provided inspection procedures.',
      options: [
        'NDT: Penetrant testing, magnetic particle, ultrasonic',
        'Hardness testing: Rockwell, Brinell, Vickers',
        'Surface roughness measurement',
        'Leak testing (pressure, helium)',
        'Functional testing per customer specifications',
        'Serialization and traceability marking (laser, dot peen)'
      ],
      suitableFor: 'Special applications, regulatory requirements, customer-specific needs',
      leadTime: 'Variable',
      cost: 'Custom quote'
    }
  ];

  const qualityImages = [
    inspection01,
    inspection02,
    inspection03
  ];

  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#301B3F]/20 via-transparent to-[#720455]/10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Quality & Compliance
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              ISO 9001:2015 certified quality management with comprehensive inspection services. From standard inspection to aerospace-grade FAI documentation, we ensure every part meets your exact specifications.
            </p>
          </div>

          {/* Hero Image */}
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-[#301B3F]/30">
            <img 
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=600&fit=crop"
              alt="Quality inspection equipment"
              className="w-full h-[400px] object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Quality Stats */}
      <section className="py-12 bg-[#0d0d0d]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-[#910A67] mb-2">100%</p>
              <p className="text-gray-400 text-sm">Parts Inspected</p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-[#910A67] mb-2">±0.002"</p>
              <p className="text-gray-400 text-sm">CMM Accuracy</p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-[#910A67] mb-2">ISO 9001</p>
              <p className="text-gray-400 text-sm">Certified Network</p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-[#910A67] mb-2">24/7</p>
              <p className="text-gray-400 text-sm">Quality Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-[#151515]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Quality Certifications
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Our supplier network maintains the highest industry certifications ensuring compliance with international quality standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, idx) => (
              <div 
                key={idx}
                className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-2xl overflow-hidden hover:border-[#720455] transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedCert(cert)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515] to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="text-[#910A67]">{cert.icon}</div>
                    <h3 className="text-2xl font-bold text-white">{cert.name}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-300 mb-4 leading-relaxed">{cert.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-400 mb-2">Scope:</p>
                    <p className="text-gray-300 text-sm">{cert.scope}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-semibold text-gray-400 mb-2">Key Benefits:</p>
                    <ul className="space-y-1">
                      {cert.benefits.map((benefit, bidx) => (
                        <li key={bidx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#910A67] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Gallery */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Quality Control in Action
            </h2>
            <p className="text-gray-300 text-lg">
              State-of-the-art inspection equipment and rigorous quality processes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {qualityImages.map((image, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden border border-[#301B3F]/30 hover:border-[#720455] transition-all duration-300 group">
                <img 
                  src={image}
                  alt={`Quality control ${idx + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspection Services */}
      <section className="py-16 bg-[#151515]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Inspection Services
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Comprehensive inspection options from basic visual checks to aerospace-grade First Article Inspection with full CMM documentation.
            </p>
          </div>

          <div className="space-y-6">
            {inspectionServices.map((service, idx) => (
              <div key={idx} className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-2xl p-8 hover:border-[#720455] transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-[#910A67] mt-1">{service.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-bold text-white">{service.name}</h3>
                      <div className="flex items-center gap-4">
                        {service.leadTime && (
                          <span className="text-sm text-gray-400 bg-[#151515] px-3 py-1 rounded-full">
                            {service.leadTime}
                          </span>
                        )}
                        {service.cost && (
                          <span className="text-sm text-[#910A67] bg-[#301B3F]/30 px-3 py-1 rounded-full font-semibold">
                            {service.cost}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">{service.description}</p>
                    
                    {service.accuracy && (
                      <div className="mb-4 bg-[#151515] rounded-lg p-4">
                        <span className="text-sm font-semibold text-gray-400">Accuracy: </span>
                        <span className="text-white font-semibold">{service.accuracy}</span>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {service.deliverables && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400 mb-2">Deliverables:</p>
                          <ul className="space-y-1">
                            {service.deliverables.map((item, didx) => (
                              <li key={didx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-[#910A67] mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {service.scope && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400 mb-2">Scope:</p>
                          <ul className="space-y-1">
                            {service.scope.map((item, sidx) => (
                              <li key={sidx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-[#910A67] mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {service.tests && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400 mb-2">Testing:</p>
                          <ul className="space-y-1">
                            {service.tests.map((item, tidx) => (
                              <li key={tidx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-[#910A67] mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {service.options && (
                        <div>
                          <p className="text-sm font-semibold text-gray-400 mb-2">Options Available:</p>
                          <ul className="space-y-1">
                            {service.options.map((item, oidx) => (
                              <li key={oidx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-[#910A67] mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    {service.suitableFor && (
                      <div className="mt-4 pt-4 border-t border-[#301B3F]/30">
                        <span className="text-sm font-semibold text-gray-400">Best For: </span>
                        <span className="text-gray-300">{service.suitableFor}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-gradient-to-r from-[#301B3F] via-[#720455] to-[#910A67] rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Need Quality Documentation?
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Request inspection services with your quote or contact our quality team to discuss specific documentation requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Button
                onClick={() => navigate('/instant-quote')}
                className="bg-white text-[#720455] hover:bg-gray-100 px-8 py-6 rounded-full font-semibold text-lg"
              >
                Get Quote with Inspection <ArrowRight className="ml-2 w-5 h-5" />
              </Button> */}
              <Button
                onClick={() => navigate('/contact')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-full font-semibold text-lg"
              >
                Contact Quality Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QualityCompliance;
