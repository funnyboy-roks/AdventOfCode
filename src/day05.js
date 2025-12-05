import { read, readEx, time, debug, assert_eq } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

// 02:25
const partOne = () => {
    const [rangesr, itemsr] = data.lines().split('');
    let ranges = rangesr.map(r => r.split`-`.map(Number));
    const items = itemsr.map(Number);
    let count = 0;
    for (const i of items) {
        for (const [l, h] of ranges) {
            if (l <= i && i <= h) {
                count += 1;
                break;
            }
        }
    }
    console.log(count);
};

// 26:31
const partTwo = () => {
    const [rangesr, _] = data.lines().split('');
    let out = rangesr.map(r => r.split`-`.map(Number));
    let count = 0;
    out.sort(([a], [b]) => a - b);

    for (let i = 1; i < out.length; ++i) {
        let [al, ah] = out[i - 1];
        let [bl, bh] = out[i];

        if (bl <= ah) {
            //     lbbbbbh
            //  laaaaaah
            out.splice(i, 1);
            i -= 1;
            out[i][0] = Math.min(bl, al);
            out[i][1] = Math.max(ah, bh);
        }
    }

    console.log(out.map(([a, b]) => b - a + 1).sum());
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
