import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Zap, Gauge, Shield, Users } from 'lucide-react';
import Footer from '../components/Footer';


const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#151515' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="section" 
        style={{
          paddingTop: '150px',
          paddingBottom: '100px',
          position: 'relative',
          overflow: 'hidden'
        }}
        data-testid="hero-section"
      >
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(145, 10, 103, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 0
        }} />
        
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto' }}>
          <h1 
            className="fade-in-up" 
            style={{
              fontSize: '72px',
              fontWeight: 700,
              marginBottom: '30px',
              lineHeight: 1.2
            }}
            data-testid="hero-title"
          >
            Scale smarter. Manufacture faster.
            <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #720455, #910A67)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              With DexAura.
            </span>
          </h1>
          
          <p 
            className="fade-in-up" 
            style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '40px',
              maxWidth: '700px',
              margin: '0 auto 40px',
              lineHeight: 1.6
            }}
            data-testid="hero-subtitle"
          >
            AI-driven on-demand manufacturing platform for rapid prototyping,
            digital manufacturing, and scalable production solutions.
          </p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn-primary" 
              onClick={() => navigate('/quote')}
              data-testid="get-instant-quote-btn"
            >
              Get Instant Quote
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => navigate('/capabilities')}
              data-testid="explore-capabilities-btn"
            >
              Explore Capabilities
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: 'rgba(48, 27, 63, 0.1)' }} data-testid="features-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Why Choose DexAura?</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px' }}>
            Advanced manufacturing solutions powered by AI and backed by global quality standards.
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '30px' 
          }}>
            <div className="card" data-testid="feature-instant-pricing">
              <Zap size={48} style={{ color: '#910A67', marginBottom: '20px' }} />
              <h3 style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 600 }}>Instant Pricing</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                Upload your CAD file and get immediate pricing, lead times, and manufacturability insights.
              </p>
            </div>
            
            <div className="card" data-testid="feature-fast-turnaround">
              <Gauge size={48} style={{ color: '#910A67', marginBottom: '20px' }} />
              <h3 style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 600 }}>Fast Turnaround</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                From standard 10-day delivery to rush 2-day options for your critical projects.
              </p>
            </div>
            
            <div className="card" data-testid="feature-quality-certified">
              <Shield size={48} style={{ color: '#910A67', marginBottom: '20px' }} />
              <h3 style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 600 }}>Quality Certified</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                ISO 9001 and AS9100D certified partners ensuring the highest quality standards.
              </p>
            </div>
            
            <div className="card" data-testid="feature-global-network">
              <Users size={48} style={{ color: '#910A67', marginBottom: '20px' }} />
              <h3 style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 600 }}>Global Network</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                Access to certified suppliers worldwide for seamless manufacturing at scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="section" data-testid="quick-links-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title">Get Started in Minutes</h2>
          <p className="section-subtitle">
            From design to delivery, we've streamlined the entire manufacturing process.
          </p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
            <button className="btn-primary" onClick={() => navigate('/quote')} data-testid="upload-cad-btn">
              Upload CAD File
            </button>
            <button className="btn-secondary" onClick={() => navigate('/contact')} data-testid="talk-to-expert-btn">
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>

      {/* Download Project Section */}
      <section className="section" style={{ background: 'rgba(48, 27, 63, 0.1)' }} data-testid="download-section">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title">Download Project Files</h2>
          <p className="section-subtitle">
            Get the complete DexAura platform source code including frontend and backend.
          </p>
          <a 
            href={`${process.env.REACT_APP_BACKEND_URL}/api/download/project`}
            download
            style={{ textDecoration: 'none' }}
          >
            <button className="btn-primary" data-testid="download-project-btn">
              Download Project ZIP
            </button>
          </a>
        </div>
      </section>

      {/* Footer */}
      {/* <footer style={{
        background: 'rgba(21, 21, 21, 0.8)',
        padding: '40px 50px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px' }}>
          © 2024 DexAura Manufacturing. All rights reserved. | Bengaluru, India
        </p>
      </footer> */}
      <Footer />
    
    </div>
  );
};

export default HomePage;
