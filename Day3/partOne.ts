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

const main = (): void => {
    const data = parseData(input);
    // const data = parseData('10 5 25');
    console.log(data);
    

    let count = 0;
    for (const triangle of data) {
        const [a, b, c] = triangle;
        console.log(a, b, c);
        
        if(a + b > c) {
            count ++;
        }
    }
    console.log(count);
    
}

main();