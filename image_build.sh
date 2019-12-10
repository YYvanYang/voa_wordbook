#!/bin/bash

# Check if .env file exists
if [ -e .env ]; then
    source .env
else
    echo "Please set up your .env file before building your docker image."
    exit 1
fi

# https://stackoverflow.com/questions/19331497/set-environment-variables-from-file-of-key-pair-values
unset $(grep -v '^#' .env | sed -E 's/(.*)=.*/\1/' | xargs)
export $(grep -v '^#' .env | xargs)

docker build -t business/wordbook .

echo "Remove unused images."
docker image prune --force

