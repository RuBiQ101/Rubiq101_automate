# Start AI Workflow Platform services
docker compose -f docker-compose.dev.yml up -d
Start-Sleep -Seconds 5

# Show running containers
docker ps
