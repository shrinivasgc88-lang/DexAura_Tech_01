import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Textarea } from '@/components/ui/textarea';
import { Search, Phone, Mail, Building2, MessageSquare } from 'lucide-react';

const ContactsModule = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [followUpNote, setFollowUpNote] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await api.get('/admin/contact-submissions');
      setContacts(response.data.submissions || []);
    } catch (error) {
      toast.error('Failed to load contact submissions');
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    const colors = {
      'new': 'bg-blue-500',
      'contacted': 'bg-yellow-500',
      'converted': 'bg-green-500',
      'closed': 'bg-gray-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const handleMarkAsContacted = async (contactId) => {
    try {
      await api.patch(`/admin/contact-submissions/${contactId}`, null, {
        params: { status: 'contacted' }
      });
      toast.success('Marked as contacted');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleConvertToLead = async (contact) => {
    try {
      const leadData = {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        source: 'contact_form',
        status: 'New',
        contact_submission_id: contact.id,
        notes: contact.message
      };
      
      await api.post('/admin/leads', leadData);
      toast.success('Successfully converted to lead!');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to convert to lead');
    }
  };

  if (loading) {
    return (
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardContent className="p-8 text-center text-gray-400">
          Loading contacts...
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Contact Form Submissions</span>
            <span className="text-sm text-gray-400 font-normal">
              {filteredContacts.length} submission(s)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#252525] border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="rounded-md border border-gray-800 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-[#252525]">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Contact</TableHead>
                  <TableHead className="text-gray-400">Company</TableHead>
                  <TableHead className="text-gray-400">Type</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-400 py-8">
                      No contact submissions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContacts.map((contact) => (
                    <TableRow key={contact.id} className={`border-gray-800 hover:bg-[#252525] ${contact.status === 'new' ? 'bg-blue-900/20' : ''}`}>
                      <TableCell className="text-white font-medium relative">
                        {contact.status === 'new' && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                        <span className={contact.status === 'new' ? 'ml-4' : ''}>
                          {contact.name}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-300">
                            <Mail className="h-3 w-3 mr-1" />
                            {contact.email}
                          </div>
                          {contact.phone && (
                            <div className="flex items-center text-sm text-gray-400">
                              <Phone className="h-3 w-3 mr-1" />
                              {contact.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {contact.company || '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {contact.submission_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(contact.status)}>
                          {contact.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-400 text-sm">
                        {new Date(contact.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-[#910A67] hover:text-white"
                            onClick={() => setSelectedContact(contact)}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {contact.status === 'new' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-yellow-600 text-yellow-500 hover:bg-yellow-600 hover:text-white"
                              onClick={() => handleMarkAsContacted(contact.id)}
                            >
                              Mark Contacted
                            </Button>
                          )}
                          <Button
                            size="sm"
                            className="bg-[#910A67] hover:bg-[#7a0856]"
                            onClick={() => handleConvertToLead(contact)}
                          >
                            Convert to Lead
                          </Button>
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

      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Name</label>
                  <p className="text-white font-medium">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <p className="text-white">{selectedContact.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Phone</label>
                  <p className="text-white">{selectedContact.phone || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Company</label>
                  <p className="text-white">{selectedContact.company || 'N/A'}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Message</label>
                <p className="text-white mt-1 p-3 bg-[#252525] rounded border border-gray-800">
                  {selectedContact.message}
                </p>
              </div>
              {selectedContact.monthly_volume && (
                <div>
                  <label className="text-sm text-gray-400">Monthly Volume</label>
                  <p className="text-white">{selectedContact.monthly_volume}</p>
                </div>
              )}
              <div>
                <label className="text-sm text-gray-400 block mb-2">Add Follow-up Note</label>
                <Textarea
                  placeholder="Add notes about follow-up actions..."
                  value={followUpNote}
                  onChange={(e) => setFollowUpNote(e.target.value)}
                  className="bg-[#252525] border-gray-700 text-white"
                  rows={3}
                />
                <Button
                  className="mt-2 bg-[#910A67] hover:bg-[#7a0856]"
                  onClick={() => {
                    toast.success('Follow-up note saved');
                    setFollowUpNote('');
                  }}
                >
                  Save Note
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactsModule;
