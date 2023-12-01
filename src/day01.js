import { read, readEx } from './util.js';
import Vec from './util/Vec.js';
await import('./util/bad-but-great.js');

await readEx();
await read();

let data;

const partOne = () => {
    let d = data.lines().map(l => l.replaceAll(/\D/g, '')).map(l => l[0] + l[l.length - 1]).nums().sum();
    console.log(d);
};

const nums = [
    null,
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
];

const partTwo = () => {
    let d = data.lines().map(l => {
        let line = l.toLowerCase();
        let first;
        outer: while (true) {
            for(let i = 1; i < nums.length; ++i) {
                //console.log(line);
                if (line.startsWith(nums[i])) {
                    //console.log('replace start', nums[i]);
                    first = i;
                    line = line.replace(nums[i], '');
                    break outer;
                } else if (/\d/.test(line[0])) {
                    first = line[0];
                    break outer;
                }
            }
            line = line.substr(1);
        }
        //console.log('b');
        //console.log('line', line);
        let last;
        outer: while (true) {
            for(let i = 1; i < nums.length; ++i) {
                //console.log(line);
                //console.log('check end', nums[i]);
                if (line.endsWith(nums[i])) {
                    //console.log('replace end', nums[i]);
                    last = i;
                    line = line.replaceAll(nums[i], '');
                    break outer;
                } else if (/\d/.test(line.at(-1))) {
                    last = line.at(-1);
                    break outer;
                }
            }
            line = line.substr(0, line.length - 1);
        }
        //let ret = line.replaceAll(/\D/g, '');
        let ret = first + '' + last;
        //console.log('ret =', ret);
        return ret;
    }).nums().sum();
    console.log(d);
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	partOne();
    partTwo();
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	//partOne();
    partTwo();
}
