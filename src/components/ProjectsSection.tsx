import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Code2,
  Github,
  ArrowUpRight,
  CheckCircle,
  FileCode2,
  Copy,
  Check,
  X,
  Terminal
} from 'lucide-react';
import { PROJECTS_DATA, PERSONAL_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { soundFX } from '../utils/audio';

interface TiltCardProps {
  project: ProjectItem;
  index: number;
  onInspect: (project: ProjectItem) => void;
}

const TiltCard: React.FC<TiltCardProps> = ({ project, index, onInspect }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);

    setSpotlightPos({ x: mouseX, y: mouseY, opacity: 1 });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => soundFX.playHoverChirp()}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-colors group cursor-default"
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: spotlightPos.opacity,
          background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(6, 182, 212, 0.15), transparent 80%)`,
        }}
      />

      {/* Top Meta Line */}
      <div>
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10 mb-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 font-bold">{project.id}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400 uppercase">{project.category}</span>
          </div>

          <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[10px]">
            {project.status}
          </span>
        </div>

        {/* Title and Subtitle */}
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
          {project.title}
        </h3>
        <p className="text-xs font-mono text-cyan-400 mb-3">{project.subtitle}</p>

        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-sans">
          {project.description}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 my-4">
          {project.demoMetrics.map((metric, i) => (
            <div key={i} className="p-2 rounded-lg bg-slate-900/90 border border-white/5">
              <div className="text-[10px] font-mono text-slate-500">{metric.label}</div>
              <div className="text-sm font-mono font-bold text-emerald-400">{metric.value}</div>
              {metric.change && (
                <div className="text-[9px] font-mono text-cyan-400/80">{metric.change}</div>
              )}
            </div>
          ))}
        </div>

        {/* Feature Checkpoints */}
        <div className="space-y-1.5 my-4">
          {project.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer: Architecture Badges & Dual Action Buttons */}
      <div className="pt-4 border-t border-white/10 mt-auto space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {project.architecture.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => {
              soundFX.playKeyClick();
              onInspect(project);
            }}
            className="py-2.5 px-3 rounded-xl font-mono text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 transition-all flex items-center justify-center gap-1.5 shadow-neon-cyan active:scale-95"
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>INSPECT CODE</span>
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFX.playKeyClick()}
            className="py-2.5 px-3 rounded-xl font-mono text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-white transition-all flex items-center justify-center gap-1.5 group/btn"
          >
            <Github className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:rotate-12 transition-transform" />
            <span>GITHUB</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'devsecops' | 'automation' | 'endpoint'>('all');
  const [inspectingProject, setInspectingProject] = useState<ProjectItem | null>(null);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const handleInspect = (project: ProjectItem) => {
    setInspectingProject(project);
    setActiveFileIndex(0);
    setCopiedCode(false);
  };

  const handleCopyCode = async (codeText: string) => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopiedCode(true);
      soundFX.playSuccessAccess();
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section id="projects" className="relative py-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-400">
          <Code2 className="w-3.5 h-3.5" />
          <span>PRODUCTION RELEASES // AUTOMATION ENGINEERING</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
          Featured Deployments & Security Tools
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-normal">
            OPEN ARTIFACTS
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl font-sans">
          Production-tested infrastructure frameworks, automated vulnerability scanners, and endpoint hardening suites.
          Click <span className="text-cyan-400 font-mono">"INSPECT CODE"</span> to review real production source artifacts directly in-browser.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 font-mono text-xs overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'ALL DEPLOYMENTS' },
          { id: 'devsecops', label: 'DEVSECOPS PIPELINES' },
          { id: 'automation', label: 'WORKSPACE AUTOMATIONS' },
          { id: 'endpoint', label: 'ENDPOINT REMEDIATION' },
        ].map((tab) => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundFX.playKeyClick();
                setFilter(tab.id as any);
              }}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-cyan-500/20 border border-cyan-400/60 text-cyan-300 font-bold shadow-neon-cyan'
                  : 'bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Projects 3D Tilt Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <TiltCard
            key={project.id}
            project={project}
            index={index}
            onInspect={handleInspect}
          />
        ))}
      </div>

      {/* Bottom GitHub Callout */}
      <div className="mt-10 p-6 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm">Explore More Repositories on GitHub</h4>
            <p className="text-slate-400 text-xs">
              Check out additional automation scripts, bash daemons, and cloud templates at github.com/Anusah99
            </p>
          </div>
        </div>

        <a
          href={PERSONAL_DATA.github.url}
          target="_blank"
          rel="noreferrer"
          onClick={() => soundFX.playSuccessAccess()}
          className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 transition-all flex items-center gap-2 whitespace-nowrap active:scale-95 shadow-neon-cyan"
        >
          <span>VISIT GITHUB PROFILE</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Interactive Code & Architecture Inspector Modal */}
      <AnimatePresence>
        {inspectingProject && inspectingProject.codeFiles && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setInspectingProject(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl bg-[#0B1120] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_-20px_rgba(6,182,212,0.5)] z-10 max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-mono text-xs font-bold">
                        [CODE INSPECTOR :: {inspectingProject.id}]
                      </span>
                      <span className="text-emerald-400 font-mono text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        {inspectingProject.status}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {inspectingProject.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={inspectingProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5 font-mono text-xs"
                  >
                    <Github className="w-4 h-4" />
                    <span className="hidden sm:inline">REPO</span>
                  </a>
                  <button
                    onClick={() => setInspectingProject(null)}
                    className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* File Selector Tabs */}
              <div className="flex items-center gap-2 pt-4 pb-2 border-b border-white/5 overflow-x-auto scrollbar-none font-mono text-xs shrink-0">
                <span className="text-[10px] text-slate-500 uppercase mr-1">FILES:</span>
                {inspectingProject.codeFiles.map((file, fIdx) => (
                  <button
                    key={file.filename}
                    onClick={() => {
                      soundFX.playKeyClick();
                      setActiveFileIndex(fIdx);
                      setCopiedCode(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
                      activeFileIndex === fIdx
                        ? 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-bold shadow-neon-cyan'
                        : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-white/5'
                    }`}
                  >
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>{file.filename}</span>
                  </button>
                ))}

                <button
                  onClick={() =>
                    handleCopyCode(inspectingProject.codeFiles?.[activeFileIndex]?.code || '')
                  }
                  className="ml-auto px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-300 transition-all flex items-center gap-1.5 shrink-0"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY FILE</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Viewer Body */}
              <div className="flex-1 overflow-y-auto mt-4 p-4 rounded-2xl bg-black/70 border border-white/10 font-mono text-xs text-slate-300 leading-relaxed selection:bg-cyan-500/30">
                <pre className="overflow-x-auto whitespace-pre font-mono">
                  <code>{inspectingProject.codeFiles[activeFileIndex]?.code}</code>
                </pre>
              </div>

              {/* Footer Summary */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">● VERIFIED PRODUCTION ARTIFACT</span>
                  <span className="text-slate-600">|</span>
                  <span>LOCATION: /projects/{inspectingProject.id.toLowerCase()}</span>
                </div>
                <div className="text-cyan-400">
                  DEVELOPED BY ANU SAH (@Anusah99)
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
