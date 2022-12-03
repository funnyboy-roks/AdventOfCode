import { loadRaw } from '../util.js';
import Grid from './Grid.js';

// let raw = loadRaw(1);
// // raw = `1000
// // 2000
// // 3000

// // 4000

// // 5000
// // 6000

// // 7000
// // 8000
// // 9000

// // 10000`;

// 'abc'.permute().log();

// raw.lines()
// 	.split('')
// 	.map((n) => n.numbers().sum())
// 	.max()
// 	.log();

// const arr = [1, 2, 3, 4, 5, 6];
// arr.ror();
// arr.log();
// arr.rol(2);
// arr.log();


// for (let i in arr) {
// 	console.log(i);
// }

const grid = new Grid(5, 5, (x, y) => x + ',' + y);

grid.get(2, 2).log();

// grid.get(2, 2).getNeighbours().map(v => v.value).log()