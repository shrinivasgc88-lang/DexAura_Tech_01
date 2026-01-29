import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import sheetHero from '@/assects/Images/Sheet_Metal.jpg';
import sheetProcess from '@/assects/Images/Special_process.jpg';
import sheetDetail from '@/assects/Images/milling.jpg';

import { ArrowLeft } from 'lucide-react';

const SheetMetals = () => {
  // Hero slideshow images (reuse a few sheet metal related visuals)
  const heroSlides = [sheetHero, sheetProcess, sheetDetail];
  const [heroIndex, setHeroIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (heroSlides.length <= 1) return undefined;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Floating circular back button (left-center) */}
      <Button
        onClick={() => navigate('/capabilities')}
        variant="ghost"
        data-testid="back-btn"
        className="fixed left-10 top-1/2 -translate-y-1/2 z-50 w-16 h-16 rounded-full bg-[#0d0d0d] border-2 border-[#301B3F]/30 text-gray-300 hover:bg-[#720455] hover:border-transparent hover:text-white flex items-center justify-center shadow-2xl transition-all duration-300"
      >
        <ArrowLeft className="w-10 h-10" />
      </Button>
      {/* Hero with slideshow background */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden px-6 py-8 text-center">
        <div className="absolute inset-0">
          {heroSlides.map((src, idx) => (
            <img
              key={`${src}-${idx}`}
              src={src}
              alt="Sheet metal fabrication hero"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                idx === heroIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-black/90" />
        </div>

        <div className="relative z-10 container mx-auto max-w-4xl flex flex-col items-center justify-center gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            ISO 9001:2015&nbsp;&nbsp;|&nbsp;&nbsp;ITAR
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Sheet Metal Fabrication Service
        </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Online custom sheet metal components and assemblies in as fast as a few days, with laser cutting,
            forming and bending, punching, and fully fabricated assemblies.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Button className="rounded-full bg-gradient-to-r from-[#720455] to-[#910A67] text-white px-8 py-3 text-sm font-semibold"
            onClick={() => navigate('/contact')}>
              Get a Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 max-w-6xl space-y-16 py-10">
        {/* Capability cards similar to CNCMachining */}
        <section className="space-y-8 py-6">
          <h2 className="text-3xl font-semibold text-white text-center">
            Sheet Metal Fabrication Capabilities
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-center">
            Combine digital quoting, automated DFM feedback, and a broad range of fabrication and finishing options to
            move from flat sheets to finished assemblies quickly.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Laser Cutting */}
            <article className="group relative overflow-hidden rounded-3xl border border-[#301B3F]/40 shadow-xl shadow-black/40 h-80 hover:border-[#720455] transition-all duration-300 hover:shadow-xl hover:shadow-[#720455]/20 cursor-pointer" onClick={() => navigate('/capabilities/sheet-metals/laser-cutting')}>
              <img
                src={sheetHero}
                alt="Laser cutting"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80 pointer-events-none" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 px-8 py-8 text-center">
                <h3 className="text-2xl font-bold text-white">Laser Cutting</h3>
                <p className="text-gray-300 max-w-xs leading-relaxed">
                  High-powered lasers cut precise profiles and internal features in flat sheet metal with minimal heat-affected zones.
                </p>
                <Button
                  className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-[#720455]/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/capabilities/sheet-metals/laser-cutting');
                  }}
                >
                  Learn More
                </Button>
              </div>
            </article>

            {/* Forming and Bending */}
            <article className="group relative overflow-hidden rounded-3xl border border-[#301B3F]/40 shadow-xl shadow-black/40 h-80 hover:border-[#720455] transition-all duration-300 hover:shadow-xl hover:shadow-[#720455]/20 cursor-pointer" onClick={() => navigate('/capabilities/sheet-metals/forming-bending')}>
              <img
                src={sheetProcess}
                alt="Forming and bending"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80 pointer-events-none" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 px-8 py-8 text-center">
                <h3 className="text-2xl font-bold text-white">Forming and Bending</h3>
                <p className="text-gray-300 max-w-xs leading-relaxed">
                  Press brakes form flat blanks into channels, brackets, and enclosures with controlled bend radii and sequencing.
                </p>
                <Button
                  className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-[#720455]/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/capabilities/sheet-metals/forming-bending');
                  }}
                >
                  Learn More
                </Button>
              </div>
            </article>

            {/* Punching */}
            <article className="group relative overflow-hidden rounded-3xl border border-[#301B3F]/40 shadow-xl shadow-black/40 h-80 hover:border-[#720455] transition-all duration-300 hover:shadow-xl hover:shadow-[#720455]/20 cursor-pointer" onClick={() => navigate('/capabilities/sheet-metals/punching')}>
              <img
                src={sheetDetail}
                alt="Punching"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80 pointer-events-none" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 px-8 py-8 text-center">
                <h3 className="text-2xl font-bold text-white">Punching</h3>
                <p className="text-gray-300 max-w-xs leading-relaxed">
                  Punch presses combine tooling and dies to cut profiles, louvers, and formed features efficiently.
                </p>
                <Button
                  className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-[#720455]/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/capabilities/sheet-metals/punching');
                  }}
                >
                  Learn More
                </Button>
              </div>
            </article>

            {/* Fabricated Assemblies */}
            <article className="group relative overflow-hidden rounded-3xl border border-[#301B3F]/40 shadow-xl shadow-black/40 h-80 hover:border-[#720455] transition-all duration-300 hover:shadow-xl hover:shadow-[#720455]/20 cursor-pointer" onClick={() => navigate('/capabilities/sheet-metals/fabricated-assemblies')}>
              <img
                src={sheetProcess}
                alt="Fabricated assemblies"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80 pointer-events-none" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 px-8 py-8 text-center">
                <h3 className="text-2xl font-bold text-white">Fabricated Assemblies</h3>
                <p className="text-gray-300 max-w-xs leading-relaxed">
                  Welded and fastened assemblies bring multiple sheet metal components together into finished chassis and enclosures.
                </p>
                <Button
                  className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-[#720455]/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/capabilities/sheet-metals/fabricated-assemblies');
                  }}
                >
                  Learn More
                </Button>
              </div>
            </article>
          </div>
        </section>

        {/* How it works */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">How Sheet Metal Fabrication Works</h2>
          <p className="text-gray-300 max-w-3xl">
            During fabrication, thin sheet metal stock is placed on a flat bed where programmed lasers or punches cut
            part profiles and internal features. After deburring, parts move to the press brake where bends and flanges
            are formed, and then onto secondary operations like hardware insertion, welding, and finishing.
          </p>
        </section>

        {/* Advantages */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Advantages of Sheet Metal Fabrication</h2>
          <div className="grid gap-6 md:grid-cols-3 text-sm text-gray-200">
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Low Material Waste</h3>
              <p>
                Nesting parts in flat sheet stock minimizes scrap, making sheet metal a cost-effective option from
                prototypes through production.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Scales to Production</h3>
              <p>
                The same cutting, forming, and assembly processes support low-volume development parts and higher-volume
                commodity components.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Rich Finishing Options</h3>
              <p>
                Anodizing, plating, powder coating, silk screening, and part marking turn raw blanks into
                end‑user‑facing hardware.
              </p>
            </div>
          </div>
        </section>

        {/* Capability to lead-time map (condensed) */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Capabilities & Lead Times</h2>
          <div className="grid gap-6 md:grid-cols-3 text-sm text-gray-200">
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">3‑Day Lead Time</h3>
              <p className="text-gray-300">
                Cutting (laser or punch), deburring, forming/bending (≤12 bends), hardware insertion, and
                tapping/countersinks for brackets, covers, panels, and mounts.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">5‑Day Lead Time</h3>
              <p className="text-gray-300">
                All 3‑day options plus machined features, complex forming sequences, hems, jogs, and punch‑formed
                details for more intricate housings and internal components.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Additional Customizations</h3>
              <p className="text-gray-300">
                Welding, assembly, powder coating, plating/coating, masking, silk screening, and part marking for
                full, end‑use assemblies.
              </p>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Sheet Metal Applications</h2>
          <p className="text-gray-300 max-w-3xl">
            Sheet metal is used across electronics, industrial, and consumer products wherever lightweight,
            high‑strength metal components are required.
          </p>
          <ul className="grid gap-2 md:grid-cols-2 text-gray-200 text-sm">
            <li>• Electrical enclosures and chassis</li>
            <li>• Computer and networking electronics</li>
            <li>• Brackets, cabinets, and mounts</li>
            <li>• Appliance panels and internal structures</li>
          </ul>
        </section>

        {/* Materials */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Sheet Metal Material Options</h2>
          <p className="text-gray-300 max-w-3xl">
            Choose from production-grade metals commonly used for enclosures, brackets, and structural components.
          </p>
          <ul className="grid gap-2 md:grid-cols-3 text-gray-200 text-sm">
            <li>• Aluminum</li>
            <li>• Brass</li>
            <li>• Copper</li>
            <li>• Stainless Steel</li>
            <li>• Cold‑rolled Steel (non‑treated)</li>
            <li>• CR Galvanneal and CR Galvanized Steel</li>
            </ul>
        </section>

        {/* Finishing options */}
        {/* <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Sheet Metal Finishing Options</h2>
          <div className="grid gap-6 md:grid-cols-3 text-sm text-gray-200">
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Powder Coating</h3>
              <p>
                Durable, uniform color finishes for chassis, panels, and customer‑facing assemblies, with added
                corrosion and wear resistance.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Plating & Coatings</h3>
              <p>
                Plating, conversion coatings, and masking options that support conductivity, corrosion protection, and
                cosmetic requirements.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Welding & Assembly</h3>
              <p>
                Weldments, hardware insertion, and multi‑component assembly provide complete, ready‑to‑install sheet
                metal products.
              </p>
            </div>
          </div>
        </section> */}

        {/* Why choose us (condensed from Protolabs benefits) */}
        {/* <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Why Choose DexAura for Sheet Metal Parts?</h2>
          <div className="grid gap-6 md:grid-cols-2 text-sm text-gray-200">
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Fast, Simple Quoting</h3>
              <p>
                Upload CAD, configure materials and finishes, and receive DFM feedback in minutes so you can iterate
                designs quickly.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Reliable Domestic Capacity</h3>
              <p>
                Digitally enabled production with deep in‑house capacity and vetted local finishing partners helps keep
                lead times predictable from prototype to assemblies.
              </p>
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default SheetMetals;

