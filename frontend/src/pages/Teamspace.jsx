import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';

const TeamspaceContent = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#151515] py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Teamspace</h1>
        <div className="bg-[#2a2a2a] rounded-lg p-6 text-white">
          <p className="text-lg mb-4">Welcome, <span className="font-bold text-blue-400">{user?.name}</span>!</p>
          <div className="text-gray-300 text-sm space-y-2">
            <p><span className="font-semibold">Email:</span> {user?.email}</p>
            <p><span className="font-semibold">Company:</span> {user?.company || 'Not set'}</p>
            <p><span className="font-semibold">Role:</span> {user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Teamspace = () => {
  return (
    <ProtectedRoute>
      <TeamspaceContent />
    </ProtectedRoute>
  );
};

export default Teamspace;
