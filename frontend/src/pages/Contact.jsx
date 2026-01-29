import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle, Headphones, FileText, X, User } from 'lucide-react';
import api from '@/utils/api';
import { toast } from 'sonner';
import { COUNTRIES } from '@/utils/countries';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'IN',
    company: '',
    subject: 'general',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const subjects = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'quote', label: 'Quote Request' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'quality', label: 'Quality & Compliance' },
    { value: 'order', label: 'Order Status' },
    { value: 'partnership', label: 'Partnership Opportunities' }
  ];

  const [showChat, setShowChat] = useState(false);
  const [chatStep, setChatStep] = useState('details'); // 'details' or 'chat'
  const [chatDetails, setChatDetails] = useState({
    name: '',
    email: '',
    subject: 'general'
  });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      primary: '+91 886 735 7592',
      secondary: 'Mon-Fri: 9 AM - 6 PM IST',
      description: 'Speak directly with our team',
      action: () => window.open('tel:+918867357592')
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      primary: 'contact@dexaura.com',
      secondary: 'Response within 24 hours',
      description: 'Send us your requirements',
      action: () => window.open('mailto:contact@dexaura.com')
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Live Chat',
      primary: 'Available Now',
      secondary: 'Average response: 2 minutes',
      description: 'Chat with support team',
      action: () => setShowChat(true)
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      primary: 'Bengaluru, Karnataka',
      secondary: 'India 560001',
      description: 'Schedule a facility tour',
      action: () => navigate('/contact')
    }
  ];

  const departments = [
    {
      icon: <Headphones className="w-8 h-8" />,
      name: 'Sales & Quotes',
      email: 'sales@dexaura.com',
      description: 'Get pricing, lead times, and manufacturing feasibility'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      name: 'Engineering Support',
      email: 'engineering@dexaura.com',
      description: 'DFM feedback, material selection, and process recommendations'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      name: 'Quality & Compliance',
      email: 'quality@dexaura.com',
      description: 'Inspection services, certifications, and documentation'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      name: 'Order Management',
      email: 'orders@dexaura.com',
      description: 'Order status, shipping updates, and delivery tracking'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post('/contact', {
        ...formData,
        submission_type: 'general'
      });
      setSubmitted(true);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', country: 'IN', company: '', subject: 'general', message: '' });
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error('Failed to send message. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
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
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Have questions about our manufacturing capabilities? Need a quote or technical guidance? Our team is here to help you bring your projects to life.
            </p>
          </div>

          {/* Hero Image */}
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-[#301B3F]/30 mb-8">
            <img 
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=500&fit=crop"
              alt="Contact our team"
              className="w-full h-[400px] object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-12 bg-[#0d0d0d]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, idx) => (
              <button
                key={idx}
                onClick={method.action}
                className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-6 hover:border-[#720455] transition-all duration-300 text-left cursor-pointer hover:shadow-lg hover:shadow-[#720455]/20"
                data-testid={`contact-method-${method.title.toLowerCase().replace(' ', '-')}`}
              >
                <div className="text-[#910A67] mb-4">{method.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                <p className="text-white font-medium mb-1">{method.primary}</p>
                <p className="text-gray-400 text-sm mb-2">{method.secondary}</p>
                <p className="text-gray-500 text-xs">{method.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="py-16 bg-[#151515]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Send Us a Message
              </h2>
              <p className="text-gray-300 mb-8">
                Fill out the form below and our team will respond within 24 hours. For urgent inquiries, please call us directly.
              </p>

              {submitted ? (
                <div className="bg-gradient-to-br from-[#301B3F] to-[#720455] rounded-2xl p-8 text-center" data-testid="contact-success">
                  <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-white/90 mb-6">We've received your message and will get back to you shortly.</p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Your full name"
                        className="bg-[#1a1a1a] border-[#301B3F] text-white"
                        data-testid="contact-name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="your.email@company.com"
                        className="bg-[#1a1a1a] border-[#301B3F] text-white"
                        data-testid="contact-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block  font-medium text-gray-300 mb-2">Phone</label>
                      <div className="flex gap-2">
                        <select
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-32 bg-[#1a1a1a] border border-[#301B3F] text-white rounded-lg text-sm"
                          data-testid="contact-country"
                        >
                          {COUNTRIES.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.dialCode} {country.name}
                            </option>
                          ))}
                        </select>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Enter phone number"
                          className="flex-1 bg-[#1a1a1a] border-[#301B3F] text-white"
                          data-testid="contact-phone"
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        {COUNTRIES.find(c => c.code === formData.country)?.dialCode}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your company name"
                        className="bg-[#1a1a1a] border-[#301B3F] text-white"
                        data-testid="contact-company"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="w-full bg-[#1a1a1a] border border-[#301B3F] text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#720455]"
                      data-testid="contact-subject"
                    >
                      {subjects.map((subject) => (
                        <option key={subject.value} value={subject.value}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      placeholder="Tell us about your project, requirements, or questions..."
                      className="bg-[#1a1a1a] border-[#301B3F] text-white"
                      data-testid="contact-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white py-6 rounded-full text-lg font-semibold"
                    data-testid="contact-submit"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              )}
            </div>

            {/* Departments & Location */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Contact by Department
                </h3>
                <div className="space-y-4">
                  {departments.map((dept, idx) => (
                    <div key={idx} className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-6 hover:border-[#720455] transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="text-[#910A67]">{dept.icon}</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-1">{dept.name}</h4>
                          <a href={`mailto:${dept.email}`} className="text-[#910A67] hover:text-white transition-colors mb-2 block">
                            {dept.email}
                          </a>
                          <p className="text-gray-400 text-sm">{dept.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Image & Info */}
              <div className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=400&fit=crop"
                    alt="Bengaluru location"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515] to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-xl font-bold text-white mb-2">Our Location</h4>
                    <p className="text-white/90">Bengaluru, Karnataka, India</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-[#910A67] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">DexAura</p>
                      <p className="text-gray-400 text-sm">Bengaluru, Karnataka 560001</p>
                      <p className="text-gray-400 text-sm">India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#910A67] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Business Hours</p>
                      <p className="text-gray-400 text-sm">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                      <p className="text-gray-400 text-sm">Saturday: 10:00 AM - 2:00 PM IST</p>
                      <p className="text-gray-400 text-sm">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300">Quick answers to common questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { q: 'What file formats do you accept?', a: 'STEP, STL, IGES, Solidworks, and all major CAD formats' },
              { q: 'What are your lead times?', a: '3-10 days for prototypes, 2-4 weeks for production' },
              { q: 'Do you offer NDA protection?', a: 'Yes, we sign NDAs to protect your intellectual property' },
              { q: 'What is your minimum order quantity?', a: 'No minimum - from single prototypes to 10,000+ units' },
              { q: 'Which industries do you serve?', a: 'Aerospace, automotive, medical, robotics, electronics, industrial' },
              { q: 'Do you ship internationally?', a: 'Yes, we ship worldwide with full tracking and insurance' }
            ].map((faq, idx) => (
              <div key={idx} className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-6">
                <h4 className="text-white font-semibold mb-2">{faq.q}</h4>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Chat Modal */}
      <LiveChatModal 
        showChat={showChat}
        setShowChat={setShowChat}
        chatStep={chatStep}
        setChatStep={setChatStep}
        chatDetails={chatDetails}
        setChatDetails={setChatDetails}
        messages={messages}
        setMessages={setMessages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </div>
  );
};

// Live Chat Modal Component
const LiveChatModal = ({ 
  showChat, 
  setShowChat, 
  chatStep, 
  setChatStep, 
  chatDetails, 
  setChatDetails,
  messages,
  setMessages,
  newMessage,
  setNewMessage
}) => {
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStartChat = (e) => {
    e.preventDefault();
    if (chatDetails.name && chatDetails.email) {
      setChatStep('chat');
      // Add welcome message
      setMessages([
        {
          id: 1,
          sender: 'admin',
          text: `Hello ${chatDetails.name}! Welcome to DexAura Manufacturing. How can I help you today?`,
          timestamp: new Date().toISOString()
        }
      ]);
      toast.success('Connected to support team!');
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: newMessage,
        timestamp: new Date().toISOString()
      };
      
      setMessages([...messages, userMessage]);
      setNewMessage('');
      
      // Simulate admin typing
      setIsTyping(true);
      
      // Simulate admin response after 2-3 seconds
      setTimeout(() => {
        setIsTyping(false);
        const adminResponse = getAutoResponse(newMessage);
        const adminMessage = {
          id: messages.length + 2,
          sender: 'admin',
          text: adminResponse,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, adminMessage]);
      }, 2000 + Math.random() * 1000);
    }
  };

  const getAutoResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('quote') || lowerMsg.includes('price') || lowerMsg.includes('cost')) {
      return "I can help you with that! You can get an instant quote by uploading your CAD files at our Instant Quote page. Would you like me to guide you through the process?";
    } else if (lowerMsg.includes('lead time') || lowerMsg.includes('delivery') || lowerMsg.includes('how long')) {
      return "Our typical lead times are 3-10 days for prototypes and 2-4 weeks for production runs. For urgent projects, we offer expedited services. What's your timeline?";
    } else if (lowerMsg.includes('material') || lowerMsg.includes('aluminum') || lowerMsg.includes('steel')) {
      return "We work with a wide range of materials including aluminum alloys, stainless steel, carbon steel, titanium, plastics, and more. What material are you considering for your project?";
    } else if (lowerMsg.includes('quality') || lowerMsg.includes('inspection') || lowerMsg.includes('certification')) {
      return "We offer comprehensive inspection services including CMM inspection, First Article Inspection (AS9102), and various certifications (ISO 9001, AS9100D, ISO 13485). What level of inspection do you need?";
    } else if (lowerMsg.includes('cnc') || lowerMsg.includes('machining')) {
      return "We offer precision CNC machining with tolerances down to ±0.002\". We handle 3-axis, 4-axis, and 5-axis milling, as well as CNC turning. What type of parts are you looking to manufacture?";
    } else if (lowerMsg.includes('3d print') || lowerMsg.includes('additive')) {
      return "We provide FDM, SLA, and SLS/MJF 3D printing services with over 100 materials available. Typical turnaround is 1-7 days. What's your application?";
    } else if (lowerMsg.includes('thanks') || lowerMsg.includes('thank you')) {
      return "You're welcome! Is there anything else I can help you with today?";
    } else if (lowerMsg.includes('bye') || lowerMsg.includes('goodbye')) {
      return "Thank you for chatting with us! Feel free to reach out anytime. Have a great day!";
    } else {
      return "Thank you for your message. One of our engineering specialists will review your inquiry and provide detailed information. In the meantime, you can explore our capabilities at dexaura.com or upload CAD files for instant quoting. Is there anything specific you'd like to know right now?";
    }
  };

  const handleCloseChat = () => {
    setShowChat(false);
    // Reset after animation
    setTimeout(() => {
      setChatStep('details');
      setMessages([]);
      setNewMessage('');
      setChatDetails({ name: '', email: '', subject: 'general' });
    }, 300);
  };

  return (
    <Dialog open={showChat} onOpenChange={handleCloseChat}>
      <DialogContent className="bg-[#1a1a1a] border-[#301B3F] max-w-md p-0 gap-0" data-testid="live-chat-modal">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#720455] to-[#910A67] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Live Chat Support</h3>
              <p className="text-white/80 text-xs">Typically responds in 2 minutes</p>
            </div>
          </div>
          <button 
            onClick={handleCloseChat}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            data-testid="close-chat-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {chatStep === 'details' ? (
          <div className="p-6">
            <h4 className="text-white font-semibold mb-2">Start a conversation</h4>
            <p className="text-gray-400 text-sm mb-6">Please provide your details to begin chatting with our team.</p>
            
            <form onSubmit={handleStartChat} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                <Input
                  value={chatDetails.name}
                  onChange={(e) => setChatDetails({ ...chatDetails, name: e.target.value })}
                  required
                  placeholder="Your name"
                  className="bg-[#151515] border-[#301B3F] text-white"
                  data-testid="chat-name-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <Input
                  type="email"
                  value={chatDetails.email}
                  onChange={(e) => setChatDetails({ ...chatDetails, email: e.target.value })}
                  required
                  placeholder="your.email@company.com"
                  className="bg-[#151515] border-[#301B3F] text-white"
                  data-testid="chat-email-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">What can we help with?</label>
                <select
                  value={chatDetails.subject}
                  onChange={(e) => setChatDetails({ ...chatDetails, subject: e.target.value })}
                  className="w-full bg-[#151515] border border-[#301B3F] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#720455]"
                  data-testid="chat-subject-select"
                >
                  <option value="general">General Inquiry</option>
                  <option value="quote">Quote Request</option>
                  <option value="technical">Technical Support</option>
                  <option value="quality">Quality & Compliance</option>
                  <option value="order">Order Status</option>
                </select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white py-6 rounded-full font-semibold"
                data-testid="start-chat-btn"
              >
                Start Chat
                <MessageSquare className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col h-[500px]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" data-testid="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' ? 'bg-[#720455]' : 'bg-[#301B3F]'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Headphones className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div>
                      <div className={`rounded-2xl px-4 py-2.5 ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-[#720455] to-[#910A67] text-white' 
                          : 'bg-[#151515] text-gray-300'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-2">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#301B3F]">
                      <Headphones className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-[#151515] rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-[#301B3F] p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="bg-[#151515] border-[#301B3F] text-white flex-1"
                  data-testid="chat-message-input"
                />
                <Button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white rounded-full px-6"
                  data-testid="send-message-btn"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Connected as {chatDetails.name}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Contact;
