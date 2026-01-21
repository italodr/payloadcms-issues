#!/usr/bin/env bash

DB_CONTAINER_NAME="payloadcms-issues-db"
DB_PASSWORD="password123"
POSTGRES_DB="payloadcms_issue_db"
POSTGRES_PORT=5432

if ! [ -x "$(command -v docker)" ]; then
  echo "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

PERSIST_VOLUME=true
UPDATE_BACKUP=false
for arg in "$@"; do
  case $arg in
    --empty|-e)
      PERSIST_VOLUME=false
      shift
      ;;
    --update|-u)
      UPDATE_BACKUP=true
      shift
      ;;
  esac
done

# If update backup is requested, only update and exit
if [ "$UPDATE_BACKUP" = true ]; then
  echo "Updating backup..."
  if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
    docker exec $DB_CONTAINER_NAME pg_dumpall -U postgres > "$(dirname "$0")/backup.sql"
    echo "Backup updated successfully"
    exit 0
  else
    echo "Database container is not running. Cannot update backup."
    exit 1
  fi
fi

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  docker start $DB_CONTAINER_NAME
  echo "Database container started"
  exit 0
fi

set -a
source .env

# You can add a file named backup.sql to the same folder as this file.
# This allows Docker to initialize the database with existing data.
if [ "$PERSIST_VOLUME" = true ] && [ -f "$(dirname "$0")/backup.sql" ]; then
  docker run --rm -d --name $DB_CONTAINER_NAME \
    -e POSTGRES_PASSWORD=$DB_PASSWORD \
    -e POSTGRES_HOST_AUTH_METHOD=trust \
    -e POSTGRES_DB=$POSTGRES_DB \
    -p $POSTGRES_PORT:5432 \
    docker.io/postgres:latest

  echo "Waiting for PostgreSQL to be ready..."
  until docker exec $DB_CONTAINER_NAME pg_isready -U postgres > /dev/null 2>&1; do
    sleep 1
  done

  cat "$(dirname "$0")/backup.sql" | docker exec -i $DB_CONTAINER_NAME psql -U postgres > /dev/null 2>&1
  echo "Database container was successfully created with persisted data"
else
  docker run --rm -d --name $DB_CONTAINER_NAME \
    -e POSTGRES_PASSWORD=$DB_PASSWORD \
    -e POSTGRES_HOST_AUTH_METHOD=trust \
    -e POSTGRES_DB=$POSTGRES_DB \
    -p $POSTGRES_PORT:5432 \
    docker.io/postgres:latest
  echo "Database container was successfully created with empty data"
fi

