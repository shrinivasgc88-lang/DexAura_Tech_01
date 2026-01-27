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

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
      setUser(null);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/me`);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      // Clear all auth on token/user fetch failure
      clearAuthData();
      setToken(null);
      setUser(null);
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      const { access_token, customer } = response.data;
      
      // Only set auth data if response is successful
      if (access_token && customer) {
        localStorage.setItem('token', access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        setToken(access_token);
        setUser(customer);
        return customer;
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Clear ALL auth data on any error
      clearAuthData();
      setToken(null);
      setUser(null);
      // Re-throw the error so it can be caught by the caller
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, userData);
      const { access_token, customer } = response.data;
      
      // Only set auth data if response is successful
      if (access_token && customer) {
        localStorage.setItem('token', access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        setToken(access_token);
        setUser(customer);
        return customer;
      } else {
        throw new Error('Invalid registration response');
      }
    } catch (error) {
      console.error('Register error:', error);
      // Clear ALL auth data on any error
      clearAuthData();
      setToken(null);
      setUser(null);
      // Re-throw the error so it can be caught by the caller
      throw error;
    }
  };

  const googleLogin = async (googleToken) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/google`, googleToken);
      const { access_token, customer } = response.data;
      
      // Only set auth data if response is successful
      if (access_token && customer) {
        localStorage.setItem('token', access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        setToken(access_token);
        setUser(customer);
        return customer;
      } else {
        throw new Error('Invalid Google login response');
      }
    } catch (error) {
      console.error('Google login error:', error);
      // Clear ALL auth data on any error
      clearAuthData();
      setToken(null);
      setUser(null);
      // Re-throw the error so it can be caught by the caller
      throw error;
    }
  };

  const logout = () => {
    clearAuthData();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout, isAuthenticated: !!user }}>
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
