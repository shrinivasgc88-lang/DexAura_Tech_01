
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
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
import { toast } from 'sonner';
import { COUNTRIES } from '@/utils/countries';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import BlogModule from '@/components/admin/BlogModule';
import UsersModule from '@/components/admin/UsersModule';

const AdminDashboardContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [leads, setLeads] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [qualifyingId, setQualifyingId] = useState(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showAddLeadDialog, setShowAddLeadDialog] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    country: COUNTRIES[0]?.code || '',
    company: '',
    message: ''
  });
  const [countrySearch, setCountrySearch] = useState('');
  const [countryOpen, setCountryOpen] = useState(false);
  const countrySearchInputRef = useRef(null);

  const filteredCountries = useMemo(() => {
    const q = countrySearch.trim().toLowerCase();
    if (!q) return COUNTRIES;

    return COUNTRIES.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.dialCode.toLowerCase().includes(q)
    );
  }, [countrySearch]);

  useEffect(() => {
    if (countryOpen && countrySearchInputRef.current) {
      countrySearchInputRef.current.focus();
    }
  }, [countryOpen]);

  const getDialCodeFromCountry = (countryCode) => {
    const country = COUNTRIES.find((c) => c.code === countryCode);
    return country?.dialCode || countryCode;
  };

  const getCountryNameFromCodeOrDial = (countryValue) => {
    if (!countryValue) return '';

    // Try matching country ISO code (e.g. "IN")
    const isoMatch = COUNTRIES.find((c) => c.code.toLowerCase() === countryValue.toLowerCase());
    if (isoMatch) return isoMatch.name;

    // Try matching dial code (e.g. "+91")
    const dialMatch = COUNTRIES.find((c) => c.dialCode === countryValue || c.dialCode === `+${countryValue}`);
    if (dialMatch) return dialMatch.name;

    return '';
  };

  const getPhoneWithDialCode = (countryCode, phone) => {
    const dialCode = getDialCodeFromCountry(countryCode);
    const trimmedPhone = (phone || '').trim();

    if (!trimmedPhone) return trimmedPhone;
    if (trimmedPhone.startsWith('+')) return trimmedPhone;

    const plainDial = dialCode.replace(/[^\d]/g, '');
    if (plainDial && trimmedPhone.startsWith(plainDial)) {
      return `+${trimmedPhone}`;
    }

    return `${dialCode}${trimmedPhone}`;
  };

  const [showMeetingsDialog, setShowMeetingsDialog] = useState(false);
  const [selectedCustomerForMeetings, setSelectedCustomerForMeetings] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [meetingForm, setMeetingForm] = useState({
    title: '',
    meeting_date: '',
    duration_minutes: 60,
    location: '',
    agenda: '',
    notes: ''
  });
  const [showMeetingOutcomeDialog, setShowMeetingOutcomeDialog] = useState(false);
  const [selectedMeetingForOutcome, setSelectedMeetingForOutcome] = useState(null);
  const [meetingOutcome, setMeetingOutcome] = useState('');
  const [meetingStatus, setMeetingStatus] = useState('scheduled');

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
      const [submissionsRes, qualifiedRes, followUpRes, projectsRes, suppliersRes, metricsRes] = await Promise.all([
        api.get('/admin/contact-submissions?status=new'),
        api.get('/admin/contact-submissions?status=Qualified'),
        api.get('/admin/contact-submissions?status=Follow%20Up'),
        api.get('/admin/projects'),
        api.get('/admin/suppliers'),
        api.get('/dashboard/metrics')  // Use the general dashboard metrics endpoint
      ]);

      const newSubmissions = submissionsRes.data.submissions || submissionsRes.data || [];
      const qualifiedSubmissions = qualifiedRes.data.submissions || qualifiedRes.data || [];
      const followUpSubmissions = followUpRes.data.submissions || followUpRes.data || [];

      // Combine qualified + follow up and dedupe by id
      const combinedCustomers = [...qualifiedSubmissions, ...followUpSubmissions];
      const uniqueCustomersById = Array.from(new Map(combinedCustomers.map((c) => [c.id, c])).values());

      setLeads(newSubmissions);
      setCustomers(uniqueCustomersById);
      setProjects(projectsRes.data.projects || projectsRes.data || []);
      setSuppliers(suppliersRes.data || []);
      setMetrics(metricsRes.data || {});
    } catch (error) {
      console.error('Failed to fetch admin dashboard data:', error);
      // Set empty data on error
      setLeads([]);
      setCustomers([]);
      setProjects([]);
      setSuppliers([]);
      setMetrics({});
    }
  };

  const fetchMeetingsForCustomer = async (customer) => {
    try {
      const res = await api.get(`/admin/meetings?lead_id=${customer.id}`);
      setMeetings(res.data || []);
    } catch (error) {
      console.error('Failed to fetch meetings:', error);
      toast.error('Failed to load meetings');
      setMeetings([]);
    }
  };

  const openMeetingsDialog = async (customer) => {
    setSelectedCustomerForMeetings(customer);
    setShowMeetingsDialog(true);
    await fetchMeetingsForCustomer(customer);
  };

  const createMeeting = async () => {
    if (!selectedCustomerForMeetings) return;

    try {
      await api.post('/admin/meetings', {
        lead_id: selectedCustomerForMeetings.id,
        title: meetingForm.title,
        meeting_date: meetingForm.meeting_date,
        duration_minutes: meetingForm.duration_minutes,
        location: meetingForm.location,
        agenda: meetingForm.agenda,
        notes: meetingForm.notes,
        status: 'scheduled',
        created_by: user?.id || 'admin'
      });
      toast.success('Meeting created');
      setMeetingForm({
        title: '',
        meeting_date: '',
        duration_minutes: 60,
        location: '',
        agenda: '',
        notes: ''
      });
      await fetchMeetingsForCustomer(selectedCustomerForMeetings);
    } catch (error) {
      console.error('Failed to create meeting:', error);
      toast.error('Failed to create meeting');
    }
  };

  const updateMeetingOutcome = async () => {
    if (!selectedMeetingForOutcome) return;
    try {
      await api.patch(`/admin/meetings/${selectedMeetingForOutcome.id}`, {
        outcome: meetingOutcome,
        status: meetingStatus
      });
      toast.success('Meeting updated');
      setShowMeetingOutcomeDialog(false);
      setSelectedMeetingForOutcome(null);
      setMeetingOutcome('');
      setMeetingStatus('scheduled');
      if (selectedCustomerForMeetings) {
        await fetchMeetingsForCustomer(selectedCustomerForMeetings);
      }
    } catch (error) {
      console.error('Failed to update meeting outcome:', error);
      toast.error('Failed to update outcome');
    }
  };

  const markAsFollowUp = async (customer) => {
    try {
      await api.patch(`/admin/contact-submissions/${customer.id}`, null, {
        params: { status: 'Follow Up' }
      });
      toast.success('Status updated to Follow Up');
      await fetchDashboardData();
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status');
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
          <TabsList className="grid w-full grid-cols-10 bg-[#1a1a1a] border-[#301B3F]">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Overview</TabsTrigger>
            <TabsTrigger value="leads" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Leads</TabsTrigger>
            <TabsTrigger value="customers" className="data-[state=active]:bg-[#910A67] data-[state=active]:text-white text-gray-300">Customers</TabsTrigger>
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
                <Badge variant="secondary" className="bg-[#301B3F] text-white">{leads.filter(l => l.status?.toLowerCase() === 'new').length} new</Badge>
                <Button
                  className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455]"
                  onClick={() => setShowAddLeadDialog(true)}
                >
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
                          Type
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
                            {lead.submission_type || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white"
                                onClick={() => {
                                  setSelectedLead(lead);
                                  setShowViewDialog(true);
                                }}
                              >
                                View
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white"
                                disabled={qualifyingId === lead.id}
                                onClick={async () => {
                                  setQualifyingId(lead.id);

                                  // Update UI immediately
                                  setLeads(prev => prev.map(item =>
                                    item.id === lead.id ? { ...item, status: 'Qualified' } : item
                                  ));

                                  try {
                                    await api.post(`/admin/contact-submissions/${lead.id}/qualify`);
                                    toast.success('Lead qualified successfully');
                                    await fetchDashboardData();
                                  } catch (error) {
                                    console.error('Failed to qualify lead:', error);
                                    toast.error('Failed to qualify lead');
                                  } finally {
                                    setQualifyingId(null);
                                  }
                                }}
                              >
                                {qualifyingId === lead.id ? 'Qualifying…' : 'Qualify'}
                              </Button>
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

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Customers</h2>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-[#301B3F] text-white">{customers.filter(c => c.status?.toLowerCase() === 'qualified').length} total</Badge>
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
                          Source
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
                      {customers.map((customer) => (
                        <tr key={customer.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-3">
                                <AvatarFallback className="bg-[#301B3F] text-white">
                                  {customer.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-sm font-medium text-white">{customer.name}</div>
                                <div className="text-sm text-gray-400">{customer.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {customer.company}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={getLeadStatusVariant(customer.status)} className="bg-[#301B3F] text-white">
                              {customer.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {customer.source || customer.submission_type || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {customer.created_at ? new Date(customer.created_at).toLocaleDateString() : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex flex-wrap gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white"
                                onClick={() => openMeetingsDialog(customer)}
                              >
                                Meetings
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white"
                                onClick={() => markAsFollowUp(customer)}
                              >
                                Follow Up
                              </Button>
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

        {/* View Lead Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Lead Details</DialogTitle>
              <DialogDescription>
                Review contact submission information and status.
              </DialogDescription>
            </DialogHeader>

            {selectedLead ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Name</label>
                    <p className="text-white">{selectedLead.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{selectedLead.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Phone</label>
                    <p className="text-white">
                      {selectedLead.phone || 'N/A'}
                      {selectedLead.country ? ` (${selectedLead.country}${getCountryNameFromCodeOrDial(selectedLead.country) ? ` — ${getCountryNameFromCodeOrDial(selectedLead.country)}` : ''})` : ''}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Company</label>
                    <p className="text-white">{selectedLead.company || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Status</label>
                    <p className="text-white">{selectedLead.status}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Type</label>
                    <p className="text-white">{selectedLead.submission_type || '-'}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Message</label>
                  <p className="text-white mt-1 p-3 bg-[#252525] rounded border border-gray-800">
                    {selectedLead.message || 'No message provided.'}
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button variant="secondary" onClick={() => setShowViewDialog(false)}>
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No lead selected.</p>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Lead Dialog */}
        <Dialog open={showAddLeadDialog} onOpenChange={setShowAddLeadDialog}>
          <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>
                Create a new lead by submitting a contact request.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Name</label>
                  <input
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    className="w-full px-3 py-2 mt-1 bg-[#151515] border border-gray-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <input
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    className="w-full px-3 py-2 mt-1 bg-[#151515] border border-gray-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Phone</label>
                  <input
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    className="w-full px-3 py-2 mt-1 bg-[#151515] border border-gray-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Country Code</label>
                  <Select
                    value={newLead.country}
                    onValueChange={(value) => setNewLead({ ...newLead, country: value })}
                    onOpenChange={(open) => {
                      setCountryOpen(open);
                      if (!open) setCountrySearch('');
                    }}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border border-gray-800 text-white max-h-64 overflow-y-auto">
                      <div className="px-2 pt-2">
                        <input
                          ref={countrySearchInputRef}
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          placeholder="Type to search..."
                          className="w-full bg-[#1a1a1a] border border-gray-700 rounded px-2 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#910A67]"
                        />
                      </div>
                      {filteredCountries.map((country) => (
                        <SelectItem
                          key={country.code}
                          value={country.code}
                          className="bg-[#1a1a1a] text-white focus:bg-[#910A67] focus:text-white data-[state=checked]:bg-[#910A67] data-[state=checked]:text-white"
                        >
                          {country.dialCode} {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-400 mt-2">
                    {getDialCodeFromCountry(newLead.country)}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Company</label>
                  <input
                    value={newLead.company}
                    onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                    className="w-full px-3 py-2 mt-1 bg-[#151515] border border-gray-700 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">Message</label>
                <textarea
                  value={newLead.message}
                  onChange={(e) => setNewLead({ ...newLead, message: e.target.value })}
                  className="w-full px-3 py-2 mt-1 bg-[#151515] border border-gray-700 rounded text-white"
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setShowAddLeadDialog(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    try {
                      const countryDialCode = getDialCodeFromCountry(newLead.country);
                      const phoneWithDialCode = getPhoneWithDialCode(newLead.country, newLead.phone);

                      await api.post('/contact', {
                        submission_type: 'general',
                        ...newLead,
                        country: countryDialCode,
                        phone: phoneWithDialCode,
                        status: 'new'
                      });
                      toast.success('Lead created');
                      setShowAddLeadDialog(false);
                      setNewLead({
                        name: '',
                        email: '',
                        phone: '',
                        country: COUNTRIES[0]?.code || '',
                        company: '',
                        message: ''
                      });
                      await fetchDashboardData();
                    } catch (error) {
                      console.error('Failed to create lead', error);
                      toast.error('Failed to create lead');
                    }
                  }}
                >
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Meetings Dialog */}
        <Dialog open={showMeetingsDialog} onOpenChange={setShowMeetingsDialog}>
          <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Meetings for {selectedCustomerForMeetings?.name}</DialogTitle>
              <DialogDescription>
                Create and manage meetings for this customer.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Title</label>
                  <input
                    value={meetingForm.title}
                    onChange={(e) => setMeetingForm({ ...meetingForm, title: e.target.value })}
                    className="w-full px-3 py-2 mt-1 bg-[#151515] border border-gray-700 rounded text-white"
                    placeholder="Meeting title"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Date & Time</label>
                  <input
                    type="datetime-local"
                    value={meetingForm.meeting_date}
                    onChange={(e) => setMeetingForm({ ...meetingForm, meeting_date: e.target.value })}
                    className="w-full px-3 py-2 mt-1 bg-[#151515] border border-gray-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Duration (minutes)</label>
                  <input
                    type="number"
                    value={meetingForm.duration_minutes}
                    onChange={(e) => setMeetingForm({ ...meetingForm, duration_minutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 mt-1 bg-[#151515] border border-gray-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Location</label>
                  <input
                    value={meetingForm.location}
                    onChange={(e) => setMeetingForm({ ...meetingForm, location: e.target.value })}
                    className="w-full px-3 py-2 mt-1 bg-[#151515] border border-gray-700 rounded text-white"
                    placeholder="Zoom link / address"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">Agenda</label>
                <textarea
                  value={meetingForm.agenda}
                  onChange={(e) => setMeetingForm({ ...meetingForm, agenda: e.target.value })}
                  className="w-full px-3 py-2 mt-1 bg-[#151515] border border-gray-700 rounded text-white"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Notes</label>
                <textarea
                  value={meetingForm.notes}
                  onChange={(e) => setMeetingForm({ ...meetingForm, notes: e.target.value })}
                  className="w-full px-3 py-2 mt-1 bg-[#151515] border border-gray-700 rounded text-white"
                  rows={3}
                />
              </div>

              <div className="flex justify-between">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowMeetingsDialog(false);
                    setSelectedCustomerForMeetings(null);
                    setMeetings([]);
                  }}
                >
                  Close
                </Button>
                <Button onClick={createMeeting}>Create Meeting</Button>
              </div>

              {meetings.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Existing Meetings</h3>
                  <div className="space-y-2">
                    {meetings.map((meeting) => (
                      <div key={meeting.id} className="border border-[#301B3F] rounded p-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-sm font-semibold text-white">{meeting.title}</div>
                            <div className="text-xs text-gray-400">
                              {meeting.meeting_date ? new Date(meeting.meeting_date).toLocaleString() : 'No date'} • {meeting.duration_minutes} min
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-[#301B3F] text-gray-300 hover:bg-[#301B3F] hover:text-white"
                              onClick={() => {
                                setSelectedMeetingForOutcome(meeting);
                                setMeetingOutcome(meeting.outcome || '');
                                setMeetingStatus(meeting.status || 'scheduled');
                                setShowMeetingOutcomeDialog(true);
                              }}
                            >
                              Update Outcome
                            </Button>
                          </div>
                        </div>
                        {meeting.notes && (
                          <p className="text-sm text-gray-300 mt-2">Notes: {meeting.notes}</p>
                        )}
                        {meeting.outcome && (
                          <p className="text-sm text-gray-300 mt-1">Outcome: {meeting.outcome}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Meeting Outcome Dialog */}
        <Dialog open={showMeetingOutcomeDialog} onOpenChange={setShowMeetingOutcomeDialog}>
          <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Update Meeting Outcome</DialogTitle>
              <DialogDescription>
                Update the status and outcome for this meeting.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Status</label>
                <select
                  value={meetingStatus}
                  onChange={(e) => setMeetingStatus(e.target.value)}
                  className="w-full px-3 py-2 mt-1 bg-[#151515] border border-gray-700 rounded text-white"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400">Outcome</label>
                <textarea
                  value={meetingOutcome}
                  onChange={(e) => setMeetingOutcome(e.target.value)}
                  className="w-full px-3 py-2 mt-1 bg-[#151515] border border-gray-700 rounded text-white"
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setShowMeetingOutcomeDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={updateMeetingOutcome}>Save Outcome</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

// Helper functions
const getLeadStatusVariant = (status) => {
  const variants = {
    'new': 'secondary',
    'New': 'secondary',
    'contacted': 'default',
    'Contacted': 'default',
    'qualified': 'default',
    'Qualified': 'default',
    'meeting_scheduled': 'default',
    'Proposal Sent': 'default',
    'proposal_sent': 'default',
    'negotiation': 'warning',
    'Negotiation': 'warning',
    'converted': 'default',
    'converted to customer': 'default',
    'Converted to Customer': 'default',
    'follow up': 'warning',
    'Follow Up': 'warning',
    'lost': 'destructive',
    'Lost': 'destructive'
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
