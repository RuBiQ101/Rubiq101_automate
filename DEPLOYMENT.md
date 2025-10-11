# Production Deployment Guide

This guide covers two production options: Docker Compose (single host) and Kubernetes (cluster).

## 1) Docker Compose (single host)

Prereqs:
- Docker and Docker Compose installed
- Access to GHCR (images were pushed by CI):
  - ghcr.io/<your-gh-username>/ai-workflow-frontend:latest
  - ghcr.io/<your-gh-username>/ai-workflow-backend:latest

Steps:
1. Log in to GHCR (one time):
   docker login ghcr.io -u <your-gh-username> -p <GITHUB_TOKEN>

2. Set environment variables (optional):
   - POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD
   - GITHUB_OWNER (for image path override)

3. Start services:
   docker compose -f docker/docker-compose.prod.yml up -d

4. Access:
   - App: http://<server-ip>/
   - API via Nginx: http://<server-ip>/api

Notes:
- Update NEXT_PUBLIC_API_URL in docker-compose if terminating TLS at a load balancer (e.g., https://your.domain/api). Consider adding nginx TLS config.
- Provide a real backend .env file at backend/.env with DATABASE_URL, REDIS_URL, JWT_SECRET, etc.

## 2) Kubernetes (cluster)

Prereqs:
- kubectl context pointed at your cluster
- An ingress controller (nginx) installed
- Access to GHCR (imagePullSecrets if needed)

Namespace and config:
- Edit k8s/secret.yaml with your real secrets
- Optionally, create an imagePullSecret if your GHCR access requires PAT

Apply manifests:
  kubectl apply -f k8s/namespace.yaml
  kubectl apply -f k8s/configmap.yaml
  kubectl apply -f k8s/secret.yaml
  kubectl apply -f k8s/backend.yaml
  kubectl apply -f k8s/frontend.yaml
  kubectl apply -f k8s/ingress.yaml
  kubectl apply -f k8s/hpa-backend.yaml

Check status:
  kubectl -n ai-workflow get pods,svc,ingress,hpa

Access:
- Once ingress has an address, browse to http://<ingress-host>/
- API paths under /api route to backend

## Post-deploy
- Configure HTTPS (cert-manager + ingress annotations)
- Set proper resource requests/limits
- Add monitoring/alerts (Prometheus/Grafana)
- Add backups for Postgres and Redis
- Consider separate managed Postgres/Redis services
