FROM node:alpine

WORKDIR /assignify

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build
