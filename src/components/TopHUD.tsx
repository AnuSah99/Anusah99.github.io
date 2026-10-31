import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Terminal,
  Layers,
  Briefcase,
  Code2,
  Mail,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Menu,
  X
} from 'lucide-react';
import { PERSONAL_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

interface TopHUDProps {
  onOpenHireModal: () => void;
}

export const TopHUD: React.FC<TopHUDProps> = ({ onOpenHireModal }) => {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState({ ist: '', utc: '' });
  const [isMuted, setIsMuted] = useState(soundFX.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  // Live clock updates
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        ist: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }),
        utc: now.toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false })
      });
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_DATA.email);
      setCopied(true);
      soundFX.playSuccessAccess();
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleToggleSound = () => {
    const nextMuted = soundFX.toggleMute();
    setIsMuted(nextMuted);
  };

  const navLinks = [
    { id: 'home', label: '~/home', icon: ShieldCheck },
    { id: 'terminal', label: '~/terminal', icon: Terminal },
    { id: 'arsenal', label: '~/arsenal', icon: Layers },
    { id: 'experience', label: '~/experience', icon: Briefcase },
    { id: 'projects', label: '~/projects', icon: Code2 },
    { id: 'contact', label: '~/contact', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    soundFX.playKeyClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#07090E]/80 border-b border-white/10 transition-all duration-300">
        {/* Top Mini Telemetry Ribbon */}
        <div className="hidden md:flex items-center justify-between px-6 py-1 bg-black/40 border-b border-white/5 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              SESSION: SEC_OPS_PROD_V3
            </span>
            <span className="text-slate-600">|</span>
            <span>NODE: GURUGRAM_IND (28.4595° N, 77.0266° E)</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400">TLS 1.3 // ZERO-TRUST ENFORCED</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">IST:</span>
              <span className="text-slate-200 font-semibold">{time.ist || '00:00:00'}</span>
            </div>
            <span className="text-slate-600">/</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">UTC:</span>
              <span className="text-slate-400">{time.utc || '00:00:00'}</span>
            </div>
            <span className="text-slate-600">|</span>
            <button
              onClick={handleToggleSound}
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
              title={isMuted ? 'Unmute Audio Feedback' : 'Mute Audio Feedback'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-rose-400">AUDIO OFF</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="text-cyan-400">AUDIO SYNTH</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main HUD Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand & Security Status Badge */}
          <div className="flex items-center gap-3">
            <a
              href="#home"
              onClick={() => handleNavClick('home')}
              className="group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-400 transition-all shadow-neon-cyan">
                <ShieldCheck className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-bold tracking-wider text-sm sm:text-base text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  ANU SAH
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-mono">
                    SEC_OPS
                  </span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 hidden sm:inline-block">
                  INFRASTRUCTURE & SECURITY // ARCHITECT
                </span>
              </div>
            </a>

            {/* Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/90 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM ONLINE // 99.98% UPTIME</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeNav === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  onMouseEnter={() => soundFX.playHoverChirp()}
                  className={`px-3 py-1.5 rounded-md font-mono text-xs tracking-wide transition-all flex items-center gap-1.5 relative ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-950/50 border border-cyan-500/30 shadow-neon-cyan'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_#06b6d4]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Quick Action: Copy Email with visual feedback */}
            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => soundFX.playHoverChirp()}
              className="relative px-3 py-1.5 rounded-lg font-mono text-xs font-semibold bg-slate-900/80 hover:bg-slate-800/80 border border-white/10 hover:border-cyan-400/40 text-slate-200 hover:text-cyan-300 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              title="Copy secure communication address"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                  <span className="text-emerald-400">COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">COPY EMAIL</span>
                  <span className="sm:hidden">EMAIL</span>
                </>
              )}
            </button>

            {/* Sudo Hire Quick CTA */}
            <button
              onClick={() => {
                soundFX.playSuccessAccess();
                onOpenHireModal();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 text-black hover:opacity-90 transition-all shadow-neon-cyan active:scale-95"
            >
              <Terminal className="w-3.5 h-3.5 text-black" />
              <span>SUDO HIRE</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => {
                soundFX.playKeyClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-[#07090E]/95 backdrop-blur-2xl px-4 py-4 space-y-2 font-mono text-sm"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  SECURITY NODE ONLINE
                </span>
                <button
                  onClick={handleToggleSound}
                  className="flex items-center gap-1 text-cyan-400"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isMuted ? 'MUTE' : 'AUDIO ON'}</span>
                </button>
              </div>

              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeNav === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <span>{link.label}</span>
                    </div>
                    <span className="text-slate-600 text-xs">→</span>
                  </button>
                );
              })}

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    handleCopyEmail();
                  }}
                  className="flex-1 py-2 rounded-lg bg-slate-800 border border-white/10 text-xs font-mono text-cyan-300 flex items-center justify-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'COPIED!' : 'COPY EMAIL'}</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenHireModal();
                  }}
                  className="flex-1 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-xs font-mono flex items-center justify-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>SUDO HIRE</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating Toast when Copied */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-white font-mono text-xs shadow-2xl backdrop-blur-xl"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Check className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                <span>ENCRYPTED ADDRESS COPIED</span>
              </div>
              <div className="text-slate-400 text-[11px]">{PERSONAL_DATA.email}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
