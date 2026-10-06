import type { DiseaseDetail } from '../types/disease';


export const CITRUS_DISEASES: Record<string, DiseaseDetail> = {
  blackspot: {
    id: 'blackspot',
    name: 'Citrus Black Spot',
    scientificName: 'Phyllosticta citricarpa',
    category: 'both',
    severity: 'high',
    description: 'A serious fungal disease that attacks citrus rinds and foliage, producing unsightly sunken necrotic lesions that cause premature fruit drop and render harvest unmarketable.',
    symptoms: [
      'Hard spot: Small circular sunken lesions with brick-red margins and grey center',
      'Virulent freckle spots: Dark reddish blemishes on maturing fruit',
      'False melanose: Raised pinhead-sized brownish spots on leaves and rinds',
      'Premature fruit drop under warm, humid conditions'
    ],
    causes: [
      'Fungal ascospores ejected from decomposing fallen leaf litter during rain events',
      'Prolonged leaf/rind wetness at temperatures between 21°C - 30°C'
    ],
    treatments: [
      'Apply protective copper fungicides (copper hydroxide or oxychloride) starting at petal fall',
      'Rotate with strobilurin fungicides (e.g. pyraclostrobin or azoxystrobin) to prevent resistance',
      'Promptly remove dropped fruits and bury or burn leaf litter under canopies'
    ],
    prevention: [
      'Maintain canopy aeration through regular thinning and pruning',
      'Use overhead or micro-jet irrigation scheduled to avoid wetting fruit canopies late in the day',
      'Adhere to strict phytosanitary quarantine restrictions on budwood and nursery stock'
    ],
    badgeColor: 'bg-[#EEF2EC] text-[#ED7A3B] border-[#ED7A3B]/30'
  },
  canker: {
    id: 'canker',
    name: 'Citrus Canker',
    scientificName: 'Xanthomonas citri subsp. citri',
    category: 'both',
    severity: 'critical',
    description: 'A highly contagious bacterial disease affecting all citrus varieties. Causes raised, blister-like corky eruptions surrounded by oily water-soaked margins and yellow chlorotic halos.',
    symptoms: [
      'Raised, corky, crater-like lesions on leaves, fruit, and young green twigs',
      'Distinct bright yellow chlorotic halos encircling lesions',
      'Severe defoliation, shoot dieback, and extensive premature fruit drop',
      'Fruit lesions develop a rough, sandpaper-like texture'
    ],
    causes: [
      'Bacterial pathogen entering naturally through stomata or mechanical wounds (wind, thorns, citrus leafminer larvae)',
      'Spreads rapidly via wind-driven rain, overhead irrigation, and contaminated orchard equipment'
    ],
    treatments: [
      'Apply preventive copper-based bactericides at 21-day intervals during periods of active vegetative flushes',
      'Aggressively control citrus leafminer with registered insecticides to avoid wound entryways',
      'Prune and destroy infected twigs during dry, sunny weather'
    ],
    prevention: [
      'Install dense windbreaks (Casuarina or Eucalyptus) around citrus groves to reduce wind-driven rain spread',
      'Disinfect harvesting shears, ladders, and machinery with quaternary ammonium compounds or chlorine solutions',
      'Plant less susceptible cultivars where practical (e.g. Mandarins and Oranges have varying tolerances)'
    ],
    badgeColor: 'bg-[#EEF2EC] text-[#ED7A3B] border-[#ED7A3B]/30'
  },
  greening: {
    id: 'greening',
    name: 'Citrus Greening (HLB)',
    scientificName: 'Candidatus Liberibacter asiaticus',
    category: 'both',
    severity: 'critical',
    description: 'Huanglongbing (HLB) is widely regarded as the most devastating citrus disease globally. It clogs the phloem vascular system, resulting in bitter, misshapen, lopsided fruit that fails to color properly.',
    symptoms: [
      'Blotchy, asymmetrical leaf mottle that crosses leaf veins (unlike symmetrical nutritional deficiencies)',
      'Yellow shoots standing out on individual branches (the "yellow dragon" symptom)',
      'Small, lopsided, asymmetric fruits that stay green at the stylar end (inverted coloration)',
      'Bitter, astringent, unmarketable juice with aborted, dark seeds'
    ],
    causes: [
      'Phloem-restricted bacterium transmitted primarily by the Asian Citrus Psyllid (Diaphorina citri)',
      'Dissemination through infected nursery budwood and grafting'
    ],
    treatments: [
      'Currently no complete chemical cure; management relies on rigorous psyllid vector containment',
      'Apply systemic insecticides (e.g., neonicotinoids or organophosphates) targeting flush cycles',
      'Supplemental foliar micronutrient applications (zinc, manganese, iron) to support compromised phloem'
    ],
    prevention: [
      'Plant exclusively certified disease-free foundation nursery stock grown in screen houses',
      'Aggressively scout groves with yellow sticky traps to detect psyllid populations early',
      'Eradicate and incinerate confirmed symptomatic trees to reduce inoculum reservoirs for surrounding groves'
    ],
    badgeColor: 'bg-[#EEF2EC] text-[#ED7A3B] border-[#ED7A3B]/30'
  },
  healthy: {
    id: 'healthy',
    name: 'Healthy Citrus Specimen',
    scientificName: 'Citrus sinensis / reticulata',
    category: 'both',
    severity: 'healthy',
    description: 'The specimen displays optimal physiological vigor without noticeable bacterial, fungal, or viral pathogen damage. Rind and foliar surfaces exhibit natural pigment uniformity.',
    symptoms: [
      'Smooth, uniform rind coloration characteristic of variety',
      'Vibrant green leaves with intact waxy cuticle and distinct vein architecture',
      'Absence of necrotic spotting, corky eruptions, or chlorotic halos'
    ],
    causes: [
      'Balanced soil fertility, adequate drainage, and regular integrated pest management'
    ],
    treatments: [
      'No remedial therapeutic interventions required',
      'Continue scheduled balanced N-P-K fertilization and seasonal irrigation regimes'
    ],
    prevention: [
      'Routine scouting every 14 days during active growth periods',
      'Maintain balanced soil pH (6.0 - 7.0) and monitor soil electrical conductivity'
    ],
    badgeColor: 'bg-[#EEF2EC] text-[#24361B] border-[#98CC6B]'
  },
  anthracnose: {
    id: 'anthracnose',
    name: 'Anthracnose',
    scientificName: 'Colletotrichum gloeosporioides',
    category: 'leaf',
    severity: 'moderate',
    description: 'Fungal affliction causing foliar tip blight, twig dieback, and tear-stain blemishes on citrus foliage and developing fruitlets.',
    symptoms: [
      'Foliar necrosis starting from leaf margins or tips with dark concentric spore circles',
      'Terminal twig dieback and premature leaf abscission',
      'Tear-staining patterns down rind surfaces under persistent drizzle'
    ],
    causes: [
      'Opportunistic fungal infection exploiting weakened tissues from frost, drought, or insect wounds'
    ],
    treatments: [
      'Foliar copper fungicide spray applied during pre-bloom and post-bloom',
      'Pruning out dead and dying twigs behind the infection line'
    ],
    prevention: [
      'Alleviate tree stress through adequate nitrogen fertilization and uniform soil moisture',
      'Improve tree canopy sunlight penetration'
    ],
    badgeColor: 'bg-[#EEF2EC] text-[#ED7A3B] border-[#ED7A3B]/30'
  },
  melanose: {
    id: 'melanose',
    name: 'Citrus Melanose',
    scientificName: 'Diaporthe citri',
    category: 'leaf',
    severity: 'moderate',
    description: 'Fungal pathogen producing rough, sandpaper-like dark brown pustules on leaves and twigs, typically originating from dead wood within the inner canopy.',
    symptoms: [
      'Minute, raised dark brown or black pustules with a sandpaper feel on young leaves',
      'Mudcake or tear-streak patterns on fruit and foliage',
      'Foliar distortion and yellowing when young flushes are heavily colonized'
    ],
    causes: [
      'Fungal pycnidia and perithecia overwintering inside dead twigs and pruned branches'
    ],
    treatments: [
      'Prune and eliminate dead wood throughout the canopy before spring flush emerges',
      'Protective copper fungicide applications applied 2-3 weeks post-bloom'
    ],
    prevention: [
      'Prompt removal of pruned branches from the orchard floor',
      'Maintain strong tree vigor to minimize natural twig dieback'
    ],
    badgeColor: 'bg-[#EEF2EC] text-[#ED7A3B] border-[#ED7A3B]/30'
  }
};
