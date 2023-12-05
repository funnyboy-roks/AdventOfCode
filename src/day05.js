import { read, readEx } from './util.js';
import Vec from './util/Vec.js';
await import('./util/bad-but-great.js');

await readEx();
await read();

let data;

// 23:30
const partOne = () => {
    let lines = data.lines().filter(l => l);
    let seeds = lines.splice(0, 1)[0].split(': ')[1].split(' ').nums();
    console.log(seeds);
    const maps = {};
    let curr;
    for (const line of lines) {
        if (line.endsWith(':')) {
            curr = line.split(' map')[0];
            console.log(curr);
            maps[curr] = [];
        } else {
            let [s, d, l] = line.split(' ').nums();
            maps[curr].push([s, d, l]); // s..s + l, d..d + l
            console.log(line, '=>', maps[curr]);
        }
    }
    console.log(maps);
    const get = (map, key) => {
        for (const [s, d, l] of map) {
            if (key >= d && key < d + l) {
                return s + key - d;
            }
        }
        return key;
    };
    const seedToLoc = {};
    for (const seed of seeds) {

        let soil = get(maps['seed-to-soil'], seed);
        let fert = get(maps['soil-to-fertilizer'], soil);
        let wate = get(maps['fertilizer-to-water'], fert);
        let ligh = get(maps['water-to-light'], wate);
        let temp = get(maps['light-to-temperature'], ligh);
        let humi = get(maps['temperature-to-humidity'], temp);
        seedToLoc[seed] = get(maps['humidity-to-location'], humi);
    }
    console.log(seedToLoc);
    console.log(Object.values(seedToLoc).min());
};

// We're not gonna talk about that timing...
const partTwo = () => {
    let lines = data.lines().filter(l => l);
    let seeds = lines.splice(0, 1)[0].split(': ')[1].split(' ').nums();
    console.log(seeds);
    const maps = {};
    let curr;
    for (const line of lines) {
        if (line.endsWith(':')) {
            curr = line.split(' map')[0];
            console.log(curr);
            maps[curr] = [];
        } else {
            let [s, d, l] = line.split(' ').nums();
            maps[curr].push([s, d, l]); // s..s + l, d..d + l
            console.log(line, '=>', maps[curr]);
        }
    }
    console.log(maps);
    const get = (map, key) => {
        for (const [s, d, l] of map) {
            if (key >= d && key < d + l) {
                return s + key - d;
            }
        }
        return key;
    };
    let min = Infinity;
    for (let i = 0; i < seeds.length; i += 2) {
        let low = seeds[i];
        let high = seeds[i] + seeds[i + 1];
        console.log('seeds:', [low, high], 'delta:', high - low);
        for (let seed = low; seed < high; ++seed) {
            let soil = get(maps['seed-to-soil'], seed);
            let fert = get(maps['soil-to-fertilizer'], soil);
            let wate = get(maps['fertilizer-to-water'], fert);
            let ligh = get(maps['water-to-light'], wate);
            let temp = get(maps['light-to-temperature'], ligh);
            let humi = get(maps['temperature-to-humidity'], temp);
            let loc = get(maps['humidity-to-location'], humi);
            if (loc < min) min = loc;
        }
    }
    console.log(min);
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
