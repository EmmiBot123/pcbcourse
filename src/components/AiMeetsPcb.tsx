import React, { useState } from 'react';
import { ArrowRight, Terminal, Cpu } from 'lucide-react';

interface AiMeetsPcbProps {
  onOpenCheckout: () => void;
}

export const AiMeetsPcb: React.FC<AiMeetsPcbProps> = ({ onOpenCheckout }) => {
  const [activeScenario, setActiveScenario] = useState<number>(0);

  const examples = [
    {
      action: 'Datasheet Pinout Queries',
      scenario: 'Decoupling requirements for 32-bit MCU',
      aiHelp: '"ChatGPT Astra: What are the recommended decoupling capacitor values and pin positions for the ESP32-S3 VDD pins?"',
      result: 'Extracts exact capacitor values (100nF + 10µF) and layout proximity rules within 3mm of pin 2 in seconds.'
    },
    {
      action: 'IPC-2152 Trace Width Math',
      scenario: 'Sizing 5V / 1.8A power delivery track',
      aiHelp: '"Calculate minimum trace width for 1.8A continuous current on 1oz copper with 10°C temperature rise."',
      result: 'Computes exact track width (0.52mm / 20.5 mil), verifies against JLCPCB 6mil minimums, and generates NetClass rule.'
    },
    {
      action: 'DRC Clearance Debugging',
      scenario: 'Fixing pad courtyard clearance conflicts',
      aiHelp: '"Explain KiCad DRC violation: pad courtyard overlap between U1 (QFN-32) and C1 (0805)."',
      result: 'Translates clearance error into plain English: suggests offsetting C1 0.35mm along +X axis without breaking ground return.'
    },
    {
      action: 'Bill of Materials (BOM) Sourcing',
      scenario: 'Formatting BOM for JLCPCB / PCBWay SMT Assembly',
      aiHelp: '"Format BOM columns with Manufacturer Part Numbers (MPN) and identify active LCSC basic part equivalents."',
      result: 'Generates standardized CSV BOM ready for 1-click vendor pricing and automated pick-and-place assembly.'
    }
  ];

  return (
    <section id="ai-tools" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#090b10]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono uppercase text-brand-primaryText font-semibold tracking-wider block mb-2">
            Toolchain & Practical Methodology
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            How ChatGPT Astra co-pilots your KiCad 8 workflow
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            AI does not replace the hardware engineer. Rather, engineers who understand circuit fundamentals use AI to accelerate routine research, calculations, and diagnostic checks.
          </p>
        </div>

        {/* 2-Column Side-by-Side: KiCad EDA vs ChatGPT Astra */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          
          {/* KiCad EDA */}
          <div className="p-7 rounded-2xl bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">
                  Primary EDA Suite
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  KiCad 8.0 (Open-Source EDA)
                </h3>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              The industry-standard CAD platform where your circuit is captured, verified, routed, and plotted for manufacturing:
            </p>

            <ul className="space-y-2.5 text-xs font-mono text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span>Hierarchical schematic capture in Eeschema</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span>Component footprint assignment & IPC libraries</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span>2-layer routing with interactive push-and-shove</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span>Design Rule Check (DRC) and 3D raytracing viewer</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span>RS-274X Gerber & Excellon drill plotting</span>
              </li>
            </ul>
          </div>

          {/* ChatGPT Astra */}
          <div className="p-7 rounded-2xl bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-primarySubtle text-brand-primaryText flex items-center justify-center font-bold">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">
                  AI Hardware Co-pilot
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  ChatGPT Astra AI
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Your workflow assistant for calculations, datasheet extraction, and troubleshooting:
            </p>

            <ul className="space-y-2.5 text-xs font-mono text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-brand-accent">•</span>
                <span>Instant extraction of pinout tables from 80-page datasheets</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-brand-accent">•</span>
                <span>IPC-2152 trace width math & power dissipation formulas</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-brand-accent">•</span>
                <span>Translating cryptic DRC clearance warnings into physical fixes</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-brand-accent">•</span>
                <span>Formatting BOMs with manufacturer part numbers (MPNs)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-brand-accent">•</span>
                <span>Bench bring-up checklists and first-power smoke tests</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Interactive Scenario Explorer */}
        <div className="rounded-2xl bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider block mb-1">
                Real Prompt Examples in Action
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                How ChatGPT Astra speeds up everyday hardware tasks
              </h3>
            </div>
            <span className="text-xs font-mono text-brand-primaryText bg-brand-primarySubtle px-3 py-1 rounded-md border border-brand-primaryBorder">
              Interactive Demonstrations
            </span>
          </div>

          <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Scenario Selector */}
            <div className="lg:col-span-5 space-y-2 font-mono text-xs">
              {examples.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveScenario(idx)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all border ${
                    activeScenario === idx
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 font-bold shadow-xs'
                      : 'bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="text-[10px] text-slate-500 block mb-0.5">Example 0{idx + 1}</span>
                  <p className="text-xs">{item.action}</p>
                </button>
              ))}
            </div>

            {/* Right: Prompt & Result Card */}
            <div className="lg:col-span-7 p-6 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block mb-1">Scenario</span>
              <p className="text-white font-semibold mb-4 text-xs">
                {examples[activeScenario].scenario}
              </p>

              <span className="text-[10px] text-brand-accent uppercase block mb-1">Astra AI Prompt</span>
              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-200 text-xs mb-4">
                {examples[activeScenario].aiHelp}
              </div>

              <span className="text-[10px] text-sky-400 uppercase block mb-1">Engineering Output</span>
              <p className="text-slate-300 text-xs leading-relaxed font-mono">
                {examples[activeScenario].result}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
