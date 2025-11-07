# One-Click Setup Script for Fresh Environment
# This script sets up everything from scratch including dependencies

param(
    [switch]$SkipDocker,
    [switch]$SkipNodeModules
)

$ErrorActionPreference = "Stop"
$WorkspaceRoot = "C:\New workspace for n8n\ai-workflow-platform"

function Write-ColorOutput {
    param($Message, $Color = "White")
    $colors = @{
        Success = "Green"; Warning = "Yellow"; Error = "Red"; Info = "Cyan"; Header = "Magenta"
    }
    Write-Host $Message -ForegroundColor $colors[$Color]
}

function Test-Command {
    param($Command)
    try {
        & $Command --version 2>$null | Out-Null
        return $true
    } catch {
        return $false
    }
}

Write-ColorOutput "╔══════════════════════════════════════════════════════════════════╗" "Header"
Write-ColorOutput "║              AI Workflow Platform - Fresh Setup                 ║" "Header"
Write-ColorOutput "║                  Complete Environment Setup                     ║" "Header"
Write-ColorOutput "╚══════════════════════════════════════════════════════════════════╝" "Header"

# Step 1: Prerequisites check
Write-ColorOutput "`n📋 Checking prerequisites..." "Info"

$prerequisites = @(
    @{ Name = "Node.js"; Command = "node"; Required = $true }
    @{ Name = "npm"; Command = "npm"; Required = $true }
    @{ Name = "Git"; Command = "git"; Required = $false }
    @{ Name = "Docker"; Command = "docker"; Required = $false }
)

$missingRequired = @()

foreach ($prereq in $prerequisites) {
    if (Test-Command $prereq.Command) {
        Write-ColorOutput "✅ $($prereq.Name) is installed" "Success"
    } else {
        if ($prereq.Required) {
            Write-ColorOutput "❌ $($prereq.Name) is required but not found" "Error"
            $missingRequired += $prereq.Name
        } else {
            Write-ColorOutput "⚠️ $($prereq.Name) not found (optional)" "Warning"
        }
    }
}

if ($missingRequired.Count -gt 0) {
    Write-ColorOutput "`n❌ Missing required prerequisites: $($missingRequired -join ', ')" "Error"
    Write-ColorOutput "Please install them and run this script again." "Error"
    exit 1
}

# Step 2: Setup workspace
Write-ColorOutput "`n📁 Setting up workspace..." "Info"

if (-not (Test-Path $WorkspaceRoot)) {
    Write-ColorOutput "❌ Workspace directory not found: $WorkspaceRoot" "Error"
    exit 1
}

Set-Location $WorkspaceRoot

# Step 3: Install dependencies
if (-not $SkipNodeModules) {
    Write-ColorOutput "`n📦 Installing dependencies..." "Info"
    
    $projects = @("backend", "frontend", "marketing-site")
    
    foreach ($project in $projects) {
        $projectPath = "$WorkspaceRoot\$project"
        if (Test-Path "$projectPath\package.json") {
            Write-ColorOutput "Installing $project dependencies..." "Info"
            Set-Location $projectPath
            
            # Clean install
            if (Test-Path "node_modules") {
                Remove-Item "node_modules" -Recurse -Force
            }
            if (Test-Path "package-lock.json") {
                Remove-Item "package-lock.json" -Force
            }
            
            npm install
            
            if ($LASTEXITCODE -eq 0) {
                Write-ColorOutput "✅ $project dependencies installed" "Success"
            } else {
                Write-ColorOutput "❌ Failed to install $project dependencies" "Error"
                exit 1
            }
        }
    }
}

# Step 4: Setup Docker environment
if (-not $SkipDocker -and (Test-Command "docker")) {
    Write-ColorOutput "`n🐳 Setting up Docker environment..." "Info"
    
    Set-Location "$WorkspaceRoot\docker"
    
    # Create docker-compose.dev.yml if it doesn't exist
    if (-not (Test-Path "docker-compose.dev.yml")) {
        Write-ColorOutput "Creating docker-compose.dev.yml..." "Info"
        @"
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: workflow_platform
      POSTGRES_USER: dev_user
      POSTGRES_PASSWORD: dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dev_user -d workflow_platform"]
      interval: 30s
      timeout: 10s
      retries: 3

  redis:
    image: redis:7
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  postgres_data:
  redis_data:
"@ | Out-File -FilePath "docker-compose.dev.yml" -Encoding UTF8
    }
    
    # Start Docker services
    docker-compose -f docker-compose.dev.yml up -d
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ Docker services started" "Success"
    } else {
        Write-ColorOutput "⚠️ Docker services may have issues, but continuing..." "Warning"
    }
}

# Step 5: Create environment files
Write-ColorOutput "`n⚙️ Creating environment configuration..." "Info"

