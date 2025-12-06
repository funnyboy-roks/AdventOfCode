import { read, readEx, time, debug, assert_eq } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

const partOne = () => {
    const lines = data.lines().map(l => l.trim().split(/\s+/));
    const nums = lines.slice(0, -1).map(l => l.bigints());
    const ops = lines.at(-1);

    let sum = 0n;
    for (let i = 0; i < ops.length; ++i) {
        let out = ops[i] === '*' ? 1n : 0n;
        for (let r of nums) {
            const n = r[i];
            if (ops[i] == '*') {
                out *= n;
            } else {

                out += n;
            }
        }
        sum += out;
    }
    console.log({sum});

};

const partTwo = () => {
    const linesr = data.lines();
    const lines = linesr.slice(0, -1);
    const ops = linesr.at(-1);

    let sum = 0n;
    for (let i = 0; i < ops.length; ++i) {
        if (ops[i] == ' ') continue;
        const op = ops[i];

        const nums = []
        while (true) {
            const num = lines.map(n => n[i]).join``.trim();
            if (num === '') break;
            nums.push(BigInt(num));
            i += 1;
        }

        let out = op == '*' ? nums.prod(1n) : nums.sum(0n);
        sum += out;
    }
    console.log({sum});

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
