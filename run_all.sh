#!/bin/bash

trap 'kill $(jobs -p)' EXIT

echo "Starting ML Inference Service on port 8000..."
(cd ml && uvicorn src.api:app --port 8000 --reload) &

echo "Starting Backend Gateway on port 5000..."
(cd backend && PYTHONPATH=. uvicorn app.main:app --port 5000 --reload) &

wait