# Backend .env
$backendEnv = @"
# Database Configuration
DATABASE_URL=postgresql://dev_user:dev_password@localhost:5432/workflow_platform
DB_HOST=localhost
DB_PORT=5432
DB_NAME=workflow_platform
DB_USER=dev_user
DB_PASSWORD=dev_password

# Redis Configuration
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379

# Application Configuration
NODE_ENV=development
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-for-development-only

# API Configuration
API_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3005
MARKETING_URL=http://localhost:3003

# Logging
LOG_LEVEL=debug
"@

$backendEnvPath = "$WorkspaceRoot\backend\.env"
if (-not (Test-Path $backendEnvPath)) {
    $backendEnv | Out-File -FilePath $backendEnvPath -Encoding UTF8
    Write-ColorOutput "✅ Backend .env created" "Success"
}

# Frontend .env.local
$frontendEnv = @"
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_MARKETING_URL=http://localhost:3003
NEXTAUTH_URL=http://localhost:3005
NEXTAUTH_SECRET=your-nextauth-secret-for-development
"@

$frontendEnvPath = "$WorkspaceRoot\frontend\.env.local"
if (-not (Test-Path $frontendEnvPath)) {
    $frontendEnv | Out-File -FilePath $frontendEnvPath -Encoding UTF8
    Write-ColorOutput "✅ Frontend .env.local created" "Success"
}

# Marketing .env.local
$marketingEnv = @"
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3005
"@

$marketingEnvPath = "$WorkspaceRoot\marketing-site\.env.local"
if (-not (Test-Path $marketingEnvPath)) {
    $marketingEnv | Out-File -FilePath $marketingEnvPath -Encoding UTF8
    Write-ColorOutput "✅ Marketing .env.local created" "Success"
}

# Step 6: Initialize database
Write-ColorOutput "`n🗄️ Initializing database..." "Info"
Set-Location "$WorkspaceRoot\backend"

Start-Sleep -Seconds 5  # Wait for database to be ready

try {
    npm run migrate 2>$null
    Write-ColorOutput "✅ Database initialized" "Success"
} catch {
    Write-ColorOutput "⚠️ Database migration may have failed (will try again on first run)" "Warning"
}

# Step 7: Create shortcut scripts if they don't exist
Write-ColorOutput "`n📝 Creating management scripts..." "Info"

$shortcuts = @(
    @{ Name = "start.cmd"; Content = "@echo off`npowershell.exe -ExecutionPolicy Bypass -File `".\start-all.ps1`"`npause" }
    @{ Name = "quick.cmd"; Content = "@echo off`npowershell.exe -ExecutionPolicy Bypass -File `".\quick-start.ps1`"`npause" }
    @{ Name = "stop.cmd"; Content = "@echo off`npowershell.exe -ExecutionPolicy Bypass -File `".\stop-all.ps1`"`npause" }
)

foreach ($shortcut in $shortcuts) {
    $path = "$WorkspaceRoot\$($shortcut.Name)"
    if (-not (Test-Path $path)) {
        $shortcut.Content | Out-File -FilePath $path -Encoding ASCII
        Write-ColorOutput "✅ Created $($shortcut.Name)" "Success"
    }
}

# Final summary
Set-Location $WorkspaceRoot

Write-ColorOutput "`n╔══════════════════════════════════════════════════════════════════╗" "Header"
Write-ColorOutput "║                    🎉 SETUP COMPLETE!                           ║" "Header"
Write-ColorOutput "╚══════════════════════════════════════════════════════════════════╝" "Header"

Write-ColorOutput "`n🚀 Ready to start! Choose your startup method:" "Success"
Write-ColorOutput "`n   Full startup (recommended for first run):" "Info"
Write-ColorOutput "     .\start-all.ps1        (PowerShell)" "Cyan"
Write-ColorOutput "     start.cmd              (Double-click)" "Cyan"

Write-ColorOutput "`n   Quick startup (for development):" "Info"
Write-ColorOutput "     .\quick-start.ps1      (PowerShell)" "Cyan"
Write-ColorOutput "     quick.cmd              (Double-click)" "Cyan"

Write-ColorOutput "`n   Development helpers:" "Info"
Write-ColorOutput "     .\dev.ps1 status       (Check service status)" "Cyan"
Write-ColorOutput "     .\dev.ps1 help         (Show all commands)" "Cyan"
Write-ColorOutput "     .\stop-all.ps1         (Stop all services)" "Cyan"

Write-ColorOutput "`n💡 Your services will run on:" "Info"
Write-ColorOutput "   • Marketing Site:  http://localhost:3003" "Info"
Write-ColorOutput "   • Frontend App:    http://localhost:3005" "Info"
Write-ColorOutput "   • Backend API:     http://localhost:3001" "Info"

Write-ColorOutput "`nPress any key to start the platform now..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Auto-start after setup
Write-ColorOutput "`n🚀 Starting the platform..." "Info"
& "$WorkspaceRoot\start-all.ps1"