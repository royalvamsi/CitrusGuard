import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RefreshCcw, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck,
  Clock, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  BookOpen,
  History,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageDropzone } from '../components/ImageDropzone';
import { ProbabilityBar } from '../components/ProbabilityBar';
import { StatusBadge } from '../components/StatusBadge';
import { apiService, ApiError } from '../services/api';
import type { FruitPredictionResponse } from '../types/disease';
import { CITRUS_DISEASES } from '../data/diseaseDatabase';
import { useHistory } from '../context/HistoryContext';

interface UnifiedScannerProps {
  initialType?: 'fruit' | 'leaf';
  onNavigate?: (tab: string) => void;
}

export const UnifiedScanner: React.FC<UnifiedScannerProps> = ({ 
  initialType = 'fruit', 
  onNavigate 
}) => {
  const [scanType, setScanType] = useState<'fruit' | 'leaf'>(initialType);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FruitPredictionResponse | null>(null);
  const [inferenceTime, setInferenceTime] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'symptoms' | 'treatment' | 'prevention'>('symptoms');
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  
  const { addRecord } = useHistory();

  // Sync if initialType prop changes
  useEffect(() => {
    setScanType(initialType);
  }, [initialType]);

  const handleImageSelected = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setError(null);
    setResult(null);
    setInferenceTime(null);
  };

  const handleClear = () => {
    if (previewUrl && !previewUrl.startsWith('/')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    setResult(null);
    setInferenceTime(null);
  };

  // Quick sample loader for instant demo testing
  const loadSample = async (samplePath: string, filename: string, type: 'fruit' | 'leaf') => {
    try {
      setScanType(type);
      setError(null);
      setResult(null);
      const res = await fetch(samplePath);
      const blob = await res.blob();
      const file = new File([blob], filename, { type: blob.type || 'image/jpeg' });
      setSelectedFile(file);
      setPreviewUrl(samplePath);
    } catch {
      setError('Could not load sample image.');
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      let data: FruitPredictionResponse;
      if (scanType === 'fruit') {
        data = await apiService.predictFruit(selectedFile);
      } else {
        data = await apiService.predictLeaf(selectedFile);
      }

      const duration = Math.round(performance.now() - startTime);
      setInferenceTime(duration);
      setResult(data);

      // Save to persistent scan history
      addRecord({
        type: scanType,
        predictedClass: data.predicted_class,
        confidence: data.confidence,
        probabilities: data.probabilities,
        filename: selectedFile.name,
        imagePreviewUrl: previewUrl || undefined,
      });
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected communication error occurred with the diagnostic server.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Disease lookup from database
  const diagnosedDisease = result
    ? CITRUS_DISEASES[result.predicted_class.toLowerCase()] || {
        id: result.predicted_class.toLowerCase(),
        name: `Citrus ${result.predicted_class}`,
        scientificName: 'Citrus Pathogen Specimen',
        category: scanType,
        severity: result.predicted_class.toLowerCase() === 'healthy' ? 'healthy' as const : 'high' as const,
        description: 'Visual symptom patterns matching known pathogen classification.',
        symptoms: ['Surface discoloration and lesion markers observed on specimen.'],
        causes: ['Agricultural pathogen infection or environmental stress.'],
        treatments: ['Consult your local agricultural extension service for recommended seasonal fungicides.'],
        prevention: ['Maintain sanitary harvesting hygiene and prune dead canopy wood.'],
        badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
      }
    : null;

  return (
    <div className="space-y-10 pb-16 text-left max-w-5xl mx-auto">
      
      {/* Page Title & Breadcrumb */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2EC] border border-[#DDE6D8] text-[#24361B] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#ED7A3B]" />
          <span>CitrusGuard Dual Engine &bull; Automated Diagnosis</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#24361B] font-heading tracking-tight">
          AI Disease Scanner
        </h1>
        <p className="text-sm sm:text-base text-[#5D6B55] max-w-2xl">
          Select whether you are examining a fruit or a leaf specimen, upload a photo, and receive an instant pathology diagnosis.
        </p>
      </div>

      {/* Step 1: Specimen Type Switcher */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-[#24361B] uppercase tracking-wider block">
          What would you like to scan?
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Option A: Fruit */}
          <button
            type="button"
            onClick={() => {
              setScanType('fruit');
              if (result) {
                setResult(null);
                setSelectedFile(null);
                setPreviewUrl(null);
              }
            }}
            className={`p-6 rounded-3xl border-2 transition-all flex items-center gap-4 text-left cursor-pointer ${
              scanType === 'fruit'
                ? 'border-[#24361B] bg-white shadow-md ring-2 ring-[#24361B]/10'
                : 'border-[#DDE6D8] bg-white hover:border-[#98CC6B]/60 shadow-xs'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-3xl transition-transform ${
              scanType === 'fruit' ? 'bg-[#EEF2EC] scale-105' : 'bg-[#EEF2EC]/60'
            }`}>
              🍊
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#24361B] font-heading">
                  Citrus Fruit
                </h3>
                {scanType === 'fruit' && (
                  <span className="w-2 h-2 rounded-full bg-[#24361B]" />
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#5D6B55] mt-0.5">
                Scan rind surface for Black Spot, Canker, Greening, or Healthy fruit
              </p>
            </div>
          </button>

          {/* Option B: Leaf */}
          <button
            type="button"
            onClick={() => {
              setScanType('leaf');
              if (result) {
                setResult(null);
                setSelectedFile(null);
                setPreviewUrl(null);
              }
            }}
            className={`p-6 rounded-3xl border-2 transition-all flex items-center gap-4 text-left cursor-pointer ${
              scanType === 'leaf'
                ? 'border-[#24361B] bg-white shadow-md ring-2 ring-[#24361B]/10'
                : 'border-[#DDE6D8] bg-white hover:border-[#98CC6B]/60 shadow-xs'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-3xl transition-transform ${
              scanType === 'leaf' ? 'bg-[#EEF2EC] scale-105' : 'bg-[#EEF2EC]/60'
            }`}>
              🌿
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#24361B] font-heading">
                  Citrus Leaf
                </h3>
                {scanType === 'leaf' && (
                  <span className="w-2 h-2 rounded-full bg-[#24361B]" />
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#5D6B55] mt-0.5">
                Scan foliage for Anthracnose, Melanose, Canker, Greening, or Healthy leaf
              </p>
            </div>
          </button>

        </div>
      </div>

      {/* Main Scanner Section */}
      <AnimatePresence mode="wait">
        
        {/* State A: Loading Animation Screen */}
        {isLoading ? (
          <motion.div
            key="scanner-loading"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="p-10 sm:p-16 rounded-3xl bg-white border border-[#DDE6D8] shadow-lg flex flex-col items-center justify-center text-center space-y-6 min-h-[460px]"
          >
            {/* Image with Laser Scanning Line */}
            <div className="relative w-64 h-64 rounded-3xl overflow-hidden bg-[#EEF2EC] border-2 border-[#24361B]/20 shadow-inner flex items-center justify-center">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Scanning specimen"
                  className="w-full h-full object-contain p-2"
                />
              )}
              {/* Animated Laser Beam */}
              <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#98CC6B] to-transparent shadow-[0_0_15px_#98CC6B] animate-scan-beam pointer-events-none" />
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#24361B] text-white text-[10px] font-mono">
                SCANNING
              </div>
            </div>

            <div className="space-y-1.5 max-w-sm">
              <h3 className="text-xl font-bold text-[#24361B] font-heading flex items-center justify-center gap-2">
                <RefreshCcw className="w-4 h-4 animate-spin text-[#98CC6B]" />
                Analyzing {scanType === 'fruit' ? 'Fruit Rind' : 'Citrus Foliage'}...
              </h3>
              <p className="text-xs text-[#5D6B55] leading-relaxed">
                Identifying visual pathogen patterns, extracting textural descriptors, and evaluating disease probability distribution.
              </p>
            </div>
          </motion.div>
        ) : result && diagnosedDisease ? (
          
          /* State B: Result Presentation Screen */
          <motion.div
            key="scanner-result"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2EC] border border-[#DDE6D8] text-[#24361B] text-xs font-bold tracking-wide">
                <CheckCircle2 className="w-4 h-4 text-[#98CC6B]" />
                ANALYSIS COMPLETE
              </span>

              {inferenceTime && (
                <span className="text-xs font-mono text-[#5D6B55] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Processed in {inferenceTime} ms
                </span>
              )}
            </div>

            {/* Top Diagnosis Card: Uploaded Image + Findings */}
            <div className="rounded-3xl bg-white border border-[#DDE6D8] p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                
                {/* Uploaded Image Preview */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="relative w-full aspect-square max-w-[280px] rounded-2xl overflow-hidden bg-[#EEF2EC] border border-[#DDE6D8] shadow-inner flex items-center justify-center">
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Diagnosed specimen"
                        className="w-full h-full object-contain p-2"
                      />
                    )}
                    <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs text-[10px] font-bold text-[#24361B] border border-[#DDE6D8]">
                      {scanType === 'fruit' ? '🍊 Fruit' : '🌿 Leaf'} Specimen
                    </span>
                  </div>
                </div>

                {/* Diagnosis Summary */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <StatusBadge severity={diagnosedDisease.severity} size="md" />
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#EEF2EC] border border-[#DDE6D8] text-[#24361B]">
                      {(result.confidence * 100).toFixed(1)}% Confidence
                    </span>
                  </div>

                  <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24361B] font-heading capitalize">
                      {diagnosedDisease.name}
                    </h2>
                    <p className="text-sm text-[#5D6B55] italic font-serif mt-0.5">
                      {diagnosedDisease.scientificName}
                    </p>
                  </div>

                  {/* "What we found" box */}
                  <div className="p-4 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8] space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#24361B]">
                      What We Found
                    </h4>
                    <p className="text-sm text-[#5D6B55] leading-relaxed">
                      {diagnosedDisease.description}
                    </p>
                  </div>

                  {/* Action Quick Buttons */}
                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      onClick={handleClear}
                      className="px-4 py-2.5 rounded-xl bg-[#24361B] hover:bg-[#98CC6B] hover:text-[#24361B] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer group"
                    >
                      <RotateCcw className="w-4 h-4 text-[#98CC6B] group-hover:text-[#24361B]" />
                      <span>Scan Another Specimen</span>
                    </button>

                    {onNavigate && (
                      <button
                        onClick={() => onNavigate('diseases')}
                        className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#EEF2EC] text-[#24361B] border border-[#DDE6D8] text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4 text-[#98CC6B]" />
                        <span>Disease Guide</span>
                      </button>
                    )}

                    {onNavigate && (
                      <button
                        onClick={() => onNavigate('history')}
                        className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#EEF2EC] text-[#24361B] border border-[#DDE6D8] text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <History className="w-4 h-4 text-[#5D6B55]" />
                        <span>View in History</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Tabbed Action Section: Symptoms, Treatment, Prevention */}
            <div className="rounded-3xl bg-white border border-[#DDE6D8] overflow-hidden shadow-sm">
              
              {/* Tab Bar */}
              <div className="flex border-b border-[#DDE6D8] bg-[#EEF2EC]/60 px-6">
                <button
                  onClick={() => setActiveTab('symptoms')}
                  className={`py-4 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'symptoms'
                      ? 'border-[#24361B] text-[#24361B] bg-white rounded-t-2xl'
                      : 'border-transparent text-[#5D6B55] hover:text-[#24361B]'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 text-[#ED7A3B]" />
                  <span>Symptoms</span>
                </button>

                <button
                  onClick={() => setActiveTab('treatment')}
                  className={`py-4 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'treatment'
                      ? 'border-[#24361B] text-[#24361B] bg-white rounded-t-2xl'
                      : 'border-transparent text-[#5D6B55] hover:text-[#24361B]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#98CC6B]" />
                  <span>Treatment</span>
                </button>

                <button
                  onClick={() => setActiveTab('prevention')}
                  className={`py-4 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'prevention'
                      ? 'border-[#24361B] text-[#24361B] bg-white rounded-t-2xl'
                      : 'border-transparent text-[#5D6B55] hover:text-[#24361B]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-[#98CC6B]" />
                  <span>Prevention</span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6 sm:p-8">
                
                {/* Symptoms */}
                {activeTab === 'symptoms' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-[#24361B] font-heading">
                      Common Symptoms
                    </h3>
                    <div className="space-y-2.5">
                      {diagnosedDisease.symptoms.map((symptom, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8]"
                        >
                          <div className="w-5 h-5 rounded-full bg-white border border-[#DDE6D8] flex items-center justify-center shrink-0 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ED7A3B]" />
                          </div>
                          <span className="text-sm text-[#24361B] font-medium leading-relaxed">
                            {symptom}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Treatment */}
                {activeTab === 'treatment' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-[#24361B] font-heading">
                      Recommended Management
                    </h3>
                    <div className="space-y-2.5">
                      {diagnosedDisease.treatments.map((treatment, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8]"
                        >
                          <span className="flex items-center justify-center w-6 h-6 rounded-xl bg-[#24361B] text-white text-xs font-bold font-mono shrink-0 mt-0.5">
                            0{idx + 1}
                          </span>
                          <span className="text-sm text-[#24361B] font-medium leading-relaxed">
                            {treatment}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prevention */}
                {activeTab === 'prevention' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-[#24361B] font-heading">
                      How to Reduce Future Risk
                    </h3>
                    <div className="space-y-2.5">
                      {diagnosedDisease.prevention.map((prev, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8]"
                        >
                          <div className="w-5 h-5 rounded-full bg-white border border-[#DDE6D8] flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#98CC6B]" />
                          </div>
                          <span className="text-sm text-[#24361B] font-medium leading-relaxed">
                            {prev}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Subtle Collapsible Technical Details (Softmax Distribution) */}
            <div className="rounded-2xl border border-[#DDE6D8] bg-white overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                className="w-full px-6 py-4 flex items-center justify-between text-xs font-bold text-[#5D6B55] hover:text-[#24361B] bg-[#EEF2EC]/60 transition-colors cursor-pointer"
              >
                <span>Technical Probability Distribution &amp; Model Specifications</span>
                {showTechnicalDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showTechnicalDetails && (
                <div className="p-6 border-t border-[#DDE6D8] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#EEF2EC] border border-[#DDE6D8]">
                      <span className="text-[#5D6B55] block">Model Architecture:</span>
                      <span className="font-bold text-[#24361B]">
                        {scanType === 'fruit' ? 'PyTorch ResNet-34' : 'Random Forest (300 Trees)'}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#EEF2EC] border border-[#DDE6D8]">
                      <span className="text-[#5D6B55] block">Input Modality:</span>
                      <span className="font-bold text-[#24361B]">
                        {scanType === 'fruit' ? '224x224 RGB Rind Crop' : '110-D HSV + GLCM + LBP'}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#EEF2EC] border border-[#DDE6D8]">
                      <span className="text-[#5D6B55] block">Inference Endpoint:</span>
                      <span className="font-mono font-bold text-[#24361B]">
                        {scanType === 'fruit' ? 'POST /predict' : 'POST /predict/leaf'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs uppercase font-bold text-[#5D6B55] tracking-wider mb-2">
                      Softmax Output Classes
                    </h5>
                    <ProbabilityBar
                      probabilities={result.probabilities}
                      predictedClass={result.predicted_class}
                    />
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        ) : (
          
          /* State C: Upload Dropzone & Action Box */
          <motion.div
            key="scanner-upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="rounded-3xl bg-white border border-[#DDE6D8] p-6 sm:p-8 shadow-xs space-y-6">
              
              <div>
                <h3 className="text-lg font-bold text-[#24361B] font-heading">
                  Upload your {scanType === 'fruit' ? 'citrus fruit' : 'citrus leaf'} image
                </h3>
                <p className="text-xs sm:text-sm text-[#5D6B55] mt-1">
                  Take a clear, well-lit photo showing the surface symptoms or healthy tissue.
                </p>
              </div>

              {/* Dropzone */}
              <ImageDropzone
                onImageSelected={handleImageSelected}
                selectedFile={selectedFile}
                onClear={handleClear}
                disabled={isLoading}
                externalPreviewUrl={previewUrl}
              />

              {/* Sample Images Quick Buttons */}
              <div className="pt-2 border-t border-[#DDE6D8] space-y-2">
                <span className="text-xs font-semibold text-[#5D6B55] block">
                  Don't have an image on hand? Try a verified test specimen:
                </span>
                
                <div className="flex flex-wrap gap-2">
                  {scanType === 'fruit' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => loadSample('/samples/fruit_blackspot.jpg', 'sample_blackspot.jpg', 'fruit')}
                        className="px-3.5 py-1.5 rounded-full bg-[#EEF2EC] hover:bg-white text-[#24361B] border border-[#DDE6D8] text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span className="text-[#ED7A3B]">●</span>
                        <span>Sample: Black Spot Fruit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => loadSample('/samples/fruit_healthy.jpg', 'sample_healthy_fruit.jpg', 'fruit')}
                        className="px-3.5 py-1.5 rounded-full bg-[#EEF2EC] hover:bg-white text-[#24361B] border border-[#DDE6D8] text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span className="text-[#98CC6B]">●</span>
                        <span>Sample: Healthy Fruit</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => loadSample('/samples/leaf_anthracnose.jpg', 'sample_anthracnose.jpg', 'leaf')}
                        className="px-3.5 py-1.5 rounded-full bg-[#EEF2EC] hover:bg-white text-[#24361B] border border-[#DDE6D8] text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span className="text-[#ED7A3B]">●</span>
                        <span>Sample: Anthracnose Leaf</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => loadSample('/samples/leaf_healthy.png', 'sample_healthy_leaf.png', 'leaf')}
                        className="px-3.5 py-1.5 rounded-full bg-[#EEF2EC] hover:bg-white text-[#24361B] border border-[#DDE6D8] text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span className="text-[#98CC6B]">●</span>
                        <span>Sample: Healthy Leaf</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Analysis CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={!selectedFile || isLoading}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-xs ${
                    !selectedFile || isLoading
                      ? 'bg-[#EEF2EC] text-[#5D6B55]/50 cursor-not-allowed border border-[#DDE6D8]'
                      : 'bg-[#24361B] hover:bg-[#98CC6B] hover:text-[#24361B] text-white hover:scale-[1.005] cursor-pointer group'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-[#ED7A3B] group-hover:text-[#24361B] transition-colors" />
                  <span>Diagnose Specimen with AI</span>
                  <ArrowRight className="w-5 h-5 text-[#98CC6B] group-hover:text-[#24361B] group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-4 rounded-2xl bg-[#EEF2EC] border border-[#ED7A3B] text-[#24361B] text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#ED7A3B] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#24361B]">Diagnosis Notice</p>
                    <p className="mt-0.5 leading-relaxed text-[#5D6B55]">{error}</p>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};
