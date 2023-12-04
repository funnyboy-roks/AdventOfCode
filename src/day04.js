import { read, readEx } from './util.js';
import Vec from './util/Vec.js';
await import('./util/bad-but-great.js');

await readEx();
await read();

let data;

// 08:12
const partOne = () => {
    let out = 0;
    for(let line of data.lines()) {
        let number = +line.split(': ')[0].match(/\d+/)[0];
        line = line.split(': ')[1];
        let [winning, have] = line.split(' | ').map(s => s.split(/\s+/g).nums());
        console.log(winning);
        winning = new Set(winning);
        let count = 0;
        for (const num of have) {
            if (winning.has(num)) {
                ++count;
            }
        }
        console.log({ number, winning, have });
        if (count > 0) {
            out += 2 ** (count -1 );
            console.log('=>',2 ** (count - 1));
        } else {
            console.log('=>',0);
        }
    }
    console.log({ out });
};

// 18:28
const partTwo = () => {
    let copies = {};
    let out = 0;
    for(let line of data.lines()) {
        let number = +line.split(': ')[0].match(/\d+/)[0];
        if (!copies[number]) {
            copies[number] = 0;
        }
        copies[number] += 1;
        line = line.split(': ')[1];
        let [winning, have] = line.split(' | ').map(s => s.split(/\s+/g).nums());
        winning = new Set(winning);
        let count = 0;
        for (const num of have) {
            if (winning.has(num)) {
                ++count;
            }
        }
        for(; copies[number]; copies[number]--) {
            //console.log({ number, winning, have });
            out += 1;
            if (count > 0) {
                //out += 2 ** (count -1 );
                //out += count;
                //console.log('=>', count);//2 ** (count - 1));
                for (let i = 1; i <= count; ++i) {
                    copies[number + i] = copies[number + i] ? copies[number + i] + 1 : 1;
                }
                //console.log({ copies });
            }
        }
        if (copies[number] === 0) {
            delete copies[number];
        }
    }
    console.log({ out });
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	partOne();
    partTwo();
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	partOne();
    partTwo();
}
