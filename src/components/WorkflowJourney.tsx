import React from 'react';
import { ArrowRight, Compass, Cpu, Layers, FileCheck } from 'lucide-react';

interface WorkflowJourneyProps {
  onOpenCheckout: () => void;
}

export const WorkflowJourney: React.FC<WorkflowJourneyProps> = ({ onOpenCheckout }) => {
  const stages = [
    {
      number: '01',
      title: 'Circuit Architecture & Calculations',
      subtitle: 'From Concept to Electrical Foundation',
      icon: Compass,
      description: 'Define power rails, select production-grade ICs from datasheets, and calculate essential decoupling, pull-up, and current-limiting values.',
      cadAction: 'Formulate power tree, select passive packages (0805/0603), and establish voltage budgets.',
      aiAction: 'ChatGPT Astra computes power dissipation, voltage divider ratios, and recommends stock-ready IC equivalents.'
    },
    {
      number: '02',
      title: 'Schematic Capture & ERC Verification',
      subtitle: 'KiCad Eeschema Environment',
      icon: Cpu,
      description: 'Draw clean hierarchical multi-sheet schematics with power flags, netlabels, and execute deep Electrical Rules Checks to catch floating pins before layout.',
      cadAction: 'Draw modular schematic sheets, assign netlabels, power flags, and run automated KiCad ERC.',
      aiAction: 'ChatGPT Astra audits netlists for unpulled reset lines, reverse diode polarities, and missing bypass capacitors.'
    },
    {
      number: '03',
      title: 'Footprints, Floorplanning & 0-DRC Routing',
      subtitle: 'KiCad Pcbnew Editor',
      icon: Layers,
      description: 'Assign verified IPC-standard footprints, design board outline, strategically place parts, route 45° copper traces, and run 0-error DRC.',
      cadAction: 'Define edge rails, place high-speed traces, route power polygons, and pour continuous ground return planes.',
      aiAction: 'Calculates IPC-2152 trace widths for current limits and decodes cryptic DRC clearance warnings in plain English.'
    },
    {
      number: '04',
      title: 'CAM Outputs, Sourcing & Fab Handoff',
      subtitle: 'Factory-Ready Production Files',
      icon: FileCheck,
      description: 'Generate standardized Bill of Materials (BOM), plot RS-274X Gerber & Excellon drill files, and prepare vendor quotes for bare PCB or PCBA assembly.',
      cadAction: 'Plot copper, soldermask, paste, and drill files. Inspect CAM layers in GerbView before fab submission.',
      aiAction: 'Validates layer stackup against fab house capability rules and generates first-power smoke-test checklist.'
    }
  ];

  return (
    <section id="phases" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#07090e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase text-brand-primaryText font-semibold tracking-wider block mb-2">
            The 4-Stage Production Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            The complete hardware engineering journey in 4 clear stages.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            We cut through the noise of 100 disconnected tutorials. Follow the cohesive product development roadmap used by top electronics engineering teams.
          </p>
        </div>

        {/* Stepper Timeline Pipeline with Smooth Hover Transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.number}
                className="group p-7 rounded-2xl bg-slate-50/70 dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800 hover:border-brand-primaryBorder dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-primarySubtle text-brand-primaryText flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-105">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-slate-500 block">
                          Phase {stage.number}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-primaryText transition-colors">
                          {stage.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                      {stage.subtitle}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {stage.description}
                  </p>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors group-hover:border-slate-300 dark:group-hover:border-slate-700">
                      <span className="text-[10px] text-slate-500 uppercase block mb-1">
                        In KiCad 8.0:
                      </span>
                      <p className="text-slate-800 dark:text-slate-200 text-xs font-sans">
                        {stage.cadAction}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 transition-colors">
                      <span className="text-[10px] text-brand-accent font-bold uppercase block mb-1">
                        With ChatGPT Astra:
                      </span>
                      <p className="text-slate-800 dark:text-slate-200 text-xs font-sans">
                        {stage.aiAction}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Enrollment Reminder Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 card-sheen">
          <div>
            <h3 className="text-lg font-bold mb-1">
              Build this complete board during the live masterclass
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              November 1st to November 6th • 5:00 PM IST daily • Recordings & project files included.
            </p>
          </div>
          <button
            onClick={onOpenCheckout}
            className="px-6 py-3 rounded-lg bg-brand-primary hover:bg-brand-primaryHover text-white font-semibold text-xs whitespace-nowrap transition-all duration-200 active:scale-[0.98] flex items-center gap-1.5 shadow-xs shrink-0"
          >
            <span>Register for ₹399</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
