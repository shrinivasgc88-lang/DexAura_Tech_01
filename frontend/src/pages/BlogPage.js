import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Calendar, User, Tag } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      const response = await axios.get(`${API}/blog`);
      setPosts(response.data);
    } catch (error) {
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#151515' }}>
      <Navbar />
      
      <section className="section" style={{ paddingTop: '120px' }} data-testid="blog-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 className="section-title" data-testid="blog-title">Blog & Resources</h1>
          <p className="section-subtitle">
            Technical articles, design tips, and manufacturing insights from our engineering team.
          </p>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Loading posts...</p>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '30px',
              marginTop: '60px'
            }}>
              {posts.map((post) => (
                <div key={post.id} className="card" data-testid={`blog-post-${post.id}`}>
                  <div style={{
                    background: 'rgba(145, 10, 103, 0.2)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    display: 'inline-block',
                    marginBottom: '15px',
                    fontSize: '12px',
                    border: '1px solid rgba(145, 10, 103, 0.4)'
                  }}>
                    <Tag size={12} style={{ display: 'inline', marginRight: '5px' }} />
                    {post.category}
                  </div>
                  
                  <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '15px' }}>
                    {post.title}
                  </h3>
                  
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, marginBottom: '20px' }}>
                    {post.content}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '15px',
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.5)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <User size={14} />
                      {post.author}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={14} />
                      {formatDate(post.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
              <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>No blog posts available</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
