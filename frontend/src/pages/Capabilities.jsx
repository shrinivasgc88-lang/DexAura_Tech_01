// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { ArrowRight, Cpu, Box, Printer, Sparkles } from 'lucide-react';

// const Capabilities = () => {
//   const navigate = useNavigate();

//   const capabilities = [
//     {
//       title: 'CNC Machining',
//       icon: <Cpu className="w-12 h-12" />,
//       description: 'Multi-axis milling, turning, and routing for metals and plastics with precision tolerances down to ±0.002"',
//       features: ['3-5 axis milling', 'CNC turning', 'Fixture manufacturing', 'Tight tolerances'],
//       slug: 'cnc-machining'
//     },
//     {
//       title: 'Sheet Metals',
//       icon: <Box className="w-12 h-12" />,
//       description: 'Laser cutting, waterjet, stamping, and forming with comprehensive finishing and assembly capabilities',
//       features: ['Laser cutting', 'Waterjet cutting', 'Metal stamping', 'Bending & forming'],
//       slug: 'sheet-metals'
//     },
//     {
//       title: '3D Printing',
//       icon: <Printer className="w-12 h-12" />,
//       description: 'FDM, SLA, SLS, and MJF technologies for rapid prototyping and functional end-use production parts',
//       features: ['Multiple technologies', 'Various materials', 'Rapid turnaround', 'Post-processing'],
//       slug: '3d-printing'
//     },
//     {
//       title: 'Special Process',
//       icon: <Sparkles className="w-12 h-12" />,
//       description: 'Heat treatment, surface coating, die manufacturing, and custom compliance processes for critical applications',
//       features: ['Heat treatment', 'Surface finishing', 'Die manufacturing', 'Custom processes'],
//       slug: 'special-process'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-[#151515] py-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }} data-testid="capabilities-title">
//             Manufacturing Capabilities
//           </h1>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             Comprehensive manufacturing services with quality-assured supplier network and instant quoting
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
//           {capabilities.map((capability, idx) => (
//             <div
//               key={idx}
//               className="group p-8 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#151515] border border-[#301B3F]/30 hover:border-[#720455] transition-all duration-300 hover:shadow-xl hover:shadow-[#720455]/20"
//               data-testid={`capability-detail-${capability.slug}`}
//             >
//               <div className="text-[#910A67] mb-6 group-hover:scale-110 transition-transform">
//                 {capability.icon}
//               </div>
//               <h2 className="text-2xl font-bold text-white mb-4">{capability.title}</h2>
//               <p className="text-gray-300 mb-6 leading-relaxed">{capability.description}</p>
              
//               <ul className="space-y-2 mb-6">
//                 {capability.features.map((feature, fidx) => (
//                   <li key={fidx} className="text-gray-400 flex items-center">
//                     <div className="w-1.5 h-1.5 bg-[#910A67] rounded-full mr-3"></div>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
              
//               <Button
//                 onClick={() => navigate(`/capabilities/${capability.slug}`)}
//                 className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white rounded-full w-full"
//                 data-testid={`explore-${capability.slug}-btn`}
//               >
//                 Explore Details <ArrowRight className="ml-2 w-4 h-4" />
//               </Button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Capabilities;




import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cpu, Box, Printer, Sparkles, ArrowLeft } from 'lucide-react';
import cncVideo from '@/assects/Videos/cnc.mp4';
import sheetMetalVideo from '@/assects/Videos/CMM.mp4';
import printingVideo from '@/assects/Videos/3D_printing.mp4';
import specialProcessVideo from '@/assects/Videos/special_process.mp4';
import cncImage from '@/assects/Images/cnc_m08.jpg';
import sheetMetalImage from '@/assects/Images/Sheet_Metal.jpg';
import printingImage from '@/assects/Images/3D_Printing.jpg';
import specialProcessImage from '@/assects/Images/Special_process.jpg';

