#!/usr/bin/env bash
# ==============================================================================
# Security Pre-flight Audit Script
# Author: Anu Sah (@Anusah99)
# Usage: ./scripts/security-audit.sh [IMAGE_NAME]
# ==============================================================================

set -euo pipefail

IMAGE_NAME="${1:-secops-service:latest}"
REPORT_DIR="./security-reports"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

mkdir -p "${REPORT_DIR}"

echo -e "\033[1;36m[+] Starting Cyber-Ops Security Audit for: ${IMAGE_NAME}\033[0m"

# 1. Check if Trivy is installed
if ! command -v trivy &> /dev/null; then
    echo -e "\033[1;33m[!] Trivy CLI not detected. Installing Trivy via official package...\033[0m"
    exit 1
fi

# 2. Run Container Image Scan
echo -e "\033[1;34m[+] Gating High and Critical CVE vulnerabilities...\033[0m"
trivy image \
    --severity HIGH,CRITICAL \
    --format table \
    --output "${REPORT_DIR}/trivy_${TIMESTAMP}.txt" \
    "${IMAGE_NAME}"

# 3. Generate JSON report for compliance telemetry
trivy image \
    --format json \
    --output "${REPORT_DIR}/trivy_${TIMESTAMP}.json" \
    "${IMAGE_NAME}"

echo -e "\033[1;32m[✓] Security Audit Complete. Telemetry stored in ${REPORT_DIR}\033[0m"
