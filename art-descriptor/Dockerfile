FROM node:22-alpine as base
WORKDIR /opt/analytics-dashboard

COPY . .
RUN npm install
RUN npm run build
RUN npm prune --prod

ENV PORT=8080
ENV HOST=0.0.0.0
EXPOSE 8080
CMD node build/index.js
