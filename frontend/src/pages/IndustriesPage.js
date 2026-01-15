import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Plane, Car, Cpu, Heart, Zap, X } from 'lucide-react';

const IndustriesPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const industries = [
    {
      icon: <Plane size={64} />,
      title: 'Aerospace',
      description: 'High-precision components for aircraft, UAVs, and space applications.',
      details: 'AS9100D certified manufacturing for critical aerospace components. From prototype to production, we deliver parts that meet the strictest aerospace standards including material traceability, first article inspection, and comprehensive documentation.',
      applications: ['Aircraft components', 'Drone parts', 'Satellite hardware', 'Ground support equipment']
    },
    {
      icon: <Car size={64} />,
      title: 'Automotive',
      description: 'Custom parts and rapid prototyping for automotive innovation.',
      details: 'IATF 16949 certified processes ensuring automotive quality standards. We support both traditional automotive and electric vehicle manufacturing with rapid prototyping and production capabilities.',
      applications: ['Engine components', 'Interior parts', 'Prototype vehicles', 'Custom modifications']
    },
    {
      icon: <Cpu size={64} />,
      title: 'Robotics',
      description: 'Precision manufacturing for robotics and automation systems.',
      details: 'Specialized in complex geometries and lightweight structures essential for robotics. Fast turnaround times to keep your development cycle moving at the speed of innovation.',
      applications: ['Robot frames', 'Actuator housings', 'End effectors', 'Sensor mounts']
    },
    {
      icon: <Heart size={64} />,
      title: 'Medical Devices',
      description: 'ISO 13485 certified manufacturing for medical applications.',
      details: 'Clean room manufacturing capabilities and full compliance with medical device regulations. Biocompatible materials and complete documentation for regulatory submissions.',
      applications: ['Surgical instruments', 'Diagnostic equipment', 'Implantable devices', 'Lab equipment']
    },
    {
      icon: <Zap size={64} />,
      title: 'Consumer Electronics',
      description: 'High-volume production for consumer electronic products.',
      details: 'From concept to mass production, we support the entire product lifecycle. Rapid prototyping, design for manufacturing feedback, and scalable production capabilities.',
      applications: ['Device housings', 'Internal components', 'Wearable tech', 'Smart home devices']
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#151515' }}>
      <Navbar />
      
      <section className="section" style={{ paddingTop: '120px' }} data-testid="industries-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 className="section-title" data-testid="industries-title">Industries We Serve</h1>
          <p className="section-subtitle">
            Specialized manufacturing solutions across multiple high-tech industries.
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px',
            marginTop: '60px'
          }}>
            {industries.map((industry, index) => (
              <div
                key={index}
                className="card"
                style={{ cursor: 'pointer', textAlign: 'center' }}
                onClick={() => setSelectedIndustry(industry)}
                data-testid={`industry-${index}`}
              >
                <div style={{ color: '#910A67', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                  {industry.icon}
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '15px' }}>{industry.title}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                  {industry.description}
                </p>
                <button 
                  className="btn-secondary" 
                  style={{ marginTop: '20px' }}
                  data-testid={`learn-more-${index}`}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedIndustry && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }} data-testid="industry-modal">
          <div className="glass" style={{ padding: '50px', maxWidth: '700px', width: '100%', position: 'relative' }}>
            <button
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedIndustry(null)}
              data-testid="close-modal-btn"
            >
              <X size={24} />
            </button>

            <div style={{ color: '#910A67', marginBottom: '20px' }}>
              {selectedIndustry.icon}
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '20px' }}>
              {selectedIndustry.title}
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8, marginBottom: '30px', fontSize: '16px' }}>
              {selectedIndustry.details}
            </p>

            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '15px' }}>Applications</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
              {selectedIndustry.applications.map((app, index) => (
                <span
                  key={index}
                  style={{
                    background: 'rgba(145, 10, 103, 0.2)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    border: '1px solid rgba(145, 10, 103, 0.4)'
                  }}
                  data-testid={`application-${index}`}
                >
                  {app}
                </span>
              ))}
            </div>

            <button className="btn-primary" data-testid="get-quote-modal-btn">Get Quote for This Industry</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustriesPage;
