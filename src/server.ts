import express from 'express';
import { Server as WebSocketServer } from 'socket.io';
import http from 'http';
import { createServer } from 'https';
import { readFile } from 'fs/promises';
import { setupSocketHandlers } from './sockets/socketHandlers';

const startServer = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  const key = await readFile('./key.pem');
  const cert = await readFile('./cert.pem');

  const httpsServer = createServer({ key, cert }, app);

  const io = new WebSocketServer(httpServer);

  app.use(express.static(__dirname + '/public'));

  setupSocketHandlers(io);

  const port = process.env.PORT || 3000;

  httpServer.listen(port, () => {
    console.log(`HTTP Server listening at http://localhost:${port}`);
  });

  httpsServer.listen(443, () => {
    console.log(`HTTPS Server listening at https://localhost:3001`);
  });
};

startServer();
