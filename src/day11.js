import { read, readEx, time, debug, assert_eq } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

// 00:12:31
const partOne = () => {
    let stones = data.split(/\s+/g);
    console.log('init', stones);

    for (let i = 0; i < 25; ++i) {
        const out = [];
        for (let s = 0; s < stones.length; ++s) {
            const stone = stones[s];
            // console.log('stone', stone);
            if (stone === '0') {
                // console.log('1');
                out.push('1');
            } else if (stone.length % 2 === 0) {
                const a = stone.substring(0, stone.length / 2).replace(/^0+/, '') || '0';
                const b = stone.substring(stone.length / 2).replace(/^0+/, '') || '0';
                // console.log('%2', {a, b});
                out.push(a);
                out.push(b);
            } else {
                // console.log('*2024');
                out.push((BigInt(stone) * 2024n).toString());
            }
        }
        // console.log(i, out);
        stones = out;
    }

    return stones.length;
};

// ~ 40x faster than pt 1 and uses _so much less_ memory
// 01:03:34
const partTwo = () => {
    const stones = data.split(/\s+/g).bigints();
    console.log('init', stones);
    
    // 0 -> 1 -> 2024 -> 20 24 -> 2 0 2 4
    // 1 -> 2024  -> 20 24 -> 2 0 2 4
    // 2 -> 4048  -> 40 48 -> 4 0 4 8
    // 3 -> 6072  -> 60 72 -> 6 0 7 2
    // 4 -> 8096  -> 80 96 -> 8 0 9 6
    // 5 -> 10120 -> 20482880 -> 2048 2880 -> ... -> 2 0 4 8 2 8 8 0
    
    const memo = [];
    const rec = (stone = 0n, depth = 75) => {
        if (depth === 0) return 1;
        if (memo[stone]?.[depth]) return memo[stone]?.[depth];
        let str;
        let ret;
        if (stone === 0n) {
            ret = rec(1n, depth - 1);
        } else if ((str = stone.toString()) && str.length % 2 === 0) {
            const exp = 10n ** (BigInt(str.length) / 2n);
            const a = stone / exp;
            const b = stone % exp;
            ret = rec(a, depth - 1) + rec(b, depth - 1);
        } else {
            ret = rec(stone * 2024n, depth - 1);
        }
        return (memo[stone] ??= [])[depth] = ret;
    };
    return stones.map(s => rec(s)).sum();
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
    assert_eq(55312, time(partOne));
    assert_eq(65601038650482, time(partTwo));
} else {
    assert_eq(194482, time(partOne));
    assert_eq(232454623677743, time(partTwo));
}
