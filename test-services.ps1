# AI Workflow Platform - Quick Test Script
# Run this script to test all services

Write-Host "Testing AI Workflow Platform Services..." -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor White

# Test Marketing Site
Write-Host "`nTesting Marketing Site..." -ForegroundColor Yellow
try {
    $marketing = Invoke-WebRequest -Uri "http://localhost:3003" -UseBasicParsing -TimeoutSec 10
    if ($marketing.StatusCode -eq 200) {
        Write-Host "✅ Marketing Site (Port 3003): ONLINE" -ForegroundColor Green
        Write-Host "   Status: $($marketing.StatusCode)" -ForegroundColor Gray
        Write-Host "   Size: $([math]::Round($marketing.RawContentLength/1024, 2)) KB" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Marketing Site (Port 3003): OFFLINE" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Frontend App
Write-Host "`nTesting Frontend Application..." -ForegroundColor Yellow
try {
    $frontend = Invoke-WebRequest -Uri "http://localhost:3004" -UseBasicParsing -TimeoutSec 10
    if ($frontend.StatusCode -eq 200) {
        Write-Host "✅ Frontend App (Port 3004): ONLINE" -ForegroundColor Green
        Write-Host "   Status: $($frontend.StatusCode)" -ForegroundColor Gray
        Write-Host "   Size: $([math]::Round($frontend.RawContentLength/1024, 2)) KB" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Frontend App (Port 3004): OFFLINE" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Backend API
Write-Host "`nTesting Backend API..." -ForegroundColor Yellow
try {
    $backend = Invoke-WebRequest -Uri "http://localhost:3001/health" -UseBasicParsing -TimeoutSec 10
    if ($backend.StatusCode -eq 200) {
        $health = $backend.Content | ConvertFrom-Json
        Write-Host "✅ Backend API (Port 3001): ONLINE" -ForegroundColor Green
        Write-Host "   Status: $($health.status.ToUpper())" -ForegroundColor Gray
        Write-Host "   Database: $($health.database)" -ForegroundColor Gray
        Write-Host "   Redis: $($health.redis)" -ForegroundColor Gray
        Write-Host "   Timestamp: $($health.timestamp)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Backend API (Port 3001): OFFLINE" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test API Authentication (Expected to fail with 401)
Write-Host "`nTesting API Authentication..." -ForegroundColor Yellow
try {
    $auth_test = Invoke-WebRequest -Uri "http://localhost:3001/api/workflows" -UseBasicParsing -TimeoutSec 10
    Write-Host "⚠️ Authentication: UNEXPECTED SUCCESS" -ForegroundColor Yellow
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "✅ Authentication: WORKING (401 Unauthorized)" -ForegroundColor Green
    } else {
        Write-Host "❌ Authentication: ERROR ($($_.Exception.Response.StatusCode))" -ForegroundColor Red
    }
}

# Performance Test
Write-Host "`nPerformance Testing..." -ForegroundColor Yellow
$urls = @(
    @{name="Marketing Site"; url="http://localhost:3003"},
    @{name="Frontend App"; url="http://localhost:3004"}, 
    @{name="Backend API"; url="http://localhost:3001/health"}
)

foreach ($test in $urls) {
    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    try {
        Invoke-WebRequest -Uri $test.url -UseBasicParsing -TimeoutSec 5 | Out-Null
        $stopwatch.Stop()
        $responseTime = $stopwatch.ElapsedMilliseconds
        
        if ($responseTime -lt 1000) {
            Write-Host "✅ $($test.name): ${responseTime}ms (Fast)" -ForegroundColor Green
        } elseif ($responseTime -lt 3000) {
            Write-Host "⚠️ $($test.name): ${responseTime}ms (Acceptable)" -ForegroundColor Yellow
        } else {
            Write-Host "❌ $($test.name): ${responseTime}ms (Slow)" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ $($test.name): Failed to respond" -ForegroundColor Red
    }
}

# Summary
Write-Host "`nTesting Complete!" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor White
Write-Host "Next Steps:" -ForegroundColor White
Write-Host "1. Open browser tabs to test manually:" -ForegroundColor Gray
Write-Host "   - Marketing: http://localhost:3003" -ForegroundColor Gray
Write-Host "   - Frontend:  http://localhost:3004" -ForegroundColor Gray
Write-Host "   - API:       http://localhost:3001/health" -ForegroundColor Gray
Write-Host "2. Test user flows and interactions" -ForegroundColor Gray
Write-Host "3. Check mobile responsiveness (F12 > Device Mode)" -ForegroundColor Gray
Write-Host "4. Review console for any JavaScript errors" -ForegroundColor Gray