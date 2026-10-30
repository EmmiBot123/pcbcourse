import React, { useState } from 'react';
import { Cpu, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { COURSE_INFO } from '../data/courseData';
import { LegalModal, LegalTab } from './LegalModal';

export const Footer: React.FC = () => {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTab>('terms');

  const openLegal = (tab: LegalTab) => {
    setActiveLegalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <>
      <footer className="bg-slate-50 dark:bg-[#050608] border-t border-slate-200 dark:border-slate-800/80 py-16 text-xs text-slate-600 dark:text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
            
            {/* Company Info */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-brand-primary text-white flex items-center justify-center font-bold">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
                  AronLabz Tech Pvt Ltd
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 max-w-sm">
                Electronics Design Automation & Applied AI Division. Empowering engineers, students, and makers to design and manufacture production-grade hardware.
              </p>

              <div className="space-y-1 text-slate-500 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Bangalore, Karnataka, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>support@aronlabz.com</span>
                </div>
              </div>
            </div>

            {/* Masterclass Links */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-mono uppercase text-slate-900 dark:text-white font-bold mb-3 tracking-wider">
                Masterclass
              </h4>
              <ul className="space-y-2 font-mono text-[11px]">
                <li><a href="#overview" className="hover:text-slate-900 dark:hover:text-white transition-colors">Course Overview</a></li>
                <li><a href="#specifications" className="hover:text-slate-900 dark:hover:text-white transition-colors">Board Specifications</a></li>
                <li><a href="#phases" className="hover:text-slate-900 dark:hover:text-white transition-colors">4-Stage Pipeline</a></li>
                <li><a href="#ai-tools" className="hover:text-slate-900 dark:hover:text-white transition-colors">ChatGPT Astra Co-pilot</a></li>
                <li><a href="#syllabus" className="hover:text-slate-900 dark:hover:text-white transition-colors">6-Day Syllabus</a></li>
                <li><a href="#certificate" className="hover:text-slate-900 dark:hover:text-white transition-colors">AronLabz Certificate</a></li>
              </ul>
            </div>

            {/* Payment & Security */}
            <div className="md:col-span-4">
              <h4 className="text-xs font-mono uppercase text-slate-900 dark:text-white font-bold mb-3 tracking-wider">
                Payments & Security
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                All transactions are encrypted and processed securely by <strong>Razorpay</strong>. We support UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards, and NetBanking.
              </p>
              <div className="flex items-center gap-2 text-brand-primaryText font-mono text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                <span>PCI-DSS Level 1 Compliant Checkout</span>
              </div>
            </div>

          </div>

          {/* Legal & Trademark Disclaimers */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
            <p>
              © {new Date().getFullYear()} {COURSE_INFO.company}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => openLegal('terms')} className="hover:underline text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
                Terms &amp; Conditions
              </button>
              <span>•</span>
              <button onClick={() => openLegal('privacy')} className="hover:underline text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
                Privacy Policy
              </button>
              <span>•</span>
              <button onClick={() => openLegal('refund')} className="hover:underline text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
                Refund &amp; Cancellation
              </button>
              <span>•</span>
              <button onClick={() => openLegal('delivery')} className="hover:underline text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
                Digital Delivery
              </button>
            </div>
          </div>

          <p className="mt-4 text-[10px] text-slate-400 dark:text-slate-600 leading-relaxed font-mono">
            Disclaimer: KiCad is an open-source EDA software suite maintained by the KiCad developer team. This masterclass is an independent educational program developed and delivered by AronLabz Tech Pvt Ltd.
          </p>

        </div>
      </footer>

      {/* Compliance & Legal Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        activeTab={activeLegalTab}
        setActiveTab={setActiveLegalTab}
      />
    </>
  );
};
