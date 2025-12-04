import { read, readEx, time, debug, assert_eq } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

const partOne = () => {
    const grid = data.lines().map(l => l.split``);
    let count = 0;
    for (let y = 0; y < grid.length; ++y) {
        for (let x = 0; x < grid[y].length; ++x) {
            let nbor = 0;
            if (grid[y][x] != '@') continue;
            for (let dy = -1; dy <= 1; ++dy) {
                for (let dx = -1; dx <= 1; ++dx) {
                    if (dy === 0 && dx === 0) continue;
                    const p = grid[y + dy]?.[x+dx];
                    if (p && p !== '.') {
                        nbor += 1;
                    }
                }
            }
            if (nbor < 4) {
                grid[y][x] = 'x';
                count += 1;
            }
        }
    }
    console.log({ count });
};

const partTwo = () => {
    const grid = data.lines().map(l => l.split``);
    let count = 0;
    const step = () => {
        for (let y = 0; y < grid.length; ++y) {
            for (let x = 0; x < grid[y].length; ++x) {
                let nbor = 0;
                if (grid[y][x] != '@') continue;
                for (let dy = -1; dy <= 1; ++dy) {
                    for (let dx = -1; dx <= 1; ++dx) {
                        if (dy === 0 && dx === 0) continue;
                        const p = grid[y + dy]?.[x+dx];
                        if (p && p !== '.') {
                            nbor += 1;
                        }
                    }
                }
                if (nbor < 4) {
                    grid[y][x] = '.';
                    count += 1;
                }
            }
        }
    };

    for (;;) {
        let before = count;
        step();
        if (count == before) {
            break;
        }
    }

    console.log({ count });
};

if (Deno.args[0]) {
	console.log('Sample Data:');
	data = await readEx();
    console.log(data.lines().map(l => '    ' + l).join`\n`)
} else {
	console.log('Real Data');
	data = await read();
}
console.log('Output:');
time(partOne);
time(partTwo)
