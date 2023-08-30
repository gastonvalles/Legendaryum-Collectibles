import { Request, Response } from 'express';
import { Room } from '../models/roomModel';
import { redisService } from './redisService';
import { roomController } from '../controllers/roomController';

export const roomService = {
  async createRooms(rooms: Room[]): Promise<void> {
    await redisService.set('ROOMS_KEY', rooms, 0);
  },

  async getRoomInfo(roomName: string): Promise<any> {
    const req: Request = {} as Request;
    const res: Response = {
      json: (data: any) => data,
    } as Response;

    req.params = { roomName };

    const roomInfo = await roomController.getRoomInfo(req, res);
    return roomInfo;
  },
};
