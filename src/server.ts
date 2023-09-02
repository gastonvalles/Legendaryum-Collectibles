import app from './app';
import { Server as WebSocketServer } from 'socket.io';
import { createServer } from 'https';
import { readFile } from 'fs/promises';
import { setupSocketHandlers } from './sockets/socketHandlers';

const startServer = async () => {
  const key = await readFile('./key.pem');
  const cert = await readFile('./cert.pem');

  const httpsServer = createServer({ key, cert }, app);

  const io = new WebSocketServer(httpsServer);

  setupSocketHandlers(io);

  const port = process.env.PORT || 3000;

  httpsServer.listen(port, () => {
    console.log(`Server listening at https://localhost:${port}`);
  });
};

startServer();
