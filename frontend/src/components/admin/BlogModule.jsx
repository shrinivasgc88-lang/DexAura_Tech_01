import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
import { Search, FileText, Eye, EyeOff, Plus, Upload, X, ExternalLink } from 'lucide-react';

const BlogModule = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [previewPost, setPreviewPost] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingContentImage, setUploadingContentImage] = useState(false);
  const [contentImages, setContentImages] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'CNC Machining',
    summary: '',
    content: '',
    hero_image: '',
    tags: '',
    read_time_minutes: 8,
    meta_title: '',
    meta_description: '',
    published: false
  });

  useEffect(() => {
    fetchBlogPosts();
  }, [filter]);

  const fetchBlogPosts = async () => {
    try {
      const params = filter === 'all' ? {} : { published: filter === 'published' };
      const response = await api.get('/admin/blog/posts/all', { params });
      setPosts(response.data || []);
    } catch (error) {
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (postId, currentStatus) => {
    try {
      await api.patch(`/admin/blog/posts/${postId}`, {
        published: !currentStatus
      });
      toast.success(currentStatus ? 'Post unpublished' : 'Post published');
      fetchBlogPosts();
    } catch (error) {
      toast.error('Failed to update post status');
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.summary || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const blogData = {
        ...formData,
        tags: tagsArray,
        read_time_minutes: parseInt(formData.read_time_minutes) || 8
      };

      await api.post('/admin/blog/posts', blogData);
      toast.success('Blog post created successfully!');
      setShowCreateDialog(false);
      setFormData({
        title: '',
        category: 'CNC Machining',
        summary: '',
        content: '',
        hero_image: '',
        tags: '',
        read_time_minutes: 8,
        meta_title: '',
        meta_description: '',
        published: false
      });
      fetchBlogPosts();
    } catch (error) {
      toast.error('Failed to create blog post');
      console.error(error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setUploadingImage(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const response = await api.post('/admin/upload-image', formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setFormData(prev => ({ ...prev, hero_image: response.data.image_url }));
        setImageFile(file);
        toast.success('Image uploaded successfully!');
      }
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, hero_image: '' }));
    setImageFile(null);
  };

  const handleContentImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setUploadingContentImage(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const response = await api.post('/admin/upload-image', formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        const newImage = {
          id: response.data.file_id,
          url: response.data.image_url,
          name: response.data.file_name
        };
        setContentImages(prev => [...prev, newImage]);
        toast.success('Image uploaded! Click to copy URL or insert into content.');
      }
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    } finally {
      setUploadingContentImage(false);
    }
  };

  const copyImageUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('Image URL copied to clipboard!');
  };

  const insertImageIntoContent = (url) => {
    const imageMarkdown = `\n\n![Image](${url})\n\n`;
    setFormData(prev => ({
      ...prev,
      content: prev.content + imageMarkdown
    }));
    toast.success('Image inserted into content!');
  };

  const handlePreview = (post) => {
    setPreviewPost(post);
    setShowPreviewDialog(true);
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    try {
      await api.delete(`/admin/blog/posts/${postToDelete.id}`);
      toast.success('Blog post deleted successfully!');
      setShowDeleteDialog(false);
      setPostToDelete(null);
      fetchBlogPosts();
    } catch (error) {
      toast.error('Failed to delete blog post');
      console.error(error);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <Card className="bg-[#1a1a1a] border-gray-800"><CardContent className="p-8 text-center text-gray-400">Loading blog posts...</CardContent></Card>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Blog & Resources Management
            </span>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 font-normal">
                {filteredPosts.length} post(s)
              </span>
              <Button
                className="bg-[#910A67] hover:bg-[#7a0856]"
                onClick={() => setShowCreateDialog(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Blog
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#252525] border-gray-700 text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                className={filter === 'all' ? 'bg-[#910A67]' : 'border-gray-600 text-gray-300'}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'published' ? 'default' : 'outline'}
                className={filter === 'published' ? 'bg-[#910A67]' : 'border-gray-600 text-gray-300'}
                onClick={() => setFilter('published')}
              >
                Published
              </Button>
              <Button
                variant={filter === 'draft' ? 'default' : 'outline'}
                className={filter === 'draft' ? 'bg-[#910A67]' : 'border-gray-600 text-gray-300'}
                onClick={() => setFilter('draft')}
              >
                Drafts
              </Button>
            </div>
          </div>

          <div className="rounded-md border border-gray-800 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-[#252525]">
                  <TableHead className="text-gray-400">Title</TableHead>
                  <TableHead className="text-gray-400">Category</TableHead>
                  <TableHead className="text-gray-400">Tags</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Published Date</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                      No blog posts found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPosts.map((post) => (
                    <TableRow key={post.id} className="border-gray-800 hover:bg-[#252525]">
                      <TableCell>
                        <div>
                          <p className="text-white font-medium">{post.title}</p>
                          {post.summary && (
                            <p className="text-sm text-gray-400 line-clamp-1">{post.summary}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {post.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {post.tags?.slice(0, 2).map((tag, idx) => (
                            <Badge key={idx} className="text-xs bg-[#252525] text-gray-400">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags?.length > 2 && (
                            <Badge className="text-xs bg-[#252525] text-gray-400">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={post.published ? 'bg-green-500' : 'bg-gray-500'}>
                          {post.published ? 'Published' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString()
                          : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-[#910A67] hover:text-white"
                            onClick={() => handlePreview(post)}
                            title="Preview"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-[#910A67] hover:text-white"
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                            title="View on site"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            className={post.published ? 'bg-gray-600 hover:bg-gray-700' : 'bg-[#910A67] hover:bg-[#7a0856]'}
                            onClick={() => handleTogglePublish(post.id, post.published)}
                          >
                            {post.published ? 'Unpublish' : 'Publish'}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteClick(post)}
                            title="Delete"
                          >
                            <X className="h-4 w-4" />
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

      {/* Create Blog Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Create New Blog Post
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateBlog} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Title */}
              <div className="col-span-2">
                <Label className="text-gray-400">Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter blog post title"
                  className="bg-[#252525] border-gray-700 text-white mt-1"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <Label className="text-gray-400">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger className="bg-[#252525] border-gray-700 text-white mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#252525] border-gray-700">
                    <SelectItem value="CNC Machining" className="text-white">CNC Machining</SelectItem>
                    <SelectItem value="Sheet Metals" className="text-white">Sheet Metals</SelectItem>
                    <SelectItem value="3D Printing" className="text-white">3D Printing</SelectItem>
                    <SelectItem value="Special Process" className="text-white">Special Process</SelectItem>
                    <SelectItem value="Industry News" className="text-white">Industry News</SelectItem>
                    <SelectItem value="Case Studies" className="text-white">Case Studies</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Read Time */}
              <div>
                <Label className="text-gray-400">Read Time (minutes)</Label>
                <Input
                  type="number"
                  value={formData.read_time_minutes}
                  onChange={(e) => handleInputChange('read_time_minutes', e.target.value)}
                  placeholder="8"
                  className="bg-[#252525] border-gray-700 text-white mt-1"
                  min="1"
                />
              </div>

              {/* Hero Image Upload */}
              <div className="col-span-2">
                <Label className="text-gray-400">Hero Image</Label>
                <div className="mt-1 space-y-3">
                  {formData.hero_image ? (
                    <div className="relative border border-gray-700 rounded-lg overflow-hidden">
                      <img
                        src={formData.hero_image}
                        alt="Hero preview"
                        className="w-full h-48 object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-gray-600 transition-colors">
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-400">
                          {uploadingImage ? 'Uploading...' : 'Click to upload image'}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          PNG, JPG, WEBP up to 5MB
                        </span>
                      </label>
                    </div>
                  )}
                  <div className="text-xs text-gray-500">
                    Or paste image URL:
                  </div>
                  <Input
                    value={formData.hero_image}
                    onChange={(e) => handleInputChange('hero_image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="bg-[#252525] border-gray-700 text-white"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="col-span-2">
                <Label className="text-gray-400">Summary *</Label>
                <Textarea
                  value={formData.summary}
                  onChange={(e) => handleInputChange('summary', e.target.value)}
                  placeholder="Brief summary of the blog post (2-3 sentences)"
                  className="bg-[#252525] border-gray-700 text-white mt-1"
                  rows={2}
                  required
                />
              </div>

              {/* Content */}
              <div className="col-span-2">
                <Label className="text-gray-400">Content *</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Full blog post content (supports markdown)"
                  className="bg-[#252525] border-gray-700 text-white mt-1"
                  rows={8}
                  required
                />
              </div>

              {/* Additional Images for Content */}
              <div className="col-span-2">
                <Label className="text-gray-400">Additional Images for Content</Label>
                <div className="mt-2 space-y-3">
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-gray-600 transition-colors">
                    <input
                      type="file"
                      id="content-image-upload"
                      accept="image/*"
                      onChange={handleContentImageUpload}
                      className="hidden"
                      disabled={uploadingContentImage}
                    />
                    <label
                      htmlFor="content-image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-6 w-6 text-gray-400 mb-1" />
                      <span className="text-sm text-gray-400">
                        {uploadingContentImage ? 'Uploading...' : 'Upload additional images'}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        Click to add images to your content
                      </span>
                    </label>
                  </div>

                  {contentImages.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400">Uploaded Images (click to insert into content):</p>
                      <div className="grid grid-cols-3 gap-2">
                        {contentImages.map((img) => (
                          <div key={img.id} className="relative group border border-gray-700 rounded overflow-hidden">
                            <img
                              src={img.url}
                              alt={img.name}
                              className="w-full h-24 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-7"
                                onClick={() => insertImageIntoContent(img.url)}
                              >
                                Insert
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-7"
                                onClick={() => copyImageUrl(img.url)}
                              >
                                Copy URL
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="col-span-2">
                <Label className="text-gray-400">Tags (comma-separated)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="e.g., CNC, Machining, Manufacturing"
                  className="bg-[#252525] border-gray-700 text-white mt-1"
                />
              </div>

              {/* Meta Title */}
              <div>
                <Label className="text-gray-400">Meta Title (SEO)</Label>
                <Input
                  value={formData.meta_title}
                  onChange={(e) => handleInputChange('meta_title', e.target.value)}
                  placeholder="SEO title"
                  className="bg-[#252525] border-gray-700 text-white mt-1"
                />
              </div>

              {/* Meta Description */}
              <div>
                <Label className="text-gray-400">Meta Description (SEO)</Label>
                <Input
                  value={formData.meta_description}
                  onChange={(e) => handleInputChange('meta_description', e.target.value)}
                  placeholder="SEO description"
                  className="bg-[#252525] border-gray-700 text-white mt-1"
                />
              </div>

              {/* Published Status */}
              <div className="col-span-2 flex items-center gap-2 p-3 bg-[#252525] rounded border border-gray-800">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => handleInputChange('published', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-700 bg-[#1a1a1a] text-[#910A67] focus:ring-[#910A67]"
                />
                <Label htmlFor="published" className="text-white cursor-pointer">
                  Publish immediately
                </Label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateDialog(false)}
                className="border-gray-600 text-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#910A67] hover:bg-[#7a0856]"
              >
                {formData.published ? 'Create & Publish' : 'Create as Draft'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-red-500">Delete Blog Post</DialogTitle>
          </DialogHeader>
          {postToDelete && (
            <div className="space-y-4">
              <p className="text-gray-300">
                Are you sure you want to delete this blog post? This action cannot be undone.
              </p>
              <div className="p-3 bg-[#252525] rounded border border-gray-800">
                <p className="text-white font-medium">{postToDelete.title}</p>
                <p className="text-sm text-gray-400 mt-1">Category: {postToDelete.category}</p>
                <Badge className={postToDelete.published ? 'bg-green-500 mt-2' : 'bg-gray-500 mt-2'}>
                  {postToDelete.published ? 'Published' : 'Draft'}
                </Badge>
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeleteDialog(false);
                    setPostToDelete(null);
                  }}
                  className="border-gray-600 text-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteConfirm}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete Permanently
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Blog Post Preview
              </span>
              <Badge className={previewPost?.published ? 'bg-green-500' : 'bg-gray-500'}>
                {previewPost?.published ? 'Published' : 'Draft'}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          {previewPost && (
            <div className="space-y-6">
              {/* Hero Image */}
              {previewPost.hero_image && (
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <img
                    src={previewPost.hero_image}
                    alt={previewPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Title */}
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {previewPost.title}
                </h1>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Badge variant="outline" className="border-gray-600">
                    {previewPost.category}
                  </Badge>
                  <span>•</span>
                  <span>{previewPost.read_time_minutes} min read</span>
                  <span>•</span>
                  <span>
                    {new Date(previewPost.published_at || previewPost.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div className="text-lg text-gray-300 italic border-l-4 border-[#910A67] pl-4">
                {previewPost.summary}
              </div>

              {/* Tags */}
              {previewPost.tags && previewPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {previewPost.tags.map((tag, idx) => (
                    <Badge key={idx} className="bg-[#252525] text-gray-400">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Content */}
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {previewPost.content}
                </div>
              </div>

              {/* Meta Info */}
              {(previewPost.meta_title || previewPost.meta_description) && (
                <div className="border-t border-gray-800 pt-6 space-y-2">
                  <p className="text-sm text-gray-500">SEO Information:</p>
                  {previewPost.meta_title && (
                    <div>
                      <span className="text-xs text-gray-500">Meta Title:</span>
                      <p className="text-sm text-gray-400">{previewPost.meta_title}</p>
                    </div>
                  )}
                  {previewPost.meta_description && (
                    <div>
                      <span className="text-xs text-gray-500">Meta Description:</span>
                      <p className="text-sm text-gray-400">{previewPost.meta_description}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-800">
                <Button
                  variant="outline"
                  onClick={() => window.open(`/blog/${previewPost.slug}`, '_blank')}
                  className="border-gray-600 text-gray-300"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Site
                </Button>
                <Button
                  onClick={() => setShowPreviewDialog(false)}
                  className="bg-[#910A67] hover:bg-[#7a0856]"
                >
                  Close Preview
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogModule;
