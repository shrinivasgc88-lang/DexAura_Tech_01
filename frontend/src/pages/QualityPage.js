import React from 'react';
import Navbar from '../components/Navbar';
import { CheckCircle2, FileCheck, Shield, Award } from 'lucide-react';

const QualityPage = () => {
  const standards = [
    { icon: <Shield size={48} />, title: 'ISO 9001:2015', description: 'Comprehensive quality management systems' },
    { icon: <Award size={48} />, title: 'AS9100D', description: 'Aerospace industry quality requirements' },
    { icon: <FileCheck size={48} />, title: 'Material Certifications', description: 'Full material traceability and CoCs' },
    { icon: <CheckCircle2 size={48} />, title: 'First Article Inspection', description: 'Detailed FAI reports for every project' }
  ];

  const inspections = [
    'Dimensional Inspection',
    'Surface Finish Analysis',
    'Material Composition Testing',
    'Hardness Testing',
    'Tensile Strength Testing',
    'CMM Inspection',
    'X-Ray Inspection',
    'Non-Destructive Testing'
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#151515' }}>
      <Navbar />
      
      <section className="section" style={{ paddingTop: '120px' }} data-testid="quality-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 className="section-title" data-testid="quality-title">Quality & Compliance</h1>
          <p className="section-subtitle">
            We maintain the highest standards in manufacturing quality and regulatory compliance.
          </p>
          
          {/* Standards */}
          <div style={{ marginTop: '60px' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '30px' 
            }}>
              {standards.map((std, index) => (
                <div key={index} className="card" style={{ textAlign: 'center' }} data-testid={`standard-${index}`}>
                  <div style={{ color: '#910A67', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                    {std.icon}
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '12px' }}>{std.title}</h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>{std.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inspection Services */}
          <div style={{ marginTop: '80px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '30px', fontWeight: 600, textAlign: 'center' }}>
              Inspection Services
            </h2>
            <div style={{
              background: 'rgba(48, 27, 63, 0.3)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '40px'
            }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '20px' 
              }}>
                {inspections.map((inspection, index) => (
                  <div 
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '15px',
                      background: 'rgba(145, 10, 103, 0.1)',
                      borderRadius: '10px',
                      border: '1px solid rgba(145, 10, 103, 0.2)'
                    }}
                    data-testid={`inspection-${index}`}
                  >
                    <CheckCircle2 size={20} style={{ color: '#910A67', flexShrink: 0 }} />
                    <span style={{ fontSize: '14px' }}>{inspection}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compliance Statement */}
          <div style={{ marginTop: '80px', textAlign: 'center' }}>
            <div className="glass" style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '28px', marginBottom: '20px', fontWeight: 600 }}>Our Commitment</h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8, fontSize: '16px' }}>
                Every part manufactured through DexAura undergoes rigorous quality checks and comes with complete
                documentation including Certificates of Conformance, material certifications, and inspection reports.
                We're committed to delivering parts that meet or exceed your specifications, every single time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QualityPage;
