import { read, readEx } from './util.js';
import Vec from './util/Vec.js';
import './util/prototype-shenanigans.js';
/** @typedef {import('./types.d.ts')} */

await readEx();
await read();

/** @type string **/
let data;

const partOne = () => {
    let [rules, updates] = data.lines().split('');
    rules = rules.map(r => r.split('|').nums());
    updates = updates.map(u => u.split`,`.nums())

    // console.log({rules});
    let count = 0;
    for (const update of updates) {
        // console.log({update});
        let valid = true;
        for (const [a, b] of rules) {
            if (update.includes(a) && update.includes(b)) {
                const ai = update.indexOf(a);
                const bi = update.indexOf(b);
                if (ai >= bi) {
                    valid = false;
                    break;
                }
            }
        }
        if (valid) {
            count += update[Math.floor(update.length / 2)];
        }
    }
    console.log(count);
};

const partTwo = () => {
    let [rules, updates] = data.lines().split('');
    rules = rules.map(r => r.split('|').nums());
    updates = updates.map(u => u.split`,`.nums())

    // console.log({rules});
    let count = 0;
    for (const update of updates) {
        // console.log({update});
        let valid = true;
        for (const [a, b] of rules) {
            if (update.includes(a) && update.includes(b)) {
                const ai = update.indexOf(a);
                const bi = update.indexOf(b);
                if (ai >= bi) {
                    valid = false;
                    break;
                }
            }
        }
        // While the efficiency is bad, I'm very happy that I came up with this idea
        const order = (a, b) => {
            if (rules.find(([x, y]) => x === a && y === b)) {
                return -1;
            } else if (rules.find(([y, x]) => x === a && y === b)) {
                return 1;
            }
            return 0;
        };
        if (!valid) {
            // console.log('->', update.sort(order));
            count += update.sort(order)[Math.floor(update.length / 2)];
        }
    }
    console.log(count);

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
