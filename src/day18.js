import { read, readEx, time, debug, assert_eq, createMatrix } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

// 00:16:13
const partOne = () => {
    let pos = data.lines().map(Vec.fromString);
    console.log(pos, pos.length);
    let width = debug ? 7 : 71;
    let height = debug ? 7 : 71;
    let N = debug ? 12 : 1024;
    let grid = createMatrix(width, height, () => 0);
    for (let i = 0; i < N; ++i) {
        grid[pos[i].y][pos[i].x] = 1;
    }
    console.log(grid.map(l => l.map(b => b ? '#' : '.').join``).join`\n`);

    let dist = createMatrix(width, height, () => Infinity);
    let Q = [];
    for (let y = 0; y < height; ++y) {
        const row = grid[y];
        for (let x = 0; x < width; ++x) {
            if (row[x] === 1) continue;
            dist[y][x] = Infinity;
            Q.push(new Vec(x, y));
        }
    }
    dist[0][0] = 0;

    while (Q.length) {
        const min = Q.map(u => dist[u.y][u.x]).min();
        const ui = Q.findIndex(u => dist[u.y][u.x] === min);
        const [u] = Q.splice(ui, 1);

        const neighbours = [Vec.UP, Vec.DOWN, Vec.LEFT, Vec.RIGHT].map(v => v.add(u));
        for (const v of neighbours) {
            if (!Q.find(q => q.equals(v))) continue;
            const alt = dist[u.y][u.x] + 1;
            if (alt < dist[v.y][v.x]) {
                dist[v.y][v.x] = alt;
            }
        }
    }

    console.log(dist[height - 1][width - 1]);
};

// 00:20:38
const partTwo = () => {
    let pos = data.lines().map(Vec.fromString);
    console.log(pos, pos.length);
    let width = debug ? 7 : 71;
    let height = debug ? 7 : 71;
    for (let N = debug ? 12 : 1024; N < pos.length; ++N) { 
        let grid = createMatrix(width, height, () => 0);
        for (let i = 0; i < N; ++i) {
            grid[pos[i].y][pos[i].x] = 1;
        }
        // didn't intend it, but it looks really cool to see the points drawn in
        console.log(grid.map(l => l.map(b => b ? '#' : '.').join``).join`\n`);

        let dist = createMatrix(width, height, () => Infinity);
        let Q = [];
        for (let y = 0; y < height; ++y) {
            const row = grid[y];
            for (let x = 0; x < width; ++x) {
                if (row[x] === 1) continue;
                dist[y][x] = Infinity;
                Q.push(new Vec(x, y));
            }
        }
        dist[0][0] = 0;

        while (Q.length) {
            const min = Q.map(u => dist[u.y][u.x]).min();
            const ui = Q.findIndex(u => dist[u.y][u.x] === min);
            const [u] = Q.splice(ui, 1);

            const neighbours = [Vec.UP, Vec.DOWN, Vec.LEFT, Vec.RIGHT].map(v => v.add(u));
            for (const v of neighbours) {
                if (!Q.find(q => q.equals(v))) continue;
                const alt = dist[u.y][u.x] + 1;
                if (alt < dist[v.y][v.x]) {
                    dist[v.y][v.x] = alt;
                }
            }
        }
        if (dist[height - 1][width - 1] === Infinity) {
            console.log({ N }, pos[N - 1]);
            break;
        }
    }
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
