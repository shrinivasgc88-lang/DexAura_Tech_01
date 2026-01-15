import React from 'react';
import Navbar from '../components/Navbar';
import { Cpu, Printer, Layers, Package, Hammer } from 'lucide-react';

const CapabilitiesPage = () => {
  const capabilities = [
    {
      icon: <Cpu size={56} />,
      title: 'CNC Machining',
      description: 'Precision machining for complex parts with tight tolerances. 3-axis, 4-axis, and 5-axis capabilities.',
      materials: 'Aluminum, Steel, Stainless Steel, Titanium, Brass'
    },
    {
      icon: <Printer size={56} />,
      title: '3D Printing',
      description: 'Rapid prototyping and low-volume production using FDM, SLA, and SLS technologies.',
      materials: 'PLA, ABS, Nylon, TPU, Resin'
    },
    {
      icon: <Layers size={56} />,
      title: 'Sheet Metal Fabrication',
      description: 'Cutting, bending, and forming for enclosures, brackets, and custom sheet metal parts.',
      materials: 'Aluminum, Steel, Stainless Steel'
    },
    {
      icon: <Package size={56} />,
      title: 'Injection Molding',
      description: 'High-volume plastic part production with quick turnaround and precision tooling.',
      materials: 'ABS, PP, PC, PE, Nylon'
    },
    {
      icon: <Hammer size={56} />,
      title: 'Die Casting',
      description: 'Metal casting for durable, high-precision parts with excellent surface finish.',
      materials: 'Aluminum, Zinc, Magnesium'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#151515' }}>
      <Navbar />
      
      <section className="section" style={{ paddingTop: '120px' }} data-testid="capabilities-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 className="section-title" data-testid="capabilities-title">Manufacturing Capabilities</h1>
          <p className="section-subtitle">
            Comprehensive manufacturing services to bring your designs to life with speed and precision.
          </p>
          
          <div style={{ display: 'grid', gap: '30px', marginTop: '60px' }}>
            {capabilities.map((cap, index) => (
              <div 
                key={index} 
                className="card" 
                style={{ 
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr',
                  gap: '30px',
                  alignItems: 'start'
                }}
                data-testid={`capability-${index}`}
              >
                <div style={{ color: '#910A67' }}>
                  {cap.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '28px', marginBottom: '15px', fontWeight: 600 }}>{cap.title}</h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, marginBottom: '15px' }}>
                    {cap.description}
                  </p>
                  <div style={{ 
                    padding: '10px 20px',
                    background: 'rgba(145, 10, 103, 0.1)',
                    borderRadius: '10px',
                    border: '1px solid rgba(145, 10, 103, 0.3)'
                  }}>
                    <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
                      <strong>Materials:</strong> {cap.materials}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CapabilitiesPage;
