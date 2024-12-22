import { read, readEx, debug, time, assert_eq } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

const dirs = {
    ' ': new Vec(0, 0),
    '^': new Vec(1, 0),
    'A': new Vec(2, 0),
    '<': new Vec(0, 1),
    'v': new Vec(1, 1),
    '>': new Vec(2, 1),
};

const nums = {
    [7]: new Vec(0, 0),
    [8]: new Vec(1, 0),
    [9]: new Vec(2, 0),
    [4]: new Vec(0, 1),
    [5]: new Vec(1, 1),
    [6]: new Vec(2, 1),
    [1]: new Vec(0, 2),
    [2]: new Vec(1, 2),
    [3]: new Vec(2, 2),
    ' ': new Vec(0, 3),
    [0]: new Vec(1, 3),
    'A': new Vec(2, 3),
};

const partOne = () => {
    const f = (f, t, num) => {
        const map = num ? nums : dirs;

        const from = map[f];
        const to = map[t];
        const mv = to.sub(from);

        const x = (mv.x > 0 ? '>' : '<').repeat(Math.abs(mv.x));
        const y = (mv.y > 0 ? 'v' : '^').repeat(Math.abs(mv.y));

        const s = [];
        if (!map[' '].equals(new Vec(from.x, to.y))) s.push(`${y}${x}A`);
        if (!map[' '].equals(new Vec(to.x, from.y))) s.push(`${x}${y}A`);
        return (s.length < 2 || mv.x > 0) ? s.at(0) : s.at(-1);
    }

    const memo = {};
    const g = (code, level, num) => {
        return memo[`${code},${level}`] ??= level == 0
            ? code.length
            : `A${code}`
                .split``
                .window(2)
                .map((p) => g(f(p[0], p[1], num), level - 1, false))
                .sum()
    };

    console.log(data.lines().map(l => g(l, 3, true) * +l.replace(/[^0-9]/g, '')).sum());
};

const partTwo = () => {
    const f = (f, t, num) => {
        const map = num ? nums : dirs;

        const from = map[f];
        const to = map[t];
        const mv = to.sub(from);

        const x = (mv.x > 0 ? '>' : '<').repeat(Math.abs(mv.x));
        const y = (mv.y > 0 ? 'v' : '^').repeat(Math.abs(mv.y));

        const s = [];
        if (!map[' '].equals(new Vec(from.x, to.y))) s.push(`${y}${x}A`);
        if (!map[' '].equals(new Vec(to.x, from.y))) s.push(`${x}${y}A`);
        return (s.length < 2 || mv.x > 0) ? s.at(0) : s.at(-1);
    }

    const memo = {};
    const g = (code, level, num) => {
        return memo[`${code},${level}`] ??= level == 0
            ? code.length
            : `A${code}`
                .split``
                .window(2)
                .map((p) => g(f(p[0], p[1], num), level - 1, false))
                .sum()
    };

    console.log(data.lines().map(l => g(l, 26, true) * +l.replace(/[^0-9]/g, '')).sum());
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
