import { read, readEx, time, debug, assert_eq, range } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

const partOne = () => {
    const points = data.lines().map(Vec.fromString);
    const area = [...points.choose(2)].map(([a,b]) => (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1)).max();

    console.log(area);
};

const partTwo = () => {
    const points = data.lines().map(Vec.fromString);

    const sizes = [...points.choose(2)]
        .map(([a,b]) => {
            const min = new Vec(Math.min(a.x, b.x), Math.min(a.y, b.y));
            const max = new Vec(min.x === a.x ? b.x : a.x, min.y === a.y ? b.y : a.y);
            return {
                min,
                max,
                area: (Math.abs(max.x - min.x) + 1) * (Math.abs(max.y - min.y) + 1)
            }
        })
        .filter((r) => {
            for (let i = 0; i < points.length; i++) {
                const a = points[i];
                const b = points[(i + 1) % points.length];

                if (
                    r.min.x < a.x && a.x < r.max.x
                    && r.min.y < a.y && a.y < r.max.y
                ) {
                    return false;
                }

                if (
                    Math.min(a.x, b.x) <= r.min.x && Math.max(a.x, b.x) >= r.max.x
                    && r.min.y < a.y && a.y < r.max.y
                    && r.min.y < b.y && b.y < r.max.y
                ) {
                    return false;
                }

                if (
                    Math.min(a.y, b.y) <= r.min.y && Math.max(a.y, b.y) >= r.max.y
                    && r.min.x < a.x && a.x < r.max.x
                    && r.min.x < b.x && b.x < r.max.x
                ) {
                    return false;
                }
            }

            return true;
        })
    ;

    console.log(sizes.map(x => x.area).max());
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
