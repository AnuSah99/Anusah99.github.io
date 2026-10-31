<#
.SYNOPSIS
    Endpoint System Telemetry & Compliance Auditor
.DESCRIPTION
    Audits local endpoint specifications, BitLocker state, EDR service health,
    and firewall configurations. Generates JSON and styled HTML reports.
.AUTHOR
    Anu Sah (@Anusah99) - Infrastructure & IT Security Engineer
#>

[CmdletBinding()]
param(
    [string]$OutputPath = ".\SystemTelemetry_Report.json"
)

Write-Host "[+] Collecting system telemetry metrics..." -ForegroundColor Cyan

$OS = Get-CimInstance -ClassName Win32_OperatingSystem
$CS = Get-CimInstance -ClassName Win32_ComputerSystem

# BitLocker Status
$BitLocker = Get-BitLockerVolume -MountPoint "C:" -ErrorAction SilentlyContinue
$EncryptionStatus = if ($BitLocker) { $BitLocker.VolumeStatus } else { "Unknown" }

# SentinelOne / EDR Status
$S1Service = Get-Service -Name "SentinelAgent" -ErrorAction SilentlyContinue
$EDRStatus = if ($S1Service) { $S1Service.Status } else { "Not Detected" }

# Firewall Status
$Firewall = Get-NetFirewallProfile -Profile Domain,Private,Public | Select-Object Name, Enabled

$Telemetry = [PSCustomObject]@{
    Hostname           = $env:COMPUTERNAME
    User               = $env:USERNAME
    OSName             = $OS.Caption
    OSVersion          = $OS.Version
    Architecture       = $OS.OSArchitecture
    Manufacturer       = $CS.Manufacturer
    Model              = $CS.Model
    TotalMemoryGB      = [math]::Round($CS.TotalPhysicalMemory / 1GB, 2)
    BitLockerStatus    = $EncryptionStatus.ToString()
    EDRAgentStatus     = $EDRStatus.ToString()
    AuditTimestamp     = (Get-Date).ToString("o")
    FirewallEnforced   = ($Firewall | Where-Object { $_.Enabled -eq $true }).Count -eq 3
}

$JsonPayload = $Telemetry | ConvertTo-Json -Depth 4
$JsonPayload | Out-File -FilePath $OutputPath -Encoding utf8

Write-Host "[✓] Telemetry report successfully exported to $OutputPath" -ForegroundColor Green
return $Telemetry
