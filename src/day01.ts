import { loadLines } from './util';

const input = loadLines(1).map(n => +n);

const partA = (data: number[]) => {
    return data.map((item) => Math.floor(item / 3) - 2).reduce((a, b) => a + b, 0);
}

const partB = (data: number[]) => {

    return data.map((item) => Math.floor(item / 3) - 2).map((item) => item + recur(Math.floor(item / 3) - 2)).reduce((a, b) => a + b, 0);
}


const recur = (fuel: number): number => {
    if (fuel <= 0) return 0 
    
    return fuel + recur(Math.floor(fuel / 3) - 2);
}


console.log(partA(input));

console.log(partB(input));
// console.log(recur(1969) - 1969);