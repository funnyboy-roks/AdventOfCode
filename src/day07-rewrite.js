import { read, readEx, debug, time, assert_eq } from './util.ts';
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
    const lines = data.lines().map(l => l.split(': ')).map(([l,r]) => [+l, r.split(' ').nums()]);
    console.debug(lines);
    for (const [t, l] of lines) {
        console.debug(`f(${l}): ${t} =`, f(l, t))
    }
    const ret = lines.filter(([t, l]) => f(l, t).includes(t))
        .map(l => l[0])
        .sum()
    return ret;
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
            const y = 10 ** v.digits() * n + v;
            return y <= target ? y : undefined;
        });
        return mult.concat(sum).concat(concat);
    }
};

// ~100x faster than original
const partTwo = () => {
    const lines = data.lines().map(l => l.split(': ')).map(([l,r]) => [+l, r.split(' ').nums()]);
    console.debug(lines);
    const ret = lines.filter(([t, l]) => f2(l, t).includes(t))
        .map(l => l[0])
        .sum()
    return ret;
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
if (debug) {
    assert_eq(3749, time(partOne));
    assert_eq(11387, time(partTwo));
} else {
    assert_eq(3312271365652, time(partOne));
    assert_eq(509463489296712, time(partTwo));
}
