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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, FolderKanban, Package } from 'lucide-react';

const ProjectsModule = () => {
  const [projects, setProjects] = useState([]);
  const [parts, setParts] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const statusOptions = ['Quoting', 'Approved', 'In Production', 'Quality Check', 'Shipped', 'Completed', 'On Hold'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/admin/projects');
      setProjects(response.data.projects || []);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectParts = async (projectId) => {
    try {
      const response = await api.get(`/admin/projects/${projectId}/parts`);
      setParts(prev => ({ ...prev, [projectId]: response.data }));
    } catch (error) {
      toast.error('Failed to load project parts');
    }
  };

  const handleUpdateStatus = async (projectId, newStatus) => {
    try {
      await api.patch(`/admin/projects/${projectId}`, { status: newStatus });
      toast.success('Project status updated');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const openProjectDetails = async (project) => {
    setSelectedProject(project);
    await fetchProjectParts(project.id);
    setShowDetails(true);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.project_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.project_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      'Quoting': 'bg-blue-500',
      'Approved': 'bg-green-500',
      'In Production': 'bg-yellow-500',
      'Quality Check': 'bg-orange-500',
      'Shipped': 'bg-purple-500',
      'Completed': 'bg-emerald-500',
      'On Hold': 'bg-gray-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getPartStatusColor = (status) => {
    const colors = {
      'Pending Assignment': 'bg-blue-500',
      'Assigned to Supplier': 'bg-purple-500',
      'In Production': 'bg-yellow-500',
      'Quality Check': 'bg-orange-500',
      'Completed': 'bg-green-500',
      'Rejected': 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  if (loading) {
    return <Card className="bg-[#1a1a1a] border-gray-800"><CardContent className="p-8 text-center text-gray-400">Loading projects...</CardContent></Card>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span className="flex items-center">
              <FolderKanban className="h-5 w-5 mr-2" />
              Projects & Parts Management
            </span>
            <span className="text-sm text-gray-400 font-normal">
              {filteredProjects.length} project(s)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects..."
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
                  <TableHead className="text-gray-400">Project #</TableHead>
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Value</TableHead>
                  <TableHead className="text-gray-400">Target Date</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                      No projects found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProjects.map((project) => (
                    <TableRow key={project.id} className="border-gray-800 hover:bg-[#252525]">
                      <TableCell className="text-white font-mono">
                        {project.project_number}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-white font-medium">{project.project_name}</p>
                          {project.description && (
                            <p className="text-sm text-gray-400">{project.description}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={project.status}
                          onValueChange={(value) => handleUpdateStatus(project.id, value)}
                        >
                          <SelectTrigger className="w-[160px] bg-transparent border-none">
                            <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
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
                        ${project.total_value?.toLocaleString() || '0'}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {project.target_delivery_date
                          ? new Date(project.target_delivery_date).toLocaleDateString()
                          : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-[#910A67] hover:text-white"
                          onClick={() => openProjectDetails(project)}
                        >
                          View Parts
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

      {/* Project Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              {selectedProject?.project_name} - Parts
            </DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 p-4 bg-[#252525] rounded border border-gray-800">
                <div>
                  <label className="text-sm text-gray-400">Project Number</label>
                  <p className="text-white font-mono">{selectedProject.project_number}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Total Value</label>
                  <p className="text-white">${selectedProject.total_value?.toLocaleString() || '0'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Status</label>
                  <Badge className={getStatusColor(selectedProject.status)}>
                    {selectedProject.status}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Project Parts</h3>
                {parts[selectedProject.id]?.length > 0 ? (
                  <div className="rounded-md border border-gray-800 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-800">
                          <TableHead className="text-gray-400">Part #</TableHead>
                          <TableHead className="text-gray-400">Name</TableHead>
                          <TableHead className="text-gray-400">Qty</TableHead>
                          <TableHead className="text-gray-400">Material</TableHead>
                          <TableHead className="text-gray-400">Process</TableHead>
                          <TableHead className="text-gray-400">Status</TableHead>
                          <TableHead className="text-gray-400">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {parts[selectedProject.id].map((part) => (
                          <TableRow key={part.id} className="border-gray-800">
                            <TableCell className="text-white font-mono">{part.part_number}</TableCell>
                            <TableCell>
                              <div>
                                <p className="text-white font-medium">{part.part_name}</p>
                                {part.description && (
                                  <p className="text-sm text-gray-400">{part.description}</p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-300">{part.quantity}</TableCell>
                            <TableCell className="text-gray-300">{part.material || 'N/A'}</TableCell>
                            <TableCell className="text-gray-300">{part.process || 'N/A'}</TableCell>
                            <TableCell>
                              <Badge className={getPartStatusColor(part.status)} className="text-xs">
                                {part.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-300">
                              ${part.total_price?.toLocaleString() || '0'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No parts found for this project</p>
                )}
              </div>

              {selectedProject.notes && (
                <div>
                  <label className="text-sm text-gray-400">Project Notes</label>
                  <p className="text-white mt-1 p-3 bg-[#252525] rounded border border-gray-800">
                    {selectedProject.notes}
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

export default ProjectsModule;
