import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import turningHero from '@/assects/Images/CNC_Machining.jpg';
import turningDetail from '@/assects/Images/Special_process.jpg';
import turningSurface from '@/assects/Images/milling.jpg';

const CNCTurning = () => {
  // Simple slideshow for hero background
  const heroSlides = [turningHero, turningDetail];
  const [heroIndex, setHeroIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (heroSlides.length <= 1) return undefined;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const turningMaterials = [
    {
      id: 'aluminum',
      label: 'Aluminum',
      name: 'Aluminum',
      description:
        'Aluminum combines excellent machinability with low weight and good strength, ideal for bushings, housings, and fluid-handling components.',
      image: turningHero
    },
    {
      id: 'brass',
      label: 'Brass',
      name: 'Brass',
      description:
        'Brass turns very cleanly and delivers a smooth surface finish, commonly used for fittings, connectors, and cosmetic hardware.',
      image: turningSurface
    },
    {
      id: 'low-carbon-steel',
      label: 'Low Carbon Steel',
      name: 'Low Carbon Steel',
      description:
        'Low carbon steels offer a cost-effective balance of machinability and strength for shafts, spacers, and structural components.',
      image: turningDetail
    },
    {
      id: 'steel-alloy',
      label: 'Steel Alloy',
      name: 'Steel Alloys',
      description:
        'Alloy steels can be heat treated for higher strength and wear resistance in demanding drivetrain and tooling applications.',
      image: turningHero
    },
    {
      id: 'stainless-steel',
      label: 'Stainless Steel',
      name: 'Stainless Steels',
      description:
        'Stainless steels provide corrosion resistance and durability for medical, food-contact, and outdoor assemblies.',
      image: turningDetail
    },
    {
      id: 'titanium',
      label: 'Titanium',
      name: 'Titanium',
      description:
        'Titanium combines high specific strength with corrosion resistance and is often used for aerospace, medical, and high-performance hardware.',
      image: turningSurface
    }
  ];

  const [activeMaterial, setActiveMaterial] = useState(turningMaterials[0].id);
  const currentMaterial =
    turningMaterials.find((m) => m.id === activeMaterial) ?? turningMaterials[0];

  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Back Button */}
      <div className="bg-[#0d0d0d] border-b border-[#301B3F]/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            onClick={() => navigate('/capabilities/cnc-machining')}
            variant="ghost"
            className="text-gray-300 hover:text-white"
            data-testid="back-btn"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {/* Hero with slideshow background */}
      <section className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden px-6 py-8 text-center">
        <div className="absolute inset-0">
          {heroSlides.map((src, idx) => (
            <img
              key={`${src}-${idx}`}
              src={src}
              alt="CNC turning hero"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                idx === heroIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-black/90" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6 py-10">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            ISO 9001:2015&nbsp;&nbsp;|&nbsp;&nbsp;AS9100D&nbsp;&nbsp;|&nbsp;&nbsp;ITAR
          </p>
          <h1
            className="mt-4 text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            CNC Turning Service
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Get quality custom turned parts for rapid prototyping and end-use production. Lead times are as fast
            as one day with digital quoting, manufacturability feedback, and optional inspections.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button className="rounded-full bg-gradient-to-r from-[#720455] to-[#910A67] text-white px-8 py-3 text-sm font-semibold"
            onClick={() => navigate('/contact')}>
              Get a Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 max-w-6xl space-y-16 py-10">
        {/* What we do / Process */}
        <section className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2 items-start">
            <div className="space-y-4 py-10">
              <h2 className="text-2xl font-semibold text-white">Factory CNC Turning Process</h2>
              <p className="text-gray-300">
                Our CNC turning process uses lathes with live tooling to machine cylindrical parts from bar stock.
                While the stock rotates, cutting tools remove material to create precise outer and inner diameters.
              </p>
              <p className="text-gray-300">
                Live tooling allows us to add milled flats, radial and axial holes, grooves, and slots in the same
                setup. This shortens lead time and improves concentricity compared to secondary operations.
              </p>
              <ul className="space-y-2 text-gray-200 text-sm list-disc list-inside">
                <li>Functional prototypes and end-use parts in production materials</li>
                <li>Features like grooves, undercuts, and threads on OD and ID</li>
                <li>Axial and radial holes, flats, and keyways using live tooling</li>
              </ul>
            </div>
            <div className="h-full">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#301B3F]/40 bg-black/40">
                <img
                  src={turningHero}
                  alt="CNC turning process"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Summary */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">CNC Turning Capabilities</h2>

          {/* Cylindrical turning */}
          <article className="grid gap-6 md:grid-cols-[2fr,3fr] items-center rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-6">
            <div className="h-48 w-full overflow-hidden rounded-xl bg-black/40">
              <img
                src={turningSurface}
                alt="Cylindrical turning"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Cylindrical Turning</h3>
              <p className="text-sm text-gray-300">
                CNC lathes produce round features with tight concentricity and smooth surface finishes. They are ideal
                for bushings, shafts, pins, spacers, and other rotationally symmetric parts.
              </p>
              <p className="text-sm text-gray-400">
                Typical work includes stepped diameters, chamfers, grooves, and precision fits that benefit from
                accurate control of OD and ID geometry.
              </p>
            </div>
          </article>

          {/* Live tooling */}
          <article className="grid gap-6 md:grid-cols-[3fr,2fr] items-center rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Live Tooling & Secondary Milling</h3>
              <p className="text-sm text-gray-300">
                Live tooling adds milled flats, radial holes, and slots to turned parts without removing them from the
                chuck. This keeps features aligned and reduces total cycle time.
              </p>
              <p className="text-sm text-gray-400">
                It is well-suited for parts that require both precise diameters and milled details, such as valve
                bodies, manifolds, and rotating hardware.
              </p>
            </div>
            <div className="h-48 w-full overflow-hidden rounded-xl bg-black/40">
              <img
                src={turningDetail}
                alt="Live-tool CNC turning"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </article>
        </section>

        {/* Materials */}
        <section className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">Materials for CNC Turning</h2>
            <p className="text-gray-300 max-w-3xl">
              Choose from production-grade metals that cover most cylindrical part applications, from lightweight
              aluminum components to high-strength alloy steels and titanium.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-3 border-b border-white/10 pb-1">
              {turningMaterials.map((material) => (
                <button
                  key={material.id}
                  type="button"
                  onClick={() => setActiveMaterial(material.id)}
                  className={`px-3 pb-2 text-sm font-medium transition ${
                    material.id === activeMaterial
                      ? 'text-white border-b-2 border-[#910A67]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {material.label}
                </button>
              ))}
            </div>

            <div className="grid gap-8 md:grid-cols-[3fr,2fr] items-start">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">{currentMaterial.name}</h3>
                <p className="text-sm text-gray-300">{currentMaterial.description}</p>
              </div>
              <div className="h-64 w-full overflow-hidden rounded-2xl border border-[#301B3F]/40 bg-black/40">
                <img
                  src={currentMaterial.image}
                  alt={currentMaterial.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Surface Finishes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Surface Finishes on Turned Parts</h2>
          <p className="text-gray-300 max-w-3xl">
            Turned surfaces typically have a very smooth as-machined finish. Live-tooled features like flats or slots
            may show fine tool marks, and optional bead blasting or anodizing can further refine appearance and wear.
          </p>
          <div className="grid gap-6 md:grid-cols-3 text-sm text-gray-200">
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">As-Machined</h3>
              <p>
                Lathe-turned diameters have a smooth, bright finish with visible but fine tool paths. This is the
                default finish for most functional components.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Bead Blast</h3>
              <p>
                A light bead blast softens reflections, reduces visible tool marks, and produces a uniform matte
                surface on aluminum and some steels.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Anodizing & Coatings</h3>
              <p>
                Optional anodizing and chromate plating on compatible alloys add corrosion protection, improve wear,
                and enable cosmetic color options.
              </p>
            </div>
          </div>
        </section>

        {/* About CNC Turning */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">What is CNC Turning?</h2>
          <p className="text-gray-300 max-w-3xl">
            CNC turning is a subtractive process where a bar of material rotates in the spindle while stationary or
            moving tools cut away material. The result is highly accurate cylindrical features with repeatable fits and
            finishes.
          </p>
          <p className="text-gray-300 max-w-3xl">
            With live tooling, our lathes also act as small milling centers, machining flats, keyways, cross holes,
            and other details in the same clamping. This improves accuracy and reduces total lead time for your turned
            components.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-gradient-to-r from-[#301B3F] via-[#720455] to-[#910A67] p-8 sm:p-10 text-white space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Ready to Start a CNC Turning Project?</h2>
          <p className="text-white/90 max-w-3xl">
            Upload a 3D CAD file to receive instant manufacturability feedback, interactive pricing, and lead-time
            options for your next prototype or production run of turned parts.
          </p>
          <Button className="rounded-full bg-white text-[#720455] hover:bg-white/90 px-8 py-3 font-semibold w-fit" onClick={() => navigate('/contact')}>
            Get an Online Quote
          </Button>
        </section>
      </div>
    </div>
  );
};

export default CNCTurning;


