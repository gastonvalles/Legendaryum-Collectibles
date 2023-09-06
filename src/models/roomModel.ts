import { Coin } from "./coinModel";

export interface Room {
    id: number;
    space: (Coin | null)[][][];
}
