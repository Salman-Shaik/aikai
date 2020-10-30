#!/usr/bin/env bash

export DATABASE_URL='postgres://localhost:5432/aikai'
prettier --write src/ && npm run build && npm start