import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import sheetHero from '@/assects/Images/Sheet_Metal.jpg';
import sheetProcess from '@/assects/Images/Special_process.jpg';

const FabricatedAssemblies = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Back Button */}
      <div className="bg-[#0d0d0d] border-b border-[#301B3F]/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            onClick={() => navigate('/capabilities/sheet-metals')}
            variant="ghost"
            className="text-gray-300 hover:text-white"
            data-testid="back-btn"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {/* Hero */}
      <section className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden px-6 py-8 text-center">
        <div className="absolute inset-0">
          <img
            src={sheetHero}
            alt="Sheet metal assemblies hero"
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
            Sheet Metal Fabricated Assemblies
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Get custom sheet metal assemblies that combine cutting, forming, hardware insertion, welding, and finishing.
            Upload your top-level assembly to move from prototype brackets to fully finished, end-use enclosures in as
            fast as a few days.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button className="rounded-full bg-gradient-to-r from-[#720455] to-[#910A67] text-white px-8 py-3 text-sm font-semibold"
            onClick={() => navigate('/contact')}>
              Share Your Assembly
            </Button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 max-w-6xl space-y-16 py-10">
        {/* Overview / how it works */}
        <section className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2 items-start">
            <div className="space-y-4 py-4">
              <h2 className="text-2xl font-semibold text-white">What are Sheet Metal Fabricated Assemblies?</h2>
              <p className="text-gray-300">
                Fabricated assemblies combine multiple sheet metal components—cut, formed, and finished—into welded or
                fastened structures. Typical assemblies include chassis, enclosures, frames, and brackets that arrive
                ready for integration into your product.
              </p>
              <p className="text-gray-300">
                Our workflow starts with flat cutting via laser or punching, followed by forming on press brakes,
                hardware insertion, and, when specified, welding or riveting. Finishing processes such as plating,
                powder coating, and part marking round out the build so your assemblies are production-ready.
              </p>
              <ul className="space-y-2 text-gray-200 text-sm list-disc list-inside">
                <li>Supports functional prototypes, product testing, and pilot builds</li>
                <li>Scales to low-volume end-use production</li>
                <li>Includes optional inspection and material/finish certifications</li>
              </ul>
            </div>
            <div className="h-full">
              <div className="h-72 w-full overflow-hidden rounded-2xl border border-[#301B3F]/40 bg-black/40">
                <img
                  src={sheetProcess}
                  alt="Sheet metal assembly process"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* File formats & materials */}
        <section className="space-y-10">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            {/* File format */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Assembly File Formats</h2>
              <p className="text-gray-300">
                For best results, submit a top‑level assembly STEP file or a SOLIDWORKS assembly (.sldasm) with separate
                component part files (.sldpart). If your design is a weldment, include a 2D drawing that clearly calls
                out weld locations and any critical tolerances.
              </p>
              <ul className="space-y-2 text-gray-200 text-sm list-disc list-inside">
                <li>Top‑level assembly STEP or SOLIDWORKS files preferred</li>
                <li>2D drawings for weld symbols, critical dimensions, and notes</li>
                <li>Component‑only submissions supported when final assembly occurs in‑house</li>
              </ul>
            </div>

            {/* Materials */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Common Assembly Materials</h2>
              <p className="text-gray-300">
                We use industry‑standard sheet metal thicknesses that offer good formability, weldability, and corrosion
                resistance for assemblies.
              </p>
              <ul className="space-y-2 text-gray-200 text-sm list-disc list-inside">
                <li>Aluminum 5052‑H32</li>
                <li>Low‑carbon steel CR 1008</li>
                <li>Stainless steels 304/304L and 316/316L</li>
                <li>
                  Pre‑plated steels (galvanized, galvannealed) for riveted or hardware‑based assembly where welding is
                  less suitable
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Assembly construction guidelines */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white text-center">Assembly Construction Guidelines</h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-center">
            Thoughtful assembly design helps control cost, manage tolerance stack‑ups, and ensure robust performance in
            the field.
          </p>

          <div className="grid gap-6 md:grid-cols-3 text-sm text-gray-200">
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Overall Envelope</h3>
              <p>
                Typical maximum finished assembly size is around 47 in. × 39 in. × 36 in. (1194mm × 991mm × 914mm),
                balancing part reach, fixturing, and shipping constraints.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Formed Features</h3>
              <p>
                Linear bends, hems, jogs, and large‑radius features are created via press brakes and bump forming.
                Punch‑formed features like louvers, ribs, and dimples can be integrated where needed.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Tolerances &amp; Stack‑ups</h3>
              <p>
                Standard sheet metal tolerances apply; for tight fits and interfaces, call out critical dimensions and
                use drawings to communicate stack‑up requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Hardware insertion & welding / riveting */}
        <section className="space-y-10">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            {/* Hardware insertion */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Hardware Insertion</h2>
              <p className="text-gray-300">
                A wide range of self‑clinching and panel hardware from brands like PEM and Southco can be integrated into
                your assemblies without adding lead time.
              </p>
              <ul className="space-y-2 text-gray-200 text-sm list-disc list-inside">
                <li>Self‑clinching nuts, studs, and standoffs</li>
                <li>Flush‑head pins and blind fasteners</li>
                <li>Panel fasteners and micro hardware for compact assemblies</li>
              </ul>
              <p className="text-gray-300 text-sm">
                Model hardware as separate solid bodies when possible and note any special requirements in your 2D
                documentation.
              </p>
            </div>

            {/* Welding & riveting */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Welding &amp; Riveting</h2>
              <p className="text-gray-300">
                MIG and TIG welding join components into rigid structures, while pop and solid rivets offer an
                alternative when heat input or dissimilar materials are a concern.
              </p>
              <ul className="space-y-2 text-gray-200 text-sm list-disc list-inside">
                <li>Specify weld locations and any critical weld requirements on 2D drawings</li>
                <li>Use material thicknesses between ~1.07mm and 6.35mm for welded assemblies</li>
                <li>Consider riveting for pre‑plated steels or when you want easier rework and less heat distortion</li>
              </ul>
              <p className="text-gray-300 text-sm">
                Welding typically adds about one business day to lead time, while hardware insertion can often be
                included without additional days.
              </p>
            </div>
          </div>
        </section>

        {/* Finishing options */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Finishing Options for Assemblies</h2>
          <p className="text-gray-300 max-w-3xl">
            Finishing protects assemblies in service and elevates the appearance of customer‑facing hardware. Most
            finishes add only a small amount of time to the overall build.
          </p>
          <div className="grid gap-6 md:grid-cols-3 text-sm text-gray-200">
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Plating &amp; Surface Prep</h3>
              <p>
                Plating and conversion coatings improve corrosion resistance and conductivity while preparing surfaces
                for additional paint or powder finishes.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Powder Coat &amp; Wet Paint</h3>
              <p>
                Durable color finishes for enclosures, panels, and frames that must stand up to handling, abrasion, and
                outdoor environments.
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#301B3F]/40 p-5 space-y-2">
              <h3 className="text-white font-semibold text-base">Masking &amp; Marking</h3>
              <p>
                Masking protects critical surfaces during finishing, while part marking supports traceability, revision
                control, and clear assembly orientation.
              </p>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            Most finishes add roughly 1–2 days per finish. Request material, finish, and inspection certifications at
            quote time when needed.
          </p>
        </section>

        {/* Applications */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Applications for Fabricated Assemblies</h2>
          <p className="text-gray-300 max-w-3xl">
            Fabricated sheet metal assemblies are common anywhere robust, lightweight structures are required, from
            electronics to industrial equipment.
          </p>
          <ul className="grid gap-2 md:grid-cols-2 text-gray-200 text-sm">
            <li>• Electrical enclosures, racks, and cabinets</li>
            <li>• Computer, networking, and telecom chassis</li>
            <li>• Machine frames, guards, and access panels</li>
            <li>• Industrial and medical equipment housings</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-gradient-to-r from-[#301B3F] via-[#720455] to-[#910A67] p-8 sm:p-10 text-white space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Ready to Start a Fabricated Assembly Project?</h2>
          <p className="text-white/90 max-w-3xl">
            Upload your assembly CAD and drawings to receive manufacturability feedback, interactive pricing, and
            lead‑time options for complete sheet metal assemblies.
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

export default FabricatedAssemblies;


