import { read, readEx } from './util.js';
import Vec from './util/Vec.js';
await import('./util/bad-but-great.js');

await readEx();
await read();

let data;

// 10:03
const partOne = () => {
    let ids = 0;
    for (const line of data.lines()) {
        const [left, right] = line.split(': ');
        const game_id = +left.match(/\d+/)[0];
        const sets = right.split('; ').map(s => s.split(', '));
        const cubes = {
            red: 0,
            green: 0,
            blue: 0,
        };
        for (let set of sets) {
            for (const count of set) {
                const n = +count.split` `[0];
                const c = count.split` `[1];
                cubes[c] = Math.max(cubes[c], n);
            }
        }
        console.log({ game_id, sets });
        console.log(cubes);
        if (cubes.red <= 12 && cubes.green <= 13 && cubes.blue <= 14) {
            console.log(game_id);
            ids += game_id;
        }
    }
    console.log({ids});
};

// 11:54
const partTwo = () => {
    let ids = 0;
    for (const line of data.lines()) {
        const [left, right] = line.split(': ');
        const game_id = +left.match(/\d+/)[0];
        const sets = right.split('; ').map(s => s.split(', '));
        const cubes = {
            red: 0,
            green: 0,
            blue: 0,
        };
        for (let set of sets) {
            for (const count of set) {
                const n = +count.split` `[0];
                const c = count.split` `[1];
                cubes[c] = Math.max(cubes[c], n);
            }
        }
        console.log({ game_id, sets });
        console.log(cubes);
        let p = cubes.red * cubes.blue * cubes.green;
        console.log(p);
        ids += p;
    }
    console.log({ids});
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
