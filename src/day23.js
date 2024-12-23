import { read, readEx, time, debug, assert_eq, range } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';
import jsnx from 'npm:jsnetworkx';
import { combinations } from 'npm:combinatorial-generators';

await readEx();
await read();

/** @type string **/
let data;

const is_triangle = (edges = [], verticies = []) => {
    const combos = combinations(verticies, 2, 2);
    return combos.every(([a, b]) => edges.some((e) => e[0] === a && e[1] === b || e[1] === a && e[0] === b));
};

// 00:48:30
const partOne = () => {
    const edges = data.lines().map(l => l.split`-`);

    const V = new Set();
    for (const [from, to] of edges) {
        V.add(from);
        V.add(to);
    }

    let count = 0;
    const combos = combinations([...V], 3, 3);
    for (const V of combos) {
        if (!V.some(v => v[0] === 't')) continue;
        const E = edges.filter(e => V.includes(e[0]) || V.includes(e[1]))
        if (is_triangle(E, V)) {
            console.log(V);
            count += 1;
        }
    }
    console.log(count);
};


// 01:32:51
const partTwo = () => {
    const edges = data.lines().map(l => l.split`-`);

    let V = new Set();
    let graph = new jsnx.Graph();
    for (const [from, to] of edges) {
        V.add(from);
        V.add(to);
        graph.addEdge(from, to);
    }

    const cliques = [...jsnx.findCliques(graph)];
    cliques.sort((a, b) => b.length - a.length);
    console.log(cliques);
    console.log(cliques[0].sort().join`,`);
    return;
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
time(partOne, 'part one');
time(partTwo, 'part two');
