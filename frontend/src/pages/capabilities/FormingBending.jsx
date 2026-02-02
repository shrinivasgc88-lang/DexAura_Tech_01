import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import sheetHero from '@/assects/Images/Sheet_Metal.jpg';
import sheetProcess from '@/assects/Images/Special_process.jpg';


const FormingBending = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Floating back control (native button + continuous left-slide animation) */}
      <button
        type="button"
        aria-label="Back to Sheet Metals"
        data-testid="back-btn"
        onClick={() => navigate('/capabilities/sheet-metals')}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 p-0 bg-transparent border-none text-[#720455] hover:opacity-90 transition-transform duration-200 animate-bounce-container"
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

      {/* Hero */}
      <section className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden px-6 py-8 text-center">
        <div className="absolute inset-0">
          <img
            src={sheetHero}
            alt="Sheet metal forming hero"
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
            Sheet Metal Forming &amp; Bending
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Get custom press brake formed sheet metal parts for rapid prototyping and production in as fast as three
            days, with CNC‑controlled bends and consistent, repeatable geometry.
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
        {/* What is press brake forming */}
        <section className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2 items-start">
            <div className="space-y-4 py-4">
              <h2 className="text-2xl font-semibold text-white">What is Press Brake Forming?</h2>
              <p className="text-gray-300">
                Press brake forming bends flat sheet metal between an upper punch and a lower die. CNC‑controlled
                backgauges and tooling allow us to create linear bends with precise angles and flange lengths across a
                range of materials and thicknesses.
              </p>
              <p className="text-gray-300">
                This process works well for U‑channels, flanges, brackets, covers, and enclosures that require multiple
                bends. Lead times for qualifying formed parts are as fast as three days.
              </p>
            </div>
            <div className="h-full">
              <div className="h-72 w-full overflow-hidden rounded-2xl border border-[#301B3F]/40 bg-black/40">
                <img
                  src={sheetProcess}
                  alt="Press brake forming"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Design guidelines table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white text-center">
            Sheet Metal Forming Design Guidelines &amp; Capabilities
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-center">
            Follow these guidelines for formed sheet metal parts to ensure consistent quality and fast production
            times.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-[#301B3F]/40 bg-[#111111]">
            <table className="min-w-full text-sm text-left text-gray-200">
              <thead className="bg-[#1f1f1f] text-gray-300">
                <tr>
                  <th className="px-6 py-3 font-semibold">Capability</th>
                  <th className="px-6 py-3 font-semibold border-l border-white/5">Specification</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Maximum Bend Length</td>
                  <td className="px-6 py-4">Up to ~47 in. (1,193mm)</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Minimum Qualifying Part Size</td>
                  <td className="px-6 py-4">Approx. 12.7mm × 12.7mm for formed parts</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Maximum Pressing Force</td>
                  <td className="px-6 py-4">80 tons</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Bend Angles</td>
                  <td className="px-6 py-4">From a 1° “kick” up to roughly 135°</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Bending Output</td>
                  <td className="px-6 py-4">Linear bends including external and internal flanges</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Maximum U‑Channel Ratio</td>
                  <td className="px-6 py-4">2:1 width‑to‑height ratio</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Internal Radius Tooling</td>
                  <td className="px-6 py-4">Standard tooling from ~0.25mm up to 25.4mm; larger radii are bump formed</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Offsets &amp; Hems</td>
                  <td className="px-6 py-4">
                    Standard offset tooling; closed hems up to ~47 in. and open hems up to ~36 in.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Materials table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white text-center">
            Materials &amp; Thicknesses for Formed Parts
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-center">
            We offer a range of sheet metals for formed parts. Maximum bendability depends on thickness and alloy.
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
                    5052‑H32, 6061‑T6 (6061 may require additional review)
                  </td>
                  <td className="px-6 py-4 border-l border-white/5">
                    5052: ~0.635–6.35mm &nbsp;|&nbsp; 6061: ~0.635–3.40mm
                  </td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Steel</td>
                  <td className="px-6 py-4 border-l border-white/5">CRS / HRPO, galvanneal (pre‑plated), galvanized</td>
                  <td className="px-6 py-4 border-l border-white/5">
                    CRS/HRPO: ~0.635–6.35mm &nbsp;|&nbsp; Pre‑plated: ~0.635–3.40mm
                  </td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Stainless Steel</td>
                  <td className="px-6 py-4 border-l border-white/5">304‑2B, 304‑#4, 316‑2B</td>
                  <td className="px-6 py-4 border-l border-white/5">
                    304‑2B: ~0.635–6.35mm; 304‑#4: ~0.635–3.02mm; 316‑2B: ~0.635–3.40mm
                  </td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Copper</td>
                  <td className="px-6 py-4 border-l border-white/5">C1010, C1100</td>
                  <td className="px-6 py-4 border-l border-white/5">~0.635–3.175mm</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Brass</td>
                  <td className="px-6 py-4 border-l border-white/5">C260</td>
                  <td className="px-6 py-4 border-l border-white/5">~0.635–3.175mm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Applications */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Applications for Press Brake Formed Parts</h2>
          <p className="text-gray-300 max-w-3xl">
            Press brake forming is common in energy storage, computer electronics, robotics, medical, and aerospace
            programs.
          </p>
          <ul className="grid gap-2 md:grid-cols-2 text-gray-200 text-sm">
            <li>• Brackets and mounting hardware</li>
            <li>• Busbars and conductive assemblies</li>
            <li>• Covers, panels, and doors</li>
            <li>• Mounts, housings, and enclosures</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-gradient-to-r from-[#301B3F] via-[#720455] to-[#910A67] p-8 sm:p-10 text-white space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Ready to Start a Forming &amp; Bending Project?</h2>
          <p className="text-white/90 max-w-3xl">
            Share your sheet metal designs to receive manufacturability feedback, interactive pricing, and lead‑time
            options for your next batch of formed parts.
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

export default FormingBending;
