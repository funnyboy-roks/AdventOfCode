import { read, readEx, time } from './util.js';
import Vec from './util/Vec.js';
await import('./util/bad-but-great.js');

await readEx();
await read();

let data;

const palendrome_at = (row, x) => {
    if (x < row.length - x) {
        return row.substr(0, x * 2).is_palendrome();
    } else {
        return row.substr(row.length - (row.length - x) * 2).is_palendrome();
    }
};

// 30:18
const partOne = () => {
    let ys = 0;
    let xs = 0;
    for (const grid of data.lines().split('')) {
        console.log(grid.join('\n'));
        row: for (let y in grid) {
            y = +y;
            const row = grid[y];
            if (row === grid[y - 1]) {
                let dy = 1;
                console.log(y + dy - 1, grid[y + dy - 1], y - dy, grid[y - dy]);
                for (dy = 1; y + dy < grid.length && grid[y + dy - 1] === grid[y - dy]; dy++);
                console.log({dy});
                if (dy + y === grid.length || y - dy === -1) {
                    console.log('repeat at y =', y);
                    ys += y;
                    break;
                }
            }

            for (let x = 1; x < row.length; ++x) {
                if (palendrome_at(row, x)) {
                    let pal = true;
                    for (let y in grid) {
                        if (!palendrome_at(grid[y], x)) {
                            pal = false;
                            break;
                        }
                    }
                    if (pal) {
                        console.log('repeat at x =', x);
                        xs += x;
                        break row;
                    }
                }

            }
        }
        console.log();
    }
    console.log(xs + ys * 100);
};

const palendrome = (arr) => {
    for(let i = 0; i < arr.length / 2; ++i) {
        if (arr[i] !== arr[arr.length - i - 1]) return false;
    }
    return true;
};

const symmetric_about = (arr, i) => {
    let t = [];
    if (i > arr.length - i) {
        t = arr.slice(arr.length - (arr.length - i) * 2);
    } else {
        t = arr.slice(0, i * 2);
    }
    return palendrome(t)
};

// my first time using javascript generators
const flip = function* (grid) {
    for (let y = 0; y < grid.length; ++y) {
        for (let x = 0; x < grid[0].length; ++x) {
            let g = grid.deepCopy().map(r => r.split``);
            g[y][x] = g[y][x] === '#' ? '.' : '#';
            yield g.map(r => r.join``);
        }
    }
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

// 11:36:12 - I went to bed and had class in the morning
const partTwo = () => {
    const grids = data.lines().split('');
    let hist = [];
    grids: for (const grid of grids) {
        for (let y = 1; y < grid.length; ++y) {
            if (symmetric_about(grid, y)) {
                console.log('y =', y);
                hist.push('y' + y);
                continue grids;
            }
        }

        let tgrid = transpose(grid).map(r => r.join``);
        for (let x = 1; x < tgrid.length; ++x) {
            if (symmetric_about(tgrid, x)) {
                console.log('x =', x);
                hist.push('x' + x);
                continue grids;
            }
        }
    }

    let xs = 0;
    let ys = 0;
    grids: for (let gridI in grids) {
        const ogrid = grids[gridI = +gridI];
        for (const grid of flip(ogrid)) {
            for (let y = 1; y < grid.length; ++y) {
                if (symmetric_about(grid, y)) {
                    if (hist[gridI] !== 'y' + y) {
                        console.log('y =', y);
                        ys += y;
                        continue grids;
                    }
                }
            }

            let tgrid = transpose(grid).map(r => r.join``);
            for (let x = 1; x < tgrid.length; ++x) {
                if (symmetric_about(tgrid, x)) {
                    if (hist[gridI] !== 'x' + x) {
                        console.log('x =', x);
                        xs += x;
                        continue grids;
                    }
                }
            }
        }
    }
    console.log(xs + ys * 100);
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	time(partOne);
    time(partTwo);
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	time(partOne);
    time(partTwo);
}
