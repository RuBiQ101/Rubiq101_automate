# AI Workflow Platform - One-Click Startup Script
# This script starts all services with automatic port detection and conflict resolution

param(
    [switch]$Clean,
    [switch]$SkipDatabase,
    [switch]$Verbose
)

$ErrorActionPreference = "Continue"
$WorkspaceRoot = "C:\New workspace for n8n\ai-workflow-platform"

# Colors for output
$Colors = @{
    Success = "Green"
    Warning = "Yellow" 
    Error = "Red"
    Info = "Cyan"
    Header = "Magenta"
}

function Write-ColorOutput {
    param($Message, $Color = "White")
    Write-Host $Message -ForegroundColor $Colors[$Color]
}

function Test-Port {
    param($Port)
    try {
        $connection = Test-NetConnection -ComputerName "localhost" -Port $Port -WarningAction SilentlyContinue
        return $connection.TcpTestSucceeded
    } catch {
        return $false
    }
}

function Kill-ProcessOnPort {
    param($Port)
    try {
        $processId = (Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue).OwningProcess
        if ($processId) {
            Write-ColorOutput "  → Killing process $processId on port $Port" "Warning"
            Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
            Start-Sleep -Seconds 2
        }
    } catch {
        # Process might not exist or already killed
    }
}

function Find-AvailablePort {
    param($StartPort, $EndPort = 9999)
    for ($port = $StartPort; $port -le $EndPort; $port++) {
        if (-not (Test-Port $port)) {
            return $port
        }
    }
    throw "No available ports found between $StartPort and $EndPort"
}

function Start-ServiceInBackground {
    param($Name, $Command, $WorkingDirectory, $Port, $ExpectedUrl)
    
    Write-ColorOutput "🚀 Starting $Name on port $Port..." "Info"
    
    $job = Start-Job -ScriptBlock {
        param($cmd, $dir)
        Set-Location $dir
        Invoke-Expression $cmd
    } -ArgumentList $Command, $WorkingDirectory
    
    # Wait for service to start
    $maxWait = 60 # seconds
    $waited = 0
    
    while ($waited -lt $maxWait) {
        Start-Sleep -Seconds 2
        $waited += 2
        
        try {
            $response = Invoke-WebRequest -Uri $ExpectedUrl -UseBasicParsing -TimeoutSec 3 -ErrorAction SilentlyContinue
            if ($response.StatusCode -eq 200) {
                Write-ColorOutput "✅ $Name is ready!" "Success"
                return @{ Job = $job; Port = $Port; Url = $ExpectedUrl; Status = "Success" }
            }
        } catch {
            # Still starting...
        }
        
        if ($job.State -eq "Failed") {
            Write-ColorOutput "❌ $Name failed to start" "Error"
            return @{ Job = $job; Port = $Port; Url = $ExpectedUrl; Status = "Failed" }
        }
    }
    
    Write-ColorOutput "⚠️ $Name is taking longer than expected to start" "Warning"
    return @{ Job = $job; Port = $Port; Url = $ExpectedUrl; Status = "Timeout" }
}

# Header
Clear-Host
Write-ColorOutput "╔══════════════════════════════════════════════════════════════════╗" "Header"
Write-ColorOutput "║                 AI Workflow Platform Startup                    ║" "Header"
Write-ColorOutput "║                     One-Click Launcher                          ║" "Header"
Write-ColorOutput "╚══════════════════════════════════════════════════════════════════╝" "Header"
Write-Host ""

# Change to workspace directory
if (-not (Test-Path $WorkspaceRoot)) {
    Write-ColorOutput "❌ Workspace directory not found: $WorkspaceRoot" "Error"
    exit 1
}

Set-Location $WorkspaceRoot
Write-ColorOutput "📁 Working directory: $WorkspaceRoot" "Info"

# Step 1: Clean up existing processes if requested
if ($Clean) {
    Write-ColorOutput "`n🧹 Cleaning up existing processes..." "Warning"
    @(3000, 3001, 3002, 3003, 3004, 3005) | ForEach-Object {
        if (Test-Port $_) {
            Kill-ProcessOnPort $_
        }
    }
    Write-ColorOutput "✅ Cleanup complete" "Success"
}

# Step 2: Start Docker services (Database & Redis)
if (-not $SkipDatabase) {
    Write-ColorOutput "`n🐳 Starting Docker services (PostgreSQL & Redis)..." "Info"
    try {
        # Check if Docker is running
        docker --version | Out-Null
        
        # Start database services
        Set-Location "$WorkspaceRoot\docker"
        $dockerResult = docker-compose -f docker-compose.dev.yml up -d 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "✅ Docker services started successfully" "Success"
            
            # Wait for database to be ready
            Write-ColorOutput "⏳ Waiting for database to be ready..." "Info"
            Start-Sleep -Seconds 10
            
        } else {
            Write-ColorOutput "⚠️ Docker services may already be running or failed to start" "Warning"
        }
    } catch {
        Write-ColorOutput "❌ Failed to start Docker services: $($_.Exception.Message)" "Error"
        Write-ColorOutput "💡 Make sure Docker Desktop is installed and running" "Info"
    }
}

