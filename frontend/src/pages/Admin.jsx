import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, LogOut, User } from 'lucide-react';
import ContactsModule from '@/components/admin/ContactsModule';
import BlogModule from '@/components/admin/BlogModule';
import LeadsModule from '@/components/admin/LeadsModule';
import ProjectsModule from '@/components/admin/ProjectsModule';
import SuppliersModule from '@/components/admin/SuppliersModule';
import AssignmentsModule from '@/components/admin/AssignmentsModule';
import UsersModule from '@/components/admin/UsersModule';

const Admin = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('contacts');
  const [newContactsCount, setNewContactsCount] = useState(0);

  React.useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'ADMIN') {
      fetchNewContactsCount();
      // Poll for new contacts every 30 seconds
      const interval = setInterval(fetchNewContactsCount, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, user]);

  const fetchNewContactsCount = async () => {
    try {
      const response = await api.get('/admin/contact-submissions');
      const newContacts = response.data.submissions?.filter(
        contact => contact.status === 'new'
      );
      setNewContactsCount(newContacts?.length || 0);
    } catch (error) {
      console.error('Failed to fetch new contacts count');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a] border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#720455] to-[#910A67] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">Admin Dashboard</h1>
                <p className="text-xs text-gray-400">DexAura Management</p>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-400 hover:text-white hover:bg-[#252525]"
                onClick={() => {
                  setActiveTab('contacts');
                  fetchNewContactsCount();
                }}
              >
                <Bell className="h-5 w-5" />
                {newContactsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                    {newContactsCount}
                  </Badge>
                )}
              </Button>

              {/* User Info */}
              <div className="flex items-center gap-3 px-3 py-2 bg-[#252525] rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-white">{user?.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">Welcome back!</h2>
          <p className="text-gray-400">Manage leads, projects, suppliers, and content</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 gap-2 mb-8 bg-[#1a1a1a] p-1 h-auto">
            <TabsTrigger value="users" className="data-[state=active]:bg-[#910A67]">
              Users
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-[#910A67]">
              Contacts
            </TabsTrigger>
            <TabsTrigger value="leads" className="data-[state=active]:bg-[#910A67]">
              Leads & CRM
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-[#910A67]">
              Projects
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="data-[state=active]:bg-[#910A67]">
              Suppliers
            </TabsTrigger>
            <TabsTrigger value="assignments" className="data-[state=active]:bg-[#910A67]">
              Assignments
            </TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-[#910A67]">
              Blog
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UsersModule />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactsModule />
          </TabsContent>

          <TabsContent value="leads">
            <LeadsModule />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsModule />
          </TabsContent>

          <TabsContent value="suppliers">
            <SuppliersModule />
          </TabsContent>

          <TabsContent value="assignments">
            <AssignmentsModule />
          </TabsContent>

          <TabsContent value="blog">
            <BlogModule />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
