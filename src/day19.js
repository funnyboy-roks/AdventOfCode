import { read, readEx, time, debug, assert_eq } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

// 00:17:17 -- for someone who loves RegExp, I'm quite slow at actually figuring out when it's the correct solution
const partOne = () => {
    const [[_patterns], designs] = data.lines().split('');
    let patterns = _patterns.split(', ').sort();
    console.log({ patterns, designs });

    const reg = new RegExp(`^(${patterns.join('|')})+$`);

    console.log(designs.filter(d => reg.test(d)).length);
};

// 00:23:53
const partTwo = () => {
    const [[_patterns], designs] = data.lines().split('');
    let patterns = _patterns.split(', ').sort();
    console.log({ patterns, designs });

    const reg = new RegExp(`^(${patterns.join('|')})+$`);

    console.log(designs.filter(d => reg.test(d)).length);

    const memo = {};

    const rec = (rest) => {
        if (memo[rest]) return memo[rest];
        if (rest.length === 0) return 1;
        let matches = 0;
        for (const pattern of patterns) {
            if (rest.startsWith(pattern)) {
                matches += rec(rest.substring(pattern.length));
            }
        }
        if (!matches) return memo[rest] = 0;
        return memo[rest] = matches;
    };
    let sum = 0;
    for (const design of designs) {
        const r = rec(design);
        sum += r;
        console.log('rec', { design }, r);
    }
    console.log(sum);
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
