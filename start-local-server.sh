#!/usr/bin/env bash

export DATABASE_URL='postgres://localhost:5432/aikai'
export TMDB_API_KEY='8f38dc176aea0ef9cbb167f50a8fc9b2'
export YOUTUBE_API_KEY='blah'
pg_ctl -D /usr/local/var/postgres restart
prettier --write src/ && npm run build && npm start
