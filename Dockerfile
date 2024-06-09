FROM node:lts AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run telemetry
ENV PORT=8080
RUN npm run build
CMD npm start