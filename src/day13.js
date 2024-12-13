import { read, readEx, time, debug } from './util.ts';
import Vec from './util/Vec.ts';
import * as mathjs from 'npm:mathjs'
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

// 00:40:21
const partOne = () => {
    const line = data.lines().split('').map(([a,b,p]) => {
        const [ax, ay] = a.match(/[+-]\d+/g);
        const [bx, by] = b.match(/[+-]\d+/g);
        const [, px, py] = p.match(/^Prize: X=(\d+), Y=(\d+)/);
        return { a: new Vec(+ax, +ay), b: new Vec(+bx, +by), prize: new Vec (+px, +py), };
    });
    let sum = 0;
    for (const { a, b, prize } of line) {
        for (let i = 0; i < 100; ++i) {
            if (i * a.x > prize.x || i * a.y > prize.y) break;
            for (let j = 0; j < 100; ++j) {
                const pos = new Vec(i * a.x + j * b.x, i * a.y + j * b.y);
                if (!pos.equals(prize)) continue;
                console.log({i, j, pos, cost: i * 1 + j * 3});
                sum += i * 3 + j * 1;
            }
        }
    }
    console.log(sum);
};

// 01:31:56
const partTwo = () => {
    const line = data.lines().split('').map(([a,b,p]) => {
        const [ax, ay] = a.match(/[+-]\d+/g);
        const [bx, by] = b.match(/[+-]\d+/g);
        const [, px, py] = p.match(/^Prize: X=(\d+), Y=(\d+)/);
        return { a: new Vec(+ax, +ay), b: new Vec(+bx, +by), prize: new Vec (+px + 10000000000000, +py + 10000000000000), };
        // return { a: new Vec(+ax, +ay), b: new Vec(+bx, +by), prize: new Vec (+px, +py), };
    });
    console.log(line);
    let sum = 0;
    for (const { a, b, prize } of line) {
        const [[n], [m]] = mathjs.lusolve(
            [
                [a.x, b.x],
                [a.y, b.y],
            ],
            [prize.x, prize.y]
        );
        const round_2 = (n) => Math.round(n * 100) / 100;
        const [rn, rm] = [n, m].map(round_2);
        if (rn % 1 === 0 && rm % 1 === 0) {
            console.log([rn, rm]);
            sum += rn * 3 + rm * 1;
        }
    }
    console.log(sum);
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
