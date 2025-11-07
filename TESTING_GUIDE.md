# 🧪 AI Workflow Platform - Testing Guide

## Quick Start Testing

### 1. **Check Service Status**
```powershell
# Check which ports are in use
netstat -ano | findstr ":3001\|:3003\|:3004"

# Check if all services are responding
Invoke-WebRequest -Uri "http://localhost:3003" -UseBasicParsing
Invoke-WebRequest -Uri "http://localhost:3004" -UseBasicParsing  
Invoke-WebRequest -Uri "http://localhost:3001/health" -UseBasicParsing
```

### 2. **Manual Testing URLs**
- **Marketing Site**: http://localhost:3003
- **Frontend App**: http://localhost:3004
- **Backend API**: http://localhost:3001/health

---

## 📋 **Detailed Testing Checklist**

### **Marketing Site Testing (Port 3003)**

#### Visual Components:
- [ ] Header navigation with Orkx logo
- [ ] Hero section with compelling headline
- [ ] Features section with 6 feature cards
- [ ] How It Works section (3 steps)
- [ ] Interactive Demo section (3 workflow examples)
- [ ] Technology Stack showcase
- [ ] Pricing table with 3 tiers
- [ ] Footer with links

#### Functionality:
- [ ] Navigation menu scrolls to sections
- [ ] Mobile responsive design
- [ ] CTA buttons link to app (localhost:3004)
- [ ] All images and icons load properly
- [ ] Hover effects on interactive elements

#### Mobile Testing:
- [ ] Open browser dev tools (F12)
- [ ] Toggle device toolbar
- [ ] Test on different screen sizes
- [ ] Check hamburger menu on mobile

### **Frontend App Testing (Port 3004)**

#### Authentication Flow:
- [ ] Dashboard loads without authentication
- [ ] Shows "Please log in to continue" message
- [ ] Sidebar navigation is visible
- [ ] User context properly handled

#### Dashboard Features:
- [ ] Statistics cards display
- [ ] Recent workflows section
- [ ] Recent executions section  
- [ ] Create workflow button works
- [ ] Loading states display

#### Workflows Management:
- [ ] Navigate to `/workflows` page
- [ ] Search functionality
- [ ] Filter by status dropdown
- [ ] Create new workflow button
- [ ] Workflow cards display properly

#### Create Workflow:
- [ ] Navigate to `/workflows/new`
- [ ] Form validation works
- [ ] Required field errors
- [ ] Character count for description
- [ ] Cancel and Create buttons

#### Navigation:
- [ ] Sidebar collapses/expands
- [ ] All navigation links work
- [ ] Breadcrumb navigation
- [ ] Back buttons function

### **Backend API Testing (Port 3001)**

#### Health Checks:
```powershell
# Test health endpoint
Invoke-WebRequest -Uri "http://localhost:3001/health" -UseBasicParsing

# Expected response: {"status":"ok","timestamp":"...","database":"configured","redis":"configured"}
```

#### Authentication Testing:
```powershell
# Test protected endpoint (should return 401)
try { 
    Invoke-WebRequest -Uri "http://localhost:3001/api/workflows" -UseBasicParsing 
} catch { 
    Write-Host "Expected 401 Unauthorized: $($_.Exception.Message)" 
}
```

#### Database Connection:
- [ ] Migrations completed successfully
- [ ] Database connection established
- [ ] Redis connection working

---

## 🔧 **Automated Testing Scripts**

