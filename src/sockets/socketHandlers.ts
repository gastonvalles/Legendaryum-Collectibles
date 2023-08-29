import { Server, Socket } from 'socket.io';
import { coinController } from '../controllers/coinController';
import { Coin } from '../models/coinModel';
import { roomController } from '../controllers/roomController';
import { redisService } from '../services/redisService';

export const setupSocketHandlers = (io: Server): void => {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);

    socket.on('joinRoom', async (roomName: string) => {
      socket.join(roomName);

      try {
        const coinData: Coin[] = await coinController.getCoins(roomName);
        socket.emit('coins', coinData);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    });

    socket.on('pickupCoin', async ({ roomName, coinIndex }: { roomName: string; coinIndex: number }) => {
      try {
        await coinController.pickupCoin(roomName, coinIndex);
        io.to(roomName).emit('coinPickedUp', coinIndex);
      } catch (error) {
        console.error('Error picking up coin:', error);
      }
    });
  });
};
