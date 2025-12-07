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
    console.debug(grid);

    let start_x = grid[0].indexOf('S');
    let start = new Vec(start_x, 0);

    let visited = new Set();
    let splits = [];
    const count = (position = start) => {
        if (position.x > grid[0].length || position.x < 0 || position.y < 0 || position.y > grid.length) return;
        if (visited.has(position.x + ',' + position.y)) return;
        visited.add(position.x + ',' + position.y)
        for (let y = position.y; y < grid.length; ++y) {
            if (grid[y][position.x] == '^') {
                splits.push({ x: position.x , y, });

                count(new Vec(position.x + 1, y));
                count(new Vec(position.x - 1, y));
            } else {
                grid[y][position.x] = '|';
            }
        }
    };

    count();

    console.log(splits.map(v => v.x + ',' + v.y).unique().length);
};

const partTwo = () => {
    const grid = data.lines().map(l => l.split``);
    console.debug(grid);

    let start_x = grid[0].indexOf('S');
    let start = new Vec(start_x, 0);

    const memo = {};
    const count = (position = start) => {
        if (position.x > grid[0].length || position.x < 0 || position.y < 0 || position.y > grid.length) return 0;
        if (memo[position.x + ',' + position.y]) return memo[position.x + ',' + position.y];
        for (let y = position.y; y < grid.length; ++y) {
            if (grid[y][position.x] == '^') {
                return memo[position.x + ',' + position.y] = (count(new Vec(position.x + 1, y)) + count(new Vec(position.x - 1, y)))
            } else {
                grid[y][position.x] = '|';
            }
        }
        return 1;
    };

    console.log(count());
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
time(partTwo);
