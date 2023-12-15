import { read, readEx, time } from './util.js';
import Vec from './util/Vec.js';
await import('./util/bad-but-great.js');

await readEx();
await read();

let data;

// 2:37 -- RANK 212 (So close to leaderboard!)
const partOne = () => {
    const hash = (str) => {
        let sum = 0;
        str.split``.forEach((c) => {
            sum += c.charCodeAt(0);
            sum *= 17;
            sum %= 256
        })
        return sum;
    }

    let steps = data.split(',').map(hash).sum();

    //console.log(hash('HASH'));
    console.log(steps);

};

// 20:56 -- I'm really bad at reading lmao
const partTwo = () => {
    const hash = (str) => {
        let sum = 0;
        str.split``.forEach((c) => {
            sum += c.charCodeAt(0);
            sum *= 17;
            sum %= 256
        })
        return sum;
    }

    let table = Array(256).fill(null).map(() => []);

    for (const step of data.split(',')) {
        if (step.includes('=')) {
            const [ key, val ] = step.split('=');
            let h = hash(key);
            let added = false;
            for (const i in table[h]) {
                const [ek,] = table[h][i];
                if (ek === key) {
                    table[h][i][1] = +val;
                    added = true;
                    break;
                }
            }
            if (!added) {
                table[h].push([key, +val]);
            }
        } else {
            const [ key ] = step.split('-');
            let h = hash(key);
            table[h] = table[h].filter(([k,]) => k !== key);
        }
        // console.log({ step });
        // console.log('table:');
        // for (const i in table) {
        //     const row = table[+i];
        //     if (row.length) {
        //         console.log(+i, row);
        //     }
        // }
    }

    let sum = table.map((l, i) => l.map(([, v], j) => v * (i + 1) * (j + 1)).sum()).sum();
    console.log({ sum});
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	time(partOne);
    time(partTwo);
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	time(partOne);
    time(partTwo);
}
