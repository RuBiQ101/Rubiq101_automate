# AI Workflow Platform 🚀

A comprehensive AI-powered workflow automation platform with a modern web interface.

## 🎯 One-Click Startup Options

### For New Users (First Time Setup)
```bash
# Complete setup from scratch
.\setup.ps1
# OR double-click
setup.cmd
```

### For Regular Development

#### Option 1: Full Startup (Recommended)
```bash
# Complete startup with health checks
.\start-all.ps1
# OR double-click
start.cmd
```

#### Option 2: Quick Start (Fast)
```bash
# Fast startup for development
.\quick-start.ps1
# OR double-click
quick.cmd
```

#### Option 3: Interactive Launcher
```bash
# Menu-driven interface
.\launcher.cmd
```

## 🛠️ Management Commands

### Service Management
```bash
# Check service status
.\dev.ps1 status

# View logs
.\dev.ps1 logs

# Restart all services
.\dev.ps1 restart

# Stop all services
.\stop-all.ps1
# OR
stop.cmd
```

### Development Tools
```bash
# Run comprehensive tests
.\test-services.ps1

# Clean environment
.\dev.ps1 clean

# Build all projects
.\dev.ps1 build

# Show all available commands
.\dev.ps1 help
```

## 🌐 Service URLs

Once started, your services will be available at:

- **Marketing Site**: http://localhost:3003
- **Frontend App**: http://localhost:3005  
- **Backend API**: http://localhost:3001

## 📋 Prerequisites

### Required
- Node.js (v18 or higher)
- npm (v8 or higher)

### Optional
- Docker Desktop (for database services)
- Git (for version control)

## 🏗️ Architecture

```
ai-workflow-platform/
├── backend/           # Express.js API server
├── frontend/          # Next.js workflow builder
├── marketing-site/    # Next.js marketing website
├── docker/           # Database containers
└── scripts/          # Management utilities
```

### Backend (Port 3001)
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Redis caching
- **Features**: JWT authentication, REST API, health monitoring

### Frontend App (Port 3005)
- **Framework**: Next.js 15 with React 19
- **UI Library**: Tailwind CSS with Heroicons
- **Features**: React Flow workflow builder, responsive design

### Marketing Site (Port 3003)
- **Framework**: Next.js 15
- **UI Library**: Tailwind CSS
- **Features**: Landing page, feature showcase, demo sections

## 🚀 Quick Start Guide

### 1. First Time Setup
```bash
# Clone and setup (if not already done)
git clone <repository-url>
cd ai-workflow-platform

# Run complete setup
.\setup.ps1
```

### 2. Daily Development
```bash
# Quick start for development
.\quick-start.ps1

# OR full startup with monitoring
.\start-all.ps1
```

### 3. Check Everything is Working
```bash
# Run health checks
.\dev.ps1 status

# Run comprehensive tests
.\test-services.ps1
```

## 🔧 Configuration

### Environment Variables

The setup script automatically creates environment files:

#### Backend (.env)
```env
DATABASE_URL=postgresql://dev_user:dev_password@localhost:5432/workflow_platform
REDIS_URL=redis://localhost:6379
NODE_ENV=development
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-for-development-only
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_MARKETING_URL=http://localhost:3003
```

#### Marketing Site (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3005
```

## 🐳 Docker Services

The platform uses Docker for database services:

```yaml
# docker/docker-compose.dev.yml
services:
  postgres:    # PostgreSQL database
  redis:       # Redis cache
```

Start manually:
```bash
cd docker
docker-compose -f docker-compose.dev.yml up -d
```

## 🧪 Testing

### Automated Testing
```bash
# Comprehensive service tests
.\test-services.ps1

# Quick health check
.\dev.ps1 status
```

### Manual Testing
1. Visit marketing site: http://localhost:3003
2. Visit frontend app: http://localhost:3005
3. Check API health: http://localhost:3001/health

## 🛑 Troubleshooting

### Port Conflicts
```bash
# Stop all services and restart
.\stop-all.ps1
.\start-all.ps1
```

### Database Issues
```bash
# Reset database
.\dev.ps1 clean
.\setup.ps1 -SkipNodeModules
```

### Dependencies Issues
```bash
# Clean reinstall
.\dev.ps1 clean
# Answer 'y' when prompted to clean node_modules
```

### View Logs
```bash
# See what's happening
.\dev.ps1 logs
```

## 📊 Development Workflow

### Typical Development Session
1. Start services: `.\quick-start.ps1`
2. Check status: `.\dev.ps1 status`
3. Make changes to code
4. Services auto-reload (Next.js hot reload)
5. Test changes: `.\test-services.ps1`
6. Stop when done: `.\stop-all.ps1`

### Building for Production
```bash
# Build all projects
.\dev.ps1 build
```

## 🎯 Available Scripts

| Script | Purpose | When to Use |
|--------|---------|-------------|
| `launcher.cmd` | Interactive menu | General use, beginners |
| `setup.ps1` | Complete fresh setup | First time, clean install |
| `start-all.ps1` | Full startup with monitoring | Production-like testing |
| `quick-start.ps1` | Fast development startup | Daily development |
| `stop-all.ps1` | Stop all services | End of work session |
| `dev.ps1` | Development utilities | Status checks, logs, etc |
| `test-services.ps1` | Comprehensive testing | Validation, CI/CD |

## 🎉 Success!

When everything is running, you should see:
- ✅ Marketing site with modern design
- ✅ Frontend app with workflow builder
- ✅ Backend API responding to health checks
- ✅ All services auto-opening in browser

## 🆘 Need Help?

1. **Check service status**: `.\dev.ps1 status`
2. **View logs**: `.\dev.ps1 logs`
3. **Run tests**: `.\test-services.ps1`
4. **Clean restart**: `.\stop-all.ps1` then `.\start-all.ps1`
5. **Fresh setup**: `.\setup.ps1`

---

**Happy coding!** 🚀✨