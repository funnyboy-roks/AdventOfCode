import { load } from './util';

const input = load(2).split(',').map(n => +n);

const partA = (data: number[]) => {

    data[1] = 12;
    data[2] = 2;

    loop:
    for(let i = 0; i < data.length; ++i) {
        const inst = data[i];
        switch(inst) {
            case 1:
                data[data[i + 3]] = data[data[i + 1]] + data[data[i + 2]];
                i += 3;
                break;
                case 2:
                    data[data[i + 3]] = data[data[i + 1]] * data[data[i + 2]];
                    i += 3;
                break;
            case 99:
                break loop;
        }
    }
    console.log(data);
    return data[0];
}

const partB = (inp: number[]) => {
    
    for(let noun = 0; noun < 100; ++noun) {
        for(let verb = 0; verb < 100; ++verb) {
            let data = [...inp];
            data[1] = noun;
            data[2] = verb;

            loop:
            for(let i = 0; i < data.length; ++i) {
                const inst = data[i];
                switch(inst) {
                    case 1:
                        data[data[i + 3]] = data[data[i + 1]] + data[data[i + 2]];
                        i += 3;
                        break;
                        case 2:
                            data[data[i + 3]] = data[data[i + 1]] * data[data[i + 2]];
                            i += 3;
                        break;
                    case 99:
                        break loop;
                }
            }
            if(data[0] === 19690720) return 100 * noun + verb;
        }
    }
    return NaN;
}

console.log(partA(input));

console.log(partB(input));