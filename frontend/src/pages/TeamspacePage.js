import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Plus, FolderOpen, MessageSquare, LogOut } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const TeamspacePage = () => {
  const { isAuthenticated, token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [selectedProject, setSelectedProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/quote');
    } else {
      loadProjects();
    }
  }, [isAuthenticated, navigate]);

  const loadProjects = async () => {
    try {
      const response = await axios.get(`${API}/projects`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setProjects(response.data);
    } catch (error) {
      toast.error('Failed to load projects');
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/projects`, newProject, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success('Project created successfully!');
      setShowNewProject(false);
      setNewProject({ name: '', description: '' });
      loadProjects();
    } catch (error) {
      toast.error('Failed to create project');
    }
  };

  const loadComments = async (projectId) => {
    try {
      const response = await axios.get(`${API}/projects/${projectId}/comments`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setComments(response.data);
    } catch (error) {
      toast.error('Failed to load comments');
    }
  };

  const addComment = async () => {
    if (!newComment.trim() || !selectedProject) return;
    
    try {
      await axios.post(
        `${API}/projects/${selectedProject.id}/comments`,
        { text: newComment },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      setNewComment('');
      loadComments(selectedProject.id);
      toast.success('Comment added');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    loadComments(project.id);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#151515' }}>
      <Navbar />
      
      <section className="section" style={{ paddingTop: '120px' }} data-testid="teamspace-section">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <div>
              <h1 className="section-title" style={{ marginBottom: '10px' }} data-testid="teamspace-title">Teamspace</h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Welcome, {user?.name || 'User'}</p>
            </div>
            <button className="btn-secondary" onClick={handleLogout} data-testid="logout-btn">
              <LogOut size={18} style={{ display: 'inline', marginRight: '8px' }} />
              Logout
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '30px' }}>
            {/* Projects Sidebar */}
            <div data-testid="projects-sidebar">
              <div style={{ marginBottom: '20px' }}>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%' }}
                  onClick={() => setShowNewProject(true)}
                  data-testid="new-project-btn"
                >
                  <Plus size={18} style={{ display: 'inline', marginRight: '8px' }} />
                  New Project
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="card"
                    style={{
                      cursor: 'pointer',
                      border: selectedProject?.id === project.id ? '2px solid #910A67' : '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                    onClick={() => handleProjectClick(project)}
                    data-testid={`project-${project.id}`}
                  >
                    <FolderOpen size={24} style={{ color: '#910A67', marginBottom: '10px' }} />
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '5px' }}>{project.name}</h3>
                    <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
                      {project.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Details & Comments */}
            <div data-testid="project-details">
              {selectedProject ? (
                <div className="card">
                  <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '15px' }}>
                    {selectedProject.name}
                  </h2>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '40px' }}>
                    {selectedProject.description}
                  </p>

                  <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '30px'
                  }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
                      <MessageSquare size={20} style={{ display: 'inline', marginRight: '8px' }} />
                      Comments
                    </h3>

                    <div style={{ marginBottom: '20px' }}>
                      {comments.map((comment) => (
                        <div
                          key={comment.id}
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '15px',
                            borderRadius: '10px',
                            marginBottom: '10px'
                          }}
                          data-testid={`comment-${comment.id}`}
                        >
                          <p style={{ fontSize: '12px', color: '#910A67', marginBottom: '5px' }}>
                            {comment.user_name}
                          </p>
                          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{comment.text}</p>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addComment()}
                        style={{ flex: 1 }}
                        data-testid="comment-input"
                      />
                      <button className="btn-primary" onClick={addComment} data-testid="add-comment-btn">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card" style={{ textAlign: 'center', padding: '100px 50px' }}>
                  <FolderOpen size={64} style={{ color: 'rgba(255, 255, 255, 0.3)', margin: '0 auto 20px' }} />
                  <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Select a project to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* New Project Modal */}
      {showNewProject && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} data-testid="new-project-modal">
          <div className="glass" style={{ padding: '40px', maxWidth: '500px', width: '90%' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 600 }}>New Project</h3>
            <form onSubmit={createProject} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input
                type="text"
                placeholder="Project Name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                required
                data-testid="project-name-input"
              />
              <textarea
                placeholder="Project Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                rows="4"
                required
                data-testid="project-description-input"
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }} data-testid="create-project-btn">
                  Create
                </button>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setShowNewProject(false)}
                  style={{ flex: 1 }}
                  data-testid="cancel-project-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamspacePage;
