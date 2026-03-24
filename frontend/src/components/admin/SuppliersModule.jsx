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
import { Search, Factory, Star, TrendingUp, CheckCircle2 } from 'lucide-react';

const SuppliersModule = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await api.get('/admin/suppliers');
      setSuppliers(response.data || []);
    } catch (error) {
      toast.error('Failed to load suppliers');
    } finally {
      setLoading(false);
    }
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact_person?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.capabilities?.some(cap => cap.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getRatingStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}`}
          />
        ))}
        <span className="text-sm text-gray-300 ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (loading) {
    return <Card className="bg-[#1a1a1a] border-gray-800"><CardContent className="p-8 text-center text-gray-400">Loading suppliers...</CardContent></Card>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span className="flex items-center">
              <Factory className="h-5 w-5 mr-2" />
              Supplier Management
            </span>
            <span className="text-sm text-gray-400 font-normal">
              {filteredSuppliers.length} supplier(s)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search suppliers by name, contact, or capability..."
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
                  <TableHead className="text-gray-400">Company</TableHead>
                  <TableHead className="text-gray-400">Contact</TableHead>
                  <TableHead className="text-gray-400">Capabilities</TableHead>
                  <TableHead className="text-gray-400">Rating</TableHead>
                  <TableHead className="text-gray-400">Performance</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-400 py-8">
                      No suppliers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id} className="border-gray-800 hover:bg-[#252525]">
                      <TableCell>
                        <div>
                          <p className="text-white font-medium">{supplier.company_name}</p>
                          {supplier.address && (
                            <p className="text-sm text-gray-400">{supplier.address}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-white text-sm">{supplier.contact_person}</p>
                          <p className="text-gray-400 text-xs">{supplier.email}</p>
                          {supplier.phone && (
                            <p className="text-gray-400 text-xs">{supplier.phone}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {supplier.capabilities?.slice(0, 2).map((cap, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs border-gray-600 text-gray-300"
                            >
                              {cap}
                            </Badge>
                          ))}
                          {supplier.capabilities?.length > 2 && (
                            <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                              +{supplier.capabilities.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getRatingStars(supplier.rating)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                            <span className="text-gray-300">
                              {supplier.on_time_delivery_rate}% On-Time
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <CheckCircle2 className="h-3 w-3 mr-1 text-blue-500" />
                            <span className="text-gray-300">
                              {supplier.quality_score}% Quality
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={supplier.active ? 'bg-green-500' : 'bg-gray-500'}>
                          {supplier.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-[#910A67] hover:text-white"
                          onClick={() => {
                            setSelectedSupplier(supplier);
                            setShowDetails(true);
                          }}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Supplier Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Factory className="h-5 w-5 mr-2" />
              {selectedSupplier?.company_name}
            </DialogTitle>
          </DialogHeader>
          {selectedSupplier && (
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Contact Person</label>
                  <p className="text-white">{selectedSupplier.contact_person}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <p className="text-white">{selectedSupplier.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Phone</label>
                  <p className="text-white">{selectedSupplier.phone || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Status</label>
                  <Badge className={selectedSupplier.active ? 'bg-green-500' : 'bg-gray-500'}>
                    {selectedSupplier.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>

              {/* Address */}
              {selectedSupplier.address && (
                <div>
                  <label className="text-sm text-gray-400">Address</label>
                  <p className="text-white">{selectedSupplier.address}</p>
                </div>
              )}

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-[#252525] rounded border border-gray-800">
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-1">Rating</p>
                  {getRatingStars(selectedSupplier.rating)}
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-1">On-Time Delivery</p>
                  <p className="text-2xl font-bold text-green-500">
                    {selectedSupplier.on_time_delivery_rate}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-1">Quality Score</p>
                  <p className="text-2xl font-bold text-blue-500">
                    {selectedSupplier.quality_score}%
                  </p>
                </div>
              </div>

              {/* Capabilities */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Capabilities</label>
                <div className="flex flex-wrap gap-2">
                  {selectedSupplier.capabilities?.map((cap, idx) => (
                    <Badge key={idx} className="bg-[#910A67]">
                      {cap}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {selectedSupplier.certifications?.length > 0 && (
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Certifications</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedSupplier.certifications.map((cert, idx) => (
                      <Badge key={idx} variant="outline" className="border-green-500 text-green-500">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedSupplier.notes && (
                <div>
                  <label className="text-sm text-gray-400">Notes</label>
                  <p className="text-white mt-1 p-3 bg-[#252525] rounded border border-gray-800">
                    {selectedSupplier.notes}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuppliersModule;
