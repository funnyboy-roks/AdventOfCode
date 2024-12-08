import { read, readEx, time } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

// 00:13:47
const partOne = () => {
    const grid = data.lines().map(l => l.split``);
    const a = {};
    for (let y = 0; y < grid.length; ++y) {
        const row = grid[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] !== '.') {
                (a[row[x]] ??= []).push(new Vec(x, y));
            }
        }
    }
    console.log(a);
    for (const freq of a.keys()) {
        /** @type { Vec[] } */
        const atns = a[freq];
        console.debug({ freq, atns });
        for (const a of atns) {
            for (const b of atns) {
                const ab = b.clone().sub(a);
                if (ab.x === 0 && ab.y === 0) continue;
                console.debug({a, b, ab});
                const n = Vec.zero().sub(ab).add(a);
                if (!grid[n.y]?.[n.x]) continue;
                grid[n.y][n.x] = '#';
            }
        }
    }
    console.log(grid.map(l => l.join``).join`\n`);
    console.log(grid.map(l => l.filter(c => c === '#').length).sum());
};

// 00:19:19
const partTwo = () => {
    const grid = data.lines().map(l => l.split``);
    const a = {};
    for (let y = 0; y < grid.length; ++y) {
        const row = grid[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] !== '.') {
                (a[row[x]] ??= []).push(new Vec(x, y));
            }
        }
    }
    console.log(a);
    for (const freq of a.keys()) {
        /** @type { Vec[] } */
        const atns = a[freq];
        console.debug({ freq, atns });
        let i = 0;
        for (const a of atns) {
            for (const b of atns) {
                const ab = b.clone().sub(a);
                if (ab.x === 0 && ab.y === 0) continue;
                console.debug({i, a, b, ab});
                const n = a.clone();
                const d = Vec.zero().sub(ab);
                while (true) {
                    n.add(d);
                    console.debug({n, a, d});
                    if (!grid[n.y]?.[n.x]) break;
                    grid[n.y][n.x] = '#';
                }
                i += 1;
            }
        }
    }
    console.log(grid.map(l => l.join``).join`\n`);
    console.log(grid.map(l => l.filter(c => c !== '.').length).sum());
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
