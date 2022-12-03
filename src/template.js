import './util/bad-but-great.js';
import { loadRaw } from './util.js';

let data = loadRaw(+process.argv[1].match(/.+?(\d+)\.js$/i)[1]); // Get the current day based off the command line args

if (process.argv[2])
	// Sample Data
	data = ``;

const partOne = () => {

};

const partTwo = () => {
    
};

partOne();
partTwo();
