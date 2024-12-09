import { assert_eq, read, readEx, time } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

// 00:14:02
const partOne = () => {
    let d = data.split``.nums();
    if (d.length % 2 === 0) {
        d = d.slice(0, -1);
    }
    console.debug(d);
    let out = [];
    let x = 0;
    d.forEach((n, i) => {
        if (i % 2 === 0) {
            out.push(...[x].repeat(n));
            x += 1;
        } else {
            out.push(...[null].repeat(n));
        }
    });

    while (true) {
        let open = out.findIndex(n => n === null);
        let end = out.findLastIndex(n => n !== null);
        if (open < end) {
            let t = out[end];
            out[end] = out[open];
            out[open] = t;
        } else {
            break;
        }
    }

    console.debug(d);
    console.debug(out);
    console.log(out.map((n, i) => n === null ? 0 : n * i).sum());
};

// 01:19:49
// I'm so fucking pissed off about this... I messed up pasting my answer 3 times and ended up having to wait like 15 extra minutes >:(
const partTwo = () => {
    let d = data.split``.nums();
    if (d.length % 2 === 0) {
        d = d.slice(0, -1);
    }
    console.debug(d);
    let out = [];
    let x = 0;
    d.forEach((n, i) => {
        if (i % 2 === 0) {
            out.push(...[x].repeat(n));
            x += 1;
        } else {
            out.push(...[null].repeat(n));
        }
    });

    const find_chunk = (arr, size) =>  {
        let offset = 0;
        while (true) {
            let i = arr.slice(offset).findIndex((n) => n === null);
            if (i === -1) return -1;
            i += offset;
            if (arr.length < i + size) return -1;
            // console.debug({ i, offset });
            const nnull = arr.slice(i, i + size).findIndex(n => n !== null);
            // console.debug({nnull});
            if (nnull !== -1) {
                offset = i + nnull;
            } else {
                return i;
            }
        }
    }

    const max = out.max();

    // let curr = -1;
    // let end = out.length;
    // while (true) {
    //     console.debug('--------------------------------------------------')
    //     console.debug({ out });
    //     if (curr === -1) {
    //         curr = out.findLastIndex(n => n !== null);
    //     }
    //     end = out.slice(0, end).findLastIndex(n => n !== curr && n !== null);
    //     curr = out[end];
    //     let len = end - out.slice(0, end).findLastIndex(n => n !== curr);
    //     let open = find_chunk(out.slice(0, end), len);
    //     if (open == -1) continue;
    //     console.debug({ len, curr, out, open });
    //     if (open < end) {
    //         for (let i = 0; i < len; ++i) { 
    //             out[open + i] = curr;
    //             out[end - i] = null;
    //         }
    //     } else {
    //         break;
    //     }
    //     console.debug('--------------------------------------------------')
    // }
    console.debug(out);
    for (let i = max; i >= 0; --i) {
        // console.log(i);
        const start = out.findIndex(n => n === i);
        const end = out.findLastIndex(n => n === i) + 1;
        const len = end - start;
        const chunk = find_chunk(out.slice(0, start), len);
        // console.debug({ start, end, slice: out.slice(start, end), chunk });
        if (chunk === -1) continue;

        for (let j = 0; j < len; ++j) { 
            out[chunk + j] = i;
            out[start + j] = null;
        }
        if (i % 100) console.log(i);
    }

    console.debug(out);
    console.log(out.map((n, i) => n === null ? 0 : n * i).sum());
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
time(partTwo2);
