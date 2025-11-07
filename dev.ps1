# Development Helper Script
# Provides various development utilities and shortcuts

param(
    [Parameter(Position=0)]
    [ValidateSet("status", "logs", "restart", "clean", "test", "build", "help")]
    [string]$Action = "help"
)

$WorkspaceRoot = "C:\New workspace for n8n\ai-workflow-platform"

function Write-ColorOutput {
    param($Message, $Color = "White")
    $colors = @{
        Success = "Green"; Warning = "Yellow"; Error = "Red"; Info = "Cyan"; Header = "Magenta"
    }
    Write-Host $Message -ForegroundColor $colors[$Color]
}

function Show-Status {
    Write-ColorOutput "📊 Service Status:" "Header"
    
    $services = @(
        @{ Name = "Backend API"; Port = 3001; Path = "/health" }
        @{ Name = "Marketing Site"; Port = 3003; Path = "" }
        @{ Name = "Frontend App"; Port = 3005; Path = "" }
    )
    
    foreach ($service in $services) {
        $url = "http://localhost:$($service.Port)$($service.Path)"
        try {
            $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
            Write-ColorOutput "✅ $($service.Name) - ONLINE (Port $($service.Port))" "Success"
        } catch {
            Write-ColorOutput "❌ $($service.Name) - OFFLINE (Port $($service.Port))" "Error"
        }
    }
    
    # Check background jobs
    $jobs = Get-Job -ErrorAction SilentlyContinue
    if ($jobs) {
        Write-ColorOutput "`n🔄 Background Jobs:" "Info"
        $jobs | ForEach-Object {
            $status = switch ($_.State) {
                "Running" { "Success" }
                "Failed" { "Error" }
                default { "Warning" }
            }
            Write-ColorOutput "  $($_.Name): $($_.State)" $status
        }
    }
}

function Show-Logs {
    Write-ColorOutput "📝 Recent logs from background jobs:" "Header"
    $jobs = Get-Job -ErrorAction SilentlyContinue
    if ($jobs) {
        foreach ($job in $jobs) {
            Write-ColorOutput "`n--- $($job.Name) ---" "Info"
            $output = Receive-Job -Job $job -Keep -ErrorAction SilentlyContinue
            if ($output) {
                $output | Select-Object -Last 10 | Write-Host
            } else {
                Write-ColorOutput "No recent output" "Warning"
            }
        }
    } else {
        Write-ColorOutput "No background jobs running" "Warning"
    }
}

function Restart-Services {
    Write-ColorOutput "🔄 Restarting all services..." "Warning"
    & "$WorkspaceRoot\stop-all.ps1"
    Start-Sleep -Seconds 3
    & "$WorkspaceRoot\quick-start.ps1" -SkipBrowser
}

function Clean-Environment {
    Write-ColorOutput "🧹 Cleaning development environment..." "Warning"
    
    # Stop services
    & "$WorkspaceRoot\stop-all.ps1"
    
    # Clean node_modules and reinstall (optional)
    $response = Read-Host "Clean node_modules and reinstall dependencies? (y/N)"
    if ($response -eq "y" -or $response -eq "Y") {
        @("backend", "frontend", "marketing-site") | ForEach-Object {
            $path = "$WorkspaceRoot\$_"
            if (Test-Path "$path\node_modules") {
                Write-ColorOutput "Cleaning $_ dependencies..." "Info"
                Remove-Item "$path\node_modules" -Recurse -Force
                Set-Location $path
                npm install
            }
        }
    }
    
    Write-ColorOutput "✅ Environment cleaned!" "Success"
}

function Run-Tests {
    Write-ColorOutput "🧪 Running tests..." "Info"
    & "$WorkspaceRoot\test-services.ps1"
}

function Build-All {
    Write-ColorOutput "🏗️ Building all projects..." "Info"
    
    @("backend", "frontend", "marketing-site") | ForEach-Object {
        $path = "$WorkspaceRoot\$_"
        Write-ColorOutput "Building $_..." "Info"
        Set-Location $path
        npm run build
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "✅ $_ build successful" "Success"
        } else {
            Write-ColorOutput "❌ $_ build failed" "Error"
        }
    }
}

function Show-Help {
    Write-ColorOutput "🛠️ AI Workflow Platform - Development Helper" "Header"
    Write-ColorOutput "`nAvailable commands:" "Info"
    Write-ColorOutput "  .\dev.ps1 status    - Show service status" "Info"
    Write-ColorOutput "  .\dev.ps1 logs      - Show recent logs" "Info"
    Write-ColorOutput "  .\dev.ps1 restart   - Restart all services" "Info"
    Write-ColorOutput "  .\dev.ps1 clean     - Clean environment" "Info"
    Write-ColorOutput "  .\dev.ps1 test      - Run service tests" "Info"
    Write-ColorOutput "  .\dev.ps1 build     - Build all projects" "Info"
    Write-ColorOutput "  .\dev.ps1 help      - Show this help" "Info"
    
    Write-ColorOutput "`nOther useful scripts:" "Info"
    Write-ColorOutput "  .\start-all.ps1     - Full startup with health checks" "Info"
    Write-ColorOutput "  .\quick-start.ps1    - Fast startup for development" "Info"
    Write-ColorOutput "  .\stop-all.ps1       - Stop all services" "Info"
    Write-ColorOutput "  .\test-services.ps1  - Comprehensive testing" "Info"
}

# Main execution
Set-Location $WorkspaceRoot

switch ($Action) {
    "status" { Show-Status }
    "logs" { Show-Logs }
    "restart" { Restart-Services }
    "clean" { Clean-Environment }
    "test" { Run-Tests }
    "build" { Build-All }
    "help" { Show-Help }
    default { Show-Help }
}