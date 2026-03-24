import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000';

// Helper function to clear all auth data
const clearAuthData = () => {
  console.log('Clearing auth data...');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('customer');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('customer');
  delete axios.defaults.headers.common['Authorization'];
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Define fetchUser outside useEffect to avoid dependency issues
  const fetchUser = async (authToken) => {
    console.log(`[AUTH] ========================================`);
    console.log(`[AUTH] FETCHING CURRENT USER`);
    console.log(`[AUTH] Token: ${authToken ? authToken.substring(0, 20) + '...' : 'NONE'}`);
    
    try {
      const response = await axios.get(`${API_URL}/api/auth/me`);
      console.log(`[AUTH] ✓ User fetched successfully`);
      console.log(`[AUTH] User:`, response.data);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error('[AUTH] ✗ Failed to fetch user');
      console.error('[AUTH] Status:', error.response?.status);
      console.error('[AUTH] Error:', error.response?.data?.detail || error.message);
      
      // If 401, token is invalid - clear everything
      if (error.response?.status === 401) {
        console.error('[AUTH] ✗ Token is invalid (401) - clearing auth');
        clearAuthData();
      }
      
      setToken(null);
      setUser(null);
      setLoading(false);
    }
    console.log(`[AUTH] ========================================`);
  };

  useEffect(() => {
    console.log(`[AUTH] ========================================`);
    console.log(`[AUTH] INITIAL LOAD - Checking stored token`);
    console.log(`[AUTH] Stored token exists: ${!!token}`);
    
    if (token) {
      console.log(`[AUTH] ✓ Token found, setting auth header`);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser(token);
    } else {
      console.log(`[AUTH] ✗ No token found`);
      setLoading(false);
      setUser(null);
    }
    console.log(`[AUTH] ========================================`);
  }, [token]);

  const login = async (email, password) => {
    try {
      const separator = '='.repeat(60);
      console.log(`\n\n${separator}`);
      console.log(`[LOGIN] LOGIN ATTEMPT STARTED`);
      console.log(`[LOGIN] Email: ${email}`);
      console.log(`[LOGIN] Password: ${password ? '[PROVIDED]' : '[EMPTY]'}`);
      console.log(`[LOGIN] Backend URL: ${API_URL}`);
      console.log(`${separator}`);
      
      // FIRST: Clear ALL auth data to ensure fresh login
      console.log(`[LOGIN] Clearing any previous session data...`);
      clearAuthData();
      console.log(`[LOGIN] ✓ Previous session cleared`);
      
      // VALIDATE: Check inputs before sending
      if (!email || !email.includes('@')) {
        console.error('[LOGIN] ✗ Invalid email format');
        throw new Error('Invalid email address');
      }
      if (!password || password.length === 0) {
        console.error('[LOGIN] ✗ Password is empty');
        throw new Error('Password cannot be empty');
      }
      
      console.log(`[LOGIN] ✓ Input validation passed`);
      const loginUrl = `${API_URL}/api/auth/login`;
      console.log(`[LOGIN] Sending POST request to: ${loginUrl}`);
      console.log(`[LOGIN] Request body: email=${email}, password=[***]`);
      
      // SEND: Login request
      console.log(`[LOGIN] Making axios.post() call...`);
      const response = await axios.post(loginUrl, { 
        email: email.toLowerCase().trim(), 
        password: password 
      });
      console.log(`[LOGIN] ✓ Response received from axios`);
      
      console.log(`[LOGIN] ✓ Response received from server`);
      console.log(`[LOGIN] HTTP Status: ${response.status}`);
      console.log(`[LOGIN] Response data keys:`, Object.keys(response.data || {}));
      
      // EXTRACT: Get token and customer
      const responseData = response.data;
      const access_token = responseData?.access_token;
      const customer = responseData?.customer;
      
      console.log(`[LOGIN] access_token exists: ${!!access_token} (type: ${typeof access_token})`);
      console.log(`[LOGIN] customer exists: ${!!customer} (type: ${typeof customer})`);
      
      // VALIDATE: Token must exist
      if (!access_token) {
        console.error('[LOGIN] ✗ CRITICAL ERROR: No access_token in response!');
        console.error('[LOGIN] Response was:', responseData);
        clearAuthData();
        throw new Error('Server error: No token provided');
      }
      
      if (typeof access_token !== 'string' || access_token.length === 0) {
        console.error('[LOGIN] ✗ CRITICAL ERROR: access_token is not a valid string!');
        console.error('[LOGIN] Token type:', typeof access_token);
        console.error('[LOGIN] Token value:', access_token);
        clearAuthData();
        throw new Error('Server error: Invalid token format');
      }
      
      // VALIDATE: Customer must be an object
      if (!customer) {
        console.error('[LOGIN] ✗ CRITICAL ERROR: No customer object in response!');
        console.error('[LOGIN] Response was:', responseData);
        clearAuthData();
        throw new Error('Server error: No user data provided');
      }
      
      if (typeof customer !== 'object' || Array.isArray(customer)) {
        console.error('[LOGIN] ✗ CRITICAL ERROR: customer is not a valid object!');
        console.error('[LOGIN] Customer type:', typeof customer);
        console.error('[LOGIN] Customer value:', customer);
        clearAuthData();
        throw new Error('Server error: Invalid user data format');
      }
      
      // VALIDATE: Customer must have required fields
      if (!customer.id || typeof customer.id !== 'string') {
        console.error('[LOGIN] ✗ CRITICAL ERROR: Customer has no valid ID!');
        console.error('[LOGIN] Customer ID:', customer.id);
        clearAuthData();
        throw new Error('Server error: User ID missing');
      }
      
      if (!customer.email || typeof customer.email !== 'string') {
        console.error('[LOGIN] ✗ CRITICAL ERROR: Customer has no valid email!');
        console.error('[LOGIN] Customer email:', customer.email);
        clearAuthData();
        throw new Error('Server error: User email missing');
      }
      
      if (customer.email.toLowerCase() !== email.toLowerCase()) {
        console.error('[LOGIN] ✗ CRITICAL ERROR: Response email does not match login email!');
        console.error('[LOGIN] Login email:', email.toLowerCase());
        console.error('[LOGIN] Response email:', customer.email.toLowerCase());
        clearAuthData();
        throw new Error('Server error: Email mismatch');
      }
      
      console.log(`[LOGIN] ✓ All response validations PASSED`);
      console.log(`[LOGIN] Valid customer: ${customer.email} (ID: ${customer.id})`);
      
      // STORE: Save token and user
      console.log(`[LOGIN] Storing credentials in localStorage...`);
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(customer));
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      // UPDATE: State
      setToken(access_token);
      setUser(customer);
      
      console.log(`[LOGIN] ✓ LOGIN SUCCESSFUL`);
      console.log(`[LOGIN] User: ${customer.name || customer.email} (${customer.email})`);
      console.log(`${separator}\n`);
      
      return customer;
      
    } catch (error) {
      const separator = '='.repeat(60);
      console.error(`\n[LOGIN] ✗ LOGIN FAILED - AUTHENTICATION REJECTED`);
      console.error(`${separator}`);
      
      if (error.response) {
        console.error(`[LOGIN] HTTP Error: ${error.response.status}`);
        console.error(`[LOGIN] Server error detail: ${error.response.data?.detail}`);
        console.error(`[LOGIN] Full server response:`, error.response.data);
      } else if (error.request) {
        console.error(`[LOGIN] No response from server - Network error`);
        console.error(`[LOGIN] Backend should be running at: ${API_URL}`);
      } else {
        console.error(`[LOGIN] Client error: ${error.message}`);
      }
      
      // Ensure all auth is cleared
      console.error(`[LOGIN] Clearing all auth data due to login failure...`);
      clearAuthData();
      setToken(null);
      setUser(null);
      
      console.error(`[LOGIN] ✓ Auth data cleared - user is logged out`);
      console.error(`${separator}\n`);
      
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      console.log(`[AUTH] ========================================`);
      console.log(`[AUTH] REGISTER ATTEMPT STARTED`);
      console.log(`[AUTH] Email: ${userData.email}`);
      console.log(`[AUTH] Name: ${userData.name}`);
      console.log(`[AUTH] ========================================`);
      
      // CRITICAL: Validate inputs before sending
      if (!userData.name || userData.name.trim().length === 0) {
        throw new Error('Name is required');
      }
      if (!userData.email || !userData.email.includes('@')) {
        throw new Error('Invalid email address');
      }
      if (!userData.password || userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      console.log(`[AUTH] ✓ Input validation passed`);
      console.log(`[AUTH] Sending POST request to: ${API_URL}/api/auth/register`);
      
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        email: userData.email.trim(),
        password: userData.password,
        name: userData.name.trim(),
        company: userData.company || null,
        phone: userData.phone || null
      });
      
      console.log(`[AUTH] ✓ Response received`);
      console.log(`[AUTH] Status: ${response.status}`);
      
      const { access_token, customer } = response.data;
      
      // CRITICAL: Strict validation of response
      if (!access_token) {
        console.error('[AUTH] ✗ CRITICAL: No access_token in response!');
        throw new Error('Registration failed: No token provided');
      }
      
      if (!customer || !customer.email || !customer.id) {
        console.error('[AUTH] ✗ CRITICAL: Invalid customer object in response!');
        throw new Error('Registration failed: Invalid user data');
      }
      
      console.log(`[AUTH] ✓ Response validation passed`);
      console.log(`[AUTH] Setting auth data for: ${customer.email}`);
      
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(customer));
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setToken(access_token);
      setUser(customer);
      
      console.log(`[AUTH] ✓ REGISTRATION SUCCESSFUL`);
      console.log(`[AUTH] User: ${customer.name} (${customer.email})`);
      console.log(`[AUTH] ========================================`);
      
      return customer;
    } catch (error) {
      console.error('[AUTH] ✗ REGISTRATION FAILED');
      console.error('[AUTH] Error:', error.message);
      if (error.response) {
        console.error('[AUTH] Response:', error.response.data);
      }
      
      clearAuthData();
      setToken(null);
      setUser(null);
      
      throw error;
    }
  };

  const logout = () => {
    clearAuthData();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
