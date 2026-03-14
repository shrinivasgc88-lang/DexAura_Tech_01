
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Users,
  Package,
  TrendingUp,
  DollarSign,
  FileText,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Settings,
  UserPlus,
  ClipboardList,
  Truck,
  Star,
  Calendar,
  Activity
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';
import BlogModule from '@/components/admin/BlogModule';
import UsersModule from '@/components/admin/UsersModule';

const AdminDashboardContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    // Check if user has correct role
    if (user && user.role !== 'ADMIN') {
      navigate('/dashboard');
      return;
    }
    
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      // API calls to fetch admin data
      const [leadsRes, projectsRes, suppliersRes, metricsRes] = await Promise.all([
        api.get('/admin/contact_submissions'),
        api.get('/admin/projects'),
        api.get('/admin/suppliers'),
        api.get('/dashboard/metrics')  // Use the general dashboard metrics endpoint
      ]);

      setLeads(leadsRes.data.leads || leadsRes.data || []);
      setProjects(projectsRes.data.projects || projectsRes.data || []);
      setSuppliers(suppliersRes.data || []);
      setMetrics(metricsRes.data || {});
    } catch (error) {
      console.error('Failed to fetch admin dashboard data:', error);
      // Set empty data on error
      setLeads([]);
      setProjects([]);
      setSuppliers([]);
      setMetrics({});
    }
  };

  return (
    <div className="min-h-screen bg-[#151515]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-300 mt-2">Manage the DexAura manufacturing platform</p>
        </div>

        {/* Key Metrics */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-[#1a1a1a] border-[#301B3F] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">${metrics.total_orders || 0}</div>
                <p className="text-xs text-gray-400">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#301B3F] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Active Projects</CardTitle>
                <Package className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metrics.total_customers || 0}</div>
                <p className="text-xs text-gray-400">
                  Active customers
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#301B3F] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">New Leads</CardTitle>
                <Users className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metrics.total_leads || 0}</div>
                <p className="text-xs text-gray-400">
                  Total leads
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#301B3F] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Supplier Performance</CardTitle>
                <Star className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metrics.total_quotes || 0}</div>
                <p className="text-xs text-gray-400">
                  Total quotes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-9 bg-[#1a1a1a] border-[#301B3F]">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Overview</TabsTrigger>
            <TabsTrigger value="leads" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Leads</TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Projects</TabsTrigger>
            <TabsTrigger value="suppliers" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Suppliers</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Users</TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Orders</TabsTrigger>
            <TabsTrigger value="quality" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Quality</TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Blog</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="bg-[#1a1a1a] border-[#301B3F] text-white">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Activity items would be mapped here */}
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-white">New lead converted</p>
                        <p className="text-xs text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-white">Project moved to production</p>
                        <p className="text-xs text-gray-400">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-white">Quality issue reported</p>
                        <p className="text-xs text-gray-400">6 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Health */}
              <Card className="bg-[#1a1a1a] border-[#301B3F] text-white">
                <CardHeader>
                  <CardTitle className="text-white">System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">API Response Time</span>
                      <span className="text-sm font-medium text-white">120ms</span>
                    </div>
                    <Progress value={85} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Database Performance</span>
                      <span className="text-sm font-medium text-white">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">File Storage</span>
                      <span className="text-sm font-medium text-white">2.3GB used</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-[#1a1a1a] border-[#301B3F] text-white">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex flex-col items-center gap-2 bg-[#1a1a1a] border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white">
                    <UserPlus className="h-6 w-6" />
                    Add Supplier
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center gap-2 border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white">
                    <ClipboardList className="h-6 w-6" />
                    Review Leads
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center gap-2 border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white">
                    <Package className="h-6 w-6" />
                    Manage Projects
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center gap-2 border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white">
                    <BarChart3 className="h-6 w-6" />
                    View Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Lead Management</h2>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-[#301B3F] text-white">{leads.filter(l => l.status === 'new').length} new</Badge>
                <Button className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455]">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Lead
                </Button>
              </div>
            </div>

            <Card className="bg-[#1a1a1a] border-[#301B3F]">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#151515]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Company
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Value
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-[#1a1a1a] divide-y divide-[#301B3F]">
                      {leads.map((lead) => (
                        <tr key={lead.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-3">
                                <AvatarFallback className="bg-[#301B3F] text-white">
                                  {lead.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-sm font-medium text-white">{lead.name}</div>
                                <div className="text-sm text-gray-400">{lead.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {lead.company}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={getLeadStatusVariant(lead.status)} className="bg-[#301B3F] text-white">
                              {lead.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            ${lead.estimated_value || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white">View</Button>
                              <Button variant="outline" size="sm" className="border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white">Qualify</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Project Management</h2>
              <Button className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455]">
                <Package className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-[#1a1a1a] border-[#301B3F] hover:bg-[#202020] transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-white">
                      {project.project_name}
                      <Badge variant={getProjectStatusVariant(project.status)} className="bg-[#301B3F] text-white">
                        {project.status}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-gray-400">{project.customer_name}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Parts:</span>
                        <span className="text-white">{project.parts_count || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Value:</span>
                        <span className="text-white">${project.total_value || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Progress:</span>
                        <span className="text-white">{project.progress || 0}%</span>
                      </div>
                      <Progress value={project.progress || 0} className="h-2" />
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white">View Details</Button>
                      <Button variant="outline" size="sm" className="border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white">Assign Supplier</Button>
                      <Button variant="outline" size="sm" className="border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white">Update Status</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Supplier Management</h2>
              <Button className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455]">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Supplier
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliers.map((supplier) => (
                <Card key={supplier.id} className="bg-[#1a1a1a] border-[#301B3F] hover:bg-[#202020] transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-white">
                      {supplier.company_name}
                      <Badge variant={supplier.status === 'active' ? 'default' : 'secondary'} className="bg-[#301B3F] text-white">
                        {supplier.status}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-gray-400">{supplier.contact_person}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Rating:</span>
                        <span className="flex items-center gap-1 text-white">
                          <Star className="h-3 w-3 fill-current text-yellow-400" />
                          {supplier.rating || 0}/5
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">On-Time:</span>
                        <span className="text-white">{supplier.on_time_delivery_rate || 0}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Quality:</span>
                        <span className="text-white">{supplier.quality_score || 0}/100</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Active Orders:</span>
                        <span className="text-white">{supplier.active_orders || 0}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white">View Profile</Button>
                      <Button variant="outline" size="sm" className="border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white">Performance</Button>
                      <Button variant="outline" size="sm" className="border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white">Contact</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <UsersModule />
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Order Management</h2>
            {/* Orders management interface */}
          </TabsContent>

          {/* Quality Tab */}
          <TabsContent value="quality" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Quality Control</h2>
            {/* Quality management interface */}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Analytics & Reports</h2>
              <Button className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455]">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#1a1a1a] border-[#301B3F] text-white">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Revenue chart would go here */}
                  <div className="h-64 bg-[#151515] rounded-lg flex items-center justify-center border border-[#301B3F]">
                    <BarChart3 className="h-12 w-12 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1a1a] border-[#301B3F] text-white">
                <CardHeader>
                  <CardTitle className="text-white">Supplier Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Performance chart would go here */}
                  <div className="h-64 bg-[#151515] rounded-lg flex items-center justify-center border border-[#301B3F]">
                    <TrendingUp className="h-12 w-12 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-6">
            <BlogModule />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Helper functions
const getLeadStatusVariant = (status) => {
  const variants = {
    'new': 'secondary',
    'contacted': 'default',
    'qualified': 'default',
    'meeting_scheduled': 'default',
    'proposal_sent': 'default',
    'negotiation': 'warning',
    'converted': 'default',
    'lost': 'destructive'
  };
  return variants[status] || 'secondary';
};

const getProjectStatusVariant = (status) => {
  const variants = {
    'draft': 'secondary',
    'quoting': 'default',
    'approved': 'default',
    'in_production': 'default',
    'quality_check': 'warning',
    'shipped': 'default',
    'completed': 'default',
    'cancelled': 'destructive'
  };
  return variants[status] || 'secondary';
};

const AdminDashboard = () => {
  return (
    <ProtectedRoute>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
};

export default AdminDashboard;
