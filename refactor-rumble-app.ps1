# Comprehensive cleanup and refactoring script for the RUMBLE React application
# This script removes unnecessary files, updates imports, and streamlines the codebase

Write-Host "Starting comprehensive cleanup and refactoring..." -ForegroundColor Cyan

$projectRoot = "f:\Education\ISU\Spring 2025\CPRE 4910\Git\Rumble\RUMBLE\rumble-react"

# Files to be removed
$filesToRemove = @(
    # Duplicate/unnecessary CSS files
    "$projectRoot\src\index.css",
    "$projectRoot\src\App.css",
    "$projectRoot\src\components\common\BubbleBackground.css",
    "$projectRoot\src\components\auth\AuthStyles.css",
    "$projectRoot\src\components\auth\Login.css",
    "$projectRoot\src\components\auth\CreateAccount.css",
    "$projectRoot\src\components\landing\LandingPage.css",
    "$projectRoot\src\components\dashboard\Dashboard.css",
    
    # Create React App template files
    "$projectRoot\src\logo.svg",
    "$projectRoot\src\App.test.js",
    "$projectRoot\src\setupTests.js",
    
    # Unused test files
    "$projectRoot\src\__tests__\componentTests.js",
    
    # HTML templates in parent directory (these are just reference files)
    "f:\Education\ISU\Spring 2025\CPRE 4910\Git\Rumble\RUMBLE\login.html",
    "f:\Education\ISU\Spring 2025\CPRE 4910\Git\Rumble\RUMBLE\dashboard.html",
    "f:\Education\ISU\Spring 2025\CPRE 4910\Git\Rumble\RUMBLE\CreateAccount.html",
    "f:\Education\ISU\Spring 2025\CPRE 4910\Git\Rumble\RUMBLE\LandingPage.html"
)

# Remove each file
Write-Host "Removing unnecessary files..." -ForegroundColor Cyan
foreach ($file in $filesToRemove) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "Removed: $file" -ForegroundColor Green
    } else {
        Write-Host "Not found: $file" -ForegroundColor Yellow
    }
}

# Files to update by removing unnecessary imports
$filesToUpdate = @(
    # Remove CSS imports from components
    @{
        Path = "$projectRoot\src\components\auth\Login.js"
        OldPattern = "import \s*['\"](\.\/|\.\.\/)*[^'\"]+\.css['\"]\s*;?\r?\n"
        NewValue = ""
    },
    @{
        Path = "$projectRoot\src\components\auth\CreateAccount.js"
        OldPattern = "import \s*['\"](\.\/|\.\.\/)*[^'\"]+\.css['\"]\s*;?\r?\n"
        NewValue = ""
    },
    @{
        Path = "$projectRoot\src\components\common\BubbleBackground.js"
        OldPattern = "import \s*['\"](\.\/|\.\.\/)*[^'\"]+\.css['\"]\s*;?\r?\n"
        NewValue = ""
    },
    @{
        Path = "$projectRoot\src\components\dashboard\Dashboard.js"
        OldPattern = "import \s*['\"](\.\/|\.\.\/)*[^'\"]+\.css['\"]\s*;?\r?\n"
        NewValue = ""
    },
    @{
        Path = "$projectRoot\src\components\landing\LandingPage.js"
        OldPattern = "import \s*['\"](\.\/|\.\.\/)*[^'\"]+\.css['\"]\s*;?\r?\n"
        NewValue = ""
    },
    # Replace index.css with styles.css in index.js
    @{
        Path = "$projectRoot\src\index.js"
        OldPattern = "import \s*['\"]\.\/index\.css['\"]\s*;"
        NewValue = "import './styles.css';"
    },
    # Remove App.css import from App.js
    @{
        Path = "$projectRoot\src\App.js"
        OldPattern = "import \s*['\"]\.\/App\.css['\"]\s*;?\r?\n"
        NewValue = ""
    }
)

# Update each file with regex replacements
Write-Host "`nUpdating imports in files..." -ForegroundColor Cyan
foreach ($update in $filesToUpdate) {
    if (Test-Path $update.Path) {
        $content = Get-Content $update.Path -Raw
        $newContent = $content -replace $update.OldPattern, $update.NewValue
        
        # Only write if something changed
        if ($content -ne $newContent) {
            Set-Content -Path $update.Path -Value $newContent
            Write-Host "Updated imports in: $($update.Path)" -ForegroundColor Green
        } else {
            Write-Host "No changes needed in: $($update.Path)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "File not found: $($update.Path)" -ForegroundColor Red
    }
}

# Clean up unused folders
Write-Host "`nChecking for empty directories..." -ForegroundColor Cyan
$testDir = "$projectRoot\src\__tests__"
if ((Test-Path $testDir) -and ((Get-ChildItem $testDir -File).Count -eq 0)) {
    Remove-Item $testDir -Recurse -Force
    Write-Host "Removed empty directory: $testDir" -ForegroundColor Green
}

Write-Host "`nRefactoring package.json..." -ForegroundColor Cyan
$packageJsonPath = "$projectRoot\package.json"
if (Test-Path $packageJsonPath) {
    # Load package.json
    $packageJsonContent = Get-Content $packageJsonPath -Raw
    $packageJson = ConvertFrom-Json $packageJsonContent

    # Essential dependencies to keep
    $essentialDeps = @(
        "react", "react-dom", "react-router-dom", "react-scripts", 
        "tailwindcss", "autoprefixer", "postcss", 
        "@headlessui/react", "web-vitals"
    )

    # Filter dependencies
    $newDeps = New-Object PSObject
    $removedDeps = @()

    foreach ($prop in $packageJson.dependencies.PSObject.Properties) {
        if ($essentialDeps -contains $prop.Name) {
            Add-Member -InputObject $newDeps -MemberType NoteProperty -Name $prop.Name -Value $prop.Value
        } else {
            $removedDeps += $prop.Name
        }
    }

    # Update package.json with filtered dependencies
    $packageJson.dependencies = $newDeps

    # Convert back to JSON and write to file
    $newPackageJsonContent = $packageJson | ConvertTo-Json -Depth 5
    Set-Content -Path $packageJsonPath -Value $newPackageJsonContent

    if ($removedDeps.Count -gt 0) {
        Write-Host "Removed unnecessary dependencies: $($removedDeps -join ', ')" -ForegroundColor Yellow
    }
}

Write-Host "`nRunning npm install to update dependencies..." -ForegroundColor Cyan
Set-Location $projectRoot
npm install

Write-Host "`nVerifying the application builds correctly..." -ForegroundColor Cyan
npm run build

Write-Host "`nComprehensive cleanup and refactoring complete!" -ForegroundColor Green
Write-Host "The React application has been streamlined and optimized." -ForegroundColor Cyan
