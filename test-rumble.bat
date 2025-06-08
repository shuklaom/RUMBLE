@echo off
echo RUMBLE Application Test Script
echo ===========================
echo.

cd rumble-react

echo 1. Testing component structure...
echo --------------------------------
node verify-structure.js
echo.

echo 2. Testing API integration...
echo ---------------------------
node test-api-integration.js
echo.

echo 3. Running build process...
echo ------------------------
call npm run build
echo.

echo All tests completed! If no errors were displayed, the application is ready to use.
echo To start the application, run: start-rumble-app.ps1
