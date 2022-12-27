FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN chown -R node node_modules/.cache

