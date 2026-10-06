import React, { useState } from 'react';
import { 
  Leaf, 
  Sparkles, 
  RefreshCcw, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileCheck,
  Layers,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageDropzone } from '../components/ImageDropzone';
import { ProbabilityBar } from '../components/ProbabilityBar';
import { TreatmentCard } from '../components/TreatmentCard';
import { StatusBadge } from '../components/StatusBadge';
import { apiService, ApiError } from '../services/api';
import type { LeafPredictionResponse } from '../types/disease';
import { CITRUS_DISEASES } from '../data/diseaseDatabase';
import { useHistory } from '../context/HistoryContext';

export const LeafDetection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LeafPredictionResponse | null>(null);
  const [inferenceTime, setInferenceTime] = useState<number | null>(null);
  const { addRecord } = useHistory();

  const leafDiseases = ['anthracnose', 'blackspot', 'canker', 'greening', 'healthy', 'melanose'];

  const handleImageSelected = (file: File) => {
    setSelectedFile(file);
    setError(null);
    setResult(null);
    setInferenceTime(null);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setError(null);
    setResult(null);
    setInferenceTime(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      const data = await apiService.predictLeaf(selectedFile);
      const duration = Math.round(performance.now() - startTime);
      setInferenceTime(duration);
      setResult(data);

      // Save to local history
      addRecord({
        type: 'leaf',
        predictedClass: data.predicted_class,
        confidence: data.confidence,
        probabilities: data.probabilities,
        filename: selectedFile.name,
      });
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while communicating with the leaf prediction service.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const normalizedKey = result ? result.predicted_class.toLowerCase().replace(/\s+/g, '') : '';
  const diagnosedDisease = result
    ? CITRUS_DISEASES[normalizedKey] || {
        id: result.predicted_class,
        name: `Citrus ${result.predicted_class}`,
        scientificName: 'Citrus Foliage Pathogen',
        category: 'leaf' as const,
        severity: normalizedKey === 'healthy' ? ('healthy' as const) : ('high' as const),
        description: 'Foliar disease classification produced by the Random Forest 300-tree model.',
        symptoms: ['Foliar lesion or textural irregularity detected.'],
        causes: ['Citrus foliage pathogen or physiological condition.'],
        treatments: ['Inspect affected leaves and consult agricultural extension guidelines.'],
        prevention: ['Maintain sanitary cultural practices and monitor leaf flush.'],
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
      }
    : null;

  return (
    <div className="space-y-8 pb-12 text-left max-w-6xl mx-auto">
      {/* Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>CLASSICAL COMPUTER VISION & ML PIPELINE</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Citrus Foliage Disease Diagnosis
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          High-performance foliar classification utilizing statistical texture and color distributions 
          (HSV histograms, GLCM spatial co-occurrences, and Local Binary Patterns).
        </p>
      </div>

      {/* Operational Model Status Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-4 text-emerald-300">
        <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
          <Zap className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-emerald-200">
              Random Forest Model Operational (92.49% Test Accuracy)
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Active Endpoint
            </span>
          </div>
          <p className="text-xs leading-relaxed text-emerald-300/90">
            Unified API endpoint <code className="bg-emerald-950/60 px-1.5 py-0.5 rounded text-emerald-200 font-mono">POST /predict/leaf</code> is 
            active. Images undergo 110-dimensional feature extraction (HSV + GLCM + LBP) and are classified across 6 foliage conditions: Anthracnose, Black Spot, Canker, Greening, Healthy, and Melanose.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upload and Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                Upload Leaf Specimen
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                110-D Feature Vector
              </span>
            </div>

            <ImageDropzone
              onImageSelected={handleImageSelected}
              selectedFile={selectedFile}
              onClear={handleClear}
              disabled={isLoading}
            />

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={!selectedFile || isLoading}
                className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                  !selectedFile || isLoading
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/20 hover:scale-[1.01] cursor-pointer'
                }`}
              >
                {isLoading ? (
                  <>
                    <RefreshCcw className="w-4 h-4 animate-spin" />
                    <span>Extracting 110-D Features & Classifying...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Foliage Disease</span>
                  </>
                )}
              </button>

              {selectedFile && !isLoading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium border border-slate-700 transition-colors cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-rose-200">Inference Error</p>
                  <p className="mt-0.5 leading-relaxed">{error}</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* 110-D Feature Vector Specification */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              110-Dimensional Handcrafted Feature Architecture
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex justify-between font-semibold text-slate-200 mb-1">
                  <span>1. HSV Color Space Distribution</span>
                  <span className="font-mono text-emerald-400">96 Features</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  32-bin normalized histograms across Hue (0-180), Saturation (0-256), and Value (0-256) channels.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex justify-between font-semibold text-slate-200 mb-1">
                  <span>2. Gray-Level Co-occurrence Matrix (GLCM)</span>
                  <span className="font-mono text-emerald-400">4 Features</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Spatial pixel relationships at distance d=1, angle θ=0°. Computes Contrast, Correlation, Energy, and Homogeneity.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex justify-between font-semibold text-slate-200 mb-1">
                  <span>3. Local Binary Patterns (LBP)</span>
                  <span className="font-mono text-emerald-400">10 Features</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Micro-texture descriptors with radius R=1 and P=8 neighbor points using rotation-invariant uniform mapping.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Output or Benchmarks */}
        <div className="lg:col-span-6 space-y-6">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-12 rounded-3xl border border-slate-800 bg-slate-900/50 flex flex-col items-center justify-center text-center space-y-4 min-h-[420px]"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-pulse">
                    <Leaf className="w-8 h-8" />
                  </div>
                  <RefreshCcw className="w-6 h-6 text-emerald-400 animate-spin absolute -top-2 -right-2" />
                </div>
                <h3 className="text-lg font-bold text-white">Analyzing Foliage Morphology...</h3>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  Computing HSV histograms, GLCM spatial texture, and LBP descriptors. Evaluating across 300 Random Forest decision trees.
                </p>
              </motion.div>
            ) : result && diagnosedDisease ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Result Card */}
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-700/80 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <span className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Foliar Classification Output
                    </span>
                    {inferenceTime && (
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {inferenceTime} ms
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                        Identified Pathogen / Condition
                      </p>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                        {diagnosedDisease.name}
                      </h2>
                      <p className="text-xs text-slate-400 italic font-serif mt-0.5">
                        {diagnosedDisease.scientificName}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <StatusBadge severity={diagnosedDisease.severity} size="md" />
                      <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-right">
                        <span className="text-[10px] text-slate-400 font-mono block">Confidence</span>
                        <span className="text-xl font-mono font-black text-emerald-400">
                          {(result.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Probability Breakdown across all 6 classes */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                      <span>Ensemble Probability Distribution (6 Classes)</span>
                      <span className="font-mono text-slate-400 text-[11px]">300 Trees</span>
                    </div>

                    <div className="pt-1">
                      <ProbabilityBar
                        probabilities={result.probabilities}
                        predictedClass={result.predicted_class}
                      />
                    </div>
                  </div>
                </div>

                {/* Treatment & Care Protocol */}
                <TreatmentCard disease={diagnosedDisease} confidence={result.confidence} />
              </motion.div>
            ) : (
              <div className="space-y-6">
                {/* Benchmarks Card */}
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Foliar Classifier Performance Benchmark
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30">
                      <p className="text-slate-400">Random Forest</p>
                      <p className="text-xl font-bold text-emerald-400">92.49%</p>
                      <p className="text-[10px] text-slate-500">Top Overall Model</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <p className="text-slate-400">XGBoost</p>
                      <p className="text-xl font-bold text-slate-200">92.02%</p>
                      <p className="text-[10px] text-slate-500">Gradient Boosted</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <p className="text-slate-400">Logistic Regression</p>
                      <p className="text-lg font-bold text-slate-300">86.38%</p>
                      <p className="text-[10px] text-slate-500">StandardScaled</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <p className="text-slate-400">KNN (k=5)</p>
                      <p className="text-lg font-bold text-slate-300">85.92%</p>
                      <p className="text-[10px] text-slate-500">Euclidean Distance</p>
                    </div>
                  </div>
                </div>

                {/* 6 Target Foliar Classes */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white">
                    Target Foliar Disease Classes (6 Categories)
                  </h3>

                  <div className="space-y-2.5">
                    {leafDiseases.map((key) => {
                      const disease = CITRUS_DISEASES[key];
                      if (!disease) return null;
                      return (
                        <div
                          key={key}
                          className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all flex items-start justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-bold text-white">{disease.name}</h4>
                              <StatusBadge severity={disease.severity} size="sm" />
                            </div>
                            <p className="text-[11px] text-slate-400 italic font-serif">
                              {disease.scientificName}
                            </p>
                            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                              {disease.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
