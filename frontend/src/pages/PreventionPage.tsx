import React, { useState } from 'react';
import { 
  Sprout, 
  Droplets, 
  Scissors, 
  Bug, 
  Search, 
  FlaskConical, 
  Check, 
  AlertTriangle, 
  ArrowRight
} from 'lucide-react';

interface PreventionCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  steps: {
    num: string;
    title: string;
    detail: string;
  }[];
  dos: string[];
  donts: string[];
  timing: string;
}

const categories: PreventionCategory[] = [
  {
    id: 'hygiene',
    name: 'Orchard Hygiene',
    icon: <Sprout className="w-5 h-5 text-[#24361B]" />,
    tagline: 'Eliminating inoculum reservoirs on the orchard floor and equipment.',
    description: 'Fungal pathogens such as Black Spot and Melanose overwinter in fallen leaf litter and dried twigs. Systematic orchard sanitation breaks disease reinfection cycles.',
    timing: 'Continuous & Post-Harvest',
    steps: [
      {
        num: '01',
        title: 'Remove and Mulch Fallen Leaves',
        detail: 'Rake and decompose fallen citrus leaves under tree canopies. Ascospores of Phyllosticta citricarpa germinate during seasonal rainfall events.',
      },
      {
        num: '02',
        title: 'Promptly Dispose of Dropped Fruit',
        detail: 'Collect and bury or incinerate prematurely dropped citrus fruit to prevent sporulation in proximity to mature crops.',
      },
      {
        num: '03',
        title: 'Disinfect Harvesting Equipment',
        detail: 'Wash and sanitize clippers, picking ladders, and transport crates with a 10% quaternary ammonium or household bleach solution.',
      },
      {
        num: '04',
        title: 'Clean Machinery Between Groves',
        detail: 'Pressure wash tractors, mowers, and spray rigs before moving between distinct orchard blocks to stop bacterial canker spread.',
      },
    ],
    dos: [
      'Apply nitrogen-rich urea sprays to fallen foliage to accelerate leaf decay',
      'Maintain clear 2-meter weed-free strips along tree rows',
      'Require orchard visitors and pickers to sanitize boots and gloves',
    ],
    donts: [
      'Never leave piles of culled, rotting fruit near active production blocks',
      'Do not move machinery through wet groves when bacterial canker can spread easily via water droplets',
      'Avoid piling pruned wood near orchard perimeters where fungi can sporulate',
    ],
  },
  {
    id: 'irrigation',
    name: 'Irrigation & Moisture',
    icon: <Droplets className="w-5 h-5 text-[#98CC6B]" />,
    tagline: 'Controlling humidity and preventing prolonged foliage surface wetness.',
    description: 'Pathogens require standing water films to infect plant tissue. Strategic irrigation timing and drip/micro-jet distribution reduce microbial colonization.',
    timing: 'Early Morning Only',
    steps: [
      {
        num: '01',
        title: 'Transition to Under-Tree Micro-Jets or Drip',
        detail: 'Avoid overhead sprinkler systems that saturate leaves and developing fruit rinds for extended hours.',
      },
      {
        num: '02',
        title: 'Schedule Watering for Early Dawn',
        detail: 'Water early in the morning so morning sunlight rapidly evaporates residual moisture from lower foliar canopies.',
      },
      {
        num: '03',
        title: 'Optimize Grove Drainage',
        detail: 'Install French drains or swales in low-lying orchard patches to eliminate standing water pools that foster Phytophthora root rot.',
      },
      {
        num: '04',
        title: 'Monitor Soil Tensiometer Levels',
        detail: 'Maintain consistent soil moisture tension between 15-25 kPa to avoid drought stress that weakens rind defense mechanisms.',
      },
    ],
    dos: [
      'Schedule irrigation based on soil tensiometers and regional evapotranspiration rates',
      'Keep drip emitters at least 30 cm away from the primary trunk to prevent collar rot',
      'Inspect irrigation lines monthly for line blockages and emitter leaks',
    ],
    donts: [
      'Never irrigate late in the evening when temperatures drop and moisture stays stagnant overnight',
      'Do not allow sprinkler spray to strike fruit or primary structural tree crotches',
      'Avoid excessive over-irrigation that causes root hypoxia and nutrient leaching',
    ],
  },
  {
    id: 'pruning',
    name: 'Pruning & Canopy Care',
    icon: <Scissors className="w-5 h-5 text-[#98CC6B]" />,
    tagline: 'Opening the tree canopy for maximum sunlight penetration and airflow.',
    description: 'Dense, shadowed canopies trap humid air and create microclimates where fungal spores thrive. Regular pruning also removes dead twigs carrying Melanose inoculum.',
    timing: 'Late Winter / Pre-Flush',
    steps: [
      {
        num: '01',
        title: 'Excise Dead and Diseased Twigs',
        detail: 'Prune dead wood back to healthy green tissue. Diaporthe citri (Melanose) overwinters primarily in dead twig terminals.',
      },
      {
        num: '02',
        title: 'Thin Out Dense Inner Canopy Growth',
        detail: 'Remove vertical water sprouts and crossing branches to allow sunlight and wind to penetrate into the center of the tree.',
      },
      {
        num: '03',
        title: 'Skirting Lower Branches (60 cm Clearance)',
        detail: 'Trim lower skirt branches to at least 50-60 cm above the ground to stop soil-splashed spores from reaching lowest fruits.',
      },
      {
        num: '04',
        title: 'Disinfect Pruning Blades Between Trees',
        detail: 'Dip shears in 70% isopropyl alcohol or disinfectant between individual trees to prevent viral and viroid transmission.',
      },
    ],
    dos: [
      'Prune during dry, sunny weather when pruning wounds heal quickly',
      'Seal large structural cuts (> 2.5 cm) with approved agricultural wound sealant',
      'Chip or burn pruned wood immediately after field cutting',
    ],
    donts: [
      'Never prune wet trees when bacterial canker can enter freshly exposed cuts',
      'Do not over-prune mature canopies (limit removal to 15-20% foliage annually to avoid sunscald)',
      'Avoid ripping bark when making branch cuts; always use the three-cut method',
    ],
  },
  {
    id: 'pests',
    name: 'Pest & Vector Control',
    icon: <Bug className="w-5 h-5 text-[#ED7A3B]" />,
    tagline: 'Aggressively suppressing insect vectors like the Asian Citrus Psyllid.',
    description: 'Citrus Greening (Huanglongbing) is transmitted by the Asian Citrus Psyllid, and Citrus Leafminer larvae create entry wounds that enable Canker bacteria to infect trees.',
    timing: 'Synchronized with Vegetative Flushes',
    steps: [
      {
        num: '01',
        title: 'Deploy Yellow Sticky Traps for Psyllids',
        detail: 'Hang monitoring traps on grove borders to detect Asian Citrus Psyllid (Diaphorina citri) arrivals before populations multiply.',
      },
      {
        num: '02',
        title: 'Protect Young Vegetative Flush Cycles',
        detail: 'Apply systemic insecticides or horticultural mineral oils when new tender shoots are 0.5–2 cm long to protect young tissue.',
      },
      {
        num: '03',
        title: 'Control Citrus Leafminer Larvae',
        detail: 'Leafminer mines damage the cuticle, multiplying Citrus Canker infection rates by up to 10-fold.',
      },
      {
        num: '04',
        title: 'Encourage Beneficial Biological Predators',
        detail: 'Preserve parasitic wasps (Tamarixia radiata), lacewings, and ladybugs by using selective, vector-targeted sprays.',
      },
    ],
    dos: [
      'Coordinate psyllid spray schedules with neighboring citrus growers for area-wide suppression',
      'Inspect the undersides of young terminal leaves for psyllid eggs and nymphs',
      'Rotate chemical insecticide classes (neonicotinoids, pyrethroids, organophosphates) to prevent resistance',
    ],
    donts: [
      'Do not allow uncontrolled leafminer damage during spring and summer vegetative flushes',
      'Avoid broad-spectrum chemical sprays during peak flowering to protect bee pollinators',
      'Never move uninspected nursery saplings into clean production groves',
    ],
  },
  {
    id: 'monitoring',
    name: 'Regular Field Scouting',
    icon: <Search className="w-5 h-5 text-[#24361B]" />,
    tagline: 'Systematic 14-day grove inspections to catch initial infection foci.',
    description: 'Diseases spread exponentially once established. Catching the very first symptomatic fruit or leaf allows localized isolation before the whole orchard is compromised.',
    timing: 'Every 10–14 Days',
    steps: [
      {
        num: '01',
        title: 'Follow a Structured "W" or "Z" Scouting Pattern',
        detail: 'Walk diagonal transects through each orchard block, examining at least 20 trees per 5-hectare parcel.',
      },
      {
        num: '02',
        title: 'Inspect Both Foliar Surfaces and Rinds',
        detail: 'Examine both the upper and lower leaf surfaces, particularly in dense inner canopies and south-facing fruit clusters.',
      },
      {
        num: '03',
        title: 'Use CitrusGuard AI for Ambiguous Lesions',
        detail: 'Photograph unusual spotting or chlorosis and run instant diagnosis to differentiate nutritional deficiency from infectious pathology.',
      },
      {
        num: '04',
        title: 'Maintain a Geotagged Scouting Log',
        detail: 'Record GPS coordinates of symptomatic trees to monitor cluster spread and assess whether treatments are succeeding.',
      },
    ],
    dos: [
      'Mark suspect trees with bright flagging tape for follow-up testing and tissue sampling',
      'Pay special attention to grove edges facing prevailing winds and road perimeters',
      'Check fruit closely during color break when symptoms manifest most clearly',
    ],
    donts: [
      'Do not assume asymmetrical yellowing is merely iron or zinc deficiency without checking for HLB mottling',
      'Avoid scouting only along access roads; always inspect deep into the inner grove',
      'Never delay action when first symptoms of Canker or Black Spot are confirmed',
    ],
  },
  {
    id: 'chemical',
    name: 'Integrated Disease Protection',
    icon: <FlaskConical className="w-5 h-5 text-[#98CC6B]" />,
    tagline: 'Scientifically timed fungicide and bactericide spray rotations.',
    description: 'Preventive chemical barriers stop fungal spore germination and kill surface bacteria. Proper rotation prevents pathogen populations from developing fungicide resistance.',
    timing: 'Petal Fall to Mid-Summer',
    steps: [
      {
        num: '01',
        title: 'Petal Fall Protective Copper Spray',
        detail: 'Apply neutral copper hydroxide or copper oxychloride right at two-thirds petal fall when young fruitlets are most vulnerable.',
      },
      {
        num: '02',
        title: 'Rotate with Strobilurin Fungicides (FRAC 11)',
        detail: 'Intersperse copper with pyraclostrobin or azoxystrobin to prevent copper build-up and bypass fungal resistance.',
      },
      {
        num: '03',
        title: 'Adhere to 21-Day Spray Intervals During Rain',
        detail: 'In humid or rainy seasons, maintain protective spray coatings at 21-day intervals while fruit rind diameter expands.',
      },
      {
        num: '04',
        title: 'Calibrate Sprayer Nozzles and Water Volume',
        detail: 'Ensure adequate spray volume (1,000–1,500 L/ha) to completely wet both inner canopies and tops of mature trees.',
      },
    ],
    dos: [
      'Always spray protectively before anticipated prolonged rainfall events',
      'Add agricultural adjuvants or spreaders when recommended on pesticide labels',
      'Test well water pH; copper efficacy drops when tank water is alkaline (pH > 7.5)',
    ],
    donts: [
      'Never spray copper when orchard temperatures exceed 34°C (risk of fruit burn/phytotoxicity)',
      'Do not use the same FRAC group fungicide for more than two consecutive applications',
      'Avoid spraying during high winds (> 15 km/h) to prevent drift and poor coverage',
    ],
  },
];

