import { read, readEx } from './util.js';
import Vec from './util/Vec.js';
import './util/prototype-shenanigans.js';
/** @typedef {import('./types.d.ts')} */

await readEx();
await read();

/** @type string **/
let data;

// 00:02:50
const partOne = () => {
    const lines = data.lines();
    let sum = 0;
    for (const line of lines) {
        for (let match of line.match(/mul\((\d+),(\d+)\)/g)) {
            sum += match.substr(4, match.length - 4 - 1).split(',').nums().prod();
        }
    }
    console.log(sum);
};

// 00:08:02
const partTwo = () => {
    let sum = 0;
    const dos = data.split('do()').map(a => a.split('don\'t()')[0]);
    for (let sec of dos) {
        for (let match of sec.match(/mul\((\d+),(\d+)\)/g) ?? []) {
            sum += match.substr(4, match.length - 4 - 1).split(',').nums().prod();
        }
    }
    console.log(sum);
};

if (process.argv[2]) {
	console.log('Sample Data:');
	data = await readEx();
    console.log(data.lines().map(l => '    ' + l).join`\n`)
} else {
	console.log('Real Data');
	data = await read();
}
console.log('Output:');
partOne();
partTwo();
