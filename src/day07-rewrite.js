import { read, readEx, debug, time } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

/** @type (e: number[]) => number[] */
const f = (e, target) => {
    if (e.length === 1) {
        return [e[0]];
    } else {
        const F = f(e.slice(0, -1), target)
        return F.filter_map(n => {
                const y = n * e.at(-1);
                return y <= target ? y : undefined;
            })
            .concat(F.filter_map(n => {
                const y = n + e.at(-1);
                return y <= target ? y : undefined;
            }));
    }
};

const partOne = () => {
    const lines = data.lines().map(l => l.split(': ')).map(([l,r]) => [BigInt(l), r.split(' ').map(BigInt)]);
    console.debug(lines);
    for (const [t, l] of lines) {
        console.debug(`f(${l}): ${t} =`, f(l, t))
    }
    const ret = lines.filter(([t, l]) => f(l, t).includes(t))
        .map(l => l[0])
        .sum(0n)
    console.log(ret);
};

const f2 = (e, target) => {
    if (e.length === 1) {
        return [e[0]];
    } else {
        const v = e.at(-1);
        const slice = e.slice(0, -1);
        const F = f2(slice, target);
        console.debug('F = f(', slice, ') =', F);
        const mult = F.filter_map(n => {
            const y = n * v;
            return y <= target ? y : undefined;
        });
        const sum = F.filter_map(n => {
            const y = n + v;
            return y <= target ? y : undefined;
        });
        const concat = F.filter_map(n => {
            const y = BigInt(n.toString() + v.toString());
            return y <= target ? y : undefined;
        });
        return mult.concat(sum).concat(concat);
    }
};

// ~40x faster than original
const partTwo = () => {
    const lines = data.lines().map(l => l.split(': ')).map(([l,r]) => [BigInt(l), r.split(' ').map(BigInt)]);
    console.log(lines);
    // const test = lines.find(l => l[0] === 192n);
    // console.log(test);
    // for (const [t, l] of [test]) {
    //     console.log(`f(${l}): ${t} =`, f2(l))
    // }
    const ret = lines.filter(([t, l]) => f2(l, t).includes(t))
        .map(l => l[0])
        .sum(0n)
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
time(partOne);
time(partTwo);
