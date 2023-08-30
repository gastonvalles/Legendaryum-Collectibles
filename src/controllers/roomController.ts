import { Request, Response } from 'express';
import { redisService } from '../services/redisService';
import { Coin } from '../models/coinModel';
import { Room } from '../models/roomModel';

export const roomController = {
  async getRoomInfo(req: Request, res: Response) {
    const { roomName } = req.params;
    const rooms: Room[] = await redisService.get('ROOMS_KEY');

    const targetRoom = rooms.find(room => room.name === roomName);

    if (targetRoom) {
      const roomCoins: Coin[] = targetRoom.coins || [];
      res.json({ roomCoins, availableCoins: roomCoins.length });
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  }
};
