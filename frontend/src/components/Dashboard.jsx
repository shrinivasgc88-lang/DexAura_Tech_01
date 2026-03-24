import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirect based on user role
      if (user.role === 'ADMIN') {
        navigate('/dashboard/admin', { replace: true });
      } else if (user.role === 'SUPPLIER') {
        navigate('/dashboard/supplier', { replace: true });
      } else {
        navigate('/dashboard/customer', { replace: true });
      }
    }
  }, [user, navigate]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#151515] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;