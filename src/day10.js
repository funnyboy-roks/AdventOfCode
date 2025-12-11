import { read, readEx, time, debug, assert_eq } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';
import highs from 'npm:highs';

await readEx();
await read();

/** @type string **/
let data;

const with_index = (array, index, value) => array.map((v, i) => i === index ? value : v);

const partOne = () => {
    const lines = data.lines().map(l => {
        const [lights, buttons, joltage] = l.split(/] | {/g);
        return {
            lights: lights.substr(1),
            buttons: buttons.split(' ').map(b => b.slice(1, -1).split(',').map(Number)),
            joltage: joltage.slice(0, -1).split(',').map(Number)
        };
    });

    console.log(lines);

    let sum = 0;
    for (const { lights, buttons } of lines) {
        let min = Infinity
        for (let i = 0; i < 2**buttons.length; ++i) {
            let l = Array.from({ length: lights.length }, () => 0);
            let n = 0;
            for (let j = 0; j < buttons.length; ++j) {
                let set = (i >> j) & 1;
                buttons[j].map(n => l[n] += set);
                n += set;
            }
            l = l.map(v => v % 2 ? '#' : '.').join``
            if (l === lights) {
                if (n < min) min = n;
            }
        }
        sum += min;
    }
    console.log({ sum });
};

const f = await highs();

const partTwo = () => {
    const lines = data.lines().map(l => {
        const [lights, buttons, joltage] = l.split(/] | {/g);
        return {
            lights: lights.substr(1),
            buttons: buttons.split(' ').map(b => b.slice(1, -1).split(',').map(Number)),
            joltage: joltage.slice(0, -1).split(',').map(Number)
        };
    });

    let sum = 0;
    for (const { buttons, joltage } of lines) {
        const c = buttons.map(() => 1)
        const A = joltage.map((j, i) => {
            return ` c${i}: ${buttons.map((b, j) => [b.includes(i), `b${j}`]).filter(([a, b], i) => a).map(([a,b]) => b).unique().join(' + ')} = ${j}`
        }).join(`\n`);
        const problem = `
            Minimize
                obj: ${buttons.map((_, i) => `b${i}`).join(' + ')}
                Subject To
                ${A}
                Bounds
                General
                ${buttons.map((b, i) => `b${i}`).join` `}
            End`;
        sum += f.solve(problem).ObjectiveValue;
    }

    console.log({ sum });
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
