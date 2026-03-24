import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000';

const AuthDiagnostic = () => {
  const { user, token, loading, isAuthenticated } = useAuth();
  const [diagnostics, setDiagnostics] = useState({
    backendStatus: 'unknown',
    backendMessage: '',
    tokenValid: false,
    userValid: false,
    corsStatus: 'unknown'
  });

  useEffect(() => {
    const runDiagnostics = async () => {
      console.log('Running authentication diagnostics...');
      const results = {
        timestamp: new Date().toISOString(),
        backendURL: API_URL,
        token: {
          exists: !!token,
          length: token?.length || 0,
          preview: token ? token.substring(0, 20) + '...' : 'none'
        },
        user: {
          exists: !!user,
          email: user?.email || 'none',
          name: user?.name || 'none'
        },
        authState: {
          loading,
          isAuthenticated,
          localStorage: localStorage.getItem('token') ? 'token stored' : 'no token'
        }
      };

      console.log('Diagnostic Results:', results);
      
      // Test backend connectivity
      try {
        const response = await axios.get(`${API_URL}/api/test-route`, { timeout: 5000 });
        setDiagnostics(prev => ({
          ...prev,
          backendStatus: 'connected',
          backendMessage: 'Backend is running'
        }));
      } catch (error) {
        setDiagnostics(prev => ({
          ...prev,
          backendStatus: 'error',
          backendMessage: `Cannot connect: ${error.message}`
        }));
      }
    };

    runDiagnostics();
  }, [token, user, loading, isAuthenticated]);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg max-w-md text-xs border border-blue-500 max-h-96 overflow-y-auto">
      <h3 className="font-bold mb-2 text-yellow-400">🔍 Auth Diagnostic</h3>
      
      <div className="space-y-2">
        <div>
          <span className="font-semibold">Backend:</span>
          <span className={diagnostics.backendStatus === 'connected' ? 'text-green-400' : 'text-red-400'}>
            {' '}{diagnostics.backendStatus}
          </span>
          {diagnostics.backendMessage && (
            <p className="text-gray-400">{diagnostics.backendMessage}</p>
          )}
        </div>

        <div>
          <span className="font-semibold">Auth Status:</span>
          <div className="text-gray-300">
            <p>• Loading: {loading ? 'yes' : 'no'}</p>
            <p>• Authenticated: {isAuthenticated ? '✓ yes' : '✗ no'}</p>
            <p>• Token: {token ? '✓ present' : '✗ missing'}</p>
            <p>• User: {user ? '✓ loaded' : '✗ not loaded'}</p>
          </div>
        </div>

        {user && (
          <div>
            <span className="font-semibold">User:</span>
            <div className="text-gray-300">
              <p>• Email: {user.email}</p>
              <p>• Name: {user.name}</p>
              <p>• Role: {user.role}</p>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-700">
          <p>Backend: {API_URL}</p>
          <p>Check browser console for detailed logs</p>
        </div>
      </div>
    </div>
  );
};

export default AuthDiagnostic;
