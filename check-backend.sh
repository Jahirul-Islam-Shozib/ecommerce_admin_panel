#!/bin/bash

echo "Checking backend container..."
docker inspect ecommerce_admin_server-applocalhost 2>/dev/null | grep -A 10 "Networks" || echo "Backend container not found or not running"

echo ""
echo "Available networks:"
docker network ls | grep ecommerce
