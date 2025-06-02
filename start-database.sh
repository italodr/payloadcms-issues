#!/usr/bin/env bash

DB_CONTAINER_NAME="payloadcms_db"
DB_PASSWORD="password123"
POSTGRES_DB="payloadcms"
POSTGRES_PORT=5432

if ! [ -x "$(command -v docker)" ]; then
  echo "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  docker start $DB_CONTAINER_NAME
  echo "Database container started"
  exit 0
fi

set -a
source .env
docker run --rm -P --name $DB_CONTAINER_NAME -e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_HOST_AUTH_METHOD=trust -e POSTGRES_DB=$POSTGRES_DB -d -p $POSTGRES_PORT:5432 docker.io/postgres:latest

echo "Database container was successfully created"

