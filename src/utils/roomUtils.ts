import { Coin } from "../models/coinModel";
import { Room } from "../models/roomModel";

const generateRandomSpaceWithoutNulls = (): Coin[][][] => {
    const square = 3;
    const emptyCoin: Coin = { id: -1 };

    const space: Coin[][][] = [];

    for (let d = 0; d < square; d++) {
        const level: Coin[][] = [];

        for (let r = 0; r < square; r++) {
            const row: Coin[] = [];

            for (let c = 0; c < square; c++) {
                const shouldHaveCoin = Math.random() < 0.5;

                if (shouldHaveCoin) {
                    const randomCoin: Coin = {
                        id: Math.floor(Math.random() * 1000),
                    };
                    row.push(randomCoin);
                } else {
                    row.push(emptyCoin);
                }
            }

            level.push(row);
        }

        space.push(level);
    }

    return space;
};

const printRoom = (room: Room) => {
    console.log(`Room ID: ${room.id}`);
    console.log('Space:');

    for (let d = 0; d < room.space.length; d++) {
        console.log(` Level ${d + 1}:`);

        for (let r = 0; r < room.space[d].length; r++) {
            const row = room.space[d][r];

            console.log(`  Row ${r + 1}:`);

            for (let c = 0; c < row.length; c++) {
                const coinOrEmpty: Coin | null = row[c];

                if (coinOrEmpty !== null) {
                    console.log(`   Coin ID: ${coinOrEmpty.id}`);
                } else {
                    console.log(`   Empty`);
                }
            }
        }
    }
};

export { printRoom, generateRandomSpaceWithoutNulls }
