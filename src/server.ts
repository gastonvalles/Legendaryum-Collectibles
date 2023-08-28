import { createServer } from 'http';
import { app } from './app';
import { Server } from 'socket.io';
import { setupSocketHandlers } from './sockets/socketHandlers';

const server = createServer(app);
const io = new Server(server);

setupSocketHandlers(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
