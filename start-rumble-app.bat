@echo off
echo Starting RUMBLE React Application...
echo.
echo NOTE: Some npm packages have known vulnerabilities that can only be fixed with breaking changes.
echo These vulnerabilities are in development dependencies and don't affect production builds.
echo.
echo Launching PowerShell script for better security handling...

powershell.exe -ExecutionPolicy Bypass -File "%~dp0start-rumble-app.ps1"

if %ERRORLEVEL% NEQ 0 (
  echo Error occurred while running the application.
  echo Please check the PowerShell script output for details.
  pause
)
