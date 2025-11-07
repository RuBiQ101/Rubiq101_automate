@echo off
title AI Workflow Platform - Launcher
color 0A

echo.
echo ╔══════════════════════════════════════════════════════════════════╗
echo ║              AI Workflow Platform - Quick Launcher              ║
echo ╚══════════════════════════════════════════════════════════════════╝
echo.

echo Select an option:
echo.
echo [1] 🚀 Full Startup (Recommended)
echo     - Complete health checks and monitoring
echo     - Automatic port detection
echo     - Browser auto-open
echo.
echo [2] ⚡ Quick Start (Fast)
echo     - Skip health checks for faster startup
echo     - Fixed ports (3001, 3003, 3005)
echo     - Good for development
echo.
echo [3] 🛠️ Fresh Setup (First Time)
echo     - Install all dependencies
echo     - Setup environment files
echo     - Initialize database
echo.
echo [4] 📊 Check Status
echo     - View running services
echo     - Health check all endpoints
echo.
echo [5] 🛑 Stop All Services
echo     - Stop all running services
echo     - Clean up processes
echo.
echo [6] 🧪 Run Tests
echo     - Comprehensive service testing
echo     - Performance checks
echo.
echo [0] Exit
echo.

set /p choice="Enter your choice (0-6): "

if "%choice%"=="1" (
    echo Starting full platform...
    powershell.exe -ExecutionPolicy Bypass -File ".\start-simple.ps1"
) else if "%choice%"=="2" (
    echo Quick starting platform...
    powershell.exe -ExecutionPolicy Bypass -File ".\quick-start.ps1"
) else if "%choice%"=="3" (
    echo Setting up fresh environment...
    powershell.exe -ExecutionPolicy Bypass -File ".\setup.ps1"
) else if "%choice%"=="4" (
    echo Checking service status...
    powershell.exe -ExecutionPolicy Bypass -File ".\dev.ps1" status
) else if "%choice%"=="5" (
    echo Stopping all services...
    powershell.exe -ExecutionPolicy Bypass -File ".\stop-all.ps1"
) else if "%choice%"=="6" (
    echo Running tests...
    powershell.exe -ExecutionPolicy Bypass -File ".\test-services.ps1"
) else if "%choice%"=="0" (
    echo Goodbye!
    exit /b 0
) else (
    echo Invalid choice. Please try again.
    pause
    goto :eof
)

echo.
echo Press any key to return to menu or close window...
pause >nul
goto :eof