import { read, readEx, time, debug, assert_eq } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

const partOne = () => {
    let dial = 50;
    let count = 0;
    for (const l of data.lines()) {
        if (l[0] == 'L') {
            dial -= +l.substr(1)
        } else {
            dial += +l.substr(1)
        }
        dial = ((dial % 100) + 100) % 100;
        count += dial == 0;
    }
    console.log(count);
};

const partTwo = () => {
    let dial = 50;
    let count = 0;
    for (const l of data.lines()) {
        let prev = dial;
        if (l[0] == 'L') {
            let n = +l.substr(1)
            if (n > 100) {
                count += Math.floor(n / 100);
                n %= 100;
            }
            dial -= n;
        } else {
            let n = +l.substr(1)
            if (n > 100) {
                count += Math.floor(n / 100);
                n %= 100;
            }
            dial += n;
        }
        console.log(l, { prev, dial });
        if (dial >= 100) {
            count += 1;
        } else if (dial < 0 && prev != 0) {
            count += 1;
        } else if (dial == 0) {
            count += 1;
        }
        dial = ((dial % 100) + 100) % 100;
        console.log(dial, count);
    }
    console.log(count);
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
