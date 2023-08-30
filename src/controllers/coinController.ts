import { redisService } from '../services/redisService';
import { Coin } from '../models/coinModel';

const COINS_KEY_PREFIX = 'coins:';
const COIN_TTL = 3600;

export const coinController = {
  async getCoins(roomName: string): Promise<Coin[]> {
    const coins = await redisService.get(`${COINS_KEY_PREFIX}${roomName}`);
    return coins || [];
  },

  async generateCoins(roomName: string, coinCount: number, area: any): Promise<void> {
    const newCoins: Coin[] = generateRandomCoins(coinCount, area);

    await redisService.set(`${COINS_KEY_PREFIX}${roomName}`, newCoins, COIN_TTL);
  },

  async pickupCoin(roomName: string, coinId: string): Promise<void> {
    const coins = await coinController.getCoins(roomName);
    const coinIndex = coins.findIndex(coin => coin.id === coinId);
    if (coinIndex !== -1) {
      coins.splice(coinIndex, 1);
      await redisService.set(`${COINS_KEY_PREFIX}${roomName}`, coins, COIN_TTL);
    }
  }
};

function generateRandomCoins(coinCount: number, area: any): Coin[] {
  const newCoins: Coin[] = [];
  for (let i = 0; i < coinCount; i++) {
    const x = Math.random() * (area.xmax - area.xmin) + area.xmin;
    const y = Math.random() * (area.ymax - area.ymin) + area.ymin;
    const z = Math.random() * (area.zmax - area.zmin) + area.zmin;
    newCoins.push({ id: `coin_${i}`, x, y, z });
  }
  return newCoins;
}
