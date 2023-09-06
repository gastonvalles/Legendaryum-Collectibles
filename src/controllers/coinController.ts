import { Request, Response } from 'express';
import axios from 'axios';
import client from '../services/redisService';

const JSON_URL = 'https://raw.githubusercontent.com/gastonvalles/Legendaryum-Collectibles/main/src/data/data.json';

export const getAllCoins = async (req: Request, res: Response) => {
    try {
        const coinsInRedis = await client.get('coins');

        if (coinsInRedis) {
            const coins = JSON.parse(coinsInRedis);
            res.status(200).json(coins);
        } else {
            const response = await axios.get(JSON_URL);

            if (response && response.data && response.data.rooms) {
                const rooms = response.data.rooms;
                const allCoins = rooms.reduce((acc: any[], room: any) => {
                    if (room.numCoins && room.coinGenerationArea) {
                        const { xmin, xmax, ymin, ymax, zmin, zmax } = room.coinGenerationArea;
                        for (let i = 0; i < room.numCoins; i++) {
                            const x = Math.floor(Math.random() * (xmax - xmin + 1)) + xmin;
                            const y = Math.floor(Math.random() * (ymax - ymin + 1)) + ymin;
                            const z = Math.floor(Math.random() * (zmax - zmin + 1)) + zmin;
                            acc.push({ x, y, z, available: true });
                        }
                    }
                    return acc;
                }, []);
                await client.set('coins', JSON.stringify(allCoins));
                res.status(200).json(allCoins);
            } else {
                res.status(404).send('Coins Not Found');
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getCoinByPosition = async (req: Request, res: Response) => {
    try {
        const { x, y, z } = req.params;

        if (!x || !y || !z) {
            res.status(400).send('Invalid position');
            return;
        }

        const coinInRedis = await client.get(`coin:${x}:${y}:${z}`);

        if (coinInRedis) {
            const coin = JSON.parse(coinInRedis);
            res.status(200).json(coin);
        } else {
            res.status(404).send('Coin Not Found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const createCoin = async (req: Request, res: Response) => {
    try {
        const { x, y, z } = req.body;

        if (!x || !y || !z) {
            res.status(400).send('x, y, and z coordinates are required');
            return;
        }

        const newCoin = {
            x,
            y,
            z,
            available: true,
        };

        await client.set(`coin:${x}:${y}:${z}`, JSON.stringify(newCoin));

        res.status(201).json(newCoin);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateCoin = async (req: Request, res: Response) => {
    try {
        const { x, y, z } = req.params;
        const { available } = req.body;

        if (!x || !y || !z || available === undefined) {
            res.status(400).send('Invalid parameters');
            return;
        }

        const coinInRedis = await client.get(`coin:${x}:${y}:${z}`);

        if (!coinInRedis) {
            res.status(404).send('Coin Not Found');
            return;
        }

        const existingCoin = JSON.parse(coinInRedis);
        existingCoin.available = available;

        await client.set(`coin:${x}:${y}:${z}`, JSON.stringify(existingCoin));

        res.status(200).json(existingCoin);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteCoin = async (req: Request, res: Response) => {
    try {
        const { x, y, z } = req.params;

        if (!x || !y || !z) {
            res.status(400).send('Invalid position');
            return;
        }

        const coinInRedis = await client.get(`coin:${x}:${y}:${z}`);

        if (!coinInRedis) {
            res.status(404).send('Coin Not Found');
            return;
        }

        await client.del(`coin:${x}:${y}:${z}`);

        res.status(200).send('Coin deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
};
