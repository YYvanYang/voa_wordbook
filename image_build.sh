#!/bin/bash

docker build -t voa_wordbook .

echo "Remove unused images."
docker image prune --force

