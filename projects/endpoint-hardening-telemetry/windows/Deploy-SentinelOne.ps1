<#
.SYNOPSIS
    SentinelOne EDR Automated Silent Deployment Script
.DESCRIPTION
    Validates installer checksum, silently deploys SentinelOne Agent,
    and registers endpoint to centralized console via site token.
.AUTHOR
    Anu Sah (@Anusah99) - Infrastructure & IT Security Engineer
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [string]$SiteToken,

    [string]$InstallerPath = "C:\Windows\Temp\SentinelOneAgent.exe",
    [string]$ExpectedSHA256 = ""
)

Write-Host "[+] Initializing SentinelOne EDR Automated Deployment..." -ForegroundColor Cyan

# 1. Validate Administrator Execution
$IsAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $IsAdmin) {
    Write-Error "[!] Administrator privileges required. Exiting."
    exit 1
}

# 2. Check if SentinelOne Service is Already Running
$ExistingService = Get-Service -Name "SentinelAgent" -ErrorAction SilentlyContinue
if ($ExistingService) {
    Write-Host "[✓] SentinelOne agent is already installed and registered (Status: $($ExistingService.Status))." -ForegroundColor Green
    exit 0
}

# 3. Verify Installer File Exists
if (-not (Test-Path $InstallerPath)) {
    Write-Error "[!] Installer file not located at: $InstallerPath"
    exit 1
}

# 4. Cryptographic SHA-256 Validation
if ($ExpectedSHA256) {
    Write-Host "[+] Verifying SHA-256 installer checksum..." -ForegroundColor Yellow
    $ActualHash = (Get-FileHash -Path $InstallerPath -Algorithm SHA256).Hash
    if ($ActualHash -ne $ExpectedSHA256) {
        Write-Error "[!] Hash mismatch! Expected: $ExpectedSHA256, Received: $ActualHash. Terminating deployment."
        exit 1
    }
    Write-Host "[✓] Checksum verified: $ActualHash" -ForegroundColor Green
}

# 5. Execute Silent Installation with Site Token
Write-Host "[+] Executing silent SentinelOne package installation..." -ForegroundColor Yellow
$Arguments = "/SITE_TOKEN=`"$SiteToken`" /SILENT /NORESTART"

$Process = Start-Process -FilePath $InstallerPath -ArgumentList $Arguments -Wait -PassThru -NoNewWindow

if ($Process.ExitCode -eq 0) {
    Write-Host "[✓] SentinelOne EDR successfully installed and registered to site." -ForegroundColor Green
} else {
    Write-Error "[!] Installation completed with non-zero exit code: $($Process.ExitCode)"
    exit $Process.ExitCode
}
