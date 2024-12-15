import { assert_eq, debug, read, readEx, time } from './util.ts';
import Vec from './util/Vec.ts';
import './util/prototype-shenanigans.js';
import './types.d.ts';

await readEx();
await read();

/** @type string **/
let data;

const lookup = {
    '>': Vec.RIGHT,
    '<': Vec.LEFT,
    '^': Vec.UP,
    'v': Vec.DOWN,
};

// 00:16:02
const partOne = () => {
    let [map, insts] = data.lines().split('');
    map = map.map((l) => l.split``);
    // map = map.slice(1, -1).map(s => s.split``.slice(1, -1))
    insts = insts.join``;
    console.log({ insts });
    console.log(map.map((l) => l.join``).join`\n`);

    let robit;
    for (let y = 0; y < map.length; ++y) {
        const row = map[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] === '@') {
                row[x] = '.';
                robit = new Vec(x, y);
            }
        }
    }
    console.log(robit);

    const find_next_free = (map, pos, dir) => {
        while (map[pos.y][pos.x] !== '#') {
            if (map[pos.y][pos.x] === '.') {
                return pos;
            }
            pos = pos.add(dir);
        }
        return undefined;
    };

    for (const inst of insts) {
        const dir = lookup[inst];
        let next = robit.add(dir);
        let c = map[next.y][next.x];
        // let next_map = map.deepCopy();
        if (c === '.') {
            robit = next;
            continue;
        }
        if (c === '#') {
            continue;
        }
        if (c === 'O') {
            let free = find_next_free(map, next, dir);
            if (free) {
                map[free.y][free.x] = 'O';
                map[next.y][next.x] = '.';
                robit = next;
            }
        }

        console.log('\n', inst);
        console.log(map.map((l) => l.join``).join`\n`);
    }

    let sum = 0;
    for (let y = 0; y < map.length; ++y) {
        const row = map[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] === 'O') {
                sum += 100 * y + x;
            }
        }
    }
    return sum;
};

// 01:32:46
const partTwo = () => {
    let [map, insts] = data.lines().split('');
    const expand = {
        '.': '..',
        '#': '##',
        'O': '[]',
        '@': '@.',
    };
    map = map.map((l) => l.split``.flatMap(c => 
        [...expand[c]]
    ));

    insts = insts.join``;
    console.log({ insts });
    console.log(map.map(l => l.join``).join`\n`);

    let robit;
    for (let y = 0; y < map.length; ++y) {
        const row = map[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] === '@') {
                row[x] = '.';
                robit = new Vec(x, y);
            }
        }
    }
    console.log(robit);

    const find_next_free = (map, pos, dir) => {
        while (map[pos.y][pos.x] !== '#') {
            if (map[pos.y][pos.x] === '.') {
                return pos;
            }
            pos = pos.add(dir);
        }
        return undefined;
    };

    const move_if_can = (map, pos, dir) => {
        const c = map[pos.y][pos.x];
        if (c === '#') return false;
        if (c === '.') return true;
        if (c === '[') {
            let next = pos.add(dir);
            if (move_if_can(map, next, dir) && move_if_can(map, next.add(Vec.RIGHT), dir)) {
                map[pos.y][pos.x] = '.';
                map[pos.y][pos.x + 1] = '.';
                map[next.y][next.x] = '[';
                map[next.y][next.x + 1] = ']';
                return true;
            } else {
                return false;
            }
        } else if (c === ']') {
            let next = pos.add(dir);
            if (move_if_can(map, next.add(Vec.LEFT), dir) && move_if_can(map, next, dir)) {
                map[pos.y][pos.x - 1] = '.';
                map[pos.y][pos.x] = '.';
                map[next.y][next.x - 1] = '[';
                map[next.y][next.x] = ']';
                return true;
            } else {
                return false;
            }
        }
        throw new Error(`got c = ${c}`)
    }

    for (const inst of insts) {
        /** @type {Vec} */
        const dir = lookup[inst];
        let next = robit.add(dir);
        let c = map[next.y][next.x];
        // let next_map = map.deepCopy();
        if (c === '.') {
            robit = next;
        } else if (c === '#') {
            continue;
        } else if ((c === '[' || c === ']') && dir.isHoriz()) {
            let free = find_next_free(map, next, dir);
            if (!free) continue;
            map[next.y].splice(free.x, 1);
            map[next.y].insert(next.x, '.')
            robit = next;
        } else if ((c === '[' || c === ']') && dir.isVert()) {
            let copy = map.deepCopy();
            if (move_if_can(copy, next, dir)) {
                robit = next;
                map = copy; // this line being outside of this if cost me 45 minutes...
            }
        } else {
            conole.error({c});
            throw 'unexpected c';
        }

        if (debug) {
            console.log('\n', inst);
            console.log(map.map((l, y) => l.map((c, x) => x === robit.x && y === robit.y ? '\u001b[32m@\u001b[0m' : c).join``).join`\n`);
        }
    }

    let sum = 0;
    for (let y = 0; y < map.length; ++y) {
        const row = map[y];
        for (let x = 0; x < row.length; ++x) {
            if (row[x] === '[') {
                sum += 100 * y + x;
            }
        }
    }
    return sum;
};

if (Deno.args[0]) {
    console.log('Sample Data:');
    data = await readEx();
    console.log(data.lines().map((l) => '    ' + l).join`\n`);
} else {
    console.log('Real Data');
    data = await read();
}
console.log('Output:');
if (debug) {
    assert_eq(10092, time(partOne));
    assert_eq(9021, time(partTwo));
} else {
    assert_eq(1406392, time(partOne));
    assert_eq(1429013, time(partTwo));
}
