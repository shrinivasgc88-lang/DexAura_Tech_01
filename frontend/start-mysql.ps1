# This PowerShell script will automatically request Administrator privileges
# and start the MySQL80 service, then run the database setup

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    # Not admin - request elevation
    Write-Host "⚠️  This script requires Administrator privileges" -ForegroundColor Yellow
    Write-Host "Requesting elevation..." -ForegroundColor Cyan
    
    # Relaunch as admin
    $scriptPath = $MyInvocation.MyCommand.Path
    $arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$scriptPath`""
    Start-Process PowerShell -ArgumentList $arguments -Verb RunAs
    exit
}

Write-Host "✓ Running as Administrator" -ForegroundColor Green
Write-Host ""

# Service name
$serviceName = "MySQL80"

try {
    # Check current status
    $service = Get-Service -Name $serviceName -ErrorAction Stop
    
    if ($service.Status -eq "Running") {
        Write-Host "✓ $serviceName is already running" -ForegroundColor Green
    } else {
        Write-Host "Starting $serviceName..." -ForegroundColor Cyan
        Start-Service -Name $serviceName -ErrorAction Stop
        Write-Host "✓ $serviceName started successfully" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "Waiting for database to be ready..." -ForegroundColor Cyan
    Start-Sleep -Seconds 3
    
    # Run database setup
    Write-Host "Setting up database..." -ForegroundColor Cyan
    Write-Host ""
    
    $setupPath = Join-Path (Get-Location) "setup-db.js"
    if (Test-Path $setupPath) {
        node setup-db.js
    } else {
        Write-Host "✗ setup-db.js not found!" -ForegroundColor Red
    }
    
} catch {
    Write-Host "✗ Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "1. MySQL service may not be installed"
    Write-Host "2. Service name might be different (check: Get-Service | Where-Object {`$_.Name -like '*mysql*'})"
    Write-Host "3. Download MySQL from: https://dev.mysql.com/downloads/mysql/"
}

Write-Host ""
Write-Host "Press any key to exit..."
[void][System.Console]::ReadKey($true)
