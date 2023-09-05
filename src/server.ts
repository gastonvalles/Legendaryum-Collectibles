import app from './app';
import { Server as WebSocketServer } from 'socket.io';
import { createServer } from 'http';
import { setupSocketHandlers } from './sockets/socketHandlers';
import { clearRedisBeforeStart } from './services/roomService';

const server = createServer(app);
const io = new WebSocketServer(server);

clearRedisBeforeStart();
setupSocketHandlers(io);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
