import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Terminal,
  Copy,
  Check,
  Github,
  Instagram,
  Send
} from 'lucide-react';
import { PERSONAL_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HireModal: React.FC<HireModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_DATA.email);
      setCopied(true);
      soundFX.playSuccessAccess();
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#0B1120] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_-15px_rgba(6,182,212,0.4)] z-10 overflow-hidden"
          >
            {/* Top Scanning Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-emerald-400 to-violet-500 animate-pulse" />

            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-mono text-xs font-bold tracking-wider">
                      [ACCESS GRANTED // ROOT PRIVILEGES]
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Direct Recruiter Fast-Track</h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="py-6 space-y-6">
              {/* Identity Snapshot Card */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-slate-400">CANDIDATE:</span>
                  <span className="text-white font-bold">{PERSONAL_DATA.fullName} ({PERSONAL_DATA.name})</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-slate-400">TARGET ROLES:</span>
                  <span className="text-cyan-300 font-semibold">Infra, SecOps, DevSecOps, Cloud Admin</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-slate-400">LOCATION:</span>
                  <span className="text-slate-200">{PERSONAL_DATA.location} (Remote / Relocation OK)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">NOTICE PERIOD:</span>
                  <span className="text-emerald-400 font-bold">Standard / Immediately Available</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={`mailto:${PERSONAL_DATA.email}?subject=Job%20Opportunity%20-%20Infrastructure%20%26%20Security%20Engineer&body=Hi%20Anu,%0D%0A%0D%0AWe%20reviewed%20your%20portfolio%20and%20would%20love%20to%20discuss%20an%20engineering%20opportunity%20with%20our%20team.`}
                  className="w-full py-3.5 px-4 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-black hover:opacity-95 shadow-neon-cyan transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>DISPATCH INTERVIEW INVITATION VIA EMAIL</span>
                </a>

                <button
                  onClick={handleCopy}
                  className="w-full py-3 px-4 rounded-xl font-mono text-xs font-bold bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 text-cyan-300 transition-all flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">COPIED: {PERSONAL_DATA.email}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-cyan-400" />
                      <span>COPY OFFICIAL EMAIL: {PERSONAL_DATA.email}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Verified Links */}
              <div className="pt-2 flex items-center justify-center gap-4 text-xs font-mono text-slate-400">
                <a
                  href={PERSONAL_DATA.github.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub: @{PERSONAL_DATA.github.username}</span>
                </a>
                <span>•</span>
                <a
                  href={PERSONAL_DATA.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-violet-400 transition-colors flex items-center gap-1"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram: @{PERSONAL_DATA.instagram.handle}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
