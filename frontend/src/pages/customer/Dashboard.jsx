
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Plus,
  FileText,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Calendar,
  Download
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';

const CustomerDashboardContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState([]);
  const [orders, setOrders] = useState([]);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    // Check if user has correct role
    if (user && user.role !== 'BUYER') {
      navigate('/dashboard');
      return;
    }
    
    // Fetch dashboard data
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      // API calls to fetch data
      const [projectsRes, ordersRes, metricsRes] = await Promise.all([
        api.get('/projects'),
        api.get('/orders'),
        api.get('/dashboard/metrics')
      ]);

      setProjects(projectsRes.data || []);
      setOrders(ordersRes.data || []);
      setMetrics(metricsRes.data || {});
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Set empty data on error
      setProjects([]);
      setOrders([]);
      setMetrics({});
    }
  };

  return (
    <div className="min-h-screen bg-[#151515]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Customer Dashboard</h1>
          <p className="text-gray-300 mt-2">Manage your manufacturing projects and orders</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Button className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
            <Button variant="outline" className="border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Request Quote
            </Button>
            <Button variant="outline" className="border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white flex items-center gap-2">
              <Package className="h-4 w-4" />
              View Orders
            </Button>
          </div>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-[#1a1a1a] border-[#301B3F]">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Overview</TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Projects</TabsTrigger>
            <TabsTrigger value="parts" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Parts</TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Orders</TabsTrigger>
            <TabsTrigger value="quotes" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Quotes</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.active_projects || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.total_orders || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    All time orders
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.total_quotes || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Quote requests
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${metrics.total_spend || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.slice(0, 5).map((project) => (
                      <div key={project.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{project.project_name}</p>
                          <p className="text-sm text-gray-500">{project.status}</p>
                        </div>
                        <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Order #{order.order_number}</p>
                          <Badge variant="outline">{order.status}</Badge>
                        </div>
                        <Progress value={getOrderProgress(order.status)} className="h-2" />
                        <p className="text-sm text-gray-500">
                          {getOrderStatusText(order.status)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Projects</h2>
              <Button className="bg-[#910A67] hover:bg-[#7a0856]">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.project_name}
                      <Badge variant={getStatusVariant(project.status)}>
                        {project.status}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-gray-500">{project.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Parts:</span>
                        <span>{project.parts_count || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Value:</span>
                        <span>${project.total_value || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Created:</span>
                        <span>{new Date(project.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Add Parts</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Parts Tab */}
          <TabsContent value="parts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Parts</h2>
              <Button className="bg-[#910A67] hover:bg-[#7a0856]">
                <Plus className="h-4 w-4 mr-2" />
                Add Part
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Part Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Material
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Parts data would be mapped here */}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-2xl font-bold">Orders</h2>

            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Order #{order.order_number}</CardTitle>
                      <Badge variant={getOrderStatusVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      Project: {order.project_name}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium">Total Amount</p>
                        <p className="text-lg">${order.total_amount}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Order Date</p>
                        <p className="text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Delivery Date</p>
                        <p className="text-sm">{order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : 'TBD'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Progress</p>
                        <Progress value={getOrderProgress(order.status)} className="mt-1" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Track Shipment</Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Invoice
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Quotes Tab */}
          <TabsContent value="quotes" className="space-y-6">
            <h2 className="text-2xl font-bold">Quotes</h2>
            {/* Quotes content */}
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <h2 className="text-2xl font-bold">Support</h2>
            {/* Support tickets and contact */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Helper functions
const getStatusVariant = (status) => {
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

const getOrderStatusVariant = (status) => {
  const variants = {
    'new': 'secondary',
    'in_review': 'default',
    'quoted': 'default',
    'in_production': 'default',
    'shipped': 'default',
    'closed': 'default'
  };
  return variants[status] || 'secondary';
};

const getOrderProgress = (status) => {
  const progress = {
    'new': 10,
    'in_review': 20,
    'quoted': 30,
    'in_production': 60,
    'shipped': 90,
    'closed': 100
  };
  return progress[status] || 0;
};

const getOrderStatusText = (status) => {
  const texts = {
    'new': 'Order received',
    'in_review': 'Under review',
    'quoted': 'Quote sent',
    'in_production': 'In production',
    'shipped': 'Shipped',
    'closed': 'Completed'
  };
  return texts[status] || status;
};

const CustomerDashboard = () => {
  return (
    <ProtectedRoute>
      <CustomerDashboardContent />
    </ProtectedRoute>
  );
};

export default CustomerDashboard;
