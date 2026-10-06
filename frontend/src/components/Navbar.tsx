import React, { useState } from 'react';
import { 
  Leaf, 
  Search, 
  Sprout, 
  Menu, 
  X, 
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onScanClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onScanClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'scanner', label: 'AI Scanner' },
    { id: 'diseases', label: 'Diseases' },
    { id: 'prevention', label: 'Prevention' },
    { id: 'history', label: 'History' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'how-it-works') {
      if (activeTab !== 'home') {
        setActiveTab('home');
        setTimeout(() => {
          const el = document.getElementById('how-it-works-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById('how-it-works-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setActiveTab(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#EEF2EC]/95 backdrop-blur-md border-b border-[#DDE6D8] transition-colors">
      <div className="max-w-[1260px] mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-[76px]">
          
          {/* Logo (Delicate botanical identity) */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 rounded-xl bg-white border border-[#DDE6D8] flex items-center justify-center text-[#24361B] transition-transform group-hover:scale-105">
              <Leaf className="w-4 h-4 text-[#98CC6B]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[17px] font-bold tracking-tight font-heading leading-tight text-[#24361B]">
                CitrusGuard <span className="text-[#98CC6B] font-semibold">AI</span>
              </span>
              <span className="text-[10px] text-[#5D6B55] tracking-wider uppercase font-medium">
                Crop Health Intelligence
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative py-2 text-[13px] font-medium transition-colors cursor-pointer group"
                >
                  <span className={isActive ? 'text-[#24361B] font-semibold' : 'text-[#5D6B55] hover:text-[#24361B]'}>
                    {item.label}
                  </span>
                  
                  {isActive ? (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#98CC6B] rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  ) : (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#98CC6B] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full opacity-60" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Side: Subtle Utility Icons + Clean Small-radius Scan Now Button */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Search Utility Icon */}
            <button
              onClick={() => handleNavClick('diseases')}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#5D6B55] hover:text-[#24361B] hover:bg-white/80 transition-all cursor-pointer"
              title="Search Diseases"
              aria-label="Search Diseases"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Plant/Health Utility Icon */}
            <button
              onClick={() => handleNavClick('prevention')}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#5D6B55] hover:text-[#24361B] hover:bg-white/80 transition-all cursor-pointer"
              title="Citrus Prevention & Health Guide"
              aria-label="Citrus Prevention & Health Guide"
            >
              <Sprout className="w-4 h-4 text-[#98CC6B]" />
            </button>

            {/* Scan Now CTA Button */}
            <button
              onClick={() => {
                if (onScanClick) onScanClick();
                else setActiveTab('scanner');
              }}
              className="ml-1 px-4 py-2 rounded-xl bg-[#24361B] hover:bg-[#98CC6B] text-white hover:text-[#24361B] border border-[#24361B] hover:border-[#98CC6B] text-[13px] font-semibold flex items-center gap-2 shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span className="text-sm">🍊</span>
              <span>Scan Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#24361B] hover:bg-white border border-[#DDE6D8] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#DDE6D8] bg-[#EEF2EC] px-6 pt-3 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white text-[#24361B] font-semibold border border-[#DDE6D8]'
                    : 'text-[#5D6B55] hover:bg-white/60'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#98CC6B]" />}
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#DDE6D8]">
            <button
              onClick={() => {
                setActiveTab('scanner');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#24361B] hover:bg-[#98CC6B] text-white hover:text-[#24361B] font-bold text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>🍊</span>
              <span>Scan Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
