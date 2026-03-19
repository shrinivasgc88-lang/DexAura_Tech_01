
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  Upload,
  FileText,
  TrendingUp,
  DollarSign,
  Star,
  AlertTriangle,
  Calendar,
  BarChart3
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';

const SupplierDashboardContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requests');
  const [jobRequests, setJobRequests] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    // Check if user has correct role
    if (user && user.role !== 'SUPPLIER') {
      navigate('/dashboard');
      return;
    }
    
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      // API calls to fetch supplier data
      const [requestsRes, ordersRes, metricsRes] = await Promise.all([
        api.get('/job-requests'),
        api.get('/orders'), // This will be filtered by assigned_supplier in backend
        api.get('/dashboard/metrics')
      ]);

      setJobRequests(requestsRes.data || []);
      setActiveOrders(ordersRes.data || []);
      setMetrics(metricsRes.data || {});
    } catch (error) {
      console.error('Failed to fetch supplier dashboard data:', error);
      // Set empty data on error
      setJobRequests([]);
      setActiveOrders([]);
      setMetrics({});
    }
  };

  const handleJobResponse = async (requestId, accepted) => {
    try {
      if (accepted) {
        await api.post(`/job-requests/${requestId}/accept`);
      } else {
        await api.post(`/job-requests/${requestId}/reject`);
      }
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Failed to respond to job request:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#151515]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Supplier Dashboard</h1>
          <p className="text-gray-300 mt-2">Manage your manufacturing jobs and track performance</p>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-[#1a1a1a] border-[#301B3F] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Active Orders</CardTitle>
                <Package className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metrics.active_orders || 0}</div>
                <p className="text-xs text-gray-400">
                  Currently in production
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#301B3F] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Completed Orders</CardTitle>
                <CheckCircle className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metrics.completed_orders || 0}</div>
                <p className="text-xs text-gray-400">
                  Successfully delivered
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#301B3F] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Quality Reports</CardTitle>
                <FileText className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metrics.quality_reports || 0}</div>
                <p className="text-xs text-gray-400">
                  Submitted reports
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-[#1a1a1a] border-[#301B3F]">
            <TabsTrigger value="requests" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Job Requests</TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Active Orders</TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Production</TabsTrigger>
            <TabsTrigger value="quality" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Quality</TabsTrigger>
            <TabsTrigger value="shipping" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Shipping</TabsTrigger>
          </TabsList>

          {/* Job Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Job Requests</h2>
              <Badge variant="secondary">{jobRequests.length} pending</Badge>
            </div>

            <div className="space-y-4">
              {jobRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        {request.part_name}
                      </CardTitle>
                      <Badge variant="outline">New Request</Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      Project: {request.project_name} | Customer: {request.customer_name}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium">Material</p>
                        <p className="text-sm">{request.material}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Quantity</p>
                        <p className="text-sm">{request.quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Process</p>
                        <p className="text-sm">{request.process}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Due Date</p>
                        <p className="text-sm">{new Date(request.due_date).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <h4 className="font-medium text-blue-900 mb-2">Requirements</h4>
                      <p className="text-sm text-blue-800">{request.requirements}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleJobResponse(request.id, true)}
                        className="flex-1"
                      >
                        Accept Job
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleJobResponse(request.id, false)}
                        className="flex-1"
                      >
                        Decline
                      </Button>
                      <Button variant="outline">
                        Request More Info
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Active Orders</h2>
              <Badge variant="secondary">{activeOrders.length} in progress</Badge>
            </div>

            <div className="space-y-4">
              {activeOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        {order.part_name}
                      </CardTitle>
                      <Badge variant="default">In Production</Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      Order #{order.order_number} | Customer: {order.customer_name}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium">Quantity</p>
                        <p className="text-sm">{order.quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Due Date</p>
                        <p className="text-sm">{new Date(order.due_date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Progress</p>
                        <Progress value={order.progress || 0} className="mt-1" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Status</p>
                        <p className="text-sm">{order.production_status}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-1" />
                        Update Progress
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Upload QC Report
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Production Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Production Progress</h2>
              <Button className="bg-[#910A67] hover:bg-[#7a0856]">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Production Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeOrders.map((order) => (
                      <div key={order.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{order.part_name}</span>
                          <span className="text-sm text-gray-500">{order.progress}%</span>
                        </div>
                        <Progress value={order.progress || 0} />
                        <p className="text-xs text-gray-500">
                          Due: {new Date(order.due_date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeOrders
                      .filter(order => order.days_until_due <= 7)
                      .map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                          <div>
                            <p className="font-medium">{order.part_name}</p>
                            <p className="text-sm text-gray-600">
                              Due in {order.days_until_due} days
                            </p>
                          </div>
                          {order.days_until_due <= 2 && (
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Quality Reports Tab */}
          <TabsContent value="quality" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Quality Reports</h2>
              <Button className="bg-[#910A67] hover:bg-[#7a0856]">
                <Upload className="h-4 w-4 mr-2" />
                Upload Report
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Part
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Quality reports data */}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shipping Tab */}
          <TabsContent value="shipping" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Shipping & Delivery</h2>
              <Button className="bg-[#910A67] hover:bg-[#7a0856]">
                <Truck className="h-4 w-4 mr-2" />
                Update Shipment
              </Button>
            </div>

            <div className="space-y-4">
              {activeOrders
                .filter(order => order.status === 'ready_for_shipping')
                .map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Truck className="h-5 w-5" />
                          Ready for Shipping
                        </CardTitle>
                        <Badge variant="default">Ready</Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        {order.part_name} - Order #{order.order_number}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Quantity</p>
                          <p className="text-sm">{order.quantity}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Customer</p>
                          <p className="text-sm">{order.customer_name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Address</p>
                          <p className="text-sm">{order.shipping_address}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Due Date</p>
                          <p className="text-sm">{new Date(order.due_date).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Confirm Shipment
                        </Button>
                        <Button variant="outline" size="sm">
                          Upload Tracking
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const SupplierDashboard = () => {
  return (
    <ProtectedRoute>
      <SupplierDashboardContent />
    </ProtectedRoute>
  );
};

export default SupplierDashboard;
