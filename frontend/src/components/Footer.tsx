import React from 'react';
import { Citrus } from 'lucide-react';

interface FooterProps {
  onNavigate?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#24361B] text-[#FFFFFF] py-14 mt-auto border-t border-[#24361B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 mb-10 text-left">
          
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#2e4522] border border-[#3f5d2f] flex items-center justify-center text-[#98CC6B]">
                <Citrus className="w-5 h-5 text-[#ED7A3B]" />
              </div>
              <span className="text-xl font-bold text-[#FFFFFF] font-heading tracking-tight">
                CitrusGuard <span className="text-[#98CC6B]">AI</span>
              </span>
            </div>
            
            <p className="text-sm text-[#DDE6D8]/80 max-w-sm leading-relaxed">
              A practical botanical guide to checking citrus fruit and leaf health, understanding common symptoms, and protecting your grove with intelligent AI diagnosis.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2e4522] border border-[#3f5d2f] text-[11px] font-medium text-[#DDE6D8]">
                <span className="w-2 h-2 rounded-full bg-[#98CC6B]" />
                Fruit &amp; leaf health platform
              </span>
            </div>
          </div>

          {/* Column 2: Product Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#98CC6B] font-heading">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('home')}
                  className="text-[#DDE6D8] hover:text-[#98CC6B] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('scanner')}
                  className="text-[#DDE6D8] hover:text-[#98CC6B] transition-colors cursor-pointer"
                >
                  AI Scanner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('diseases')}
                  className="text-[#DDE6D8] hover:text-[#98CC6B] transition-colors cursor-pointer"
                >
                  Disease Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('prevention')}
                  className="text-[#DDE6D8] hover:text-[#98CC6B] transition-colors cursor-pointer"
                >
                  Prevention
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('history')}
                  className="text-[#DDE6D8] hover:text-[#98CC6B] transition-colors cursor-pointer"
                >
                  Health History
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#98CC6B] font-heading">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('home');
                      setTimeout(() => {
                        document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
                      }, 150);
                    }
                  }}
                  className="text-[#DDE6D8] hover:text-[#98CC6B] transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('health')}
                  className="text-[#DDE6D8] hover:text-[#98CC6B] transition-colors cursor-pointer"
                >
                  Citrus Health Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('diseases')}
                  className="text-[#DDE6D8] hover:text-[#98CC6B] transition-colors cursor-pointer"
                >
                  Disease Identification
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('prevention')}
                  className="text-[#DDE6D8] hover:text-[#98CC6B] transition-colors cursor-pointer"
                >
                  Treatment &amp; Prevention
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#344b26] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#DDE6D8]/70 gap-3">
          <p>&copy; 2026 CitrusGuard AI. Botanical disease classification &amp; grove care.</p>
          <p className="text-xs text-[#DDE6D8]/60">
            Powered by dual-pipeline deep learning for citrus fruit and foliage.
          </p>
        </div>

      </div>
    </footer>
  );
};
