#!/usr/bin/env bash

export DATABASE_URL='postgres://localhost:5432/aikai'
npm run build
npm start