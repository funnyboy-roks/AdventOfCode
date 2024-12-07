import { read, readEx, debug } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

/** @type (e: number[]) => number[] */
const f = (e) => {
    if (e.length === 1) {
        return [e[0]];
    } else {
        const F = f(e.slice(0, -1))
        return F.map(n => n * e.at(-1)).concat(F.map(n => n + e.at(-1)));
    }
};

const partOne = () => {
    const lines = data.lines().map(l => l.split(': ')).map(([l,r]) => [BigInt(l), r.split(' ').map(BigInt)]);
    console.debug(lines);
    for (const [t, l] of lines) {
        console.debug(`f(${l}): ${t} =`, f(l))
    }
    const ret = lines.filter(([t, l]) => f(l).includes(t))
        .map(l => l[0])
        .reduce((a, b) => a + b, 0n)
    console.log(ret);
};

const f2 = (e) => {
    if (e.length === 1) {
        return [e[0]];
    } else {
        const v = e.at(-1);
        const slice = e.slice(0, -1);
        const F = f2(slice);
        // console.log('F = f(', slice, ') =', F);
        // console.log('v =', v);
        const mult = F.map(n => v * n);
        const sum = F.map(n => v + n);
        const concat = F.map(n => BigInt(n.toString() + v.toString()));
        // console.log({ mult, sum, concat });
        return mult.concat(sum).concat(concat);
    }
};

// ~24x faster than original
const partTwo = () => {
    const lines = data.lines().map(l => l.split(': ')).map(([l,r]) => [BigInt(l), r.split(' ').map(BigInt)]);
    console.log(lines);
    // const test = lines.find(l => l[0] === 192n);
    // console.log(test);
    // for (const [t, l] of [test]) {
    //     console.log(`f(${l}): ${t} =`, f2(l))
    // }
    const ret = lines.filter(([t, l]) => f2(l).includes(t))
        .map(l => l[0])
        .reduce((a, b) => a + b, 0n)
    console.log(ret);
};

if (debug) {
	console.log('Sample Data:');
	data = await readEx();
    console.log(data.lines().map(l => '    ' + l).join`\n`);
} else {
	console.log('Real Data');
	data = await read();
}
console.log('Output:');
partOne();
partTwo();
