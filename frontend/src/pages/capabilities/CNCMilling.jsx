import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import cncVideo from '@/assects/Videos/cnc.mp4';
import cnc_m01 from '@/assects/Images/cnc_m01-1.jpeg';
import cnc_m02 from '@/assects/Images/cnc_m02.jpg';
import cnc_m03 from '@/assects/Images/cnc_m03.jpg';
import cnc_m04 from '@/assects/Images/cnc_m04-01.jpg';
import cnc_m05 from '@/assects/Images/cnc_m08.jpg';
import millingImage from '@/assects/Images/cnc_m08.jpg';
import cncPartImage from '@/assects/Images/CNC_Machining.jpg';
import specialProcessImage from '@/assects/Images/Special_process.jpg';
import aluminum from '@/assects/Images/aluminium.png';
import brass from '@/assects/Images/brass.png';
import copper from '@/assects/Images/copper.png';
import stainless_steel from '@/assects/Images/stainless_steel.png';
import alloy_steel from '@/assects/Images/alloy_steel.png';
import titanium from '@/assects/Images/titanium.png';
import abs from '@/assects/Images/abs.png';
import acetal from '@/assects/Images/POM.png';
import nylon from '@/assects/Images/nylon.png';
import peek from '@/assects/Images/PEEK.png';
import polycarbonate from '@/assects/Images/polycarbonate.png';
import acrylic from '@/assects/Images/acrylic.png';
import hdpe_ldpe from '@/assects/Images/HDPE.png';
import ptfe from '@/assects/Images/PTFE.png';
import pvc from '@/assects/Images/PVC.png';

