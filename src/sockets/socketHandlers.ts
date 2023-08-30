import { Server, Socket } from 'socket.io';
import { coinController } from '../controllers/coinController';
import { roomController } from '../controllers/roomController';

export const setupSocketHandlers = (io: Server): void => {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);

    socket.on('joinRoom', async (roomName: string) => {
      socket.join(roomName);

      try {
        const req = {
          params: { roomName },
        };

        const res = {
          json: (data: any) => socket.emit('roomInfo', data),
        };

        await roomController.getRoomInfo(req as any, res as any);
      } catch (error) {
        console.error('Error fetching room info:', error);
      }
    });

    socket.on('pickupCoin', async ({ roomName, coinIndex }: { roomName: string; coinIndex: string }) => {
      try {
        await coinController.pickupCoin(roomName, coinIndex);
        io.to(roomName).emit('coinPickedUp', coinIndex);
      } catch (error) {
        console.error('Error picking up coin:', error);
      }
    });
  });
};
