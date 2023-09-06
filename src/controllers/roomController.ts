import { Request, Response } from "express";
import axios from "axios";
import client from "../services/redisService";

export const getAllRooms = async (req: Request, res: Response) => {
    try {
        const roomsInRedis = await client.get("rooms");

        if (roomsInRedis) {
            const rooms = JSON.parse(roomsInRedis);
            res.status(200).json(rooms);
        } else {
            const response = await axios.get('https://raw.githubusercontent.com/gastonvalles/Legendaryum-Collectibles/main/src/data/data.json');

            if (!response || !response.data || !response.data.rooms) {
                res.status(404).send("Rooms Not Found");
            } else {
                const rooms = response.data.rooms;
                await client.set("rooms", JSON.stringify(rooms));
                res.status(200).json(rooms);
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getRoomByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.query;

        if (!name) {
            res.status(400).send("Room name not provided");
            return;
        }

        const roomInRedis = await client.get("name");

        if (roomInRedis) {
            const room = JSON.parse(roomInRedis);
            res.status(200).json(room);
        } else {
            res.status(404).send("Room Not Found");
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const createRoom = async (req: Request, res: Response) => {
    try {
        const { name, numCoins, coinGenerationArea } = req.body;

        if (!name || !numCoins || !coinGenerationArea) {
            res.status(400).send("Name, numCoins, and coinGenerationArea are required");
            return;
        }

        const newRoom = {
            name,
            numCoins,
            coinGenerationArea,
        };

        await client.set(name, JSON.stringify(newRoom));

        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateRoom = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const { numCoins, coinGenerationArea } = req.body;

        if (!name || (!numCoins && !coinGenerationArea)) {
            res.status(400).send("At least one of numCoins or coinGenerationArea is required");
            return;
        }

        const roomInRedis = await client.get(name);

        if (!roomInRedis) {
            res.status(404).send("Room Not Found");
            return;
        }

        const existingRoom = JSON.parse(roomInRedis);

        if (numCoins) {
            existingRoom.numCoins = numCoins;
        }
        if (coinGenerationArea) {
            existingRoom.coinGenerationArea = coinGenerationArea;
        }

        await client.set(name, JSON.stringify(existingRoom));

        res.status(200).json(existingRoom);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteRoom = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;

        if (!name) {
            res.status(400).send("Name is required");
            return;
        }

        const roomInRedis = await client.get(name);

        if (!roomInRedis) {
            res.status(404).send("Room Not Found");
            return;
        }

        await client.del(name);

        res.status(200).send("Room deleted successfully");
    } catch (error) {
        res.status(500).send(error);
    }
};
