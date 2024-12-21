import { read, readEx, createMatrix, time, debug } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

// 00:19:06
const partOne = () => {
    const grid = data.lines().map(l => l.split``);

    let start;
    let end;

    for (let y = 0; y < grid.length; ++y) {
        const row = grid[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] === 'S') start = new Vec(x, y);
            if (row[x] === 'E') end = new Vec(x, y);
        }
    }
    console.log({ start, end});

    let dist = createMatrix(grid.length, grid[0].length, () => Infinity);
    let prev = createMatrix(grid.length, grid[0].length, () => undefined)
    let Q = [];
    for (let y = 0; y < grid.length; ++y) {
        const row = grid[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] === '#') continue;
            dist[y][x] = Infinity;
            Q.push(new Vec(x, y));
        }
    }
    dist[start.y][start.x] = 0;

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
                prev[v.y][v.x] = u;
            }
        }
    }

    // S ← empty sequence
    // u ← target
    // if prev[u] is defined or u = source:          // Proceed if the vertex is reachable
    //     while u is defined:                       // Construct the shortest path with a stack S
    //         insert u at the beginning of S        // Push the vertex onto the stack
    //         u ← prev[u]                           // Traverse from target to source
    const S = [];
    let u = end;
    if (prev[u.y][u.x] || u === start) {
        while (u) {
            S.unshift(u);
            u = prev[u.y][u.x];
        }
    }

    // - 1 because we include the start
    const og_time = S.length - 1;

    console.log(S, og_time);

    let count = 0;
    let groups = {};
    for (let i = 0; i < S.length - 1; ++i) {
        const a = S[i];
        for (let j = i + 1; j < S.length; ++j) {
            const b = S[j];
            if (a.manDist(b) <= 2) {
                const d = j - i - a.manDist(b);
                groups[d] ??= 0;
                groups[d] += 1;
                if (d >= 100) count += 1;
            }
        }
    }
    console.log(groups);
    console.log(count);
    // console.log(grid.map(l => l.join``).join`\n`);

};

// 00:19:49 -- 🎄 159 🎄
const partTwo = () => {
    const grid = data.lines().map(l => l.split``);

    let start;
    let end;

    for (let y = 0; y < grid.length; ++y) {
        const row = grid[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] === 'S') start = new Vec(x, y);
            if (row[x] === 'E') end = new Vec(x, y);
        }
    }
    console.log({ start, end});

    let dist = createMatrix(grid.length, grid[0].length, () => Infinity);
    let prev = createMatrix(grid.length, grid[0].length, () => undefined)
    let Q = [];
    for (let y = 0; y < grid.length; ++y) {
        const row = grid[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] === '#') continue;
            dist[y][x] = Infinity;
            Q.push(new Vec(x, y));
        }
    }
    dist[start.y][start.x] = 0;

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
                prev[v.y][v.x] = u;
            }
        }
    }

    // S ← empty sequence
    // u ← target
    // if prev[u] is defined or u = source:          // Proceed if the vertex is reachable
    //     while u is defined:                       // Construct the shortest path with a stack S
    //         insert u at the beginning of S        // Push the vertex onto the stack
    //         u ← prev[u]                           // Traverse from target to source
    const S = [];
    let u = end;
    if (prev[u.y][u.x] || u === start) {
        while (u) {
            S.unshift(u);
            u = prev[u.y][u.x];
        }
    }

    // - 1 because we include the start
    const og_time = S.length - 1;

    console.log(S, og_time);

    let count = 0;
    let groups = {};
    for (let i = 0; i < S.length - 1; ++i) {
        const a = S[i];
        for (let j = i + 1; j < S.length; ++j) {
            const b = S[j];
            if (a.manDist(b) <= 20) {
                const d = j - i - a.manDist(b);
                groups[d] ??= 0;
                groups[d] += 1;
                if (d >= 100) count += 1;
            }
        }
    }
    console.log(groups);
    console.log(count);
    // console.log(grid.map(l => l.join``).join`\n`);

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
