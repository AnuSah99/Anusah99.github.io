import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Github,
  Activity
} from 'lucide-react';
import { ProjectItem } from '../types';
import { soundFX } from '../utils/audio';
import { DevSecOpsSimulator } from './demos/DevSecOpsSimulator';
import { JumpCloudTrackerDemo } from './demos/JumpCloudTrackerDemo';
import { EndpointHardeningConsole } from './demos/EndpointHardeningConsole';

interface ProjectLiveModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectLiveModal: React.FC<ProjectLiveModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const standaloneUrl = `./projects/${
    project.id === 'PROJ-01'
      ? 'devsecops-pipeline'
      : project.id === 'PROJ-02'
      ? 'jumpcloud-patch-tracker'
      : 'endpoint-hardening-telemetry'
  }/`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-5xl bg-[#0B1120] border border-cyan-500/40 rounded-3xl p-5 sm:p-8 shadow-[0_0_80px_-20px_rgba(6,182,212,0.5)] z-10 my-auto max-h-[92vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-mono text-xs font-bold">
                    [LIVE SYSTEM DEMO // {project.id}]
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    INTERACTIVE OPS
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <a
                href={standaloneUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5 font-mono text-xs"
                title="Open standalone full-page application"
              >
                <span>FULL PAGE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white transition-colors"
                title="View GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  soundFX.playKeyClick();
                  onClose();
                }}
                className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Simulator Body */}
          <div className="flex-1 overflow-y-auto mt-5 pr-1 space-y-4">
            {project.id === 'PROJ-01' && <DevSecOpsSimulator />}
            {project.id === 'PROJ-02' && <JumpCloudTrackerDemo />}
            {project.id === 'PROJ-03' && <EndpointHardeningConsole />}
          </div>

          {/* Footer Telemetry */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">● SIMULATOR ACTIVE</span>
              <span className="text-slate-600">|</span>
              <span>STANDALONE ROUTE: {standaloneUrl}</span>
            </div>
            <div className="text-cyan-400">
              ENGINEERED BY ANU SAH // CYBER-OPS
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
