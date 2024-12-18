import { read, readEx, time, debug, range } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

const err = (s) => {
    throw new Error(s);
};

const partOne = () => {
    const [registers, [program]] = data.lines().split('');
    console.log({registers, program });
    let a = BigInt(registers[0].match(/(\d+)/g)[0]);
    let b = BigInt(registers[1].match(/(\d+)/g)[0]);
    let c = BigInt(registers[2].match(/(\d+)/g)[0]);
    const insts = program.split(': ')[1].split(',').bigints();

    const combo = n => n < 4n ? n : n < 7n ? [a, b, c][n - 4n] : err(`n = ${n}`);

    console.log(insts, {a, b, c});

    let out = [];
    for (let i = 0; i < insts.length;) {
        const inst = insts[i++];
        const arg = insts[i++];
        console.log({inst, arg});

        switch (inst) {
            case 0n: { // adv
                console.debug('adv');
                a = a / (2n ** combo(arg));
            } break;
            case 1n: { // bxl
                console.debug('bxl');
                b = b ^ arg;
            } break;
            case 2n: { // bst
                console.debug('bst');
                b = combo(arg) % 8n;
            } break;
            case 3n: { // jnz
                console.debug('jnz');
                if (a) i = arg
            } break;
            case 4n: { // bxc
                console.debug('bxc');
                b ^= c;
            } break;
            case 5n: { // out
                console.debug('out');
                out.push(combo(arg) % 8n);
            } break;
            case 6n: { // bdv
                console.debug('bdv');
                b = a / (2n ** combo(arg));
            } break;
            case 7n: { // cdv
                console.debug('cdv');
                c = a / (2n ** combo(arg));
            } break;
        }
        console.log(i);
    }
    console.log({out});
    console.log(out.nums().toString());
};


// I don't want to talk about how long this took....
const partTwo = () => {
    const [registers, [program]] = data.lines().split('');
    console.log({registers, program });
    const insts = program.split(': ')[1].split(',').bigints();

    const run = (a, b, c) => {
        const combo = n => n < 4n ? n : n < 7n ? [a, b, c][n - 4n] : err(`n = ${n}`);

        let out = [];
        for (let i = 0; i < insts.length;) {
            const inst = insts[i++];
            const arg = insts[i++];

            switch (inst) {
                case 0n: { // adv
                    a = a / (2n ** combo(arg));
                } break;
                case 1n: { // bxl
                    b = b ^ arg;
                } break;
                case 2n: { // bst
                    b = combo(arg) % 8n;
                } break;
                case 3n: { // jnz
                    if (a) i = arg
                } break;
                case 4n: { // bxc
                    b ^= c;
                } break;
                case 5n: { // out
                    out.push(combo(arg) % 8n);
                } break;
                case 6n: { // bdv
                    b = a / (2n ** combo(arg));
                } break;
                case 7n: { // cdv
                    c = a / (2n ** combo(arg));
                } break;
            }
        }
        return out;
    }

    const arr_eq = (a, b) => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    const rec = ({ a, b, c }, running = []) => {
        if (running.length === insts.length) return [a]
        return range(0, 8)
            .bigints()
            .map(n => ({a: (a << 3n) + n, b, c}))
            .filter(s => s.a !== a)
            .map(n => ({ n, out: run(n.a, n.b, n.c) }))
            .filter(s => arr_eq(s.out, insts.slice(-s.out.length)))
            .flatMap(s => rec(s.n, s.out))
    }
    console.log(rec({ a: 0n, b: 0n, c: 0n})[0]);
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