const CNCMilling = () => {
  const processSlides = [cnc_m01, cnc_m02, cnc_m03, cnc_m04, cnc_m05];
  const [processIndex, setProcessIndex] = useState(0);
  const navigate = useNavigate();

  const metalMaterials = [
    {
      id: 'aluminum',
      label: 'Aluminum',
      name: 'Aluminum (e.g., 6061, 7075)',
      description:
        'Aluminum 6061 and 7075 balance strength, weight, and machinability, making them ideal for brackets, enclosures, heat sinks, and structural components.',
      image: aluminum
    },
    {
      id: 'brass',
      label: 'Brass',
      name: 'Brass',
      description:
        'Brass machines very cleanly with excellent surface finish, commonly used for fittings, decorative components, and low-friction mechanical parts.',
      image: brass
    },
    {
      id: 'copper',
      label: 'Copper',
      name: 'Copper',
      description:
        'Copper offers outstanding electrical and thermal conductivity, making it ideal for bus bars, heat spreaders, and RF or power components.',
      image: copper
    },
    {
      id: 'stainless',
      label: 'Stainless Steel',
      name: 'Stainless Steels',
      description:
        'Stainless steels such as 304 and 17-4PH provide excellent corrosion resistance and strength for medical, food-contact, and industrial assemblies.',
      image: stainless_steel
    },
    {
      id: 'alloy-steel',
      label: 'Alloy / Mild Steel',
      name: 'Alloy and Mild Steels',
      description:
        'Low-carbon and alloy steels machine cleanly and can be heat treated for higher strength in shafts, housings, fixtures, and tooling components.',
      image: alloy_steel
    },
    {
      id: 'titanium',
      label: 'Titanium',
      name: 'Titanium',
      description:
        'Titanium Grade 5 combines high specific strength with corrosion resistance, well-suited for aerospace, medical, and high-performance hardware.',
      image: titanium
    }
  ];

  const plasticMaterials = [
    {
      id: 'abs',
      label: 'ABS',
      name: 'ABS',
      description:
        'ABS is a tough, impact-resistant plastic commonly used for housings, brackets, and functional prototypes that need good machinability.',
      image: abs
    },
    {
      id: 'acetal',
      label: 'Acetal (POM)',
      name: 'Acetal (POM) / Delrin',
      description:
        'Acetal (POM) offers low friction, good wear, and dimensional stability, making it a go-to choice for gears, bushings, and precision mechanical parts.',
      image: acetal
    },
    {
      id: 'nylon',
      label: 'Nylon',
      name: 'Nylon 6/6',
      description:
        'Nylon provides low friction and good wear resistance, ideal for bearings, rollers, wear strips, and structural components.',
      image: nylon
    },
    {
      id: 'pc',
      label: 'Polycarbonate',
      name: 'Polycarbonate',
      description:
        'Polycarbonate is a clear, tough engineering plastic used when impact resistance, transparency, and dimensional stability are critical.',
      image: polycarbonate
    },
    {
      id: 'peek',
      label: 'PEEK',
      name: 'PEEK',
      description:
        'PEEK is a high-temperature, high-strength plastic widely used in aerospace, oil & gas, and medical applications where performance is critical.',
      image: peek
    },
    {
      id: 'acrylic',
      label: 'Acrylic (PMMA)',
      name: 'Acrylic (PMMA)',
      description:
        'Acrylic is a clear, rigid plastic often used for display windows, light pipes, and covers where optical clarity matters.',
      image: acrylic
    },
    {
      id: 'hdpe-ldpe',
      label: 'HDPE / LDPE',
      name: 'HDPE / LDPE',
      description:
        'High- and low-density polyethylene are lightweight, tough plastics suitable for impact-resistant components, guards, and chemical-contact parts.',
      image: hdpe_ldpe
    },
    {
      id: 'ptfe',
      label: 'PTFE',
      name: 'PTFE',
      description:
        'PTFE offers exceptional chemical resistance and very low friction, ideal for seals, bushings, and components in aggressive environments.',
      image: ptfe
    },
    {
      id: 'pvc',
      label: 'PVC',
      name: 'PVC',
      description:
        'Rigid PVC is used for manifolds, fittings, and enclosures where chemical resistance and electrical insulation are required.',
      image: pvc
    }
  ];

  const [activeMetal, setActiveMetal] = useState(metalMaterials[0].id);
  const [activePlastic, setActivePlastic] = useState(plasticMaterials[0].id);

  const currentMetal = metalMaterials.find((m) => m.id === activeMetal) ?? metalMaterials[0];
  const currentPlastic = plasticMaterials.find((p) => p.id === activePlastic) ?? plasticMaterials[0];

  useEffect(() => {
    if (processSlides.length <= 1) return undefined;
    const timer = setInterval(() => {
      setProcessIndex((prev) => (prev + 1) % processSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [processSlides.length]);

  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Floating back control (native button + continuous left-slide animation) */}
      <button
        type="button"
        aria-label="Back to CNC Machining"
        data-testid="back-btn"
        onClick={() => navigate('/capabilities/cnc-machining')}
        className="fixed left-10 top-1/2 -translate-y-1/2 z-50 p-0 bg-transparent border-none text-[#720455] hover:opacity-90 transition-transform duration-200 animate-bounce-container"
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

      <section className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden px-6 py-8 text-center">
        <video
        ref={(video) => {
                        if (video) video.playbackRate = 0.5;
                        }}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={cncVideo} type="video/mp4" />
        </video>
        {/* Fullscreen dark overlay over the video */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-black/90 via-black/50 to-black/80" />
        {/* Content centered on top of the video/overlay */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6 py-10">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            ISO 9001:2015&nbsp;&nbsp;|&nbsp;&nbsp;AS9100D&nbsp;&nbsp;|&nbsp;&nbsp;ITAR
          </p>
          <h1
            className="mt-4 text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            CNC Milling Service
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Get custom milled parts for rapid prototyping and production. Our digital CNC milling process produces
            functional prototypes and end-use components in as fast as one day, using 3-axis and indexed 5-axis
            equipment across a wide range of engineering-grade plastics and metals.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button className="rounded-full bg-gradient-to-r from-[#720455] to-[#910A67] text-white px-8 py-3 text-sm font-semibold" onClick={() => navigate('/contact')}>
              Get a Quote
            </Button>
            {/* <Button
              variant="outline"
              className="rounded-full border-[#720455] text-white px-8 py-3 text-sm font-semibold hover:bg-[#720455]/10"
            >
              View Design Guide
            </Button> */}
          </div>
        </div>
      </section>

      {/* Main content with plain background */}
      <div className="relative z-10 container mx-auto px-4 max-w-6xl space-y-16 py-10">
        {/* What we do / Process */}
        <section className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2 items-start">
            <div className="space-y-4 py-10">
              <h2 className="text-2xl font-semibold text-white">Factory CNC Milling Process</h2>
              <p className="text-gray-300">
                Our factory CNC milling workflow starts by fixturing a block of metal or plastic material inside a CNC
                mill. Using G-code, the machine rapidly removes material to form your part geometry. We combine 3-axis
                milling with indexed 5-axis positioning to reach more complex features while keeping cycle times low and
                quality consistent across builds.
              </p>
              <p className="text-gray-300">
                Through our semi-automated factory, you can add first article inspection (FAI) reporting, material
                certifications, and a variety of finishing options like anodizing, chromate plating, and powder coating.
                For higher quantities, the DexAura Network extends capacity with more competitive pricing, additional
                coatings, and expanded certification paths.
              </p>
            </div>
            <div className="h-full">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#301B3F]/40">
                {processSlides.map((src, idx) => (
                  <img
                    key={`${src}-${idx}`}
                    src={src}
                    alt="Factory CNC milling process"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                      idx === processIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                  />
                ))}
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                  {processSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Show slide ${idx + 1}`}
                      onClick={() => setProcessIndex(idx)}
                      className={`h-2.5 w-2.5 rounded-full border border-white/70 transition ${
                        idx === processIndex ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <aside className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Common Uses for CNC Milling</h3>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li>• Functional prototypes that need production-equivalent materials</li>
              <li>• Jigs, fixtures, and tooling that support assembly and test</li>
              <li>• Production components in lower volumes where tooling is not economical</li>
            </ul>
          </aside>
        </section>

        {/* Capabilities Summary */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">CNC Milling Capabilities</h2>

          {/* 3-Axis card with image on the left */}
          <article className="grid gap-6 md:grid-cols-[2fr,3fr] items-center rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-6">
            <div className="h-48 w-full overflow-hidden rounded-xl bg-black/40">
              <img
                src={millingImage}
                alt="3-axis CNC milling setup"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">3-Axis Milling</h3>
              <p className="text-sm text-gray-300">
                3-axis mills are ideal for prismatic geometries, pockets, profiles, and parts that can be reached from a
                limited number of orientations. They provide fast turnaround on brackets, plates, and housings.
              </p>
              <p className="text-sm text-gray-400">
                Typical work includes flat and stepped features, drilled and tapped holes, and light contouring with
                consistent, repeatable quality.
              </p>
            </div>
          </article>

          {/* 5-Axis card with image on the right */}
          <article className="grid gap-6 md:grid-cols-[3fr,2fr] items-center rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">5-Axis Indexed Milling</h3>
              <p className="text-sm text-gray-300">
                Indexed 5-axis milling unlocks multi-sided features, undercuts, and angled surfaces without the full
                complexity of simultaneous 5-axis motion. Parts are rotated between operations to reach more faces.
              </p>
              <p className="text-sm text-gray-400">
                This is a strong fit for manifolds, brackets, and housings that need features machined from several
                directions while keeping setups and cycle time under control.
              </p>
            </div>
            <div className="h-48 w-full overflow-hidden rounded-xl bg-black/40">
              <img
                src={cncPartImage}
                alt="5-axis indexed milling part"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </article>
        </section>

        {/* Materials */}
        <section className="space-y-10">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">CNC Milling Materials</h2>
            <p className="text-gray-300 max-w-3xl">
              We stock a range of production-grade metals and plastics so you can prototype and scale production with the
              same material set.
            </p>
          </div>

          {/* Metals */}
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-white">Metals</h3>
              <div className="flex flex-wrap gap-3 border-b border-white/10 pb-1">
                {metalMaterials.map((metal) => (
                  <button
                    key={metal.id}
                    type="button"
                    onClick={() => setActiveMetal(metal.id)}
                    className={`px-3 pb-2 text-sm font-medium transition ${
                      metal.id === activeMetal
                        ? 'text-white border-b-2 border-[#910A67]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {metal.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-[3fr,2fr] items-start">
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white">{currentMetal.name}</h4>
                <p className="text-sm text-gray-300">{currentMetal.description}</p>
              </div>
              <div className="h-64 w-full overflow-hidden rounded-2xl border border-[#301B3F]/40 bg-black/40">
                <img
                  src={currentMetal.image}
                  alt={currentMetal.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Plastics */}
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-white">Plastics</h3>
              <div className="flex flex-wrap gap-3 border-b border-white/10 pb-1">
                {plasticMaterials.map((plastic) => (
                  <button
                    key={plastic.id}
                    type="button"
                    onClick={() => setActivePlastic(plastic.id)}
                    className={`px-3 pb-2 text-sm font-medium transition ${
                      plastic.id === activePlastic
                        ? 'text-white border-b-2 border-[#910A67]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {plastic.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-[3fr,2fr] items-start">
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white">{currentPlastic.name}</h4>
                <p className="text-sm text-gray-300">{currentPlastic.description}</p>
              </div>
              <div className="h-64 w-full overflow-hidden rounded-2xl border border-[#301B3F]/40 bg-black/40">
                <img
                  src={currentPlastic.image}
                  alt={currentPlastic.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Surface Finishes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Surface Finishes on Milled Parts</h2>
          <p className="text-gray-300 max-w-3xl">
            All machined plastic parts are left as-milled, which typically shows fine tool marks. Metal parts can be
            left with broken edges or upgraded with bead blasting and anodizing to improve cosmetics, durability, and
            corrosion resistance.
          </p>
          <div className="grid gap-6 md:grid-cols-3 text-sm text-gray-200">
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">As-Milled / Broken Edge</h3>
              <p>
                Standard finish with edges deburred for handling. Ideal for prototypes and internal components where
                tool marks are acceptable.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Bead Blast</h3>
              <p>
                Lightly textured matte finish that hides minor machining marks on aluminum and improves cosmetic
                appearance.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Anodizing & Coatings</h3>
              <p>
                Optional anodizing, chromate plating, and powder coating help protect parts, add color, and improve wear
                and corrosion resistance.
              </p>
            </div>
          </div>
        </section>

        {/* About CNC Milling */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">What is CNC Milling?</h2>
          <p className="text-gray-300 max-w-3xl">
            CNC milling is a subtractive manufacturing process. A block of raw material is clamped inside the mill, and
            computer-controlled toolpaths remove material layer by layer until the final geometry is achieved. With 3-
            and 5-axis machines, a range of tools, and robust fixturing strategies, CNC milling delivers tight
            tolerances, repeatability, and high-quality surface finishes.
          </p>
          <p className="text-gray-300 max-w-3xl">
            After machining, parts move directly to deburring and inspection, followed by any specified finishing. Once
            complete, components are packaged and shipped, often within a couple of days for standard prototype runs.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-gradient-to-r from-[#301B3F] via-[#720455] to-[#910A67] p-8 sm:p-10 text-white space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Ready to Start a CNC Milling Project?</h2>
          <p className="text-white/90 max-w-3xl">
            Share a 3D CAD file to receive instant manufacturability feedback, interactive pricing, and lead-time
            options for your next prototype or production build.
          </p>
          <Button className="rounded-full bg-white text-[#720455] hover:bg-white/90 px-8 py-3 font-semibold w-fit" onClick={() => navigate('/contact')}>
            Get an Online Quote
          </Button>
        </section>
        </div>
      </div>
    
  );
};

export default CNCMilling;


