import { read, readEx } from './util.js';
import Vec from './util/Vec.js';
import './util/prototype-shenanigans.js';

await readEx();
await read();

/** @type string **/
let data;

// 00:15:21
const partOne = () => {
    let lines = data.lines();
    let count = 0;
    count += lines.map(l => l.match(/XMAS/g)?.length ?? 0).sum();
    count += lines.map(l => l.match(/SAMX/g)?.length ?? 0).sum();

    console.log('horiz', count);

    for (let y = 0; y < lines.length; ++y) {
        const line = lines[y];
        for (let x = 0; x < line.length; ++x) {
            const c = line[x];
            if (c === 'X') {
                if (lines[y + 1]?.[x] === 'M') {
                    if (lines[y + 2]?.[x] === 'A' && lines[y + 3]?.[x] === 'S') {
                        count += 1;
                    }
                }
                if (lines[y - 1]?.[x] === 'M') {
                    if (lines[y - 2]?.[x] === 'A' && lines[y - 3]?.[x] === 'S') {
                        count += 1;
                    }
                }
                if (lines[y + 1]?.[x + 1] === 'M') {
                    if (lines[y + 2]?.[x + 2] === 'A' && lines[y + 3]?.[x + 3] === 'S') {
                        count += 1;
                    }
                }
                if (lines[y - 1]?.[x + 1] === 'M') {
                    if (lines[y - 2]?.[x + 2] === 'A' && lines[y - 3]?.[x + 3] === 'S') {
                        count += 1;
                    }
                }
                if (lines[y + 1]?.[x - 1] === 'M') {
                    if (lines[y + 2]?.[x - 2] === 'A' && lines[y + 3]?.[x - 3] === 'S') {
                        count += 1;
                    }
                }
                if (lines[y - 1]?.[x - 1] === 'M') {
                    if (lines[y - 2]?.[x - 2] === 'A' && lines[y - 3]?.[x - 3] === 'S') {
                        count += 1;
                    }
                }
            }
        }
    }
    console.log(count);
    // console.log(lines.join`\n`);
};

// 00:47:59
const partTwo = () => {
    const width = data.lines()[0].length;
    let lines = data.lines().join('-');
    const re = new RegExp(
        `(M.M.{${width - 3 + 1}}.A.{${width - 3 + 1}}.S.S)|` +
        `(S.M.{${width - 3 + 1}}.A.{${width - 3 + 1}}.S.M)|` +
        `(M.S.{${width - 3 + 1}}.A.{${width - 3 + 1}}.M.S)|` +
        `(S.S.{${width - 3 + 1}}.A.{${width - 3 + 1}}.M.M)`,
        'g',
    );

    let count = 0;
    console.log(re);

    let m;

    while (m = re.exec(lines)) {
        count += 1;
        re.lastIndex = m.index + 1;
        // console.log(m.index, m[0].split``.map((c, i) => keep.includes(i) ? c : '.').join``);
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
