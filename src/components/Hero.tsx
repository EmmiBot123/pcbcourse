import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Terminal, 
  CheckCircle2,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { COURSE_INFO } from '../data/courseData';

interface HeroProps {
  onOpenCheckout: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCheckout }) => {
  // Live countdown to Nov 1st, 2026, 5:00 PM IST
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 18,
    minutes: 24,
    seconds: 50,
  });

  // Interactive specimen tabs: 'schematic' | 'stackup' | 'ai-copilot'
  const [activeTab, setActiveTab] = useState<'schematic' | 'stackup' | 'ai-copilot'>('schematic');
  const [selectedPrompt, setSelectedPrompt] = useState<number>(0);
  const [activeTestPoint, setActiveTestPoint] = useState<string>('TP2');
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [typedOutput, setTypedOutput] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const samplePrompts = [
    {
      title: 'Calculate Trace Width (IPC-2152)',
      prompt: 'ChatGPT Astra: Calculate minimum trace width for 5V at 1.8A continuous current on 1oz outer copper with 10°C temperature rise.',
      output: '→ Track Width: 0.52mm (20.5 mil)\n→ Current Density: Safe (< 35 A/mm²)\n→ DC Resistance: ~0.028 Ω/100mm\n→ KiCad Rule: NetClass "PWR_5V" track_width = 0.55mm\n✓ 0 DRC Clearance Violations with JLCPCB 6mil constraint'
    },
    {
      title: 'Audit ESP32 Strapping Pins',
      prompt: 'ChatGPT Astra: Verify boot strapping requirements for ESP32-S3 GPIO0 and GPIO46 in my schematic before routing.',
      output: '→ GPIO0: Pull-up 10kΩ to 3V3 (Boot Mode = SPI Flash)\n→ GPIO46: Pull-down 10kΩ to GND (Disables ROM messages)\n→ Decoupling: Ensure 100nF MLCC within 3mm of pin 2 (VDD_3V3)\n✓ Verified against Espressif Hardware Design Guidelines v1.4'
    },
    {
      title: 'Debug DRC Clearance Violation',
      prompt: 'ChatGPT Astra: KiCad DRC reports "Clearance violation: pad courtyard overlap between U1 (QFN-32) and C1 (0805)". How to fix?',
      output: '→ Root Cause: C1 0805 footprint courtyard overlaps with U1 thermal pad collar.\n→ Action: Offset C1 by 0.35mm along the +X axis.\n→ Maintains low-ESR decoupling path while complying with 0.15mm soldermask dam.'
    }
  ];

  // Typing effect when prompt changes
  useEffect(() => {
    setTypedOutput('');
    const fullText = samplePrompts[selectedPrompt].output;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedOutput(fullText.slice(0, i));
        i += 3;
      } else {
        setTypedOutput(fullText);
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [selectedPrompt, activeTab]);

  const testPoints: Record<string, { label: string; voltage: string; net: string; status: string }> = {
    TP1: { label: 'TP1 (VBUS)', voltage: '5.04 V DC', net: '+5V_USB', status: 'Stable • Overvoltage clamped' },
    TP2: { label: 'TP2 (VDD_3V3)', voltage: '3.302 V DC', net: '+3V3_SYS', status: 'LDO Regulated • Ripple < 12mV' },
    TP3: { label: 'TP3 (USB_D+)', voltage: '3.28 V pk-pk', net: 'USB_DP', status: 'High-Speed Signal • 90Ω diff' },
    TP4: { label: 'TP4 (GND)', voltage: '0.000 V Ref', net: 'GND_PLANE', status: 'Continuous Ground Return' },
  };

  return (
    <section id="overview" className="pt-28 pb-16 md:pt-36 md:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#07090e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top Organization Header */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
            {COURSE_INFO.company}
          </span>
          <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">•</span>
          <span className="text-xs font-mono text-brand-primaryText px-2.5 py-1 rounded-md bg-brand-primarySubtle border border-brand-primaryBorder font-semibold">
            6 Live Sessions • Nov 1st to Nov 6th
          </span>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-slate-900 dark:text-white tracking-tight leading-[1.14] mb-6">
              Design and manufacture production PCBs with KiCad and ChatGPT Astra.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl">
              Stop memorizing disconnected software toolbar buttons. Follow one complete hardware product journey: from circuit calculations and hierarchical schematics to 0-DRC routing, Bill of Materials, and factory-ready Gerber files.
            </p>

            {/* Quick Metadata Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-8 text-xs font-mono">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase">Dates</span>
                <span className="text-slate-900 dark:text-white font-semibold">Nov 1 – Nov 6</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase">Timing</span>
                <span className="text-slate-900 dark:text-white font-semibold">5:00 PM IST Daily</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase">Format</span>
                <span className="text-slate-900 dark:text-white font-semibold">6 Live + Recordings</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase">Tuition</span>
                <span className="text-brand-primaryText font-bold">₹{COURSE_INFO.price} Flat</span>
              </div>
            </div>

            {/* CTA Group & Countdown */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
              <button
                onClick={onOpenCheckout}
                className="px-6 py-3.5 rounded-lg bg-brand-primary hover:bg-brand-primaryHover text-white font-medium text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Enroll for ₹{COURSE_INFO.price}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#syllabus"
                className="px-5 py-3.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-sm transition-colors text-center border border-slate-200 dark:border-slate-700"
              >
                View 6-Day Syllabus
              </a>
            </div>

            {/* Live Countdown & Razorpay trust indicators */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase">Starts in:</span>
                <span className="text-slate-900 dark:text-white font-bold">{String(timeLeft.days).padStart(2, '0')}d</span>
                <span>:</span>
                <span className="text-slate-900 dark:text-white font-bold">{String(timeLeft.hours).padStart(2, '0')}h</span>
                <span>:</span>
                <span className="text-slate-900 dark:text-white font-bold">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                <span>:</span>
                <span className="text-brand-accent font-bold transition-all">{String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Secured via Razorpay (UPI, Cards, NetBanking)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Hardware Specimen Workbench */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden card-sheen">
              
              {/* Specimen Header & Mode Switcher */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
                  <span className="ml-2 text-[11px] font-mono text-slate-600 dark:text-slate-400 font-medium">
                    AronLabz Board Specimen
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-lg text-[10px] font-mono">
                  <button
                    onClick={() => setActiveTab('schematic')}
                    className={`px-2 py-1 rounded-md transition-all duration-200 ${
                      activeTab === 'schematic'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Schematic
                  </button>
                  <button
                    onClick={() => setActiveTab('stackup')}
                    className={`px-2 py-1 rounded-md transition-all duration-200 ${
                      activeTab === 'stackup'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    3D Stackup
                  </button>
                  <button
                    onClick={() => setActiveTab('ai-copilot')}
                    className={`px-2 py-1 rounded-md transition-all duration-200 ${
                      activeTab === 'ai-copilot'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    AI Co-pilot
                  </button>
                </div>
              </div>

              {/* Tab 1: Interactive Animated Schematic Preview */}
              {activeTab === 'schematic' && (
                <div className="p-5 animate-in fade-in-50 duration-200">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-mono text-slate-600 dark:text-slate-400 text-[11px] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Interactive Signal Trace Probe
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 font-semibold">
                      0 ERC Errors
                    </span>
                  </div>

                  {/* Animated Circuit Visualizer SVG */}
                  <div className="relative rounded-xl bg-slate-950 p-4 border border-slate-800 text-white overflow-hidden mb-3">
                    
                    {/* SVG Signal Flow Traces */}
                    <svg viewBox="0 0 340 140" className="w-full h-32 select-none">
                      <defs>
                        <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                          <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>

                      {/* Ground reference pour lines */}
                      <path d="M 10 120 L 330 120" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />

                      {/* 5V VBUS Input Trace */}
                      <path 
                        d="M 20 40 L 70 40 L 95 65 L 130 65" 
                        stroke="#3b82f6" 
                        strokeWidth="2.5" 
                        fill="none" 
                        className="pcb-trace-flow-fast" 
                      />

                      {/* 3.3V Regulated Output Trace */}
                      <path 
                        d="M 170 65 L 205 65 L 225 45 L 280 45" 
                        stroke="#f59e0b" 
                        strokeWidth="2.5" 
                        fill="none" 
                        className="pcb-trace-flow" 
                      />

                      {/* Decoupling capacitor shunt trace */}
                      <path d="M 205 65 L 205 120" stroke="#64748b" strokeWidth="1.5" strokeDasharray="2 2" />

                      {/* High-speed USB D+ Trace */}
                      <path 
                        d="M 20 85 L 60 85 L 85 105 L 140 105" 
                        stroke="#06b6d4" 
                        strokeWidth="1.5" 
                        fill="none" 
                        className="pcb-trace-flow" 
                      />

                      {/* Components Blocks */}
                      {/* USB-C */}
                      <rect x="15" y="25" width="30" height="75" rx="3" fill="#1e293b" stroke="#334155" />
                      <text x="30" y="65" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">USB-C</text>

                      {/* LDO IC (AMS1117) */}
                      <rect x="130" y="45" width="40" height="40" rx="3" fill="#0f172a" stroke="#2563eb" strokeWidth="1.5" />
                      <text x="150" y="68" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold" fontFamily="monospace">LDO 3.3V</text>

                      {/* Decoupling Cap */}
                      <rect x="198" y="80" width="14" height="20" rx="2" fill="#1e293b" stroke="#f59e0b" />
                      <text x="205" y="93" textAnchor="middle" fill="#fcd34d" fontSize="7" fontFamily="monospace">10µF</text>

                      {/* MCU Core */}
                      <rect x="280" y="25" width="45" height="50" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="302" y="52" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold" fontFamily="monospace">ESP32-S3</text>

                      {/* Interactive Test Point Pads */}
                      {/* TP1 */}
                      <circle cx="70" cy="40" r="4" fill="#3b82f6" className="cursor-pointer hover:r-6 transition-all" onClick={() => setActiveTestPoint('TP1')} />
                      <text x="70" y="30" textAnchor="middle" fill="#60a5fa" fontSize="8" fontFamily="monospace">TP1</text>

                      {/* TP2 */}
                      <circle cx="240" cy="45" r="4" fill="#f59e0b" className="cursor-pointer hover:r-6 transition-all" onClick={() => setActiveTestPoint('TP2')} />
                      <text x="240" y="35" textAnchor="middle" fill="#fcd34d" fontSize="8" fontFamily="monospace">TP2</text>

                      {/* TP3 */}
                      <circle cx="100" cy="105" r="4" fill="#06b6d4" className="cursor-pointer hover:r-6 transition-all" onClick={() => setActiveTestPoint('TP3')} />
                      <text x="100" y="98" textAnchor="middle" fill="#67e8f9" fontSize="8" fontFamily="monospace">TP3</text>

                      {/* TP4 */}
                      <circle cx="160" cy="120" r="4" fill="#94a3b8" className="cursor-pointer hover:r-6 transition-all" onClick={() => setActiveTestPoint('TP4')} />
                      <text x="160" y="132" textAnchor="middle" fill="#cbd5e1" fontSize="8" fontFamily="monospace">TP4</text>
                    </svg>

                    {/* Active Probe Multimeter Readout */}
                    <div className="mt-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-brand-primaryText animate-pulse" />
                        <div>
                          <span className="text-white font-bold">{testPoints[activeTestPoint].label}:</span>
                          <span className="ml-1.5 text-brand-accent font-semibold">{testPoints[activeTestPoint].voltage}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">{testPoints[activeTestPoint].status}</span>
                    </div>
                  </div>

                  {/* Test Point Selector Chips */}
                  <div className="grid grid-cols-4 gap-1.5 font-mono text-[11px]">
                    {Object.keys(testPoints).map(tp => (
                      <button
                        key={tp}
                        onClick={() => setActiveTestPoint(tp)}
                        className={`p-1.5 rounded-lg text-center transition-all ${
                          activeTestPoint === tp
                            ? 'bg-brand-primarySubtle text-brand-primaryText border border-brand-primaryBorder font-bold shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {tp}
                      </button>
                    ))}
                  </div>

                  <p className="mt-2.5 text-[10px] text-slate-500 dark:text-slate-400 text-center font-mono">
                    Click any test point above to simulate live multimeter circuit probing.
                  </p>
                </div>
              )}

              {/* Tab 2: 3D Exploded Layer Stackup */}
              {activeTab === 'stackup' && (
                <div className="p-5 animate-in fade-in-50 duration-200">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-mono text-slate-600 dark:text-slate-400 text-[11px]">
                      2-Layer Standard FR4 (1.6mm)
                    </span>
                    <button
                      onClick={() => setIsExploded(!isExploded)}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-primarySubtle text-brand-primaryText border border-brand-primaryBorder font-semibold hover:bg-brand-primary hover:text-white transition-colors"
                    >
                      {isExploded ? 'Collapse Stackup' : 'Explode 3D Layers'}
                    </button>
                  </div>

                  {/* 3D Isometric Exploded Layers */}
                  <div className="py-2 space-y-2 font-mono text-xs transition-all duration-300">
                    
                    {/* Layer 1: Silkscreen */}
                    <div 
                      className={`p-2.5 rounded-lg bg-slate-900 text-white border border-slate-700 shadow-md transition-all duration-300 ${
                        isExploded ? 'translate-y-[-6px] shadow-lg' : ''
                      }`}
                    >
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-bold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-white"></span>
                          F.SilkS (White Silkscreen Legend)
                        </span>
                        <span className="text-[10px] text-slate-400">0.15mm text width</span>
                      </div>
                    </div>

                    {/* Layer 2: Top Copper */}
                    <div 
                      className={`p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 shadow-md transition-all duration-300 ${
                        isExploded ? 'translate-y-[-3px] shadow-lg' : ''
                      }`}
                    >
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-bold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          F.Cu (Top Copper Layer)
                        </span>
                        <span className="text-[10px] font-bold">1.0 oz (35µm)</span>
                      </div>
                      <span className="text-[10px] opacity-80 block mt-0.5">Microcontroller routing & 5V/3V3 traces</span>
                    </div>

                    {/* Layer 3: FR-4 Core Dielectric */}
                    <div 
                      className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 text-center text-slate-700 dark:text-slate-300 text-[11px] transition-all duration-300"
                    >
                      <span className="font-semibold block">FR-4 Glass Epoxy Dielectric Core</span>
                      <span className="text-[10px] text-slate-500">1.5mm thickness • Dielectric constant εr = 4.5</span>
                    </div>

                    {/* Layer 4: Bottom Ground Plane */}
                    <div 
                      className={`p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300 shadow-md transition-all duration-300 ${
                        isExploded ? 'translate-y-[3px] shadow-lg' : ''
                      }`}
                    >
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-bold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          B.Cu (Bottom Copper GND Plane)
                        </span>
                        <span className="text-[10px] font-bold">1.0 oz (35µm)</span>
                      </div>
                      <span className="text-[10px] opacity-80 block mt-0.5">Continuous low-impedance ground return plane</span>
                    </div>

                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span>Lead-Free HASL Surface Finish</span>
                    <span>JLCPCB / PCBWay Standard</span>
                  </div>
                </div>
              )}

              {/* Tab 3: Interactive Streaming AI Co-pilot Console */}
              {activeTab === 'ai-copilot' && (
                <div className="p-5 animate-in fade-in-50 duration-200">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase block mb-2 font-medium">
                    Select a Hardware Prompt:
                  </span>

                  <div className="space-y-1.5 mb-3">
                    {samplePrompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedPrompt(idx)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-all duration-150 border ${
                          selectedPrompt === idx
                            ? 'bg-brand-primarySubtle text-brand-primaryText border-brand-primaryBorder font-bold shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {p.title}
                      </button>
                    ))}
                  </div>

                  {/* Terminal Output with Live Typing Animation */}
                  <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 min-h-[140px]">
                    <div className="text-brand-accent text-[11px] mb-2 font-semibold flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>{samplePrompts[selectedPrompt].prompt}</span>
                    </div>
                    <pre className="text-[11px] text-slate-300 whitespace-pre-line leading-relaxed font-mono">
                      {typedOutput}
                      <span className="terminal-cursor"></span>
                    </pre>
                  </div>
                </div>
              )}

              {/* Specimen Footer */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  JLCPCB & PCBWay Verified
                </span>
                <span>KiCad 8.0 Native</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
