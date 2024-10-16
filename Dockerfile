FROM node:20-alpine

WORKDIR /assignify

RUN npm install -g pnpm

COPY . .

RUN pnpm install
RUN pnpm run build

EXPOSE 3030

CMD ["node", "./dist/app.js"]