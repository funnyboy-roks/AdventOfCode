import { read, readEx, time, debug, assert_eq, createMatrix } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

const mod_funky = (a, b) => (a % b + b) % b;

// 00:19:03
const partOne = () => {
    const robits = data.lines().map(l => l.match(/(-?\d+,-?\d+)/g).map(Vec.fromString)).map(([p,v]) => ({p,v}));
    const TIME = 100;
    // const WIDTH = 11;
    // const HEIGHT = 7;
    const WIDTH = debug ? 11 : 101;
    const HEIGHT = debug ? 7 : 103;
    const mat = createMatrix(WIDTH, HEIGHT, () => 0);
    for (const { p, v } of robits) {
        const nx = mod_funky(p.x + v.x * TIME, WIDTH);
        const ny = mod_funky(p.y + v.y * TIME, HEIGHT);
        console.log(nx, ny);
        mat[ny][nx] += 1;
    }

    const q = [0, 0, 0, 0];
    for (let x = 0; x < WIDTH / 2 - .5; ++x) {
        for (let y = 0; y < HEIGHT / 2 - .5; ++y) {
            q[0] += mat[y][x];
        }
    }
    for (let x = WIDTH / 2 + .5; x < WIDTH; ++x) {
        for (let y = 0; y < HEIGHT / 2 - .5; ++y) {
            q[1] += mat[y][x];
        }
    }
    for (let x = 0; x < WIDTH / 2 - .5; ++x) {
        for (let y = HEIGHT / 2 + .5; y < HEIGHT; ++y) {
            q[2] += mat[y][x];
        }
    }
    for (let x = WIDTH / 2 + .5; x < WIDTH; ++x) {
        for (let y = HEIGHT / 2 + .5; y < HEIGHT; ++y) {
            q[3] += mat[y][x];
        }
    }
    console.log(mat.map(l => l.join``).join('\n'))
    console.log(q);
    return q.prod();
};

// NGL- this was not a great one... Not terribly clear on the goal, though that might be intentional.
// 00:42:05
const partTwo = () => {
    const robits = data.lines().map(l => l.match(/(-?\d+,-?\d+)/g).map(Vec.fromString)).map(([p,v]) => ({p,v}));
    const WIDTH = 101;
    const HEIGHT = 103;
    const dr = new Vec(1, 1);
    const dl = new Vec(-1, 1);
    for (let i = 0; ; ++i) {
        const mat = createMatrix(WIDTH, HEIGHT, () => 0);
        const pts = new Set();
        for (const { p, v } of robits) {
            const nx = mod_funky(p.x + v.x * i, WIDTH);
            const ny = mod_funky(p.y + v.y * i, HEIGHT);
            mat[ny][nx] += 1;
            pts.add(`${nx},${ny}`);
        }
         
        for (const pt of pts) {
            let n = 0;
            const vp = Vec.fromString(pt);
            let l = vp;
            let r = vp;
            while (
                pts.has((l = l.add(dl)) + '')
                && pts.has((r = r.add(dr)) + '')
            ) {
                n += 1;
            }
            if (n > 5) {
                console.log();
                console.log({ i, n, pt })
                console.log(mat.map(l => l.map(n => n || '.').join``).join('\n'))
                return i;
            }
        }
        if (i % 100 === 0) console.log(i);
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
if (debug) {
    assert_eq(12, time(partOne));
    console.error('No test case provided for part two');
} else {
    assert_eq(210587128, time(partOne));
    assert_eq(7286, time(partTwo));
}
