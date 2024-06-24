FROM node:22.3.0-alpine3.19

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 9000

ENTRYPOINT [ "npm", "run", "dev" ]