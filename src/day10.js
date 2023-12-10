import { createMatrix, read, readEx, time } from './util.js';
import Vec from './util/Vec.js';
await import('./util/bad-but-great.js');

await readEx();
await read();

let data;

// down, up, right, left
const stems = [
    ['7', 'F', '|', 'S'],
    ['J', 'L', '|', 'S'],
    ['L', 'F', '-', 'S'],
    ['J', '7', '-', 'S'],
]

// self: up, down, left, right
const table = {
    '|': [true, true, false, false],
    '-': [false, false, true, true],
    'L': [true, false, false, true],
    'J': [true, false, true, false],
    '7': [false, true, true, false],
    'F': [false, true, false, true],
    'S': [true, true, true, true],
};

const deltas = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
];

// 39:54
const partOne = () => {
    let grid = data.lines().map(l => l.split``);
    let start = [0, 0];

    const exists = ([x, y], [dx, dy]) => {
        x += dx;
        y += dy;
        return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
    }

    const get_connections = ([x, y]) => {
        let self = grid[y][x];
        let out = []
        let motions = table[self];
        for (let i = 0; i < 4; ++i) {
            let d = deltas[i];
            const e = exists([x, y], d);
            //console.log(i, e, y + d[1]);
            if (motions[i] && e) {
                //console.log(i);
                if (stems[i].includes(grid[y + d[1]][x + d[0]])) {
                    out.push([x + d[0], y + d[1]]);
                }
            }
        }
        return out;
    }

    for (const y in grid) {
        if ((start[0] = grid[y].indexOf('S')) !== -1) {
            start[1] = +y;
            break;
        }
    }
    console.log({start});
    //console.log(get_connections([2, 1]));
    console.log(get_connections(start));

    let history = [];
    let curr = [start[0], start[1]];
    while (!history.includes(curr.join())) {
        //console.log({curr});
        const connections = get_connections(curr);
        //console.log('=>', connections);
        let next = connections.filter(conn => conn.join() !== history.at(-1))[0];
        history.push(curr.join());
        curr = next;
    }
    console.log(history.length / 2);

};

// 01:38:27
// NGL, I _really_ enjoyed this one, it was rather challenging in a fun way.
// Probably one of the better AoC puzzles I've done.
const partTwo = () => {
    let grid = data.lines().map(l => l.split``);
    let start = [0, 0];

    const exists = ([x, y], [dx, dy]) => {
        x += dx;
        y += dy;
        return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
    }

    const get_connections = ([x, y]) => {
        let self = grid[y][x];
        let out = []
        let motions = table[self];
        for (let i = 0; i < 4; ++i) {
            let d = deltas[i];
            const e = exists([x, y], d);
            //console.log(i, e, y + d[1]);
            if (motions[i] && e) {
                //console.log(i);
                if (stems[i].includes(grid[y + d[1]][x + d[0]])) {
                    out.push([x + d[0], y + d[1]]);
                }
            }
        }
        return out;
    }

    for (const y in grid) {
        if ((start[0] = grid[y].indexOf('S')) !== -1) {
            start[1] = +y;
            break;
        }
    }
    console.log({start});
    //console.log(get_connections([2, 1]));
    console.log(get_connections(start));

    let history = [];
    let curr = [start[0], start[1]];
    while (!history.includes(curr.join())) {
        //console.log({curr});
        const connections = get_connections(curr);
        //console.log('=>', connections);
        let next = connections.filter(conn => conn.join() !== history.at(-1))[0];
        history.push(curr.join());
        curr = next;
    }
    console.log(history.length / 2);

    console.log(history);

    const width = grid[0].length;
    const height = grid.length;

    let visited_grid = createMatrix(width, height, () => 0);
    const history_set = new Set(history);

    for (let e of history_set) {
        let [x, y] = e.split(',').nums();
        visited_grid[y][x] = '*';
    }

    const dirs = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
    ];

    const left_dir = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
    ];

    const right_dir = [
        [1, 0],
        [-1, 0],
        [0, -1],
        [0, 1],
    ];

    let d = ([x, y], [dx, dy]) => [x + dx, y + dy];

    const flood_fill = ([x, y]) => {
        if (visited_grid[y][x] !== 0) return;
        visited_grid[y][x] = 2;
        for (const dir of dirs) {
            if (exists([x, y], dir)) {
                let c = d([x, y], dir);
                if (visited_grid[c[1]][c[0]] === 0) {
                    flood_fill(c);
                }
            }
        }
    }

    let histpts = history.map(h => h.split(',').nums());
    for (let i = 0; i < history.length; ++i) {
        let [x, y] = histpts[i];
        let [nx, ny] = histpts[(i + 1) % history.length];

        let dir = dirs.findIndex(([dx, dy]) => dx === nx - x && dy == ny - y);

        // I'm not quite sure how to detect this automatically, shy of
        // literally running it and checking for the flood fill to go to the
        // edge, so I just manually changed it if it looked wrong.
        const lr = left_dir;

        if (exists([x, y], lr[dir])) {
            flood_fill(d([x, y], lr[dir]));
        }

        if (i > 1) {
            let [px, py] = histpts[i - 1];
            let dir = dirs.findIndex(([dx, dy]) => dx === x - px && dy == y - py);

            if (exists([x, y], lr[dir])) {
                flood_fill(d([x, y], lr[dir]));
            }
        }
    }

    let rendered = visited_grid.map(r => r.map(c => c === 0 ? '.' : c).join('')).join('\n');
    console.log(rendered);

    console.log('count', visited_grid.map(r => r.filter(s => s === 2).length).sum());
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
