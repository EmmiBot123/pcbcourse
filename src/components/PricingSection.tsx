import React from 'react';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { COURSE_INFO } from '../data/courseData';

interface PricingProps {
  onOpenCheckout: () => void;
}

export const PricingSection: React.FC<PricingProps> = ({ onOpenCheckout }) => {
  const inclusions = [
    '6 Live Interactive Sessions (Nov 1st – Nov 6th • 5:00 PM – 6:30 PM IST)',
    'Lifetime on-demand HD session recordings (rewatch anytime)',
    'Official Certificate of Completion from AronLabz Tech Pvt Ltd',
    'Complete KiCad 8 project source files, custom symbols & footprints',
    'Fabrication package: RS-274X Gerbers, Excellon drill files, and BOM',
    'ChatGPT Astra hardware engineering prompt cheat-sheet',
    'Bench bring-up, cold continuity & smoke-test procedure guidelines',
    'Direct interactive technical Q&A with instructors in every session'
  ];

  return (
    <section id="pricing" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#090b10]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-12 text-center mx-auto">
          <span className="text-xs font-mono uppercase text-brand-primaryText font-semibold tracking-wider block mb-2">
            Enrolment & Tuition
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            Simple, all-inclusive enrollment for ₹{COURSE_INFO.price}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            A single one-time payment. Full access to all 6 live sessions, permanent access to recordings, source files, and verifiable completion certification.
          </p>
        </div>

        {/* Pricing Card with Subtle Ambient Sheen */}
        <div className="max-w-xl mx-auto rounded-2xl bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xl card-sheen">
          
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase text-brand-primaryText font-bold block mb-1">
                6-Day Masterclass Pass
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                KiCad 8 & ChatGPT Astra
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                AronLabz Tech Pvt Ltd • Live 1–6 Nov 2026
              </p>
            </div>

            <div className="text-right">
              <div className="flex items-baseline gap-1.5 justify-end">
                <span className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">₹{COURSE_INFO.price}</span>
                <span className="text-xs text-slate-400 line-through">₹2,499</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 block mt-0.5 font-medium">
                One-time tuition fee
              </span>
            </div>
          </div>

          {/* Inclusions */}
          <div className="py-6">
            <span className="text-[11px] font-mono uppercase text-slate-500 tracking-wider block mb-3 font-semibold">
              Included with your registration:
            </span>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment CTA with Tactile Press Feedback */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={onOpenCheckout}
              className="w-full py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white font-semibold text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Enroll via Razorpay — ₹{COURSE_INFO.price}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-primaryText" />
                Secured by Razorpay
              </span>
              <span>•</span>
              <span>Supports UPI (GPay, PhonePe, Paytm), Cards & NetBanking</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
