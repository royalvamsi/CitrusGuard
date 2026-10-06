import React, { useState } from 'react';
import type { DiseaseDetail } from '../types/disease';
import { StatusBadge } from './StatusBadge';
import { AlertCircle, Sprout, Check, Sparkles } from 'lucide-react';

interface TreatmentCardProps {
  disease: DiseaseDetail;
  confidence: number;
}

export const TreatmentCard: React.FC<TreatmentCardProps> = ({ disease, confidence }) => {
  const [activeTab, setActiveTab] = useState<'symptoms' | 'treatment' | 'prevention'>('symptoms');

  const confidencePercent = Math.round(confidence * 1000) / 10;

  return (
    <div className="rounded-3xl bg-white border border-[#DDE6D8] overflow-hidden shadow-xs text-left">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-[#EEF2EC] border-b border-[#DDE6D8]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <StatusBadge severity={disease.severity} size="md" />
          <div className="text-xs font-mono text-[#5D6B55] bg-white px-3 py-1.5 rounded-full border border-[#DDE6D8] shadow-xs">
            Confidence: <span className="text-[#24361B] font-bold">{confidencePercent}%</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#24361B] font-heading tracking-tight">
          {disease.name}
        </h3>
        
        <p className="text-sm text-[#5D6B55] italic font-serif mt-1">
          {disease.scientificName}
        </p>

        {/* Plain language summary */}
        <div className="mt-4 p-4 rounded-2xl bg-white border border-[#DDE6D8] shadow-xs">
          <p className="text-xs uppercase font-bold text-[#5D6B55] tracking-wider mb-1">
            Pathological Summary
          </p>
          <p className="text-sm text-[#24361B] leading-relaxed">
            {disease.description}
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-[#DDE6D8] bg-[#EEF2EC] px-6">
        <button
          onClick={() => setActiveTab('symptoms')}
          className={`py-3.5 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'symptoms'
              ? 'border-[#24361B] text-[#24361B] bg-white rounded-t-xl'
              : 'border-transparent text-[#5D6B55] hover:text-[#24361B]'
          }`}
        >
          <AlertCircle className="w-4 h-4 text-[#ED7A3B]" />
          <span>Symptoms</span>
        </button>

        <button
          onClick={() => setActiveTab('treatment')}
          className={`py-3.5 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'treatment'
              ? 'border-[#24361B] text-[#24361B] bg-white rounded-t-xl'
              : 'border-transparent text-[#5D6B55] hover:text-[#24361B]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#98CC6B]" />
          <span>Treatment</span>
        </button>

        <button
          onClick={() => setActiveTab('prevention')}
          className={`py-3.5 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'prevention'
              ? 'border-[#24361B] text-[#24361B] bg-white rounded-t-xl'
              : 'border-transparent text-[#5D6B55] hover:text-[#24361B]'
          }`}
        >
          <Sprout className="w-4 h-4 text-[#98CC6B]" />
          <span>Prevention</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="p-6 sm:p-8">
        
        {/* Symptoms Tab */}
        {activeTab === 'symptoms' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-[#24361B] font-heading">
                Common Symptoms
              </h4>
              <p className="text-xs text-[#5D6B55] mt-0.5">
                Characteristic visual signs observed on fruits, leaves, and twigs.
              </p>
            </div>

            <div className="space-y-3">
              {disease.symptoms.map((symptom, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8]"
                >
                  <div className="w-5 h-5 rounded-full bg-[#ED7A3B]/15 border border-[#ED7A3B]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ED7A3B]" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#24361B] font-medium leading-relaxed">
                    {symptom}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Treatment Tab */}
        {activeTab === 'treatment' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-[#24361B] font-heading">
                Recommended Management
              </h4>
              <p className="text-xs text-[#5D6B55] mt-0.5">
                Targeted therapeutic interventions, chemical applications, and canopy remediation.
              </p>
            </div>

            <div className="space-y-3">
              {disease.treatments.map((treatment, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8]"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-xl bg-white text-[#24361B] text-xs font-bold font-mono shrink-0 mt-0.5 border border-[#DDE6D8]">
                    0{idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-[#24361B] font-medium leading-relaxed">
                    {treatment}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prevention Tab */}
        {activeTab === 'prevention' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-[#24361B] font-heading">
                How to Reduce Future Risk
              </h4>
              <p className="text-xs text-[#5D6B55] mt-0.5">
                Proactive horticultural best practices to protect future seasonal flushes and yields.
              </p>
            </div>

            <div className="space-y-3">
              {disease.prevention.map((prev, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8]"
                >
                  <div className="w-5 h-5 rounded-full bg-[#98CC6B]/20 border border-[#98CC6B]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#24361B]" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#24361B] font-medium leading-relaxed">
                    {prev}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
