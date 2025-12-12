import { read, readEx, time, debug, assert_eq } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';
import Grid from './util/Grid.js';

await readEx();
await read();

/** @type string **/
let data;

const partOne = () => {
    const chunks = data.trim().split('\n\n');
    const shapes = chunks.slice(0, -1).map(c => c.lines().slice(1).flatMap(s => s.split``).count('#'));
    const regions = chunks.at(-1).lines().map(r => {
        const [wl, qty] = r.split(': ');
        return {
            w: +wl.split('x')[0],
            l: +wl.split('x')[1],
            qty: qty.split(' ').map(Number)
        }
    });

    let count = 0;
    for (const { w, l, qty } of regions) {
        let a = qty.map((n, i) => n*shapes[i]).sum();
        count += (a < w*l);
    }

    console.log(count);
};

const partTwo = () => {
    console.log('TADA!');
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
