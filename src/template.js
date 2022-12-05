import { read, readEx } from './util.js';

let data;

const partOne = () => {

	

};

const partTwo = () => {
    
};

console.log('--- --- Running Sample Data --- ---');
data = await readEx(); // Sample Data
partOne();
partTwo();

process.exit(1);

console.log('--- --- Running Real Data --- ---');
data = await read(); // Real Data
partOne();
partTwo();
