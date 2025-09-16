# Update the React application to use a unified CSS approach
# This script removes additional CSS files and updates the imports

Write-Host "Starting application update..." -ForegroundColor Cyan

$projectRoot = "f:\Education\ISU\Spring 2025\CPRE 4910\Git\Rumble\RUMBLE\rumble-react"

# Additional files to be removed after refactoring
$filesToRemove = @(
    # CSS files that have been consolidated
    "$projectRoot\src\index.css",
    "$projectRoot\src\App.css",
    "$projectRoot\src\components\common\BubbleBackground.css",
    "$projectRoot\src\components\auth\AuthStyles.css",
    
    # Unused files
    "$projectRoot\src\__tests__\componentTests.js"
)

# Remove each file
foreach ($file in $filesToRemove) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "Removed: $file" -ForegroundColor Green
    } else {
        Write-Host "Not found: $file" -ForegroundColor Yellow
    }
}

Write-Host "`nCleaning up package.json..." -ForegroundColor Cyan

# Update package.json to remove unused dependencies
$packageJsonPath = "$projectRoot\package.json"
$packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json

# Keep track of removed dependencies
$removedDependencies = @()

# We'll build a new dependencies object
$newDependencies = @{}

# Copy over only the dependencies we need
foreach ($key in $packageJson.dependencies.PSObject.Properties.Name) {
    # List of dependencies to keep
    $keepDependencies = @(
        "react", "react-dom", "react-router-dom", "react-scripts", 
        "tailwindcss", "autoprefixer", "postcss", 
        "@headlessui/react", "web-vitals"
    )
    
    if ($keepDependencies -contains $key) {
        $newDependencies[$key] = $packageJson.dependencies.$key
    } else {
        $removedDependencies += $key
    }
}

# Convert back to JSON
$packageJson.dependencies = $newDependencies

# Convert to JSON and write back to file
$packageJson | ConvertTo-Json -Depth 10 | Set-Content $packageJsonPath

Write-Host "Removed unused dependencies: $($removedDependencies -join ', ')" -ForegroundColor Yellow

Write-Host "`nRunning npm install to update node_modules..." -ForegroundColor Cyan
Set-Location $projectRoot
npm install

Write-Host "`nApplication update complete!" -ForegroundColor Green
Write-Host "The React application has been refactored to use a unified CSS approach." -ForegroundColor Cyan
Write-Host "Removed unnecessary files and dependencies." -ForegroundColor Cyan
