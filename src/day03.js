import { read, readEx, time, debug, assert_eq } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

// 00:03:45
const partOne = () => {
    let banks = data.lines().map(l => l.split``.map(Number))
    let sum = 0;
    for(const b of banks) {
        let max = 0;
        for (let i = 0; i < b.length; ++i) {
            for (let j = i + 1; j < b.length; ++j) {
                let n = b[i] * 10 + b[j] ;
                if (n > max) {
                    max = n;
                }
            }
        }
        console.log('max', max);
        sum += max;
    }
    console.log(sum);
};

// 00:47:26
const partTwo = () => {
    let banks = data.lines().map(l => l.split``.map(BigInt))
    let sum = 0n;
    for (const [k, b] of banks.entries()) {
        // let max = 0n;
        // let chars = b.split``.sorted().slice(0, b.length - 12);
        // console.log({ chars });
        // let out = BigInt(b.split``.filter(c => {
        //     let idx = chars.indexOf(c);
        //     if (idx < 0) return true;
        //     chars.splice(idx, 1);
        //     return false;
        // }).join``);
        // console.log(out);
        // sum += out;

        // sum += b.split``.choose(12).map(c => BigInt(c.join``)).reduce((a, b) => a < b ? b : a, 0n);

        // let max = 0n;
        // for (const n of b.choose(12)) {
        //     let m = BigInt(n.join``);
        //     if (m > max) max = m
        // }
        // sum += max;
        
        // while (b.length > 12) {
        //     let idx = b.indexOf(b.sorted()[0]);
        //     b.splice(idx, 1);
        // }
        // console.log(b);

        let max = 0n;
        for (let i = 0; i < b.length; ++i) {
            for (let j0 = i + 1; j0 < b.length; ++j0) {
                let ab = b[i]*100_000_000_000n + b[j0]*10_000_000_000n;
                if (ab < max) continue;
            for (let j1 = j0 + 1; j1 < b.length; ++j1) {
            for (let j2 = j1 + 1; j2 < b.length; ++j2) {
                let j2s = ab + b[j1]*1_000_000_000n + b[j2]*100_000_000n;
                if (j2s < max) continue;
            for (let j3 = j2 + 1; j3 < b.length; ++j3) {
            for (let j4 = j3 + 1; j4 < b.length; ++j4) {
                let j4s = j2s + b[j3]*10_000_000n + b[j4]*1_000_000n;
                if (j4s < max) continue;
            for (let j5 = j4 + 1; j5 < b.length; ++j5) {
            for (let j6 = j5 + 1; j6 < b.length; ++j6) {
                let j6s = j4s + b[j5]*100_000n + b[j6]*10_000n;
                if (j6s < max) continue;
            for (let j7 = j6 + 1; j7 < b.length; ++j7) {
            for (let j8 = j7 + 1; j8 < b.length; ++j8) {
                let j8s = j6s + b[j7]*1000n + b[j8]*100n;
                if (j8s < max) continue;
            for (let j9 = j8 + 1; j9 < b.length; ++j9) {
            for (let ja = j9 + 1; ja < b.length; ++ja) {
                let n = j8s + b[j9]*10n + b[ja];
                if (n > max) {
                    max = n;
            }}}}}}}}}}}}
            // console.log({ i, k });
        }
        console.log({ max, k });
        sum += max;
    }
    console.log('sum: ' + sum);
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
