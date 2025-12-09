import { read, readEx, time, debug } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

const partOne = () => {
    const boxes = data.lines().map(Vec.fromString);

    const pairs = [...boxes.choose(2)]
        .sortByKey(([l, r]) => l.distSq(r))
        .slice(0, debug ? 10 : 1000);

    let sets = [];

    for (const [a, b] of pairs) {
        let added = false;
        for (const set of sets) {
            if (set.has(a.valueOf())) {
                set.add(b.valueOf());
                added = true;
            }
            if (set.has(b.valueOf())) {
                set.add(a.valueOf());
                added = true;
            }
        }
        if (!added) {
            sets.push(new Set([a.valueOf(), b.valueOf()]));
        }
    }

    let sets2 = []
    for (const a of sets) {
        let added = false;
        for (const b of sets2) {
            if (a.intersection(b).size > 0) {
                for (const v of a) b.add(v);
                added = true;
                break;
            }
        }
        if (!added) {
            sets2.push(a);
        }
    }

    for (let i = 0; i < 10; ++i) {
        sets = [];
        for (const a of sets2) {
            let added = false;
            for (const b of sets) {
                if (a.intersection(b).size > 0) {
                    for (const v of a) b.add(v);
                    added = true;
                    break;
                }
            }
            if (!added) {
                sets.push(a);
            }
        }
        sets2 = sets;
    }

    console.log(sets.map(s => s.size).max(3).prod());
};

const partTwo = () => {
    const boxes = data.lines().map(Vec.fromString);

    const pairs = [...boxes.choose(2)]
        .sortByKey(([l, r]) => l.distSq(r));

    let sets = [];

    let i;
    for (i = 0; ; ++i) {
        const [a, b] = pairs[i];
        sets.push(new Set([a.valueOf(), b.valueOf()]))

        let sets2 = sets;
        for (;;) {
            sets = [];
            let added_one = false;
            for (const a of sets2) {
                let added = false;
                for (const b of sets) {
                    if (a.intersection(b).size > 0) {
                        a.forEach(a => b.add(a))
                        added = added_one = true;
                        break;
                    }
                }
                if (!added) {
                    sets.push(a);
                }
            }
            if (!added_one) break;
            sets2 = sets;
        }

        if (sets.length === 1 && sets[0].size === boxes.length) break;
    }
    console.log(pairs[i][0].x * pairs[i][1].x);
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
