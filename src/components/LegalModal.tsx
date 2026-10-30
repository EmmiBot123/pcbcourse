import React from 'react';
import { X, Shield, FileText, RotateCcw, Truck } from 'lucide-react';
import { COURSE_INFO } from '../data/courseData';

export type LegalTab = 'terms' | 'privacy' | 'refund' | 'delivery';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: LegalTab;
  setActiveTab: (tab: LegalTab) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex justify-center items-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {COURSE_INFO.company} &bull; Legal &amp; Policies
            </h3>
            <p className="text-[11px] text-slate-500">Official Merchant Compliance Information</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/30 px-6 pt-2 gap-2 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'terms'
                ? 'border-brand-primary text-brand-primaryText dark:text-blue-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms &amp; Conditions</span>
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-brand-primary text-brand-primaryText dark:text-blue-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>
          <button
            onClick={() => setActiveTab('refund')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'refund'
                ? 'border-brand-primary text-brand-primaryText dark:text-blue-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Refund &amp; Cancellation</span>
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'delivery'
                ? 'border-brand-primary text-brand-primaryText dark:text-blue-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Digital Delivery</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed font-sans">
          {activeTab === 'terms' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Terms &amp; Conditions of Enrollment</h4>
              <p>
                Welcome to AronLabz Tech Pvt Ltd. By enrolling in the "ChatGPT Astra + AI Co-pilot in KiCad" 6-Day Masterclass, you agree to comply with and be bound by the following terms:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Eligibility:</strong> The course is open to students, hobbyists, engineering professionals, and electronics enthusiasts globally.</li>
                <li><strong>Program Schedule:</strong> The live cohort takes place November 1st – November 6th, 2026, daily at 5:00 PM IST. AronLabz Tech reserves the right to adjust session timings with advance notice to participants via email/WhatsApp.</li>
                <li><strong>Intellectual Property:</strong> All course curriculum, lecture slides, schematic designs, AI prompt templates, and project files provided during the masterclass remain the intellectual property of AronLabz Tech Pvt Ltd. They are provided solely for personal educational use.</li>
                <li><strong>Certificate of Completion:</strong> Digital verified certificates will be issued to participants upon successful completion of the course and practical capstone submissions.</li>
              </ul>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Privacy &amp; Data Protection Policy</h4>
              <p>
                AronLabz Tech Pvt Ltd is committed to safeguarding your personal information and privacy in accordance with applicable data protection laws and IT Act standards.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Information Collected:</strong> We collect your full name, email address, contact phone number, and organization details strictly for course enrollment, certificate issuance, and session link delivery.</li>
                <li><strong>Payment Security:</strong> We do NOT store or process your debit/credit card numbers, UPI PINs, or net banking passwords. All payment transactions are securely handled by Razorpay (PCI-DSS Level 1 compliant gateway).</li>
                <li><strong>Communication:</strong> Your contact information will only be used to send transaction receipts, calendar invites, meeting links, and critical masterclass updates via EmailJS and official WhatsApp notifications.</li>
                <li><strong>No Third-Party Sharing:</strong> We do not sell, rent, or trade your personal information to third-party advertisers.</li>
              </ul>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Refund &amp; Cancellation Policy</h4>
              <p>
                At AronLabz Tech Pvt Ltd, we prioritize delivering an exceptional hands-on learning experience for every student.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Pre-Course Cancellation:</strong> You may request a 100% full refund at any time before the first live session commences on November 1st, 2026 at 5:00 PM IST.</li>
                <li><strong>Post-Kickoff Policy:</strong> Since recordings, live access credentials, and downloadable course assets are distributed immediately upon kickoff, refunds requested after November 1st will be evaluated on a case-by-case basis.</li>
                <li><strong>Processing Timelines:</strong> Approved refunds are credited directly back to the original payment source (UPI / Card / NetBanking) within 5 to 7 business days via the Razorpay gateway.</li>
                <li><strong>How to Request:</strong> Email your refund request along with your Payment ID to <strong>support@aronlabz.com</strong>.</li>
              </ul>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Shipping &amp; Digital Service Delivery Policy</h4>
              <p>
                This masterclass is a 100% online educational program. There are no physical goods or hardware shipments involved.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Instant Digital Delivery:</strong> Immediately upon successful payment confirmation, your digital pass, order ID, and welcome packet are dispatched to your provided email address.</li>
                <li><strong>Session Access:</strong> Interactive Google Meet / Zoom streaming links and community invitation links are shared via email and the batch WhatsApp group prior to each daily live session.</li>
                <li><strong>Recordings &amp; Assets:</strong> Full HD session recordings, KiCad design files, and AI prompt bundles are updated daily in the course portal.</li>
                <li><strong>Customer Support:</strong> For any delivery questions, contact us at <strong>support@aronlabz.com</strong> or visit our office in Bangalore, Karnataka, India.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center text-[11px] text-slate-500">
          <span>AronLabz Tech Pvt Ltd &bull; Bangalore, Karnataka</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

