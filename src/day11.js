import { read, readEx, time } from './util.js';
import Vec from './util/Vec.js';
await import('./util/bad-but-great.js');

await readEx();
await read();

let data;

const get_cols_rows = (grid) => {
    let cols = [];
    let rows = grid.map((a, i) => [a, i]).filter(([a, _]) => /^\.+$/.test(a.join(''))).map(([a, i]) => i);

    for (let x = 0; x < grid[0].length; ++x) {
        let all_dots = true;
        for (let y = 0; y < grid.length; ++y) {
            if (grid[y][x] !== '.') {
                all_dots = false;
            }
        }
        if (all_dots) {
            cols.push(x);
        }
    }

    return [cols, rows];
}

// 44:29
const partOne = () => {
    let grid = data.lines().map(l => l.split(''));
    let galaxies = [];
    for (let y = 0; y < grid.length; ++y) {
        for (let x = 0; x < grid[0].length; ++x) {
            if (grid[y][x] === '#') {
                galaxies.push([x, y]);
            }
        }
    }
    let [cols, rows] = get_cols_rows(grid);

    let new_width = cols.length + grid[0].length;
    for (let y = 0; y < grid.length; ++y) {
        let o = 0;
        for (let x of cols) {
            grid[y].insert(x + 1 + o++, '.');
        }
    }

    let o = 0
    for (let y of rows) {
        grid.insert(y + 1 + o++, Array(new_width).fill('.'));
    }

    // update galaxies
    galaxies = [];
    for (let y = 0; y < grid.length; ++y) {
        for (let x = 0; x < grid[0].length; ++x) {
            if (grid[y][x] === '#') {
                galaxies.push([x, y]);
            }
        }
    }
    const dist = (a, b) => {
        let [ax, ay] = galaxies[a];
        let [bx, by] = galaxies[b];
        let dx =Math.abs(bx - ax) ; 
        let dy = Math.abs(by - ay);
        return dx + dy;
    };

    let sum = 0;
    for (let i = 0; i < galaxies.length - 1; ++i) {
        for (let j = i + 1; j < galaxies.length; ++j) {
            sum += dist(i, j);
        }
    }
    console.log({sum});

    // let i = 0;
    // for (const [x, y] of galaxies) {
    //     grid[y][x] = ++i;
    // }
    // console.log(grid.map(r => r.join('')).join('\n'));
};

// 58:20
const partTwo = () => {
    let grid = data.lines().map(l => l.split(''));
    let galaxies = [];
    for (let y = 0; y < grid.length; ++y) {
        for (let x = 0; x < grid[0].length; ++x) {
            if (grid[y][x] === '#') {
                galaxies.push([x, y]);
            }
        }
    }
    let [cols, rows] = get_cols_rows(grid);

    const expansion_rate = 1_000_000 - 1;
    for (const gal of galaxies) {
        let new_x = gal[0];
        for (const col of cols) {
            if (gal[0] > col) {
                new_x += expansion_rate
            }
        }
        gal[0] = new_x;
        let new_y = gal[1];
        for (const row of rows) {
            if (gal[1] > row) {
                new_y += expansion_rate;
            }
        }
        gal[1] = new_y;
    }

    const dist = (a, b) => {
        let [ax, ay] = galaxies[a];
        let [bx, by] = galaxies[b];
        let dx =Math.abs(bx - ax) ; 
        let dy = Math.abs(by - ay);
        return dx + dy;
    };

    let sum = 0;
    for (let i = 0; i < galaxies.length - 1; ++i) {
        for (let j = i + 1; j < galaxies.length; ++j) {
            sum += dist(i, j);
        }
    }

    console.log ({sum});
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
