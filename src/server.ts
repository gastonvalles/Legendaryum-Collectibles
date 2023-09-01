import express from 'express';
import { Server as WebSocketServer } from 'socket.io';
import { createServer } from 'https';
import { readFile } from 'fs/promises';
import { setupSocketHandlers } from './sockets/socketHandlers';
import responseTime from 'response-time';
import { roomController } from './controllers/roomController';
import { coinController } from './controllers/coinController';

const startServer = async () => {
  const app = express();

  const key = await readFile('./key.pem');
  const cert = await readFile('./cert.pem');

  const httpsServer = createServer({ key, cert }, app);

  const io = new WebSocketServer(httpsServer);

  app.use(responseTime());

  app.use(express.static(__dirname + '/public'));

  app.get('/', async (req, res) => {
    const content = await readFile("public/index.html")
    res.writeHead(200, {
      "content-type": "text/html"
    });
    res.write(content);
    res.end();
  });

   app.get('/room/:roomName', roomController.getRoomInfo);

   app.get('/coins/:roomName', async (req, res) => {
     const { roomName } = req.params;
     const coins = await coinController.getCoins(roomName);
     res.json(coins);
   });
 
   app.post('/coins/:roomName', async (req, res) => {
     const { roomName } = req.params;
     const { coinCount, area } = req.body;
     await coinController.generateCoins(roomName, coinCount, area);
     res.json({ message: 'Coins generated' });
   });
 
   app.delete('/coins/:roomName/:coinId', async (req, res) => {
     const { roomName, coinId } = req.params;
     await coinController.pickupCoin(roomName, coinId);
     res.json({ message: 'Coin picked up' });
   });

  setupSocketHandlers(io);

  const port = process.env.PORT || 3000;

  httpsServer.listen(port, () => {
    console.log(`Server listening at https://localhost:${port}`);
  });
};

startServer();
