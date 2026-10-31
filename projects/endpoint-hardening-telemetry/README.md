# 🛡️ Enterprise Endpoint Hardening & Telemetry Suite
### Automated PowerShell & Bash Remediation for CIS Compliance and EDR Operations

[![PowerShell](https://img.shields.io/badge/PowerShell-7.x%20%2F%205.1-blue?style=for-the-badge&logo=powershell)](https://github.com/Anusah99)
[![SentinelOne](https://img.shields.io/badge/SentinelOne-EDR%20Autonomous-purple?style=for-the-badge)](https://github.com/Anusah99)
[![Bash](https://img.shields.io/badge/Bash-Hardened%20Linux-emerald?style=for-the-badge&logo=gnubash)](https://github.com/Anusah99)
[![Author](https://img.shields.io/badge/Author-Anu%20Sah-blueviolet?style=for-the-badge)](https://github.com/Anusah99)

---

## 📌 Mission & Architecture

Securing mixed fleets of **1,500+ Windows & Linux endpoints** against initial access, lateral movement, and credential theft requires programmatic configuration enforcement.

This suite provides modular, idempotently-designed PowerShell and Bash modules enforcing **Center for Internet Security (CIS) Level 1 & Level 2 Benchmarks**, silently deploying **SentinelOne EDR agents**, and generating cryptographic telemetry audits.

```
+----------------------------------------------------------------------------------------------------+
|                             ENDPOINT HARDENING & TELEMETRY SUITE                                   |
+----------------------------------------------------------------------------------------------------+
  [ Endpoint Boot / MDM Policy ] ──> [ SentinelOne EDR Silent Deployment (Deploy-SentinelOne.ps1) ]
                                                        │
                                                        ▼
  [ CIS Baseline Hardening ] <── [ Insecure Protocol Nullification (SMBv1, LLMNR, NetBIOS) ]
            │
            ├───────────────────────────────────────────┬──────────────────────────────────┐
            ▼                                           ▼                                  ▼
  [ BitLocker / TPM 2.0 State ]               [ TLS 1.3 / Cipher Suites ]       [ Telemetry Auditor ]
```

---

## 🚀 Key Modules & Remediation Rules

### 1. Insecure Protocol Neutralization (`Harden-WindowsEndpoint.ps1`)
- **SMBv1 Disabled:** Completely nullifies legacy SMBv1 drivers vulnerable to EternalBlue / WannaCry exploits.
- **LLMNR & NetBIOS Disabled:** Shuts down Link-Local Multicast Name Resolution (UDP 5355) and NBT-NS to defeat Responder / Relay poisoning attacks.
- **WDigest Credential Protection:** Enforces `UseLogonCredential = 0` to prevent LSASS plaintext password caching in memory.
- **Remote Desktop Security:** Enforces Network Level Authentication (NLA) and rejects unencrypted RDP handshakes.

### 2. Autonomous SentinelOne EDR Provisioning (`Deploy-SentinelOne.ps1`)
- Downloads official MSI / EXE packages from an internal repository.
- Performs SHA-256 cryptographic hash validation before execution.
- Injects customer site registration tokens silently without interrupting active end-users.

### 3. Linux Kernel & SSH Hardening (`harden-linux.sh`)
- Enforces hardened `sysctl.conf` TCP/IP stack configurations (`tcp_syncookies`, ignoring ICMP redirects, ASLR protection).
- Hardens OpenSSH daemon: disables root login, enforces SSH key-only authentication, and locks idle sessions.
- Sets up UFW firewall and `auditd` logging rules for compliance monitoring.

---

## 🛠️ Repository File Structure

- `windows/Harden-WindowsEndpoint.ps1` — Main enterprise Windows 10/11 and Server 2022 hardening script.
- `windows/Deploy-SentinelOne.ps1` — Silent SentinelOne EDR bootstrap installer with token authentication.
- `linux/harden-linux.sh` — Production Linux server (Ubuntu / RHEL) CIS hardening automation.
- `telemetry/Export-SystemTelemetry.ps1` — Comprehensive diagnostic collector outputting JSON/HTML telemetry reports.

---

## 💻 Execution Instructions

### Run Windows Hardening (Elevated PowerShell):
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\windows\Harden-WindowsEndpoint.ps1 -EnforceCIS -Verbose
```

### Run Silent SentinelOne EDR Deployment:
```powershell
.\windows\Deploy-SentinelOne.ps1 -SiteToken "eyJ1c2VySWQiOi..." -InstallerPath ".\SentinelAgent.exe"
```

### Run Linux Hardening:
```bash
sudo chmod +x linux/harden-linux.sh
sudo ./linux/harden-linux.sh
```

---
**Maintained by:** Anu Sah (`@Anusah99`) • Infrastructure & IT Security Engineer
