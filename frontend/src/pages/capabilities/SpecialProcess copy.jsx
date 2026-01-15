import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SpecialProcess = () => {
  return (
    <div className="min-h-screen bg-[#151515] py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-white mb-8" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Special Process Services
        </h1>
        <Tabs defaultValue="heat" className="space-y-8">
          <TabsList className="bg-[#1a1a1a] p-1 rounded-xl">
            <TabsTrigger value="heat">Heat Treatment</TabsTrigger>
            <TabsTrigger value="coating">Coating</TabsTrigger>
            <TabsTrigger value="die">Die Manufacturing</TabsTrigger>
            <TabsTrigger value="other">Other Processes</TabsTrigger>
          </TabsList>

          <TabsContent value="heat" className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Heat Treatment</h2>
            <p className="text-gray-300">Annealing, hardening, tempering, and stress relief for various alloys</p>
          </TabsContent>

          <TabsContent value="coating" className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Surface Coating</h2>
            <p className="text-gray-300">Primer, topcoat, anodizing, and powder coating services</p>
          </TabsContent>

          <TabsContent value="die" className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Die Manufacturing</h2>
            <p className="text-gray-300">Custom die design and manufacturing for stamping and forming operations</p>
          </TabsContent>

          <TabsContent value="other" className="bg-[#1a1a1a] border border-[#301B3F]/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Other Special Treatments</h2>
            <p className="text-gray-300">Custom compliance processes and special treatments per customer requirements</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SpecialProcess;
