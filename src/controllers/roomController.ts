import { Request, Response } from 'express';
import { redisService } from '../services/redisService';
import { CoinData } from '../models/coinModel';

export const roomController = {
  async getAvailableCoinsCount(req: Request, res: Response) {
    const { roomName } = req.params;
    const coins: CoinData = await redisService.get('coins');
    const roomCoins = coins[roomName] || [];
    res.json({ availableCoins: roomCoins.length });
  },
};
