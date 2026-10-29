import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PainPointsProps {
  onOpenCheckout: () => void;
}

export const PainPoints: React.FC<PainPointsProps> = ({ onOpenCheckout }) => {
  const points = [
    {
      num: '01',
      title: 'Breadboard circuits fail in physical environments',
      body: 'Breadboards are great for a 15-minute bench test, but contact resistance, loose jumper wires, and parasitic capacitance make them impossible to deploy inside smart devices, robotics, or customer enclosures.'
    },
    {
      num: '02',
      title: 'Component footprints and packaging are rarely taught',
      body: 'Textbooks teach theoretical resistor and logic gate symbols, but commercial hardware requires selecting physical IPC-standard footprints (0805, SOIC, QFN) based on thermal dissipation, pad pitch, and active supply chain stock.'
    },
    {
      num: '03',
      title: 'Trace routing and ground planes feel like guesswork',
      body: 'Without practical layout heuristics, beginners struggle with decoupling capacitor placement, how to size trace widths for power delivery (IPC-2152), and how to pour continuous, low-impedance ground return planes.'
    },
    {
      num: '04',
      title: 'The handoff to physical manufacturing is a mystery',
      body: 'Knowing CAD commands is not enough. You must understand what a PCB fabricator actually receives: RS-274X copper layers, soldermask clearances, Excellon drill charts, and formatted Bill of Materials (BOM) with active MPNs.'
    }
  ];

  return (
    <section id="specifications" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#090b10]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Editorial Split Header & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Left Column: Thesis */}
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase text-brand-primaryText font-semibold tracking-wider block mb-2">
              The Hardware Engineering Reality
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Why do so many engineers know electronics, but still struggle to design a PCB?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Most online tutorials treat PCB software as disconnected buttons on a screen. But engineering a physical circuit board is a disciplined sequence of electrical architecture, mechanical layout, and manufacturing tolerances.
            </p>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
              <span className="text-brand-accent font-bold block mb-1">
                The AronLabz Solution:
              </span>
              Take one complete IoT carrier project from day 1 concept to day 6 factory Gerber files with AI accelerating the calculations.
            </div>
          </div>

          {/* Right Column: 4 Clean Editorial Insights (No repetitive card boxes) */}
          <div className="lg:col-span-7 space-y-6">
            {points.map((p) => (
              <div 
                key={p.num}
                className="pb-6 border-b border-slate-200 dark:border-slate-800 last:border-b-0 last:pb-0"
              >
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span className="font-mono text-xs font-bold text-brand-accent">
                    /{p.num}
                  </span>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    {p.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                  {p.body}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Board Specifications Data Sheet Banner */}
        <div className="rounded-2xl bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider block mb-1">
                Course Project Specifications
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                ESP32 IoT Carrier Node with Integrated Power & Sensor Bus
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Dimensions: 65mm × 45mm
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-md bg-brand-primarySubtle text-brand-primaryText border border-brand-primaryBorder font-semibold">
                KiCad 8.0 Native
              </span>
            </div>
          </div>

          {/* 3-Column Technical Summary Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs">
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase block mb-2 font-medium">
                1. Circuit Sub-systems
              </span>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 font-mono">
                <li>• USB-C 5V Input with ESD protection</li>
                <li>• 3.3V Low-Dropout linear regulator</li>
                <li>• ESP32-S3 Wi-Fi / BLE 5.0 Core</li>
                <li>• I2C / SPI sensor break-out headers</li>
              </ul>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase block mb-2 font-medium">
                2. Physical Stackup Rules
              </span>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 font-mono">
                <li>• 2-Layer FR4 (1.6mm thickness)</li>
                <li>• 1oz Finished copper weight</li>
                <li>• Continuous bottom ground plane</li>
                <li>• 0.2mm track / 0.2mm clearance min</li>
              </ul>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase block mb-2 font-medium">
                3. Manufacturing Deliverables
              </span>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 font-mono">
                <li>• RS-274X Gerber layer archive</li>
                <li>• Excellon NC drill files</li>
                <li>• Formatted CSV Bill of Materials (BOM)</li>
                <li>• Ready for JLCPCB, PCBWay & Indian fabs</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
