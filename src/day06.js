import { read, readEx } from './util.js';
import Vec from './util/Vec.js';
await import('./util/bad-but-great.js');

await readEx();
await read();

let data;

// 08:53
const partOne = () => {
    let [times, dists] = data.split('\n');
    times = times.split(/:\s+/)[1].split(/\s+/).nums();
    dists = dists.split(/:\s+/)[1].split(/\s+/).nums();
    console.log({times, dists});
    console.log('hi');
    let full = 1;
    for (let ti = 0; ti < times.length; ++ti) {
        const time = times[ti];
        let count = 0;
        for (let i = 1; i < time - 1; ++i) {
            let speed = i;
            let distance = (time - i) * speed;
            if (distance > dists[ti]) {
                console.log({i, distance});
                count ++;
            }
        }
        console.log({count});
        full *= count;
    }
    console.log({ full });
};

// 14:12
const partTwo = () => {
    let [time, dist] = data.split('\n');
    time = +time.split(/:\s+/)[1].replace(/\s+/g, '');
    dist = +dist.split(/:\s+/)[1].replace(/\s+/g, '');
    console.log({time, dist});
    console.log('hi');
    let full = 1;
    let count = 0;
    for (let i = 1; i < time - 1; ++i) {
        let distance = (time - i) * i;
        if (distance > dist) {
            count ++;
        }
        if (i % 10000) {
            console.log(i, '=>', time);
        }
    }
    console.log({count});
    full *= count;
    console.log({ full });
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	//partOne();
    partTwo();
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	//partOne();
    partTwo();
}
