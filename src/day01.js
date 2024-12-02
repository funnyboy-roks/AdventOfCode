import { read, readEx } from './util.js';
import Vec from './util/Vec.js';
import './util/prototype-shenanigans.js';

await readEx();
await read();

/** @type string **/
let data;

// 01:58
const partOne = () => {
    const lines = data.lines().map(l => l.split(/\s+/).map(n => +n));
    const lmin = lines.map(a => a[0]).sort();
    const rmin = lines.map(a => a[1]).sort();
    console.log(lmin.map((n, i) => Math.abs(n - rmin[i])).sum());
};

// 03:52
const partTwo = () => {
    const lines = data.lines().map(l => l.split(/\s+/).map(n => +n));
    const lmin = lines.map(a => a[0]);
    const rmin = lines.map(a => a[1]);
    let sum = 0;
    for (const n of lmin) {
        let count = rmin.filter(r => r === n).length;
        console.error(n, count);
        sum += count * n;
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
