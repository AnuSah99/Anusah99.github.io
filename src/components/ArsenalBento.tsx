import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cloud,
  Boxes,
  Cpu,
  GitBranch,
  ShieldAlert,
  GitPullRequest,
  ShieldCheck,
  ScanEye,
  Lock,
  Activity,
  Fingerprint,
  Server,
  Terminal,
  Code,
  FileCode,
  TerminalSquare,
  Workflow,
  Zap,
  Search,
  X
} from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillItem } from '../types';
import { soundFX } from '../utils/audio';

const iconMap: Record<string, React.ElementType> = {
  Cloud,
  Boxes,
  Cpu,
  GitBranch,
  ShieldAlert,
  GitPullRequest,
  ShieldCheck,
  ScanEye,
  Lock,
  Activity,
  Fingerprint,
  Server,
  Terminal,
  Code,
  FileCode,
  TerminalSquare,
  Workflow
};

export const ArsenalBento: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'cloud' | 'security' | 'identity' | 'automation'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const categories = [
    { id: 'all', label: 'ALL ARSENAL', count: SKILLS_DATA.length },
    { id: 'cloud', label: 'CLOUD & DEVSECOPS', count: SKILLS_DATA.filter((s) => s.category === 'cloud').length },
    { id: 'security', label: 'ENDPOINT & SEC-OPS', count: SKILLS_DATA.filter((s) => s.category === 'security').length },
    { id: 'identity', label: 'IDENTITY & INFRA', count: SKILLS_DATA.filter((s) => s.category === 'identity').length },
    { id: 'automation', label: 'AUTOMATION & SCRIPTING', count: SKILLS_DATA.filter((s) => s.category === 'automation').length },
  ];

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="arsenal" className="relative py-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-400">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>TECHNICAL ARSENAL // TELEMETRY GRID</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
          Hardened Stack & Operations
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-normal">
            PRODUCTION VERIFIED
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl">
          Engineered for high-availability IT environments, multi-cloud topologies, automated CVE mitigation,
          and identity-driven endpoint governance.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none font-mono text-xs">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundFX.playKeyClick();
                  setActiveCategory(cat.id as any);
                }}
                className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-cyan-500/20 border border-cyan-400/60 text-cyan-300 shadow-neon-cyan font-bold'
                    : 'bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${isActive ? 'bg-cyan-400/30 text-white' : 'bg-slate-800 text-slate-500'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Filter */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills, CVE tools, AWS..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900/90 border border-white/10 focus:border-cyan-400/60 text-xs font-mono text-white placeholder-slate-500 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filteredSkills.map((skill, index) => {
            const Icon = iconMap[skill.icon] || ShieldCheck;
            const isHighProficiency = skill.level >= 92;

            // Accent color based on category
            let accentBorder = 'hover:border-cyan-500/40';
            let barColor = 'from-cyan-500 to-teal-400';
            let iconBg = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';

            if (skill.category === 'security') {
              accentBorder = 'hover:border-emerald-500/40';
              barColor = 'from-emerald-500 to-teal-400';
              iconBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
            } else if (skill.category === 'identity') {
              accentBorder = 'hover:border-violet-500/40';
              barColor = 'from-violet-500 to-cyan-400';
              iconBg = 'bg-violet-500/10 text-violet-400 border-violet-500/30';
            } else if (skill.category === 'automation') {
              accentBorder = 'hover:border-amber-500/40';
              barColor = 'from-amber-500 to-orange-400';
              iconBg = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
            }

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                onClick={() => {
                  soundFX.playKeyClick();
                  setSelectedSkill(skill);
                }}
                className={`glass-panel rounded-2xl p-5 border border-white/10 ${accentBorder} transition-all duration-300 hover:-translate-y-1 group cursor-pointer relative overflow-hidden`}
              >
                {/* Glowing Top Edge Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${iconBg} border flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h3>
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                        {skill.category}
                      </div>
                    </div>
                  </div>

                  {skill.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 border border-white/10 text-slate-300 flex items-center gap-1">
                      {isHighProficiency && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                      <span>{skill.badge}</span>
                    </span>
                  )}
                </div>

                {/* Animated Level Bar */}
                <div className="space-y-1.5 my-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">MASTERY LEVEL</span>
                    <span className="text-white font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${barColor} rounded-full`}
                    />
                  </div>
                </div>

                {/* Tags array */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skill.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-white/5 group-hover:border-cyan-500/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Telemetry Metric pill */}
                {skill.telemetry && (
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500">{skill.telemetry.metric}:</span>
                    <span className="text-cyan-300 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                      {skill.telemetry.value}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Telemetry Live Feed Footer Bar */}
      <div className="mt-8 p-4 rounded-2xl glass-panel border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-300">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-400 font-semibold">SECURITY POSTURE: 99.4% OPTIMAL</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">EDR AGENT STATUS: ACTIVE (SENTINELONE S1-HELIX)</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>POLICY DRIFT: 0.0%</span>
          <span>LAST AUDIT: OK (2026-10-31)</span>
          <span className="text-cyan-400">AUTHENTICATED</span>
        </div>
      </div>
      {/* Selected Skill Drilldown Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedSkill(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg bg-[#0B1120] border border-cyan-500/40 rounded-2xl p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-mono text-xs">[TELEMETRY INSPECT]</span>
                  <span className="text-white font-bold text-base">{selectedSkill.name}</span>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-white/5">
                  <span className="text-slate-400">CATEGORY:</span>
                  <span className="text-cyan-300 uppercase">{selectedSkill.category}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-white/5">
                  <span className="text-slate-400">OPERATIONAL MASTERY:</span>
                  <span className="text-emerald-400 font-bold">{selectedSkill.level}%</span>
                </div>

                {selectedSkill.telemetry && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-white/5">
                    <span className="text-slate-400">{selectedSkill.telemetry.metric}:</span>
                    <span className="text-white font-bold">{selectedSkill.telemetry.value}</span>
                  </div>
                )}

                <div>
                  <div className="text-slate-400 mb-2">DEPLOYED TAGS & SUITE:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.tags.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-slate-800 border border-cyan-500/20 text-cyan-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
