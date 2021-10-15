import fs from 'fs';

const day = 6;

const input = fs.readFileSync(`Day${day}/input.txt`, 'utf8');

const parseData = (data: string): string[][] => {
    const out: string[][] = [];
    const inp = data.trim().split('\n').map(s => s.trim().split(''));
    for (let x = 0; x < inp[0].length; ++x) {
        const arr = [];
        for (let y = 0; y < inp.length; y++) {

            arr.push(inp[y][x]);

        }
        out.push(arr);
    }
    return out;
}

const main = (): void => {

    const data = parseData(input);
    // const data = parseData(`eedadn
    // drvtee
    // eandsr
    // raavrd
    // atevrs
    // tsrnev
    // sdttsa
    // rasrtv
    // nssdts
    // ntnada
    // svetve
    // tesnvt
    // vntsnd
    // vrdear
    // dvrsen
    // enarar`);

    const c = data.map(mostCommon).join('');
    console.log(c);
    
    




}

const mostCommon = (list: string[]): string => {
    const chars: Map<string, number> = new Map();
    for (const c of list) {
        chars.set(c, (chars.get(c) || 0) + 1);
    }
    return [...chars.entries()].sort(([_, a], [__, b]) => b - a)[0][0];
}
main();