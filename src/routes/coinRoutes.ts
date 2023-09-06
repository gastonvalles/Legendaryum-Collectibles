import express from 'express';
import {
  getAllCoins,
  getCoinByPosition,
  createCoin,
  updateCoin,
  deleteCoin,
} from '../controllers/coinController';

const router = express.Router();

router.get('/coins', getAllCoins);

router.get('/coins/:x/:y/:z', getCoinByPosition);

router.post('/coins', createCoin);

router.put('/coins/:x/:y/:z', updateCoin);

router.delete('/coins/:x/:y/:z', deleteCoin);

export default router;
