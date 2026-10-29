import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { COURSE_INFO } from '../data/courseData';

interface StickyBannerProps {
  onOpenCheckout: () => void;
}

export const StickyBanner: React.FC<StickyBannerProps> = ({ onOpenCheckout }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero (400px)
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#07090e]/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80 py-3 px-4 shadow-lg transition-transform duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <span className="text-xs font-bold text-slate-900 dark:text-white block">
              ChatGPT Astra + AI Co-pilot in KiCad
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              AronLabz Tech • Nov 1st – 6th • 5 PM IST Daily
            </span>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              ₹{COURSE_INFO.price}
            </span>
            <span className="text-xs text-slate-400 line-through hidden xs:inline">
              ₹2,499
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-primaryText" />
            Razorpay Secured
          </span>

          <button
            onClick={onOpenCheckout}
            className="px-5 py-2.5 rounded-lg bg-brand-primary hover:bg-brand-primaryHover text-white font-medium text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>Enroll Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
