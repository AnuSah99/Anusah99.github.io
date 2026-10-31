# 🤖 AI Workspace & Automated Patch Tracker
### Cloud IAM Telemetry, Device Patch Auditing & Google Workspace Automation

[![JumpCloud](https://img.shields.io/badge/JumpCloud-REST%20API%20v2-blue?style=for-the-badge&logo=jumpcloud)](https://github.com/Anusah99)
[![Python](https://img.shields.io/badge/Python-3.11+-emerald?style=for-the-badge&logo=python)](https://github.com/Anusah99)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-Drive%20%26%20Sheets-cyan?style=for-the-badge&logo=google)](https://github.com/Anusah99)
[![Author](https://img.shields.io/badge/Author-Anu%20Sah-blueviolet?style=for-the-badge)](https://github.com/Anusah99)

---

## 📌 Architecture & Mission

In an enterprise managing **1,500+ endpoints**, tracking operating system patch velocity, agent versions, and quarantine status manually wastes dozens of hours each week.

This project delivers an autonomous telemetry engine that polls the **JumpCloud Directory-as-a-Service REST API**, calculates patch drift against CIS security benchmarks, generates executive-ready dashboards in **Google Sheets**, archives historical audit CSVs in **Google Drive**, and triggers instant alerts via Slack/Discord webhooks.

```
+----------------------------------------------------------------------------------------------------+
|                              JUMPCLOUD PATCH TRACKER TOPOLOGY                                      |
+----------------------------------------------------------------------------------------------------+
  [ JumpCloud Cloud API ]
            │
            ▼ (JSON Telemetry via HTTPS)
  [ Python Engine: tracker.py ] ──> [ Audit & Drift Analysis ]
            │                                   │
            ├───────────────────────────────────┼─────────────────────────────────┐
            ▼                                   ▼                                 ▼
  [ Google Apps Script (Drive/Sheets) ]   [ Slack SecOps Webhook ]     [ Compliance JSON Logs ]
```

---

## 🚀 Key Features

1. **Continuous JumpCloud API Polling**:
   - Queries Windows, macOS, and Linux system endpoints.
   - Audits OS version numbers, kernel build updates, agent versions, and last contact timestamps.
2. **Autonomous Risk Score Calculation**:
   - Classifies endpoints as **COMPLIANT** (0-14 days), **WARNING** (15-30 days), or **CRITICAL DRIFT** (>30 days unpatched).
3. **Google Workspace Automation**:
   - Automated Google Apps Script creating interactive conditional formatting in Google Sheets.
   - Automatically moves past audit reports into date-stamped Google Drive archive folders.
4. **Slack / Discord Security Dispatch**:
   - Broadcasts immediate alerts when executive machines or critical workstations fall behind mandatory patch SLAs.

---

## 🛠️ File Structure

- `tracker.py` — Core Python 3.11 engine for API queries, data parsing, and webhook notifications.
- `apps-script/Code.gs` — Google Apps Script for Google Sheet creation, styling, and Drive archiving.
- `config.example.json` — Configuration template for JumpCloud API keys, thresholds, and webhooks.
- `requirements.txt` — Python dependencies (`requests`, `python-dotenv`, `tabulate`).
- `scripts/run-daily-tracker.sh` — Cron executable script for serverless execution.

---

## 💻 Setup & Execution

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment
```bash
cp config.example.json config.json
export JUMPCLOUD_API_KEY="your-jumpcloud-api-key"
```

### 3. Run Tracker
```bash
python tracker.py --output json --notify
```

---
**Maintained by:** Anu Sah (`@Anusah99`) • Infrastructure & IT Security Engineer
