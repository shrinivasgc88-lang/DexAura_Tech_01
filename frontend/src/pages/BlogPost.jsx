import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, Tag, Share2, Facebook, Twitter, Linkedin, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/utils/api';
import { toast } from 'sonner';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryImages = {
    'CNC Machining': [
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1565114925726-28c3e671fa5f?w=800&h=500&fit=crop'
    ],
    'Sheet Metals': [
      'https://images.unsplash.com/photo-1565114925726-28c3e671fa5f?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop'
    ],
    '3D Printing': [
      'https://images.unsplash.com/photo-1612832021824-601a4dc8f9a7?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop'
    ],
    'Special Process': [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1565114925726-28c3e671fa5f?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop'
    ]
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/blog/posts/${slug}`);
        setPost(response.data);
        
        // Fetch related posts
        const allPosts = await api.get('/blog/posts');
        const related = allPosts.data
          .filter(p => p.category === response.data.category && p.slug !== slug)
          .slice(0, 3);
        setRelatedPosts(related);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        toast.error('Blog post not found');
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug, navigate]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title || '';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email: `mailto:?subject=${title}&body=Check out this article: ${url}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  // Parse content to add images at strategic points
  const renderContent = () => {
    if (!post) return null;

    const images = categoryImages[post.category] || categoryImages['CNC Machining'];
    const sections = post.content.split('##').filter(s => s.trim());
    
    return (
      <div className="space-y-8">
        {sections.map((section, idx) => {
          const lines = section.trim().split('\n');
          const heading = lines[0];
          const content = lines.slice(1).join('\n');
          
          return (
            <div key={idx}>
              {heading && (
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 mt-8">
                  {heading}
                </h2>
              )}
              
              {content.split('\n\n').map((paragraph, pidx) => {
                if (paragraph.trim().startsWith('###')) {
                  return (
                    <h3 key={pidx} className="text-xl font-semibold text-white mb-3 mt-6">
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  );
                } else if (paragraph.trim().startsWith('-')) {
                  const items = paragraph.split('\n').filter(l => l.trim().startsWith('-'));
                  return (
                    <ul key={pidx} className="space-y-2 mb-4">
                      {items.map((item, iidx) => (
                        <li key={iidx} className="flex items-start gap-3 text-gray-300">
                          <CheckCircle className="w-5 h-5 text-[#910A67] mt-0.5 flex-shrink-0" />
                          <span>{item.replace('-', '').trim()}</span>
                        </li>
                      ))}
                    </ul>
                  );
                } else if (paragraph.trim()) {
                  return (
                    <p key={pidx} className="text-gray-300 leading-relaxed mb-4 text-lg">
                      {paragraph.trim()}
                    </p>
                  );
                }
                return null;
              })}
              
              {/* Add image after every 2 sections */}
              {idx > 0 && idx % 2 === 0 && images[Math.floor(idx / 2) % images.length] && (
                <div className="my-8 rounded-xl overflow-hidden border border-[#301B3F]/30">
                  <img 
                    src={images[Math.floor(idx / 2) % images.length]}
                    alt={`${post.category} illustration`}
                    className="w-full h-80 object-cover"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#151515] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#910A67]"></div>
      </div>
    );
  }

  if (!post) return null;

  const images = categoryImages[post.category] || categoryImages['CNC Machining'];

  return (
    <div className="min-h-screen bg-[#151515]">
{/* Floating back control (native button so SVG sizing isn't constrained) */}
  <button
    type="button"
    aria-label="Back to blog"
    data-testid="back-btn"
    onClick={() => navigate('/blog')}
    className="fixed left-4 sm:left-10 top-1/2 -translate-y-1/2 z-50 p-0 bg-transparent border-none text-[#720455] hover:opacity-90 transition-transform duration-200 animate-bounce-container"
    style={{ animationDelay: '0s' }}
  >
    <ArrowLeft className="w-18 h-18 sm:w-16 sm:h-16 text-[#720455] animate-bounce" style={{ animationDirection: 'reverse', animationDelay: '0s' }} />
  </button>

      <style>{`
        @keyframes slideLeft {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-12px); }
        }
        .animate-bounce-container { animation: slideLeft 1.5s infinite; }
        @keyframes bounceArrow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-12px); }
        }
        .animate-bounce { animation: bounceArrow 1.5s infinite; }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block bg-gradient-to-r from-[#720455] to-[#910A67] text-white px-4 py-2 rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatDate(post.published_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{post.read_time_minutes} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">By {post.author}</span>
            </div>
          </div>

          {/* Summary */}
          <p className="text-xl text-gray-300 leading-relaxed mb-8 pb-8 border-b border-[#301B3F]/30">
            {post.summary}
          </p>

          {/* Share Buttons */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-gray-400 text-sm">Share:</span>
            <button
              onClick={() => handleShare('facebook')}
              className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#301B3F]/30 flex items-center justify-center hover:border-[#720455] transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#301B3F]/30 flex items-center justify-center hover:border-[#720455] transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#301B3F]/30 flex items-center justify-center hover:border-[#720455] transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => handleShare('email')}
              className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#301B3F]/30 flex items-center justify-center hover:border-[#720455] transition-colors"
              aria-label="Share via Email"
            >
              <Mail className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={copyLink}
              className="px-4 h-10 rounded-full bg-[#1a1a1a] border border-[#301B3F]/30 flex items-center gap-2 hover:border-[#720455] transition-colors"
            >
              <Share2 className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Copy Link</span>
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mb-12">
          <div className="rounded-2xl overflow-hidden border border-[#301B3F]/30">
            <img 
              src={images[0]}
              alt={post.title}
              className="w-full h-[500px] object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <article className="prose prose-invert prose-lg max-w-none">
            {renderContent()}
          </article>
        </div>
      </section>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex flex-wrap gap-3">
              <span className="text-gray-400 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tags:
              </span>
              {post.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="bg-[#1a1a1a] border border-[#301B3F]/30 text-gray-300 px-4 py-2 rounded-full text-sm hover:border-[#720455] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-gradient-to-r from-[#301B3F] via-[#720455] to-[#910A67] rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Ready to Start Your Project?</h3>
            <p className="text-white/90 mb-6">
              Put these insights into action with our instant quoting system
            </p>
            <Button
              onClick={() => navigate('/instant-quote')}
              className="bg-white text-[#720455] hover:bg-gray-100 px-8 py-6 rounded-full font-semibold"
            >
              Get Instant Quote <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-[#0d0d0d]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h2 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                  className="group cursor-pointer"
                >
                  <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl overflow-hidden hover:border-[#720455] transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={categoryImages[relatedPost.category]?.[0] || images[0]}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <span className="text-[#910A67] text-sm font-semibold mb-2">
                        {relatedPost.category}
                      </span>
                      
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#910A67] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-2">
                        {relatedPost.summary}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-[#301B3F]/30">
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                          <Clock className="w-3 h-3" />
                          <span>{relatedPost.read_time_minutes} min</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#910A67] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
