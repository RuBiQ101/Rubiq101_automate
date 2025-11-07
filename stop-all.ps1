# Stop All Services Script
# Kills all processes running on common development ports

$ErrorActionPreference = "Continue"

function Write-ColorOutput {
    param($Message, $Color = "White")
    $colors = @{
        Success = "Green"
        Warning = "Yellow" 
        Error = "Red"
        Info = "Cyan"
        Header = "Magenta"
    }
    Write-Host $Message -ForegroundColor $colors[$Color]
}

function Kill-ProcessOnPort {
    param($Port)
    try {
        $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
        foreach ($connection in $connections) {
            $processId = $connection.OwningProcess
            if ($processId -and $processId -gt 0) {
                try {
                    $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
                    if ($process) {
                        Write-ColorOutput "🔪 Killing process '$($process.ProcessName)' (PID: $processId) on port $Port" "Warning"
                        Stop-Process -Id $processId -Force
                        return $true
                    }
                } catch {
                    Write-ColorOutput "⚠️ Could not kill process $processId on port $Port" "Warning"
                }
            }
        }
        return $false
    } catch {
        return $false
    }
}

Write-ColorOutput "🛑 Stopping AI Workflow Platform services..." "Header"

# Common development ports
$ports = @(3000, 3001, 3002, 3003, 3004, 3005, 3006, 5000, 5001, 8000, 8001, 8080)
$killedCount = 0

foreach ($port in $ports) {
    if (Kill-ProcessOnPort $port) {
        $killedCount++
    }
}

# Stop any background jobs
$jobs = Get-Job -ErrorAction SilentlyContinue
if ($jobs) {
    Write-ColorOutput "🔄 Stopping background jobs..." "Info"
    $jobs | Stop-Job
    $jobs | Remove-Job
    Write-ColorOutput "✅ Background jobs stopped" "Success"
}

# Stop Docker services
try {
    Set-Location "C:\New workspace for n8n\ai-workflow-platform\docker"
    Write-ColorOutput "🐳 Stopping Docker services..." "Info"
    docker-compose -f docker-compose.dev.yml down 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ Docker services stopped" "Success"
    }
} catch {
    Write-ColorOutput "⚠️ Could not stop Docker services (may not be running)" "Warning"
}

if ($killedCount -gt 0) {
    Write-ColorOutput "✅ Stopped $killedCount service(s)" "Success"
} else {
    Write-ColorOutput "ℹ️ No services were running" "Info"
}

Write-ColorOutput "🎉 All services stopped!" "Success"