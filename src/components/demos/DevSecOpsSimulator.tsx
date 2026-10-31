import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  Terminal as TerminalIcon,
  Cpu,
  Boxes,
  Lock,
  CloudUpload,
  Layers
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

type StageStatus = 'idle' | 'running' | 'success' | 'failed';

interface PipelineStage {
  id: string;
  name: string;
  icon: any;
  tool: string;
  duration: string;
  status: StageStatus;
  description: string;
}

export const DevSecOpsSimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [injectVulnerability, setInjectVulnerability] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(-1);
  const [pipelineFinished, setPipelineFinished] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] DevSecOps Pipeline Simulator initialized.',
    '[SYSTEM] Ready to trigger automated container security gate.'
  ]);

  const [stages, setStages] = useState<PipelineStage[]>([
    {
      id: 'gitleaks',
      name: 'Secrets Scanner',
      icon: Lock,
      tool: 'Gitleaks v8.18',
      duration: '4.2s',
      status: 'idle',
      description: 'Scans commits and staging for API keys, AWS tokens, and private RSA keys.'
    },
    {
      id: 'semgrep',
      name: 'SAST Code Scan',
      icon: ShieldCheck,
      tool: 'Semgrep OWASP-Top10',
      duration: '8.1s',
      status: 'idle',
      description: 'Static analysis for SQLi, XSS, insecure deserialization, and command injection.'
    },
    {
      id: 'docker',
      name: 'Distroless Build',
      icon: Boxes,
      tool: 'Docker BuildKit',
      duration: '14.5s',
      status: 'idle',
      description: 'Multi-stage build compiling Alpine stage into minimal Google Distroless runtime.'
    },
    {
      id: 'trivy',
      name: 'Trivy CVE Gate',
      icon: ShieldAlert,
      tool: 'Aqua Trivy v0.50',
      duration: '11.8s',
      status: 'idle',
      description: 'Strict CVE scanner blocking builds containing High or Critical vulnerabilities.'
    },
    {
      id: 'cosign',
      name: 'Cosign Signing',
      icon: Cpu,
      tool: 'Sigstore Cosign',
      duration: '3.6s',
      status: 'idle',
      description: 'Generates cryptographic OCI signature and attestation for image provenance.'
    },
    {
      id: 'ecr',
      name: 'AWS ECR Release',
      icon: CloudUpload,
      tool: 'AWS ECR ap-south-1',
      duration: '6.4s',
      status: 'idle',
      description: 'Pushes signed SHA-256 digest to enterprise container registry with immutable tags.'
    }
  ]);

  const logContainerRef = useRef<HTMLDivElement>(null);

  const appendLog = (msg: string) => {
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
    setLogs((prev) => [...prev, `[${timestamp}] ${msg}`]);
  };

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const runPipeline = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setPipelineFinished(false);
    setCurrentStageIndex(0);
    soundFX.playKeyClick();

    // Reset stages
    setStages((prev) => prev.map((s) => ({ ...s, status: 'idle' })));
    setLogs([`[PIPELINE] Execution triggered on commit refs/heads/main @ sha:6fa2a81...`]);

    const stageSequence = [...stages];

    for (let i = 0; i < stageSequence.length; i++) {
      setCurrentStageIndex(i);
      const stage = stageSequence[i];

      // Mark running
      setStages((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: 'running' } : s))
      );
      appendLog(`▶ STARTING [${stage.name}] via ${stage.tool}...`);
      soundFX.playHoverChirp();

      // Check if vulnerability should fail the Trivy stage
      if (stage.id === 'trivy' && injectVulnerability) {
        await new Promise((r) => setTimeout(r, 1400));
        setStages((prev) =>
          prev.map((s, idx) => (idx === i ? { ...s, status: 'failed' } : s))
        );
        appendLog(`[!] CVE-2026-4401 DETECTED: Critical RCE in vulnerable library.`);
        appendLog(`[FAIL] Trivy Gate failed with exit code 1 (High/Critical found).`);
        appendLog(`[ABORT] Pipeline halted. Deployment rejected by security policy.`);
        setIsRunning(false);
        setPipelineFinished(true);
        soundFX.playCommandChirp();
        return;
      }

      await new Promise((r) => setTimeout(r, 1200));

      // Mark success
      setStages((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: 'success' } : s))
      );
      appendLog(`✔ [${stage.name}] PASSED without security violations.`);
      soundFX.playKeyClick();
    }

    appendLog(`[SUCCESS] Pipeline complete! Image signed & pushed to ECR: 1440884743.dkr.ecr.ap-south-1.amazonaws.com/secops-app:latest`);
    setIsRunning(false);
    setPipelineFinished(true);
    soundFX.playSuccessAccess();
  };

  const resetPipeline = () => {
    soundFX.playKeyClick();
    setIsRunning(false);
    setPipelineFinished(false);
    setCurrentStageIndex(-1);
    setStages((prev) => prev.map((s) => ({ ...s, status: 'idle' })));
    setLogs([
      '[SYSTEM] Pipeline reset.',
      '[SYSTEM] Ready to trigger automated container security gate.'
    ]);
  };

  return (
    <div className="space-y-6 text-slate-200">
      {/* Top Banner & Controls */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-white font-mono">
              CI/CD SECURITY RELEASE GATE SIMULATOR
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Interactive pipeline execution engine with automated Gitleaks, Semgrep, and Trivy CVE gates.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Vulnerability Injection Toggle */}
          <button
            onClick={() => {
              soundFX.playKeyClick();
              setInjectVulnerability(!injectVulnerability);
            }}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              injectVulnerability
                ? 'bg-rose-950/80 border-rose-500/60 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                : 'bg-slate-950 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>CVE TEST MODE: {injectVulnerability ? 'ACTIVE' : 'OFF'}</span>
          </button>

          {/* Trigger Button */}
          <button
            onClick={runPipeline}
            disabled={isRunning}
            className="px-4 py-2 rounded-xl font-mono text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/60 text-cyan-300 transition-all flex items-center gap-1.5 shadow-neon-cyan disabled:opacity-50 active:scale-95"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'EXECUTING PIPELINE...' : 'TRIGGER RUN'}</span>
          </button>

          {/* Reset */}
          <button
            onClick={resetPipeline}
            disabled={isRunning}
            className="p-2 rounded-xl bg-slate-950 border border-white/10 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
            title="Reset Pipeline"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
          <div className="text-[10px] text-slate-500">BASE IMAGE</div>
          <div className="text-sm font-bold text-cyan-400">gcr.io/distroless</div>
          <div className="text-[10px] text-emerald-400">Non-Root User (10001)</div>
        </div>
        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
          <div className="text-[10px] text-slate-500">CONTAINER SIZE</div>
          <div className="text-sm font-bold text-emerald-400">42.8 MB</div>
          <div className="text-[10px] text-cyan-400">-65% Footprint</div>
        </div>
        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
          <div className="text-[10px] text-slate-500">CVE POLICY</div>
          <div className="text-sm font-bold text-violet-400">Strict Exit Code 1</div>
          <div className="text-[10px] text-slate-400">Blocks High & Critical</div>
        </div>
        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
          <div className="text-[10px] text-slate-500">SIGNING KEY</div>
          <div className="text-sm font-bold text-cyan-400">Cosign Sigstore</div>
          <div className="text-[10px] text-emerald-400">Immutable OCI Attest</div>
        </div>
      </div>

      {/* Pipeline Visual Graph */}
      <div className="p-4 sm:p-6 rounded-2xl bg-black/50 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>DEPLOYMENT STAGES (ORDER OF EXECUTION)</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            {pipelineFinished
              ? injectVulnerability
                ? 'SECURITY GATE TRIGGERED'
                : 'RELEASE SUCCESS'
              : isRunning
              ? 'ACTIVE RUN'
              : 'IDLE'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isCurrent = currentStageIndex === idx && isRunning;
            return (
              <div
                key={stage.id}
                className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                  stage.status === 'success'
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : stage.status === 'failed'
                    ? 'bg-rose-950/60 border-rose-500/70 text-rose-200'
                    : isCurrent
                    ? 'bg-cyan-950/50 border-cyan-400 text-cyan-200 shadow-neon-cyan'
                    : 'bg-slate-900/60 border-white/10 text-slate-400'
                }`}
              >
                {/* Active scan pulse */}
                {isCurrent && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 animate-pulse" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        stage.status === 'success'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : stage.status === 'failed'
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white mb-0.5 font-mono">
                    {stage.name}
                  </h4>
                  <div className="text-[10px] font-mono text-slate-400">
                    {stage.tool}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 mt-3 flex items-center justify-between text-[10px] font-mono">
                  <span>{stage.duration}</span>
                  {stage.status === 'success' && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> PASS
                    </span>
                  )}
                  {stage.status === 'failed' && (
                    <span className="text-rose-400 font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> BLOCKED
                    </span>
                  )}
                  {stage.status === 'running' && (
                    <span className="text-cyan-400 animate-pulse font-bold">SCANNING...</span>
                  )}
                  {stage.status === 'idle' && (
                    <span className="text-slate-600">STANDBY</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal Log Output */}
      <div className="rounded-2xl bg-black border border-white/10 overflow-hidden font-mono text-xs">
        <div className="px-4 py-2.5 bg-slate-900 border-b border-white/10 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] font-bold text-slate-200">
              CI/CD REAL-TIME LOG STREAM (GHA-RUNNER-01)
            </span>
          </div>
          <span className="text-[10px] text-emerald-400">ONLINE</span>
        </div>

        <div
          ref={logContainerRef}
          className="p-4 h-48 overflow-y-auto space-y-1.5 text-slate-300 font-mono text-[11px] leading-relaxed selection:bg-cyan-500/30"
        >
          {logs.map((log, i) => {
            const isError = log.includes('[FAIL]') || log.includes('[!]') || log.includes('[ABORT]');
            const isSuccess = log.includes('[SUCCESS]') || log.includes('✔');
            const isHighlight = log.includes('▶') || log.includes('[PIPELINE]');
            return (
              <div
                key={i}
                className={
                  isError
                    ? 'text-rose-400 font-bold'
                    : isSuccess
                    ? 'text-emerald-400 font-bold'
                    : isHighlight
                    ? 'text-cyan-400'
                    : 'text-slate-300'
                }
              >
                {log}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
