import fs from 'fs';
import { posix } from 'path/posix';

const input = fs.readFileSync('Day1/input.txt', 'utf8');

const loadData = (data: string): string[] => {
    return data.split(', ');
}

const pos = {
    x: 0,
    y: 0,
    facing: 180, // 0, 90, 180, 270
}

const locations: { x: number, y: number }[] = [];

const main = (): void => {
    // const data = loadData(input);
    const data = loadData('R8, R4, R4, R8');

    for (const instruction of data) {
        const direction = instruction.substr(0, 1);
        const distance = +instruction.substr(1);

        switch (direction) {
            case 'R':
                pos.facing += 90;
                break;
            case 'L':
                pos.facing -= 90;
                break;
        }
        pos.facing = (pos.facing + 360) % 360;

        switch (pos.facing) {
            case 0:
                pos.y += distance;
                break;
            case 90:
                pos.x += distance;
                break;
            case 180:
                pos.y -= distance;
                break;
            case 270:
                pos.x -= distance;
                break;
        }

        for (const location of locations) {
            if (location.x === pos.x && location.y === pos.y) {
                // console.log(`${pos.x} ${pos.y}`);
                console.log(locations, '\n', location, Math.abs(location.x) + location.y);
                // break;
                // return;
            }
        }

        locations.push({ x: pos.x, y: pos.y });
    }

    console.log(pos);
    console.log(pos.x + pos.y);



}

main();