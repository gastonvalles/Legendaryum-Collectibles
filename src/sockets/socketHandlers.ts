import { Server, Socket } from 'socket.io';
import { loadRoomConfig, generateCoinsForRoom } from '../services/roomService';

export const setupSocketHandlers = (io: Server): void => {
  io.on('connection', async (socket: Socket) => {
    console.log('Client connected:', socket.id);

    const rooms = await loadRoomConfig();

    socket.emit('roomsData', rooms);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });

    const availableCoinsByRoom: Record<string, any[]> = {};

    socket.on('joinRoom', async ({ roomName, seed }) => {
      console.log(`Client ${socket.id} joined:`, roomName);

      const roomConfig = rooms.find((room: any) => room.name === roomName);
      if (roomConfig) {
        if (!availableCoinsByRoom[roomName]) {
          const coins = await generateCoinsForRoom(roomConfig, roomName, seed);
          availableCoinsByRoom[roomName] = coins;
          socket.emit('coinsData', coins);
        } else {
          socket.emit('coinsData', availableCoinsByRoom[roomName]);
        }
        socket.join(roomName);
      }
    });

    socket.on('grabCoin', ({ roomName, coinId }) => {
      const roomCoins = availableCoinsByRoom[roomName];
      const coin = roomCoins.find((c) => c.id === coinId);
      if (coin) {
        coin.available = false;
        io.to(roomName).emit('availableCoins', roomCoins.filter((c) => c.available));
      }
    });
  });
};
