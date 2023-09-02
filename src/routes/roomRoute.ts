import express from 'express';
import { generateRandomSpaceWithoutNulls, printRoom } from '../utils/roomUtils';
import client from '../services/redisService';
import roomController from '../controllers/roomController';

const router = express.Router();

router.get('/', roomController);

router.get('/room', async (req, res) => {
  try {
    await client.connect();

    const firstRoom = {
      id: 0,
      space: generateRandomSpaceWithoutNulls(),
    };

    printRoom(firstRoom);

    client.set('room', JSON.stringify(firstRoom));

    const data = await client.get("room");
    if (data !== null) {
      const jsonData = JSON.parse(data);

      const replaceMinusOneWithNull = (obj: any) => {
        if (typeof obj === 'object' && obj !== null) {
          for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              obj[key] = replaceMinusOneWithNull(obj[key]);
            }
          }
        } else if (obj === -1) {
          obj = null;
        }
        return obj;
      };

      const roomData = replaceMinusOneWithNull(jsonData);

      const newRoom = roomData;
      res.json(newRoom);
    } else {
      res.status(500).send("Los datos son nulos");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
