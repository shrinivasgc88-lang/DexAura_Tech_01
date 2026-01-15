import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ThreeDPrinting = () => {
  return (
    <div className="min-h-screen bg-[#151515] py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-white mb-8" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          3D Printing Services
        </h1>
        <Tabs defaultValue="technologies" className="space-y-8">
          <TabsList className="bg-[#1a1a1a] p-1 rounded-xl">
            <TabsTrigger value="technologies">Technologies</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
          </TabsList>

          <TabsContent value="technologies" className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">3D Printing Technologies</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white">FDM (Fused Deposition Modeling)</h3>
                <p>Build volume: 300x300x300mm | Layer height: 0.1-0.4mm</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">SLA (Stereolithography)</h3>
                <p>High resolution: 0.05mm | Smooth surface finish</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">SLS & MJF</h3>
                <p>Functional parts without supports | Nylon and composite materials</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="materials" className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Materials</h2>
            <ul className="space-y-2 text-gray-300">
              <li>• PLA, ABS, Nylon</li>
              <li>• TPU (flexible)</li>
              <li>• Resin (standard & engineering grade)</li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ThreeDPrinting;
