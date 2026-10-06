import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  Download, 
  Search, 
  Citrus, 
  Leaf, 
  Calendar, 
  Filter, 
  X, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';
import { StatusBadge } from '../components/StatusBadge';
import { CITRUS_DISEASES } from '../data/diseaseDatabase';
import type { ScanRecord } from '../types/disease';

interface HistoryPageProps {
  onNavigate?: (tab: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onNavigate }) => {
  const { history, deleteRecord, clearHistory, exportHistory } = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'fruit' | 'leaf' | 'diseased' | 'healthy'>('all');
  const [selectedScan, setSelectedScan] = useState<ScanRecord | null>(null);

  // Computed summary metrics
  const totalScans = history.length;
  const healthyScans = history.filter(
    (h) => h.predictedClass.toLowerCase() === 'healthy'
  ).length;
  const diseasedScans = totalScans - healthyScans;
  const avgConfidence = totalScans > 0
    ? Math.round((history.reduce((acc, h) => acc + h.confidence, 0) / totalScans) * 1000) / 10
    : 0;

  const filteredHistory = history.filter((item) => {
    // Type filter
    if (filterType === 'fruit' && item.type !== 'fruit') return false;
    if (filterType === 'leaf' && item.type !== 'leaf') return false;
    if (filterType === 'healthy' && item.predictedClass.toLowerCase() !== 'healthy') return false;
    if (filterType === 'diseased' && item.predictedClass.toLowerCase() === 'healthy') return false;

    // Search query
    const matchesSearch =
      item.predictedClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.filename.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="space-y-10 pb-16 text-left max-w-6xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2EC] border border-[#DDE6D8] text-[#24361B] text-xs font-semibold">
            <History className="w-3.5 h-3.5 text-[#98CC6B]" />
            <span>Inspection Audit Records</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#24361B] font-heading tracking-tight mt-1">
            Your Scan History
          </h1>
          <p className="text-xs sm:text-sm text-[#5D6B55] mt-1">
            Review previous diagnostic evaluations, confidence metrics, and exported pathology reports.
          </p>
        </div>

        {history.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={exportHistory}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#EEF2EC] text-[#24361B] border border-[#DDE6D8] text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#98CC6B]" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your local scan history?')) {
                  clearHistory();
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#EEF2EC] text-[#5D6B55] hover:text-[#ED7A3B] border border-[#DDE6D8] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#DDE6D8] shadow-xs text-center space-y-1">
          <p className="text-3xl sm:text-4xl font-extrabold text-[#24361B] font-heading">
            {totalScans}
          </p>
          <h4 className="text-xs sm:text-sm font-bold text-[#24361B]">Total Scans</h4>
          <p className="text-[11px] text-[#5D6B55]">In session storage</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#DDE6D8] shadow-xs text-center space-y-1">
          <p className="text-3xl sm:text-4xl font-extrabold text-[#ED7A3B] font-heading">
            {diseasedScans}
          </p>
          <h4 className="text-xs sm:text-sm font-bold text-[#24361B]">Diseases Detected</h4>
          <p className="text-[11px] text-[#5D6B55]">Pathology positive</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#DDE6D8] shadow-xs text-center space-y-1">
          <p className="text-3xl sm:text-4xl font-extrabold text-[#98CC6B] font-heading">
            {healthyScans}
          </p>
          <h4 className="text-xs sm:text-sm font-bold text-[#24361B]">Healthy Scans</h4>
          <p className="text-[11px] text-[#5D6B55]">Optimal vigor</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#DDE6D8] shadow-xs text-center space-y-1">
          <p className="text-3xl sm:text-4xl font-extrabold text-[#24361B] font-heading font-mono">
            {avgConfidence}%
          </p>
          <h4 className="text-xs sm:text-sm font-bold text-[#24361B]">Average Confidence</h4>
          <p className="text-[11px] text-[#5D6B55]">Across all inferences</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-3xl bg-white border border-[#DDE6D8] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5D6B55]" />
          <input
            type="text"
            placeholder="Search by disease name or filename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8] text-xs sm:text-sm text-[#24361B] placeholder-[#5D6B55]/70 focus:outline-none focus:border-[#98CC6B] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-[#5D6B55] mr-1 hidden sm:inline" />
          {(['all', 'fruit', 'leaf', 'diseased', 'healthy'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterType(filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                filterType === filter
                  ? 'bg-[#98CC6B] text-[#24361B] font-bold shadow-xs'
                  : 'bg-[#EEF2EC] text-[#5D6B55] hover:bg-white border border-[#DDE6D8]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* History Items List / Table */}
      {filteredHistory.length > 0 ? (
        <div className="space-y-3">
          {filteredHistory.map((item) => {
            const disease = CITRUS_DISEASES[item.predictedClass.toLowerCase()];
            const formattedDate = new Date(item.timestamp).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={item.id}
                onClick={() => setSelectedScan(item)}
                className="p-5 rounded-3xl bg-white border border-[#DDE6D8] hover:border-[#98CC6B] hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
              >
                {/* Left: Thumbnail & Disease Info */}
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8] overflow-hidden flex items-center justify-center shrink-0">
                    {item.imagePreviewUrl ? (
                      <img
                        src={item.imagePreviewUrl}
                        alt="Scanned specimen"
                        className="w-full h-full object-cover"
                      />
                    ) : item.type === 'fruit' ? (
                      <Citrus className="w-6 h-6 text-[#ED7A3B]" />
                    ) : (
                      <Leaf className="w-6 h-6 text-[#98CC6B]" />
                    )}
                  </div>

                  <div className="space-y-1 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-bold text-[#24361B] font-heading capitalize group-hover:text-[#24361B] transition-colors">
                        {disease ? disease.name : item.predictedClass}
                      </h4>
                      {disease && <StatusBadge severity={disease.severity} size="sm" />}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#5D6B55]">
                      <span className="capitalize font-medium text-[#24361B]">
                        {item.type === 'fruit' ? '🍊 Fruit' : '🌿 Leaf'} Specimen
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-[#98CC6B]" />
                        {formattedDate}
                      </span>
                      <span>&bull;</span>
                      <span className="font-mono truncate max-w-[150px]">
                        {item.filename}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Confidence & Action */}
                <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#DDE6D8]">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-[#5D6B55] tracking-wider block">
                      Confidence
                    </span>
                    <span className="text-lg font-mono font-bold text-[#24361B]">
                      {(item.confidence * 100).toFixed(1)}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteRecord(item.id);
                      }}
                      className="p-2.5 rounded-xl bg-[#EEF2EC] hover:bg-white text-[#5D6B55] hover:text-[#ED7A3B] border border-[#DDE6D8] transition-colors cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="w-8 h-8 rounded-xl bg-[#EEF2EC] group-hover:bg-[#98CC6B] border border-[#DDE6D8] flex items-center justify-center text-[#24361B] transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-16 rounded-3xl bg-white border border-dashed border-[#DDE6D8] flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#EEF2EC] border border-[#DDE6D8] flex items-center justify-center text-[#24361B]">
            <History className="w-7 h-7 text-[#98CC6B]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#24361B] font-heading">
              No Scan Records Found
            </h3>
            <p className="text-xs sm:text-sm text-[#5D6B55] max-w-sm mt-1 leading-relaxed">
              Diagnoses performed via the AI Scanner are automatically saved locally in your browser session.
            </p>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate('scanner')}
              className="px-5 py-2.5 rounded-xl bg-[#24361B] hover:bg-[#98CC6B] hover:text-[#24361B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Start Your First Scan
            </button>
          )}
        </div>
      )}

      {/* Scan Detail Modal */}
      <AnimatePresence>
        {selectedScan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#24361B]/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-[#DDE6D8] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-left"
            >
              {(() => {
                const disease = CITRUS_DISEASES[selectedScan.predictedClass.toLowerCase()];
                const formattedDate = new Date(selectedScan.timestamp).toLocaleString();

                return (
                  <>
                    {/* Header */}
                    <div className="p-6 sm:p-8 border-b border-[#DDE6D8] bg-white flex items-start justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-[#5D6B55]">
                          Scan ID: {selectedScan.id}
                        </span>
                        <h3 className="text-2xl font-extrabold text-[#24361B] font-heading capitalize">
                          {disease ? disease.name : selectedScan.predictedClass}
                        </h3>
                        <div className="flex items-center gap-2 pt-1">
                          {disease && <StatusBadge severity={disease.severity} size="sm" />}
                          <span className="text-xs font-mono font-bold text-[#24361B]">
                            {(selectedScan.confidence * 100).toFixed(1)}% Confidence
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedScan(null)}
                        className="p-2 rounded-xl bg-[#EEF2EC] hover:bg-white border border-[#DDE6D8] text-[#5D6B55] hover:text-[#24361B] cursor-pointer transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 sm:p-8 space-y-6">
                      
                      {/* Image preview & metadata */}
                      <div className="flex flex-col sm:flex-row gap-5 items-center">
                        {selectedScan.imagePreviewUrl && (
                          <div className="w-36 h-36 rounded-2xl overflow-hidden bg-[#EEF2EC] border border-[#DDE6D8] shrink-0">
                            <img
                              src={selectedScan.imagePreviewUrl}
                              alt="Scan Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="space-y-1.5 text-xs text-[#5D6B55] flex-1">
                          <p><strong className="text-[#24361B]">File:</strong> {selectedScan.filename}</p>
                          <p><strong className="text-[#24361B]">Timestamp:</strong> {formattedDate}</p>
                          <p><strong className="text-[#24361B]">Specimen Category:</strong> {selectedScan.type === 'fruit' ? 'Citrus Fruit' : 'Citrus Leaf'}</p>
                          {disease && <p><strong className="text-[#24361B]">Taxonomy:</strong> {disease.scientificName}</p>}
                        </div>
                      </div>

                      {/* Symptoms */}
                      {disease && (
                        <div className="space-y-2">
                          <h4 className="text-xs uppercase font-bold text-[#5D6B55] tracking-wider flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-[#ED7A3B]" />
                            Characteristic Symptoms
                          </h4>
                          <div className="space-y-1.5">
                            {disease.symptoms.map((s, idx) => (
                              <div key={idx} className="p-3 rounded-xl bg-[#EEF2EC] border border-[#DDE6D8] text-xs text-[#24361B]">
                                &bull; {s}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Treatments */}
                      {disease && (
                        <div className="space-y-2">
                          <h4 className="text-xs uppercase font-bold text-[#5D6B55] tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#98CC6B]" />
                            Recommended Management Actions
                          </h4>
                          <div className="space-y-1.5">
                            {disease.treatments.map((t, idx) => (
                              <div key={idx} className="p-3 rounded-xl bg-[#EEF2EC] border border-[#DDE6D8] text-xs text-[#24361B]">
                                0{idx + 1}. {t}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Prevention */}
                      {disease && (
                        <div className="space-y-2">
                          <h4 className="text-xs uppercase font-bold text-[#5D6B55] tracking-wider flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#98CC6B]" />
                            Future Prevention
                          </h4>
                          <div className="space-y-1.5">
                            {disease.prevention.map((p, idx) => (
                              <div key={idx} className="p-3 rounded-xl bg-[#EEF2EC] border border-[#DDE6D8] text-xs text-[#24361B]">
                                &check; {p}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-[#DDE6D8] bg-[#EEF2EC]/60 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedScan(null)}
                        className="px-4 py-2 rounded-xl border border-[#DDE6D8] text-xs font-semibold text-[#24361B] hover:bg-white transition-colors cursor-pointer"
                      >
                        Close
                      </button>

                      <button
                        onClick={() => {
                          deleteRecord(selectedScan.id);
                          setSelectedScan(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-white text-[#5D6B55] hover:text-[#ED7A3B] hover:bg-[#EEF2EC] border border-[#DDE6D8] text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Delete Record
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
