import { read, readEx } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

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
    const dir = Vec.UP;

    while (true) {
        const n = pos.clone().add(dir);
        if (!grid[n.y]?.[n.x])
            break;
        else if (grid[n.y][n.x] === '#') 
            dir.turnRight();
        else {
            grid[n.y][n.x] = 'x';
            pos = n;
        }
    }

    console.log(grid.map(l => l.filter(s => s === 'x').length).sum());
};

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
            const dir = Vec.UP;
            let pos = init;
            grid[y][x] = '$';

            let loop = false;
            while (true) {
                const n = pos.clone().add(dir);
                const c = grid[n.y]?.[n.x];
                if (!c) break;
                if (c === '#' || c === '$') {
                    dir.turnRight();
                } else if (
                    c === 'u' && dir.isUp()
                    || c === 'd' && dir.isDown()
                    || c === 'l' && dir.isLeft()
                    || c === 'r' && dir.isRight()
                ) {
                    loop = true;
                    break;
                } else {
                    grid[n.y][n.x] = dir.getDirection()[0];
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

if (Deno.args[1]) {
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
