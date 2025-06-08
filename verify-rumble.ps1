# Run Verification Tests for RUMBLE Application
# This script runs the verification tests to ensure the application is working correctly

Write-Host "┌──────────────────────────────────────────────────┐" -ForegroundColor Cyan
Write-Host "│        RUMBLE Application Verification           │" -ForegroundColor Cyan
Write-Host "└──────────────────────────────────────────────────┘" -ForegroundColor Cyan
Write-Host ""

# Set the working directory
Set-Location "f:\Education\ISU\Spring 2025\CPRE 4910\Git\Rumble\RUMBLE\rumble-react"

# Run the verification tests
Write-Host "1. Verifying component structure..." -ForegroundColor Yellow
node verify-structure.js

Write-Host ""
Write-Host "2. Testing API integration..." -ForegroundColor Yellow
node test-api-integration.js

Write-Host ""
Write-Host "Verification tests complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the application, run: .\start-rumble-app.ps1" -ForegroundColor Cyan
