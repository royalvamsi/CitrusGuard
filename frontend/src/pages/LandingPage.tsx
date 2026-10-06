import React from 'react';
import { 
  Citrus, 
  Leaf, 
  ArrowRight, 
  Sprout, 
  Droplets, 
  Scissors, 
  Bug 
} from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { StatsSection } from '../components/StatsSection';
import { HowItWorks } from '../components/HowItWorks';
import { CITRUS_DISEASES } from '../data/diseaseDatabase';
import { StatusBadge } from '../components/StatusBadge';

interface LandingPageProps {
  onScanFruit: () => void;
  onScanLeaf: () => void;
  onNavigate: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onScanFruit,
  onScanLeaf,
  onNavigate,
}) => {
  return (
    <div className="space-y-16 pb-16 text-left">
      
      {/* 1. Hero Section */}
      <HeroSection
        onScanFruit={onScanFruit}
        onScanLeaf={onScanLeaf}
      />

      {/* 2. Trust / Impact Strip */}
      <StatsSection />

      {/* 3. How It Works (01 Capture -> 02 Analyze -> 03 Diagnose -> 04 Act) */}
      <HowItWorks />

      {/* 4. AI Detection Showcase (Fruit vs. Leaf) */}
      <section className="space-y-6">
        <div>
          <span className="text-xs uppercase font-bold text-[#5D6B55] tracking-[0.14em]">
            Choose a specimen
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24361B] font-heading tracking-tight mt-1">
            Check fruit or foliage
          </h2>
          <p className="text-sm sm:text-base text-[#5D6B55] mt-1 max-w-2xl">
            Select what you would like to inspect. Each check highlights common symptoms and practical care guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card A: Citrus Fruit */}
          <div className="rounded-3xl bg-white border border-[#DDE6D8] p-8 shadow-xs hover:shadow-md hover:border-[#98CC6B]/60 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8] flex items-center justify-center text-3xl">
                  🍊
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EEF2EC] text-[#24361B] border border-[#DDE6D8]">
                  Fruit health
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#24361B] font-heading group-hover:text-[#24361B] transition-colors">
                  Fruit Rind Disease Detection
                </h3>
                <p className="text-sm text-[#5D6B55] mt-2 leading-relaxed">
                  Check the rind for signs associated with citrus black spot, canker, and greening (HLB).
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {['Black spot', 'Canker', 'Greening (HLB)'].map((condition) => (
                  <span key={condition} className="px-3 py-1.5 rounded-full bg-[#EEF2EC] border border-[#DDE6D8] text-xs text-[#5D6B55]">{condition}</span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#DDE6D8]">
              <button
                onClick={onScanFruit}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#24361B] hover:bg-[#98CC6B] hover:text-[#24361B] text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer group/btn"
              >
                <Citrus className="w-4 h-4 text-[#ED7A3B] group-hover/btn:text-[#24361B]" />
                <span>Scan Citrus Fruit</span>
                <ArrowRight className="w-4 h-4 text-[#98CC6B] group-hover/btn:text-[#24361B]" />
              </button>
            </div>
          </div>

          {/* Card B: Citrus Leaf */}
          <div className="rounded-3xl bg-white border border-[#DDE6D8] p-8 shadow-xs hover:shadow-md hover:border-[#98CC6B]/60 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8] flex items-center justify-center text-3xl">
                  🌿
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EEF2EC] text-[#24361B] border border-[#DDE6D8]">
                  Leaf health
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#24361B] font-heading group-hover:text-[#24361B] transition-colors">
                  Foliage &amp; Leaf Disease Detection
                </h3>
                <p className="text-sm text-[#5D6B55] mt-2 leading-relaxed">
                  Look for common leaf symptoms linked to anthracnose, melanose, canker, and greening.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {['Anthracnose', 'Melanose', 'Canker', 'Greening'].map((condition) => (
                  <span key={condition} className="px-3 py-1.5 rounded-full bg-[#EEF2EC] border border-[#DDE6D8] text-xs text-[#5D6B55]">{condition}</span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#DDE6D8]">
              <button
                onClick={onScanLeaf}
                className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-[#EEF2EC] text-[#24361B] border border-[#DDE6D8] font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer group/btn"
              >
                <Leaf className="w-4 h-4 text-[#98CC6B]" />
                <span>Scan Citrus Leaf</span>
                <ArrowRight className="w-4 h-4 text-[#24361B] group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Disease Guide Spotlight */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-[#98CC6B] tracking-wider">
              Diagnostic Library
            </span>
            <h2 className="text-3xl font-extrabold text-[#24361B] font-heading tracking-tight mt-1">
              Monitored Citrus Pathologies
            </h2>
            <p className="text-sm text-[#5D6B55] mt-1">
              Quick access to clinical symptoms, pathogen etiologies, and chemical spray schedules.
            </p>
          </div>

          <button
            onClick={() => onNavigate('diseases')}
            className="self-start sm:self-auto text-xs sm:text-sm font-bold text-[#24361B] hover:text-[#98CC6B] flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <span>Open Full Disease Guide</span>
            <ArrowRight className="w-4 h-4 text-[#98CC6B]" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(CITRUS_DISEASES).slice(0, 6).map((disease) => (
            <div
              key={disease.id}
              onClick={() => onNavigate('diseases')}
              className="rounded-3xl bg-white border border-[#DDE6D8] p-6 shadow-xs hover:shadow-md hover:border-[#98CC6B] transition-all flex flex-col justify-between group cursor-pointer text-left"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl">
                    {disease.category === 'fruit' ? '🍊' : disease.category === 'leaf' ? '🌿' : '🌱'}
                  </span>
                  <StatusBadge severity={disease.severity} size="sm" />
                </div>

                <div>
                  <h4 className="text-lg font-bold text-[#24361B] font-heading group-hover:text-[#24361B] transition-colors">
                    {disease.name}
                  </h4>
                  <p className="text-xs text-[#5D6B55] italic font-serif mt-0.5">
                    {disease.scientificName}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#5D6B55] line-clamp-2 leading-relaxed">
                  {disease.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DDE6D8] flex items-center justify-between text-xs font-bold text-[#24361B] group-hover:text-[#98CC6B] transition-colors">
                <span>Learn symptoms &amp; remedies</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#98CC6B] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Prevention Spotlight */}
      <section className="rounded-3xl bg-[#24361B] text-white p-8 sm:p-12 shadow-lg relative overflow-hidden border border-[#24361B]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#98CC6B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#98CC6B] text-xs font-semibold">
            <Sprout className="w-3.5 h-3.5 text-[#ED7A3B]" />
            <span>Citrus Health Guide</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight leading-tight text-white">
            Keep your citrus healthy before symptoms appear.
          </h2>

          <p className="text-sm sm:text-base text-[#DDE6D8]/85 leading-relaxed">
            Effective disease control requires strict orchard hygiene, optimized micro-irrigation, 
            aerated pruning, and aggressive psyllid vector management. Explore our grower checklists.
          </p>

          {/* 4 Mini Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs space-y-1">
              <Sprout className="w-4 h-4 text-[#98CC6B]" />
              <h4 className="text-xs font-bold text-white">Orchard Hygiene</h4>
              <p className="text-[11px] text-[#DDE6D8]/80">Remove dropped fruit</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs space-y-1">
              <Droplets className="w-4 h-4 text-[#98CC6B]" />
              <h4 className="text-xs font-bold text-white">Irrigation Timing</h4>
              <p className="text-[11px] text-[#DDE6D8]/80">Dawn micro-jets</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs space-y-1">
              <Scissors className="w-4 h-4 text-[#98CC6B]" />
              <h4 className="text-xs font-bold text-white">Canopy Pruning</h4>
              <p className="text-[11px] text-[#DDE6D8]/80">Maximize airflow</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs space-y-1">
              <Bug className="w-4 h-4 text-[#ED7A3B]" />
              <h4 className="text-xs font-bold text-white">Pest Vectors</h4>
              <p className="text-[11px] text-[#DDE6D8]/80">Psyllid suppression</p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('prevention')}
              className="px-6 py-3.5 rounded-2xl bg-white text-[#24361B] hover:bg-[#98CC6B] hover:text-[#24361B] font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Explore Prevention Protocols</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Bottom Call to Action Banner */}
      <section className="rounded-3xl bg-white border border-[#DDE6D8] p-8 sm:p-12 text-center space-y-5 shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8] flex items-center justify-center mx-auto text-3xl">
          🌱
        </div>

        <div className="max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24361B] font-heading tracking-tight">
            Ready to check your citrus?
          </h2>
          <p className="text-xs sm:text-sm text-[#5D6B55] leading-relaxed">
            Upload any citrus fruit or foliage photograph to identify disease symptoms in seconds.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onScanFruit}
            className="px-6 py-3.5 rounded-2xl bg-[#24361B] hover:bg-[#98CC6B] hover:text-[#24361B] text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer group"
          >
            <Citrus className="w-4 h-4 text-[#ED7A3B] group-hover:text-[#24361B]" />
            <span>Start a Fruit Scan</span>
          </button>

          <button
            onClick={onScanLeaf}
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#EEF2EC] text-[#24361B] border border-[#DDE6D8] font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <Leaf className="w-4 h-4 text-[#98CC6B]" />
            <span>Start a Leaf Scan</span>
          </button>
        </div>
      </section>

    </div>
  );
};
