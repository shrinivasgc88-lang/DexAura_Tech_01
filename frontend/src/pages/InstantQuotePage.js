import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { Upload, Calculator, Download } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const InstantQuotePage = () => {
  const { isAuthenticated, token, login } = useAuth();
  const [showAuth, setShowAuth] = useState(!isAuthenticated);
  const [isLogin, setIsLogin] = useState(true);
  
  // Auth form
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '', company: '' });
  
  // Quote form
  const [file, setFile] = useState(null);
  const [quoteParams, setQuoteParams] = useState({
    material: 'aluminum',
    process: 'cnc_machining',
    quantity: 1,
    turnaround: 'standard'
  });
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const data = isLogin 
        ? { email: authForm.email, password: authForm.password }
        : authForm;
      
      const response = await axios.post(`${API}${endpoint}`, data);
      login(response.data.user, response.data.token);
      setShowAuth(false);
      toast.success(isLogin ? 'Logged in successfully!' : 'Account created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Authentication failed');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCalculateQuote = async () => {
    if (!file) {
      toast.error('Please upload a CAD file first');
      return;
    }

    setLoading(true);
    try {
      // Upload file
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadResponse = await axios.post(`${API}/quotes/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      // Calculate quote
      const quoteResponse = await axios.post(
        `${API}/quotes/calculate`,
        quoteParams,
        {
          params: {
            filename: uploadResponse.data.filename,
            filesize: uploadResponse.data.filesize
          },
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      setQuote(quoteResponse.data);
      toast.success('Quote calculated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to calculate quote');
    } finally {
      setLoading(false);
    }
  };

  if (showAuth && !isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', background: '#151515' }}>
        <Navbar />
        <section className="section" style={{ paddingTop: '120px' }} data-testid="auth-section">
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="glass" style={{ padding: '40px' }}>
              <h2 style={{ fontSize: '32px', marginBottom: '10px', fontWeight: 600, textAlign: 'center' }}>
                {isLogin ? 'Sign In' : 'Create Account'}
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', marginBottom: '30px' }}>
                {isLogin ? 'Sign in to get instant quotes' : 'Sign up to access instant pricing'}
              </p>
              
              <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {!isLogin && (
                  <>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={authForm.name}
                      onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                      required={!isLogin}
                      data-testid="auth-name-input"
                    />
                    <input
                      type="text"
                      placeholder="Company (Optional)"
                      value={authForm.company}
                      onChange={(e) => setAuthForm({ ...authForm, company: e.target.value })}
                      data-testid="auth-company-input"
                    />
                  </>
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  required
                  data-testid="auth-email-input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  required
                  data-testid="auth-password-input"
                />
                <button type="submit" className="btn-primary" data-testid="auth-submit-btn">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>
              
              <p style={{ textAlign: 'center', marginTop: '20px', color: 'rgba(255, 255, 255, 0.6)' }}>
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <span 
                  style={{ color: '#910A67', cursor: 'pointer', fontWeight: 600 }}
                  onClick={() => setIsLogin(!isLogin)}
                  data-testid="auth-toggle-btn"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#151515' }}>
      <Navbar />
      
      <section className="section" style={{ paddingTop: '120px' }} data-testid="quote-section">
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 className="section-title" data-testid="quote-title">Instant Quote Engine</h1>
          <p className="section-subtitle">
            Upload your CAD file and get instant pricing, lead times, and manufacturability insights.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '50px' }}>
            {/* Upload Section */}
            <div className="card" data-testid="upload-section">
              <h3 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 600 }}>Upload CAD File</h3>
              <div style={{
                border: '2px dashed rgba(145, 10, 103, 0.5)',
                borderRadius: '15px',
                padding: '40px',
                textAlign: 'center',
                background: 'rgba(145, 10, 103, 0.05)',
                marginBottom: '20px'
              }}>
                <Upload size={48} style={{ color: '#910A67', margin: '0 auto 15px' }} />
                <input
                  type="file"
                  accept=".step,.stp,.stl,.obj,.iges,.igs"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="cad-file-input"
                />
                <label htmlFor="cad-file-input" style={{ cursor: 'pointer' }}>
                  <div className="btn-secondary" style={{ display: 'inline-block' }} data-testid="upload-file-btn">
                    Choose File
                  </div>
                </label>
                {file && (
                  <p style={{ marginTop: '15px', color: 'rgba(255, 255, 255, 0.8)' }} data-testid="file-name">
                    {file.name}
                  </p>
                )}
              </div>
              
              <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
                Supported formats: STEP, STL, OBJ, IGES
              </p>
            </div>

            {/* Parameters Section */}
            <div className="card" data-testid="parameters-section">
              <h3 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 600 }}>Quote Parameters</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    Material
                  </label>
                  <select
                    value={quoteParams.material}
                    onChange={(e) => setQuoteParams({ ...quoteParams, material: e.target.value })}
                    style={{ width: '100%' }}
                    data-testid="material-select"
                  >
                    <option value="aluminum">Aluminum</option>
                    <option value="steel">Steel</option>
                    <option value="stainless_steel">Stainless Steel</option>
                    <option value="plastic_abs">Plastic (ABS)</option>
                    <option value="plastic_pla">Plastic (PLA)</option>
                    <option value="titanium">Titanium</option>
                    <option value="brass">Brass</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    Manufacturing Process
                  </label>
                  <select
                    value={quoteParams.process}
                    onChange={(e) => setQuoteParams({ ...quoteParams, process: e.target.value })}
                    style={{ width: '100%' }}
                    data-testid="process-select"
                  >
                    <option value="cnc_machining">CNC Machining</option>
                    <option value="3d_printing">3D Printing</option>
                    <option value="sheet_metal">Sheet Metal Fabrication</option>
                    <option value="injection_molding">Injection Molding</option>
                    <option value="die_casting">Die Casting</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quoteParams.quantity}
                    onChange={(e) => setQuoteParams({ ...quoteParams, quantity: parseInt(e.target.value) })}
                    style={{ width: '100%' }}
                    data-testid="quantity-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    Turnaround Time
                  </label>
                  <select
                    value={quoteParams.turnaround}
                    onChange={(e) => setQuoteParams({ ...quoteParams, turnaround: e.target.value })}
                    style={{ width: '100%' }}
                    data-testid="turnaround-select"
                  >
                    <option value="standard">Standard (10 days)</option>
                    <option value="expedited">Expedited (5 days)</option>
                    <option value="rush">Rush (2 days)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <button 
              className="btn-primary" 
              onClick={handleCalculateQuote}
              disabled={loading}
              style={{ minWidth: '250px' }}
              data-testid="calculate-quote-btn"
            >
              <Calculator size={20} style={{ display: 'inline', marginRight: '10px' }} />
              {loading ? 'Calculating...' : 'Calculate Quote'}
            </button>
          </div>

          {/* Quote Result */}
          {quote && (
            <div className="card" style={{ marginTop: '50px' }} data-testid="quote-result">
              <h3 style={{ fontSize: '28px', marginBottom: '30px', fontWeight: 600, textAlign: 'center' }}>
                Your Quote
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>Total Price</p>
                  <p style={{ fontSize: '36px', fontWeight: 700, color: '#910A67' }} data-testid="quote-price">
                    ${quote.price.toLocaleString()}
                  </p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>Lead Time</p>
                  <p style={{ fontSize: '36px', fontWeight: 700 }} data-testid="quote-lead-time">
                    {quote.lead_time_days} days
                  </p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>Quantity</p>
                  <p style={{ fontSize: '36px', fontWeight: 700 }} data-testid="quote-quantity">
                    {quote.quantity}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <button className="btn-primary" data-testid="download-quote-btn">
                  <Download size={20} style={{ display: 'inline', marginRight: '10px' }} />
                  Download Quote PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default InstantQuotePage;
