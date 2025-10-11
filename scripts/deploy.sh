#!/bin/bash
set -e

echo "🚀 Deploying AI Workflow Platform to production..."

# Load environment variables
if [ -f docker/.env.prod ]; then
  # shellcheck disable=SC1091
  source docker/.env.prod
else
  echo "❌ Production environment file docker/.env.prod not found!"
  echo "Create it from docker/.env.prod.example and try again."
  exit 1
fi

pushd docker >/dev/null

echo "🧹 Stopping current stack (if running)..."
docker compose -f docker-compose.prod.yml down || true

echo "⬇️ Pulling latest images (if using registry)..."
docker compose -f docker-compose.prod.yml pull || true

echo "🔧 Building images (if building locally)..."
docker compose -f docker-compose.prod.yml build

echo "🚢 Starting services..."
docker compose -f docker-compose.prod.yml up -d

echo "📊 Running database migrations..."
docker compose -f docker-compose.prod.yml exec -T backend node migrate.js || true

echo "🌱 Seeding initial data (optional)..."
docker compose -f docker-compose.prod.yml exec -T backend npm run seed || true

popd >/dev/null

echo "✅ Deployment complete!"
echo "🌐 Frontend: ${FRONTEND_URL:-https://yourdomain.com}"
echo "🔗 API: ${API_URL:-https://yourdomain.com/api}"
