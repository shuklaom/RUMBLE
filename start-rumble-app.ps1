# PowerShell script to start the RUMBLE React application with security checks
# This script installs dependencies, checks for critical vulnerabilities, and starts the dev server

# Display startup banner
Write-Host "┌──────────────────────────────────────────────────┐" -ForegroundColor Cyan
Write-Host "│            RUMBLE React Application              │" -ForegroundColor Cyan
Write-Host "└──────────────────────────────────────────────────┘" -ForegroundColor Cyan
Write-Host ""

<<<<<<< HEAD
# Navigate to the project directory relative to this script
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location "$scriptPath\rumble-react"
=======
# Navigate to the rumble-react directory relative to this script's location
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location (Join-Path $scriptPath "rumble-react")
>>>>>>> e11ac569d39b0a05fe2ef490b2d8f9aced806109

# Security notice
Write-Host "SECURITY NOTICE:" -ForegroundColor Yellow
Write-Host "Some npm packages have known vulnerabilities that can only be fixed with breaking changes." -ForegroundColor Yellow
Write-Host "These vulnerabilities are in development dependencies and don't affect production builds." -ForegroundColor Yellow
Write-Host ""

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install --no-audit

# Check for high severity vulnerabilities that might affect runtime
Write-Host "Checking for critical security vulnerabilities..." -ForegroundColor Cyan
$audit = npm audit --json | ConvertFrom-Json
$criticalVulns = $audit.vulnerabilities | Where-Object { $_.severity -eq 'critical' -and $_.effects.runtime -eq $true }

if ($criticalVulns) {
    Write-Host "WARNING: Critical runtime vulnerabilities detected!" -ForegroundColor Red
    Write-Host "Please run 'npm audit' for details and consider fixing these before continuing." -ForegroundColor Red
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        exit
    }
}

# Start the development server
Write-Host "Starting development server..." -ForegroundColor Green
npm start

# Fallback message if server doesn't start automatically
Write-Host "If the browser doesn't open automatically, navigate to http://localhost:3000" -ForegroundColor Cyan
