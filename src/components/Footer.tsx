import React from 'react';
import { ShieldCheck, ArrowUp, Github, Instagram, Mail } from 'lucide-react';
import { PERSONAL_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFX.playKeyClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#05070A] py-12 px-4 sm:px-6 font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Status */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>ANU SAH // INFRASTRUCTURE & IT SECURITY</span>
          </div>
          <p className="text-slate-500 text-[11px]">
            Designed with futuristic glassmorphism, zero-trust telemetry, and cyber-ops aesthetics.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-3 text-[10px] text-slate-500">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM 100% OPERATIONAL
            </span>
            <span>•</span>
            <span>BUILD: v3.2.0-PROD</span>
            <span>•</span>
            <span>GURUGRAM NODE</span>
          </div>
        </div>

        {/* Center: Quick Links */}
        <div className="flex items-center gap-4 text-slate-400">
          <a
            href={PERSONAL_DATA.github.url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href={PERSONAL_DATA.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-violet-400 transition-colors flex items-center gap-1"
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram</span>
          </a>
          <a
            href={`mailto:${PERSONAL_DATA.email}`}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
        </div>

        {/* Right: Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 transition-all flex items-center gap-2 group"
          title="Scroll to top of terminal"
        >
          <span>TOP</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-600 text-center">
        <div>
          © {new Date().getFullYear()} Anu Sah (Anu Kumar Sah). All rights reserved.
        </div>
        <div>
          SHA-256: 9b2d8f7e3c1a4e5d6c8b9a0f1e2d3c4b5a6f7e8d9c0b1a2e3f4a5b6c7d8e9f0
        </div>
      </div>
    </footer>
  );
};
