import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import sheetHero from '@/assects/Images/Sheet_Metal.jpg';
import sheetProcess from '@/assects/Images/Special_process.jpg';
import sheetDetail from '@/assects/Images/milling.jpg';

const LaserCutting = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Floating circular back button (left-center) */}
      <Button
        onClick={() => navigate('/capabilities/sheet-metals')}
        variant="ghost"
        data-testid="back-btn"
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-[#0d0d0d] border border-[#301B3F]/30 text-gray-300 hover:text-white flex items-center justify-center shadow-lg"
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>

      {/* Hero */}
      <section className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden px-6 py-8 text-center">
        <div className="absolute inset-0">
          <img
            src={sheetHero}
            alt="Metal laser cutting hero"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/60 to-black/90" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6 py-10">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            ISO 9001:2015&nbsp;&nbsp;|&nbsp;&nbsp;ITAR
          </p>
          <h1
            className="mt-4 text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Metal Laser Cutting Service
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Get custom laser‑cut sheet metal parts in as fast as one day. Digital quoting and built‑in DFM feedback
            help you move from prototype flat patterns to production panels, brackets, and housings quickly.
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
        {/* Our process */}
        <section className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2 items-start">
            <div className="space-y-4 py-4">
              <h2 className="text-2xl font-semibold text-white">How Metal Laser Cutting Works</h2>
              <p className="text-gray-300">
                In laser cutting, a focused beam pierces sheet metal and traces programmed paths to create flat
                geometries. This process yields tight tolerances and clean edges on profiles, cutouts, and connector
                openings.
              </p>
              <p className="text-gray-300">
                After cutting, parts are deburred so edges are safe to handle. Flat blanks can ship as‑is or move on to
                forming and assembly as part of a complete sheet metal workflow.
              </p>
              <ul className="space-y-2 text-gray-200 text-sm list-disc list-inside">
                <li>Rapid prototypes and low‑volume production runs</li>
                <li>Efficient runs up to ~50+ parts per configuration</li>
                <li>Standard connectivity features such as USB, HDMI, and Ethernet ports</li>
              </ul>
            </div>
            <div className="h-full">
              <div className="h-72 w-full overflow-hidden rounded-2xl border border-[#301B3F]/40 bg-black/40">
                <img
                  src={sheetProcess}
                  alt="Laser cutting process"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Design guidelines table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white text-center">Laser Cutting Design Guidelines</h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-center">
            Follow these guidelines for flat, laser‑cut parts to ensure quality and accelerate production time.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-[#301B3F]/40 bg-[#111111]">
            <table className="min-w-full text-sm text-left text-gray-200">
              <thead className="bg-[#1f1f1f] text-gray-300">
                <tr>
                  <th className="px-6 py-3 font-semibold">Parameter</th>
                  <th className="px-6 py-3 font-semibold border-l border-white/5">Specification (mm)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 align-top text-white font-medium">Maximum Size</td>
                  <td className="px-6 py-4">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Thickness 3.40–6.35mm: up to 990.6mm × 482.6mm</li>
                      <li>Thickness 0.61–3.40mm: up to 990.6mm × 1,193.6mm</li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 align-top text-white font-medium">Minimum Part Size</td>
                  <td className="px-6 py-4">6.35mm × 6.35mm</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 align-top text-white font-medium">Material Thicknesses</td>
                  <td className="px-6 py-4">0.61mm – 6.35mm</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 align-top text-white font-medium">Tolerances</td>
                  <td className="px-6 py-4">
                    <ul className="list-disc list-inside space-y-1">
                      <li>±0.127mm for most features (except hardware holes)</li>
                      <li>
                        +0.076mm / −0.000mm on hardware insert holes to ensure correct seating of inserts
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Materials table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white text-center">
            Materials and Thicknesses for Laser‑Cut Parts
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-center">
            We support a range of metal sheet materials for laser‑cut components. Based on thickness, the maximum part
            size will vary.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-[#301B3F]/40 bg-[#111111]">
            <table className="min-w-full text-sm text-left text-gray-200">
              <thead className="bg-[#1f1f1f] text-gray-300">
                <tr>
                  <th className="px-6 py-3 font-semibold">Material</th>
                  <th className="px-6 py-3 font-semibold border-l border-white/5">Grade</th>
                  <th className="px-6 py-3 font-semibold border-l border-white/5">Thicknesses Available</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Aluminum</td>
                  <td className="px-6 py-4 border-l border-white/5">
                    <ul className="list-disc list-inside space-y-1">
                      <li>5052‑H32</li>
                      <li>6061‑T6</li>
                    </ul>
                  </td>
                  <td className="px-6 py-4 border-l border-white/5">0.635mm – 6.35mm</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Steel</td>
                  <td className="px-6 py-4 border-l border-white/5">
                    <ul className="list-disc list-inside space-y-1">
                      <li>CRS / HRPO</li>
                      <li>Galvanneal</li>
                      <li>Galvanized</li>
                    </ul>
                  </td>
                  <td className="px-6 py-4 border-l border-white/5">0.635mm – 6.35mm</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Stainless Steel</td>
                  <td className="px-6 py-4 border-l border-white/5">
                    <ul className="list-disc list-inside space-y-1">
                      <li>304‑2B</li>
                      <li>304 #4</li>
                      <li>316‑2B</li>
                    </ul>
                  </td>
                  <td className="px-6 py-4 border-l border-white/5">0.635mm – 6.35mm</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Copper</td>
                  <td className="px-6 py-4 border-l border-white/5">
                    <ul className="list-disc list-inside space-y-1">
                      <li>C1010</li>
                      <li>C1100</li>
                    </ul>
                  </td>
                  <td className="px-6 py-4 border-l border-white/5">0.635mm – 3.175mm</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Brass</td>
                  <td className="px-6 py-4 border-l border-white/5">C260</td>
                  <td className="px-6 py-4 border-l border-white/5">0.635mm – 3.175mm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Applications */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Applications for Laser‑Cut Parts</h2>
          <p className="text-gray-300 max-w-3xl">
            Laser cutting is widely used across energy storage, computer electronics, robotics, and aerospace programs.
          </p>
          <ul className="grid gap-2 md:grid-cols-2 text-gray-200 text-sm">
            <li>• Flat patterns and nested blanks</li>
            <li>• Face plates and control panels</li>
            <li>• Washers and shims</li>
            <li>• Mounting plates and brackets</li>
            <li>• Chassis and enclosure panels</li>
          </ul>
        </section>

        {/* Advantages / service highlights */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Why Use DexAura Laser Cutting?</h2>
          <div className="grid gap-6 md:grid-cols-2 text-sm text-gray-200">
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Fast Turnaround</h3>
              <p>
                Flat laser‑cut parts can ship in as little as a few days for quantities under 50, keeping hardware
                builds and pilot runs on schedule.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Safe, Deburred Edges</h3>
              <p>
                Deburring is included so parts arrive with edges broken and ready to handle right out of the box, with
                reduced risk of burr‑related assembly issues.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Integrated Sheet Metal Workflow</h3>
              <p>
                Flatwork, formed parts, hardware insertion, and finishing are available from a single supplier so your
                full basket of sheet metal components can ship together.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Dedicated Applications Support</h3>
              <p>
                Work with sheet metal engineers to review challenging features, choose materials, and optimize designs
                for both performance and cost.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-gradient-to-r from-[#301B3F] via-[#720455] to-[#910A67] p-8 sm:p-10 text-white space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Ready to Start a Laser‑Cut Sheet Metal Project?</h2>
          <p className="text-white/90 max-w-3xl">
            Share your flat patterns or 3D models to receive instant manufacturability feedback, interactive pricing,
            and lead‑time options for your next batch of laser‑cut parts.
          </p>
          <Button className="rounded-full bg-white text-[#720455] hover:bg-white/90 px-8 py-3 font-semibold w-fit"
          onClick={() => navigate('/contact')}>
            Get an Online Quote
          </Button>
        </section>
      </div>
    </div>
  );
};

export default LaserCutting;


