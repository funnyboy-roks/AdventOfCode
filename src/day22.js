import { read, readEx, time, debug } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

// 00:13:25
const partOne = () => {
    const lines = data.lines().bigints();

    const step = secret => {
        secret = (secret ^ (secret * 64n)) % 16777216n;
        secret = (secret ^ (secret / 32n)) % 16777216n;
        secret = (secret ^ (secret * 2048n)) % 16777216n;
        return secret;
    };

    let sum = 0n;
    for (const line of lines) {
        let secret = line;
        for (let i = 0; i < 2000; ++i) {
            secret = step(secret);
        }
        console.log(secret);
        sum += secret;
    }
    console.log({ sum });
};

// 00:49:00 -- lmfao-  my solution was slow, so I just tried the last printed number and it worked :D
const partTwo = () => {
    const lines = data.lines().bigints();

    const step = secret => {
        secret = (secret ^ (secret * 64n)) % 16777216n;
        secret = (secret ^ (secret / 32n)) % 16777216n;
        secret = (secret ^ (secret * 2048n)) % 16777216n;
        return secret;
    };

    const deltas = [];
    const prices = [];
    for (const line of lines) {
        let secret = line;
        const delta = [];
        const price = [];
        for (let i = 0; i < 2000; ++i) {
            const next = step(secret);
            price.push(Number(next % 10n));
            delta.push(Number(next % 10n) - Number(secret % 10n));
            secret = next;
        }
        prices.push(price);
        deltas.push(delta);
    }
    console.log(deltas);
    console.log(prices);
    const arr_eq = (a, b) => a.length === b.length && a.every((a, i) => a === b[i]);

    let max = 0;
    for (const delta of deltas) {
        // wind:
        for (let j = 0; j < delta.length - 5; ++j) {
            // const [dwin, pwin] of delta.window(5).zip(price.window(5))
            const dwin = delta.slice(j, j + 4);
            // if (dwin.slice(0, -1).sum() !== 0) continue;
            // console.log(pwin.at(-1));
            let sum = 0;
            // console.log('checking', dwin, pwin);
            innerouter: for (let j = 0; j < deltas.length; ++j) {
                const idelta = deltas[j];
                const iprice = prices[j];
                for (let i = 0; i < idelta.length - 5; ++i) {
                    const idwin = idelta.slice(i, i + 4);
                    if (arr_eq(idwin, dwin)) {
                        sum += iprice.at(i + 3);
                        continue innerouter;
                    }
                }
            }
            if (sum > max) {
                console.log('new max', sum, dwin);
                max = sum;
            }
        }
    }
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
