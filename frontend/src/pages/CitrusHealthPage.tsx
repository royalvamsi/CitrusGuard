import React from 'react';
import { 
  Sprout, 
  CheckCircle2, 
  Droplets, 
  Scissors, 
  Bug, 
  Search, 
  ArrowRight,
  ShieldCheck,
  Eye,
  Sun,
  Activity
} from 'lucide-react';

interface CitrusHealthPageProps {
  onScanFruit?: () => void;
  onScanLeaf?: () => void;
  onNavigate?: (tab: string) => void;
}

export const CitrusHealthPage: React.FC<CitrusHealthPageProps> = ({
  onScanFruit,
  onScanLeaf,
  onNavigate,
}) => {
  const warningSigns = [
    {
      icon: '🍃',
      title: 'Leaf Discoloration',
      subtitle: 'Chlorosis & Mottling',
      description: 'Look for asymmetrical yellow blotches crossing veins (indicative of HLB) or pale green interveinal chlorosis indicating nutrient or phloem stress.',
      action: 'Examine leaf underside and check flush cycles',
      category: 'Foliar Health'
    },
    {
      icon: '🍊',
      title: 'Fruit Lesions',
      subtitle: 'Rind Pitting & Spots',
      description: 'Sunken reddish-brown circular craters with raised margins (Black Spot) or corky crater-like eruptive blemishes (Canker) compromising rind integrity.',
      action: 'Check mature fruit color-break zones',
      category: 'Harvest Quality'
    },
    {
      icon: '🌿',
      title: 'Unusual Growth',
      subtitle: 'Foliar Distortion & Stunting',
      description: 'Curled leaf margins, stunted terminal shoot flushes, or small bunched "rabbit ear" leaves caused by systemic bacterial pathogens or viral infections.',
      action: 'Inspect new vegetative flushes',
      category: 'Vascular System'
    },
    {
      icon: '🟤',
      title: 'Dark Necrotic Spots',
      subtitle: 'Sandpaper pustules',
      description: 'Small raised dark-brown or black pustules with a distinct sandpaper rough feel on young leaves and fruitlets, common with Melanose fungal colonization.',
      action: 'Inspect canopy inner twigs for dead wood',
      category: 'Fungal Risk'
    },
    {
      icon: '💧',
      title: 'Moisture Symptoms',
      subtitle: 'Water-soaked margins',
      description: 'Translucent, oily, water-soaked haloes surrounding early-stage leaf blemishes before tissue dries into corky necrosis under warm, humid conditions.',
      action: 'Check grove drainage and canopy airflow',
      category: 'Microclimate'
    },
    {
      icon: '🐛',
      title: 'Pest Vector Damage',
      subtitle: 'Leafminer trails & Psyllids',
      description: 'Silvery serpentine tunnels made by leafminer larvae that tear open the protective cuticle, or honeydew and sooty mold deposits left by Asian Citrus Psyllids.',
      action: 'Deploy yellow sticky traps along borders',
      category: 'Vector Control'
    },
  ];

  const healthyPractices = [
    {
      icon: <Search className="w-5 h-5 text-[#24361B]" />,
      title: 'Regular Field Inspection',
      description: 'Scout orchards every 10–14 days in a structured zig-zag transect. Catching the very first symptomatic tree prevents exponential canopy spread.',
      frequency: 'Every 10–14 days',
    },
    {
      icon: <Droplets className="w-5 h-5 text-[#98CC6B]" />,
      title: 'Proper Irrigation Timing',
      description: 'Irrigate at dawn using micro-jets or drip lines. Avoid overhead sprinklers and evening watering to prevent prolonged rind and foliar wetness.',
      frequency: 'Early dawn schedule',
    },
    {
      icon: <Scissors className="w-5 h-5 text-[#98CC6B]" />,
      title: 'Canopy Management & Skirting',
      description: 'Prune dead and congested inner branches to maximize sunlight penetration and airflow. Skirt lower limbs to 60 cm above the orchard floor.',
      frequency: 'Late winter / Pre-bloom',
    },
    {
      icon: <Sprout className="w-5 h-5 text-[#24361B]" />,
      title: 'Orchard Floor Sanitation',
      description: 'Quickly remove fallen leaf litter and culled fruit where fungal ascospores overwinter. Maintain weed-free tree rows to eliminate moisture traps.',
      frequency: 'Continuous & Post-harvest',
    },
    {
      icon: <Bug className="w-5 h-5 text-[#ED7A3B]" />,
      title: 'Systematic Pest Monitoring',
      description: 'Aggressively scout young flush shoots for Asian Citrus Psyllids and leafminers. Protect new vegetative flushes before insect vectors establish.',
      frequency: 'Synchronized with flushes',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#98CC6B]" />,
      title: 'Early Diagnostic Intervention',
      description: 'At the first sign of an unconfirmed lesion, scan with CitrusGuard AI to identify whether symptoms reflect fungal blight, bacterial canker, or nutrient deficiency.',
      frequency: 'Immediate upon suspect sighting',
    },
  ];

  return (
    <div className="space-y-12 pb-16 text-left max-w-6xl mx-auto">
      
      {/* Hero Section */}
      <div className="rounded-3xl bg-white border border-[#DDE6D8] p-8 sm:p-12 shadow-xs space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#98CC6B]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2EC] border border-[#DDE6D8] text-[#24361B] text-xs font-semibold">
          <Activity className="w-3.5 h-3.5 text-[#98CC6B]" />
          <span>Citrus Health &amp; Diagnostic Guide</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24361B] font-heading tracking-tight leading-tight">
          Understanding Citrus Health
        </h1>

        <p className="text-sm sm:text-base text-[#5D6B55] max-w-2xl leading-relaxed">
          Learn how to identify early warning signs of citrus disease, understand pathogen behavior, 
          and maintain healthier, more productive trees throughout the complete growing season.
        </p>

        {/* Quick Action Buttons */}
        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={onScanFruit}
            className="px-5 py-3 rounded-2xl bg-[#24361B] hover:bg-[#98CC6B] hover:text-[#24361B] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer group"
          >
            <span>Scan a Fruit Specimen</span>
            <ArrowRight className="w-4 h-4 text-[#98CC6B] group-hover:text-[#24361B] transition-colors" />
          </button>

          <button
            onClick={onScanLeaf}
            className="px-5 py-3 rounded-2xl bg-white hover:bg-[#EEF2EC] text-[#24361B] border border-[#DDE6D8] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Scan a Leaf Specimen</span>
            <ArrowRight className="w-4 h-4 text-[#24361B]" />
          </button>
        </div>
      </div>

      {/* Section 1: Early Warning Signs */}
      <section className="space-y-6">
        <div>
          <span className="text-xs uppercase font-bold text-[#98CC6B] tracking-wider">
            Field Symptomology
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24361B] font-heading mt-1">
            Early Warning Signs
          </h2>
          <p className="text-xs sm:text-sm text-[#5D6B55] mt-1 max-w-xl">
            Catching symptoms at onset allows localized cultural or chemical treatment before infection spreads orchard-wide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warningSigns.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-[#DDE6D8] p-6 shadow-xs hover:shadow-md hover:border-[#98CC6B]/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-2 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8] inline-block">
                    {item.icon}
                  </span>
                  <span className="text-[11px] font-semibold text-[#5D6B55] bg-[#EEF2EC] px-2.5 py-1 rounded-full border border-[#DDE6D8]">
                    {item.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#24361B] font-heading group-hover:text-[#24361B] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#98CC6B] font-semibold mt-0.5">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#5D6B55] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#DDE6D8] flex items-center justify-between text-xs text-[#5D6B55]">
                <span className="font-medium text-[#24361B]">{item.action}</span>
                <Eye className="w-3.5 h-3.5 text-[#98CC6B]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Healthy Citrus Practices */}
      <section className="space-y-6">
        <div>
          <span className="text-xs uppercase font-bold text-[#98CC6B] tracking-wider">
            Horticultural Best Practices
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24361B] font-heading mt-1">
            Healthy Citrus Practices
          </h2>
          <p className="text-xs sm:text-sm text-[#5D6B55] mt-1 max-w-xl">
            Proven cultural management routines to keep tree canopies resilient, optimize rind finish, and maximize marketable yield.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthyPractices.map((practice, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-[#DDE6D8] p-6 shadow-xs hover:border-[#98CC6B]/60 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8] flex items-center justify-center">
                  {practice.icon}
                </div>
                <span className="text-[11px] font-mono font-bold text-[#24361B] bg-[#EEF2EC] px-2.5 py-0.5 rounded-full border border-[#DDE6D8]">
                  {practice.frequency}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#24361B] font-heading">
                  {practice.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5D6B55] leading-relaxed">
                  {practice.description}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-xs text-[#24361B] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#98CC6B]" />
                <span>Recommended Standard</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Seasonal Action Planner */}
      <section className="rounded-3xl bg-[#24361B] text-white p-8 sm:p-12 shadow-lg space-y-6 border border-[#24361B]">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#98CC6B] text-xs font-semibold">
            <Sun className="w-3.5 h-3.5 text-[#ED7A3B]" />
            <span>Seasonal Calendar</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Seasonal Citrus Care Checklist
          </h3>

          <p className="text-xs sm:text-sm text-[#DDE6D8]/85 leading-relaxed">
            Aligning your management interventions with seasonal physiological milestones ensures maximum protection with minimal chemical applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
            <span className="text-[11px] font-bold uppercase text-[#98CC6B] tracking-wider">Spring &bull; Pre-Bloom</span>
            <h4 className="font-bold text-white text-sm">Canopy Pruning &amp; Flushes</h4>
            <p className="text-[#DDE6D8]/80 leading-relaxed">
              Prune dead inner twigs to eliminate Melanose. Monitor tender emerging shoots for citrus psyllid colonies.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
            <span className="text-[11px] font-bold uppercase text-[#98CC6B] tracking-wider">Bloom &bull; Petal Fall</span>
            <h4 className="font-bold text-white text-sm">Critical Fruitlet Protection</h4>
            <p className="text-[#DDE6D8]/80 leading-relaxed">
              Apply initial protective copper spray at 2/3 petal fall to protect vulnerable young fruitlets from Black Spot.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
            <span className="text-[11px] font-bold uppercase text-[#98CC6B] tracking-wider">Summer &bull; Fruit Sizing</span>
            <h4 className="font-bold text-white text-sm">Fungicide Rotation &amp; Rain</h4>
            <p className="text-[#DDE6D8]/80 leading-relaxed">
              Rotate strobilurin fungicides during rain spells. Ensure under-tree micro-jets do not strike expanding fruit.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
            <span className="text-[11px] font-bold uppercase text-[#98CC6B] tracking-wider">Autumn &bull; Color Break</span>
            <h4 className="font-bold text-white text-sm">Pre-Harvest Quality Audit</h4>
            <p className="text-[#DDE6D8]/80 leading-relaxed">
              Inspect rind surfaces for late-season blemishes. Promptly remove and bury any dropped fruit before harvest.
            </p>
          </div>
        </div>

        {onNavigate && (
          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('prevention')}
              className="px-5 py-3 rounded-2xl bg-white text-[#24361B] hover:bg-[#98CC6B] hover:text-[#24361B] text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <span>View In-Depth Prevention Protocols</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('diseases')}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              <span>Explore Disease Guide</span>
            </button>
          </div>
        )}
      </section>

    </div>
  );
};
