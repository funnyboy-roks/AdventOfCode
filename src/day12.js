import { read, readEx, time, debug, assert_eq } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

// 00:16:19
const partOne = () => {
    const grid = data.lines().map(l => l.split``);

    /** @type {{symbol: string, points: Vec[]}[]} */
    const groups = [];

    const flood_fill = (vec, must_match = undefined) => {
        const char = grid[vec.y]?.[vec.x];
        if (!char) return [];
        if (must_match !== undefined && char !== must_match) return [];

        grid[vec.y][vec.x] = null;
        const ret = [
            vec,
            ...flood_fill(vec.add(Vec.UP), char),
            ...flood_fill(vec.add(Vec.DOWN), char),
            ...flood_fill(vec.add(Vec.LEFT), char),
            ...flood_fill(vec.add(Vec.RIGHT), char),
        ];
        return ret;
    };

    const perim = (pts = [Vec.UP]) => {
        let count = 0;
        for (const pt of pts) {
            if (!pts.some(b => pt.add(Vec.DOWN).equals(b))) {
                count += 1;
            }
            if (!pts.some(b => pt.add(Vec.LEFT).equals(b))) {
                count += 1;
            }
            if (!pts.some(b => pt.add(Vec.RIGHT).equals(b))) {
                count += 1;
            }
            if (!pts.some(b => pt.add(Vec.UP).equals(b))) {
                count += 1;
            }
        }
        return count;
    };

    let sum = 0;
    for (let y = 0; y < grid.length; ++y) {
        const row = grid[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x]) {
                const symbol = row[x];
                const fill = flood_fill(new Vec(x, y));
                console.log(fill);
                console.log(symbol, perim(fill));
                sum += perim(fill) * fill.length;
                groups.push({ symbol, points: fill });
            }
        }
    }

    console.log(groups);
    console.log(sum);
};

// 13:26:49 - Ended up going to bed and couldn't continue until the next afternoon
const partTwo = () => {
    const grid = data.lines().map(l => l.split``);

    /** @type {{symbol: string, points: Vec[]}[]} */
    const groups = [];

    const flood_fill = (vec, must_match, g) => {
        const char = g[vec.y]?.[vec.x];
        if (!char) return [];
        if (must_match !== undefined && char !== must_match) return [];

        g[vec.y][vec.x] = null;
        const ret = [
            vec,
            ...flood_fill(vec.add(Vec.UP), char, g),
            ...flood_fill(vec.add(Vec.DOWN), char, g),
            ...flood_fill(vec.add(Vec.LEFT), char, g),
            ...flood_fill(vec.add(Vec.RIGHT), char, g),
        ];
        return ret;
    };

    const is_open = (p, dir, pts) => {
        const add = p.add(dir);
        return !pts.some(b => b.equals(add));
    };

    const sides = (pts = [Vec.UP]) => {
        const dirs = [Vec.UP, Vec.DOWN, Vec.LEFT, Vec.RIGHT];
        const cdirs = [-1, 1].flatMap(d => [new Vec(d, d), new Vec(-d, d)]);
        let edges = 0;
        let corners = 0;
        for (const p of pts) {
            const open = Object.fromEntries(dirs.map(d => [d, is_open(p, d, pts)]));
            if (!dirs.concat(cdirs).some(d => is_open(p, d, pts))) {
                continue;
            }
            const is_edge = open[Vec.UP] && open[Vec.DOWN] && !open[Vec.LEFT] && !open[Vec.RIGHT]
                || !open[Vec.UP] && !open[Vec.DOWN] && open[Vec.LEFT] && open[Vec.RIGHT];
            console.log({p, open, is_edge});
            if (is_edge) {
                edges += 1;
                console.log('edge');
                continue;
            }
            const sides = dirs.filter(d => !open[d]);
            const scorners = corners;
            if (sides.length === 4 || sides.length === 0) {
                corners += cdirs.filter(d => is_open(p, d, pts)).length;
                console.log('full');
            } else if (sides.length === 3) {
                console.log('T');
                let left = sides[0];
                while (!open[left.turnLeft()]) {
                    left = left.turnLeft();
                }

                let s = [left, left.turnRight(), left.turnRight().turnRight()];

                if (is_open(p, s[0].add(s[1]), pts)) {
                    corners += 1;
                }
                if (is_open(p, s[1].add(s[2]), pts)) {
                    corners += 1;
                }
            } else if (sides.length === 2) {
                console.log('true corner');
                corners += 1;
                const d = sides[0].add(sides[1]);
                if (is_open(p, d, pts)) {
                    corners += 1;
                }
            } else if (sides.length === 1) {
                corners += 2;
                console.log('cap');
            }
            console.log({corners: corners - scorners});

        }
        console.log({ edges, corners });
        return corners;
    };
    // ...
    // .  .
    // ....

    let sum = 0;
    const g = JSON.parse(JSON.stringify(grid));
    for (let y = 0; y < g.length; ++y) {
        const row = g[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x]) {
                console.log('----------------------------------------------------------------------------------------------------');
                const symbol = row[x];
                console.log(symbol);
                const fill = flood_fill(new Vec(x, y), undefined, g);
                const s = sides(fill);
                // console.log({ symbol, fill, s });
                groups.push({ symbol, points: fill, s });
            }
        }
    }


    // for (const outer of groups) {
    //     console.log('checking', outer.symbol);
    //     const min = outer.points.reduce((a, b) => a.min(b), Vec.MAX).add(new Vec(1, 1));
    //     const max = outer.points.reduce((a, b) => a.max(b), Vec.MIN).sub(new Vec(1, 1));
    //     for (const inner of groups) {
    //         if (inner === outer) {
    //             continue;
    //         }
    //         const start = inner.points[0]
    //         console.log('checking', inner.symbol, 'in', outer.symbol, '@', { [outer.symbol]: outer.points[0], [inner.symbol]: inner.points[0] });

    //         if (!inner.points.every(pt => pt.within(min, max))) {
    //             console.error('goes out of bounds');
    //             continue;
    //         }

    //         assert_eq(inner.symbol, grid[start.y]?.[start.x]);
    //         assert_eq(false, outer.points.some(o => start.equals(o)));
    //         const seen = new Set();
    //         // const n = flood_fill_contained(start, [inner.symbol], outer.points, seen, 0);
    //         // if (!n) {
    //             // console.log(inner.symbol, 'is not in', outer.symbol);
    //             // continue;
    //         // }
    //         // console.log(inner.symbol, 'is in', outer.symbol);
    //         // console.log(n);
    //         // const s = sides(n);
    //         // console.log({ outer, start, n, s });
    //         outer.s += s;
    //     }
    //     sum += outer.s * outer.points.length;
    // }

    // console.log(groups);
    console.log(groups.map(g => ({ symbol: g.symbol, s: g.s, len: g.points.length })));
    console.log(groups.map(g => g.s * g.points.length).sum());
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
// time(partOne);
time(partTwo);
