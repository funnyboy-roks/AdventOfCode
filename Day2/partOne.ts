import fs from 'fs';
const input = fs.readFileSync('Day2/input.txt', 'utf8');

const buttons: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

const pos = {
    x: 1,
    y: 1,
}

const loadData = (data: string) => {
    return data.split('\n');
}

const main = (): void => {
    const data = loadData(input);

    for (const line of data) {
        for (const inst of line.split('')) {
            switch (inst) {
                case 'U':
                    pos.y = Math.max(0, pos.y - 1);
                    break;
                case 'D':
                    pos.y = Math.min(2, pos.y + 1);
                    break;
                case 'L':
                    pos.x = Math.max(0, pos.x - 1);
                    break;
                case 'R':
                    pos.x = Math.min(2, pos.x + 1);
                    break;
            }

        }
        
        process.stdout.write(buttons[pos.y][pos.x].toString());
    }
}

main();