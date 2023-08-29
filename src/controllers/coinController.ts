import { Request, Response } from 'express';
import { redisService } from '../services/redisService';
import { Coin, CoinData } from '../models/coinModel';

const COINS_KEY_PREFIX = 'coins:';
const COIN_TTL = 3600;

export const coinController = {
  async getCoins(roomName: string): Promise<Coin[]> {
    const coins = await redisService.get(`${COINS_KEY_PREFIX}${roomName}`);
    return coins || [];
  },

  async generateCoins(roomName: string, coinCount: number, area: any): Promise<void> {
    const newCoins: Coin[] = generateRandomCoins(coinCount, area); // Implement your logic here

    await redisService.set(`${COINS_KEY_PREFIX}${roomName}`, newCoins, COIN_TTL);
  },

  async pickupCoin(roomName: string, coinIndex: number): Promise<void> {
    const coins = await coinController.getCoins(roomName);
    if (coins[coinIndex]) {
      coins.splice(coinIndex, 1);
      await redisService.set(`${COINS_KEY_PREFIX}${roomName}`, coins, COIN_TTL);
    }
  }
};
function generateRandomCoins(coinCount: number, area: any): Coin[] {
    throw new Error('Function not implemented.');
}

