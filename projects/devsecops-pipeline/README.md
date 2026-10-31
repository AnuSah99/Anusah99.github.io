# 🛡️ Automated DevSecOps CI/CD Pipeline
### High-Security Containerized Release Engineering with Automated CVE & Secret Gating

[![Security Gate](https://img.shields.io/badge/Trivy-Zero--Critical-emerald?style=for-the-badge&logo=securityscorecard)](https://github.com/Anusah99)
[![Docker](https://img.shields.io/badge/Docker-Multi--Stage-cyan?style=for-the-badge&logo=docker)](https://github.com/Anusah99)
[![AWS ECR](https://img.shields.io/badge/AWS-ECR%20Deploy-orange?style=for-the-badge&logo=amazon-aws)](https://github.com/Anusah99)
[![Author](https://img.shields.io/badge/Author-Anu%20Sah-blueviolet?style=for-the-badge)](https://github.com/Anusah99)

---

## 📌 Architecture Overview

This production-grade DevSecOps pipeline enforces automated security gating before any container image reaches AWS Elastic Container Registry (ECR). It stops vulnerable packages, hardcoded secrets, and misconfigurations at the pull request and build stages.

```
+----------------------------------------------------------------------------------------------------+
|                                    DEVSECOPS PIPELINE FLOW                                         |
+----------------------------------------------------------------------------------------------------+
  [ Git Commit ] ──> [ SAST Lint & Secret Scan ] ──> [ Multi-Stage Docker Build (Distroless) ]
                                                                   │
                                                                   ▼
  [ Automated Slack Webhook ] <── [ Trivy CVE Gate (Fail on HIGH/CRITICAL) ]
                                                                   │ (Passes)
                                                                   ▼
  [ Immutable AWS ECR Push ] <── [ Cosign Cryptographic Signature ]
```

## 🚀 Key Features

1. **Multi-Stage Distroless Image Build**:
   - Reduces final container image attack surface by over **65%**.
   - Strips package managers (`apt`, `apk`), shells (`bash`, `sh`), and OS debugging binaries from production runtime.
2. **Automated Trivy CVE Vulnerability Gates**:
   - Blocks container image promotions if any **CRITICAL** or **HIGH** severity CVEs without available fixes are detected.
   - Generates structured SARIF & JSON vulnerability artifacts for compliance audits.
3. **Automated Secret & Misconfiguration Detection**:
   - Detects leaked AWS credentials, SSH private keys, JWT secrets, and Slack tokens prior to build artifact creation.
4. **Zero-Downtime ECR Image Push & Version Signing**:
   - Tags releases with immutable commit SHAs and semantic release tags (`vX.Y.Z`).
   - Integrated notification webhooks providing instant telemetry to SecOps channels.

---

## 🛠️ Repository File Structure

- `Dockerfile` — Multi-stage hardened production Dockerfile using Distroless / Alpine base.
- `.trivyignore` — Audited CVE whitelist with expiration dates and justification notes.
- `.github/workflows/devsecops-pipeline.yml` — Complete GitHub Actions CI/CD automation workflow.
- `Jenkinsfile` — Declarative Jenkins pipeline with security stages, parallel linting, and ECR pushing.
- `scripts/security-audit.sh` — Local developer pre-commit scanning script.
- `scripts/deploy-ecr.sh` — Bash deployment script for authenticating with AWS ECR and pushing tagged images.

---

## 💻 Local Testing & Execution

### 1. Run Local Security Scan
```bash
chmod +x scripts/security-audit.sh
./scripts/security-audit.sh
```

### 2. Build Hardened Container
```bash
docker build -t secops-service:latest -f Dockerfile .
```

### 3. Run Trivy Vulnerability Audit
```bash
trivy image --severity HIGH,CRITICAL --exit-code 1 secops-service:latest
```

---
**Maintained by:** Anu Sah (`@Anusah99`) • Infrastructure & IT Security Engineer
