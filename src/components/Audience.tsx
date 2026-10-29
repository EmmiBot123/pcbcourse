import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AUDIENCE_LIST } from '../data/courseData';

interface AudienceProps {
  onOpenCheckout: () => void;
}

export const Audience: React.FC<AudienceProps> = ({ onOpenCheckout }) => {
  return (
    <section className="py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#090b10]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono uppercase text-brand-primaryText font-semibold tracking-wider block mb-2">
            Target Audience
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Who is this PCB engineering masterclass for?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Whether you want to build custom hardware for your firmware projects, prototype an IoT startup idea, or upskill with modern EDA workflows.
          </p>
        </div>

        {/* 6 Clean Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {AUDIENCE_LIST.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold text-brand-accent">
                  0{idx + 1}
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.role}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Prerequisite Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider block mb-1">
              Prerequisites & Entry Requirements
            </span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
              Zero prior PCB layout experience required
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Basic familiarity with common electronics components (resistors, microcontrollers, breadboards) is helpful. Day 1 starts from component selection and circuit calculation before opening the CAD tools.
            </p>
          </div>

          <button
            onClick={onOpenCheckout}
            className="px-6 py-3 rounded-lg bg-brand-primary hover:bg-brand-primaryHover text-white font-medium text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
          >
            <span>Register for ₹399</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
