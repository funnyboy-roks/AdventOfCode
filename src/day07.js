import { read, readEx, time } from './util.js';
import Vec from './util/Vec.js';
await import('./util/bad-but-great.js');

await readEx();
await read();

let data;

// 26:38
const partOne = () => {
    const strengths = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
    const handFns = [
        //Five of a kind, where all five cards have the same label: AAAAA
        (h) => {
            let counts = h.split``.counts();
            if (Object.values(counts)[0] === 5) return h[0];
            return false;
        },
        //Four of a kind, where four cards have the same label and one card has a different label: AA8AA
        (h) => {
            let counts = h.split``.counts();
            for (const [k, v] of Object.entries(counts)) {
                if (v === 4) {
                    return k;
                }
            }
            return false;
        },
        //Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
        (h) => {
            let counts = h.split``.counts();
            let three = undefined;
            let two = undefined;
            for (const [k, v] of Object.entries(counts)) {
                if (v === 2) {
                    two = k;
                } else if (v === 3) {
                    three = k;
                }
            }
            if (three !== undefined && two !== undefined) {
                return three;
            }
            return false;
        },
        //Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
        (h) => {
            let counts = h.split``.counts();
            for (const [k, v] of Object.entries(counts)) {
                if (v === 3) {
                    return k;
                }
            }
            return false;
        },
        //Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
        (h) => {
            let counts = h.split``.counts();
            let pairs = [];
            for (const [k, v] of Object.entries(counts)) {
                if (v === 2) {
                    pairs.push(k);
                }
            }
            if (pairs.length >= 2) {
                return pairs.sort((a, b) => strengths.indexOf(a) - strengths.indexOf(b))[0];
            }
            return false;
        },
        //One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
        (h) => {
            let counts = h.split``.counts();
            for (const [k, v] of Object.entries(counts)) {
                if (v === 2) {
                    return k;
                }
            }
            return false;
        },
        //High card, where all cards' labels are distinct: 23456
        (h) => h.split``.sort((a, b) => strengths.indexOf(a) - strengths.indexOf(b))[0],
    ];

    const compareHands = (a, b) => {
        for (let i = 0; i < 5; ++i) {
            let ac = strengths.indexOf(a[i]);
            let bc = strengths.indexOf(b[i]);
            console.log('cmp', a[i], '=', b[i]);
            if (ac - bc) {
                return ac - bc;
            }
        }
        console.log('same');
        return 0;
    };

    let bids = []
    for (const [hand, bidS] of data.lines().map(l => l.split(' '))) {
        const bid = +bidS;
        let handIndex;
        let handValue;
        for (let index in handFns) {
            index = +index;
            if (handValue = handFns[index](hand)) {
                handIndex = index;
                break;
            }
        }
        bids.push({hand, handIndex, handValue, bid});
        console.log('hand      =', hand);
        console.log('handIndex =', handIndex);
        console.log('handValue =', handValue);
        console.log('bid       =', bid);
    }
    //bids.sort((a, b) => (b.handIndex * 16 + strengths.indexOf(b.handValue)) - (a.handIndex * 16 + strengths.indexOf(a.handValue)));
    bids.sort((a, b) => (b.handIndex - a.handIndex) || compareHands(b.hand, a.hand));
    console.log(bids);
    console.log(bids.map((v, i) => v.bid * (i + 1)).sum())
    console.log('cmp', ['A', '5'].sort((a, b) => compareHands(a, b)));
};

const names = [
    'Five of a kind',
    'Four of a kind',
    'Full house',
    'Three of a kind',
    'Two pair',
    'One pair',
    'High card',
];

// 57:21
const partTwo = () => {
    const strengths = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
    const handFns = [
        //Five of a kind, where all five cards have the same label: AAAAA
        (h) => {
            let counts = h.split``.counts();
            for (const v of Object.values(counts)) {
                if (v === 5 || counts.J && counts.J + v === 5) {
                    return true;
                }
            }
            return false;
        },
        //Four of a kind, where four cards have the same label and one card has a different label: AA8AA
        (h) => {
            let counts = h.split``.counts();
            console.log('4kind', h, counts);
            for (const k of Object.keys(counts)) {
                const v = counts[k];
                if (v === 4 || k !== 'J' && counts.J && counts.J + v === 4) {
                    return true;
                }
            }
            return false;
        },
        //Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
        (h) => {
            let counts = h.split``.counts();
            let three = undefined;
            let two = undefined;
            for (const k of Object.keys(counts)) {
                const v = counts[k];
                if (v === 3 || k !== 'J' && counts.J && counts.J + v === 3) {
                    console.log('FH:', 'pair', k);
                    counts.J && (counts.J -= 3 - v);
                    two = k;
                } else if (v === 2 || k !== 'J' && counts.J && counts.J + v === 2) {
                    console.log('FH:', 'trip', k);
                    counts.J && (counts.J -= 2 - v);
                    three = k;
                }
            }
            if (three !== undefined && two !== undefined) {
                return three;
            }
            return false;
        },
        //Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
        (h) => {
            let counts = h.split``.counts();
            for (const k of Object.keys(counts)) {
                const v = counts[k];
                if (v === 3 || k !== 'J' && counts.J && counts.J + v === 3) {
                    return true;
                }
            }
            return false;
        },
        //Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
        (h) => {
            let counts = h.split``.counts();
            let pairs = [];
            for (const k of Object.keys(counts)) {
                const v = counts[k];
                if (v === 2 || k !== 'J' && counts.J && counts.J + v >= 2) {
                    counts.J && (counts.J -= 2 - v);
                    pairs.push(k);
                }
            }
            return pairs.length >= 2;
        },
        //One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
        (h) => {
            let counts = h.split``.counts();
            for (const v of Object.values(counts)) {
                if (v === 2 || counts.J && counts.J + v === 2) {
                    return true;
                }
            }
            return false;
        },
        //High card, where all cards' labels are distinct: 23456
        (_) => true,
    ];

    const compareHands = (a, b) => {
        for (let i = 0; i < 5; ++i) {
            let ac = strengths.indexOf(a[i]);
            let bc = strengths.indexOf(b[i]);
            console.log('cmp', a[i], '=', b[i]);
            if (ac - bc) {
                return ac - bc;
            }
        }
        console.log('same');
        return 0;
    };

    let bids = []
    for (const [hand, bidS] of data.lines().map(l => l.split(' '))) {
        const bid = +bidS;
        let handIndex;
        let handValue;
        for (let index in handFns) {
            index = +index;
            if (handValue = handFns[index](hand)) {
                handIndex = index;
                break;
            }
        }
        bids.push({hand, handIndex, handClass: names[handIndex], bid});
        console.log('hand      =', hand);
        console.log('handIndex =', handIndex);
        console.log('bid       =', bid);
    }
    //bids.sort((a, b) => (b.handIndex * 16 + strengths.indexOf(b.handValue)) - (a.handIndex * 16 + strengths.indexOf(a.handValue)));
    bids.sort((a, b) => (b.handIndex - a.handIndex) || compareHands(b.hand, a.hand));
    console.log(bids);
    console.log(bids.map((v, i) => v.bid * (i + 1)).sum())
    console.log('cmp', ['A', '5'].sort((a, b) => compareHands(a, b)));
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	//time(partOne);
    time(partTwo);
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	//time(partOne);
    time(partTwo);
}
