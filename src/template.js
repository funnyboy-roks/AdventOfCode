import './util/bad-but-great.js';
import { read } from './util.js';

let data = await read(+process.argv[1].match(/.+?(\d+)\.js$/i)[1]); // Get the current day based off the command line args

if (process.argv[2])
	// Sample Data
	data = ``;

const partOne = () => {

};

const partTwo = () => {
    
};

partOne();
partTwo();
