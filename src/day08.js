import { read, readEx, time } from './util.js';
import Vec from './util/Vec.js';
await import('./util/bad-but-great.js');

await readEx();
await read();

let data;

// 10:28
const partOne = () => {
    let lines = data.lines();
    let steps = lines.splice(0, 1)[0].split``;
    lines.splice(0, 1);

    let nodes = {};
    for (const line of lines) {
        let [from, to] = line.split(' = ');
        nodes[from] = to.substring(1, to.length - 1).split(', ');
    }
    console.log({nodes});

    let curr = 'AAA';
    let count = 0;
    for (let stepI = 0; ; ++stepI) {
        console.log(curr, nodes[curr], steps[stepI % steps.length]);
        curr = nodes[curr][steps[stepI % steps.length] === 'L' ? 0 : 1];
        count++;
        if (curr === 'ZZZ') {
            break;
        }
    }
    console.log({count});
};

// >2h
// Hint: Naïve impl is bad
const partTwo = () => {
    let lines = data.lines();
    let steps = lines.splice(0, 1)[0].split``;
    lines.splice(0, 1);

    let nodes = {};
    let curr = [];
    for (const line of lines) {
        let [from, to] = line.split(' = ');
        nodes[from] = to.substring(1, to.length - 1).split(', ');
        if (from[2] === 'A') {
            curr.push(from);
        }
    }
    console.log({nodes});

    let counts = []
    for (let i in curr) {
        console.log('running start', curr[i]);
        let count = 0;
        let history = []; // curr + stepI
        for (let stepI = 0; ; stepI = (stepI + 1) % steps.length) {
            const c = curr[i];
            curr[i] = nodes[c][steps[stepI] === 'L' ? 0 : 1];
            let lastIndex = history.indexOf(curr[i] + stepI);
            if (lastIndex !== -1 && curr[i][2] === 'Z') {
                counts.push(history.length - lastIndex); // len of the loop
                break;
            }
            history.push(curr[i] + stepI);

            count++;
        }
        console.log({ count });
    }
    console.log({counts});
    console.log('lcm', lcm(counts));
};

const gcd = (a, b) => { 
    if (b == 0) 
        return a; 
    return gcd(b, a % b); 
} 
 
const lcm = (arr) => { 
    let ans = arr[0]; 
 
    for (let i = 1; i < arr.length; i++) 
        ans = (((arr[i] * ans)) / 
                (gcd(arr[i], ans))); 
 
    return ans; 
}

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
