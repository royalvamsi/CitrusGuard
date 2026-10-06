import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldAlert, Sparkles, X, ChevronRight, AlertTriangle, CheckCircle2, Leaf, Citrus } from 'lucide-react';
import { CITRUS_DISEASES } from '../data/diseaseDatabase';
import type { DiseaseDetail } from '../types/disease';

export const DiseaseLibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'fruit' | 'leaf' | 'both'>('all');
  const [selectedDisease, setSelectedDisease] = useState<DiseaseDetail | null>(null);

  const diseaseList = Object.values(CITRUS_DISEASES);

  const filteredDiseases = diseaseList.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      d.category === selectedCategory ||
      (d.category === 'both' && (selectedCategory === 'fruit' || selectedCategory === 'leaf'));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-16 text-left">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Agronomic Pathogen Encyclopedia
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Citrus Disease Library &amp; Field Guide
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Explore botanical symptoms, pathogen biology, transmission vectors, and recommended chemical &amp;
          cultural interventions for citrus crops.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by disease, pathogen, or symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          {(
            [
              { id: 'all', label: 'All Pathogens' },
              { id: 'fruit', label: 'Fruit Rind' },
              { id: 'leaf', label: 'Foliage/Leaf' },
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiseases.map((d, idx) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => setSelectedDisease(d)}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/50 hover:bg-slate-900/90 transition-all flex flex-col justify-between cursor-pointer group shadow-lg"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono border font-medium ${d.badgeColor}`}>
                  {d.severity.toUpperCase()}
                </span>
                <span className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1">
                  {d.category === 'fruit' ? (
                    <Citrus className="w-3.5 h-3.5 text-amber-400" />
                  ) : d.category === 'leaf' ? (
                    <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span>Fruit &amp; Leaf</span>
                  )}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">
                {d.name}
              </h3>
              <p className="text-xs text-slate-400 italic mb-3">{d.scientificName}</p>
              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">{d.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-medium">
              <span>View Full Diagnosis &amp; Remedy &rarr;</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      {filteredDiseases.length === 0 && (
        <div className="py-16 text-center text-slate-400">
          <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <p className="text-sm font-medium">No matching disease records found for "{searchTerm}".</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs text-emerald-400 underline hover:text-emerald-300"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Disease Detail Modal */}
      <AnimatePresence>
        {selectedDisease && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl text-left space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDisease(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 pr-8">
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono border font-medium ${selectedDisease.badgeColor}`}>
                  {selectedDisease.severity.toUpperCase()} PRIORITY
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white pt-2">{selectedDisease.name}</h2>
                <p className="text-xs text-slate-400 italic">{selectedDisease.scientificName}</p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{selectedDisease.description}</p>

              {/* Symptoms */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                  Identified Symptoms
                </h4>
                <div className="space-y-1.5">
                  {selectedDisease.symptoms.map((s, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-amber-400 mt-0.5">&bull;</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Causes */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                  Primary Vectors &amp; Causes
                </h4>
                <div className="space-y-1.5">
                  {selectedDisease.causes.map((c, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-rose-400 mt-0.5">&bull;</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatments */}
              <div className="space-y-2 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Recommended Agronomic Treatments
                </h4>
                <ul className="space-y-1.5 mt-2">
                  {selectedDisease.treatments.map((t, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">{idx + 1}.</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention */}
              <div className="space-y-2 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  Orchard Cultural Prevention
                </h4>
                <ul className="space-y-1.5 mt-2">
                  {selectedDisease.prevention.map((p, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-amber-400">&bull;</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
