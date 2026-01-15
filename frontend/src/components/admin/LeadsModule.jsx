import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Plus, TrendingUp, Calendar, Phone, Mail } from 'lucide-react';

const LeadsModule = () => {
  const [leads, setLeads] = useState([]);
  const [followups, setFollowups] = useState({});
  const [meetings, setMeetings] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showConvertDialog, setShowConvertDialog] = useState(false);

  const statusOptions = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Converted to Customer', 'Lost', 'On Hold'];

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await api.get('/admin/leads');
      setLeads(response.data.leads || []);
    } catch (error) {
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const fetchLeadDetails = async (leadId) => {
    try {
      const [followupsRes, meetingsRes] = await Promise.all([
        api.get(`/admin/leads/${leadId}/followups`),
        api.get(`/admin/meetings?lead_id=${leadId}`)
      ]);
      setFollowups(prev => ({ ...prev, [leadId]: followupsRes.data }));
      setMeetings(prev => ({ ...prev, [leadId]: meetingsRes.data }));
    } catch (error) {
      toast.error('Failed to load lead details');
    }
  };

  const handleUpdateStatus = async (leadId, newStatus) => {
    try {
      await api.patch(`/admin/leads/${leadId}`, null, {
        params: { status: newStatus }
      });
      toast.success('Lead status updated');
      fetchLeads();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleConvertToCustomer = async (lead) => {
    try {
      const customerData = {
        email: lead.email,
        name: lead.name,
        phone: lead.phone,
        company: lead.company
      };
      await api.post(`/admin/leads/${lead.id}/convert`, customerData);
      toast.success('Lead converted to customer!');
      setShowConvertDialog(false);
      fetchLeads();
    } catch (error) {
      toast.error('Failed to convert lead');
    }
  };

  const openLeadDetails = async (lead) => {
    setSelectedLead(lead);
    await fetchLeadDetails(lead.id);
    setShowDetails(true);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      'New': 'bg-blue-500',
      'Contacted': 'bg-purple-500',
      'Qualified': 'bg-green-500',
      'Proposal Sent': 'bg-yellow-500',
      'Negotiation': 'bg-orange-500',
      'Converted to Customer': 'bg-emerald-500',
      'Lost': 'bg-red-500',
      'On Hold': 'bg-gray-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  if (loading) {
    return <Card className="bg-[#1a1a1a] border-gray-800"><CardContent className="p-8 text-center text-gray-400">Loading leads...</CardContent></Card>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Leads & CRM
            </span>
            <span className="text-sm text-gray-400 font-normal">
              {filteredLeads.length} lead(s)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#252525] border-gray-700 text-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px] bg-[#252525] border-gray-700 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-[#252525] border-gray-700">
                <SelectItem value="all" className="text-white">All Statuses</SelectItem>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status} className="text-white">{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border border-gray-800 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-[#252525]">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Contact</TableHead>
                  <TableHead className="text-gray-400">Company</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Est. Value</TableHead>
                  <TableHead className="text-gray-400">Source</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-400 py-8">
                      No leads found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="border-gray-800 hover:bg-[#252525]">
                      <TableCell className="text-white font-medium">{lead.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-300">
                            <Mail className="h-3 w-3 mr-1" />
                            {lead.email}
                          </div>
                          {lead.phone && (
                            <div className="flex items-center text-sm text-gray-400">
                              <Phone className="h-3 w-3 mr-1" />
                              {lead.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{lead.company || '-'}</TableCell>
                      <TableCell>
                        <Select
                          value={lead.status}
                          onValueChange={(value) => handleUpdateStatus(lead.id, value)}
                        >
                          <SelectTrigger className="w-[180px] bg-transparent border-none">
                            <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                          </SelectTrigger>
                          <SelectContent className="bg-[#252525] border-gray-700">
                            {statusOptions.map(status => (
                              <SelectItem key={status} value={status} className="text-white">
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {lead.estimated_value ? `$${lead.estimated_value.toLocaleString()}` : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {lead.source}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-[#910A67] hover:text-white"
                            onClick={() => openLeadDetails(lead)}
                          >
                            View Details
                          </Button>
                          {lead.status !== 'Converted to Customer' && (
                            <Button
                              size="sm"
                              className="bg-[#910A67] hover:bg-[#7a0856]"
                              onClick={() => {
                                setSelectedLead(lead);
                                setShowConvertDialog(true);
                              }}
                            >
                              Convert
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Lead Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Lead Details - {selectedLead?.name}</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <p className="text-white">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Phone</label>
                  <p className="text-white">{selectedLead.phone || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Company</label>
                  <p className="text-white">{selectedLead.company || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Estimated Value</label>
                  <p className="text-white">
                    {selectedLead.estimated_value ? `$${selectedLead.estimated_value.toLocaleString()}` : 'N/A'}
                  </p>
                </div>
              </div>

              {selectedLead.notes && (
                <div>
                  <label className="text-sm text-gray-400">Notes</label>
                  <p className="text-white mt-1 p-3 bg-[#252525] rounded border border-gray-800">
                    {selectedLead.notes}
                  </p>
                </div>
              )}

              {/* Follow-ups */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Follow-ups
                </h3>
                {followups[selectedLead.id]?.length > 0 ? (
                  <div className="space-y-2">
                    {followups[selectedLead.id].map((followup) => (
                      <div key={followup.id} className="p-3 bg-[#252525] rounded border border-gray-800">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={followup.completed ? 'bg-green-500' : 'bg-yellow-500'}>
                            {followup.method}
                          </Badge>
                          <span className="text-sm text-gray-400">
                            {new Date(followup.follow_up_date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-white text-sm">{followup.notes}</p>
                        {followup.outcome && (
                          <p className="text-gray-400 text-sm mt-1">Outcome: {followup.outcome}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No follow-ups recorded</p>
                )}
              </div>

              {/* Meetings */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Meetings</h3>
                {meetings[selectedLead.id]?.length > 0 ? (
                  <div className="space-y-2">
                    {meetings[selectedLead.id].map((meeting) => (
                      <div key={meeting.id} className="p-3 bg-[#252525] rounded border border-gray-800">
                        <h4 className="text-white font-medium">{meeting.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">
                          {new Date(meeting.meeting_date).toLocaleString()}
                        </p>
                        {meeting.notes && (
                          <p className="text-white text-sm mt-2">{meeting.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No meetings scheduled</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Convert to Customer Dialog */}
      <Dialog open={showConvertDialog} onOpenChange={setShowConvertDialog}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Convert Lead to Customer</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <p className="text-gray-300">
                Convert <span className="font-semibold text-white">{selectedLead.name}</span> to a customer?
              </p>
              <div className="space-y-2 p-4 bg-[#252525] rounded border border-gray-800">
                <p className="text-sm text-gray-400">Customer Details:</p>
                <p className="text-white">Email: {selectedLead.email}</p>
                <p className="text-white">Company: {selectedLead.company || 'N/A'}</p>
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowConvertDialog(false)}
                  className="border-gray-600 text-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleConvertToCustomer(selectedLead)}
                  className="bg-[#910A67] hover:bg-[#7a0856]"
                >
                  Confirm Conversion
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadsModule;
