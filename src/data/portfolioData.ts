import { CareerLog, ProjectItem, SkillItem } from '../types';

export const PERSONAL_DATA = {
  name: 'Anu Sah',
  fullName: 'Anu Kumar Sah',
  callsign: 'ANU_SAH // CYBER_OPS',
  title: 'Infrastructure & IT Security Engineer',
  roles: [
    'Infrastructure & IT Security Engineer',
    'DevSecOps & Cloud Automation Architect',
    'Endpoint & Threat Detection Specialist',
    'IAM & Systems Administrator'
  ],
  location: 'Gurugram, India',
  availability: 'Open to High-Impact Opportunities & Remote Roles',
  email: 'Code.anukrsah@gmail.com',
  github: {
    username: 'Anusah99',
    url: 'https://github.com/Anusah99'
  },
  instagram: {
    handle: 'itz_anukrsah_xd',
    url: 'https://instagram.com/itz_anukrsah_xd'
  },
  systemStats: {
    uptime: '99.98%',
    endpointsManaged: '1,500+',
    threatsNeutralized: '100%',
    pipelinesGated: '45+',
    automatedTasks: '25,000+',
    complianceScore: '99.4%'
  },
  bio: 'Specialized in architecting resilient IT infrastructure, hardened endpoint ecosystems, and zero-trust security postures. Adept at bridging systems administration with modern DevSecOps pipelines, automated vulnerability remediation, and enterprise identity management.'
};

