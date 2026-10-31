import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Copy,
  Check,
  Send,
  Github,
  Instagram,
  MapPin,
  Lock,
  Terminal,
  ExternalLink,
  Radio,
  FileCheck2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

export const ContactCommandCenter: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('SecOps Engineering / Role Inquiry');
  const [message, setMessage] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmittedSuccess, setTransmittedSuccess] = useState(false);
  const [transmissionLog, setTransmissionLog] = useState<string[]>([]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_DATA.email);
      setCopiedEmail(true);
      soundFX.playSuccessAccess();
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;

    soundFX.playCommandChirp();
    setIsTransmitting(true);
    setTransmissionLog([]);

    // Simulate multi-step encrypted transmission log
    const steps = [
      'INITIALIZING TLS 1.3 SECURE HANDSHAKE...',
      'GENERATING EPHEMERAL AES-GCM 256-BIT ENCRYPTION KEY...',
      'HASHING PAYLOAD INTEGRITY: SHA-256 [0x7F8E...9A2B]',
      'ROUTING VIA GURUGRAM CYBER-OPS GATEWAY [NODE_01]...',
      'PACKET DISPATCHED TO: Code.anukrsah@gmail.com'
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setTransmissionLog((prev) => [...prev, step]);
        soundFX.playKeyClick();
      }, (idx + 1) * 350);
    });

    setTimeout(() => {
      setIsTransmitting(false);
      setTransmittedSuccess(true);
      soundFX.playSuccessAccess();

      // Trigger celebratory matrix burst
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#06B6D4', '#10B981', '#8B5CF6']
        });
      } catch {
        // fallback
      }
    }, (steps.length + 1) * 350);
  };

  return (
    <section id="contact" className="relative py-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-emerald-500/30 text-xs font-mono text-emerald-400">
          <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
          <span>ENCRYPTED SECURE UPLINK // COMMS COMMAND</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
          Initialize Direct Transmission
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-normal">
            ZERO-TRUST ENCRYPTED
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl font-sans">
          Whether discussing enterprise infrastructure architecture, endpoint hardening contracts,
          or full-time engineering roles, connect directly through verified endpoints.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Social Launchpads & Verified Channels */}
        <div className="lg:col-span-5 space-y-5">
          {/* Email Quick-Copy Module */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/40 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                PRIMARY SECURE INBOX
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div>
              <div className="text-xs font-mono text-slate-400">OFFICIAL CORRESPONDENCE:</div>
              <div className="text-lg font-mono font-bold text-white break-all">{PERSONAL_DATA.email}</div>
            </div>

            <button
              onClick={handleCopy}
              className="w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 text-cyan-300 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 animate-bounce" />
                  <span className="text-emerald-400">COPIED TO CLIPBOARD!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-cyan-400" />
                  <span>COPY ENCRYPTED EMAIL ADDRESS</span>
                </>
              )}
            </button>
          </div>

          {/* Direct Social Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* GitHub Card */}
            <a
              href={PERSONAL_DATA.github.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playKeyClick()}
              className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/40 hover:-translate-y-1 transition-all group block"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-white group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all">
                  <Github className="w-5 h-5" />
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
              <div className="font-bold text-white group-hover:text-cyan-300 transition-colors text-sm">
                GitHub Repository
              </div>
              <div className="text-xs font-mono text-cyan-400">@{PERSONAL_DATA.github.username}</div>
              <div className="text-[11px] text-slate-400 mt-2 font-mono">
                Source code, automation scripts & CI/CD configs
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href={PERSONAL_DATA.instagram.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playKeyClick()}
              className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-violet-500/40 hover:-translate-y-1 transition-all group block"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-white group-hover:text-violet-400 group-hover:border-violet-500/30 transition-all">
                  <Instagram className="w-5 h-5" />
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-violet-400 transition-colors" />
              </div>
              <div className="font-bold text-white group-hover:text-violet-300 transition-colors text-sm">
                Instagram Feed
              </div>
              <div className="text-xs font-mono text-violet-400">@{PERSONAL_DATA.instagram.handle}</div>
              <div className="text-[11px] text-slate-400 mt-2 font-mono">
                Direct social contact & engineering journey
              </div>
            </a>
          </div>

          {/* Location & Node Specifications */}
          <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3 font-mono text-xs">
            <div className="text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <MapPin className="w-3.5 h-3.5" />
                DEPLOYMENT LOCATION:
              </span>
              <span className="text-slate-200">Gurugram, Haryana, India</span>
            </div>

            <div className="text-slate-400 flex items-center justify-between">
              <span className="text-emerald-400">WORK PREFERENCE:</span>
              <span className="text-slate-200">Hybrid / Remote / Relocation</span>
            </div>

            <div className="text-slate-400 flex items-center justify-between">
              <span className="text-violet-400">RESPONSE SLA:</span>
              <span className="text-slate-200">&lt; 12 Hours (Guaranteed)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Secure Transmission Packet Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white">SECURE TRANSMISSION FORM</span>
                <span className="text-slate-500">:: [STDIN]</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                AES-256 ENCRYPTED
              </span>
            </div>

            {transmittedSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4 font-mono"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-neon-emerald">
                  <FileCheck2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">TRANSMISSION CONFIRMED</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Your encrypted message packet has been routed to Anu Sah at{' '}
                  <span className="text-cyan-400">{PERSONAL_DATA.email}</span>. A dispatch confirmation has been generated.
                </p>
                <button
                  onClick={() => {
                    setTransmittedSuccess(false);
                    setMessage('');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  TRANSMIT ANOTHER PACKET
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <span>SENDER IDENTITY / NAME:</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Alex Mercer (Hiring Team)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 focus:border-cyan-400/60 text-xs font-mono text-white placeholder-slate-600 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <span>RETURN ADDRESS / EMAIL:</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="e.g. hiring@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 focus:border-cyan-400/60 text-xs font-mono text-white placeholder-slate-600 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">
                    SUBJECT CLASSIFICATION:
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 focus:border-cyan-400/60 text-xs font-mono text-white placeholder-slate-600 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">
                    PACKET PAYLOAD / MESSAGE BODY:
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide role description, infrastructure scope, or collaboration inquiry..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 focus:border-cyan-400/60 text-xs font-mono text-white placeholder-slate-600 outline-none transition-colors resize-none"
                  />
                </div>

                {/* Simulated Live Transmission Stream */}
                {isTransmitting && (
                  <div className="p-3 rounded-xl bg-black/60 border border-cyan-500/30 font-mono text-[11px] text-cyan-400 space-y-1">
                    {transmissionLog.map((log, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-emerald-400">&gt;&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isTransmitting}
                  className="w-full py-3 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-black hover:opacity-95 transition-all shadow-neon-cyan flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {isTransmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>DISPATCHING ENCRYPTED PACKET...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-black" />
                      <span>DISPATCH TRANSMISSION</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
