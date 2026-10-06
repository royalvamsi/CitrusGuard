import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  ArrowRight, 
  X, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  AlertTriangle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CITRUS_DISEASES } from '../data/diseaseDatabase';
import type { DiseaseDetail } from '../types/disease';
import { StatusBadge } from '../components/StatusBadge';

interface DiseaseGuidePageProps {
  onScanSpecimen?: (type: 'fruit' | 'leaf') => void;
}

export const DiseaseGuidePage: React.FC<DiseaseGuidePageProps> = ({ onScanSpecimen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'fruit' | 'leaf' | 'fungal' | 'bacterial'>('all');
  const [selectedDisease, setSelectedDisease] = useState<DiseaseDetail | null>(null);

  const diseasesList = Object.values(CITRUS_DISEASES);

  const filteredDiseases = diseasesList.filter((d) => {
    // Search matching
    const matchesSearch = 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Filter matching
    if (activeFilter === 'all') return true;
    if (activeFilter === 'fruit') return d.category === 'fruit' || d.category === 'both';
    if (activeFilter === 'leaf') return d.category === 'leaf' || d.category === 'both';
    if (activeFilter === 'fungal') {
      return ['blackspot', 'anthracnose', 'melanose'].includes(d.id);
    }
    if (activeFilter === 'bacterial') {
      return ['canker', 'greening'].includes(d.id);
    }
    return true;
  });

  return (
    <div className="space-y-10 pb-16 text-left max-w-6xl mx-auto">
      
      {/* Hero Section */}
      <div className="rounded-3xl bg-white border border-[#DDE6D8] p-8 sm:p-12 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2EC] border border-[#DDE6D8] text-[#24361B] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-[#98CC6B]" />
          <span>Pathology Encyclopedia</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24361B] font-heading tracking-tight leading-tight">
          Know the signs. <br />
          <span className="text-[#98CC6B]">Protect your crop.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#5D6B55] max-w-2xl leading-relaxed">
          Explore diagnostic markers, scientific etiologies, and recommended treatments for 
          common fungal, bacterial, and physiological citrus conditions.
        </p>

        {/* Search & Filter Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5D6B55]" />
            <input
              type="text"
              placeholder="Search citrus diseases, symptoms, pathogens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8] text-xs sm:text-sm text-[#24361B] placeholder-[#5D6B55]/70 focus:outline-none focus:border-[#98CC6B] focus:bg-white transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5D6B55] hover:text-[#24361B]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(['all', 'fruit', 'leaf', 'fungal', 'bacterial'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#98CC6B] text-[#24361B] font-bold shadow-xs'
                    : 'bg-[#EEF2EC] text-[#5D6B55] hover:bg-white border border-[#DDE6D8]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiseases.map((disease) => {
          const isFungal = ['blackspot', 'anthracnose', 'melanose'].includes(disease.id);
          const isBacterial = ['canker', 'greening'].includes(disease.id);

          return (
            <div
              key={disease.id}
              onClick={() => setSelectedDisease(disease)}
              className="rounded-3xl bg-white border border-[#DDE6D8] p-6 shadow-xs hover:shadow-md hover:border-[#98CC6B] transition-all flex flex-col justify-between group cursor-pointer text-left"
            >
              <div className="space-y-4">
                
                {/* Visual Icon / Category Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF2EC] group-hover:bg-[#EEF2EC] border border-[#DDE6D8] flex items-center justify-center text-2xl transition-colors">
                    {disease.category === 'fruit' ? '🍊' : disease.category === 'leaf' ? '🌿' : '🌱'}
                  </div>
                  <StatusBadge severity={disease.severity} size="sm" />
                </div>

                {/* Disease Name & Scientific Name */}
                <div>
                  <h3 className="text-xl font-bold text-[#24361B] font-heading group-hover:text-[#24361B] transition-colors">
                    {disease.name}
                  </h3>
                  <p className="text-xs text-[#5D6B55] italic font-serif mt-0.5">
                    {disease.scientificName}
                  </p>
                </div>

                {/* Pathogen Type Tag */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#EEF2EC] border border-[#DDE6D8] text-[#5D6B55]">
                    {isFungal ? 'Fungal Pathogen' : isBacterial ? 'Bacterial Infection' : 'Physiological'}
                  </span>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#EEF2EC] border border-[#DDE6D8] text-[#5D6B55] capitalize">
                    {disease.category} Target
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[#5D6B55] leading-relaxed line-clamp-3">
                  {disease.description}
                </p>
              </div>

              {/* Card Footer Link */}
              <div className="mt-6 pt-4 border-t border-[#DDE6D8] flex items-center justify-between text-xs font-bold text-[#24361B] group-hover:text-[#98CC6B] transition-colors">
                <span>View disease details</span>
                <ArrowRight className="w-4 h-4 text-[#98CC6B] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {filteredDiseases.length === 0 && (
        <div className="p-12 rounded-3xl bg-white border border-dashed border-[#DDE6D8] text-center space-y-3">
          <p className="text-sm font-bold text-[#24361B]">No matching diseases found</p>
          <p className="text-xs text-[#5D6B55]">Try refining your search keyword or clearing the active filter.</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
            className="px-4 py-2 rounded-xl bg-[#24361B] hover:bg-[#98CC6B] hover:text-[#24361B] text-white text-xs font-semibold cursor-pointer transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Disease Detail Modal */}
      <AnimatePresence>
        {selectedDisease && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#24361B]/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-[#DDE6D8] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-left"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 border-b border-[#DDE6D8] bg-white flex items-start justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge severity={selectedDisease.severity} size="sm" />
                    <span className="text-xs font-mono text-[#5D6B55] capitalize">
                      {selectedDisease.category} Pathology
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#24361B] font-heading">
                    {selectedDisease.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5D6B55] italic font-serif">
                    {selectedDisease.scientificName}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedDisease(null)}
                  className="p-2 rounded-xl bg-[#EEF2EC] hover:bg-white border border-[#DDE6D8] text-[#5D6B55] hover:text-[#24361B] cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Description */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-[#5D6B55] tracking-wider mb-1">
                    About this Condition
                  </h4>
                  <p className="text-sm text-[#24361B] leading-relaxed">
                    {selectedDisease.description}
                  </p>
                </div>

                {/* Symptoms */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-bold text-[#5D6B55] tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-[#ED7A3B]" />
                    Characteristic Symptoms
                  </h4>
                  <div className="space-y-2">
                    {selectedDisease.symptoms.map((s, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#EEF2EC] border border-[#DDE6D8] text-xs sm:text-sm text-[#24361B]">
                        &bull; {s}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Causes */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-bold text-[#5D6B55] tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#ED7A3B]" />
                    Primary Causes &amp; Environmental Triggers
                  </h4>
                  <div className="space-y-2">
                    {selectedDisease.causes.map((c, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#EEF2EC] border border-[#DDE6D8] text-xs sm:text-sm text-[#24361B]">
                        &bull; {c}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Treatments */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-bold text-[#5D6B55] tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#98CC6B]" />
                    Recommended Agronomic Management
                  </h4>
                  <div className="space-y-2">
                    {selectedDisease.treatments.map((t, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#EEF2EC] border border-[#DDE6D8] text-xs sm:text-sm text-[#24361B] flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-md bg-[#24361B] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Long-term Prevention */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-bold text-[#5D6B55] tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#98CC6B]" />
                    Biosecurity &amp; Prevention
                  </h4>
                  <div className="space-y-2">
                    {selectedDisease.prevention.map((p, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#EEF2EC] border border-[#DDE6D8] text-xs sm:text-sm text-[#24361B]">
                        &check; {p}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-[#DDE6D8] bg-[#EEF2EC]/60 flex items-center justify-between">
                <button
                  onClick={() => setSelectedDisease(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#DDE6D8] bg-white text-xs font-semibold text-[#24361B] hover:bg-[#EEF2EC] transition-colors cursor-pointer"
                >
                  Close
                </button>

                {onScanSpecimen && (
                  <button
                    onClick={() => {
                      const type = selectedDisease.category === 'leaf' ? 'leaf' : 'fruit';
                      setSelectedDisease(null);
                      onScanSpecimen(type);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#24361B] hover:bg-[#98CC6B] hover:text-[#24361B] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer group"
                  >
                    <span>Scan for this Disease</span>
                    <ArrowRight className="w-4 h-4 text-[#98CC6B] group-hover:text-[#24361B] transition-colors" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