export const PreventionPage: React.FC<{ onNavigate?: (tab: string) => void }> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<PreventionCategory>(categories[0]);

  return (
    <div className="space-y-12 pb-16 text-left max-w-6xl mx-auto">
      
      {/* Hero Banner */}
      <div className="rounded-3xl bg-white border border-[#DDE6D8] p-8 sm:p-12 shadow-xs space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#98CC6B]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2EC] border border-[#DDE6D8] text-[#24361B] text-xs font-semibold">
          <Sprout className="w-3.5 h-3.5 text-[#98CC6B]" />
          <span>Citrus Health &amp; Grove Biosecurity Guide</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24361B] font-heading tracking-tight leading-tight">
          Prevention starts before <br />
          <span className="text-[#98CC6B]">symptoms appear.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#5D6B55] max-w-2xl leading-relaxed">
          Proactive orchard management is the most cost-effective defence against citrus blight. 
          Explore actionable agronomic protocols covering hygiene, irrigation, pruning, and vector control.
        </p>

        {onNavigate && (
          <div className="pt-2">
            <button
              onClick={() => onNavigate('scanner')}
              className="px-5 py-3 rounded-xl bg-[#24361B] hover:bg-[#98CC6B] hover:text-[#24361B] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer group"
            >
              <span>Scan a Specimen for Early Symptoms</span>
              <ArrowRight className="w-4 h-4 text-[#98CC6B] group-hover:text-[#24361B] transition-colors" />
            </button>
          </div>
        )}
      </div>

      {/* Category Pills Switcher */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#24361B] font-heading">
          Explore Preventive Practices
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => {
            const isSelected = selectedCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#24361B] bg-white shadow-md ring-2 ring-[#24361B]/10'
                    : 'border-[#DDE6D8] bg-white hover:border-[#98CC6B]/60 shadow-xs'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#EEF2EC] border border-[#DDE6D8] flex items-center justify-center mb-3">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#24361B] font-heading">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-[#5D6B55] block mt-0.5">
                    {cat.timing}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Category Detail Card */}
      <div className="rounded-3xl bg-white border border-[#DDE6D8] p-6 sm:p-10 shadow-xs space-y-8">
        
        {/* Category Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE6D8] pb-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8] flex items-center justify-center shrink-0">
              {selectedCategory.icon}
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-[#98CC6B] uppercase tracking-wider">
                Protocol &bull; {selectedCategory.timing}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#24361B] font-heading">
                {selectedCategory.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#5D6B55] mt-1">
                {selectedCategory.tagline}
              </p>
            </div>
          </div>

          <div className="self-start sm:self-auto">
            <span className="px-3.5 py-1.5 rounded-full bg-[#EEF2EC] border border-[#DDE6D8] text-xs font-semibold text-[#24361B]">
              {selectedCategory.steps.length} Key Steps
            </span>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="p-4 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8] text-xs sm:text-sm text-[#24361B] leading-relaxed">
          {selectedCategory.description}
        </div>

        {/* Numbered Steps */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-[#24361B] font-heading uppercase tracking-wider">
            Step-by-Step Grower Actions
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedCategory.steps.map((st) => (
              <div
                key={st.num}
                className="p-5 rounded-2xl bg-white border border-[#DDE6D8] shadow-xs space-y-2 hover:border-[#98CC6B]/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#24361B] text-white font-mono font-bold text-xs flex items-center justify-center">
                    {st.num}
                  </span>
                  <h5 className="text-sm font-bold text-[#24361B] font-heading">
                    {st.title}
                  </h5>
                </div>
                <p className="text-xs sm:text-sm text-[#5D6B55] leading-relaxed pl-11">
                  {st.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Field Dos & Don'ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#DDE6D8]">
          
          {/* Best Practices */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#24361B] flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#98CC6B]" />
              Field Best Practices (Do)
            </h5>
            <div className="space-y-2">
              {selectedCategory.dos.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#EEF2EC] border border-[#DDE6D8] text-xs sm:text-sm text-[#24361B]"
                >
                  <div className="w-4 h-4 rounded-full bg-white border border-[#DDE6D8] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#98CC6B]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pitfalls to Avoid */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#24361B] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#ED7A3B]" />
              Pitfalls to Avoid (Don't)
            </h5>
            <div className="space-y-2">
              {selectedCategory.donts.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#EEF2EC] border border-[#DDE6D8] text-xs sm:text-sm text-[#24361B]"
                >
                  <div className="w-4 h-4 rounded-full bg-white border border-[#DDE6D8] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ED7A3B]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
