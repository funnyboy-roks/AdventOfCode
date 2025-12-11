import { read, readEx, time, debug, assert_eq } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';
import jsnx from 'npm:jsnetworkx'

await readEx();
await read();

/** @type string **/
let data;

const partOne = () => {
    const graph = Object.fromEntries(data.lines().map(l => {
        const [s, d] = l.split(': ');
        return [
            s,
            d.split(' '),
        ];
    }));
    console.log(graph);

    const paths = (source = 'you', history = []) => {
        console.log({ source, history });
        if (source === 'out') return [[...history]];
        let out = []
        for (const d of graph[source]) {
            out.push(...paths(d, [...history, d]))
        }
        return out;
    };

    const out = paths();
    console.log(out);
    console.log(out.length);
};

function dfs(src, dest, graph, memo = {}) {
    if (src in memo) return memo[src];

    if (src === dest) {
        return 1n;
    }

    if (!graph[src]) return 0n;

    let count = 0n;
    for (let adjNode of graph[src]) {
        count += dfs(adjNode, dest, graph, memo);
    }
    return memo[src] = count;
}

const partTwo = () => {
    const graph = Object.fromEntries(data.lines().map(l => {
        const [s, d] = l.split(': ');
        return [
            s,
            d.split(' '),
        ];
    }));
    console.log(graph);

    const a = dfs('svr', 'fft', graph);
    const b = dfs('fft', 'dac', graph);
    const c = dfs('dac', 'out', graph);

    const d = dfs('svr', 'dac', graph);
    const e = dfs('dac', 'fft', graph);
    const f = dfs('fft', 'out', graph);
    console.log({ a, b, c, d, e, f });

    console.log(
         a*b*c
        +d*e*f
    );

    // let count = dfs('svr', 'out', graph, [])
    // console.log(count);
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
// time(partOne);
time(partTwo);
