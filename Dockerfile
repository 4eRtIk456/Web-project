# --- STEP 1: Angular ---
FROM node:22-alpine AS build-front
WORKDIR /app
COPY travel-agency/package*.json ./
RUN npm install
COPY travel-agency/ .
RUN npm run build

# --- STEP 2: Django ---
FROM python:3.12-slim
WORKDIR /app

RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .
RUN pip install -r requirements.txt gunicorn

COPY backend/ .

COPY --from=build-front /app/dist/travel-agency/browser /var/www/html

COPY nginx.conf /etc/nginx/sites-available/default

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 80 8000
CMD ["./entrypoint.sh"]
