#!/usr/bin/env bash

export DATABASE_URL='postgres://localhost:5432/aikai'
npm build
npm start