import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import sheetHero from '@/assects/Images/Sheet_Metal.jpg';
import sheetProcess from '@/assects/Images/Special_process.jpg';

const Punching = () => {
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
            alt="Sheet metal punching hero"
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
            Sheet Metal Punching Service
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Achieve precise hole patterns, profiles, and formed features in sheet metal parts using CNC punch presses.
            Our punching service supports prototypes through production with fast lead times and a wide range of stocked
            tooling.
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
        {/* What is punching */}
        <section className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2 items-start">
            <div className="space-y-4 py-4">
              <h2 className="text-2xl font-semibold text-white">What is Sheet Metal Punching?</h2>
              <p className="text-gray-300">
                In sheet metal punching, a punch press drives hardened tooling through the sheet and into a mating die to
                shear material. With CNC control, the machine indexes tools across the sheet to create patterns of holes,
                slots, and formed details with high repeatability.
              </p>
              <p className="text-gray-300">
                Punching is ideal when you need high‑volume hole patterns, perforated areas, or specialized forms that
                are difficult to produce economically with laser cutting alone. Features can be produced in a single hit
                or as progressive forms depending on geometry.
              </p>
              <ul className="space-y-2 text-gray-200 text-sm list-disc list-inside">
                <li>Countersinks and countersunk fastener locations</li>
                <li>Panel and part perimeters</li>
                <li>Round, slotted, and shaped hole features</li>
                <li>Perforation patterns for airflow and drainage</li>
                <li>Formed features such as ribs, dimples, louvers, and embosses</li>
              </ul>
            </div>
            <div className="h-full">
              <div className="h-72 w-full overflow-hidden rounded-2xl border border-[#301B3F]/40 bg-black/40">
                <img
                  src={sheetProcess}
                  alt="Sheet metal punching process"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white text-center">Advantages of Punching</h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-center">
            Punching complements laser cutting by adding formed details and efficiently generating repeated features
            across flat sheet metal parts.
          </p>
          <div className="grid gap-6 md:grid-cols-2 text-sm text-gray-200">
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Quick Turnaround</h3>
              <p>
                CNC punch presses use stocked tooling and digital programming to deliver production‑quality punched parts
                in just a few days, even for new geometries.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Design Flexibility</h3>
              <p>
                In‑house and custom punches support louvers, embosses, half‑shears, and extrusions so you can integrate
                mechanical, thermal, and cosmetic requirements into a single sheet metal component.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Scales from 1 to 1000+ Parts</h3>
              <p>
                Punching is well suited for everything from single prototypes and pilot runs through higher‑volume
                production, with consistent feature quality across builds.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Integrated Assemblies</h3>
              <p>
                Punched features pair with forming, hardware insertion, welding, and finishing so enclosures and
                brackets can arrive as complete, ready‑to‑install assemblies.
              </p>
            </div>
          </div>
        </section>

        {/* Design guidelines & capabilities */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white text-center">
            Punching Design Guidelines &amp; Capabilities
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-center">
            Use these guidelines when designing punched sheet metal components to balance feature complexity, part
            quality, and cost.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-[#301B3F]/40 bg-[#111111]">
            <table className="min-w-full text-sm text-left text-gray-200">
              <thead className="bg-[#1f1f1f] text-gray-300">
                <tr>
                  <th className="px-6 py-3 font-semibold">Parameter</th>
                  <th className="px-6 py-3 font-semibold border-l border-white/5">Guideline</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Minimum Hole Size</td>
                  <td className="px-6 py-4">
                    As a general rule, design hole diameters at least equal to the material thickness to maintain punch
                    and die life and reduce risk of distortion.
                  </td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Minimum Web Between Features</td>
                  <td className="px-6 py-4">
                    Keep the web (material between adjacent holes or slots) at least one material thickness to avoid
                    tearing, distortion, and excessive burrs.
                  </td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Distance from Bends</td>
                  <td className="px-6 py-4">
                    Place punched features at least 2× material thickness away from bend lines whenever possible to
                    protect features from deformation during forming.
                  </td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Edge Distance</td>
                  <td className="px-6 py-4">
                    Maintain at least one material thickness from punched features to the nearest part edge for most
                    designs; increase spacing for large or highly loaded features.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Materials */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white text-center">Materials for Punched Parts</h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-center">
            Most sheet metal materials that work for laser cutting can also be punched, though recommended thickness
            ranges differ by alloy.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-[#301B3F]/40 bg-[#111111]">
            <table className="min-w-full text-sm text-left text-gray-200">
              <thead className="bg-[#1f1f1f] text-gray-300">
                <tr>
                  <th className="px-6 py-3 font-semibold">Material</th>
                  <th className="px-6 py-3 font-semibold border-l border-white/5">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Aluminum 5052‑H32</td>
                  <td className="px-6 py-4 border-l border-white/5">
                    Common for enclosures and brackets; supports both flat punching and many formed punch features in
                    typical sheet thicknesses.
                  </td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Aluminum 6061‑T6</td>
                  <td className="px-6 py-4 border-l border-white/5">
                    Suited for profiles and hole patterns; some formed punch features may be limited due to material
                    hardness.
                  </td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Low‑Carbon &amp; CR Steels</td>
                  <td className="px-6 py-4 border-l border-white/5">
                    CR 1008 and similar grades are widely used for structural brackets, chassis, and internal frames
                    where strength and cost are both critical.
                  </td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Galvanized &amp; Galvannealed Steel</td>
                  <td className="px-6 py-4 border-l border-white/5">
                    Pre‑plated steels provide built‑in corrosion resistance for enclosures and outdoor installations.
                  </td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Copper &amp; Brass</td>
                  <td className="px-6 py-4 border-l border-white/5">
                    Well‑suited for electrical busbars, contacts, RF shields, and decorative hardware where conductivity
                    or appearance is important.
                  </td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="px-6 py-4 text-white font-medium">Stainless Steels</td>
                  <td className="px-6 py-4 border-l border-white/5">
                    Used for corrosion‑resistant panels and enclosures in industrial, medical, and food‑contact
                    environments.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Applications & finishing */}
        <section className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Applications for Punched Sheet Metal Parts</h2>
            <p className="text-gray-300 max-w-3xl">
              Punching is used for both standalone flat parts and complex assemblies across electronics, industrial, and
              consumer products.
            </p>
            <ul className="grid gap-2 md:grid-cols-2 text-gray-200 text-sm">
              <li>• Ventilated panels and covers with perforation patterns</li>
              <li>• Electrical and electronics enclosures with connector cutouts</li>
              <li>• Chassis and brackets with embosses, louvers, and stiffening ribs</li>
              <li>• Mounting plates and busbars with dense, repeatable hole arrays</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Finishing &amp; Assembly Options</h2>
            <p className="text-gray-300 max-w-3xl">
              Punched parts can be shipped as individual components or fully assembled with finishing applied so they are
              ready to install on arrival.
            </p>
            <div className="grid gap-6 md:grid-cols-3 text-sm text-gray-200">
              <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
                <h3 className="text-white font-semibold text-base">Hardware &amp; Assembly</h3>
                <p>
                  Hardware insertion, riveting, and welding bring multiple punched components together into sub‑assemblies
                  and final weldments.
                </p>
              </div>
              <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
                <h3 className="text-white font-semibold text-base">Protective Coatings</h3>
                <p>
                  Plating, conversion coatings, and powder coating improve corrosion resistance, wear performance, and
                  cosmetics for customer‑facing hardware.
                </p>
              </div>
              <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
                <h3 className="text-white font-semibold text-base">Part Marking</h3>
                <p>
                  Marking and labeling options help track revisions, part numbers, and critical orientation or assembly
                  information across complex builds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-gradient-to-r from-[#301B3F] via-[#720455] to-[#910A67] p-8 sm:p-10 text-white space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Ready to Start a Punching Project?</h2>
          <p className="text-white/90 max-w-3xl">
            Share your sheet metal designs to receive manufacturability feedback, interactive pricing, and lead‑time
            options for punched components and assemblies.
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

export default Punching;


