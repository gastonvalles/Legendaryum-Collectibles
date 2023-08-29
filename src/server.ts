import express from 'express';
import { Server as WebSocketServer } from 'socket.io';
import { createServer } from 'https';
import { readFile } from 'fs/promises';
import { setupSocketHandlers } from './sockets/socketHandlers';

const startServer = async () => {
  const app = express();

  const key = await readFile('./key.pem');
  const cert = await readFile('./cert.pem');

  const httpsServer = createServer({ key, cert }, app);

  const io = new WebSocketServer(httpsServer);

  app.use(express.static(__dirname + '/public'));

  // Agregar el endpoint GET en el path "/"
  app.get('/', async (req, res) => {
    const content = await readFile("public/chat.html")
    res.writeHead(200, {
      "content-type": "text/html"
    });
    res.write(content);
    res.end();
  });

  setupSocketHandlers(io);

  const port = process.env.PORT || 3000;

  httpsServer.listen(port, () => {
    console.log(`HTTPS Server listening at https://localhost:${port}`);
  });
};

startServer();
