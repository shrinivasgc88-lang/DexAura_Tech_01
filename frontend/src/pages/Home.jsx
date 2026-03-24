// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { ArrowRight, CheckCircle, Globe, Award, Zap, Users, Factory, Plane, Car, Heart, Cpu, Wrench, Package } from 'lucide-react';
// import api from '@/utils/api';
// import { toast } from 'sonner';

// const Home = () => {
//   const navigate = useNavigate();
//   const [selectedIndustry, setSelectedIndustry] = useState(null);
//   const [hvFormData, setHvFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     company: '',
//     monthly_volume: '',
//     message: ''
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const features = [
//     {
//       icon: <Factory className="w-8 h-8" />,
//       title: 'Industry-Specific Experience',
//       description: 'Deep expertise across aerospace, automotive, medical, and industrial sectors. ISO 9001:2015, ISO 13485:2016, AS9100D certified processes ensure compliance with the most stringent industry requirements.'
//     },
//     {
//       icon: <Zap className="w-8 h-8" />,
//       title: 'Instant Digital Quoting',
//       description: 'Upload CAD files and receive comprehensive quotes within minutes. Our platform analyzes manufacturability, suggests design optimizations, and provides transparent pricing with no hidden costs or minimum order quantities.'
//     },
//     {
//       icon: <Award className="w-8 h-8" />,
//       title: 'Quality-Assured Network',
//       description: 'Access 150+ vetted manufacturers across Bengaluru and India. Every supplier undergoes rigorous qualification including capability audits, quality system reviews, and ongoing performance monitoring for consistent excellence.'
//     },
//     {
//       icon: <Globe className="w-8 h-8" />,
//       title: 'End-to-End Traceability',
//       description: 'Complete documentation from quote to delivery including material certificates, CMM inspection reports, AS9102 FAI documentation, and process certifications. Full supply chain visibility with real-time order tracking ensures peace of mind.'
//     }
//   ];

//   const capabilities = [
//     {
//       title: 'CNC Machining',
//       description: 'Precision 3/4/5-axis milling and turning for metals and plastics. Tolerances down to ±0.002" (±0.05mm) with surface finishes from Ra 3.2 to Ra 0.4 μm. From prototype to 10,000+ parts with full CMM inspection capability.',
//       slug: 'cnc-machining'
//     },
//     {
//       title: 'Sheet Metals',
//       description: 'Complete sheet metal fabrication from 0.5mm to 25mm thickness. Fiber laser cutting, CNC press brake bending, welding, and assembly. Comprehensive finishing including powder coating, anodizing, and plating for durable, corrosion-resistant parts.',
//       slug: 'sheet-metals'
//     },
//     {
//       title: '3D Printing',
//       description: 'Access FDM, SLA, SLS, MJF, and DMLS technologies with 100+ materials. Layer heights from 0.025mm for high-resolution details. Perfect for rapid prototyping, complex geometries, and low-volume production without tooling investment.',
//       slug: '3d-printing'
//     },
//     {
//       title: 'Special Process',
//       description: 'Heat treatment (annealing, hardening, tempering), surface coating (anodizing, powder coating, plating), die manufacturing, and custom compliance processes. Full traceability and certification documentation for critical applications.',
//       slug: 'special-process'
//     }
//   ];

//   const industries = [
//     { name: 'Aerospace', icon: <Plane className="w-6 h-6" />, useCases: ['Structural brackets for UAVs', 'Precision gears for actuation systems'], tolerances: '±0.005", AS9100 certified' },
//     { name: 'Automotive', icon: <Car className="w-6 h-6" />, useCases: ['Prototype housings for EVs', 'Custom jigs and fixtures'], tolerances: '±0.010", IATF 16949 ready' },
//     { name: 'Medical', icon: <Heart className="w-6 h-6" />, useCases: ['Surgical instrument components', 'Biocompatible implant prototypes'], tolerances: '±0.002", ISO 13485 compatible' },
//     { name: 'Robotics', icon: <Users className="w-6 h-6" />, useCases: ['Robot arm joints', 'Sensor mounting brackets'], tolerances: '±0.005", functional testing' },
//     { name: 'Consumer Electronics', icon: <Cpu className="w-6 h-6" />, useCases: ['Enclosures and bezels', 'Thermal management components'], tolerances: '±0.008", cosmetic finishes' },
//     { name: 'Industrial', icon: <Wrench className="w-6 h-6" />, useCases: ['Conveyor components', 'Custom tooling and dies'], tolerances: '±0.010", hardened surfaces' }
//   ];

//   const handleHVSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       await api.post('/contact', {
//         ...hvFormData,
//         submission_type: 'high_volume'
//       });
//       setShowSuccess(true);
//       setHvFormData({ name: '', email: '', phone: '', company: '', monthly_volume: '', message: '' });
//       toast.success('Inquiry submitted successfully!');
//     } catch (error) {
//       console.error('Submission failed:', error);
//       toast.error('Failed to submit inquiry. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#151515]">
//       {/* Hero Section */}
//       <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-[#301B3F]/20 via-transparent to-[#720455]/10"></div>
//         <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(114, 4, 85, 0.1) 0%, transparent 50%)', backgroundSize: '100% 100%' }}></div>
        
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="max-w-4xl mx-auto text-center">
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }} data-testid="hero-title">
//               Precision Manufacturing
//               <span className="block mt-2 bg-gradient-to-r from-[#910A67] to-[#720455] bg-clip-text text-transparent">
//                 On-Demand in Bengaluru
//               </span>
//             </h1>
//             <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed" data-testid="hero-subtitle">
//               Upload your CAD files for instant quoting, manufacturability insights, and rapid turnaround across CNC, sheet metal, 3D printing, and specialized processes.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button
//                 onClick={() => navigate('/instant-quote')}
//                 className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white px-8 py-6 text-lg rounded-full font-medium shadow-lg shadow-[#720455]/30 transition-all duration-300 hover:shadow-[#720455]/50 hover:scale-105"
//                 data-testid="hero-cta-upload"
//               >
//                 Upload CAD File <ArrowRight className="ml-2 w-5 h-5" />
//               </Button>
//               <Button
//                 onClick={() => navigate('/capabilities')}
//                 variant="outline"
//                 className="border-2 border-[#720455] text-white hover:bg-[#720455]/10 px-8 py-6 text-lg rounded-full font-medium"
//                 data-testid="hero-cta-explore"
//               >
//                 Explore Capabilities
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Who We Are */}
//       <section className="py-20 bg-gradient-to-b from-[#151515] to-[#1a1a1a]" data-testid="who-we-are-section">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
//               Who We Are
//             </h2>
//             <p className="text-gray-400 max-w-2xl mx-auto">
//               Your trusted partner for rapid prototyping and scalable production
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
//             {features.map((feature, idx) => (
//               <div
//                 key={idx}
//                 className="p-8 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#151515] border border-[#301B3F]/30 hover:border-[#720455]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#720455]/20"
//                 data-testid={`feature-card-${idx}`}
//               >
//                 <div className="text-[#910A67] mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
//                 <p className="text-gray-400 leading-relaxed">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Capabilities */}
//       <section className="py-20 bg-[#1a1a1a]" data-testid="capabilities-section">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
//               Our Capabilities
//             </h2>
//             <p className="text-gray-400 max-w-2xl mx-auto">
//               End-to-end manufacturing services with quality assurance
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {capabilities.map((capability, idx) => (
//               <div
//                 key={idx}
//                 onClick={() => navigate(`/capabilities/${capability.slug}`)}
//                 className="group p-6 rounded-xl bg-[#151515] border border-[#301B3F]/30 hover:border-[#910A67] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#910A67]/20"
//                 data-testid={`capability-card-${capability.slug}`}
//               >
//                 <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#910A67] transition-colors">
//                   {capability.title}
//                 </h3>
//                 <p className="text-gray-400 text-sm mb-4 leading-relaxed">{capability.description}</p>
//                 <button className="text-[#910A67] font-medium flex items-center group-hover:gap-2 transition-all">
//                   Explore <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Industries We Serve */}
//       <section className="py-20 bg-[#151515]" data-testid="industries-section">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
//               Industries We Serve
//             </h2>
//             <p className="text-gray-400 max-w-2xl mx-auto">
//               Precision manufacturing expertise across critical sectors
//             </p>
//           </div>
          
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
//             {industries.map((industry, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setSelectedIndustry(industry)}
//                 className="p-6 rounded-xl bg-[#1a1a1a] border border-[#301B3F]/30 hover:border-[#720455] hover:bg-[#1a1a1a]/80 transition-all duration-300 flex flex-col items-center gap-3 group"
//                 data-testid={`industry-badge-${industry.name.toLowerCase().replace(' ', '-')}`}
//               >
//                 <div className="text-[#910A67] group-hover:scale-110 transition-transform">{industry.icon}</div>
//                 <span className="text-sm font-medium text-white">{industry.name}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* High-Volume Manufacturing Band */}
//       <section className="py-16 bg-gradient-to-r from-[#301B3F] via-[#720455] to-[#910A67]" data-testid="high-volume-section">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="max-w-4xl mx-auto">
//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
//                 High-Volume Manufacturing
//               </h2>
//               <p className="text-white/90">
//                 Scale from prototype to production with dedicated support and volume pricing
//               </p>
//             </div>
            
//             {showSuccess ? (
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center" data-testid="hv-success-message">
//                 <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
//                 <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
//                 <p className="text-white/90">We've received your inquiry and will contact you shortly.</p>
//                 <Button
//                   onClick={() => setShowSuccess(false)}
//                   variant="outline"
//                   className="mt-6 border-white text-white hover:bg-white/10"
//                 >
//                   Submit Another Inquiry
//                 </Button>
//               </div>
//             ) : (
//               <form onSubmit={handleHVSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8" data-testid="hv-contact-form">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <Input
//                     placeholder="Name *"
//                     value={hvFormData.name}
//                     onChange={(e) => setHvFormData({ ...hvFormData, name: e.target.value })}
//                     required
//                     className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
//                     data-testid="hv-form-name"
//                   />
//                   <Input
//                     type="email"
//                     placeholder="Business Email *"
//                     value={hvFormData.email}
//                     onChange={(e) => setHvFormData({ ...hvFormData, email: e.target.value })}
//                     required
//                     className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
//                     data-testid="hv-form-email"
//                   />
//                   <Input
//                     type="tel"
//                     placeholder="Phone"
//                     value={hvFormData.phone}
//                     onChange={(e) => setHvFormData({ ...hvFormData, phone: e.target.value })}
//                     className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
//                     data-testid="hv-form-phone"
//                   />
//                   <Input
//                     placeholder="Company"
//                     value={hvFormData.company}
//                     onChange={(e) => setHvFormData({ ...hvFormData, company: e.target.value })}
//                     className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
//                     data-testid="hv-form-company"
//                   />
//                   <Input
//                     placeholder="Monthly Volume"
//                     value={hvFormData.monthly_volume}
//                     onChange={(e) => setHvFormData({ ...hvFormData, monthly_volume: e.target.value })}
//                     className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
//                     data-testid="hv-form-volume"
//                   />
//                   <div className="sm:col-span-2">
//                     <Textarea
//                       placeholder="Message *"
//                       value={hvFormData.message}
//                       onChange={(e) => setHvFormData({ ...hvFormData, message: e.target.value })}
//                       required
//                       rows={3}
//                       className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
//                       data-testid="hv-form-message"
//                     />
//                   </div>
//                 </div>
//                 <Button
//                   type="submit"
//                   disabled={submitting}
//                   className="w-full mt-6 bg-white text-[#720455] hover:bg-white/90 py-6 text-lg font-medium rounded-full"
//                   data-testid="hv-form-submit"
//                 >
//                   {submitting ? 'Submitting...' : 'Submit Inquiry'}
//                 </Button>
//               </form>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Industry Modal */}
//       <Dialog open={!!selectedIndustry} onOpenChange={() => setSelectedIndustry(null)}>
//         <DialogContent className="bg-[#1a1a1a] border-[#301B3F]" data-testid="industry-modal">
//           {selectedIndustry && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="text-2xl text-white flex items-center gap-3">
//                   {selectedIndustry.icon}
//                   {selectedIndustry.name}
//                 </DialogTitle>
//               </DialogHeader>
//               <div className="space-y-4">
//                 <div>
//                   <h4 className="text-sm font-semibold text-gray-400 mb-2">Example Use Cases:</h4>
//                   <ul className="space-y-2">
//                     {selectedIndustry.useCases.map((useCase, idx) => (
//                       <li key={idx} className="text-white flex items-start gap-2">
//                         <CheckCircle className="w-4 h-4 text-[#910A67] mt-1 flex-shrink-0" />
//                         <span>{useCase}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-semibold text-gray-400 mb-2">Typical Tolerances & Standards:</h4>
//                   <p className="text-white">{selectedIndustry.tolerances}</p>
//                 </div>
//               </div>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Home;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, CheckCircle, Globe, Award, Zap, Users, Factory, Plane, Car, Heart, Cpu, Wrench, Package, ChevronDown } from 'lucide-react';
import api from '@/utils/api';
import { toast } from 'sonner';
import backgroundVideo from '@/assects/Videos/background.mp4';
import cncImage from '@/assects/Images/CNC_Machining.jpg';
import sheetMetalImage from '@/assects/Images/Sheet_Metal.jpg';
import printingImage from '@/assects/Images/3D_Printing.jpg';
import specialProcessImage from '@/assects/Images/Special_process.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [hvFormData, setHvFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    monthly_volume: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const scrollToContent = () => {
    const section = document.getElementById('who-we-are');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const features = [
    {
      icon: <Factory className="w-8 h-8" />,
      title: 'Industry-specific Experience',
      description: 'Deep expertise across aerospace, automotive, medical, and industrial sectors with certified processes'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Instant Quoting',
      description: 'Upload CAD files and receive manufacturability analysis, pricing, and lead times in seconds'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality Assurance',
      description: 'CMM inspection, AS9102 FAI reporting, and comprehensive quality control at every stage'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Network',
      description: 'Quality-assured supplier network spanning precision machining, additive, and finishing capabilities'
    }
  ];

  const capabilities = [
    {
      title: 'CNC Machining',
      description: 'Multi-axis milling, turning, and routing with tight tolerances for metals and plastics',
      slug: 'cnc-machining',
      image: cncImage
    },
    {
      title: 'Sheet Metals',
      description: 'Laser cutting, waterjet, stamping, and forming with comprehensive finishing options',
      slug: 'sheet-metals',
      image: sheetMetalImage
    },
    {
      title: '3D Printing',
      description: 'FDM, SLA, SLS, and MJF technologies for rapid prototyping and functional end-use parts',
      slug: '3d-printing',
      image: printingImage
    },
    {
      title: 'Special Process',
      description: 'Heat treatment, coating, die manufacturing, and custom compliance processes',
      slug: 'special-process',
      image: specialProcessImage
    }
  ];

  const industries = [
    { name: 'Aerospace', icon: <Plane className="w-6 h-6" />, useCases: ['Structural brackets for UAVs', 'Precision gears for actuation systems'], tolerances: '±0.005", AS9100 certified' },
    { name: 'Automotive', icon: <Car className="w-6 h-6" />, useCases: ['Prototype housings for EVs', 'Custom jigs and fixtures'], tolerances: '±0.010", IATF 16949 ready' },
    { name: 'Medical', icon: <Heart className="w-6 h-6" />, useCases: ['Surgical instrument components', 'Biocompatible implant prototypes'], tolerances: '±0.002", ISO 13485 compatible' },
    { name: 'Robotics', icon: <Users className="w-6 h-6" />, useCases: ['Robot arm joints', 'Sensor mounting brackets'], tolerances: '±0.005", functional testing' },
    { name: 'Consumer Electronics', icon: <Cpu className="w-6 h-6" />, useCases: ['Enclosures and bezels', 'Thermal management components'], tolerances: '±0.008", cosmetic finishes' },
    { name: 'Industrial', icon: <Wrench className="w-6 h-6" />, useCases: ['Conveyor components', 'Custom tooling and dies'], tolerances: '±0.010", hardened surfaces' }
  ];

  const handleHVSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/contact', {
        ...hvFormData,
        submission_type: 'high_volume'
      });
      setShowSuccess(true);
      setHvFormData({ name: '', email: '', phone: '', company: '', monthly_volume: '', message: '' });
      toast.success('Inquiry submitted successfully!');
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error('Failed to submit inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#151515]">
      <video
        className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="relative z-10">
        {/* Hero Section */}
        <section
          id="hero-section"
          className="relative isolate flex min-h-[100vh] items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
          data-testid="hero-section"
        >
        <div
          className="absolute inset-0 z-10 bg-gradient-to-br from-black/60 via-black/30 to-black/70"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_35%_35%,rgba(145,10,103,0.35),transparent_60%)] mix-blend-screen opacity-70"
          aria-hidden="true"
        />

        <div className="relative z-20 mx-auto max-w-4xl text-center text-white">
          <p className="mb-4 inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-1 text-[11px] uppercase tracking-[0.35em] text-white/70">
            On-demand manufacturing
          </p>
          <h1
            className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
            data-testid="hero-title"
          >
            Scale smarter. Manufacture faster.
            <span className="block bg-gradient-to-r from-[#720455] to-[#910A67] bg-clip-text text-transparent">
              With DexAura.
            </span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg"
            data-testid="hero-subtitle"
          >
            AI-driven on-demand manufacturing platform delivering instant quoting,
            manufacturability insights, and production-grade quality across CNC,
            sheet metal, additive, and special processes.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            {/* <Button
              onClick={() => navigate('/instant-quote')}
              className="rounded-full bg-gradient-to-r from-[#720455] to-[#910A67] px-8 py-6 text-lg font-semibold text-white shadow-lg shadow-[#910A67]/30 transition hover:from-[#910A67] hover:to-[#720455]"
              data-testid="hero-cta-upload"
            >
              Upload CAD File <ArrowRight className="ml-2 h-5 w-5" />
            </Button> */}
            <Button
              onClick={() => navigate('/capabilities')}
              variant="outline"
              className="rounded-full border-white/40 px-8 py-6 text-lg font-semibold text-white hover:bg-white/10"
              data-testid="explore-capabilities-btn"
            >
              Explore Capabilities
            </Button>
          </div>
          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={scrollToContent}
              className="group inline-flex flex-col items-center text-white/70 transition hover:text-white"
              aria-label="Scroll to content"
            >
              <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
              <span className="mt-3 flex h-12 w-8 items-center justify-center rounded-full border border-white/30">
                <span className="h-2 w-2 rounded-full bg-white/80 animate-bounce" />
              </span>
              <ChevronDown className="mt-3 h-5 w-5 animate-pulse" />
            </button>
          </div>
        </div>
        </section>

        {/* Who We Are */}
        <section id="who-we-are" className="py-20 bg-gradient-to-b from-[#151515] to-[#1a1a1a]" data-testid="who-we-are-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Who We Are
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Your trusted partner for rapid prototyping and scalable production
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#151515] border border-[#301B3F]/30 hover:border-[#720455]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#720455]/20"
                data-testid={`feature-card-${idx}`}
              >
                <div className="text-[#910A67] mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        </section>

        {/* Capabilities */}
        <section className="py-20 bg-[#1a1a1a]" data-testid="capabilities-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Our Capabilities
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              End-to-end manufacturing services with quality assurance
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/capabilities/${capability.slug}`)}
                className="group relative overflow-hidden rounded-xl border border-[#301B3F]/30 transition-all duration-300 cursor-pointer hover:border-[#910A67] hover:shadow-lg hover:shadow-[#910A67]/20"
                data-testid={`capability-card-${capability.slug}`}
                style={{ minHeight: '180px' }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 scale-100 group-hover:scale-105"
                  style={{ backgroundImage: `url(${capability.image})` }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/80 transition-opacity duration-300 group-hover:from-black/10 group-hover:via-black/40 group-hover:to-black/80" aria-hidden="true" />

                <div className="relative z-10 flex h-full flex-col justify-between p-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#F5C0E0] transition-colors">
                      {capability.title}
                    </h3>
                    <p className="text-gray-200 text-sm mb-4 leading-relaxed">{capability.description}</p>
                  </div>
                  <button className="text-[#F5C0E0] font-medium flex items-center group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </section>

        {/* Industries We Serve */}
        <section className="py-20 bg-[#151515]" data-testid="industries-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Industries We Serve
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Precision manufacturing expertise across critical sectors
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndustry(industry)}
                className="p-6 rounded-xl bg-[#1a1a1a] border border-[#301B3F]/30 hover:border-[#720455] hover:bg-[#1a1a1a]/80 transition-all duration-300 flex flex-col items-center gap-3 group"
                data-testid={`industry-badge-${industry.name.toLowerCase().replace(' ', '-')}`}
              >
                <div className="text-[#910A67] group-hover:scale-110 transition-transform">{industry.icon}</div>
                <span className="text-sm font-medium text-white">{industry.name}</span>
              </button>
            ))}
          </div>
        </div>
        </section>

        {/* Industry Insight Panel */}
        <section className="py-16 bg-[#151515] border-t border-[#301B3F]/30" data-testid="industry-detail-panel">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-white/40">Industry Insight</p>
              <h3 className="mt-3 text-3xl font-semibold text-white">Tailored expertise for every sector</h3>
              <p className="mt-3 text-white/60">Tap a badge above to explore real programs, tolerances, and certifications.</p>
            </div>

            {selectedIndustry ? (
              <div className="grid gap-8 rounded-3xl border border-[#301B3F]/40 bg-[#1a1a1a]/90 p-8 shadow-[0_20px_80px_rgba(114,4,85,0.2)] md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-3 text-white">
                    <div className="text-[#910A67]">{selectedIndustry.icon}</div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-white/50">Selected industry</p>
                      <h4 className="text-2xl font-semibold">{selectedIndustry.name}</h4>
                    </div>
                  </div>
                  <h5 className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
                    Example use cases
                  </h5>
                  <ul className="mt-4 space-y-3">
                    {selectedIndustry.useCases.map((useCase, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/90">
                        <CheckCircle className="mt-1 h-4 w-4 text-[#910A67]" />
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h5 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
                      Typical tolerances & standards
                    </h5>
                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
                      {selectedIndustry.tolerances}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedIndustry(null)}
                    className="mt-8 inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/80 hover:bg-white/10"
                  >
                    Clear selection
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-white/20 bg-[#1a1a1a]/70 p-10 text-center text-white/70">
                <p>Select an industry card above to spotlight relevant use cases, tolerances, and certifications.</p>
              </div>
            )}
          </div>
        </section>

        {/* High-Volume Manufacturing Band */}
        <section
          className="pt-16 pb-16 bg-gradient-to-r from-[#301B3F] via-[#720455] to-[#910A67]"
          data-testid="high-volume-section"
        >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                High-Volume Manufacturing
              </h2>
              <p className="text-white/90">
                Scale from prototype to production with dedicated support and volume pricing
              </p>
            </div>
            
            {showSuccess ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center" data-testid="hv-success-message">
                <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-white/90">We've received your inquiry and will contact you shortly.</p>
                <Button
                  onClick={() => setShowSuccess(false)}
                  variant="outline"
                  className="mt-6 border-white text-white hover:bg-white/10"
                >
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleHVSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8" data-testid="hv-contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Name *"
                    value={hvFormData.name}
                    onChange={(e) => setHvFormData({ ...hvFormData, name: e.target.value })}
                    required
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    data-testid="hv-form-name"
                  />
                  <Input
                    type="email"
                    placeholder="Business Email *"
                    value={hvFormData.email}
                    onChange={(e) => setHvFormData({ ...hvFormData, email: e.target.value })}
                    required
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    data-testid="hv-form-email"
                  />
                  <Input
                    type="tel"
                    placeholder="Phone"
                    value={hvFormData.phone}
                    onChange={(e) => setHvFormData({ ...hvFormData, phone: e.target.value })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    data-testid="hv-form-phone"
                  />
                  <Input
                    placeholder="Company"
                    value={hvFormData.company}
                    onChange={(e) => setHvFormData({ ...hvFormData, company: e.target.value })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    data-testid="hv-form-company"
                  />
                  <Input
                    placeholder="Monthly Volume"
                    value={hvFormData.monthly_volume}
                    onChange={(e) => setHvFormData({ ...hvFormData, monthly_volume: e.target.value })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    data-testid="hv-form-volume"
                  />
                  <div className="sm:col-span-2">
                    <Textarea
                      placeholder="Message *"
                      value={hvFormData.message}
                      onChange={(e) => setHvFormData({ ...hvFormData, message: e.target.value })}
                      required
                      rows={3}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      data-testid="hv-form-message"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-6 bg-white text-[#720455] hover:bg-white/90 py-6 text-lg font-medium rounded-full"
                  data-testid="hv-form-submit"
                >
                  {submitting ? 'Submitting...' : 'Submit Inquiry'}
                </Button>
              </form>
            )}
          </div>
        </div>
        </section>

        
      </div>
    </div>
  );
};

export default Home;
