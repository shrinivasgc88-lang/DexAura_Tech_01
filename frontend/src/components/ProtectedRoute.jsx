import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * ProtectedRoute - Wrapper component to enforce authentication
 * This component ensures that:
 * 1. User is logged in
 * 2. Token is valid
 * 3. User data is properly loaded
 */
export const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated, loading, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`[PROTECTED_ROUTE] Checking authentication...`);
    console.log(`[PROTECTED_ROUTE] Loading: ${loading}`);
    console.log(`[PROTECTED_ROUTE] Authenticated: ${isAuthenticated}`);
    console.log(`[PROTECTED_ROUTE] User: ${user?.email}`);
    console.log(`[PROTECTED_ROUTE] Token exists: ${!!token}`);

    if (!loading && !isAuthenticated) {
      console.error(`[PROTECTED_ROUTE] ✗ NOT AUTHENTICATED - Redirecting to login`);
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, loading, navigate, token, user]);

  // Don't render anything until we know auth status
  if (loading) {
    console.log(`[PROTECTED_ROUTE] Loading authentication state...`);
    return (
      <div className="min-h-screen bg-[#151515] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.error(`[PROTECTED_ROUTE] ✗ Access denied - Not authenticated`);
    return null;
  }

  console.log(`[PROTECTED_ROUTE] ✓ Access granted for: ${user?.email}`);
  return children;
};

export default ProtectedRoute;
