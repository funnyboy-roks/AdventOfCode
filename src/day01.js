import { loadRaw } from './util.js';

const rawData = await loadRaw(1)/* `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000` */;

const partOne = () => {

    const parsed = rawData.split('\n\n').map(s => s.split('\n').map(n => +n));
    
    console.log(Math.max(...parsed.map(e => e.reduce((a, b) => a + b, 0))))

}

const partTwo = () => {

    const parsed = rawData.split('\n\n').map(s => s.split('\n').map(n => +n).reduce((a, b) => a + b, 0));

    parsed.sort((a, b) => b - a)
    
    console.log(parsed[0] + parsed[1] + parsed[2]);
}

partOne(); // 00:04:08
partTwo(); // 00:06:18