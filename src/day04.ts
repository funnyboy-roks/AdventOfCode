import { load } from './util';

const input = load(4).split('-').map(n => +n);

const partA = (data: number[]) => {
    let count = 0;

    outer:
    for(let num = data[0]; num < data[1]; ++num) {
        const chars = (num + '').split('').map(n => +n);
        let last = undefined;
        let double = false;
        for(let c of chars) {
            if(last === c) double = true;
            if(last && last > c) {
                continue outer;
            }
            last = c;
        }
        if(double) ++count;
    }
    return count;
    

}

const partB = (data: number[]) => {
    let count = 0;

    outer:
    for(let num = data[0]; num < data[1]; ++num) {
        const chars = (num + '').split('').map(n => +n);
        let last = undefined;
        let double = false;
        let doubleLen = 1;
        for(let c of chars) {
            // console.log(c);

            if(last && last > c) {
                continue outer;
            }
            
            if (last === c) {
                doubleLen++;
            } else {
                double ||= doubleLen === 2
                doubleLen = 1;
            }
            // console.log(double, doubleLen);
            

            last = c;
        }

        double ||= doubleLen === 2
        if(double) ++count;
    }
    return count;
    

}


// console.log(partA(input));

console.log(partB(input));
// console.log('' + partB([112233,112233+1]));
// console.log('' + partB([123444,123444+1]));
// console.log('' + partB([111122,111122+1]));