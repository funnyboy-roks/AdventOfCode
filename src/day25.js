import { read, readEx, time, debug, assert_eq } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

const partOne = () => {
    const groups = data.lines().split('').map(g => ({
        kind: g[0][0] === '.' ? 'key' : 'lock',
        g,
        heights: (() => {
            const out = [];
            for (let x = 0; x < g[0].length; ++x) {
                let n = 0;
                for (let y = 0; y < g.length; ++y) {
                    if (g[y][x] === '#')
                        n += 1;
                }
                out.push(n - 1);
            }
            return out;
        })()
    }));
    const keys = groups.filter(g => g.kind === 'key');
    const locks = groups.filter(g => g.kind === 'lock');
    console.log({ keys, locks });

    const matches = (key, lock) => {
        for (let y = 0; y < key.g.length; ++y) {
            const kr = key.g[y];
            const lr = lock.g[y];
            for (let x = 0; x < kr.length; ++x) {
                if (kr[x] === '#' && lr[x] === '#') return false;
            }
        }
        return true;
    };

    let count = 0;
    for (const key of keys) {
        for (const lock of locks) {
            if (matches(key, lock)) {
                count += 1;
                console.log({ key: {...key, g: undefined}, lock: {...lock, g: undefined} });
            }
        }
    }
    console.log(count);
};

const partTwo = () => {
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
