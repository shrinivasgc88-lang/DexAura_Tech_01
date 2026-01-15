import React from 'react';
import Navbar from '../components/Navbar';
import { Globe, Award, MapPin } from 'lucide-react';

const PartnerNetworkPage = () => {
  const certifications = [
    { name: 'ISO 9001:2015', description: 'Quality Management System' },
    { name: 'AS9100D', description: 'Aerospace Quality Standard' },
    { name: 'ISO 13485', description: 'Medical Devices Quality' },
    { name: 'IATF 16949', description: 'Automotive Quality' }
  ];

  const locations = [
    { city: 'Bengaluru', country: 'India', partners: 25 },
    { city: 'Shenzhen', country: 'China', partners: 40 },
    { city: 'Munich', country: 'Germany', partners: 15 },
    { city: 'Detroit', country: 'USA', partners: 20 },
    { city: 'Tokyo', country: 'Japan', partners: 18 }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#151515' }}>
      <Navbar />
      
      <section className="section" style={{ paddingTop: '120px' }} data-testid="partner-network-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 className="section-title" data-testid="partner-network-title">Global Partner Network</h1>
          <p className="section-subtitle">
            Access to 100+ certified manufacturing partners worldwide, ensuring quality and scalability.
          </p>
          
          {/* Certifications */}
          <div style={{ marginTop: '60px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '30px', fontWeight: 600 }}>Certifications</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '20px' 
            }}>
              {certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className="card" 
                  style={{ textAlign: 'center' }}
                  data-testid={`certification-${index}`}
                >
                  <Award size={40} style={{ color: '#910A67', margin: '0 auto 15px' }} />
                  <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>{cert.name}</h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>{cert.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Global Locations */}
          <div style={{ marginTop: '80px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '30px', fontWeight: 600 }}>Manufacturing Hubs</h2>
            <div style={{ 
              background: 'rgba(48, 27, 63, 0.3)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '40px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Globe size={200} style={{ 
                position: 'absolute',
                right: '-50px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(145, 10, 103, 0.1)'
              }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                {locations.map((loc, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      padding: '20px',
                      borderBottom: index < locations.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                    }}
                    data-testid={`location-${index}`}
                  >
                    <MapPin size={24} style={{ color: '#910A67' }} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 600 }}>{loc.city}, {loc.country}</h3>
                    </div>
                    <div style={{
                      background: 'rgba(145, 10, 103, 0.2)',
                      padding: '8px 20px',
                      borderRadius: '20px',
                      border: '1px solid rgba(145, 10, 103, 0.4)'
                    }}>
                      <span style={{ fontWeight: 600 }}>{loc.partners}</span> Partners
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: '80px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '20px', fontWeight: 600 }}>Join Our Network</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '30px', fontSize: '18px' }}>
              Become a certified manufacturing partner and expand your business globally.
            </p>
            <button className="btn-primary" data-testid="apply-partner-btn">Apply as Partner</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerNetworkPage;
