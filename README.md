# AI Workflow Platform

A visual workflow automation platform that integrates AI capabilities to create, execute, and monitor intelligent workflows. Built with modern technologies including React Flow, Next.js, Node.js, PostgreSQL, Redis, and Docker.

## 🚀 Features

- **Visual Workflow Builder**: Drag-and-drop interface for creating complex workflows
- **AI Integration**: Built-in support for OpenAI GPT and Anthropic Claude models
- **Real-time Execution**: Queue-based workflow processing with Redis and BullMQ
- **User Authentication**: Secure JWT-based authentication system
- **Execution History**: Track and monitor workflow runs with detailed logs
- **Scalable Architecture**: Microservices design with Docker containerization
- **Multi-Provider LLM Gateway**: Automatic failover between AI providers

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React Flow** - Interactive workflow canvas
- **Tailwind CSS** - Utility-first styling
- **SWR** - Data fetching and caching
- **TypeScript** - Type safety

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Primary database
- **Redis** - Caching and job queue
- **BullMQ** - Job queue processing
- **JWT** - Authentication tokens
- **TypeScript** - Type safety

### Infrastructure
- **Docker & Docker Compose** - Containerization
- **Redis Commander** - Redis monitoring UI

## 📋 Prerequisites

- **Node.js** (v20 or higher)
- **Docker Desktop** (for Windows/Mac) or Docker Engine (for Linux)
- **npm** or **yarn** package manager

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-workflow-platform.git
cd ai-workflow-platform
```

### 2. Start Infrastructure Services

```bash
cd docker
docker compose -f docker-compose.dev.yml up -d
```

Wait for all services to be healthy:
```bash
docker ps
```

### 3. Set Up Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

In another terminal, start the worker:
```bash
cd backend
npm run worker
```

### 4. Set Up Frontend

```bash
cd frontend
npm install
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Redis UI**: http://localhost:8081

## 📁 Project Structure

```
ai-workflow-platform/
├── frontend/                # Next.js frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   └── lib/           # Utility libraries
│   └── app/               # Next.js App Router pages
├── backend/               # Node.js backend API
│   ├── src/
│   │   ├── routes/        # API endpoints
│   │   ├── middleware/    # Express middleware
│   │   ├── workers/       # Background job processors
│   │   ├── llm/          # AI provider integrations
│   │   └── utils/         # Utility functions
│   └── migrations/        # Database migrations
└── docker/               # Docker configuration
    ├── docker-compose.dev.yml
    └── init-db.sql
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL=postgresql://dev_user:dev_password@localhost:5432/workflow_platform
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-super-secret-jwt-key
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-your-anthropic-key
PORT=3001
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=AI Workflow Platform
```

## 📊 Database Schema

The platform uses PostgreSQL with the following main entities:

- **Users**: Authentication and user management
- **Workflows**: Workflow definitions and metadata
- **Workflow Executions**: Execution instances and results
- **Execution Steps**: Individual step results and logs

## 🤖 AI Integration

### Supported Providers
- **OpenAI**: GPT-3.5, GPT-4
- **Anthropic**: Claude 3 Sonnet

### Features
- Automatic provider failover
- Configurable model selection
- Prompt templating with variable substitution
- Response caching and rate limiting

## 🔄 Workflow Types

### Node Types
- **Trigger**: Workflow entry points
- **AI**: LLM-powered processing steps
- **Action**: External API calls and integrations
- **Condition**: Conditional branching logic

### Execution Flow
1. Workflows are queued for asynchronous execution
2. Each step processes input data and produces output
3. Results are stored for audit and debugging
4. Real-time status updates via WebSocket (planned)

## 🧪 Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Docker Development
```bash
# Build and start all services
cd docker
docker compose -f docker-compose.dev.yml up --build -d

# View logs
docker compose -f docker-compose.dev.yml logs -f

# Stop all services
docker compose -f docker-compose.dev.yml down
```

### Database Migrations
```bash
cd backend
npm run migrate
```

## 📈 API Documentation

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login
- `GET /api/me` - Get current user info

### Workflows
- `GET /api/workflows` - List user workflows
- `POST /api/workflows` - Create new workflow
- `GET /api/workflows/:id` - Get workflow details
- `PUT /api/workflows/:id` - Update workflow
- `DELETE /api/workflows/:id` - Delete workflow
- `POST /api/workflows/:id/execute` - Execute workflow

### Executions
- `GET /api/executions/:workflowId` - List executions
- `GET /api/executions/:workflowId/:executionId` - Execution details

### AI Gateway
- `POST /api/llm/chat` - Direct LLM interaction
- `POST /api/llm/generate-workflow` - Generate workflow from description

## 🚀 Deployment

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd backend
npm run build

# Start production services
docker compose -f docker-compose.prod.yml up -d
```

### Environment Setup
1. Set production environment variables
2. Configure SSL certificates
3. Set up reverse proxy (Nginx/Traefik)
4. Configure monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Flow** - For the excellent workflow canvas component
- **Next.js Team** - For the amazing React framework
- **BullMQ** - For robust job queue processing
- **OpenAI & Anthropic** - For powerful AI capabilities

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/ai-workflow-platform/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Built with ❤️ using modern web technologies**
