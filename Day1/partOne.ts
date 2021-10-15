import fs from 'fs';

const input = fs.readFileSync('Day1/input.txt', 'utf8');

const loadData = (data: string): string[] => {
    return data.split(', ');
}

const pos = {
    x: 0,
    y: 0,
    facing: 180, // 0, 90, 180, 270
}

const main = (): void => {
    const data = loadData(input);

    console.log(data);

    for (const instruction of data) {
        const direction = instruction.substr(0, 1);
        const distance = parseInt(instruction.substr(1), 10);

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
    }

    console.log(pos);
    console.log(pos.x + pos.y);
    
    
    
}

main();