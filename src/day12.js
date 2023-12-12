import { read, readEx, time } from './util.js';
import Vec from './util/Vec.js';
await import('./util/bad-but-great.js');

await readEx();
await read();

let data;

const smthsub = (s) => {
    let numqs = BigInt(s.split``.filter(c => c === '?').length);
    const out = [];
    console.log('num', 2n ** numqs);
    let numIndex = (i, n) => (i >> n) & 1n;
    for (let i = 0n; i < 2n ** numqs; ++i) {
        let k = 0n;
        let str = s.split``;
        for (let j = BigInt(s.length); j-- > 0;) {
            str[j] = str[j] === '?' ? numIndex(i, k++) ? '#' : '.' : str[j];
        }
        out.push(str.join``);
    }
    return out;
}

// 22:36
const partOne = () => {
    let lines = data.lines();
    const counts = (s) => s.split(/\.+/g).map(s => s.length).truthy();
    const arreq = (a, b) => a.length === b.length && a.every((v, i) => b[i] === v);
    
    let sum = 0;
    for (const line of lines) {
        let [a, b] = line.split(' ');
        b = b.split(',').nums();
        //console.log('a =', a);
        //console.log('b =', b);
        let poss = smthsub(a);
        let c = 0;
        for (const p of poss) {
            if (arreq(counts(p), b)) {
                //console.log('    p =', p);
                ++c;
            }
        }
        //console.log('c =', c);
        //console.log();
        sum += c;
    }
    console.log({sum});
};

const count = (memo = {}, str, amounts, i, j, cur) => {
    const key = [i, j, cur].join();
    if (key in memo) return memo[key];

    if (i === str.length) {
      return +(j === amounts.length && cur === 0 || j === amounts.length - 1 && amounts[j] === cur);
    }

    let total = 0;
    let c = str[i];
    if (c !== '#') {
        if (cur === 0) {
            total += count(memo, str, amounts, i + 1, j, 0);
        } else if (cur > 0 && j < amounts.length && amounts[j] === cur) {
            total += count(memo, str, amounts, i + 1, j + 1, 0);
        }
    }
    if (c !== '.') {
      total += count(memo, str, amounts, i + 1, j, cur + 1);
    }
    return memo[key] = total;
};

// >2h
const partTwo = () => {
    let lines = data.lines();

    let sum = 0;
    for (const line of lines) {
        let [a, b] = line.split(' ');
        a = [a].repeat(5).join('?');
        b = b.split(',').repeat(5).nums();
        let c = count({}, a, b, 0, 0, 0);
        console.log(a);
        console.log('=>', c);
        console.log();
        sum += c;
    }
    console.log({sum});
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	//time(partOne);
    time(partTwo);
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	//time(partOne);
    time(partTwo);
}
