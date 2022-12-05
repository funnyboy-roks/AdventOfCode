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

// const grid = new Grid(5, 5, (x, y) => x + ',' + y);

// grid.get(2, 2).log();

// [1, 2, 3, 4, 5, 6, 7, 8, 9].max(3).sum().log().cp();
// [1, 2, 3, 4].choose(2).log();

// 2020 Day 1 Solution in 1 lines.
const data = '1721\n979\n366\n299\n675\n1456';
data.lines().numbers().choose(2).first(n => n.sum() === 2020).product().log('1');
data.lines().numbers().choose(3).first(n => n.sum() === 2020).product().log('2');

// grid.get(2, 2).getNeighbours().map(v => v.value).log()