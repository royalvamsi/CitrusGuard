import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Citrus, Leaf, Check, ShieldCheck, ArrowRight, ScanLine } from 'lucide-react';

interface HeroSectionProps {
  onScanFruit: () => void;
  onScanLeaf: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScanFruit, onScanLeaf }) => {
  const [activePreview, setActivePreview] = useState<'fruit' | 'leaf'>('fruit');

  return (
    <section className="relative overflow-hidden rounded-3xl bg-white border border-[#DDE6D8] p-7 sm:p-10 lg:p-14 shadow-xs">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#98CC6B]/15 via-[#EEF2EC]/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-[#EEF2EC] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-7 space-y-7 text-left">
          
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2EC] border border-[#DDE6D8] text-[#24361B] text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#98CC6B]" />
            <span>AI-POWERED CITRUS HEALTH &bull; DUAL ENGINE</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#24361B] tracking-tight leading-[1.12] font-heading">
              Protect Your Citrus. <br />
              <span className="text-[#98CC6B]">Detect Disease Earlier.</span>
            </h1>
          </div>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#5D6B55] leading-relaxed max-w-2xl font-normal">
            AI-powered citrus disease detection for fruits and leaves. Upload an image and get an instant diagnosis, 
            disease information, treatment guidance, and preventive measures.
          </p>

          {/* Main CTAs */}
          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={onScanFruit}
              className="px-6 py-4 rounded-xl bg-[#24361B] hover:bg-[#98CC6B] text-white hover:text-[#24361B] border border-[#24361B] hover:border-[#98CC6B] font-semibold text-sm sm:text-base shadow-xs flex items-center gap-2.5 transition-all cursor-pointer"
            >
              <Citrus className="w-5 h-5 text-[#ED7A3B]" />
              <span>Scan a Fruit</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onScanLeaf}
              className="px-6 py-4 rounded-xl bg-white hover:bg-[#EEF2EC] text-[#24361B] border border-[#98CC6B] font-semibold text-sm sm:text-base flex items-center gap-2.5 transition-all cursor-pointer"
            >
              <Leaf className="w-5 h-5 text-[#98CC6B]" />
              <span>Scan a Leaf</span>
              <ArrowRight className="w-4 h-4 text-[#98CC6B] ml-1" />
            </button>
          </div>

          {/* Value Checklist */}
          <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm text-[#5D6B55] font-medium border-t border-[#DDE6D8]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#EEF2EC] border border-[#DDE6D8] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-[#24361B]" />
              </div>
              <span>AI-powered detection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#EEF2EC] border border-[#DDE6D8] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-[#24361B]" />
              </div>
              <span>Fruit + Leaf analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#EEF2EC] border border-[#DDE6D8] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-[#24361B]" />
              </div>
              <span>Instant results</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#EEF2EC] border border-[#DDE6D8] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-[#24361B]" />
              </div>
              <span>Prevention guidance</span>
            </div>
          </div>
        </div>

        {/* Right Column: Specimen Scanning Visual */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          
          {/* Interactive Specimen Toggle */}
          <div className="inline-flex p-1 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8] mb-4 shadow-xs">
            <button
              onClick={() => setActivePreview('fruit')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activePreview === 'fruit'
                  ? 'bg-white text-[#24361B] shadow-xs border border-[#DDE6D8]'
                  : 'text-[#5D6B55] hover:text-[#24361B]'
              }`}
            >
              <Citrus className="w-3.5 h-3.5 text-[#ED7A3B]" />
              <span>Fruit Specimen</span>
            </button>
            <button
              onClick={() => setActivePreview('leaf')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activePreview === 'leaf'
                  ? 'bg-white text-[#24361B] shadow-xs border border-[#DDE6D8]'
                  : 'text-[#5D6B55] hover:text-[#24361B]'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-[#98CC6B]" />
              <span>Foliage Specimen</span>
            </button>
          </div>

          {/* Scanner Device Card */}
          <div className="relative w-full max-w-sm rounded-3xl bg-white border border-[#DDE6D8] p-3.5 shadow-md">
            
            {/* Visual Specimen Container with Scanning Beam */}
            <div className="relative w-full h-72 rounded-2xl bg-[#EEF2EC] overflow-hidden flex items-center justify-center border border-[#DDE6D8]">
              
              <AnimatePresence mode="wait">
                {activePreview === 'fruit' ? (
                  <motion.div
                    key="fruit-visual"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full flex flex-col items-center justify-center p-6"
                  >
                    <img
                      src="/samples/fruit_healthy.jpg"
                      alt="Citrus Fruit Specimen"
                      className="w-52 h-52 object-cover rounded-2xl shadow-sm border-2 border-white/90"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fb = document.getElementById('fruit-fallback');
                        if (fb) fb.style.display = 'flex';
                      }}
                    />
                    <div id="fruit-fallback" className="hidden flex-col items-center justify-center">
                      <span className="text-8xl select-none filter drop-shadow-md">🍊</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="leaf-visual"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full flex flex-col items-center justify-center p-6"
                  >
                    <img
                      src="/samples/leaf_healthy.png"
                      alt="Citrus Leaf Specimen"
                      className="w-52 h-52 object-cover rounded-2xl shadow-sm border-2 border-white/90"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fb = document.getElementById('leaf-fallback');
                        if (fb) fb.style.display = 'flex';
                      }}
                    />
                    <div id="leaf-fallback" className="hidden flex-col items-center justify-center">
                      <span className="text-8xl select-none filter drop-shadow-md">🌿</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Laser Scanning Animation Beam */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#98CC6B] to-transparent shadow-[0_0_15px_#98CC6B] animate-scan-beam pointer-events-none" />
            </div>

            {/* Diagnostic Result Floating Card */}
            <div className="mt-3 p-4 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8] flex items-center justify-between">
              <div className="space-y-0.5 text-left">
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-[#5D6B55]">
                  <ScanLine className="w-3.5 h-3.5 text-[#24361B]" />
                  <span>AI SCAN RESULT</span>
                </div>
                <h4 className="text-base font-extrabold text-[#24361B] font-heading">
                  {activePreview === 'fruit' ? 'Healthy Citrus Sinensis' : 'Optimal Foliar Health'}
                </h4>
                <p className="text-xs text-[#5D6B55]">
                  {activePreview === 'fruit' ? 'Rind pigmentation uniform' : 'No fungal lesions detected'}
                </p>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#98CC6B]/20 border border-[#98CC6B]/40 text-[#24361B] text-xs font-bold font-mono">
                  <ShieldCheck className="w-3 h-3 mr-1 text-[#24361B]" />
                  96.8%
                </span>
                <span className="block text-[10px] text-[#5D6B55] font-medium mt-1">Healthy</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
