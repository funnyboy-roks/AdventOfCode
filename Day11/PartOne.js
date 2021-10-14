fs = require('fs');
utils = require('../utils');
const rawData = fs.readFileSync('test.txt', 'utf8').replace(/\r/g, '');
console.log('-= Data Loaded =-');

class Seat {
	constructor(status) {
		this.neighbours = [];
		// Layout for ^ will be:
		// 0 1 2
		// 3   4
		// 5 6 7
		this.status = status;
	}
}

function processData(data) {
	// Do some data processing

	let parsedData = [];
	for (let i in data.split('\n')) {
		const line = data.split('\n')[i];
		parsedData.push(line.split('').map((x) => new Seat(x)));
	}

	// for (let x in parsedData) {
	// 	for (let y in parsedData[x]) {
	//         const lCol = parsedData[x-1];
	//         const cCol = parsedData[x  ];
	//         const rCol = parsedData[x+1];
	//         let n0 = lCol && lCol[y-1];
	//         let n1 = cCol && cCol[y-1];
	//         let n2 = rCol && rCol[y-1];
	//         let n3 = lCol && lCol[y  ];
	//         let n4 = rCol && rCol[y  ];
	//         let n5 = lCol && lCol[y+1];
	//         let n6 = cCol && cCol[y+1];
	//         let n7 = rCol && rCol[y+1];

	// 		parsedData[x][y].neighbours = [
	//             n0, n1, n2,
	//             n3,     n4,
	//             n5, n6, n7,
	//         ]
	// 	}
	// }

	return parsedData;
}

function main() {
	const parsedData = processData(rawData);

	// console.log(parsedData.map(x => x.map(y => y.neighbours)));
	fs.writeFile(
		'out.txt',
		utils.array2djoin(parsedData.map((x) => x.map((y) => y.status))),
		(e) => {
			return;
		}
	);

	for (let x in parsedData) {
		for (let y in parsedData[x]) {
			const lCol = parsedData[x - 1];
			const cCol = parsedData[x];
			const rCol = parsedData[x + 1];
			let ns = [];
			ns.push(+Boolean(lCol != null && lCol[y - 1]));
			ns.push(+Boolean(cCol != null && cCol[y - 1]));
			ns.push(+Boolean(rCol != null && rCol[y - 1]));
			ns.push(+Boolean(lCol != null && lCol[y]));
			ns.push(+Boolean(rCol != null && rCol[y]));
			ns.push(+Boolean(lCol != null && lCol[y + 1]));
			ns.push(+Boolean(cCol != null && cCol[y + 1]));
			ns.push(+Boolean(rCol != null && rCol[y + 1]));
			console.log(parsedData[x][y],ns.reduce((a, b) => a + b)
			);

			// break;
		}
		break;
	}
}

main();
