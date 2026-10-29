import React, { useState } from 'react';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { CURRICULUM_DAYS } from '../data/courseData';

interface CurriculumProps {
  onOpenCheckout: () => void;
}

export const Curriculum: React.FC<CurriculumProps> = ({ onOpenCheckout }) => {
  const [activeDay, setActiveDay] = useState<number>(1);
  const current = CURRICULUM_DAYS.find(d => d.day === activeDay) || CURRICULUM_DAYS[0];

  return (
    <section id="syllabus" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#07090e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono uppercase text-brand-primaryText font-semibold tracking-wider block mb-2">
            Interactive 6-Day Syllabus
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Day-by-day technical curriculum & live CAD deliverables.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Live interactive sessions from November 1st to November 6th at 5:00 PM IST daily. Full recordings and project files provided with permanent lifetime access.
          </p>
        </div>

        {/* Day Selector Tabs (Responsive Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {CURRICULUM_DAYS.map((day) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              className={`p-3.5 rounded-xl text-left transition-all duration-200 active:scale-[0.98] border ${
                activeDay === day.day
                  ? 'bg-slate-900 text-white dark:bg-slate-800 border-slate-900 dark:border-slate-700 shadow-sm translate-y-[-2px]'
                  : 'bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-mono text-xs font-bold ${activeDay === day.day ? 'text-brand-accent' : 'text-slate-500'}`}>
                  DAY 0{day.day}
                </span>
                <span className="text-[10px] font-mono text-slate-400">5 PM</span>
              </div>
              <p className={`text-xs font-semibold truncate ${activeDay === day.day ? 'text-white' : 'text-slate-900 dark:text-slate-200'}`}>
                {day.date}
              </p>
              <span className="text-[10px] font-mono text-slate-400 block mt-1 truncate">
                {day.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Day Dossier Container with Smooth Fade-In Animation */}
        <div 
          key={current.day}
          className="rounded-2xl bg-slate-50/70 dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 mb-12 animate-in fade-in-50 duration-200"
        >
          {/* Day Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-brand-primarySubtle text-brand-primaryText font-mono text-xs font-bold border border-brand-primaryBorder">
                  DAY {current.day} • {current.badge}
                </span>
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {current.date} • {current.time}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
                {current.shortDesc}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left lg:text-right shrink-0">
              <span className="text-[10px] font-mono text-slate-500 block uppercase">CAD Environment</span>
              <span className="text-xs font-mono font-bold text-brand-primaryText">{current.kicadModule}</span>
            </div>
          </div>

          {/* Core Technical Concepts Covered */}
          <div className="py-6">
            <span className="text-[11px] font-mono uppercase text-slate-500 tracking-wider block mb-4 font-semibold">
              Core Technical Concepts Covered
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {current.topics.map((topic, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors hover:border-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables & AI Prompts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                Hands-On Project Deliverable
              </span>
              <p className="text-xs font-semibold text-slate-900 dark:text-white mb-1">
                {current.handsOnDeliverable}
              </p>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                KiCad 8 source files and step-by-step instruction sheet provided.
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
              <span className="text-[10px] font-mono text-brand-accent uppercase block mb-1 font-bold">
                ChatGPT Astra Co-pilot Exercise
              </span>
              <p className="text-xs font-mono text-slate-800 dark:text-slate-200">
                {current.aiPromptExample}
              </p>
            </div>
          </div>

        </div>

        {/* Syllabus Footer Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
          <span className="text-slate-600 dark:text-slate-400 font-mono">
            Miss a live session? All session recordings are uploaded in HD within 2 hours with permanent access.
          </span>
          <button
            onClick={onOpenCheckout}
            className="px-5 py-2.5 rounded-lg bg-brand-primary hover:bg-brand-primaryHover text-white font-medium whitespace-nowrap transition-all duration-200 active:scale-[0.98] flex items-center gap-1.5 shrink-0 shadow-xs"
          >
            <span>Register for ₹399</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
