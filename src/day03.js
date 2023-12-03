import { read, readEx } from './util.js';
import Vec from './util/Vec.js';
await import('./util/bad-but-great.js');

await readEx();
await read();

let data;

const getGrid = (grid, x, y) => {
    if (grid[y]) {
        return grid[y][x];
    }
    return undefined;
};

const findFullNumber = (line, i) => {
    while (/\d/.test(line[i - 1])) {
        i--;
    };
    let end = i;
    while (/\d/.test(line[end])) {
        end++;
    }

    let num = line.substr(i, end - i);
    let newline = line.substr(0, i) + ' '.repeat(end - i) + line.substr(end);
    console.log({i, end});
    console.log({num, newline});
    return [newline, +num];
};

// 30:23
const partOne = () => {
    const grid = data.lines();
    console.log(grid);
    //let nums = new Set();
    let nums = [];
    for (let y in grid) {
        y = +y;
        const row = grid[y]

        for (let x in row) {
            x = +x;
            const char = row[x];

            if (char !== '.' && char !== ' ' && !/\d/.test(char)) {
                console.log(char, [x, y]);
                let c;
                if (/\d/.test(c = getGrid(grid, x - 1, y - 1))) {
                    console.log('top-left');
                    let [newline, num] = findFullNumber(grid[y - 1], x - 1);
                    nums.push(num);
                    grid[y - 1] = newline;
                }
                if (/\d/.test(c = getGrid(grid, x - 0, y - 1))) {
                    console.log('up');
                    let [newline, num] = findFullNumber(grid[y - 1], x - 0);
                    nums.push(num);
                    grid[y - 1] = newline;
                }
                if (/\d/.test(c = getGrid(grid, x - 0, y + 1))) {
                    console.log('down');
                    let [newline, num] = findFullNumber(grid[y + 1], x - 0);
                    nums.push(num);
                    grid[y + 1] = newline;
                }
                if (/\d/.test(c = getGrid(grid, x - 1, y - 0))) {
                    console.log('left');
                    let [newline, num] = findFullNumber(grid[y - 0], x - 1);
                    nums.push(num);
                    grid[y - 0] = newline;
                }
                if (/\d/.test(c = getGrid(grid, x + 1, y - 0))) {
                    console.log('right');
                    let [newline, num] = findFullNumber(grid[y - 0], x + 1);
                    nums.push(num);
                    grid[y - 0] = newline;
                }
                if (/\d/.test(c = getGrid(grid, x + 1, y - 1))) {
                    console.log('top-right');
                    let [newline, num] = findFullNumber(grid[y - 1], x + 1);
                    nums.push(num);
                    grid[y - 1] = newline;
                }
                if (/\d/.test(c = getGrid(grid, x - 1, y + 1))) {
                    console.log('bottom-left');
                    let [newline, num] = findFullNumber(grid[y + 1], x - 1);
                    nums.push(num);
                    grid[y + 1] = newline;
                }
                if (/\d/.test(c = getGrid(grid, x + 1, y + 1))) {
                    console.log('bottom-right');
                    let [newline, num] = findFullNumber(grid[y + 1], x + 1);
                    nums.push(num);
                    grid[y + 1] = newline;
                }
            }
        }
    }
    console.log(grid.join('\n'));
    console.log(nums);
    console.log('sum', [...nums].sum())
};

// 33:52
const partTwo = () => {
    const grid = data.lines();
    console.log(grid);
    //let nums = new Set();
    let nums = [];
    for (let y in grid) {
        y = +y;
        const row = grid[y]

        for (let x in row) {
            x = +x;
            const char = row[x];

            if (char !== '.' && char !== ' ' && !/\d/.test(char)) {
                console.log(char, [x, y]);
                let c;
                let adj = [];
                if (/\d/.test(c = getGrid(grid, x - 1, y - 1))) {
                    console.log('top-left');
                    let [newline, num] = findFullNumber(grid[y - 1], x - 1);
                    adj.push(num);
                    grid[y - 1] = newline;
                }
                if (/\d/.test(c = getGrid(grid, x - 0, y - 1))) {
                    console.log('up');
                    let [newline, num] = findFullNumber(grid[y - 1], x - 0);
                    adj.push(num);
                    grid[y - 1] = newline;
                }
                if (/\d/.test(c = getGrid(grid, x - 0, y + 1))) {
                    console.log('down');
                    let [newline, num] = findFullNumber(grid[y + 1], x - 0);
                    adj.push(num);
                    grid[y + 1] = newline;
                }
                if (/\d/.test(c = getGrid(grid, x - 1, y - 0))) {
                    console.log('left');
                    let [newline, num] = findFullNumber(grid[y - 0], x - 1);
                    adj.push(num);
                    grid[y - 0] = newline;
                }
                if (/\d/.test(c = getGrid(grid, x + 1, y - 0))) {
                    console.log('right');
                    let [newline, num] = findFullNumber(grid[y - 0], x + 1);
                    adj.push(num);
                    grid[y - 0] = newline;
                }
                if (/\d/.test(c = getGrid(grid, x + 1, y - 1))) {
                    console.log('top-right');
                    let [newline, num] = findFullNumber(grid[y - 1], x + 1);
                    adj.push(num);
                    grid[y - 1] = newline;
                }
                if (/\d/.test(c = getGrid(grid, x - 1, y + 1))) {
                    console.log('bottom-left');
                    let [newline, num] = findFullNumber(grid[y + 1], x - 1);
                    adj.push(num);
                    grid[y + 1] = newline;
                }
                if (/\d/.test(c = getGrid(grid, x + 1, y + 1))) {
                    console.log('bottom-right');
                    let [newline, num] = findFullNumber(grid[y + 1], x + 1);
                    adj.push(num);
                    grid[y + 1] = newline;
                }

                console.log(adj);
                if (adj.length === 2) {
                    nums.push(adj[0] * adj[1]);
                }
            }
        }
    }
    console.log(grid.join('\n'));
    console.log(nums);
    console.log('sum', [...nums].sum())
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	partOne();
    partTwo();
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	partOne();
    partTwo();
}
