import fs from 'fs';

const input = fs.readFileSync('Day4/input.txt', 'utf8');

const parseData = (data: string): { str: string, room: number, checksum: string }[] => {

    return data.trim().split('\n').map(s => {
        const [_, str, room, checksum] = s.match(/([a-z-]+)(\d+)\[([a-z]+)]/i) ?? [];
        return {
            str,
            room: +room,
            checksum
        }
    });

}

const main = () => {

    const data = parseData(input);

    let count = 0;

    data.filter(({ str, room, checksum }) => {

        const chars: Map<string, number> = new Map();

        for (const c of str.replace(/-/gi, '').split('')) {
            chars.set(c, (chars.get(c) || 0) + 1)
        }

        const orderedChars: Map<number, string[]> = new Map();

        [...chars.entries()].sort(([_, a], [__, b]) => b - a).forEach(([k, v]) => {
            orderedChars.set(v, [...(orderedChars.get(v) || []), k].sort());
        });

        const vals = [...orderedChars.values()].flat();
        for (let i in checksum.split('')) {
            const c = checksum.split('')[i];
            const v = vals[i];

            if (c != v) {
                return false;
            }
        }

        return true;

    });
    
    for (const {str, room, checksum} of data) {
        let s = '';
        for (const c of str.split('')) {
            s += charShift(c, room);
        }
        if(s.startsWith('north')) {
            console.log(room);

        }
        
    }






}

const charShift = (c: string, amount: number): string => {
    if(c === '-') return ' '; //amount % 2 == 1 ? ' ' : '-';
    const alpha = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let i = alpha.indexOf(c);
    i += amount;
    i %= alpha.length;
    return alpha[i];
}

main();