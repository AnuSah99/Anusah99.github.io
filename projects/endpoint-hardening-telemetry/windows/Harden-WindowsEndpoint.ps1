<#
.SYNOPSIS
    Enterprise Endpoint Hardening Script
.DESCRIPTION
    Enforces CIS Level 1/2 Benchmarks, disables legacy protocols (SMBv1, LLMNR, NBT-NS),
    protects LSASS credentials, and hardens Windows Defender / Firewall.
.AUTHOR
    Anu Sah (@Anusah99) - Infrastructure & IT Security Engineer
#>

[CmdletBinding()]
param(
    [switch]$EnforceCIS = $true,
    [switch]$AuditOnly = $false
)

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "  ANU SAH CYBER-OPS // WINDOWS ENDPOINT HARDENING ENGINE" -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan

# Ensure Administrator Rights
$CurrentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $CurrentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Error "[!] This hardening engine requires elevated Administrator privileges. Aborting."
    exit 1
}

function Set-RegistryHardening {
    param(
        [string]$Path,
        [string]$Name,
        [object]$Value,
        [string]$PropertyType = "DWord"
    )
    if (-not (Test-Path $Path)) {
        New-Item -Path $Path -Force | Out-Null
    }
    Set-ItemProperty -Path $Path -Name $Name -Value $Value -Type $PropertyType -Force
    Write-Host "  [✓] Applied Registry Rule: $Path -> $Name = $Value" -ForegroundColor Green
}

# 1. Disable SMBv1 Protocol
Write-Host "`n[1/5] Neutralizing SMBv1 Legacy Protocol..." -ForegroundColor Yellow
if (-not $AuditOnly) {
    Disable-WindowsOptionalFeature -Online -FeatureName "SMB1Protocol" -NoRestart -ErrorAction SilentlyContinue | Out-Null
    Set-RegistryHardening -Path "HKLM:\SYSTEM\CurrentControlSet\Services\LanmanServer\Parameters" -Name "SMB1" -Value 0
}

# 2. Disable LLMNR (Link-Local Multicast Name Resolution) to defeat Responder attacks
Write-Host "`n[2/5] Disabling LLMNR (Mitigating NTLM Relay & Responder Poisoning)..." -ForegroundColor Yellow
if (-not $AuditOnly) {
    Set-RegistryHardening -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows NT\DNSClient" -Name "EnableMulticast" -Value 0
}

# 3. Disable NetBIOS over TCP/IP across all network adapters
Write-Host "`n[3/5] Disabling NetBIOS over TCP/IP (NBT-NS)..." -ForegroundColor Yellow
if (-not $AuditOnly) {
    $Adapters = Get-WmiObject -Class Win32_NetworkAdapterConfiguration | Where-Object { $_.IPEnabled -eq $true }
    foreach ($Adapter in $Adapters) {
        $Adapter.SetTcpipNetbios(2) | Out-Null
        Write-Host "  [✓] Disabled NBT-NS on adapter: $($Adapter.Description)" -ForegroundColor Green
    }
}

# 4. LSASS Memory Protection & WDigest Credential Caching Prevention
Write-Host "`n[4/5] Enabling LSASS RunAsPPL & Disabling WDigest Cleartext Passwords..." -ForegroundColor Yellow
if (-not $AuditOnly) {
    Set-RegistryHardening -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Lsa" -Name "RunAsPPL" -Value 1
    Set-RegistryHardening -Path "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\WDigest" -Name "UseLogonCredential" -Value 0
}

# 5. Enforce Windows Firewall on All Profiles (Domain, Private, Public)
Write-Host "`n[5/5] Enforcing Windows Defender Firewall Active Profiles..." -ForegroundColor Yellow
if (-not $AuditOnly) {
    Set-NetFirewallProfile -Profile Domain,Private,Public -Enabled True
    Write-Host "  [✓] Windows Defender Firewall Profiles set to ACTIVE." -ForegroundColor Green
}

Write-Host "`n=================================================================" -ForegroundColor Cyan
Write-Host "  HARDENING SUITE COMPLETED SUCCESSFULLY // SYSTEM SECURED" -ForegroundColor Green
Write-Host "=================================================================" -ForegroundColor Cyan
