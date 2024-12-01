import { read, readEx } from './util.js';
import Vec from './util/Vec.js';
import './util/bad-but-great.js';

await readEx();
await read();

/** @type string **/
let data;

const partOne = () => {
};

const partTwo = () => {
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
