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

    socket.on('joinRoom', async ({roomName, seed}) => {
      console.log(`Client ${socket.id} joined:`, roomName);

      const roomConfig = rooms.find((room: any) => room.name === roomName);
      if (roomConfig) {
        const coins = await generateCoinsForRoom(roomConfig, roomName, seed);
        socket.emit('coinsData', coins);
      }
    });
  });
};
