#!/bin/bash
nginx -g "daemon off;" &
gunicorn config.wsgi:application --bind 0.0.0.0:8000
