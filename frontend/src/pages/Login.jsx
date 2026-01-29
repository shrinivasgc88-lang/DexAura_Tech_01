import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate inputs first
    if (!loginData.email || !loginData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    if (!loginData.password || loginData.password.length === 0) {
      toast.error('Please enter your password');
      setLoading(false);
      return;
    }
    
    console.log(`[LOGIN] ========================================`);
    console.log(`[LOGIN] LOGIN FORM SUBMITTED`);
    console.log(`[LOGIN] Email: ${loginData.email}`);
    console.log(`[LOGIN] Password: [PROVIDED]`);
    console.log(`[LOGIN] ========================================`);
    
    try {
      console.log('[LOGIN] Calling auth.login()...');
      const result = await login(loginData.email, loginData.password);
      console.log('[LOGIN] ✓ Login succeeded');
      console.log('[LOGIN] Result:', result);
      console.log('[LOGIN] User role:', result?.role);
      toast.success('Login successful!');
      
      // Redirect based on user role
      const redirectUrl = result?.role === 'ADMIN' ? '/admin' : '/teamspace';
      console.log(`[LOGIN] Navigating to ${redirectUrl} (role: ${result?.role})`);
      navigate(redirectUrl);
    } catch (error) {
      console.error('[LOGIN] ✗ Login failed');
      console.error('[LOGIN] Error:', error.message);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password. Please check your credentials.';
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.message?.includes('timeout')) {
        errorMessage = 'Login request timed out. Is the server running?';
      } else if (error.message?.includes('ECONNREFUSED') || error.message?.includes('Network')) {
        errorMessage = 'Cannot connect to server. Please make sure the backend is running.';
      }
      
      console.error('[LOGIN] Showing error:', errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      console.log('[LOGIN] ========================================');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Frontend validation
    if (!registerData.name || registerData.name.trim().length === 0) {
      toast.error('Please enter your full name');
      setLoading(false);
      return;
    }
    
    if (!registerData.email || !registerData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    if (!registerData.password || registerData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }
    
    console.log(`[REGISTER] ========================================`);
    console.log(`[REGISTER] REGISTER FORM SUBMITTED`);
    console.log(`[REGISTER] Email: ${registerData.email}`);
    console.log(`[REGISTER] Name: ${registerData.name}`);
    console.log(`[REGISTER] ========================================`);
    
    try {
      const result = await register({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        company: registerData.company || null,
        phone: registerData.phone || null
      });
      
      console.log('[REGISTER] ✓ Registration succeeded');
      toast.success('Account created successfully!');
      navigate('/teamspace');
    } catch (error) {
      console.error('[REGISTER] ✗ Registration failed');
      console.error('[REGISTER] Error:', error.message);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response?.status === 400) {
        errorMessage = error.response.data?.detail || 'Invalid registration data';
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#151515] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Welcome to DexAura
          </h1>
          <p className="text-gray-400">Secure Manufacturing Workspace</p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-2xl p-8">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#151515]">
              <TabsTrigger value="login" data-testid="login-tab">Login</TabsTrigger>
              <TabsTrigger value="register" data-testid="register-tab">Register</TabsTrigger>
            </TabsList>

            {/* ===== LOGIN TAB ===== */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4" data-testid="login-form">
                <div>
                  <label className="text-white text-sm mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    className="bg-[#151515] border-[#301B3F] text-white"
                    data-testid="login-email"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">Password</label>
                  <div className="relative">
                    <Input
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      className="bg-[#151515] border-[#301B3F] text-white pr-10"
                      data-testid="login-password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      disabled={loading}
                    >
                      {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white rounded-full py-6"
                  data-testid="login-submit"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </TabsContent>

            {/* ===== REGISTER TAB ===== */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4" data-testid="register-form">
                <div>
                  <label className="text-white text-sm mb-2 block">Full Name</label>
                  <Input
                    placeholder="John Doe"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                    className="bg-[#151515] border-[#301B3F] text-white"
                    data-testid="register-name"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                    className="bg-[#151515] border-[#301B3F] text-white"
                    data-testid="register-email"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">Company (Optional)</label>
                  <Input
                    placeholder="Your Company"
                    value={registerData.company}
                    onChange={(e) => setRegisterData({ ...registerData, company: e.target.value })}
                    className="bg-[#151515] border-[#301B3F] text-white"
                    data-testid="register-company"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">Phone (Optional)</label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    className="bg-[#151515] border-[#301B3F] text-white"
                    data-testid="register-phone"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">Password</label>
                  <div className="relative">
                    <Input
                      type={showRegisterPassword ? "text" : "password"}
                      placeholder="At least 6 characters"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                      className="bg-[#151515] border-[#301B3F] text-white pr-10"
                      data-testid="register-password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      disabled={loading}
                    >
                      {showRegisterPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">Confirm Password</label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                      className="bg-[#151515] border-[#301B3F] text-white pr-10"
                      data-testid="register-confirm-password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      disabled={loading}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white rounded-full py-6"
                  data-testid="register-submit"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          All data is encrypted and secure
        </p>
      </div>
    </div>
  );
};

export default Login;
