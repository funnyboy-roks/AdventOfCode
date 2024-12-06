import { read, readEx } from './util.js';
import Vec from './util/Vec.js';
import './util/prototype-shenanigans.js';
/** @typedef {import('./types.d.ts')} */

await readEx();
await read();

/** @type string **/
let data;

// 00:07:05
const partOne = () => {
    const grid = data.lines().map(l => l.split``);
    let pos;
    outer: for (let y = 0; y < grid.length; ++y) {
        const row = grid[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] === '^') {
                pos = new Vec(x, y);
                break outer;
            }
        }
    }

    console.log(pos);
    let dir = new Vec(0, -1);

    while (true) {
        let n = pos.clone().add(dir);
        if (!grid[n.y]?.[n.x]) break;
        if (grid[n.y][n.x] === '#') {
            if (dir.x === 0 && dir.y === -1) {
                dir = new Vec(1, 0);
            } else if (dir.x === 0 && dir.y === 1) {
                dir = new Vec(-1, 0);
            } else if (dir.x === -1 && dir.y === 0) {
                dir = new Vec(0, -1);
            } else if (dir.x === 1 && dir.y === 0) {
                dir = new Vec(0, 1);
            }
        } else {
            grid[n.y][n.x] = 'x';
            pos = n;
        }
    }

    console.log(grid.map(l => l.filter(s => s === 'x').length).sum());
};

// 00:15:07
const partTwo = () => {
    let grid = data.lines().map(l => l.split``);
    let init;
    outer: for (let y = 0; y < grid.length; ++y) {
        const row = grid[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] === '^') {
                init = new Vec(x, y);
                break outer;
            }
        }
    }

    console.log(init);
    let count = 0;
    for (let y = 0; y < grid.length; ++y) {
        const row = grid[y];
        for (let x = 0; x < row.length; ++x) {
            let dir = new Vec(0, -1);
            let pos = init;
            grid[y][x] = '$';

            let loop = false;
            while (true) {
                let n = pos.clone().add(dir);
                const c = grid[n.y]?.[n.x];
                if (!c) break;
                if (c === '#' || c === '$') {
                    if (dir.x === 0 && dir.y === -1) {
                        dir = new Vec(1, 0);
                    } else if (dir.x === 0 && dir.y === 1) {
                        dir = new Vec(-1, 0);
                    } else if (dir.x === -1 && dir.y === 0) {
                        dir = new Vec(0, -1);
                    } else if (dir.x === 1 && dir.y === 0) {
                        dir = new Vec(0, 1);
                    }
                } else if (
                    c === 'u' && dir.x === 0 && dir.y === -1
                    || c === 'd' && dir.x === 0 && dir.y === 1
                    || c === 'l' && dir.x === -1 && dir.y === 0
                    || c === 'r' && dir.x === 1 && dir.y === 0
                ) {
                    loop = true;
                    break;
                } else {
                    let c;
                    if (dir.x === 0 && dir.y === -1) {
                        c = 'u'
                    } else if (dir.x === 0 && dir.y === 1) {
                        c = 'd'
                    } else if (dir.x === -1 && dir.y === 0) {
                        c = 'l'
                    } else if (dir.x === 1 && dir.y === 0) {
                        c = 'r'
                    }
                    grid[n.y][n.x] = c;
                    pos = n;
                }
            }
            // console.log(grid.map(l => l.join``).join(`\n`));
            if (loop) count += 1;
            grid = data.lines().map(l => l.split``);
        }
    }
    console.log(count);
};

if (process.argv[2]) {
	console.log('Sample Data:');
	data = await readEx();
    console.log(data.lines().map(l => '    ' + l).join`\n`)
} else {
	console.log('Real Data');
	data = await read();
}
console.log('Output:');
partOne();
partTwo();
