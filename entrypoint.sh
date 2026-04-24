#!/bin/bash
nginx -g "daemon off;" &
gunicorn core.wsgi:application --bind 0.0.0.0:8000
