#!/bin/bash

echo "Building and running frontend with Docker..."

# Build and start the container
docker-compose up --build -d

echo ""
echo "Frontend is starting..."
echo "Access the application at: http://localhost"
echo ""
echo "To view logs: docker logs -f ecommerce_admin_frontend"
echo "To stop: docker-compose down"
