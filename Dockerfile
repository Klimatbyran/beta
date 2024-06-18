FROM node:lts AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run telemetry
ENV PORT=8080
ENV NODE_ENV=production
RUN npm run build
CMD npm start