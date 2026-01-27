import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login, register, googleLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    phone: ''
  });

  // Load Google Sign-In script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginData.email, loginData.password);
      toast.success('Login successful!');
      navigate('/teamspace');
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.detail || error.message || 'Login failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(registerData);
      toast.success('Registration successful!');
      navigate('/teamspace');
    } catch (error) {
      console.error('Register error:', error);
      const errorMessage = error.response?.data?.detail || error.message || 'Registration failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Initialize Google Sign-In
      if (!window.google) {
        throw new Error('Google Sign-In library not loaded');
      }

      // Use Google Sign-In
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse
      });

      // Trigger the Google Sign-In dialog
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { theme: 'dark', size: 'large', width: '100%' }
      );

      document.getElementById('google-signin-button').click();
    } catch (error) {
      console.error('Google Sign-In error:', error);
      toast.error('Google Sign-In not available. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleResponse = async (response) => {
    setLoading(true);
    try {
      if (!response.credential) {
        throw new Error('No credential received from Google');
      }

      // Decode the JWT token (Google returns a JWT)
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      const googleData = JSON.parse(jsonPayload);

      // Call the backend Google auth endpoint
      await googleLogin({
        google_id: googleData.sub,
        email: googleData.email,
        name: googleData.name,
        picture: googleData.picture
      });

      toast.success('Login successful with Google!');
      navigate('/teamspace');
    } catch (error) {
      console.error('Google authentication error:', error);
      const errorMessage = error.response?.data?.detail || error.message || 'Google login failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#151515] flex items-center justify-center py-12 px-4">
      {/* Hidden Google Sign-In button container */}
      <div id="google-signin-button" style={{ display: 'none' }}></div>
      
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Welcome to DexAura
          </h1>
          <p className="text-gray-400">Access your manufacturing workspace</p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-2xl p-8">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#151515]">
              <TabsTrigger value="login" data-testid="login-tab">Login</TabsTrigger>
              <TabsTrigger value="register" data-testid="register-tab">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4" data-testid="login-form">
                <Input
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  className="bg-[#151515] border-[#301B3F] text-white"
                  data-testid="login-email"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  className="bg-[#151515] border-[#301B3F] text-white"
                  data-testid="login-password"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white rounded-full py-6"
                  data-testid="login-submit"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#301B3F]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#1a1a1a] text-gray-400">Or continue with</span>
                  </div>
                </div>
                <Button
                  onClick={handleGoogleLogin}
                  variant="outline"
                  className="w-full mt-4 border-[#301B3F] text-white hover:bg-[#301B3F]/20"
                  data-testid="google-login-btn"
                >
                  Google
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4" data-testid="register-form">
                <Input
                  placeholder="Full Name"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  required
                  className="bg-[#151515] border-[#301B3F] text-white"
                  data-testid="register-name"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                  className="bg-[#151515] border-[#301B3F] text-white"
                  data-testid="register-email"
                />
                <Input
                  placeholder="Company"
                  value={registerData.company}
                  onChange={(e) => setRegisterData({ ...registerData, company: e.target.value })}
                  className="bg-[#151515] border-[#301B3F] text-white"
                  data-testid="register-company"
                />
                <Input
                  type="tel"
                  placeholder="Phone"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                  className="bg-[#151515] border-[#301B3F] text-white"
                  data-testid="register-phone"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                  className="bg-[#151515] border-[#301B3F] text-white"
                  data-testid="register-password"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white rounded-full py-6"
                  data-testid="register-submit"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#301B3F]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#1a1a1a] text-gray-400">Or sign up with</span>
                  </div>
                </div>
                <Button
                  onClick={handleGoogleLogin}
                  type="button"
                  disabled={loading}
                  variant="outline"
                  className="w-full mt-4 border-[#301B3F] text-white hover:bg-[#301B3F]/20"
                  data-testid="google-register-btn"
                >
                  {loading ? 'Connecting...' : 'Google'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
