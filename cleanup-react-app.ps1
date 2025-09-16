# Clean up unnecessary files from the RUMBLE React application
# This script removes duplicate or unused CSS files, test files, and template files

Write-Host "Starting cleanup of unnecessary files..." -ForegroundColor Cyan

$projectRoot = "f:\Education\ISU\Spring 2025\CPRE 4910\Git\Rumble\RUMBLE\rumble-react"

# Array of files to be removed
$filesToRemove = @(
    # Duplicate CSS files (AuthStyles.css is used instead)
    "$projectRoot\src\components\auth\Login.css",
    "$projectRoot\src\components\auth\CreateAccount.css",
    
    # Empty or near-empty CSS files
    "$projectRoot\src\components\landing\LandingPage.css",
    "$projectRoot\src\components\dashboard\Dashboard.css",
    
    # Template/sample files from Create React App
    "$projectRoot\src\logo.svg",
    "$projectRoot\src\App.test.js",
    "$projectRoot\src\setupTests.js",
    
    # HTML files in the parent directory (these are just reference files)
    "f:\Education\ISU\Spring 2025\CPRE 4910\Git\Rumble\RUMBLE\login.html",
    "f:\Education\ISU\Spring 2025\CPRE 4910\Git\Rumble\RUMBLE\dashboard.html",
    "f:\Education\ISU\Spring 2025\CPRE 4910\Git\Rumble\RUMBLE\CreateAccount.html",
    "f:\Education\ISU\Spring 2025\CPRE 4910\Git\Rumble\RUMBLE\LandingPage.html"
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

# Update import statements to remove references to deleted files
$filesToUpdate = @(
    "$projectRoot\src\components\auth\Login.js",
    "$projectRoot\src\components\auth\CreateAccount.js",
    "$projectRoot\src\index.js"
)

Write-Host "`nRemoving references to deleted files..." -ForegroundColor Cyan

# Example: Run a search and replace operation to fix imports
foreach ($file in $filesToUpdate) {
    if (Test-Path $file) {
        # Read the file content
        $content = Get-Content $file -Raw
        
        # Remove references to deleted CSS files
        $content = $content -replace "import\s+['""](\.\/|\.\.\/)*[^'""]+\.css['""]\s*;?\r?\n", ""
        
        # Write the updated content back to the file
        Set-Content -Path $file -Value $content
        Write-Host "Updated: $file" -ForegroundColor Green
    }
}

Write-Host "`nCleanup complete!" -ForegroundColor Cyan
