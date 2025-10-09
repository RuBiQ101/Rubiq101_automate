# AI Workflow Platform

[![CI](https://github.com/your-username/ai-workflow-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/ai-workflow-platform/actions/workflows/ci.yml)

Full‑stack TypeScript app with:
- Frontend: Next.js 15 (React 19)
- Backend: Express + TypeScript
- DB: PostgreSQL (pg)
- Queue: BullMQ + Redis

## Structure
- `frontend/` — Next.js app (App Router)
- `backend/` — Express API (TypeScript)
- `docker/` — Database bootstrap scripts (`init-db.sql`)
- `.github/workflows/ci.yml` — CI pipeline (Node 20, lint/typecheck/build, Docker → GHCR)

## Requirements
- Node.js 20+
- PostgreSQL 14+
- Redis 6+

## Quick start (local dev)
1) Environment
- Copy `.env.example` to `backend/.env` and `frontend/.env.local`
- Fill values for DATABASE_URL, REDIS_URL, JWT_SECRET, etc.

2) Install dependencies
- Frontend: `npm install` in `frontend/`
- Backend: `npm install` in `backend/`

3) Run
- Frontend: `npm run dev` (http://localhost:3000)
- Backend: `npm run dev` (http://localhost:4000 by default)

## Scripts
Frontend:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm start`

Backend:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm start`

## CI/CD
GitHub Actions runs on pushes and PRs to `master`:
- Lint + typecheck + build both apps on Node 20
- On push: build and push Docker images to GHCR

Images:
- Frontend: `ghcr.io/<your-gh-username>/ai-workflow-frontend:latest`
- Backend: `ghcr.io/<your-gh-username>/ai-workflow-backend:latest`

Grant packages: write permission to the workflow if you fork. If your GitHub username has uppercase letters, consider lowercasing the GHCR namespace.

## Docker (local)
Frontend:
- Build: `docker build -t ai-workflow-frontend:dev ./frontend`
- Run: `docker run -p 3000:3000 --env-file frontend/.env.local ai-workflow-frontend:dev`

Backend:
- Build: `docker build -t ai-workflow-backend:dev ./backend`
- Run: `docker run -p 4000:4000 --env-file backend/.env ai-workflow-backend:dev`

Notes:
- Ensure Postgres and Redis are reachable from containers (use Docker network or compose).
- Adjust exposed ports if you customized the app ports.

## License
MIT — see `LICENSE`.
