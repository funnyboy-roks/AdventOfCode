import { load } from './util';

const input = load(3).split('\n').map(n => n.split(','));

// This code makes me want to kms xP


const partA = (data: string[][]) => {
    const points1: { x: number, y: number }[] = [];
    const points2: { x: number, y: number }[] = [];

    let curr = { x: 0, y: 0 };
    data[0].forEach(inst => {
        const amt = +inst.substring(1);
        switch (inst[0]) {
            case 'U':
                addRangeYa(points1, curr.y, curr.y - amt, curr.x)
                curr.y -= amt;
                break;
            case 'D':
                addRangeYa(points1, curr.y, curr.y + amt, curr.x)
                curr.y += amt;
                break;
            case 'L':
                addRangeXa(points1, curr.x, curr.x - amt, curr.y)
                curr.x -= amt;
                break;
            case 'R':
                addRangeXa(points1, curr.x, curr.x + amt, curr.y)
                curr.x += amt;
                break;
        }
    });
    points1.push({ ...curr });


    curr = { x: 0, y: 0 };
    data[1].forEach(inst => {
        const amt = +inst.substring(1);
        switch (inst[0]) {
            case 'U':
                addRangeYa(points2, curr.y, curr.y - amt, curr.x)
                curr.y -= amt;
                break;
            case 'D':
                addRangeYa(points2, curr.y, curr.y + amt, curr.x)
                curr.y += amt;
                break;
            case 'L':
                addRangeXa(points2, curr.x, curr.x - amt, curr.y)
                curr.x -= amt;
                break;
            case 'R':
                addRangeXa(points2, curr.x, curr.x + amt, curr.y)
                curr.x += amt;
                break;
        }
    });
    points2.push({ ...curr });

    console.log('Finished adding points');
    console.log(points1.length, 'points for wire 1');
    console.log(points2.length, 'points for wire 2');
    
    
    const common: { x: number, y: number }[] = [];
    
    points1.forEach(pt => {
        if(pt.x === 0 && pt.y === 0) return;
        const p = points2.find(pt2 => pt2.y === pt.y && pt2.x === pt.x);
        if (p) {
            common.push(p);
        }
    });
    console.log(common.length, 'points in common');

    console.log(common.map(pt => Math.abs(pt.x) + Math.abs(pt.y)).sort((a, b) => a -b ));


}

const addRangeXa = (pointsArr: any[], startX: number, endX: number, y: number) => {
    if (startX > endX) {
        let tmp = endX;
        endX = startX;
        startX = tmp;
    }
    for (let x = startX; x < endX; x++) {
        pointsArr.push({ x, y });
    }
}
const addRangeYa = (pointsArr: any[], startY: number, endY: number, x: number) => {
    if (startY > endY) {
        let tmp = endY;
        endY = startY;
        startY = tmp;
    }
    for (let y = startY; y < endY; y++) {
        pointsArr.push({ x, y });
    }
}

const addRangeXb = (pointsArr:  any[], start: number, end: number, y: number, steps: number) => {

    if(start < end) {
        for(let x = start; x < end; ++x) {
            pointsArr.push({x, y, steps})
            steps++;
        }
    } else {
        console.log('x', start, end, steps);
        for(let x = start - 1; x >= end; --x) {
            steps++;
            pointsArr.push({x, y, steps})
        }
    }
}
const addRangeYb = (pointsArr: any[], start: number, end: number, x: number, steps: number) => {

    if(start < end) {
        for(let y = start; y < end; ++y) {
            pointsArr.push({x, y, steps})
            steps++;
        }
    } else {
        console.log('y', start, end, steps);
        
        for(let y = start - 1; y >= end; --y) {
            steps++;
            pointsArr.push({x, y, steps})
        }
    }
}

const partB = (data: string[][]) => {
    let points1: { x: number, y: number, steps: number }[] = [];
    let points2: { x: number, y: number, steps: number }[] = [];

    let curr = { x: 0, y: 0, steps: 0 };
    data[0].forEach(inst => {
        const amt = +inst.substring(1);
        switch (inst[0]) {
            case 'U':
                addRangeYb(points1, curr.y, curr.y - amt, curr.x, curr.steps)
                curr.y -= amt;
                break;
            case 'D':
                addRangeYb(points1, curr.y, curr.y + amt, curr.x, curr.steps)
                curr.y += amt;
                break;
            case 'L':
                addRangeXb(points1, curr.x, curr.x - amt, curr.y, curr.steps)
                curr.x -= amt;
                break;
            case 'R':
                addRangeXb(points1, curr.x, curr.x + amt, curr.y, curr.steps)
                curr.x += amt;
                break;
        }
        curr.steps += amt;
    });
    points1.push({ ...curr });


    curr = { x: 0, y: 0, steps: 0 };
    data[1].forEach(inst => {
        const amt = +inst.substring(1);
        switch (inst[0]) {
            case 'U':
                addRangeYb(points2, curr.y, curr.y - amt, curr.x, curr.steps)
                curr.y -= amt;
                break;
            case 'D':
                addRangeYb(points2, curr.y, curr.y + amt, curr.x, curr.steps)
                curr.y += amt;
                break;
            case 'L':
                addRangeXb(points2, curr.x, curr.x - amt, curr.y, curr.steps)
                curr.x -= amt;
                break;
            case 'R':
                addRangeXb(points2, curr.x, curr.x + amt, curr.y, curr.steps)
                curr.x += amt;
                break;
        }
        curr.steps += amt;
    });
    points2.push({ ...curr });
    

    console.log('Finished adding points');
    console.log(points1.length, 'points for wire 1');
    console.log(points2.length, 'points for wire 2');
    
    
    const common: { x: number, y: number, steps: number[] }[] = [];
    
    points1.forEach(pt => {
        if(pt.x === 0 && pt.y === 0) return;
        const p = points2.find(pt2 => pt2.y === pt.y && pt2.x === pt.x);
        if (p) {
            common.push({...p, steps: [p.steps, pt.steps]});
        }
    });
    console.log(common.length, 'points in common');

    console.log(common.map(pt => pt.steps[0] + pt.steps[1]).sort((a, b) => a-b) );




}

// console.log(partA(input));
// console.log(partA([['R8', 'U5', 'L5', 'D3'], ['U7', 'R6', 'D4', 'L4']]));
// console.log(partA([
//     'R75,D30,R83,U83,L12,D49,R71,U7,L72'.split(','),
//     'U62,R66,U55,R34,D71,R55,D58,R83'.split(','),
// ]));
// console.log(partA([
//     'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'.split(','),
//     'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'.split(','),
// ]));

console.log(partB(input));
// console.log(partB([['R8', 'U5', 'L5', 'D3'], ['U7', 'R6', 'D4', 'L4']]));
// console.log(partB([
//     'R75,D30,R83,U83,L12,D49,R71,U7,L72'.split(','),
//     'U62,R66,U55,R34,D71,R55,D58,R83'.split(','),
// ]));
// console.log(partB([
//     'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'.split(','),
//     'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'.split(','),
// ]));