const Capabilities = () => {
  const navigate = useNavigate();

  const capabilities = [
    {
      title: 'CNC Machining',
      icon: <Cpu className="w-12 h-12" />,
      description:
        'Digital CNC milling and turning for metals and plastics with prototype-to-production support, tight tolerances, and rapid lead times.',
      features: [
        '3–5 axis milling and CNC turning',
        'Metals and engineering-grade plastics',
        'Tolerances down to approximately ±0.002"',
        'Typical lead times from about 1–7 days'
      ],
      slug: 'cnc-machining',
      video: cncVideo
    },
    {
      title: 'Sheet Metals',
      icon: <Box className="w-12 h-12" />,
      description:
        'Online sheet metal fabrication that combines cutting, forming, hardware insertion, and finishing for flat parts and fully fabricated assemblies.',
      features: [
        'Laser cutting, punching, and forming & bending',
        'Fabricated assemblies with welding and riveting',
        'Powder coat, plating, and part marking',
        'Lead times often in the 1–7 day range depending on complexity'
      ],
      slug: 'sheet-metals',
      video: sheetMetalVideo
    },
    {
      title: '3D Printing',
      icon: <Printer className="w-12 h-12" />,
      description: 'FDM, SLA, SLS, and MJF technologies for rapid prototyping and functional end-use production parts',
      features: ['Multiple technologies', 'Various materials', 'Rapid turnaround', 'Post-processing'],
      slug: '3d-printing',
      video: printingVideo

    },
    {
      title: 'Special Process',
      icon: <Sparkles className="w-12 h-12" />,
      description:
        'Production support services that complement machining and sheet metal, including heat treatment, surface finishing, and custom qualification workflows.',
      features: [
        'Heat treatment and special coatings',
        'Die and tool manufacturing support',
        'Quality, inspection, and compliance options',
        'Scales from rapid prototyping to production parts'
      ],
      slug: 'special-process',
      video: specialProcessVideo
    }
  ];

  const CapabilityCard = ({ capability, onClick }) => {
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    };

    const handleMouseLeave = () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };

    return (
      <div
        className="group relative overflow-hidden rounded-2xl border border-[#301B3F]/30 bg-[#151515] hover:border-[#720455] transition-all duration-300 hover:shadow-xl hover:shadow-[#720455]/20 cursor-pointer"
        data-testid={`capability-detail-${capability.slug}`}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          muted
          loop
          playsInline
        >
          <source src={capability.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80 pointer-events-none" />

        <div className="relative z-10 p-8">
          <div className="text-[#910A67] mb-6 group-hover:scale-110 transition-transform">
            {capability.icon}
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">{capability.title}</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">{capability.description}</p>

          <ul className="space-y-2 mb-6">
            {capability.features.map((feature, fidx) => (
              <li key={fidx} className="text-gray-300 flex items-center">
                <div className="w-1.5 h-1.5 bg-[#910A67] rounded-full mr-3" />
                {feature}
              </li>
            ))}
          </ul>

          <Button
            onClick={onClick}
            className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white rounded-full w-full"
            data-testid={`explore-${capability.slug}-btn`}
          >
            Explore Details <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  };

  const heroSlides = [cncImage, sheetMetalImage, printingImage, specialProcessImage];
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    if (heroSlides.length <= 1) return undefined;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-[#151515]">
   

      {/* Hero section with slideshow background */}
      <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden px-6 py-16 text-center">
        <div className="absolute inset-0">
          {heroSlides.map((src, idx) => (
            <img
              key={`${src}-${idx}`}
              src={src}
              alt="Manufacturing capabilities background"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                idx === heroIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-black/90" />
        </div>

        <div className="relative z-10 container mx-auto max-w-4xl flex flex-col items-center justify-center gap-4">
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            data-testid="capabilities-title"
          >
            Manufacturing Capabilities
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive manufacturing services with a quality‑assured supplier network and instant quoting across CNC
            machining, sheet metal, 3D printing, and special processes.
          </p>
        </div>
      </section>

      {/* Capabilities grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {capabilities.map((capability, idx) => (
              <CapabilityCard
                key={idx}
                capability={capability}
                onClick={() => navigate(`/capabilities/${capability.slug}`)}
              />
            ))}
          </div>

          {/* Enhanced manufacturing capabilities / network */}
          <section className="max-w-5xl mx-auto space-y-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              Enhanced Manufacturing with a Digital Network
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
             DexAura connects in‑house capacity with a vetted
              partner network so you can access expanded capabilities, tighter tolerances, and volume pricing when you
              need it.
            </p>
            <p className="text-gray-400 text-sm">
              Use rapid prototyping for early designs, then seamlessly move into higher‑volume production while keeping
              a single point of contact for quality, documentation, and program management.
            </p>
          </section>

          {/* Compare services summary */}
          <section className="max-w-6xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center">
              Compare Our Digital Manufacturing Services
            </h2>
            <p className="text-gray-300 text-sm sm:text-base text-center max-w-3xl mx-auto">
              This overview helps you choose the right process for
              each stage of development based on lead time, materials, and typical tolerances.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-[#301B3F]/40 bg-[#111111]">
              <table className="min-w-full text-xs sm:text-sm text-left text-gray-200">
                <thead className="bg-[#1f1f1f] text-gray-300">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 font-semibold">Service</th>
                    <th className="px-4 sm:px-6 py-3 font-semibold border-l border-white/5">Typical Lead Times</th>
                    <th className="px-4 sm:px-6 py-3 font-semibold border-l border-white/5">Materials</th>
                    <th className="px-4 sm:px-6 py-3 font-semibold border-l border-white/5">Typical Use Cases</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/5">
                    <td className="px-4 sm:px-6 py-4 text-white font-medium align-top">CNC Machining</td>
                    <td className="px-4 sm:px-6 py-4 border-l border-white/5 align-top">~1–7 days</td>
                    <td className="px-4 sm:px-6 py-4 border-l border-white/5 align-top">
                      Metals and engineering plastics
                    </td>
                    <td className="px-4 sm:px-6 py-4 border-l border-white/5">
                      Tight‑tolerance components, functional prototypes, fixtures, and low‑volume production parts.
                    </td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-4 sm:px-6 py-4 text-white font-medium align-top">Sheet Metal Fabrication</td>
                    <td className="px-4 sm:px-6 py-4 border-l border-white/5 align-top">~1–7 days</td>
                    <td className="px-4 sm:px-6 py-4 border-l border-white/5 align-top">Aluminum, steels, stainless</td>
                    <td className="px-4 sm:px-6 py-4 border-l border-white/5">
                      Flat blanks, formed parts, and fabricated assemblies like brackets, chassis, enclosures, and
                      panels.
                    </td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-4 sm:px-6 py-4 text-white font-medium align-top">Special Processes</td>
                    <td className="px-4 sm:px-6 py-4 border-l border-white/5 align-top">Project‑dependent</td>
                    <td className="px-4 sm:px-6 py-4 border-l border-white/5 align-top">
                      Same metals and plastics used in upstream processes
                    </td>
                    <td className="px-4 sm:px-6 py-4 border-l border-white/5">
                      Heat treatment, coatings, inspection, and production support that prepare parts for end use or
                      downstream assembly.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Manufacturing for the product life cycle */}
          <section className="max-w-5xl mx-auto space-y-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              Manufacturing for the Product Life Cycle
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              From one‑off prototypes to full‑scale production, our manufacturing services are designed to support every
              stage of your product life cycle. Similar to digital manufacturers, we combine
              rapid prototyping, bridge production, and ongoing supply with a single connected workflow.
            </p>
            <p className="text-gray-400 text-sm">
              Use CNC machining and sheet metal for fast design iterations, then scale into production runs with
              consistent quality, documentation, and compliance.
            </p>
          </section>

          {/* Online quoting & DFM + materials + quote details with alternating images */}
          <section className="space-y-10 text-sm text-gray-200 max-w-6xl mx-auto">
            {/* Card 1 - text left, image right */}
            <article className="grid gap-6 md:grid-cols-2 items-center">
              <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-6 space-y-2">
                <h3 className="text-white font-semibold text-base">Online Quoting &amp; DFM Analysis</h3>
                <p>
                  DexAura combines online quoting with automated design
                  for manufacturability checks. Send your CAD model, configure quantities and turn times, and review
                  manufacturability advisories before you commit to an order.
                </p>
                <p className="text-gray-400">
                  This helps catch issues early—such as thin walls, challenging tolerances, or hardware placement—so you
                  can refine designs while keeping lead times short.
                </p>
              </div>
              <div className="h-56 w-full overflow-hidden rounded-2xl border border-[#301B3F]/40 bg-black/40">
                <img
                  src={cncImage}
                  alt="Digital CNC machining quote visualization"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </article>

            {/* Card 2 - image left, text right */}
            <article className="grid gap-6 md:grid-cols-2 items-center">
              <div className="h-56 w-full overflow-hidden rounded-2xl border border-[#301B3F]/40 bg-black/40">
                <img
                  src={sheetMetalImage}
                  alt="Assorted manufacturing materials for CNC and sheet metal"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-6 space-y-2">
                <h3 className="text-white font-semibold text-base">Manufacturing Materials</h3>
                <p>
                  We support a broad range of metals and plastics similar to leading manufacturers. This includes
                  aluminum, steels, stainless, copper alloys, and common engineering plastics for machining.
                </p>
                <p className="text-gray-400">
                  Choosing the right material for each stage—prototype, validation, and production—helps balance
                  performance, cost, and lead time without changing your design intent.
                </p>
              </div>
            </article>

            {/* Card 3 - text left, image right */}
            <article className="grid gap-6 md:grid-cols-2 items-center">
              <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-6 space-y-2">
                <h3 className="text-white font-semibold text-base">What&apos;s in a Digital Quote?</h3>
                <p>
                  Digital quotes typically include interactive pricing by quantity and lead time, visual DFM feedback,
                  and options for finishes, inspection, and certifications—similar to the sample quotes showcased for 
                  CNC, molding, and 3D printing.
                </p>
                <p className="text-gray-400">
                  At DexAura, our goal is to give you the same clarity: clear pricing, lead‑time windows, and
                  configuration choices so you can make fast, informed sourcing decisions.
                </p>
              </div>
              <div className="h-56 w-full overflow-hidden rounded-2xl border border-[#301B3F]/40 bg-black/40">
                <img
                  src={specialProcessImage}
                  alt="Example of digital manufacturing quote summary"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </article>
          </section>

          {/* Call to action */}
          <section className="rounded-3xl bg-gradient-to-r from-[#301B3F] via-[#720455] to-[#910A67] p-8 sm:p-10 text-white max-w-6xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">Ready to Start Your Next Manufacturing Project?</h2>
            <p className="text-white/90 text-sm sm:text-base max-w-3xl">
              Share your CAD files and requirements, and we&apos;ll provide manufacturing feedback, pricing options, and
              lead‑time scenarios across CNC machining, sheet metal fabrication, and special processes.
            </p>
            <div className="flex flex-wrap gap-3">
              {/* <Button
                className="rounded-full bg-white text-[#720455] hover:bg-white/90 px-6 py-2.5 text-sm font-semibold"
                onClick={() => navigate('/instant-quote')}
              >
                Get an Instant Quote
              </Button> */}
              <Button
                variant="outline"
                className="rounded-full border-white/70 text-white hover:bg-white/10 px-6 py-2.5 text-sm font-semibold"
                onClick={() => navigate('/contact')}
              >
                Talk to Our Team
              </Button>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Capabilities;
