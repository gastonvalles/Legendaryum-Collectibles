import { Coin } from "./coinModel";

export interface Room {
    id: string;
    name: string;
    x: number;
    y: number;
    z: number;
    coins: Coin[];
}

export interface RoomConfig {
    rooms: Room[];
    coinCount: number;
    area: {
        xmin: number;
        xmax: number;
        ymin: number;
        ymax: number;
        zmin: number;
        zmax: number;
    };
}