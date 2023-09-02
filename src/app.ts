import express from 'express';
import { readFile } from 'fs/promises';
import responseTime from 'response-time';
import roomRoute from './routes/roomRoute';

const app = express();

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

app.use('/', roomRoute);

export default app;
