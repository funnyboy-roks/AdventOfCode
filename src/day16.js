import { debug, read, readEx, time } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

// I firmly believe this should work... need to figure out why it doesn't for the real input
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


    /** @type { Vec[][] } */
    const facing = grid.map(row => row.map(() => undefined));
    const dist = grid.map(row => row.map(() => Infinity));
    /** @type { Vec[][] } */
    const prev = grid.map(row => row.map(() => undefined));
    let Q = [];
    // for each vertex v in Graph.Vertices:
    //     dist[v] ← INFINITY
    //     prev[v] ← UNDEFINED
    //     add v to Q
    // dist[source] ← 0
    for (let y = 0; y < grid.length; ++y) {
        const row = grid[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] === '#') continue;
            const v = new Vec(x, y);
            Q.push(v);
        }
    }

    dist[start.y][start.x] = 0;
    facing[start.y][start.x] = Vec.RIGHT;

    // while Q is not empty:
    //   u ← vertex in Q with minimum dist[u]
    //   remove u from Q
    while (Q.length) {
        let min = Q.map(v => dist[v.y][v.x]).min();
        const ui = Q.findIndex(v => dist[v.y][v.x] === min);
        const [u] = Q.splice(ui, 1);
        // console.log({ u, min, ui, len: Q.length });
        const f = facing[u.y][u.x];
        const dirs = [f, f.turnRight(), f.turnLeft()];
        // for each neighbor v of u still in Q:
        //   alt ← dist[u] + Graph.Edges(u, v)
        //   if alt < dist[v]:
        //     dist[v] ← alt
        //     prev[v] ← u
        //     add v to Q with distance alt
        for (const dir of dirs) {
            const v = u.add(dir);
            if (grid[v.y][v.x] === '#') continue;
            if (!Q.some(q => q.equals(v))) continue;
            const alt = dist[u.y][u.x] + (f.equals(dir) ? 1 : 1001);
            if (alt < dist[v.y][v.x]) {
                dist[v.y][v.x] = alt;
                prev[v.y][v.x] = u;
                facing[v.y][v.x] = dir;
                // Q.push(v);
            }
        }
    }
    console.log(dist, prev, facing);
    const map = {
        'up': '^',
        'down': 'v',
        'left': '<',
        'right': '>',
        '.': ' ',
        '#': '░',
    };


    // S ← empty sequence
    // u ← target
    // if prev[u] is defined or u = source: // Do something only if the vertex is reachable
    //   while u is defined: // Construct the shortest path with a stack S
    //   insert u at the beginning of S // Push the vertex onto the stack
    //   u ← prev[u] // Traverse from target to source
    const S = [];
    let u = end;
    if (prev[u.y][u.x] || u === start) {
        while (u) {
            S.unshift(u);
            u = prev[u.y][u.x];
        }
    }
    console.log({S, len: S.length});
    let prv = S[0];
    let turns = 0;
    let steps = 0;
    for(const s of S.slice(1)) {
        if (!facing[prv.y][prv.x].equals(facing[s.y][s.x])) {
            turns += 1;
        }
        steps += 1;
        prv = s;
    }
    console.log(grid.map((row, y) => row.map((c, x) => facing[y][x] && S.some((v) => v.x === x && v.y === y) ? map[facing[y][x].getDirection()] : map[c]).join``).join`\n`);
    console.log({ turns, steps });

    console.log(dist[end.y][end.x]);
};

// 01:38:51
const partOne2 = () => {
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


    const dist = grid.map(row => row.map(() => [Infinity].repeat(4)));
    const prev = grid.map(row => row.map(() => [undefined].repeat(4)));
    let Q = [];
    const idx = {
        [Vec.UP]: 0,
        [Vec.DOWN]: 1,
        [Vec.LEFT]: 2,
        [Vec.RIGHT]: 3,
    };
    for (let y = 0; y < grid.length; ++y) {
        const row = grid[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] === '#') continue;
            const v = new Vec(x, y);
            Q.push([v, Vec.UP]);
            Q.push([v, Vec.DOWN]);
            Q.push([v, Vec.RIGHT]);
            Q.push([v, Vec.LEFT]);
        }
    }

    dist[start.y][start.x][idx[Vec.RIGHT]] = 0;
    while (Q.length) {
        if (Q.length % 100 === 0) console.log(Q.length);
        let min = Q.map(([v, dir]) => dist[v.y][v.x][idx[dir]]).min();
        const ui = Q.findIndex(([v, dir]) => dist[v.y][v.x][idx[dir]] === min);
        const [[upos, udir]] = Q.splice(ui, 1);
        const neighbours = [
            { n: [upos.add(udir), udir            ], cost: 1 },
            { n: [upos,           udir.turnRight()], cost: 1000 },
            { n: [upos,           udir.turnLeft() ], cost: 1000 },
        ];
        for (const { n: [pos, dir], cost } of neighbours) {
            if (grid[pos.y][pos.x] === '#') continue;
            const alt = dist[upos.y][upos.x][idx[udir]] + cost;
            if (alt < dist[pos.y][pos.x][idx[dir]]) {
                dist[pos.y][pos.x][idx[dir]] = alt;
                prev[pos.y][pos.x][idx[dir]] = [upos, udir];
            }
        }
    }
    console.log(dist[end.y][end.x].min());
};

