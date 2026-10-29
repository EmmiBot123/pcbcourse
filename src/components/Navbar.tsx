import React, { useState, useEffect, useRef } from 'react';
import { Cpu, ArrowRight, Sun, Moon, Menu, X, Palette as PaletteIcon, Check } from 'lucide-react';
import { useTheme, PALETTE_OPTIONS, Palette } from '../context/ThemeContext';
import { COURSE_INFO } from '../data/courseData';

interface NavbarProps {
  onOpenCheckout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCheckout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paletteMenuOpen, setPaletteMenuOpen] = useState(false);
  const { theme, palette, toggleTheme, setPalette } = useTheme();
  const paletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close palette menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        setPaletteMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Specifications', href: '#specifications' },
    { label: '4 Phases', href: '#phases' },
    { label: 'AI Co-pilot', href: '#ai-tools' },
    { label: '6-Day Syllabus', href: '#syllabus' },
    { label: 'Tuition', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 dark:bg-[#07090e]/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 dark:border-slate-800/80 py-3'
          : 'bg-white/80 dark:bg-[#07090e]/80 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50 py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Company */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center font-bold shadow-xs transition-colors">
              <Cpu className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
                  AronLabz
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                  TECH
                </span>
              </div>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5 font-medium">
                Applied Electronics Lab
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-brand-primaryText transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            
            {/* Live Cohort Pill (Clean & Refined) */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-700 dark:text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              <span>NOV 1–6 • 5 PM IST</span>
            </div>

            {/* Color Palette Switcher Dropdown */}
            <div className="relative" ref={paletteRef}>
              <button
                onClick={() => setPaletteMenuOpen(!paletteMenuOpen)}
                aria-label="Change color theme"
                title="Change Color Palette"
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-1"
              >
                <PaletteIcon className="w-4 h-4 text-brand-primary" />
              </button>

              {paletteMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <span className="text-[10px] font-mono uppercase text-slate-400 px-2.5 py-1 block font-semibold">
                    Color Palette
                  </span>
                  <div className="space-y-1">
                    {PALETTE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setPalette(opt.id);
                          setPaletteMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                          palette === opt.id
                            ? 'bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full shadow-xs border border-white/20"
                            style={{ backgroundColor: opt.primaryColor }}
                          />
                          <span className="truncate">{opt.name}</span>
                        </div>
                        {palette === opt.id && <Check className="w-3.5 h-3.5 text-brand-primary" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle light and dark theme"
              title={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors border border-slate-200/80 dark:border-slate-800/80"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Enroll CTA */}
            <button
              onClick={onOpenCheckout}
              className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primaryHover text-white font-medium text-xs transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Enroll for ₹{COURSE_INFO.price}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 pb-2 space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            {/* Mobile Palette Switcher */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 font-mono block mb-1.5">Color Palette:</span>
              <div className="grid grid-cols-2 gap-1.5">
                {PALETTE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setPalette(opt.id)}
                    className={`flex items-center gap-2 p-1.5 rounded text-[11px] ${
                      palette === opt.id
                        ? 'bg-slate-200 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: opt.primaryColor }} />
                    <span className="truncate">{opt.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">Theme</span>
              <button
                onClick={toggleTheme}
                className="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
