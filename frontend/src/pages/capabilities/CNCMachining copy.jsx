import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import millingImage from '@/assects/Images/milling.jpg';
import turningImage from '@/assects/Images/CNC_Machining.jpg';
import productionImage from '@/assects/Images/Special_process.jpg';
import threadingImage from '@/assects/Images/Sheet_Metal.jpg';
import printingImage from '@/assects/Images/3D_Printing.jpg';

const CNCMachining = () => {
  const navigate = useNavigate();

  // Hero background slideshow images
  const heroSlides = [millingImage, turningImage, productionImage, printingImage];
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    if (heroSlides.length <= 1) return undefined;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const materials = [
    {
      title: 'Metals',
      items: [
        'Aluminum 6061-T651, 7075-T651, 2024-T351',
        'Stainless 17-4PH, 304, 316L',
        'Steel 4140, low-carbon mild steel',
        'Brass, Copper, and Bronze alloys',
        'Titanium Grade 5 and specialty alloys'
      ]
    },
    {
      title: 'Plastics & Composites',
      items: [
        'ABS, Acrylic, Delrin (POM)',
        'Nylon 6/6, Polycarbonate, Ultem',
        'High-performance PEEK and Torlon',
        'Customer-supplied resin guidelines available'
      ]
    }
  ];

  const industries = [
    { label: 'Medical Devices', note: 'ISO 13485-ready builds with documentation' },
    { label: 'Aerospace & Defense', note: 'AS9100 + ITAR compliance' },
    { label: 'Automotive & EV', note: 'Rapid prototyping to pilot production' },
    { label: 'Robotics & Industrial', note: 'Durable components for automation' }
  ];

  const tabContent = {
    milling: {
      title: 'Digital CNC Milling Service',
      description:
        'The factory CNC milling process produces prototypes and production components in as fast as one day using 3-axis and indexed 5-axis milling, with automated quoting, DFM feedback, and finishing options like anodizing, chromate plating, and powder coating.',
      slides: [
        { src: millingImage, caption: '3-axis billet machining for precision prototypes' },
        { src: printingImage, caption: 'Indexed 5-axis milling handles complex surfacing' },
        { src: productionImage, caption: 'Automated CNC cells with in-line inspection' }
      ],
      cards: [
        {
          title: 'Functional Prototypes & Fixtures',
          image: millingImage,
          description: 'Ideal for functional prototypes, jigs, fixtures, and low-volume bridge production components.',
          points: [
            'End-use parts in aluminum, steels, and engineering plastics',
            'Tooling plates, brackets, and custom workholding',
            'Ship-ready components with machinist-broken edges'
          ]
        },
        {
          title: 'Process Highlights',
          image: printingImage,
          description: 'Digitally enabled workflows accelerate quoting, machining, and finishing.',
          points: [
            '3-axis and 5-axis milling from more than 30 materials',
            'Optional FAI reporting, material certs, and quality add-ons',
            'Surface finishing choices: bead blast, anodize, chromate, powder coat'
          ]
        }
      ],
      link: {
        label: 'View Full CNC Milling Page',
        action: () => navigate('/capabilities/cnc-milling')
      }
    },
    turning: {
      title: 'CNC Turning with Live Tooling',
      description:
        'CNC turning machines cylindrical parts from rod stock, and live tooling adds milled flats, slots, and radial holes in the same setup for faster delivery and superior concentricity.',
      slides: [
        { src: turningImage, caption: 'Live-tool lathes mill and turn in one setup' },
        { src: productionImage, caption: 'In-process inspection for concentric parts' },
        { src: threadingImage, caption: 'Threads, grooves, and surface finishes in one pass' }
      ],
      cards: [
        {
          title: 'Cylindrical Components',
          image: turningImage,
          description: 'Precision bushings, shafts, and housings benefit from turning accuracy.',
          points: [
            'Tight concentricity on sealing surfaces and bearing journals',
            'Axial and radial holes, grooves, and threads machined simultaneously',
            'Surface finishes suited for end-use mechanical assemblies'
          ]
        },
        {
          title: 'Live Tooling Advantages',
          image: productionImage,
          description: 'Integrated milling eliminates secondary ops and shortens lead time.',
          points: [
            'Diameters up to 10 in (254 mm) with live-tool capability',
            'Cross-holes, flats, chamfers, and keyways in a single setup',
            'UNC, UNF, metric, and custom thread callouts supported'
          ]
        }
      ]
    },
    production: {
      title: 'Production Machining & Protolabs Network',
      description:
        'When programs need higher quantities, tighter tolerances, or advanced finishing, the Protolabs Network pairs dedicated program managers with a vetted global supply base to deliver production machining at scale.',
      slides: [
        { src: productionImage, caption: 'Program-managed machining capacity worldwide' },
        { src: millingImage, caption: 'Coordinated multi-machine cells for volume parts' },
        { src: turningImage, caption: 'Quality plans tailored to aerospace and medical builds' }
      ],
      cards: [
        {
          title: 'Network Capacity',
          image: productionImage,
          description: 'Scale from pilot runs to full-rate production with volume pricing.',
          points: [
            'Domestic and international partner factories with aligned quality systems',
            'Program managers coordinating schedules, logistics, and communications',
            'Flexible machine envelopes for oversized or complex parts'
          ]
        },
        {
          title: 'Quality & Finishing',
          image: threadingImage,
          description: 'Production-ready documentation and finishing come standard.',
          points: [
            'PPAP, FAI, and CMM inspection packages on request',
            'Anodizing, powder coat, conversion coatings, and hardware installation',
            'GD&T backed tolerances with serialized traceability'
          ]
        }
      ]
    },
    threading: {
      title: 'Threading & Hole Guidelines',
      description:
        'Threaded holes can be called out directly in CAD for UNC, UNF, metric, and specialty lens threads. Protolabs follows the threaded holes guidelines to ensure proper wall thickness, depth, and tool access before machining.',
      slides: [
        { src: threadingImage, caption: 'Tapped holes inspected for depth and finish' },
        { src: printingImage, caption: 'Lens threads SM1–SM3 for optical assemblies' },
        { src: millingImage, caption: 'Machining prep for coil and key inserts' }
      ],
      cards: [
        {
          title: 'Design Guidelines',
          image: threadingImage,
          description: 'Following best practices ensures clean taps and durable threads.',
          points: [
            'Target thread depth of roughly 1× the nominal diameter',
            'Maintain recommended wall thickness to prevent distortion',
            'Stagger or offset intersecting holes to protect toolpaths'
          ]
        },
        {
          title: 'Available Options',
          image: printingImage,
          description: 'Standard and specialty threads are available across factories.',
          points: [
            'UNC, UNF, and metric coarse/fine pitches',
            'Lens threads SM1, SM2, SM3 for imaging assemblies',
            'Machining for coil/key inserts with optional installation'
          ]
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Full-screen header / hero with background slideshow */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Background slideshow images */}
        <div className="absolute inset-0">
          {heroSlides.map((src, idx) => (
            <img
              key={`${src}-${idx}`}
              src={src}
              alt="CNC machining hero"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                idx === heroIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 max-w-6xl">
          <header className="space-y-4 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
              ISO 9001:2015 | AS9100D | ITAR
            </p>
            <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              CNC Machining Services
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Fast-turn prototypes and production parts in as little as one day, supported by digital quoting,
              manufacturability analysis, and a vetted supplier network for tighter tolerances and finishing options.
            </p>
          </header>
        </div>
      </section>

      {/* Main content below hero */}
      <div className="container mx-auto px-4 max-w-6xl space-y-12 pb-10">
        {/* Service cards instead of tabs */}
        <section className="space-y-8 py-10">
          <h2 className="text-3xl font-semibold text-white text-center">Choose a CNC Service</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* CNC Milling card */}
            <article className="flex flex-col overflow-hidden rounded-3xl bg-[#1a1a1a] border border-[#301B3F]/40 shadow-xl shadow-black/40">
              <div className="h-64 w-full overflow-hidden bg-black/40">
                <img
                  src={millingImage}
                  alt="CNC Milling"
                  className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col items-center gap-3 px-8 py-8 text-center">
                <h3 className="text-xl font-semibold text-white">CNC Milling</h3>
                <p className="text-sm text-gray-300 max-w-xs">
                  Digital CNC milling for prototypes and production parts in metals and engineering plastics.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/capabilities/cnc-milling')}
                  className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white px-6 py-2.5 rounded-full font-medium shadow-lg shadow-[#720455]/30"
                >
                  Learn More
                </button>
              </div>
            </article>

            {/* CNC Turning card */}
            <article className="flex flex-col overflow-hidden rounded-3xl bg-[#1a1a1a] border border-[#301B3F]/40 shadow-xl shadow-black/40">
              <div className="h-64 w-full overflow-hidden bg-black/40">
                <img
                  src={turningImage}
                  alt="CNC Turning"
                  className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col items-center gap-3 px-8 py-8 text-center">
                <h3 className="text-xl font-semibold text-white">CNC Turning</h3>
                <p className="text-sm text-gray-300 max-w-xs">
                  CNC turning with live tooling for precise cylindrical parts and complex features.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/capabilities/cnc-turning')}
                  className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white px-6 py-2.5 rounded-full font-medium shadow-lg shadow-[#720455]/30"
                >
                  Learn More
                </button>
              </div>
            </article>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-[#301B3F]/40 p-10 space-y-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold text-white">Tolerances, Inspection & Quality</h2>
            <p className="text-gray-300 max-w-3xl">
              Standard machining holds ±0.005 in (±0.127 mm) on most geometries, while precision builds down to ±0.002 in
              (±0.05 mm) are reviewed by manufacturing engineers. CMM inspection, AS9102, and GD&T reporting are available
              for regulated programs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-gray-100">
            <div className="rounded-2xl bg-black/30 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Standard</p>
              <p className="text-4xl font-bold mt-3">±0.005"</p>
              <p className="text-xs text-gray-400 mt-2">Ideal for prototypes and low-risk production parts.</p>
            </div>
            <div className="rounded-2xl bg-black/30 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Precision</p>
              <p className="text-4xl font-bold mt-3">±0.002"</p>
              <p className="text-xs text-gray-400 mt-2">Applications that demand tighter GD&T callouts.</p>
            </div>
            <div className="rounded-2xl bg-black/30 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Quality</p>
              <p className="text-sm text-gray-300 mt-3">
                CMM, optical inspection, material certs, and serialized documentation aligned with aerospace, medical, and defense requirements.
              </p>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          {materials.map((group) => (
            <article key={group.title} className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/30 p-8 space-y-3">
              <h3 className="text-2xl font-semibold text-white">{group.title}</h3>
              <ul className="space-y-2 text-gray-300">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#910A67] mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/30 p-8 space-y-6">
          <div>
            <h2 className="text-3xl font-semibold text-white">Industries & Certifications</h2>
            <p className="text-gray-300">
              DexAura supports programs across regulated industries with the backing of ISO 9001:2015, AS9100D, and ITAR registrations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {industries.map((industry) => (
              <div key={industry.label} className="p-5 rounded-2xl bg-black/30 border border-white/5">
                <p className="text-white text-lg font-semibold">{industry.label}</p>
                <p className="text-sm text-gray-300 mt-1">{industry.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl bg-gradient-to-r from-[#301B3F] via-[#720455] to-[#910A67] p-8 text-white space-y-4">
            <h2 className="text-3xl font-semibold">Lead Times & Digital Quoting</h2>
            <ul className="space-y-2 text-white/90">
              <li>• Share CAD files to receive manufacturability feedback in hours.</li>
              <li>• Prototype parts in as little as 1 day; advanced milling programs in 5–9 days.</li>
              <li>• Production orders benefit from schedule transparency and program management.</li>
              <li>• Modify quantities, materials, and finishing in real-time before checkout.</li>
            </ul>
          </article>
          <article className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/30 p-8 space-y-4">
            <h2 className="text-3xl font-semibold text-white">Need a Quote?</h2>
            <p className="text-gray-300">
              Share a 3D CAD file to receive pricing, DFM notes, and optional inspection plans. Our applications engineers can suggest cost
              optimizations or connect you with the Protolabs Network for higher-volume work.
            </p>
            <button className="rounded-full bg-white text-[#720455] font-semibold px-8 py-3 w-fit">
              Start a CNC Project
            </button>
          </article>
        </section>
      </div>
    </div>
  );
};

const CapabilityTab = ({ data }) => {
  return (
    <div className="space-y-8">
      <ImageCarousel slides={data.slides} />
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold text-white">{data.title}</h2>
        <p className="text-gray-300">{data.description}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {data.cards.map((card) => (
          <article
            key={card.title}
            className="overflow-hidden rounded-2xl border border-white/5 bg-black/30 shadow-lg shadow-black/30"
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-5 space-y-3">
              <h3 className="text-xl font-semibold text-white">{card.title}</h3>
              {card.description && <p className="text-sm text-gray-400">{card.description}</p>}
              <ul className="space-y-2 text-sm text-gray-200">
                {card.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#910A67]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      {data.link && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={data.link.action}
            className="rounded-full border border-[#910A67] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#910A67]/20"
          >
            {data.link.label}
          </button>
        </div>
      )}
    </div>
  );
};

const ImageCarousel = ({ slides = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-3xl border border-white/5 shadow-lg shadow-black/40">
      {slides.map((slide, idx) => (
        <img
          key={`${slide.src}-${idx}`}
          src={slide.src}
          alt={slide.caption || 'CNC capability slide'}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            idx === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      ))}
      {slides[activeIndex]?.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-2 text-sm text-white">
          {slides[activeIndex].caption}
        </div>
      )}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Show slide ${idx + 1}`}
            onClick={() => setActiveIndex(idx)}
            className={`h-2.5 w-2.5 rounded-full border border-white/70 transition ${
              idx === activeIndex ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CNCMachining;
