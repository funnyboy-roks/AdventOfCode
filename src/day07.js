import { read, readEx } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

/** @type (e: number[]) => number[] */
const f = (e) => {
    if (e.length === 1) {
        return ['' + e[0]];
    } else {
        const F = f(e.slice(1))
        return F.map(n => e[0] + ' * ' + n).concat(F.map(n => e[0] + ' + ' + n));
    }
};

const eva = (s) => {
    const a = s.split(' ').map(n => isNaN(+n) ? n : BigInt(n));
    let op;
    return a.reduce((prev,n) => {
        if (n === '+' || n === '*') { op = n; return prev }
        else if (prev === undefined) return n;
        if (op === '*') {
            return prev * n;
        } else if (op === '+') {
            return prev + n;
        }
    }, undefined);
}

// 00:24:41
const partOne = () => {
    const lines = data.lines().map(l => l.split(': ')).map(([l,r]) => [BigInt(l), r.split(' ').map(BigInt)]);
    console.log(lines);
    const ret = lines.filter(([t, l]) => f(l).map(eva).includes(t))
        .map(l => l[0])
        .reduce((a, b) => a + b, 0n)
    console.log(ret);
};

/** @type (e: number[]) => number[] */
const f2 = (e) => {
    if (e.length === 1) {
        return ['' + e[0]];
    } else {
        const F = f2(e.slice(1))
        return F.map(n => e[0] + ' * ' + n).concat(F.map(n => e[0] + ' + ' + n)).concat(F.map(n => e[0] + ' | ' + n));
    }
};

const eva2 = (s) => {
    const a = s.split(' ').map(n => isNaN(+n) ? n : BigInt(n));
    let op;
    return a.reduce((prev,n) => {
        if (n === '+' || n === '*' || n === '|') { op = n; return prev }
        else if (prev === undefined) return n;
        if (op === '|') {
            return BigInt(prev.toString() + n.toString());
        } else if (op === '*') {
            return prev * n;
        } else if (op === '+') {
            return prev + n;
        }
    }, undefined);
}

// 00:27:49
const partTwo = () => {
    const lines = data.lines().map(l => l.split(': ')).map(([l,r]) => [BigInt(l), r.split(' ').map(BigInt)]);
    console.log(lines);
    const ret = lines.filter(([t, l]) => f2(l).map(eva2).includes(t))
        .map(l => l[0])
        .reduce((a, b) => a + b, 0n)
    console.log(ret);
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
