import { read, readEx } from './util.ts';
import './util/prototype-shenanigans.js';

await readEx();
await read();

/** @type string **/
let data;

// 00:09:29
const partOne = () => {
    const lines = data.lines().map(l => l.split(' ').nums());
    let count = 0;
    for (const l of lines) {
        let prev = l[0];
        let valid = true;
        let dir = 0;
        for (const n of l.slice(1)) {
            let delta = n - prev;
            const new_dir = delta < 0 ? -1 : 1
            if (dir === 0) {
                dir = new_dir;
            } else if (new_dir !== dir) {
                valid = false;
                break;
            }

            if (dir === 1) {
                delta *= -1;
            }

            if (delta !== -1 && delta !== -2 && delta !== -3) {
                valid = false;
                break;
            }
            prev = n
        }
        if (valid) {
            count += 1;
        }
    }
    console.log(count);
};

// 00:17:24
const partTwo = () => {
    const lines = data.lines().map(l => l.split(' ').nums());
    let count = 0;
    for (const line of lines) {
        for (let i = 0; i < line.length + 1; ++i) {
            let l;
            if (i === 0) {
                l = line;
            } else {
                l = line.slice(0, i - 1).concat(line.slice(i));
            }
            let prev = l[0];
            let valid = true;
            let dir = 0;
            for (const n of l.slice(1)) {
                let delta = n - prev;
                const new_dir = delta < 0 ? -1 : 1
                if (dir === 0) {
                    dir = new_dir;
                } else if (new_dir !== dir) {
                    valid = false;
                    break;
                }

                if (dir === 1) {
                    delta *= -1;
                }

                if (delta !== -1 && delta !== -2 && delta !== -3) {
                    valid = false;
                    break;
                }
                prev = n
            }
            if (valid) {
                count += 1;
                break;
            }
        }
    }
    console.log(count);
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
partOne();
partTwo();
