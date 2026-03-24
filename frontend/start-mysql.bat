@echo off
REM Start MySQL80 service with Administrator privileges
REM This script will automatically request admin access

echo Starting MySQL80 Service...
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo This script requires Administrator privileges.
    echo.
    echo Please follow these steps:
    echo 1. Right-click this file (start-mysql.bat)
    echo 2. Select "Run as administrator"
    echo 3. Click "Yes" when prompted
    echo.
    pause
    exit /b 1
)

REM Start the service
echo Attempting to start MySQL80...
net start MySQL80

if %errorlevel% equ 0 (
    echo.
    echo ✓ MySQL80 service started successfully!
    echo.
    echo Waiting 3 seconds before running setup...
    timeout /t 3 /nobreak
    
    REM Run the setup script
    echo.
    echo Running database setup...
    node setup-db.js
    
) else if %errorlevel% equ 2 (
    echo.
    echo ! MySQL80 service is already running
    echo.
    echo Proceeding with database setup...
    timeout /t 2 /nobreak
    
    REM Run the setup script
    node setup-db.js
    
) else (
    echo.
    echo ✗ Failed to start MySQL80 service
    echo Error code: %errorlevel%
    echo.
    echo Troubleshooting:
    echo - Make sure you ran this as Administrator
    echo - Check if MySQL is installed
    echo - Verify the service name is MySQL80
    echo.
)

pause
