import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  Maximize2,
  Minimize2,
  X,
  Minus,
  Sparkles,
  CornerDownLeft,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_DATA, PROJECTS_DATA, CAREER_LOGS } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

interface TerminalProps {
  onOpenHireModal: () => void;
  className?: string;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const InteractiveTerminal: React.FC<TerminalProps> = ({ onOpenHireModal, className = '' }) => {
  const [inputVal, setInputVal] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [commandIndex, setCommandIndex] = useState<number>(-1);
  const [enteredCommands, setEnteredCommands] = useState<string[]>([]);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Initialize terminal with welcome banner
  useEffect(() => {
    const welcomeId = 'init-' + Date.now();
    setHistory([
      {
        id: welcomeId,
        command: 'systemctl status cyber-ops.service',
        timestamp: new Date().toLocaleTimeString(),
        output: (
          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>● cyber-ops.service - Anu Sah Cloud & Security Node</span>
            </div>
            <div className="text-slate-400 pl-4 border-l border-emerald-500/20 space-y-1">
              <div>Loaded: <span className="text-slate-200">/etc/systemd/system/anu-portfolio.service</span>; enabled;</div>
              <div>Active: <span className="text-emerald-300 font-semibold">active (running)</span> since boot</div>
              <div>Host: <span className="text-cyan-300">anu@cyber-ops:~ (Gurugram Node)</span></div>
              <div className="text-slate-400 mt-2">
                Type <span className="text-cyan-400 font-bold bg-cyan-950/60 px-1 py-0.5 rounded border border-cyan-800">help</span> to list commands or execute <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1 py-0.5 rounded border border-emerald-800">sudo hire anu</span> for direct clearance.
              </div>
            </div>
          </div>
        )
      }
    ]);
  }, []);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalEndRef.current && !isMinimized) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isMinimized]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    soundFX.playSuccessAccess();
    setTimeout(() => setCopiedText(null), 2000);
  };

  const executeCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim();
    if (!cmd) return;

    soundFX.playCommandChirp();

    // Store command in history array
    setEnteredCommands((prev) => [...prev, cmd]);
    setCommandIndex(-1);

    const timestamp = new Date().toLocaleTimeString();
    const itemId = 'cmd-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);

    let output: React.ReactNode = null;
    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (lower === 'help') {
      output = (
        <div className="text-xs font-mono space-y-2 py-1">
          <div className="text-cyan-400 font-bold tracking-wider">AVAILABLE SYSTEM COMMANDS:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-slate-300">
            <div>
              <span className="text-emerald-400 font-semibold">whoami</span>
              <span className="text-slate-500"> - Display engineer profile & mission</span>
            </div>
            <div>
              <span className="text-emerald-400 font-semibold">skills --list</span>
              <span className="text-slate-500"> - Inspect full technical arsenal</span>
            </div>
            <div>
              <span className="text-emerald-400 font-semibold">projects</span>
              <span className="text-slate-500"> - Output featured architecture deployments</span>
            </div>
            <div>
              <span className="text-emerald-400 font-semibold">timeline</span>
              <span className="text-slate-500"> - Review career deployment ledger</span>
            </div>
            <div>
              <span className="text-emerald-400 font-semibold">socials</span>
              <span className="text-slate-500"> - GitHub, Instagram & contact channels</span>
            </div>
            <div>
              <span className="text-emerald-400 font-semibold">status</span>
              <span className="text-slate-500"> - Real-time system telemetry audit</span>
            </div>
            <div>
              <span className="text-emerald-400 font-semibold">ping</span>
              <span className="text-slate-500"> - Verify latency to Gurugram Node</span>
            </div>
            <div>
              <span className="text-cyan-400 font-bold bg-cyan-950/80 px-1 rounded">sudo hire anu</span>
              <span className="text-slate-400"> - Security clearance & hire protocol</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">clear</span>
              <span className="text-slate-500"> - Clear terminal screen</span>
            </div>
          </div>
        </div>
      );
    } else if (lower === 'whoami') {
      output = (
        <div className="text-xs font-mono space-y-2 py-1">
          <div className="p-3 rounded-lg bg-slate-900/90 border border-cyan-500/30 text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
              <span className="text-cyan-400 font-bold">{PERSONAL_DATA.fullName} ({PERSONAL_DATA.name})</span>
              <span className="text-emerald-400 text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                ACTIVE IDENTITY
              </span>
            </div>
            <div className="space-y-1 text-slate-300">
              <p><span className="text-slate-400">ROLE:</span> <span className="text-white font-medium">{PERSONAL_DATA.title}</span></p>
              <p><span className="text-slate-400">BASE:</span> <span className="text-cyan-300">{PERSONAL_DATA.location} (Open to Relocation / Remote)</span></p>
              <p><span className="text-slate-400">MISSION:</span> <span className="text-slate-200">{PERSONAL_DATA.bio}</span></p>
              <p><span className="text-slate-400">CONTACT:</span> <span className="text-emerald-400 underline">{PERSONAL_DATA.email}</span></p>
            </div>
          </div>
        </div>
      );
    } else if (lower === 'skills' || lower === 'skills --list' || lower === 'arsenal') {
      output = (
        <div className="text-xs font-mono space-y-3 py-1">
          <div className="text-cyan-400 font-semibold">TECH ARSENAL & DEFENSIVE COMPETENCIES:</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="p-2.5 rounded bg-slate-900/80 border border-cyan-500/20">
              <div className="text-cyan-300 font-bold pb-1 mb-1 border-b border-cyan-500/20 flex items-center justify-between">
                <span>[01] CLOUD & DEVSECOPS</span>
                <span className="text-[10px] text-cyan-400">92% AVG</span>
              </div>
              <p className="text-slate-300">AWS (EC2, S3, IAM, ECR), Docker, Kubernetes, Jenkins, Trivy, Git, GitHub Actions</p>
            </div>

            <div className="p-2.5 rounded bg-slate-900/80 border border-emerald-500/20">
              <div className="text-emerald-300 font-bold pb-1 mb-1 border-b border-emerald-500/20 flex items-center justify-between">
                <span>[02] ENDPOINT & SEC-OPS</span>
                <span className="text-[10px] text-emerald-400">95% AVG</span>
              </div>
              <p className="text-slate-300">SentinelOne EDR, Rapid7 InsightVM, Trellix DLP, Data Resolve DLP, Incident Response, NIST</p>
            </div>

            <div className="p-2.5 rounded bg-slate-900/80 border border-violet-500/20">
              <div className="text-violet-300 font-bold pb-1 mb-1 border-b border-violet-500/20 flex items-center justify-between">
                <span>[03] IDENTITY & INFRA</span>
                <span className="text-[10px] text-violet-400">94% AVG</span>
              </div>
              <p className="text-slate-300">JumpCloud IAM/MDM, Active Directory (AD DS), GPO, Linux (RHEL/Ubuntu), Windows Server 2022</p>
            </div>

            <div className="p-2.5 rounded bg-slate-900/80 border border-amber-500/20">
              <div className="text-amber-300 font-bold pb-1 mb-1 border-b border-amber-500/20 flex items-center justify-between">
                <span>[04] AUTOMATION & SCRIPTING</span>
                <span className="text-[10px] text-amber-400">93% AVG</span>
              </div>
              <p className="text-slate-300">Python 3.x, PowerShell 7, Bash, Playwright, Google Apps Script, REST API Orchestration</p>
            </div>
          </div>
        </div>
      );
    } else if (lower === 'projects') {
      output = (
        <div className="text-xs font-mono space-y-2 py-1">
          <div className="text-cyan-400 font-bold">FEATURED SYSTEM DEPLOYMENTS:</div>
          {PROJECTS_DATA.map((p, idx) => (
            <div key={p.id} className="p-2.5 rounded bg-slate-900/90 border border-white/10 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">[{idx + 1}] {p.title}</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  {p.status}
                </span>
              </div>
              <p className="text-slate-400 mt-1">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {p.architecture.map((a, i) => (
                  <span key={i} className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-cyan-300 rounded border border-cyan-900/40">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="text-slate-400 text-[11px] pt-1">
            Browse live code at: <a href={PERSONAL_DATA.github.url} target="_blank" rel="noreferrer" className="text-cyan-400 underline">https://github.com/Anusah99</a>
          </div>
        </div>
      );
    } else if (lower === 'socials' || lower === 'links' || lower === 'contact') {
      output = (
        <div className="text-xs font-mono space-y-2 py-1">
          <div className="text-cyan-400 font-semibold">DIRECT SECURE CHANNELS:</div>
          <div className="space-y-1.5 pl-2">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 w-24">GITHUB:</span>
              <a
                href={PERSONAL_DATA.github.url}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-300 hover:text-cyan-400 underline flex items-center gap-1"
              >
                {PERSONAL_DATA.github.url} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 w-24">INSTAGRAM:</span>
              <a
                href={PERSONAL_DATA.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="text-violet-300 hover:text-violet-400 underline flex items-center gap-1"
              >
                {PERSONAL_DATA.instagram.url} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 w-24">EMAIL:</span>
              <button
                onClick={() => copyToClipboard(PERSONAL_DATA.email, 'email')}
                className="text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1"
              >
                {PERSONAL_DATA.email}
                {copiedText === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>
      );
    } else if (lower === 'timeline' || lower === 'experience') {
      output = (
        <div className="text-xs font-mono space-y-2 py-1">
          <div className="text-cyan-400 font-semibold">CAREER DEPLOYMENT LOG (IMMUTABLE):</div>
          {CAREER_LOGS.map((item) => (
            <div key={item.id} className="p-2 border-l-2 border-cyan-500/50 bg-slate-900/60 pl-3">
              <div className="flex items-center justify-between text-white font-bold">
                <span>{item.role} @ {item.company}</span>
                <span className="text-slate-400 text-[10px]">{item.period}</span>
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">{item.highlights[0]}</div>
            </div>
          ))}
        </div>
      );
    } else if (lower === 'status') {
      output = (
        <div className="text-xs font-mono space-y-1.5 py-1">
          <div className="text-emerald-400 font-bold">TELEMETRY AUDIT MATRIX:</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div className="bg-slate-900/80 p-2 rounded border border-white/10">
              <div className="text-slate-500 text-[10px]">UPTIME</div>
              <div className="text-emerald-400 text-sm font-bold">{PERSONAL_DATA.systemStats.uptime}</div>
            </div>
            <div className="bg-slate-900/80 p-2 rounded border border-white/10">
              <div className="text-slate-500 text-[10px]">ENDPOINTS</div>
              <div className="text-cyan-400 text-sm font-bold">{PERSONAL_DATA.systemStats.endpointsManaged}</div>
            </div>
            <div className="bg-slate-900/80 p-2 rounded border border-white/10">
              <div className="text-slate-500 text-[10px]">THREAT DEFENSE</div>
              <div className="text-emerald-400 text-sm font-bold">{PERSONAL_DATA.systemStats.threatsNeutralized}</div>
            </div>
            <div className="bg-slate-900/80 p-2 rounded border border-white/10">
              <div className="text-slate-500 text-[10px]">CI/CD GATES</div>
              <div className="text-violet-400 text-sm font-bold">{PERSONAL_DATA.systemStats.pipelinesGated}</div>
            </div>
            <div className="bg-slate-900/80 p-2 rounded border border-white/10">
              <div className="text-slate-500 text-[10px]">TASKS AUTOMATED</div>
              <div className="text-amber-400 text-sm font-bold">{PERSONAL_DATA.systemStats.automatedTasks}</div>
            </div>
            <div className="bg-slate-900/80 p-2 rounded border border-white/10">
              <div className="text-slate-500 text-[10px]">COMPLIANCE</div>
              <div className="text-emerald-400 text-sm font-bold">{PERSONAL_DATA.systemStats.complianceScore}</div>
            </div>
          </div>
        </div>
      );
    } else if (lower === 'ping') {
      output = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <div>PING node.cyber-ops.anu [192.168.1.104] with 64 bytes of data:</div>
          <div className="text-emerald-400">64 bytes from 192.168.1.104: icmp_seq=1 ttl=64 time=14.2 ms</div>
          <div className="text-emerald-400">64 bytes from 192.168.1.104: icmp_seq=2 ttl=64 time=16.8 ms</div>
          <div className="text-emerald-400">64 bytes from 192.168.1.104: icmp_seq=3 ttl=64 time=15.1 ms</div>
          <div className="text-slate-400">--- node.cyber-ops.anu ping statistics --- 0% packet loss, rtt min/avg/max = 14.2/15.3/16.8 ms</div>
        </div>
      );
    } else if (lower.startsWith('sudo hire') || lower === 'hire' || lower === 'sudo hire anu') {
      // Trigger celebratory matrix effect and open modal
      soundFX.playSuccessAccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06B6D4', '#10B981', '#8B5CF6', '#38BDF8']
        });
      } catch {
        // confetti fallback
      }

      output = (
        <div className="p-3 rounded-lg bg-emerald-950/70 border border-emerald-500/50 text-xs font-mono space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
            <span>[ACCESS GRANTED] ROOT PRIVILEGES DISPATCHED</span>
          </div>
          <div className="text-slate-200">
            Welcome to Anu Sah's direct recruiting protocol. Security clearances have verified candidate qualifications.
          </div>
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={onOpenHireModal}
              className="px-3 py-1.5 rounded bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors"
            >
              INITIALIZE RECRUITER CHANNEL →
            </button>
            <span className="text-slate-400 text-[11px]">or write to: <span className="text-cyan-300 underline">{PERSONAL_DATA.email}</span></span>
          </div>
        </div>
      );

      // Also trigger hire modal automatically after small delay
      setTimeout(() => {
        onOpenHireModal();
      }, 600);
    } else {
      output = (
        <div className="text-xs font-mono text-rose-400">
          command not found: '{cmd}'. Try typing <span className="text-cyan-400 font-bold underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> for available options.
        </div>
      );
    }

    setHistory((prev) => [...prev, { id: itemId, command: cmd, output, timestamp }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundFX.playKeyClick();

    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (enteredCommands.length > 0) {
        const nextIndex = commandIndex + 1;
        if (nextIndex < enteredCommands.length) {
          setCommandIndex(nextIndex);
          setInputVal(enteredCommands[enteredCommands.length - 1 - nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex > 0) {
        const nextIndex = commandIndex - 1;
        setCommandIndex(nextIndex);
        setInputVal(enteredCommands[enteredCommands.length - 1 - nextIndex]);
      } else if (commandIndex === 0) {
        setCommandIndex(-1);
        setInputVal('');
      }
    }
  };

  const quickChips = [
    { label: 'help', cmd: 'help' },
    { label: 'whoami', cmd: 'whoami' },
    { label: 'skills --list', cmd: 'skills --list' },
    { label: 'projects', cmd: 'projects' },
    { label: 'sudo hire anu', cmd: 'sudo hire anu', highlight: true },
    { label: 'socials', cmd: 'socials' },
    { label: 'clear', cmd: 'clear' }
  ];

  return (
    <div
      className={`glass-panel rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
        isMaximized
          ? 'fixed inset-4 z-50 bg-[#07090E]/95'
          : 'w-full h-[480px] sm:h-[530px]'
      } ${isMinimized ? 'h-12 overflow-hidden' : ''} ${className}`}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-white/10 select-none">
        {/* macOS Style Window Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setHistory([]);
              soundFX.playKeyClick();
            }}
            className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-400 border border-rose-600/50 flex items-center justify-center group"
            title="Clear Terminal Output"
          >
            <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
          </button>
          <button
            onClick={() => {
              setIsMinimized(!isMinimized);
              soundFX.playKeyClick();
            }}
            className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-400 border border-amber-600/50 flex items-center justify-center group"
            title="Minimize Window"
          >
            <Minus className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
          </button>
          <button
            onClick={() => {
              setIsMaximized(!isMaximized);
              soundFX.playKeyClick();
            }}
            className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 border border-emerald-600/50 flex items-center justify-center group"
            title="Toggle Maximize"
          >
            {isMaximized ? (
              <Minimize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
            ) : (
              <Maximize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
            )}
          </button>
        </div>

        {/* Window Center Header */}
        <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-slate-200">anu@cyber-ops: ~</span>
          <span className="hidden sm:inline-block text-[11px] text-slate-500">
            (bash 5.2.15 // x86_64)
          </span>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">LIVE SHELL</span>
        </div>
      </div>

      {/* Terminal Body */}
      {!isMinimized && (
        <div
          className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs bg-[#07090E]/80 selection:bg-cyan-500/30"
          onClick={() => inputRef.current?.focus()}
        >
          {/* History render */}
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-cyan-400 font-bold">anu@cyber-ops:~$</span>
                <span className="text-white font-semibold">{item.command}</span>
                <span className="text-[10px] text-slate-600 ml-auto">{item.timestamp}</span>
              </div>
              <div className="pl-3 border-l border-white/10">{item.output}</div>
            </div>
          ))}

          {/* Active Command Input Line */}
          <div className="flex items-center gap-2 text-slate-300 pt-1">
            <span className="text-cyan-400 font-bold">anu@cyber-ops:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-slate-600 caret-cyan-400"
              placeholder="type 'help' or 'sudo hire anu'..."
              autoFocus
              spellCheck={false}
            />
            <button
              onClick={() => executeCommand(inputVal)}
              className="p-1 rounded text-slate-500 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
              title="Execute Command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div ref={terminalEndRef} />
        </div>
      )}

      {/* Quick Command Chips Toolbar */}
      {!isMinimized && (
        <div className="px-3 py-2 bg-slate-900/90 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mr-1 shrink-0">
            QUICK RUN:
          </span>
          {quickChips.map((chip) => (
            <button
              key={chip.label}
              onClick={() => executeCommand(chip.cmd)}
              onMouseEnter={() => soundFX.playHoverChirp()}
              className={`shrink-0 text-[11px] font-mono px-2.5 py-1 rounded-md transition-all flex items-center gap-1 active:scale-95 ${
                chip.highlight
                  ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/30 font-bold'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-white/5'
              }`}
            >
              {chip.highlight && <Sparkles className="w-3 h-3 text-emerald-400" />}
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
