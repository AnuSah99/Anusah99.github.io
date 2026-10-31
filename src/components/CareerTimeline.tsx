import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { CAREER_LOGS } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

export const CareerTimeline: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'NODE-01': true,
    'NODE-02': true,
    'NODE-03': false
  });

  const toggleNode = (nodeId: string) => {
    soundFX.playKeyClick();
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  return (
    <section id="experience" className="relative py-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-violet-500/30 text-xs font-mono text-violet-400">
          <Terminal className="w-3.5 h-3.5" />
          <span>CAREER DEPLOYMENT LOG // IMMUTABLE LEDGER</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
          Operational Experience & History
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-normal">
            VERIFIED CREDENTIALS
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl font-sans">
          Structured system logs detailing enterprise security leadership, systems administration, and
          endpoint automation across tier-1 infrastructure environments.
        </p>
      </div>

      {/* Timeline Node Chain */}
      <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
        {CAREER_LOGS.map((log, index) => {
          const isExpanded = !!expandedNodes[log.id];
          const isCurrent = log.status === 'ACTIVE_NODE';

          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Timeline Indicator Node */}
              <div
                className={`absolute -left-[35px] sm:-left-[51px] top-4 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'bg-slate-950 border-emerald-400 shadow-[0_0_15px_#10b981]'
                    : 'bg-slate-950 border-slate-600'
                }`}
              >
                {isCurrent ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-slate-500" />
                )}
              </div>

              {/* Node Card */}
              <div
                className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isCurrent
                    ? 'border-emerald-500/30 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.15)]'
                    : 'border-white/10 hover:border-cyan-500/30'
                }`}
              >
                {/* Node Header Row */}
                <div
                  onClick={() => toggleNode(log.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-slate-800/20 transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 border border-white/10 text-slate-300">
                        {log.id}
                      </span>
                      <span
                        className={`font-mono text-xs px-2 py-0.5 rounded border ${
                          isCurrent
                            ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                            : 'bg-slate-900 border-white/10 text-slate-400'
                        }`}
                      >
                        {log.classification}
                      </span>
                      <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {log.period}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                      {log.role}
                      <span className="text-cyan-400 font-medium">@ {log.company}</span>
                    </h3>

                    <div className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{log.location}</span>
                    </div>
                  </div>

                  {/* Right Node Stats / Toggle */}
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:grid grid-cols-3 gap-3 text-right">
                      {log.stats.map((s, i) => (
                        <div key={i} className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-white/5">
                          <div className="text-[10px] font-mono text-slate-500">{s.label}</div>
                          <div className="text-xs font-mono font-bold text-cyan-300">{s.value}</div>
                        </div>
                      ))}
                    </div>

                    <button
                      className="p-2 rounded-lg bg-slate-800/80 border border-white/10 text-slate-300 hover:text-white transition-colors"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/10 bg-slate-950/40 px-5 sm:px-6 py-5 space-y-4"
                    >
                      {/* Operational Highlights */}
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2.5 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>SYSTEM EXECUTION AUDIT:</span>
                        </div>
                        <ul className="space-y-2">
                          {log.highlights.map((hl, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-slate-300 text-xs sm:text-sm leading-relaxed">
                              <span className="text-cyan-400 font-mono mt-0.5">&gt;</span>
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack Chips */}
                      <div className="pt-2 border-t border-white/5">
                        <div className="text-[11px] font-mono text-slate-400 mb-2">DEPLOYED TECHNOLOGIES:</div>
                        <div className="flex flex-wrap gap-2">
                          {log.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-cyan-500/20 text-cyan-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
