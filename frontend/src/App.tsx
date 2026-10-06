import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';
import { LandingPage } from './pages/LandingPage';
import { UnifiedScanner } from './pages/UnifiedScanner';
import { DiseaseGuidePage } from './pages/DiseaseGuidePage';
import { PreventionPage } from './pages/PreventionPage';
import { CitrusHealthPage } from './pages/CitrusHealthPage';
import { HistoryPage } from './pages/HistoryPage';
import { HistoryProvider } from './context/HistoryContext';
import { motion, AnimatePresence } from 'framer-motion';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [scannerInitialType, setScannerInitialType] = useState<'fruit' | 'leaf'>('fruit');
  const [showLoader, setShowLoader] = useState<boolean>(() => {
    // Show splash animation on first visit of the session
    return !sessionStorage.getItem('cg_loader_seen');
  });

  const handleLoaderComplete = () => {
    setShowLoader(false);
    sessionStorage.setItem('cg_loader_seen', 'true');
  };

  const handleScanFruit = () => {
    setScannerInitialType('fruit');
    setActiveTab('scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScanLeaf = () => {
    setScannerInitialType('leaf');
    setActiveTab('scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <HistoryProvider>
      {/* Interactive Citrus Canvas Loader */}
      {showLoader && <Loader onComplete={handleLoaderComplete} />}

      <div className="min-h-screen bg-[#EEF2EC] text-[#24361B] flex flex-col font-sans selection:bg-[#98CC6B] selection:text-[#24361B]">
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleNavigate}
          onScanClick={handleScanFruit}
        />

        <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-10 pt-7 sm:pt-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'home' && (
                <LandingPage
                  onScanFruit={handleScanFruit}
                  onScanLeaf={handleScanLeaf}
                  onNavigate={handleNavigate}
                />
              )}

              {activeTab === 'scanner' && (
                <UnifiedScanner
                  initialType={scannerInitialType}
                  onNavigate={handleNavigate}
                />
              )}

              {activeTab === 'diseases' && (
                <DiseaseGuidePage
                  onScanSpecimen={(type) => {
                    setScannerInitialType(type);
                    setActiveTab('scanner');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              )}

              {activeTab === 'prevention' && (
                <PreventionPage
                  onNavigate={handleNavigate}
                />
              )}

              {activeTab === 'health' && (
                <CitrusHealthPage
                  onScanFruit={handleScanFruit}
                  onScanLeaf={handleScanLeaf}
                  onNavigate={handleNavigate}
                />
              )}

              {activeTab === 'history' && (
                <HistoryPage
                  onNavigate={handleNavigate}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer onNavigate={handleNavigate} />
      </div>
    </HistoryProvider>
  );
};

export default App;
