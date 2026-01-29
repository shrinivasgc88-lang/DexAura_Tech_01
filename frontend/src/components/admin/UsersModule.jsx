import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Search, Edit2, X } from 'lucide-react';

const UsersModule = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [updating, setUpdating] = useState(false);

  const roles = ['OWNER', 'BUYER', 'VIEWER', 'ADMIN'];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      
      const response = await api.get(`/admin/customers?${params.toString()}`);
      setUsers(response.data.customers || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    fetchUsers();
  };

  const handleEditRole = (user) => {
    setEditingId(user.id);
    setSelectedRole(user.role);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setSelectedRole('');
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      setUpdating(true);
      await api.put(`/admin/customers/${userId}/role`, { role: newRole });
      
      // Update local state
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast.success(`Role updated to ${newRole}`);
      setEditingId(null);
      setSelectedRole('');
    } catch (error) {
      console.error('Failed to update role:', error);
      const errorMsg = error.response?.data?.detail || 'Failed to update role';
      toast.error(errorMsg);
    } finally {
      setUpdating(false);
    }
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      'ADMIN': 'bg-red-500',
      'OWNER': 'bg-purple-500',
      'BUYER': 'bg-blue-500',
      'VIEWER': 'bg-gray-500'
    };
    return colors[role] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-gray-400 mt-1">Manage user roles and permissions</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <Input
          placeholder="Search by name, email, or company..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="bg-[#1a1a1a] border-[#301B3F] text-white flex-1"
        />
        <Button
          onClick={handleSearch}
          className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455]"
        >
          <Search size={16} className="mr-2" />
          Search
        </Button>
      </div>

      {/* Users Table */}
      <div className="bg-[#1a1a1a] border border-[#301B3F] rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin mr-2" />
            <span className="text-gray-400">Loading users...</span>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#301B3F] bg-[#151515]">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Current Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-[#301B3F] hover:bg-[#1a1a1a] transition">
                    <td className="px-6 py-4 text-sm text-white">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{user.name || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{user.company || '-'}</td>
                    <td className="px-6 py-4 text-sm">
                      {editingId === user.id ? (
                        <select
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          className="bg-[#151515] border border-[#301B3F] text-white rounded px-3 py-1 text-sm"
                        >
                          <option value="">Select role...</option>
                          {roles.map(role => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                      ) : (
                        <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                          {user.role}
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {editingId === user.id ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleUpdateRole(user.id, selectedRole)}
                            disabled={updating || !selectedRole}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            {updating ? <Loader2 size={14} className="animate-spin" /> : 'Save'}
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleCancelEdit}
                            disabled={updating}
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-[#151515]"
                          >
                            <X size={14} />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleEditRole(user)}
                          variant="outline"
                          className="border-[#301B3F] text-gray-300 hover:bg-[#151515]"
                        >
                          <Edit2 size={14} className="mr-1" />
                          Edit Role
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats */}
      {!loading && users.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {roles.map(role => (
            <div key={role} className="bg-[#1a1a1a] border border-[#301B3F] rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">{role}</p>
              <p className="text-2xl font-bold text-white">
                {users.filter(u => u.role === role).length}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersModule;
