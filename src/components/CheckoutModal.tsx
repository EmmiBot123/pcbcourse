import React, { useState } from 'react';
import { 
  X, 
  Check, 
  AlertCircle, 
  ArrowRight,
  Copy,
  ShieldCheck,
  Mail,
  RefreshCw,
  Loader2,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COURSE_INFO } from '../data/courseData';
import { RegistrationData } from '../types';
import { processRazorpayPayment, PaymentResult, defaultRazorpayConfig } from '../services/payment';
import { sendStudentConfirmationEmail } from '../services/emailService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    experienceLevel: 'Student',
    paymentMethod: 'razorpay',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<PaymentResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedTxn, setCopiedTxn] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [emailError, setEmailError] = useState<string | null>(null);

  // Promo Code States
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [paidAmount, setPaidAmount] = useState<number>(COURSE_INFO.price);

  const originalPrice = COURSE_INFO.price; // ₹399
  const currentPrice = appliedPromo ? 1 : originalPrice; // ₹1 if promo applied
  const discountAmount = originalPrice - currentPrice;

  // Accepted promo codes (e.g. ARON1, TEST1, ASTRA1, VIP1, etc. or anything ending with 1)
  const validPromoCodes = ['ARON1', 'TEST1', 'ASTRA1', 'VIP1', 'PCB1', 'KICAD1', '1RS', 'PROMO1', 'ONE'];

  const handleApplyPromo = (e: React.MouseEvent) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();
    if (!cleanCode) {
      setPromoMessage({ type: 'error', text: 'Please enter a promo code.' });
      return;
    }

    if (validPromoCodes.includes(cleanCode) || cleanCode.endsWith('1') || cleanCode === 'ARON' || cleanCode === 'TEST') {
      setAppliedPromo(cleanCode);
      setPromoMessage({ type: 'success', text: `Promo code "${cleanCode}" applied! Payable amount is now ₹1.` });
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.65 },
        colors: ['#10b981', '#2563eb', '#d97706'],
      });
    } else {
      setPromoMessage({ type: 'error', text: 'Invalid code. Try ARON1 or TEST1.' });
    }
  };

  const handleRemovePromo = (e: React.MouseEvent) => {
    e.preventDefault();
    setAppliedPromo(null);
    setPromoInput('');
    setPromoMessage(null);
  };

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage(null);
  };

  const dispatchEmail = async (result: PaymentResult, amount: number = currentPrice) => {
    setEmailStatus('sending');
    setEmailError(null);
    try {
      const res = await sendStudentConfirmationEmail(formData, result, amount);
      if (res.success) {
        setEmailStatus('sent');
      } else {
        setEmailStatus('failed');
        setEmailError(res.message || 'Dispatch failed');
      }
    } catch (err: any) {
      setEmailStatus('failed');
      setEmailError(err.message || 'Network error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in your name, email address, and phone number.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // Pass the effective amount (₹1 if promo code applied, else ₹399)
      const effectiveAmount = currentPrice;
      const result = await processRazorpayPayment(formData, {
        ...defaultRazorpayConfig,
        amount: effectiveAmount,
      });

      if (result.success) {
        setPaymentSuccess(result);
        setPaidAmount(effectiveAmount);
        
        // Automated EmailJS student confirmation dispatch with reactive status
        dispatchEmail(result, effectiveAmount);

        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#3b82f6', '#d97706', '#10b981'],
        });
      } else {
        setErrorMessage(result.error || 'Payment was cancelled or could not be processed.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while connecting to Razorpay.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyTransactionId = () => {
    if (paymentSuccess?.transactionId) {
      navigator.clipboard.writeText(paymentSuccess.transactionId);
      setCopiedTxn(true);
      setTimeout(() => setCopiedTxn(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex justify-center items-start sm:items-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg max-h-[94vh] flex flex-col rounded-2xl bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header (Always pinned & visible) */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {COURSE_INFO.company}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Masterclass Enrolment Pass</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body (Scrollable with elegant padding) */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {paymentSuccess ? (
            /* Confirmed Enrolment View */
            <div className="text-center py-1">
              <div className="w-11 h-11 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2.5">
                <Check className="w-5 h-5" />
              </div>

              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-bold">
                Enrolment Confirmed
              </span>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2 mb-1">
                You're Enrolled in the Masterclass
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto mb-4">
                Thank you, <strong className="text-slate-900 dark:text-white font-semibold">{formData.name}</strong>. Your seat for the 6-Day KiCad & ChatGPT Astra masterclass is confirmed.
              </p>

              <div className="bg-slate-50 dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-left font-mono text-xs space-y-1.5 mb-4">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5">
                  <span className="text-slate-500">Masterclass:</span>
                  <span className="text-slate-900 dark:text-slate-200 font-semibold">KiCad + ChatGPT Astra</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5">
                  <span className="text-slate-500">Live Dates:</span>
                  <span className="text-slate-900 dark:text-slate-200">{COURSE_INFO.dates} • {COURSE_INFO.time}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="text-brand-primaryText font-bold">
                    ₹{paidAmount} {appliedPromo && <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-normal">({appliedPromo} applied)</span>}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-0.5">
                  <span className="text-slate-500">Payment ID:</span>
                  <button
                    onClick={copyTransactionId}
                    className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700"
                  >
                    <span>{paymentSuccess.transactionId}</span>
                    {copiedTxn ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Email Status & Delivery Assurance */}
              {emailStatus === 'sending' && (
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-left mb-4 font-mono text-blue-800 dark:text-blue-300 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-blue-400 animate-spin" />
                  <span className="leading-relaxed">
                    Dispatching confirmation email to <strong className="text-slate-900 dark:text-white underline">{formData.email}</strong>...
                  </span>
                </div>
              )}

              {emailStatus === 'sent' && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-left mb-4 font-mono text-emerald-800 dark:text-emerald-300 flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <span className="leading-relaxed">
                      Official confirmation email sent to <strong className="text-slate-900 dark:text-white underline">{formData.email}</strong>. (Check Inbox & Spam/Promotions).
                    </span>
                  </div>
                  <button
                    onClick={() => dispatchEmail(paymentSuccess)}
                    title="Resend confirmation email"
                    className="shrink-0 p-1 rounded hover:bg-emerald-200/50 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              )}

              {emailStatus === 'failed' && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-left mb-4 font-mono text-amber-800 dark:text-amber-300">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <span className="leading-relaxed">
                      Email dispatch notice: {emailError || 'Could not auto-deliver'}.
                    </span>
                  </div>
                  <button
                    onClick={() => dispatchEmail(paymentSuccess)}
                    className="w-full py-1.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-[11px] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Retry Sending Confirmation Email</span>
                  </button>
                </div>
              )}

              {emailStatus === 'idle' && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-left mb-4 font-mono text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                  <span className="leading-relaxed">
                    Confirmation packet & streaming access queued for <strong className="text-slate-900 dark:text-white underline">{formData.email}</strong>.
                  </span>
                </div>
              )}

              {/* Post-Payment Action Hub */}
              <div className="space-y-2 mb-3">
                <a
                  href="https://chat.whatsapp.com/invite-placeholder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>💬 Join Batch WhatsApp Community</span>
                </a>

                <a
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=ChatGPT+Astra+%2B+AI+Co-pilot+in+KiCad+Masterclass&dates=20261101T113000Z/20261101T130000Z&recur=RRULE:FREQ=DAILY;COUNT=6&details=Live+6-Day+Hardware+Masterclass+by+AronLabz+Tech+Pvt+Ltd.+Daily+at+5:00+PM+IST.&location=Online+Live+Stream"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-xs transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
                >
                  <span>📅 Add Nov 1st–6th to Google Calendar</span>
                </a>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium text-xs transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Order summary header */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">6-Day KiCad & ChatGPT Astra Pass</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Live Sessions + Full HD Recordings + Certificate</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through mr-1.5">₹2,499</span>
                  {appliedPromo ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="text-xs text-slate-400 line-through">₹{originalPrice}</span>
                      <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">₹{currentPrice}</span>
                    </span>
                  ) : (
                    <span className="text-base font-bold text-brand-primaryText">₹{originalPrice}</span>
                  )}
                </div>
              </div>

              {/* Promo Code Box */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-brand-primaryText" />
                    Promo / Coupon Code
                  </span>
                  {appliedPromo ? (
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      ₹{discountAmount} SAVED
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400">
                      Try code: <code className="text-brand-primaryText font-bold bg-blue-50 dark:bg-blue-950/50 px-1 py-0.5 rounded">ARON1</code> or <code className="text-brand-primaryText font-bold bg-blue-50 dark:bg-blue-950/50 px-1 py-0.5 rounded">TEST1</code>
                    </span>
                  )}
                </div>

                {!appliedPromo ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        if (promoMessage) setPromoMessage(null);
                      }}
                      placeholder="Enter promo code (e.g. ARON1)"
                      className="flex-1 px-3 py-1.5 font-mono uppercase tracking-wider rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:border-brand-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-xs"
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-semibold">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Code <strong>{appliedPromo}</strong> active &bull; Total is ₹1</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="text-[11px] text-red-600 dark:text-red-400 hover:underline font-medium ml-2"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {promoMessage && !appliedPromo && (
                  <p className={`text-[11px] ${promoMessage.type === 'error' ? 'text-red-500' : 'text-emerald-600'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Rahul Sharma"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:border-brand-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="rahul@example.com"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:border-brand-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:border-brand-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    College / Organization
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder="e.g. NIT / Tech Corp"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:border-brand-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Experience Level
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:border-brand-primary focus:outline-none transition-colors"
                >
                  <option value="Student">ECE / EEE / Engineering Student</option>
                  <option value="Fresher">Recent Graduate / Fresher</option>
                  <option value="Professional">Working Hardware / Embedded Engineer</option>
                  <option value="Hobbyist">Arduino / ESP32 Electronics Maker</option>
                </select>
              </div>

              {/* Razorpay Gateway Badge */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-primaryText" />
                    Secure Checkout via Razorpay
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    256-bit Encrypted
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Supports UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, and NetBanking.
                </p>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-xs"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Connecting to Razorpay...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <span>Proceed to Pay ₹{currentPrice}</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
