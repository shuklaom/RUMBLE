# Production build script for RUMBLE React application
# This script creates a production build with optimized settings

# Display step information
Write-Host "Creating production build for RUMBLE React Application..." -ForegroundColor Green
Write-Host ""

# Navigate to the project directory
Set-Location "f:\Education\ISU\Spring 2025\CPRE 4910\Git\Rumble\RUMBLE\rumble-react"

# Install only production dependencies
Write-Host "Installing production dependencies..." -ForegroundColor Cyan
npm install --production --no-audit

# Create an optimized production build
Write-Host "Creating optimized production build..." -ForegroundColor Cyan
npm run build

# Success message
Write-Host ""
Write-Host "Production build completed successfully!" -ForegroundColor Green
Write-Host "The build folder is ready to be deployed." -ForegroundColor Green
Write-Host "You can serve it with a static server:" -ForegroundColor Green
Write-Host "  npm install -g serve" -ForegroundColor Yellow
Write-Host "  serve -s build" -ForegroundColor Yellow
Write-Host ""