### **Quick Status Check Script**
```powershell
# Save as: test-services.ps1
Write-Host "🧪 Testing AI Workflow Platform Services..." -ForegroundColor Cyan

# Test Marketing Site
try {
    $marketing = Invoke-WebRequest -Uri "http://localhost:3003" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ Marketing Site (3003): OK" -ForegroundColor Green
} catch {
    Write-Host "❌ Marketing Site (3003): Failed" -ForegroundColor Red
}

# Test Frontend App  
try {
    $frontend = Invoke-WebRequest -Uri "http://localhost:3004" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ Frontend App (3004): OK" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend App (3004): Failed" -ForegroundColor Red
}

# Test Backend API
try {
    $backend = Invoke-WebRequest -Uri "http://localhost:3001/health" -UseBasicParsing -TimeoutSec 5
    $health = $backend.Content | ConvertFrom-Json
    if ($health.status -eq "ok") {
        Write-Host "✅ Backend API (3001): OK - DB: $($health.database), Redis: $($health.redis)" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Backend API (3001): Failed" -ForegroundColor Red
}

Write-Host "`n🎯 Testing Complete!" -ForegroundColor Cyan
```

### **Performance Testing Script**
```powershell
# Save as: test-performance.ps1
Write-Host "⚡ Performance Testing..." -ForegroundColor Yellow

$urls = @(
    "http://localhost:3003",
    "http://localhost:3004", 
    "http://localhost:3001/health"
)

foreach ($url in $urls) {
    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    try {
        Invoke-WebRequest -Uri $url -UseBasicParsing | Out-Null
        $stopwatch.Stop()
        Write-Host "⏱️ $url - Response time: $($stopwatch.ElapsedMilliseconds)ms" -ForegroundColor Cyan
    } catch {
        Write-Host "❌ $url - Failed to respond" -ForegroundColor Red
    }
}
```

---

## 🎮 **Interactive Testing**

### **Browser Testing Steps:**

1. **Open Multiple Browser Tabs:**
   ```
   Tab 1: http://localhost:3003 (Marketing)
   Tab 2: http://localhost:3004 (Frontend App)
   Tab 3: http://localhost:3001/health (API Health)
   ```

2. **Marketing Site Journey:**
   - Scroll through all sections
   - Click "Start Free Trial" buttons
   - Test mobile responsiveness
   - Check all animations and hover effects

3. **Frontend App Journey:**
   - Navigate through all sidebar sections
   - Try creating a new workflow
   - Test form validation
   - Check loading states

4. **Developer Tools Testing:**
   - Open F12 Developer Tools
   - Check Console for errors
   - Monitor Network tab for API calls
   - Test responsive design in device mode

---

## 🚨 **Common Issues & Solutions**

### **Port Conflicts:**
```powershell
# Find what's using a port
netstat -ano | findstr ":3001"

# Kill a process by PID
taskkill /PID <PID_NUMBER> /F
```

### **Service Not Starting:**
```powershell
# Restart all services
cd "C:\New workspace for n8n\ai-workflow-platform"

# Terminal 1: Marketing
cd marketing-site; npm run dev

# Terminal 2: Frontend  
cd frontend; npm run dev -- --port 3004

# Terminal 3: Backend
cd backend; npm run dev
```

### **Database Connection Issues:**
```powershell
# Check Docker containers
docker ps

# Restart database
docker-compose -f docker/docker-compose.dev.yml down
docker-compose -f docker/docker-compose.dev.yml up -d
```

---

## 📊 **Expected Test Results**

### **All Green Results:**
- ✅ Marketing site loads in < 3 seconds
- ✅ Frontend app renders without console errors  
- ✅ Backend API returns health status OK
- ✅ All navigation works smoothly
- ✅ Forms validate properly
- ✅ Mobile responsive on all screen sizes
- ✅ No broken images or missing assets

### **Success Metrics:**
- **Load Time**: < 3 seconds for initial page load
- **Error Rate**: 0% for critical user paths
- **Responsiveness**: Works on 320px - 1920px screens
- **API Response**: < 500ms for health checks
- **User Experience**: Smooth navigation, clear feedback

---

## 🎯 **Next Steps After Testing**

1. **User Acceptance Testing**: Get feedback from real users
2. **Performance Optimization**: Analyze and improve load times
3. **Feature Testing**: Test workflow creation and execution
4. **Security Testing**: Verify authentication and authorization
5. **Production Deployment**: Set up staging and production environments

Ready to test! 🚀