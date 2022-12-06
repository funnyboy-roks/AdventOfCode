import { read, readEx } from './util.js';

await read();
await readEx();

let data;

const doStuff = () => { // Modified part one rather than create a new function (replace '14' with '4' for part one)
    
    const chars = data.split``;
    let search = '';

    for(let i = 0; i < data.length - 14; ++i) {
        const str = data.substring(i, i + 14);
        const chars = {}
        str.split``.forEach(c => {
            chars[c] ? chars[c] += 1 : chars[c] = 1;
        });
        if(Object.values(chars).filter(l => l !== 1).length === 0) {
            console.log(i + 14);
            search = str;
            break;
        }
    }
    console.log(data.indexOf(search));

};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	doStuff();
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	doStuff();
}
