# Quick Start Script - No dependencies check, faster startup
param(
    [switch]$SkipBrowser
)

$WorkspaceRoot = "C:\New workspace for n8n\ai-workflow-platform"

function Write-ColorOutput {
    param($Message, $Color = "White")
    $colors = @{
        Success = "Green"; Warning = "Yellow"; Error = "Red"; Info = "Cyan"; Header = "Magenta"
    }
    Write-Host $Message -ForegroundColor $colors[$Color]
}

Write-ColorOutput "⚡ Quick Start - AI Workflow Platform" "Header"

Set-Location $WorkspaceRoot

# Start services in background with fixed ports
Write-ColorOutput "🚀 Starting services..." "Info"

# Backend on 3001
Start-Job -Name "Backend" -ScriptBlock {
    Set-Location "C:\New workspace for n8n\ai-workflow-platform\backend"
    npm run dev
} | Out-Null

# Marketing on 3003
Start-Job -Name "Marketing" -ScriptBlock {
    Set-Location "C:\New workspace for n8n\ai-workflow-platform\marketing-site"
    npm run dev -- --port 3003
} | Out-Null

# Frontend on 3005
Start-Job -Name "Frontend" -ScriptBlock {
    Set-Location "C:\New workspace for n8n\ai-workflow-platform\frontend"
    npm run dev -- --port 3005
} | Out-Null

Write-ColorOutput "⏳ Waiting for services to start..." "Info"
Start-Sleep -Seconds 15

# Quick health check
$services = @(
    @{ Name = "Backend API"; Url = "http://localhost:3001/health" }
    @{ Name = "Marketing Site"; Url = "http://localhost:3003" }
    @{ Name = "Frontend App"; Url = "http://localhost:3005" }
)

foreach ($service in $services) {
    try {
        $response = Invoke-WebRequest -Uri $service.Url -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
        Write-ColorOutput "✅ $($service.Name) - ONLINE" "Success"
    } catch {
        Write-ColorOutput "⚠️ $($service.Name) - Starting..." "Warning"
    }
}

if (-not $SkipBrowser) {
    Write-ColorOutput "🌐 Opening browser..." "Info"
    Start-Process "http://localhost:3003"
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:3005"
}

Write-ColorOutput "`n🎉 Quick start complete!" "Success"
Write-ColorOutput "   Marketing: http://localhost:3003" "Cyan"
Write-ColorOutput "   Frontend:  http://localhost:3005" "Cyan"
Write-ColorOutput "   Backend:   http://localhost:3001" "Cyan"
Write-ColorOutput "`nRun .\stop-all.ps1 to stop services" "Info"