# Step 3: Find available ports
Write-ColorOutput "`n🔍 Finding available ports..." "Info"

$ports = @{
    Backend = Find-AvailablePort 3001
    Marketing = Find-AvailablePort 3000
    Frontend = Find-AvailablePort 3002
}

# Adjust if conflicts
if ($ports.Marketing -eq $ports.Backend) { $ports.Marketing = Find-AvailablePort ($ports.Backend + 1) }
if ($ports.Frontend -eq $ports.Backend -or $ports.Frontend -eq $ports.Marketing) { 
    $ports.Frontend = Find-AvailablePort ([Math]::Max($ports.Backend, $ports.Marketing) + 1) 
}

Write-ColorOutput "📋 Port assignments:" "Info"
Write-ColorOutput "  • Backend API: $($ports.Backend)" "Info"
Write-ColorOutput "  • Marketing Site: $($ports.Marketing)" "Info"
Write-ColorOutput "  • Frontend App: $($ports.Frontend)" "Info"

# Step 4: Start services
Write-ColorOutput "`n🚀 Starting all services..." "Header"

$services = @()

# Start Backend
Set-Location "$WorkspaceRoot\backend"
$backendJob = Start-ServiceInBackground -Name "Backend API" -Command "npm run dev" -WorkingDirectory (Get-Location) -Port $ports.Backend -ExpectedUrl "http://localhost:$($ports.Backend)/health"
$services += $backendJob

# Start Marketing Site
Set-Location "$WorkspaceRoot\marketing-site"
$marketingCommand = if ($ports.Marketing -ne 3000) { "npm run dev -- --port $($ports.Marketing)" } else { "npm run dev" }
$marketingJob = Start-ServiceInBackground -Name "Marketing Site" -Command $marketingCommand -WorkingDirectory (Get-Location) -Port $ports.Marketing -ExpectedUrl "http://localhost:$($ports.Marketing)"
$services += $marketingJob

# Start Frontend App
Set-Location "$WorkspaceRoot\frontend"
$frontendCommand = if ($ports.Frontend -ne 3000) { "npm run dev -- --port $($ports.Frontend)" } else { "npm run dev" }
$frontendJob = Start-ServiceInBackground -Name "Frontend App" -Command $frontendCommand -WorkingDirectory (Get-Location) -Port $ports.Frontend -ExpectedUrl "http://localhost:$($ports.Frontend)"
$services += $frontendJob

# Step 5: Final status check
Write-ColorOutput "`n🔍 Final status check..." "Info"
Start-Sleep -Seconds 5

$allSuccessful = $true
foreach ($service in $services) {
    if ($service.Status -eq "Success") {
        Write-ColorOutput "✅ $($service.Url) - ONLINE" "Success"
    } else {
        Write-ColorOutput "❌ $($service.Url) - OFFLINE" "Error"
        $allSuccessful = $false
    }
}

# Step 6: Open browser tabs
if ($allSuccessful) {
    Write-ColorOutput "`n🌐 Opening browser tabs..." "Info"
    Start-Process "http://localhost:$($ports.Marketing)"
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:$($ports.Frontend)"
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:$($ports.Backend)/health"
}

# Final summary
Write-ColorOutput "`n╔══════════════════════════════════════════════════════════════════╗" "Header"
Write-ColorOutput "║                        🎉 STARTUP COMPLETE!                     ║" "Header"
Write-ColorOutput "╚══════════════════════════════════════════════════════════════════╝" "Header"

Write-ColorOutput "`n📱 Your services are running at:" "Success"
Write-ColorOutput "   Marketing Site:  http://localhost:$($ports.Marketing)" "Cyan"
Write-ColorOutput "   Frontend App:    http://localhost:$($ports.Frontend)" "Cyan"
Write-ColorOutput "   Backend API:     http://localhost:$($ports.Backend)" "Cyan"

Write-ColorOutput "`n🛠️ Useful commands:" "Info"
Write-ColorOutput "   Test services:   .\test-services.ps1" "Info"
Write-ColorOutput "   Stop all:        .\stop-all.ps1" "Info"
Write-ColorOutput "   View logs:       Get-Job | Receive-Job" "Info"

Write-ColorOutput "`n💡 Keep this PowerShell window open to maintain the services!" "Warning"
Write-ColorOutput "   Press Ctrl+C to stop all services" "Warning"

# Keep script running and monitor services
if ($allSuccessful) {
    Write-ColorOutput "`nMonitoring services... (Press Ctrl+C to stop)" "Info"
    try {
        while ($true) {
            Start-Sleep -Seconds 30
            # Optional: Add health check monitoring here
        }
    } catch {
        Write-ColorOutput "`nStopping all services..." "Warning"
        Get-Job | Stop-Job
        Get-Job | Remove-Job
    }
}