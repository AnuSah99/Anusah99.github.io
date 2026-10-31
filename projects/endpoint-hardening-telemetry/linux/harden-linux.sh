#!/usr/bin/env bash
# ==============================================================================
# Enterprise Linux Server CIS Hardening Script
# Author: Anu Sah (@Anusah99) - Infrastructure & IT Security Engineer
# Platform: Ubuntu 20.04 / 22.04 / 24.04 LTS & RHEL / Rocky Linux 9
# ==============================================================================

set -euo pipefail

echo "================================================================="
echo "  ANU SAH CYBER-OPS // LINUX ENTERPRISE HARDENING ENGINE"
echo "================================================================="

if [[ $EUID -ne 0 ]]; then
   echo "[!] This script must be executed as root. Use sudo ./harden-linux.sh"
   exit 1
fi

# 1. Kernel Network Stack Security (sysctl)
echo "[+] Enforcing hardened sysctl security parameters..."
cat << 'EOF' > /etc/sysctl.d/99-cyberops-hardening.conf
# TCP SYN Flood Protection
net.ipv4.tcp_syncookies = 1

# Disable ICMP Packet Redirects
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.send_redirects = 0

# Disable IP Source Routing
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0

# Enable IP Spoofing Protection (Reverse Path Filter)
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1

# Ignore ICMP Broadcast Echo Requests
net.ipv4.icmp_echo_ignore_broadcasts = 1

# ASLR Virtual Memory Space Randomization
kernel.randomize_va_space = 2
EOF

sysctl --system > /dev/null

# 2. OpenSSH Daemon Hardening
echo "[+] Hardening OpenSSH Server daemon..."
SSHD_CONFIG="/etc/ssh/sshd_config.d/99-cyberops.conf"
mkdir -p /etc/ssh/sshd_config.d/

cat << 'EOF' > "${SSHD_CONFIG}"
# Disable Root Login
PermitRootLogin no

# Enforce SSH Key Authentication Only
PasswordAuthentication no
ChallengeResponseAuthentication no
PubkeyAuthentication yes

# Maximize Auth Attempts
MaxAuthTries 3

# Idle Timeout (Terminate after 15 minutes of inactivity)
ClientAliveInterval 300
ClientAliveCountMax 3

# Secure Protocols and Ciphers
X11Forwarding no
PermitEmptyPasswords no
EOF

# Test SSH configuration syntax before reload
if sshd -t; then
    systemctl restart sshd || systemctl restart ssh
    echo "[✓] SSH daemon hardened and reloaded."
else
    echo "[!] SSH config syntax test failed; leaving default."
fi

# 3. Enable UFW Firewall
if command -v ufw &> /dev/null; then
    echo "[+] Enforcing UFW default drop policy..."
    ufw default deny incoming
    ufw default allow outgoing
    ufw allow 22/tcp comment 'SSH Secure Access'
    ufw --force enable
    echo "[✓] UFW Active."
fi

echo "================================================================="
echo "  LINUX HOST HARDENING COMPLETE // NODE SECURE"
echo "================================================================="
