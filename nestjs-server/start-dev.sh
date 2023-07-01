#!/bin/bash

docker compose -f docker/dev/docker-compose.yml up -d
# --env-file docker/dev/.env.dev 
