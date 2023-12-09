import { read, readEx, time } from './util.js';
import Vec from './util/Vec.js';
await import('./util/bad-but-great.js');

await readEx();
await read();

let data;

// 10:06
const partOne = () => {
    // Can't believe that I got this on the first try >:D
    const bubble_up = (steps) => {
        if (steps.length == 1) {
            return;
        }
        let next = steps.at(-2);
        next.push(next.at(-1) + steps.at(-1).at(-1));
        bubble_up(steps.slice(0, steps.length - 1));
    };

    let sum = 0;
    for (const line of data.lines()) {
        let steps = [];
        let nums = line.split` `.nums();
        steps.push(nums);
        while (nums.some(s => s !== 0)) {
            let step = [];
            for (let i = 1; i < nums.length; ++i) {
                step.push(nums[i] - nums[i - 1]);
            }
            steps.push(nums = step);
        }
        
        steps.at(-1).push(0);
        bubble_up(steps);
        console.log(steps);
        sum += steps[0].at(-1);
    }
    console.log({ sum });
};

// 15:00
const partTwo = () => {
    const bubble_up = (steps) => {
        if (steps.length == 1) {
            return;
        }
        let next = steps.at(-2);
        console.log({next});
        next.unshift(next[0] - steps.at(-1)[0]);
        bubble_up(steps.slice(0, steps.length - 1));
    };

    let sum = 0;
    for (const line of data.lines()) {
        let steps = [];
        let nums = line.split` `.nums();
        steps.push(nums);
        while (nums.some(s => s !== 0)) {
            let step = [];
            for (let i = 1; i < nums.length; ++i) {
                step.push(nums[i] - nums[i - 1]);
            }
            steps.push(nums = step);
        }
        
        steps.at(-1).unshift(0);
        bubble_up(steps);
        console.log(steps);
        sum += steps[0][0];
    }
    console.log({ sum });
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