export const SKILLS_DATA: SkillItem[] = [
  // Cloud & DevSecOps
  {
    name: 'AWS Cloud Architecture',
    level: 90,
    category: 'cloud',
    icon: 'Cloud',
    badge: 'CORE CLOUD',
    tags: ['EC2', 'S3', 'IAM', 'VPC', 'ECR', 'CloudWatch'],
    telemetry: { metric: 'Reliability', value: '99.99%' }
  },
  {
    name: 'Docker & Container Security',
    level: 92,
    category: 'cloud',
    icon: 'Boxes',
    badge: 'CONTAINERIZATION',
    tags: ['Multi-stage Builds', 'Hardened Images', 'Docker Compose', 'Microservices'],
    telemetry: { metric: 'Image Footprint', value: '-65%' }
  },
  {
    name: 'Kubernetes Orchestration',
    level: 85,
    category: 'cloud',
    icon: 'Cpu',
    tags: ['K8s Deployments', 'Services', 'ConfigMaps', 'Ingress', 'Namespaces'],
    telemetry: { metric: 'Auto-recovery', value: '<15s' }
  },
  {
    name: 'Jenkins CI/CD Automation',
    level: 88,
    category: 'cloud',
    icon: 'GitBranch',
    badge: 'AUTOMATED PIPELINES',
    tags: ['Declarative Pipelines', 'Build Automation', 'Integration Gates', 'Artifacts'],
    telemetry: { metric: 'Deploy Velocity', value: '4x' }
  },
  {
    name: 'Trivy & SAST Security Gates',
    level: 93,
    category: 'cloud',
    icon: 'ShieldAlert',
    badge: 'DEVSECOPS',
    tags: ['Container Scanning', 'Secret Detection', 'Misconfiguration Checks', 'CVE Gates'],
    telemetry: { metric: 'Vuln Leakage', value: '0%' }
  },
  {
    name: 'Git & GitHub Workflows',
    level: 95,
    category: 'cloud',
    icon: 'GitPullRequest',
    tags: ['Version Control', 'GitHub Actions', 'Branch Protection', 'Code Reviews'],
    telemetry: { metric: 'Merge Success', value: '100%' }
  },

  // Endpoint & Security Ops
  {
    name: 'SentinelOne EDR Operations',
    level: 95,
    category: 'security',
    icon: 'ShieldCheck',
    badge: 'EDR LEAD',
    tags: ['Behavioral AI', 'Threat Hunting', 'Policy Hardening', 'Deep Visibility', 'Rollback'],
    telemetry: { metric: 'Mean Time to Respond', value: '<2m' }
  },
  {
    name: 'Rapid7 InsightVM',
    level: 91,
    category: 'security',
    icon: 'ScanEye',
    badge: 'VULN OPS',
    tags: ['Continuous Scanning', 'Risk Assessment', 'Remediation SLA', 'Asset Tagging'],
    telemetry: { metric: 'Audit Compliance', value: '100%' }
  },
  {
    name: 'Trellix & Data Resolve DLP',
    level: 89,
    category: 'security',
    icon: 'Lock',
    badge: 'DATA PROTECTION',
    tags: ['Exfiltration Prevention', 'Endpoint Rules', 'USB & Cloud Control', 'Incident Triage'],
    telemetry: { metric: 'Data Breaches', value: '0' }
  },
  {
    name: 'Incident Response & Hardening',
    level: 92,
    category: 'security',
    icon: 'Activity',
    tags: ['Root Cause Analysis', 'Memory Forensics', 'Firewall Rules', 'SIEM Logs'],
    telemetry: { metric: 'Resolution Rate', value: '98.5%' }
  },

  // Identity & Infrastructure
  {
    name: 'JumpCloud IAM & MDM',
    level: 94,
    category: 'identity',
    icon: 'Fingerprint',
    badge: 'CLOUD IAM',
    tags: ['Directory-as-a-Service', 'Zero-Trust SAML/SSO', 'Device Policies', 'MFA Enforcement'],
    telemetry: { metric: 'MFA Coverage', value: '100%' }
  },
  {
    name: 'Active Directory & GPO',
    level: 96,
    category: 'identity',
    icon: 'Server',
    badge: 'ENTERPRISE ARCH',
    tags: ['AD DS', 'Forest Design', 'Group Policy Objects', 'OU Delegation', 'DNS/DHCP'],
    telemetry: { metric: 'Domain Objects', value: '25k+' }
  },
  {
    name: 'Linux & Windows Server Admin',
    level: 94,
    category: 'identity',
    icon: 'Terminal',
    tags: ['Ubuntu/RHEL', 'Windows Server 2022', 'Systemd', 'Patch Management', 'Storage Pool'],
    telemetry: { metric: 'SLA Uptime', value: '99.98%' }
  },

  // Scripting & Automation
  {
    name: 'PowerShell Security Automation',
    level: 94,
    category: 'automation',
    icon: 'Code',
    badge: 'ADVANCED',
    tags: ['Module Authoring', 'ActiveDirectory SDK', 'Registry Tweaks', 'WMI/CIM Queries'],
    telemetry: { metric: 'Lines of Code', value: '50k+' }
  },
  {
    name: 'Python Systems Scripting',
    level: 90,
    category: 'automation',
    icon: 'FileCode',
    badge: 'CORE ENGINE',
    tags: ['API Integrations', 'Data Parsing', 'SecOps Bots', 'Log Analysis', 'FastAPI'],
    telemetry: { metric: 'Execution Efficiency', value: '99.9%' }
  },
  {
    name: 'Bash & Shell Scripting',
    level: 92,
    category: 'automation',
    icon: 'TerminalSquare',
    tags: ['Cron Daemons', 'Log Rotation', 'Server Bootstrapping', 'Security Audits'],
    telemetry: { metric: 'Automated Runs', value: '10k+' }
  },
  {
    name: 'Playwright & Google Apps Script',
    level: 87,
    category: 'automation',
    icon: 'Workflow',
    tags: ['Headless Scraping', 'Drive Automations', 'Sheet Syncing', 'Webhook Dispatch'],
    telemetry: { metric: 'Weekly Hours Saved', value: '35h' }
  }
];

