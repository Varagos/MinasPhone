#!/bin/bash

DOCKER="/usr/bin/docker"

cd /home/ubuntu/MinasPhone/server/
$DOCKER compose run certbot renew && $DOCKER compose kill -s SIGHUP webserver
$DOCKER system prune -af
