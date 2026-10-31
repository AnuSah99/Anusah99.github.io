import React, { useState } from 'react';
import {
  Play,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

interface SecurityPolicy {
  name: string;
  category: string;
  status: 'enforced' | 'vulnerable';
  description: string;
  remediationCommand: string;
}

export const EndpointHardeningConsole: React.FC = () => {
  const [targetOS, setTargetOS] = useState<'windows' | 'linux'>('windows');
  const [remediating, setRemediating] = useState(false);
  const [auditMessage, setAuditMessage] = useState<string | null>(null);

  const [windowsPolicies, setWindowsPolicies] = useState<SecurityPolicy[]>([
    {
      name: 'LSASS RunAsPPL Protection',
      category: 'Credential Safeguard',
      status: 'enforced',
      description: 'Isolates LSASS.exe process memory, blocking Mimikatz cleartext credential dumps.',
      remediationCommand: 'Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa" -Name "RunAsPPL" -Value 1'
    },
    {
      name: 'SMBv1 Legacy Protocol',
      category: 'Network Protocol',
      status: 'enforced',
      description: 'Disables deprecated SMBv1 to neutralize EternalBlue (MS17-010) lateral movement.',
      remediationCommand: 'Disable-WindowsOptionalFeature -Online -FeatureName "SMB1Protocol" -NoRestart'
    },
    {
      name: 'LLMNR & NetBIOS over TCP',
      category: 'Name Resolution',
      status: 'enforced',
      description: 'Mitigates NTLM relay attacks and Responder poisoning across subnet broadcasts.',
      remediationCommand: 'Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\DNSClient" -Name "EnableMulticast" -Value 0'
    },
    {
      name: 'WDigest Cleartext Caching',
      category: 'Authentication',
      status: 'enforced',
      description: 'Forces Digest SSP to never store plaintext credentials in system memory.',
      remediationCommand: 'Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\WDigest" -Name "UseLogonCredential" -Value 0'
    },
    {
      name: 'BitLocker Volume Encryption',
      category: 'Data-at-Rest',
      status: 'enforced',
      description: 'Enforces hardware TPM 2.0 with XTS-AES 256-bit full disk volume encryption on C:.',
      remediationCommand: 'Enable-BitLocker -MountPoint "C:" -EncryptionMethod XtsAes256 -UsedSpaceOnly'
    },
    {
      name: 'SentinelOne Agent Heartbeat',
      category: 'EDR Integration',
      status: 'enforced',
      description: 'Real-time telemetry and autonomous behavioral AI engine active under SiteToken.',
      remediationCommand: 'Start-Service -Name "SentinelAgent"'
    }
  ]);

  const [linuxPolicies, setLinuxPolicies] = useState<SecurityPolicy[]>([
    {
      name: 'Kernel TCP SYN Cookies',
      category: 'Network Stack',
      status: 'enforced',
      description: 'Prevents TCP SYN flood exhaustion via sysctl net.ipv4.tcp_syncookies = 1.',
      remediationCommand: 'sysctl -w net.ipv4.tcp_syncookies=1'
    },
    {
      name: 'OpenSSH Root Login & Password Auth',
      category: 'Remote Access',
      status: 'enforced',
      description: 'Enforces SSH key-only access (Ed25519) and drops direct root login attempts.',
      remediationCommand: 'sed -i "s/^#PermitRootLogin.*/PermitRootLogin no/" /etc/ssh/sshd_config'
    },
    {
      name: 'UFW Firewall Default Policy',
      category: 'Perimeter Defense',
      status: 'enforced',
      description: 'Enforces default-drop for all unsolicited incoming packets across network interfaces.',
      remediationCommand: 'ufw default deny incoming && ufw --force enable'
    },
    {
      name: 'Reverse Path Filtering (rp_filter)',
      category: 'Spoofing Defense',
      status: 'enforced',
      description: 'Drops spoofed packets whose source IP does not match kernel routing table rules.',
      remediationCommand: 'sysctl -w net.ipv4.conf.all.rp_filter=1'
    }
  ]);

  const activePolicies = targetOS === 'windows' ? windowsPolicies : linuxPolicies;

  const handleSimulateAttack = () => {
    soundFX.playCommandChirp();
    if (targetOS === 'windows') {
      setWindowsPolicies((prev) =>
        prev.map((p, idx) => (idx === 0 || idx === 2 ? { ...p, status: 'vulnerable' } : p))
      );
    } else {
      setLinuxPolicies((prev) =>
        prev.map((p, idx) => (idx === 1 ? { ...p, status: 'vulnerable' } : p))
      );
    }
    setAuditMessage('⚠ Drift Detected: Unauthorized policy change identified on local node!');
    setTimeout(() => setAuditMessage(null), 5000);
  };

  const handleRunRemediation = async () => {
    soundFX.playKeyClick();
    setRemediating(true);
    setAuditMessage('Executing automated remediation script (Harden-Endpoint.ps1)...');

    await new Promise((r) => setTimeout(r, 1400));

    if (targetOS === 'windows') {
      setWindowsPolicies((prev) => prev.map((p) => ({ ...p, status: 'enforced' })));
    } else {
      setLinuxPolicies((prev) => prev.map((p) => ({ ...p, status: 'enforced' })));
    }

    setRemediating(false);
    setAuditMessage('✔ 100% CIS Compliance Restored! All endpoints hardened.');
    soundFX.playSuccessAccess();
    setTimeout(() => setAuditMessage(null), 4000);
  };

  return (
    <div className="space-y-6 text-slate-200">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-white font-mono">
              ENTERPRISE ENDPOINT HARDENING & TELEMETRY SUITE
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            PowerShell 7 & Bash CIS Benchmark automation module for Windows 11 Enterprise and Linux Server hosts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* OS Switcher */}
          <div className="p-1 rounded-xl bg-black border border-white/10 flex font-mono text-xs">
            <button
              onClick={() => {
                soundFX.playKeyClick();
                setTargetOS('windows');
              }}
              className={`px-3 py-1 rounded-lg transition-all ${
                targetOS === 'windows'
                  ? 'bg-violet-950/80 border border-violet-500/50 text-violet-300 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              WINDOWS 11
            </button>
            <button
              onClick={() => {
                soundFX.playKeyClick();
                setTargetOS('linux');
              }}
              className={`px-3 py-1 rounded-lg transition-all ${
                targetOS === 'linux'
                  ? 'bg-violet-950/80 border border-violet-500/50 text-violet-300 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              LINUX LTS
            </button>
          </div>

          {/* Simulate Drift */}
          <button
            onClick={handleSimulateAttack}
            className="px-3 py-1.5 rounded-xl font-mono text-xs font-semibold bg-slate-900 border border-white/10 hover:border-amber-400/50 text-slate-200 hover:text-white transition-all flex items-center gap-1.5"
            title="Simulate Configuration Drift"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">SIMULATE DRIFT</span>
          </button>

          {/* Auto Remediate */}
          <button
            onClick={handleRunRemediation}
            disabled={remediating}
            className="px-4 py-1.5 rounded-xl font-mono text-xs font-bold bg-violet-500/20 hover:bg-violet-500/30 border border-violet-400/60 text-violet-300 transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-50 active:scale-95"
          >
            <Play className={`w-3.5 h-3.5 ${remediating ? 'animate-spin' : ''}`} />
            <span>{remediating ? 'APPLYING FIX...' : 'REMEDIATE FLEET'}</span>
          </button>
        </div>
      </div>

      {/* Message Toast */}
      {auditMessage && (
        <div className="p-3 rounded-xl bg-violet-950/70 border border-violet-500/40 text-violet-300 text-xs font-mono flex items-center justify-between">
          <span>{auditMessage}</span>
          <button onClick={() => setAuditMessage(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Host Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
          <div className="text-[10px] text-slate-500">HOST IDENTIFIER</div>
          <div className="text-sm font-bold text-white">
            {targetOS === 'windows' ? 'SEC-CORP-W11-PROD' : 'SRV-SEC-UBUNTU-01'}
          </div>
          <div className="text-[10px] text-violet-400">Node Location: Gurugram</div>
        </div>

        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
          <div className="text-[10px] text-slate-500">EDR AGENT HEALTH</div>
          <div className="text-sm font-bold text-emerald-400">SentinelOne v23.4</div>
          <div className="text-[10px] text-cyan-400">Agent Heartbeat Active</div>
        </div>

        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
          <div className="text-[10px] text-slate-500">CIS BENCHMARK SCORE</div>
          <div className="text-sm font-bold text-violet-400">98.8% Compliance</div>
          <div className="text-[10px] text-slate-400">Level 1 Enterprise</div>
        </div>

        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
          <div className="text-[10px] text-slate-500">ENCRYPTION PROTOCOL</div>
          <div className="text-sm font-bold text-cyan-400">
            {targetOS === 'windows' ? 'BitLocker XTS-256' : 'LUKS2 dm-crypt'}
          </div>
          <div className="text-[10px] text-emerald-400">Hardware TPM 2.0</div>
        </div>
      </div>

      {/* Policy Hardening Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
        {activePolicies.map((policy) => (
          <div
            key={policy.name}
            className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
              policy.status === 'enforced'
                ? 'bg-slate-900/60 border-white/10'
                : 'bg-rose-950/40 border-rose-500/60 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-violet-400 uppercase tracking-wider font-bold">
                  {policy.category}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                    policy.status === 'enforced'
                      ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400'
                      : 'bg-rose-950/80 border border-rose-500/60 text-rose-300 animate-pulse'
                  }`}
                >
                  {policy.status === 'enforced' ? (
                    <>
                      <CheckCircle className="w-3 h-3" /> HARDENED
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3 h-3" /> VULNERABLE
                    </>
                  )}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-1.5">{policy.name}</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed mb-3">
                {policy.description}
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-black/60 border border-white/5 text-[10px] text-slate-300 font-mono overflow-x-auto">
              <span className="text-violet-400 mr-1.5">&gt;</span>
              <code>{policy.remediationCommand}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
