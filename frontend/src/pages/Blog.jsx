import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight, Calendar, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/utils/api';

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Posts' },
    { value: 'CNC Machining', label: 'CNC Machining' },
    { value: 'Sheet Metals', label: 'Sheet Metals' },
    { value: '3D Printing', label: '3D Printing' },
    { value: 'Special Process', label: 'Special Process' }
  ];

  const categoryImages = {
    'CNC Machining': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop',
    'Sheet Metals': 'https://images.unsplash.com/photo-1565114925726-28c3e671fa5f?w=800&h=500&fit=crop',
    '3D Printing': 'https://images.unsplash.com/photo-1612832021824-601a4dc8f9a7?w=800&h=500&fit=crop',
    'Special Process': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop'
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/blog/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#301B3F]/20 via-transparent to-[#720455]/10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Manufacturing Insights & Resources
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Technical guides, best practices, and industry insights to help you optimize your manufacturing projects. Learn from our engineering expertise.
            </p>
          </div>

          {/* Hero Image */}
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-[#301B3F]/30">
            <img 
              src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1200&h=500&fit=crop"
              alt="Manufacturing resources"
              className="w-full h-[400px] object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-[#0d0d0d] sticky top-[80px] z-40 border-b border-[#301B3F]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? 'bg-gradient-to-r from-[#720455] to-[#910A67] text-white shadow-lg shadow-[#720455]/30'
                    : 'bg-[#1a1a1a] text-gray-300 border border-[#301B3F]/30 hover:border-[#720455]'
                }`}
                data-testid={`category-${category.value}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-[#151515]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#910A67]"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No posts found in this category.</p>
            </div>
          ) : (
            <>
              {/* Featured Post (First Post) */}
              {filteredPosts.length > 0 && (
                <div 
                  onClick={() => navigate(`/blog/${filteredPosts[0].slug}`)}
                  className="mb-12 group cursor-pointer"
                  data-testid="featured-post"
                >
                  <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-2xl overflow-hidden hover:border-[#720455] transition-all duration-300 hover:shadow-xl hover:shadow-[#720455]/20">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative h-80 lg:h-auto overflow-hidden">
                        <img 
                          src={categoryImages[filteredPosts[0].category] || 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop'}
                          alt={filteredPosts[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-[#720455] to-[#910A67] text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                            Featured
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8 lg:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-[#910A67] font-semibold">{filteredPosts[0].category}</span>
                          <span className="text-gray-500">•</span>
                          <div className="flex items-center gap-1 text-gray-400 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{filteredPosts[0].read_time_minutes} min read</span>
                          </div>
                        </div>
                        
                        <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-[#910A67] transition-colors line-clamp-2">
                          {filteredPosts[0].title}
                        </h2>
                        
                        <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">
                          {filteredPosts[0].summary}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(filteredPosts[0].published_at)}</span>
                          </div>
                          
                          <Button
                            variant="ghost"
                            className="text-[#910A67] hover:text-white group-hover:gap-3 transition-all"
                          >
                            Read More <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Rest of Posts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredPosts.slice(1).map((post) => (
                  <div
                    key={post.id}
                    onClick={() => navigate(`/blog/${post.slug}`)}
                    className="group cursor-pointer"
                    data-testid={`blog-post-${post.slug}`}
                  >
                    <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl overflow-hidden hover:border-[#720455] transition-all duration-300 hover:shadow-lg hover:shadow-[#720455]/20 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={categoryImages[post.category] || 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop'}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[#910A67] text-sm font-semibold">{post.category}</span>
                          <span className="text-gray-500">•</span>
                          <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <Clock className="w-3 h-3" />
                            <span>{post.read_time_minutes} min</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#910A67] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                          {post.summary}
                        </p>
                        
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="text-xs bg-[#151515] text-gray-400 px-2 py-1 rounded-full flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between pt-4 border-t border-[#301B3F]/30">
                          <span className="text-gray-500 text-xs">{formatDate(post.published_at)}</span>
                          <ArrowRight className="w-4 h-4 text-[#910A67] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* No Results */}
          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-4">No posts found.</p>
              <Button
                onClick={() => setSelectedCategory('all')}
                className="bg-gradient-to-r from-[#720455] to-[#910A67] text-white rounded-full"
              >
                View All Posts
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-gradient-to-r from-[#301B3F] via-[#720455] to-[#910A67] rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Put these insights into action. Upload your CAD files for instant quoting or contact our engineering team for expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Button
                onClick={() => navigate('/instant-quote')}
                className="bg-white text-[#720455] hover:bg-gray-100 px-8 py-6 rounded-full font-semibold text-lg"
              >
                Get Instant Quote <ArrowRight className="ml-2 w-5 h-5" />
              </Button> */}
              <Button
                onClick={() => navigate('/contact')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-full font-semibold text-lg"
              >
                Contact Engineers
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
