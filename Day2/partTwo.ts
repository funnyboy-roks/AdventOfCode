import fs from 'fs';
const input = fs.readFileSync('Day2/input.txt', 'utf8');

const buttons: (string|null)[][] = [
    [null, null, '1', null, null],
    [null,  '2', '3', '4',  null],
    [ '5',  '6', '7', '8',  '9' ],
    [null,  'A', 'B', 'C',  null],
    [null, null, 'D', null, null],
]

const pos = {
    x: 0,
    y: 2,
}

const loadData = (data: string) => {
    return data.split('\n');
}

const main = (): void => {
    const data = loadData(input);
    // const data = loadData('RRDDD');

    
    
    for (const line of data) {
        // console.log(pos, line.split(''));
        for (const inst of line.split('')) {
            const prev = {...pos};
            switch (inst) {
                case 'U':
                    pos.y = Math.max(0, pos.y - 1);
                    if(buttons[pos.y][pos.x] === null) {
                        pos.y = prev.y;
                    }
                    break;
                case 'D':
                    pos.y = Math.min(4, pos.y + 1);
                    if(buttons[pos.y][pos.x] === null) {
                        pos.y = prev.y;                        
                    }
                    break;
                case 'L':
                    pos.x = Math.max(0, pos.x - 1);
                    if(buttons[pos.y][pos.x] === null) {
                        pos.x = prev.x;
                    }
                    break;
                case 'R':
                    pos.x = Math.min(4, pos.x + 1);
                    if(buttons[pos.y][pos.x] === null) {
                        pos.x = prev.x;
                    }
                    break;
            }

        }

        console.log(buttons[pos.y][pos.x] ?? '.');
    }
}

main();