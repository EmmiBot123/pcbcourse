import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { COURSE_INFO } from '../data/courseData';

interface CertificateShowcaseProps {
  onOpenCheckout: () => void;
}

export const CertificateShowcase: React.FC<CertificateShowcaseProps> = ({ onOpenCheckout }) => {
  return (
    <section id="certificate" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#07090e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context & Recognition */}
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase text-brand-primaryText font-semibold tracking-wider block mb-2">
              Official Credential
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Earn a verifiable Certificate of Completion
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Participants who complete the 6-day masterclass receive an official, verifiable credential issued by <strong className="text-slate-900 dark:text-white font-semibold">{COURSE_INFO.company}</strong>.
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-mono mb-8">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Issued by registered corporate entity: AronLabz Tech Pvt Ltd</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Unique credential verification ID for portfolio review</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Add directly to your LinkedIn Licenses & Certifications</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Demonstrates practical mastery of KiCad 8 & AI hardware tools</span>
              </li>
            </ul>

            <button
              onClick={onOpenCheckout}
              className="px-6 py-3 rounded-lg bg-brand-primary hover:bg-brand-primaryHover text-white font-medium text-xs transition-all duration-200 active:scale-[0.98] inline-flex items-center gap-1.5 shadow-xs"
            >
              <span>Enroll to Get Certified — ₹{COURSE_INFO.price}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Column: Realistic Certificate Mockup with Subtle 3D Card Hover */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xl text-center relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              
              {/* Subtle Guilloche / Border Accent */}
              <div className="absolute inset-2 border border-slate-200/80 dark:border-slate-800/80 rounded-xl pointer-events-none"></div>

              {/* Certificate Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 text-left relative z-10">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                    AronLabz Tech Pvt Ltd
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono">
                    Applied Electronics & AI Design Division • Bangalore, India
                  </p>
                </div>
                <span className="text-[10px] font-mono text-brand-primaryText px-2.5 py-0.5 rounded bg-brand-primarySubtle border border-brand-primaryBorder font-bold">
                  VERIFIED CREDENTIAL
                </span>
              </div>

              {/* Certificate Body */}
              <div className="py-8 relative z-10">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block mb-3 font-semibold">
                  Certificate of Completion
                </span>
                <p className="text-xs text-slate-500 mb-2">This is to certify that</p>
                <p className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white font-semibold mb-3">
                  [ Participant Name ]
                </p>
                <div className="w-24 h-px bg-slate-200 dark:bg-slate-700 mx-auto mb-4"></div>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  has successfully completed the 6-day live hands-on masterclass on
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-2 font-mono">
                  ChatGPT Astra + AI Co-pilot in KiCad
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto font-mono">
                  Covering Schematics, Footprints, 2-Layer Layout, DRC, and Factory CAM Outputs.
                </p>
              </div>

              {/* Signatures & Seal */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-end justify-between text-left text-xs font-mono relative z-10">
                <div>
                  <div className="h-6 border-b border-slate-400 dark:border-slate-600 w-32 mb-1 flex items-end">
                    <span className="font-serif italic text-xs text-slate-700 dark:text-slate-300">AronLabz Board</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block">Lead Hardware Engineer</span>
                  <span className="text-[9px] text-slate-400 block">AronLabz Tech Pvt Ltd</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Issued: November 2026</span>
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 font-mono block">
                    ID: ALZ-KC-2026-XXXX
                  </span>
                  <span className="text-[9px] text-brand-primaryText block font-mono font-medium">
                    aronlabz.com/verify
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
