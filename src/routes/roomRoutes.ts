import express from "express";
import {
    getAllRooms,
    getRoomByName,
    createRoom,
    updateRoom,
    deleteRoom,
} from "../controllers/roomController";

const router = express.Router();

router.get("/rooms", getAllRooms);

router.get("/rooms/:name", getRoomByName);

router.post("/rooms", createRoom);

router.put("/rooms/:name", updateRoom);

router.delete("/rooms/:name", deleteRoom);

export default router;
