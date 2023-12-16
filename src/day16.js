import { read, readEx, time } from './util.js';
import Vec from './util/Vec.js';
await import('./util/bad-but-great.js');

await readEx();
await read();

let data;

const dir = ([dx, dy]) => {
    if (dx === 0 && dy === -1) {
        return 'up';
    } else if (dx === 0 && dy === 1) {
        return 'down';
    } else if (dx === 1 && dy === 0) {
        return 'right';
    } else if (dx === -1 && dy === 0) {
        return 'left';
    }
    throw `invalid dir: ${dir}`;
}

const walk = (grid, hl, x, y, [dx, dy]) => {
    if (grid[y] === undefined || grid[y][x] === undefined) return;
    let this_hl = hl[y][x];
    if (this_hl[0] === dx && this_hl[1] === dy) {
        console.log('loop')
        return;
    }
    if (y >= grid.length || y < 0 || x < 0 || x >= grid[0].length) {
        console.log('out of bounds:', [x + dx, y + dy]);
        return;
    }
    hl[y][x] = [dx, dy];

    switch (grid[y][x]) {
        case '.':
            walk(grid, hl, x + dx, y + dy, [dx, dy]);
            break;
        case '|':
            if (dir[0] !== 0) {
                walk(grid, hl, x, y - 1, [0, -1]);
                walk(grid, hl, x, y + 1, [0,  1]);
            } else {
                walk(grid, hl, x + dx, y + dy, [dx, dy]);
            }
            break;
        case '-':
            if (dir[1] !== 0) {
                walk(grid, hl, x - 1, y, [-1, 0]);
                walk(grid, hl, x + 1, y, [ 1, 0]);
            } else {
                walk(grid, hl, x + dx, y + dy, [dx, dy]);
            }
            break;
        case '/':
            switch (dir([dx, dy])) {
                case 'up':
                    walk(grid, hl, x + 1, y, [1, 0]);
                    break;
                case 'down':
                    walk(grid, hl, x - 1, y, [-1, 0]);
                    break;
                case 'left':
                    walk(grid, hl, x, y + 1, [0, 1]);
                    break;
                case 'right':
                    walk(grid, hl, x, y - 1, [0, -1]);
                    break;
            }
            break;
        case '\\':
            switch (dir([dx, dy])) {
                case 'up':
                    walk(grid, hl, x - 1, y, [-1, 0]);
                    break;
                case 'down':
                    walk(grid, hl, x + 1, y, [1, 0]);
                    break;
                case 'left':
                    walk(grid, hl, x, y - 1, [0, -1]);
                    break;
                case 'right':
                    walk(grid, hl, x, y + 1, [0, 1]);
                    break;
            }
            break;
    }
}

// 28:53 -- didn't realise that I'd skipped '\' in `walk` lmao
const partOne = () => {
    let grid = data.lines();
    let highlight = Array(grid.length).fill(0).map(() => Array(grid[0].length).fill(0));
    console.log(highlight.map(l => l.map(n => n ? '#' : '.').join``).join('\n'));
    walk(grid, highlight, 0, 0, [1, 0]);
    console.log(highlight.map(l => l.map(n => n ? '#' : '.').join``).join('\n'));
    console.log(highlight.map(l => l.truthy().length).sum());
};

const find_entry_points = (grid) => {
    // x,y,d
    let eps = new Set();
    for (let x = 0; x < grid[0].length; ++x) {
        eps.add([x, 0, 'd'].join());
        eps.add([x, grid.length - 1, 'u'].join());
    }
    for (let y = 0; y < grid.length; ++y) {
        eps.add([0, y, 'r'].join());
        eps.add([grid[0].length - 1, y, 'l'].join());
    }
    eps.add([0, 0, 'd'].join());
    eps.add([0, grid[0].length - 1, 'd'].join());
    eps.add([grid.length - 1, 0, 'u'].join());
    eps.add([grid.length - 1, grid[0].length - 1, 'u'].join());
    return eps;
};

// 59:25
const partTwo = () => {
    let grid = data.lines();
    const entry_points = [...find_entry_points(grid)];
    const dirs = {
        l: [-1, 0],
        r: [1, 0],
        u: [0, -1],
        d: [0, 1],
    }
    console.log({entry_points});
    let max = -Infinity;
    for (let i in entry_points) {
        i = +i;
        const ep = entry_points[i];
        let highlight = Array(grid.length).fill(0).map(() => Array(grid[0].length).fill(0));
        let [x, y, d] = ep.split(',');
        x = +x;
        y = +y;
        try { // cba to do this properly, but it fucking works :D
            walk(grid, highlight, x, y, dirs[d]);
        } catch (ex) {
            if ((ex +'').includes('stack')) {
                continue;
            }
        }
        let n = highlight.map(l => l.truthy().length).sum();
        console.log(n);
        if (max < n) max = n;
    }
    console.log({ max });
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data
}

time(partOne);
time(partTwo);
