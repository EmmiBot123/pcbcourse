import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { FAQS } from '../data/courseData';

interface FaqProps {
  onOpenCheckout: () => void;
}

export const FaqSection: React.FC<FaqProps> = ({ onOpenCheckout }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#07090e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-12 text-center mx-auto">
          <span className="text-xs font-mono uppercase text-brand-primaryText font-semibold tracking-wider block mb-2">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            Everything you need to know before enrolling
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Clear, transparent answers about software requirements, schedules, recordings, and certifications.
          </p>
        </div>

        {/* Clean Accordion List */}
        <div className="space-y-3 mb-14">
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-50/70 dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-brand-primaryText' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final CTA Bar */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold mb-1">
              Ready to design your first production PCB?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Live batch starts November 1st at 5:00 PM IST. Single payment of ₹399.
            </p>
          </div>
          <button
            onClick={onOpenCheckout}
            className="px-6 py-3 rounded-lg bg-brand-primary hover:bg-brand-primaryHover text-white font-semibold text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 shadow-xs shrink-0"
          >
            <span>Enroll Now via Razorpay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
