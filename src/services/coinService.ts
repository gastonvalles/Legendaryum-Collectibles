import { Coin } from '../models/coinModel';
import { coinController } from '../controllers/coinController';

export const coinService = {
  async getCoins(roomName: string): Promise<Coin[]> {
    return await coinController.getCoins(roomName);
  },

  async generateCoins(roomName: string, coinCount: number, area: any): Promise<void> {
    await coinController.generateCoins(roomName, coinCount, area);
  },

  async pickupCoin(roomName: string, coinId: string): Promise<void> {
    await coinController.pickupCoin(roomName, coinId);
  },
};
