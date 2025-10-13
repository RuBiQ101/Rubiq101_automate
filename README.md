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

## Deploying with multiple Vercel projects (frontend + marketing-site)

This repo contains two web apps:

- `frontend/` — the main app
- `marketing-site/` — the public site for orkx.in

We use two Vercel projects to keep routing and domains clean:

1) Root project (connect repository root)
	 - Root `vercel.json` rewrites all routes to `/frontend`:
		 - This serves the main app.
	 - Do NOT attach `orkx.in` here.
	 - Use a separate domain/subdomain for the app (e.g., `app.orkx.in`) if this project is on Vercel, or host it elsewhere.

2) Marketing site project (set Root Directory to `marketing-site/` in Vercel)
	 - Uses `marketing-site/next.config.js` and `marketing-site/vercel.json`.
	 - Attach `orkx.in` and `www.orkx.in` to THIS project.
	 - `marketing-site/vercel.json`/Next.js config enforce `www` → apex redirect.

Why this matters
- The root `vercel.json` only affects the project connected to the repository root.
- The marketing site (with Root Directory set to `marketing-site`) is isolated from the root config and won’t be overridden by it.

Quick checklist
- Root project: rewrite to `/frontend`; domains: NOT `orkx.in`.
- Marketing-site project: domains `orkx.in` (Primary) and `www.orkx.in`.
- DNS:
	- `@` (apex) → Vercel A 76.76.21.21
	- `www` → `cname.vercel-dns.com`
	- Optional: `app`/`api` → point to your respective hosts.
