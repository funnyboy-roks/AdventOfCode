import { read, readEx, time } from './util.js';
import Vec from './util/Vec.js';
await import('./util/bad-but-great.js');

await readEx();
await read();

let data;

const shift = (grid) => {
    let new_grid = grid.deepCopy();

    for (let y = 0; y < grid.length; ++y) {
        const row = grid[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] === 'O') {
                let ny;
                for (ny = y - 1; ny >= 0; ny--) {
                    if (grid[ny][x] !== '.') break;
                }
                ny += 1;
                //if (ny < 0) ny = 0;
                if (ny !== y) {
                    grid[y][x] = '.';
                    //grid[y][x] = '.';
                }
                console.log({ y, x, ny });
                grid[ny][x] = 'O';
            } else {
                grid[y][x] = grid[y][x];
            }
        }
    }

    return grid;
};

// 11:32
const partOne = () => {
    let grid = data.lines().map(l => l.split``);
    console.log(grid.map(l => l.join(``)).join('\n'));
    let new_grid = shift(grid)
    console.log(new_grid.map(l => l.join(``)).join('\n'));
    let sum = 0;
    for (let y = 0; y < new_grid.length; ++y) {
        sum += new_grid[y].filter(c => c === 'O').length * (new_grid.length - y);
    }
    console.log({ sum });
};

const transpose = (arr) => {
    let out = Array(arr[0].length).fill(0).map(() => []);
    for (let y = 0; y < arr.length; ++y) {
        for (let x = 0; x < arr[0].length; ++x) {
            out[x][y] = arr[y][x];
        }
    }
    return out;
}


const shift_dir = (grid, dir) => {
    let new_grid = grid.deepCopy();

    if (dir[0]) {
        grid = transpose(grid);
    }

    const d = dir[0] ? dir[0] : dir[1];

    if (d < 0) {
        for (let y = 0; y < grid.length; ++y) {
            const row = grid[y];
            for (let x = 0; x < row.length; ++x) {
                if (row[x] === 'O') {
                    let ny;
                    //console.log({ d, dir });
                    for (ny = y - 1; ny >= 0; ny--) {
                        if (grid[ny][x] !== '.') break;
                    }
                    ny += 1;
                    //if (ny < 0) ny = 0;
                    if (ny !== y) {
                        grid[y][x] = '.';
                        //grid[y][x] = '.';
                    }
                    //console.log({ y, x, ny });
                    grid[ny][x] = 'O';
                } else {
                    grid[y][x] = grid[y][x];
                }
            }
        }
    } else {
        for (let y = grid.length; y-- > 0;) {
            const row = grid[y];
            for (let x = 0; x < row.length; ++x) {
                if (row[x] === 'O') {
                    let ny;
                    //console.log({ d, dir });
                    for (ny = y + 1; ny < grid.length; ++ny) {
                        if (grid[ny][x] !== '.') break;
                    }
                    ny -= 1;
                    //if (ny < 0) ny = 0;
                    if (ny !== y) {
                        grid[y][x] = '.';
                        //grid[y][x] = '.';
                    }
                    //console.log({ y, x, ny });
                    grid[ny][x] = 'O';
                } else {
                    grid[y][x] = grid[y][x];
                }
            }
        }
    }

    return dir[0] ? transpose(grid) : grid;
};

// 45:39
const partTwo = () => {
    const cycle = [
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
    ];

    let grid = data.lines().map(l => l.split``);
    let hist = [grid.map(l => l.join(``)).join('\n')];
    const MAX = 1_000_000_000;
    let pos;
    out: for (let i = 0; i < MAX; ++i) {
        for (const c of cycle) {
            grid = shift_dir(grid, c);
        }
        let gs = grid.map(l => l.join(``)).join('\n');
        for (let hi = hist.length; hi-- > 0; ) {
            if (hist[hi] === gs) {
                console.log('break @ i =', i);
                // start of the loop + (remaining elements to loop through) % (length of the loop)
                console.log(pos = hi + (MAX - hi) % (hist.length - hi));
                break out;
            }
        }
        hist.push(grid.map(l => l.join(``)).join('\n'));
        if (i % 1000 === 0) {
            console.log(i, (i * 100 / MAX) + '%');
        }
    }
    let sum = 0;
    if (pos === undefined) throw 'wut';
    grid = hist[pos].split('\n').map(l => l.split``);
    for (let y = 0; y < grid.length; ++y) {
        sum += grid[y].filter(c => c === 'O').length * (grid.length - y);
    }
    console.log({ sum });
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	//time(partOne);
    time(partTwo);
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	//time(partOne);
    time(partTwo);
}
