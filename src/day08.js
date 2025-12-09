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

    // const close = new Map();

    // const N = debug ? 10 : 1000;
    // // const N = 10;

    // for (let i = 0; i < N; ++i) {
    //     console.log(i);
    //     let cmin_d = Infinity;
    //     let amin = null;
    //     let bmin = null;
    //     for (const a of boxes) {
    //         if (close.has(a.valueOf())) continue;
    //         for (const b of boxes) {
    //             if (a.equals(b)) continue;
    //             const d = a.distSq(b);
    //             if (d < cmin_d) {
    //                 if (close.get(b.valueOf())?.has(a.valueOf())) continue;
    //                 if (close.get(a.valueOf())?.has(b.valueOf())) continue;
    //                 cmin_d = d;
    //                 amin = a;
    //                 bmin = b;
    //             }
    //         }
    //     }

    //     const c = close.get(amin.valueOf());
    //     if (c) {
    //         c.add(bmin.valueOf());
    //     } else {
    //         close.set(amin.valueOf(), new Set([bmin.valueOf()]))
    //     }
    // }

    // for (const [k, vs] of close.entries()) {
    //     for (const v of vs) {
    //         const s = close.get(v);
    //         if (s) {
    //             s.add(k);
    //         } else {
    //             close.set(v, new Set([k]))
    //         }
    //     }
    // }

    // const gv = new Set();
    // const visit = (box, visited = gv) => {
    //     if (visited.has(box)) return [];
    //     visited.add(box)

    //     return [box, ...[...close.get(box) ?? []].flatMap(b => visit(b, visited))]
    // };

    // let sizes = [];
    // for (const b of boxes) {
    //     if (gv.has(b.valueOf())) continue;
    //     const size = visit(b.valueOf());
    //     sizes.push(size);
    //     // sizes.push(size);
    // }
    // console.log(sizes.sortByKey(x => x.length));
    // console.log(sizes.map(x => x.length).sorted(true));
    // 76032
    // 42840 - correct
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
