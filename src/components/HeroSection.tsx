import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Terminal,
  MapPin,
  Layers,
  FileCode2,
  Mail,
  Instagram
} from 'lucide-react';
import { PERSONAL_DATA } from '../data/portfolioData';
import { InteractiveTerminal } from './InteractiveTerminal';
import { soundFX } from '../utils/audio';

interface HeroSectionProps {
  onOpenHireModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenHireModal }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for roles
  useEffect(() => {
    const currentRole = PERSONAL_DATA.roles[roleIndex];
    let typingSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && displayedText === currentRole) {
      // Pause at full text
      const timeout = setTimeout(() => setIsDeleting(true), 2400);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % PERSONAL_DATA.roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting ? currentRole.substring(0, prev.length - 1) : currentRole.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section id="home" className="relative pt-8 pb-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Background Cyber Ambient Flare */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Dual-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Typographic Intro & Profile Spec */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Top Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-400 shadow-neon-cyan">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold tracking-wide">SEC_OPS PROTOCOL // GURUGRAM NODE</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Gurugram, India
            </span>
          </div>

          {/* Heading with Name & Glow */}
          <div className="space-y-2">
            <div className="font-mono text-xs uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="text-cyan-400 font-bold">&gt;&gt;</span>
              <span>IDENTITY RECORD // 0xANU_SAH</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Defending Scale. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                Automating Resilience.
              </span>
            </h1>
          </div>

          {/* Typewriter Role Switcher */}
          <div className="h-12 flex items-center">
            <div className="font-mono text-base sm:text-xl text-slate-300 flex items-center gap-2 bg-slate-900/60 border border-white/10 px-3.5 py-2 rounded-xl backdrop-blur-md">
              <span className="text-cyan-400 font-bold">&gt;</span>
              <span className="text-cyan-300 font-semibold">{displayedText}</span>
              <span className="w-2 h-5 bg-cyan-400 animate-pulse" />
            </div>
          </div>

          {/* Summary Bio */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
            Specializing in architecting <span className="text-cyan-300 font-medium">zero-trust IT infrastructure</span>,
            hardening <span className="text-emerald-300 font-medium">1,500+ enterprise endpoints</span>, and engineering
            automated <span className="text-violet-300 font-medium">DevSecOps pipelines</span>. Proven track record at
            AuthBridge and Microland mitigating attack surfaces with SentinelOne, Rapid7, JumpCloud IAM, and customized Python/PowerShell automation.
          </p>

          {/* Core System Stats Ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 font-mono">
            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/10 backdrop-blur-md hover:border-cyan-500/30 transition-colors">
              <div className="text-[10px] text-slate-400 tracking-wider">UPTIME SLA</div>
              <div className="text-xl font-bold text-emerald-400">{PERSONAL_DATA.systemStats.uptime}</div>
              <div className="text-[10px] text-slate-500">Continuous Ops</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/10 backdrop-blur-md hover:border-cyan-500/30 transition-colors">
              <div className="text-[10px] text-slate-400 tracking-wider">ENDPOINTS</div>
              <div className="text-xl font-bold text-cyan-400">{PERSONAL_DATA.systemStats.endpointsManaged}</div>
              <div className="text-[10px] text-slate-500">Hardened & Monitored</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/10 backdrop-blur-md hover:border-cyan-500/30 transition-colors">
              <div className="text-[10px] text-slate-400 tracking-wider">CI/CD GATES</div>
              <div className="text-xl font-bold text-violet-400">{PERSONAL_DATA.systemStats.pipelinesGated}</div>
              <div className="text-[10px] text-slate-500">Zero-Critical CVEs</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/10 backdrop-blur-md hover:border-cyan-500/30 transition-colors">
              <div className="text-[10px] text-slate-400 tracking-wider">AUTOMATIONS</div>
              <div className="text-xl font-bold text-amber-400">{PERSONAL_DATA.systemStats.automatedTasks}</div>
              <div className="text-[10px] text-slate-500">Tasks Dispatched</div>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                soundFX.playSuccessAccess();
                onOpenHireModal();
              }}
              className="px-5 py-3 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-black hover:opacity-95 shadow-neon-cyan transition-all flex items-center gap-2 active:scale-95"
            >
              <Terminal className="w-4 h-4 text-black" />
              <span>SUDO HIRE ANU</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>

            <a
              href="#arsenal"
              onClick={() => soundFX.playKeyClick()}
              className="px-5 py-3 rounded-xl font-mono text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 border border-white/10 hover:border-cyan-400/40 text-slate-200 hover:text-cyan-300 transition-all flex items-center gap-2 shadow-sm"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>INSPECT ARSENAL</span>
            </a>

            <div className="flex items-center gap-2 pl-1">
              <a
                href={PERSONAL_DATA.github.url}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundFX.playHoverChirp()}
                className="p-3 rounded-xl bg-slate-900/90 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 transition-all"
                title="GitHub @Anusah99"
              >
                <FileCode2 className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_DATA.instagram.url}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundFX.playHoverChirp()}
                className="p-3 rounded-xl bg-slate-900/90 border border-white/10 hover:border-violet-500/40 text-slate-300 hover:text-violet-400 transition-all"
                title="Instagram @itz_anukrsah_xd"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${PERSONAL_DATA.email}`}
                onMouseEnter={() => soundFX.playHoverChirp()}
                className="p-3 rounded-xl bg-slate-900/90 border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 transition-all"
                title="Send Encrypted Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Embedded Interactive Terminal */}
        <motion.div
          id="terminal"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-5"
        >
          <div className="relative">
            {/* Holographic Glowing Border Background */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-violet-500/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <InteractiveTerminal onOpenHireModal={onOpenHireModal} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
