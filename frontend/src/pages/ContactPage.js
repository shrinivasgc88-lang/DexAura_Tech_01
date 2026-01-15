import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Mail, Phone, MapPin, Send, Bot, User as UserIcon } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [chatMessages, setChatMessages] = useState([{
    role: 'bot',
    text: 'Hello! I\'m the DexAura manufacturing assistant. How can I help you today?'
  }]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages([...chatMessages, { role: 'user', text: userMessage }]);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await axios.post(`${API}/chatbot/message`, {
        message: userMessage
      });
      setChatMessages(prev => [...prev, { role: 'bot', text: response.data.response }]);
    } catch (error) {
      toast.error('Chatbot error. Please try again.');
      setChatMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'Sorry, I\'m having trouble connecting. Please try again or contact us directly.' 
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#151515' }}>
      <Navbar />
      
      <section className="section" style={{ paddingTop: '120px' }} data-testid="contact-section">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 className="section-title" data-testid="contact-title">Contact Us</h1>
          <p className="section-subtitle">
            Get in touch with our team or chat with our AI assistant for instant help.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '60px' }}>
            {/* Contact Form */}
            <div>
              <div className="card" data-testid="contact-form">
                <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '30px' }}>Send us a Message</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    data-testid="contact-name-input"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    data-testid="contact-email-input"
                  />
                  <input
                    type="text"
                    placeholder="Company (Optional)"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    data-testid="contact-company-input"
                  />
                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows="6"
                    required
                    data-testid="contact-message-input"
                  />
                  <button type="submit" className="btn-primary" data-testid="contact-submit-btn">
                    <Send size={18} style={{ display: 'inline', marginRight: '8px' }} />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="card" style={{ marginTop: '30px' }} data-testid="contact-info">
                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Contact Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Mail size={20} style={{ color: '#910A67' }} />
                    <span>contact@dexaura.in</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Phone size={20} style={{ color: '#910A67' }} />
                    <span>+91 80 1234 5678</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <MapPin size={20} style={{ color: '#910A67' }} />
                    <span>Bengaluru, Karnataka, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Chatbot */}
            <div>
              <div className="card" style={{ height: '600px', display: 'flex', flexDirection: 'column' }} data-testid="chatbot">
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <Bot size={28} style={{ color: '#910A67' }} />
                  <h2 style={{ fontSize: '24px', fontWeight: 600 }}>AI Assistant</h2>
                </div>

                <div 
                  style={{ 
                    flex: 1, 
                    overflowY: 'auto', 
                    padding: '20px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                  }}
                  data-testid="chat-messages"
                >
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'flex-start',
                        flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
                      }}
                      data-testid={`chat-message-${index}`}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: msg.role === 'bot' ? 'rgba(145, 10, 103, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {msg.role === 'bot' ? <Bot size={18} style={{ color: '#910A67' }} /> : <UserIcon size={18} />}
                      </div>
                      <div style={{
                        background: msg.role === 'bot' ? 'rgba(145, 10, 103, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        maxWidth: '80%',
                        border: `1px solid ${msg.role === 'bot' ? 'rgba(145, 10, 103, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                        lineHeight: 1.6
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(145, 10, 103, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Bot size={18} style={{ color: '#910A67' }} />
                      </div>
                      <div style={{
                        background: 'rgba(145, 10, 103, 0.1)',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(145, 10, 103, 0.3)'
                      }}>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <div className="floating" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#910A67' }} />
                          <div className="floating" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#910A67', animationDelay: '0.2s' }} />
                          <div className="floating" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#910A67', animationDelay: '0.4s' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <form 
                  onSubmit={handleChatSubmit}
                  style={{ 
                    display: 'flex', 
                    gap: '10px',
                    paddingTop: '20px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <input
                    type="text"
                    placeholder="Ask me anything about manufacturing..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    style={{ flex: 1 }}
                    disabled={chatLoading}
                    data-testid="chat-input"
                  />
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={chatLoading}
                    data-testid="chat-send-btn"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="card" style={{ marginTop: '60px' }} data-testid="map-section">
            <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '30px', textAlign: 'center' }}>Our Location</h2>
            <div style={{
              width: '100%',
              height: '400px',
              background: 'rgba(48, 27, 63, 0.3)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <MapPin size={64} style={{ color: '#910A67', margin: '0 auto 20px' }} />
                <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '10px' }}>DexAura Manufacturing</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Bengaluru, Karnataka, India</p>
                <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px', marginTop: '10px' }}>
                  Interactive map integration available
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
