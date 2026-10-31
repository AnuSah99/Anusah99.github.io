import React, { useState } from 'react';
import {
  RotateCw,
  Send,
  Laptop,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

interface Endpoint {
  id: string;
  hostname: string;
  assignedUser: string;
  os: string;
  lastContactHours: number;
  patchVersion: string;
  status: 'compliant' | 'warning' | 'critical';
  quarantine: boolean;
}

const INITIAL_ENDPOINTS: Endpoint[] = [
  {
    id: 'JC-8821',
    hostname: 'SEC-HQ-M3PRO-01',
    assignedUser: 'anu.sah@cyberops.internal',
    os: 'macOS Sonoma 14.5',
    lastContactHours: 2,
    patchVersion: '23F79 (Current)',
    status: 'compliant',
    quarantine: false
  },
  {
    id: 'JC-4912',
    hostname: 'FIN-W11-CORP-42',
    assignedUser: 'vikram.mehta@authbridge.com',
    os: 'Windows 11 23H2',
    lastContactHours: 6,
    patchVersion: 'KB5037771',
    status: 'compliant',
    quarantine: false
  },
  {
    id: 'JC-9104',
    hostname: 'DEV-UBUNTU-WORKSTATION',
    assignedUser: 'rohit.verma@tech.corp',
    os: 'Ubuntu 22.04 LTS',
    lastContactHours: 210,
    patchVersion: 'Linux 5.15.0-89 (Outdated)',
    status: 'warning',
    quarantine: false
  },
  {
    id: 'JC-3129',
    hostname: 'LEGAL-WIN10-LAPTOP',
    assignedUser: 'priya.sharma@legal.corp',
    os: 'Windows 10 21H2',
    lastContactHours: 412,
    patchVersion: 'KB5005565 (Unsupported)',
    status: 'critical',
    quarantine: true
  },
  {
    id: 'JC-7731',
    hostname: 'ENG-M2AIR-99',
    assignedUser: 'arjun.singh@devops.corp',
    os: 'macOS Ventura 13.6',
    lastContactHours: 260,
    patchVersion: '22G120 (Drifted)',
    status: 'warning',
    quarantine: false
  },
  {
    id: 'JC-1054',
    hostname: 'HR-THINKPAD-X1',
    assignedUser: 'sneha.patel@authbridge.com',
    os: 'Windows 11 22H2',
    lastContactHours: 520,
    patchVersion: 'KB5018427 (Critical Drift)',
    status: 'critical',
    quarantine: false
  }
];

export const JumpCloudTrackerDemo: React.FC = () => {
  const [endpoints, setEndpoints] = useState<Endpoint[]>(INITIAL_ENDPOINTS);
  const [filter, setFilter] = useState<'all' | 'compliant' | 'warning' | 'critical'>('all');
  const [search, setSearch] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const filteredEndpoints = endpoints.filter((item) => {
    const matchesFilter = filter === 'all' || item.status === filter;
    const matchesSearch =
      item.hostname.toLowerCase().includes(search.toLowerCase()) ||
      item.assignedUser.toLowerCase().includes(search.toLowerCase()) ||
      item.os.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const compliantCount = endpoints.filter((e) => e.status === 'compliant').length;
  const warningCount = endpoints.filter((e) => e.status === 'warning').length;
  const criticalCount = endpoints.filter((e) => e.status === 'critical').length;

  const handleSyncAPI = async () => {
    soundFX.playKeyClick();
    setIsSyncing(true);
    setActionNotice('Querying JumpCloud Directory API (/v2/systems)...');
    await new Promise((r) => setTimeout(r, 1200));
    setIsSyncing(false);
    setActionNotice('✔ Synchronized 1,500 endpoints. Google Sheets telemetry updated.');
    soundFX.playSuccessAccess();
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleDispatchSlack = () => {
    soundFX.playKeyClick();
    setActionNotice(`🚀 Dispatched webhook payload to #secops-alerts for ${criticalCount} unpatched devices.`);
    soundFX.playCommandChirp();
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleToggleQuarantine = (id: string) => {
    soundFX.playKeyClick();
    setEndpoints((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const newQuarantine = !e.quarantine;
          setActionNotice(
            newQuarantine
              ? `[ACTION] Enforced Zero-Trust Network Quarantine on ${e.hostname}`
              : `[ACTION] Released ${e.hostname} from Quarantine`
          );
          return { ...e, quarantine: newQuarantine };
        }
        return e;
      })
    );
    setTimeout(() => setActionNotice(null), 3500);
  };

  return (
    <div className="space-y-6 text-slate-200">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-white font-mono">
              JUMPCLOUD CLOUD IAM & PATCH TELEMETRY ENGINE
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Autonomous fleet compliance auditor integrating JumpCloud Directory-as-a-Service with Google Workspace Sheets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSyncAPI}
            disabled={isSyncing}
            className="px-3.5 py-2 rounded-xl font-mono text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/60 text-emerald-300 transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 active:scale-95"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'SYNCING API...' : 'POLL JUMPCLOUD API'}</span>
          </button>

          <button
            onClick={handleDispatchSlack}
            className="px-3.5 py-2 rounded-xl font-mono text-xs font-semibold bg-slate-900 border border-white/10 hover:border-cyan-400/50 text-slate-200 hover:text-white transition-all flex items-center gap-1.5"
            title="Dispatch Webhook Alert"
          >
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">DISPATCH ALERT</span>
          </button>
        </div>
      </div>

      {/* Action Notification Toast */}
      {actionNotice && (
        <div className="p-3 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center justify-between animate-fadeIn">
          <span>{actionNotice}</span>
          <button onClick={() => setActionNotice(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
          <div className="text-[10px] text-slate-500">FLEET TOTAL</div>
          <div className="text-lg font-bold text-white">1,500 Nodes</div>
          <div className="text-[10px] text-slate-400">JumpCloud DaaS</div>
        </div>

        <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/30">
          <div className="text-[10px] text-emerald-400">COMPLIANT (99.4%)</div>
          <div className="text-lg font-bold text-emerald-400">{compliantCount} / {endpoints.length} Active</div>
          <div className="text-[10px] text-slate-400">&lt; 7 Days Contact</div>
        </div>

        <div className="p-3 rounded-xl bg-black/40 border border-amber-500/30">
          <div className="text-[10px] text-amber-400">PATCH DRIFT</div>
          <div className="text-lg font-bold text-amber-400">{warningCount} Devices</div>
          <div className="text-[10px] text-slate-400">8–14 Days Inactive</div>
        </div>

        <div className="p-3 rounded-xl bg-black/40 border border-rose-500/30">
          <div className="text-[10px] text-rose-400">SLA BREACHED</div>
          <div className="text-lg font-bold text-rose-400">{criticalCount} Devices</div>
          <div className="text-[10px] text-slate-400">&gt; 14 Days (Flagged)</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 font-mono text-xs">
          {[
            { id: 'all', label: 'ALL DEVICES' },
            { id: 'compliant', label: 'COMPLIANT' },
            { id: 'warning', label: 'WARNING' },
            { id: 'critical', label: 'CRITICAL DRIFT' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFX.playKeyClick();
                setFilter(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                filter === tab.id
                  ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 font-bold'
                  : 'bg-slate-900/60 border border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hostname, user..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Live Device Table */}
      <div className="rounded-2xl bg-black/60 border border-white/10 overflow-hidden font-mono text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-slate-900/80 text-[10px] text-slate-400 uppercase">
                <th className="py-2.5 px-4">ENDPOINT // HOST</th>
                <th className="py-2.5 px-4">ASSIGNED USER</th>
                <th className="py-2.5 px-4">OPERATING SYSTEM</th>
                <th className="py-2.5 px-4">LAST CONTACT</th>
                <th className="py-2.5 px-4">PATCH POSTURE</th>
                <th className="py-2.5 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredEndpoints.map((ep) => (
                <tr key={ep.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Laptop className="w-3.5 h-3.5 text-cyan-400" />
                      <div>
                        <div className="font-bold text-white">{ep.hostname}</div>
                        <div className="text-[10px] text-slate-500">{ep.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{ep.assignedUser}</td>
                  <td className="py-3 px-4 text-slate-400">{ep.os}</td>
                  <td className="py-3 px-4">
                    <span className="text-slate-300">
                      {ep.lastContactHours < 24
                        ? `${ep.lastContactHours}h ago`
                        : `${Math.round(ep.lastContactHours / 24)} days ago`}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      {ep.status === 'compliant' && (
                        <span className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> COMPLIANT
                        </span>
                      )}
                      {ep.status === 'warning' && (
                        <span className="px-2 py-0.5 rounded bg-amber-950/70 border border-amber-500/40 text-amber-400 text-[10px] font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> DRIFT ({ep.patchVersion})
                        </span>
                      )}
                      {ep.status === 'critical' && (
                        <span className="px-2 py-0.5 rounded bg-rose-950/70 border border-rose-500/40 text-rose-400 text-[10px] font-bold flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> NON-COMPLIANT
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleToggleQuarantine(ep.id)}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                        ep.quarantine
                          ? 'bg-rose-950 border border-rose-500 text-rose-300 hover:bg-rose-900'
                          : 'bg-slate-900 border border-white/10 text-slate-300 hover:border-cyan-400 hover:text-white'
                      }`}
                    >
                      {ep.quarantine ? 'ISOLATED [RELEASE]' : 'QUARANTINE'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
