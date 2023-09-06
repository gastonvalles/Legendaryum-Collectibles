import client from "./redisService";
import axios from "axios";
import seedrandom from "seedrandom";

interface RoomConfig {
    coinGenerationArea: {
        xmin: number;
        xmax: number;
        ymin: number;
        ymax: number;
        zmin: number;
        zmax: number;
    };
    numCoins: number;
}

export const loadRoomConfig = async () => {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/gastonvalles/Legendaryum-Collectibles/main/src/data/data.json');
        return response.data.rooms;
    } catch (error) {
        console.log('Error al cargar el archivo JSON:', error);
        throw error;
    }
}

export const generateCoinsForRoom = async (roomConfig: RoomConfig, roomName: any, seed: string) => {
    const coinsInRedis = await client.get(roomName);

    if (coinsInRedis) {
        return JSON.parse(coinsInRedis);
    }

    const rng = seedrandom(seed);

    const { xmin, xmax, ymin, ymax, zmin, zmax } = roomConfig.coinGenerationArea;
    const numCoins = roomConfig.numCoins;
    const coins = [];

    for (let i = 0; i < numCoins; i++) {
        const x = Math.floor(rng() * (xmax - xmin + 1)) + xmin;
        const y = Math.floor(rng() * (ymax - ymin + 1)) + ymin;
        const z = Math.floor(rng() * (zmax - zmin + 1)) + zmin;

        const coin = { x, y, z, available: true };
        coins.push(coin);
    }

    client.set(roomName, JSON.stringify(coins), 3600);
    return coins;
};

export const clearRedisBeforeStart =async () => {
    client.flushAll()
}
