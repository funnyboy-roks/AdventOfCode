import { read } from './util.js';

let data;

if (process.argv[2]) data = await readEx(); // Sample Data
else data = await read(); // Real Data

if (process.argv[2])
	// Sample Data
	data = ``;

const partOne = () => {

};

const partTwo = () => {
    
};

partOne();
partTwo();
