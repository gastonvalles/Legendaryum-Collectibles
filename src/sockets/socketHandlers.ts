import { Server, Socket } from 'socket.io';

export const setupSocketHandlers = (io: Server): void => {
    io.on('connection', (socket: Socket) => {
      console.log('Client connected:', socket.id);
  
      socket.on('joinRoom', (roomName: string) => {
        socket.join(roomName);
        // Send coin data to the client
        const coinData: Coin[] = []; // Fetch this data from Redis
        socket.emit('coins', coinData);
      });
  
      socket.on('pickupCoin', ({ roomName, coinIndex }: {roomName: string, coinIndex: number}) => {
        // Handle coin pickup logic and notify other clients
        io.to(roomName).emit('coinPickedUp', coinIndex);
      });
    });
  };
  
  interface Coin {
    // Define properties for the coin data here
  }
  