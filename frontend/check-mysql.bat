@echo off
REM Check MySQL service status and provide diagnostics

echo ═══════════════════════════════════════════════════
echo    MySQL Service Diagnostic Check
echo ═══════════════════════════════════════════════════
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: This script should be run as Administrator for full diagnostics
    echo Right-click this file and select "Run as administrator"
    echo.
)

echo Checking for MySQL services...
echo.

REM List all services with "MySQL" in the name
sc query | findstr /i mysql

if %errorlevel% equ 0 (
    echo.
    echo Found MySQL services above
) else (
    echo ✗ No MySQL services found!
)

echo.
echo ═══════════════════════════════════════════════════
echo.
echo Checking MySQL installation...
echo.

REM Check Program Files
if exist "C:\Program Files\MySQL" (
    echo ✓ MySQL found in: C:\Program Files\MySQL
    dir "C:\Program Files\MySQL"
) else (
    echo ✗ MySQL not found in: C:\Program Files\MySQL
)

echo.
echo Available MySQL directories:
dir "C:\Program Files" | findstr /i mysql

echo.
echo ═══════════════════════════════════════════════════
echo.
echo NEXT STEPS:
echo.
echo If MySQL80 service exists:
echo   1. Right-click this file
echo   2. Select "Run as administrator"
echo   3. Navigate to frontend folder
echo   4. Run: start-mysql.bat
echo.
echo If no MySQL service found:
echo   1. MySQL may not be installed
echo   2. Download from: https://dev.mysql.com/downloads/mysql/
echo   3. Run the installer
echo   4. Make sure "Configure MySQL Server Locally" is checked
echo.
pause
