import express from 'express';
import responseTime from 'response-time';
import { readFile } from 'fs/promises';
import client from './services/redisService';
import roomRoutes from './routes/roomRoutes';
import coinRoutes from './routes/coinRoutes';

const app = express();

app.use(responseTime());
app.use(express.static(__dirname + '/public'));
app.use(express.json());

client.connect();

app.get('/', async (req, res) => {
    const content = await readFile("public/index.html")
    res.writeHead(200, {
        "content-type": "text/html"
    });
    res.write(content);
    res.end();
});

app.use(roomRoutes);

app.use(coinRoutes);

export default app;