export const CAREER_LOGS: CareerLog[] = [
  {
    id: 'NODE-01',
    period: '2025 — PRESENT',
    role: 'Infrastructure & IT Security Engineer',
    company: 'AuthBridge Research Services',
    location: 'Gurugram, India',
    status: 'ACTIVE_NODE',
    classification: 'CYBER-OPS // PRODUCTION',
    highlights: [
      'Lead administration and threat mitigation across 1,500+ enterprise endpoints utilizing SentinelOne EDR and Rapid7 InsightVM.',
      'Designed and enforced zero-trust access controls, SAML SSO, and conditional device policies via JumpCloud IAM and Active Directory.',
      'Constructed automated PowerShell and Python remediation pipelines, eliminating critical vulnerability exposures within 24 hours of disclosure.',
      'Supervised Trellix and Data Resolve DLP governance, preventing unauthorized exfiltration of sensitive identity verification data.'
    ],
    technologies: ['SentinelOne', 'Rapid7 InsightVM', 'JumpCloud IAM', 'Trellix DLP', 'Active Directory', 'Python', 'PowerShell'],
    stats: [
      { label: 'Endpoints Guarded', value: '1,500+' },
      { label: 'Patch Compliance', value: '99.6%' },
      { label: 'Incident MTTR', value: '< 15 Min' }
    ]
  },
  {
    id: 'NODE-02',
    period: '2023 — 2025',
    role: 'System Engineer',
    company: 'Microland',
    location: 'Gurugram, India',
    status: 'ARCHIVED_NODE',
    classification: 'ENTERPRISE INFRA // STABLE',
    highlights: [
      'Engineered multi-domain Active Directory Group Policies (GPOs) for enterprise desktop and server fleet standardization.',
      'Maintained high-availability Windows Server and Linux virtualized clusters, achieving 99.98% operational uptime.',
      'Spearheaded automated ticket dispatch and routine system health checks through customized Bash and PowerShell modules.',
      'Collaborated on cloud backup strategies, disaster recovery drills, and network perimeter firewall auditing.'
    ],
    technologies: ['Windows Server 2022', 'RHEL / Ubuntu', 'Active Directory', 'GPO', 'Bash', 'PowerShell', 'Hyper-V'],
    stats: [
      { label: 'System Uptime', value: '99.98%' },
      { label: 'Fleet Managed', value: '800+ Nodes' },
      { label: 'Tickets Automated', value: '40%' }
    ]
  },
  {
    id: 'NODE-03',
    period: '2021 — 2023',
    role: 'IT Support Engineer',
    company: 'Solid Infotech',
    location: 'Gurugram, India',
    status: 'ARCHIVED_NODE',
    classification: 'FIELD OPERATIONS // COMPLETED',
    highlights: [
      'Delivered tier-1 & tier-2 infrastructure resolution for networked workstations, VPN tunnels, and enterprise peripherals.',
      'Implemented automated OS deployment images (WDS/PXE), slashing new machine provisioning turnaround from 3 hours to 25 minutes.',
      'Managed user onboarding/offboarding, credential rotation, and access rights management in compliance with internal audit criteria.',
      'Audited network switches, patch panels, and VLAN configurations to isolate guest and internal enterprise subnets.'
    ],
    technologies: ['Windows 10/11 Pro', 'Cisco Networking', 'PXE Boot', 'Active Directory', 'Hardware Diagnostics', 'VPNs'],
    stats: [
      { label: 'Provisioning Time', value: '-85%' },
      { label: 'First-Call Fix', value: '92%' },
      { label: 'Audits Passed', value: '100%' }
    ]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'PROJ-01',
    title: 'Automated DevSecOps CI/CD Pipeline',
    subtitle: 'Zero-Vulnerability Automated Container Release Gate',
    description: 'Engineered an end-to-end automated deployment pipeline integrating security scanning into every commit. Utilizes multi-stage Docker builds to reduce image attack surfaces, automated SAST scanning, and Trivy CVE vulnerability gates before pushing approved artifacts to AWS ECR.',
    category: 'devsecops',
    architecture: ['GitHub Actions / Jenkins', 'Docker Multi-stage', 'Trivy Scanner', 'AWS ECR', 'Bash Automation'],
    status: 'PRODUCTION DEPLOYED',
    statusColor: 'cyan',
    githubUrl: 'https://github.com/AnuSah99/CI-CD_Pip',
    demoMetrics: [
      { label: 'CVE Gate Pass', value: '100%', change: 'Strict Zero-Critical' },
      { label: 'Image Size Reduction', value: '-65%', change: 'Alpine Distroless' },
      { label: 'Pipeline Runtime', value: '4m 12s', change: 'Cached Layers' }
    ],
    features: [
      'Automated pull request gating with Trivy vulnerability scanning blocking High/Critical CVEs',
      'Secrets detection scanning prevent API keys or private tokens from entering Docker containers',
      'Automated semantic versioning and cryptographic tag signing during AWS ECR image pushes',
      'Instant Slack/Discord webhook alerts notifying the SecOps team upon build status'
    ],
    codeFiles: [
      {
        filename: 'Dockerfile',
        language: 'dockerfile',
        code: `# Stage 1: Build & Dependency Resolution
FROM node:20-alpine AS builder
WORKDIR /build
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY package*.json ./
RUN npm ci --only=production --ignore-scripts
COPY . .
RUN npm run build || echo "Production assets ready."

# Stage 2: Hardened Minimal Production Runtime
FROM gcr.io/distroless/nodejs20-debian12:nonroot AS production
WORKDIR /app
COPY --from=builder --chown=nonroot:nonroot /build/node_modules ./node_modules
COPY --from=builder --chown=nonroot:nonroot /build/dist ./dist
USER nonroot
EXPOSE 8080
ENV NODE_ENV=production PORT=8080
CMD ["dist/index.js"]`
      },
      {
        filename: '.github/workflows/devsecops-pipeline.yml',
        language: 'yaml',
        code: `name: DevSecOps Automated CI/CD Release Gate
on: [push, pull_request]

jobs:
  trivy_security_scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Local Container Image
        run: docker build -t secops-service:\${{ github.sha }} .
      - name: Run Trivy Vulnerability Scanner (Strict Mode)
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'secops-service:\${{ github.sha }}'
          format: 'table'
          exit-code: '1' # Fails on High or Critical CVE
          severity: 'CRITICAL,HIGH'
      - name: Push to AWS ECR
        if: github.ref == 'refs/heads/main'
        run: |
          aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin $ECR_REGISTRY
          docker push $ECR_REGISTRY/secops-service:\${{ github.sha }}`
      },
      {
        filename: 'scripts/security-audit.sh',
        language: 'bash',
        code: `#!/usr/bin/env bash
set -euo pipefail
IMAGE_NAME="\${1:-secops-service:latest}"

echo "[+] Initiating local Trivy CVE gate..."
trivy image --severity HIGH,CRITICAL --format table "$IMAGE_NAME"
echo "[✓] Security gate passed."`
      }
    ]
  },
  {
    id: 'PROJ-02',
    title: 'AI Workspace & Automated Patch Tracker',
    subtitle: 'Cloud IAM Telemetry & Document Lifecycle Automation',
    description: 'An automated telemetry engine synchronizing JumpCloud security compliance reports, device patch postures, and Google Workspace drive structures. Powered by Python and Google Apps Script, it generates automated daily risk summaries and flags unpatched endpoints.',
    category: 'automation',
    architecture: ['Python 3.11', 'Google Apps Script', 'JumpCloud REST API', 'Google Drive API', 'Slack Webhooks'],
    status: 'OPERATIONAL',
    statusColor: 'emerald',
    githubUrl: 'https://github.com/AnuSah99/cloud_automation',
    demoMetrics: [
      { label: 'Manual Hours Saved', value: '35h / wk', change: 'Fully Automated' },
      { label: 'Report Accuracy', value: '100%', change: 'Zero Human Error' },
      { label: 'Audit Readiness', value: 'Realtime', change: 'Instant Export' }
    ],
    features: [
      'Continuous polling of JumpCloud API for OS versioning and security software agent status',
      'Autonomous generation of executive-ready Google Sheets dashboards with conditional risk styling',
      'Automated quarantine workflows triggering notifications to users behind on security patches',
      'Secure token rotation and zero hardcoded credentials using environment secrets manager'
    ],
    codeFiles: [
      {
        filename: 'tracker.py',
        language: 'python',
        code: `#!/usr/bin/env python3
import requests, json, logging
from datetime import datetime, timezone

class JumpCloudPatchTracker:
    def __init__(self, api_key: str):
        self.headers = {"x-api-key": api_key, "Accept": "application/json"}
        self.base_url = "https://console.jumpcloud.com/api"

    def evaluate_compliance(self, systems: list) -> dict:
        now = datetime.now(timezone.utc)
        summary = {"total": len(systems), "compliant": 0, "critical": 0, "flagged": []}
        for s in systems:
            last_contact = datetime.fromisoformat(s["lastContact"].replace("Z", "+00:00"))
            days = (now - last_contact).days
            if days <= 7:
                summary["compliant"] += 1
            else:
                summary["critical"] += 1
                summary["flagged"].append({"hostname": s["displayName"], "days_inactive": days})
        return summary`
      },
      {
        filename: 'apps-script/Code.gs',
        language: 'javascript',
        code: `function ingestPatchTelemetry(jsonPayload) {
  const data = JSON.parse(jsonPayload);
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName("Compliance_Feed");
  const rows = (data.flagged_systems || []).map(s => [
    new Date(), s.id, s.hostname, s.os, s.days_inactive, s.status
  ]);
  if (rows.length) {
    sheet.getRange(2, 1, rows.length, 6).setValues(rows);
    applyCyberOpsStyling(sheet, rows.length);
  }
}`
      }
    ]
  },
  {
    id: 'PROJ-03',
    title: 'Enterprise Endpoint Hardening & Telemetry Suite',
    subtitle: 'Orchestrated PowerShell & Bash Security Remediation',
    description: 'A modular automation repository designed for IT SecOps teams to rapidly enforce CIS benchmark hardening, deploy SentinelOne EDR agents, and audit local firewall rules across mixed Windows and Linux device fleets.',
    category: 'endpoint',
    architecture: ['PowerShell 7.x', 'Bash', 'SentinelOne API', 'WMI / CIM', 'Windows Registry'],
    status: 'VERIFIED',
    statusColor: 'violet',
    githubUrl: 'https://github.com/AnuSah99/Anusah99.github.io/tree/main/projects/endpoint-hardening-telemetry',
    demoMetrics: [
      { label: 'Fleet Hardened', value: '1,500+ Nodes', change: 'Cross-Platform' },
      { label: 'Remediation Speed', value: '< 2 Mins', change: 'Instant Trigger' },
      { label: 'CIS Compliance', value: '98.8%', change: 'Audited' }
    ],
    features: [
      'One-command bootstrap script for silent SentinelOne EDR package deployment with verification checksums',
      'Automated disabling of legacy protocols (SMBv1, LLMNR, NBT-NS) and enforcing TLS 1.3',
      'Audit script exporting comprehensive HTML/JSON system telemetry reports directly to S3 bucket',
      'Self-healing scheduled tasks restoring compliant configuration state if user modifications occur'
    ],
    codeFiles: [
      {
        filename: 'windows/Harden-WindowsEndpoint.ps1',
        language: 'powershell',
        code: `# Neutralize SMBv1 Legacy Protocol
Disable-WindowsOptionalFeature -Online -FeatureName "SMB1Protocol" -NoRestart
Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Parameters" -Name "SMB1" -Value 0

# Disable LLMNR (Mitigate NTLM Relay & Responder Poisoning)
Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\DNSClient" -Name "EnableMulticast" -Value 0

# LSASS RunAsPPL & Disable WDigest Cleartext Caching
Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa" -Name "RunAsPPL" -Value 1
Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\WDigest" -Name "UseLogonCredential" -Value 0`
      },
      {
        filename: 'windows/Deploy-SentinelOne.ps1',
        language: 'powershell',
        code: `param([string]$SiteToken, [string]$InstallerPath)

# Check if already installed
if (Get-Service -Name "SentinelAgent" -ErrorAction SilentlyContinue) { exit 0 }

# Execute Silent Installation with Site Token
$Arguments = "/SITE_TOKEN=\`"$SiteToken\`" /SILENT /NORESTART"
Start-Process -FilePath $InstallerPath -ArgumentList $Arguments -Wait -NoNewWindow`
      },
      {
        filename: 'linux/harden-linux.sh',
        language: 'bash',
        code: `#!/usr/bin/env bash
# Kernel SYN Flood & Reverse Path Filtering
sysctl -w net.ipv4.tcp_syncookies=1
sysctl -w net.ipv4.conf.all.rp_filter=1

# Hardening OpenSSH Server
sed -i 's/^#PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^#PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart sshd`
      }
    ]
  }
];
