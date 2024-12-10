import { read, readEx, time, debug, assert_eq } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

const partOne = () => {
    const grid = data.lines().map(l => l.split``.nums());

    const heads = [];
    for (let y = 0; y < grid.length; ++y) {
        const row = grid[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] === 0) heads.push(new Vec(x, y));
        }
    }

    const at = v => grid[v.y]?.[v.x];

    const rec = (p = Vec.ZERO) => {
        const curr = at(p);
        if (curr === undefined) return [];
        if (curr === 9) return [p];
        let check = p.add(Vec.UP);
        const ends = []
        const add = (v) => v ? ends.push(...v) : 0;
        if (at(check) === curr + 1) add(rec(check));
        check = p.add(Vec.RIGHT);
        if (at(check) === curr + 1) add(rec(check));
        check = p.add(Vec.DOWN);
        if (at(check) === curr + 1) add(rec(check));
        check = p.add(Vec.LEFT);
        if (at(check) === curr + 1) add(rec(check));
        const unique = [];
        for (const e of ends) {
            if (!unique.find(v => v.x === e.x && v.y === e.y)) {
                unique.push(e);
            }
        }
        return unique;
    };
    return heads.flatMap(rec).length;
};

const partTwo = () => {
    const grid = data.lines().map(l => l.split``.nums());

    const heads = [];
    for (let y = 0; y < grid.length; ++y) {
        const row = grid[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] === 0) heads.push(new Vec(x, y));
        }
    }

    const at = v => grid[v.y]?.[v.x];

    const rec = (p = Vec.ZERO, curr_path = '') => {
        const curr = at(p);
        curr_path += ':' + p;
        if (curr === undefined) return [];
        if (curr === 9) return [curr_path];
        let check = p.add(Vec.UP);
        const paths = []
        const add = (v) => v ? paths.push(...v) : 0;
        if (at(check) === curr + 1) add(rec(check, curr_path));
        check = p.add(Vec.RIGHT);
        if (at(check) === curr + 1) add(rec(check, curr_path));
        check = p.add(Vec.DOWN);
        if (at(check) === curr + 1) add(rec(check, curr_path));
        check = p.add(Vec.LEFT);
        if (at(check) === curr + 1) add(rec(check, curr_path));
        return paths.unique();
    };
    console.debug(heads);
    console.debug(heads.map(h => rec(h, '')));
    return heads.flatMap(h => rec(h, '')).length;
};

if (debug) {
	console.log('Sample Data:');
	data = await readEx();
    console.log(data.lines().map(l => '    ' + l).join`\n`)
} else {
	console.log('Real Data');
	data = await read();
}
console.log('Output:');
if (debug) {
    assert_eq(36, time(partOne));
    assert_eq(81, time(partTwo));
} else {
    assert_eq(733, time(partOne));
    assert_eq(1514, time(partTwo));
}
