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
import { Search, Link2, Calendar, Package } from 'lucide-react';

const AssignmentsModule = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAssignments, setLoadingAssignments] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await api.get('/admin/suppliers');
      setSuppliers(response.data || []);
      if (response.data?.length > 0) {
        selectSupplier(response.data[0]);
      }
    } catch (error) {
      toast.error('Failed to load suppliers');
    } finally {
      setLoading(false);
    }
  };

  const selectSupplier = async (supplier) => {
    setSelectedSupplier(supplier);
    setLoadingAssignments(true);
    try {
      const response = await api.get(`/admin/suppliers/${supplier.id}/assignments`);
      setAssignments(response.data || []);
    } catch (error) {
      toast.error('Failed to load assignments');
      setAssignments([]);
    } finally {
      setLoadingAssignments(false);
    }
  };

  const getAssignmentTypeColor = (type) => {
    return type === 'project' ? 'bg-purple-500' : 'bg-blue-500';
  };

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-500',
      'completed': 'bg-gray-500',
      'cancelled': 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  if (loading) {
    return <Card className="bg-[#1a1a1a] border-gray-800"><CardContent className="p-8 text-center text-gray-400">Loading assignments...</CardContent></Card>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span className="flex items-center">
              <Link2 className="h-5 w-5 mr-2" />
              Supplier Assignments
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {/* Supplier List */}
            <div className="col-span-1 space-y-2">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Suppliers</h3>
              <div className="space-y-1 max-h-[600px] overflow-y-auto">
                {suppliers.map((supplier) => (
                  <Button
                    key={supplier.id}
                    variant={selectedSupplier?.id === supplier.id ? 'default' : 'ghost'}
                    className={`w-full justify-start text-left ${
                      selectedSupplier?.id === supplier.id
                        ? 'bg-[#910A67] hover:bg-[#7a0856]'
                        : 'text-gray-300 hover:bg-[#252525]'
                    }`}
                    onClick={() => selectSupplier(supplier)}
                  >
                    <div className="truncate">
                      <p className="font-medium truncate">{supplier.company_name}</p>
                      <p className="text-xs opacity-70 truncate">{supplier.contact_person}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Assignments List */}
            <div className="col-span-3">
              {selectedSupplier ? (
                <div>
                  <div className="mb-4 p-4 bg-[#252525] rounded border border-gray-800">
                    <h3 className="text-lg font-semibold text-white">{selectedSupplier.company_name}</h3>
                    <p className="text-sm text-gray-400">{selectedSupplier.contact_person}</p>
                  </div>

                  {loadingAssignments ? (
                    <div className="text-center text-gray-400 py-8">Loading assignments...</div>
                  ) : assignments.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                      No assignments found for this supplier
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {assignments.map((assignment) => (
                        <Card key={assignment.id} className="bg-[#252525] border-gray-700">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className={getAssignmentTypeColor(assignment.assignment_type)}>
                                    {assignment.assignment_type === 'project' ? 'Full Project' : 'Individual Parts'}
                                  </Badge>
                                  <Badge className={getStatusColor(assignment.status)}>
                                    {assignment.status}
                                  </Badge>
                                </div>
                                {assignment.project_details && (
                                  <div className="mb-2">
                                    <p className="text-white font-medium">
                                      {assignment.project_details.project_name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      Project #{assignment.project_details.project_number}
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-400">Assigned</p>
                                <p className="text-white">
                                  {new Date(assignment.assigned_date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>

                            {assignment.parts_details && assignment.parts_details.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-gray-700">
                                <p className="text-sm text-gray-400 mb-2 flex items-center">
                                  <Package className="h-4 w-4 mr-1" />
                                  Parts ({assignment.parts_details.length})
                                </p>
                                <div className="space-y-1">
                                  {assignment.parts_details.slice(0, 3).map((part) => (
                                    <div
                                      key={part.id}
                                      className="flex items-center justify-between text-sm p-2 bg-[#1a1a1a] rounded"
                                    >
                                      <span className="text-white">
                                        {part.part_name} ({part.part_number})
                                      </span>
                                      <span className="text-gray-400">Qty: {part.quantity}</span>
                                    </div>
                                  ))}
                                  {assignment.parts_details.length > 3 && (
                                    <p className="text-xs text-gray-400 text-center">
                                      +{assignment.parts_details.length - 3} more parts
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}

                            {assignment.expected_completion && (
                              <div className="mt-3 flex items-center text-sm text-gray-400">
                                <Calendar className="h-4 w-4 mr-1" />
                                Expected Completion: {new Date(assignment.expected_completion).toLocaleDateString()}
                              </div>
                            )}

                            {assignment.notes && (
                              <div className="mt-3 pt-3 border-t border-gray-700">
                                <p className="text-sm text-gray-400">Notes:</p>
                                <p className="text-white text-sm mt-1">{assignment.notes}</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  Select a supplier to view assignments
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentsModule;