// Ended up going to bed
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

    const turn_left = (dir) => {
        switch (dir) {
            case 'up': return 'left';
            case 'left': return 'down';
            case 'down': return 'right';
            case 'right': return 'up';
        }
        throw new Error(dir);
    }

    const invert = (dir) => {
        switch (dir) {
            case 'up': return 'down';
            case 'down': return 'up';
            case 'left': return 'right';
            case 'right': return 'left';
        }
        throw new Error(dir);
    }

    const turn_right = (dir) => {
        switch (dir) {
            case 'up': return 'right';
            case 'right': return 'down';
            case 'down': return 'left';
            case 'left': return 'up';
        }
        throw new Error(dir);
    }

    const dist = grid.map(row => row.map(() => ({})));
    /** @type { [Vec, 'up' | 'down' | 'left' | 'right'][] } */
    let Q = [];
    for (let y = 0; y < grid.length; ++y) {
        const row = grid[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] === '#') continue;
            const v = new Vec(x, y);
            Q.push([v, 'up']);
            Q.push([v, 'down']);
            Q.push([v, 'right']);
            Q.push([v, 'left']);
        }
    }

    dist[start.y][start.x].right = 0;
    while (Q.length) {
        if (Q.length % 100 === 0) console.log(Q.length);
        let min = Q.map(([v, dir]) => dist[v.y][v.x][dir] ?? Infinity).min();
        const ui = Q.findIndex(([v, dir]) => (dist[v.y][v.x][dir] ?? Infinity) === min);
        const [[upos, udir]] = Q.splice(ui, 1);
        const udirv = Vec.fromString(udir);
        const neighbours = [
            { n: [upos.add(udirv), udir             ], cost: 1 },
            { n: [upos,            turn_right(udir)], cost: 1000 },
            { n: [upos,            turn_left(udir)], cost: 1000 },
        ];
        for (const { n: [pos, dir], cost } of neighbours) {
            if (grid[pos.y][pos.x] === '#') continue;
            const alt = dist[upos.y][upos.x][udir] + cost;
            if (alt < (dist[pos.y][pos.x][dir] ?? Infinity)) {
                dist[pos.y][pos.x][dir] = alt;
            }
        }
    }
    console.log('dijkstra done');
    console.log(dist[end.y][end.x]);

    const rec = (pos, dir, path = []) => {
        let curr = dist[pos.y][pos.x][dir];
        if (curr === 0) return [[...path, pos]];
        let next = pos.add(Vec.fromString(invert(dir)));
        let out = [];
        if (dist[next.y][next.x][dir] === curr - 1) {
            out.push(...rec(next, dir, [...path, pos]));
        }
        let next_dir = turn_right(dir);
        if (dist[pos.y][pos.x][next_dir] === curr - 1000) {
            out.push(...rec(pos, next_dir, [...path, pos]));
        }
        next_dir = turn_left(dir);
        if (dist[pos.y][pos.x][next_dir] === curr - 1000) {
            out.push(...rec(pos, next_dir, [...path, pos]));
        }
        return out;
    };
    let min = Object.values(dist[end.y][end.x]).min();
    let keys = Object.entries(dist[end.y][end.x]).filter_map(([k, d]) => d === min ? k : undefined);
    console.log({ keys, min });
    let pos = new Set();
    for (const key of keys) {
        rec(end, key).flatMap(v => v).forEach(v => pos.add(v.toString()));
    }
    console.log(pos.size);
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
time(partOne2);
time(partTwo);
