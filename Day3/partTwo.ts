import fs from 'fs';

const input = fs.readFileSync('Day3/input.txt', 'utf8');

const parseData = (data: string): number[][] => {
    return data
    .replace(/ +/g, ' ')
    .split('\n')
    .map(s => s
        .trim()
        .split(' ')
        .map(s => +s)
        .sort((a, b) => a-b)
        );
}

// NGL, idk what it's looking for
const main = (): void => {
    const data = parseData(input);
    console.log(data);
    

    let count = 0;
    for (const triangle of data) {
        const [a, b, c] = triangle;
        console.log(a, b, c);
        
        if(a + b > c && Math.floor(a / 100) + Math.floor(b / 100) < Math.floor(c / 100)) {
            count ++;
        }
    }
    console.log(count);
    
}

main();