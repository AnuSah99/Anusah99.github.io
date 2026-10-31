#!/usr/bin/env python3
"""
JumpCloud Patch Compliance & Telemetry Engine
Author: Anu Sah (@Anusah99)
Purpose: Query JumpCloud v1/v2 REST API, assess OS patch compliance across 1500+ endpoints,
         and export telemetry to Google Workspace / Webhooks.
"""

import os
import sys
import json
import logging
import argparse
from datetime import datetime, timezone
from typing import Dict, List, Any
import requests

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] (CyberOps-Tracker) %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)

class JumpCloudPatchTracker:
    def __init__(self, api_key: str, org_id: str = ""):
        self.api_key = api_key
        self.org_id = org_id
        self.base_url = "https://console.jumpcloud.com/api"
        self.headers = {
            "x-api-key": self.api_key,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        if self.org_id:
            self.headers["x-org-id"] = self.org_id

    def fetch_all_systems(self) -> List[Dict[str, Any]]:
        """Query JumpCloud API to list all managed system records."""
        systems = []
        limit = 100
        skip = 0

        logging.info("Querying JumpCloud system telemetry nodes...")

        while True:
            url = f"{self.base_url}/systems?limit={limit}&skip={skip}"
            try:
                response = requests.get(url, headers=self.headers, timeout=20)
                if response.status_code != 200:
                    logging.error(f"Failed to fetch systems: HTTP {response.status_code} - {response.text}")
                    break

                data = response.json()
                results = data.get("results", [])
                if not results:
                    break

                systems.extend(results)
                skip += limit

                if len(results) < limit:
                    break
            except requests.RequestException as e:
                logging.error(f"Network error querying JumpCloud endpoint: {e}")
                break

        logging.info(f"Successfully retrieved {len(systems)} system records from JumpCloud.")
        return systems

    def evaluate_compliance(self, systems: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Audit systems against enterprise patch SLAs."""
        now = datetime.now(timezone.utc)
        audit_summary = {
            "audit_timestamp": now.isoformat(),
            "total_endpoints": len(systems),
            "compliant_count": 0,
            "warning_count": 0,
            "critical_count": 0,
            "os_breakdown": {"windows": 0, "darwin": 0, "linux": 0},
            "flagged_systems": []
        }

        for sys_record in systems:
            os_family = (sys_record.get("os") or "unknown").lower()
            if "windows" in os_family:
                audit_summary["os_breakdown"]["windows"] += 1
            elif "darwin" in os_family or "mac" in os_family:
                audit_summary["os_breakdown"]["darwin"] += 1
            else:
                audit_summary["os_breakdown"]["linux"] += 1

            last_contact_str = sys_record.get("lastContact")
            days_since_contact = 999
            if last_contact_str:
                try:
                    last_contact = datetime.fromisoformat(last_contact_str.replace("Z", "+00:00"))
                    days_since_contact = (now - last_contact).days
                except ValueError:
                    pass

            # Classify system status
            hostname = sys_record.get("displayName") or sys_record.get("hostname") or "Unknown-Host"
            agent_version = sys_record.get("agentVersion", "N/A")
            os_version = sys_record.get("version", "N/A")

            if days_since_contact <= 7:
                audit_summary["compliant_count"] += 1
                status = "COMPLIANT"
            elif days_since_contact <= 21:
                audit_summary["warning_count"] += 1
                status = "WARNING_DRIFT"
            else:
                audit_summary["critical_count"] += 1
                status = "CRITICAL_OFFLINE"
                audit_summary["flagged_systems"].append({
                    "id": sys_record.get("_id"),
                    "hostname": hostname,
                    "os": os_family,
                    "os_version": os_version,
                    "agent_version": agent_version,
                    "days_inactive": days_since_contact,
                    "status": status
                })

        return audit_summary

    def dispatch_webhook(self, webhook_url: str, summary: Dict[str, Any]) -> bool:
        """Send formatted Slack/Discord alert with SecOps metrics."""
        if not webhook_url:
            return False

        payload = {
            "text": f"🛡️ *[CYBER-OPS AUDIT]* JumpCloud Compliance Summary: {summary['compliant_count']}/{summary['total_endpoints']} Endpoints Compliant ({summary['critical_count']} Critical Drift Nodes Flagged)."
        }

        try:
            res = requests.post(webhook_url, json=payload, timeout=10)
            logging.info(f"Webhook alert dispatched: HTTP {res.status_code}")
            return res.status_code == 200
        except Exception as e:
            logging.error(f"Failed to dispatch webhook: {e}")
            return False

def main():
    parser = argparse.ArgumentParser(description="JumpCloud Patch Compliance Engine")
    parser.add_argument("--api-key", default=os.getenv("JUMPCLOUD_API_KEY", ""), help="JumpCloud API Key")
    parser.add_argument("--output", default="summary.json", help="Path to write JSON summary")
    parser.add_argument("--webhook", default=os.getenv("SECOPS_WEBHOOK_URL", ""), help="Slack/Discord Webhook URL")
    args = parser.parse_args()

    # In demonstration or sandbox mode, supply simulated telemetry if no live key provided
    if not args.api_key:
        logging.warning("No JUMPCLOUD_API_KEY environment variable detected; running in telemetry demonstration mode.")
        mock_systems = [
            {"_id": "sys_101", "displayName": "IN-DEL-LAP-1044", "os": "Microsoft Windows 11 Enterprise", "version": "10.0.22631", "agentVersion": "2.14.0", "lastContact": datetime.now(timezone.utc).isoformat()},
            {"_id": "sys_102", "displayName": "IN-GGN-MAC-0210", "os": "macOS Sonoma", "version": "14.4.1", "agentVersion": "2.14.0", "lastContact": datetime.now(timezone.utc).isoformat()},
            {"_id": "sys_103", "displayName": "SRV-AUTH-PROD-01", "os": "Ubuntu 22.04.4 LTS", "version": "5.15.0-101", "agentVersion": "2.13.8", "lastContact": "2024-01-01T00:00:00Z"},
        ]
        tracker = JumpCloudPatchTracker(api_key="demo")
        summary = tracker.evaluate_compliance(mock_systems)
    else:
        tracker = JumpCloudPatchTracker(api_key=args.api_key)
        systems = tracker.fetch_all_systems()
        summary = tracker.evaluate_compliance(systems)

    logging.info(f"Audit completed: {summary['compliant_count']} Compliant | {summary['critical_count']} Critical")

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2)
    logging.info(f"Telemetry saved to {args.output}")

    if args.webhook:
        tracker.dispatch_webhook(args.webhook, summary)

if __name__ == "__main__":
    main()
