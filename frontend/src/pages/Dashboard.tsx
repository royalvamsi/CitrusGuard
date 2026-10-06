import React, { useEffect, useState } from 'react';
import { Citrus, Leaf, ArrowRight, BookOpen } from 'lucide-react';
import { apiService } from '../services/api';
import { HeroSection } from '../components/HeroSection';
import { StatsSection } from '../components/StatsSection';
import { HowItWorks } from '../components/HowItWorks';
import { CITRUS_DISEASES } from '../data/diseaseDatabase';
import type { ModelInfo } from '../types/disease';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);

  useEffect(() => {
    apiService.getModelInfo().then(setModelInfo).catch(() => null);
  }, []);

  return (
    <div className="space-y-14 pb-14 text-left">
      {/* Dynamic Particle Hero Section */}
      <HeroSection onScanFruit={() => onNavigate('fruit')} onScanLeaf={() => onNavigate('leaf')} />

      {/* Precision Diagnostic Telemetry Stats */}
      <StatsSection />

      {/* Dual Modality Modules Showcase */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Dual-Modality Diagnostic Engines
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Specialized machine learning architectures engineered for distinct plant tissue morphologies.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Fruit Model */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 hover:border-emerald-500/40 transition-all group flex flex-col justify-between shadow-lg">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Citrus className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live PyTorch API
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                Fruit Rind Disease Classifier
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Fine-tuned ResNet-34 deep convolutional neural network for citrus rinds. Evaluates surface lesions
                to classify Black Spot, Citrus Canker, and Greening (HLB).
              </p>

              <div className="space-y-1.5 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 font-mono">
                <div className="flex justify-between">
                  <span>Architecture:</span>
                  <span className="text-slate-200">{modelInfo?.architecture || 'ResNet-34 (21.3M params)'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Test Accuracy:</span>
                  <span className="text-emerald-400 font-bold">84.00%</span>
                </div>
                <div className="flex justify-between">
                  <span>Input Resolution:</span>
                  <span className="text-slate-200">224 × 224 RGB</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('fruit')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <span>Scan Fruit Image</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Leaf Model */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 hover:border-emerald-500/40 transition-all group flex flex-col justify-between shadow-lg">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Leaf className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live NumPy Forest
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                Citrus Foliage Disease Classifier
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Handcrafted feature extraction (110-D HSV color histograms, GLCM spatial texture properties, and uniform
                LBP descriptors) evaluated via pure NumPy decision-tree traversal.
              </p>

              <div className="space-y-1.5 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 font-mono">
                <div className="flex justify-between">
                  <span>Primary Classifier:</span>
                  <span className="text-slate-200">Random Forest (300 Trees)</span>
                </div>
                <div className="flex justify-between">
                  <span>Benchmark Accuracy:</span>
                  <span className="text-emerald-400 font-bold">92.49%</span>
                </div>
                <div className="flex justify-between">
                  <span>Feature Space:</span>
                  <span className="text-slate-200">110 Handcrafted Descriptors</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('leaf')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <span>Scan Leaf Specimen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4-Stage Diagnostic Pipeline */}
      <HowItWorks />

      {/* Disease Catalog Quick View */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Monitored Pathogen Encyclopedia
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Curated pathology and treatments for major citrus diseases.
            </p>
          </div>

          <button
            onClick={() => onNavigate('library')}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Open Full Library &rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(CITRUS_DISEASES).map((disease) => (
            <div
              key={disease.id}
              onClick={() => onNavigate('library')}
              className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900/70 transition-all space-y-2.5 cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border ${disease.badgeColor}`}>
                  {disease.category} Target
                </span>
                <span className="text-xs font-mono text-slate-400 capitalize">
                  {disease.severity}
                </span>
              </div>

              <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                {disease.name}
              </h4>
              <p className="text-xs text-slate-400 italic">
                {disease.scientificName}
              </p>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {disease.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
