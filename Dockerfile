FROM node:18

WORKDIR /src/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.ts"]
