fs = require('fs');
utils = require('../utils');
let data = fs.readFileSync('input.txt', 'utf8');
console.log('-= Data Loaded =-');

let foundBags = [];
function countBags(rules, bags) {
	let outArr = [];
	for (let bag of bags) {
		for (let key in rules) {
			if (Object.keys(rules[key]).includes(bag)) {
				outArr.push(key);
			}
		}
	}

	foundBags.push(...new Set(outArr));

	if (outArr.length > 0) {
		return countBags(rules, [...new Set(outArr)]);
	}
	return outArr;
}

/**
 * The function that runs the whole thing
 * @param {String} bag The type of bag to search for in the rules
 */
function bagFitting(bag = 'shiny gold') {
	let rules = {};
	for (let rule of data.split('\n')) {
		// Does all of parsing for the rules, puts them into the `rules` object
		if (rule.includes('no other bags.')) {
			// console.log('Skipping "', rule, '"')
			continue;
		}

		const [outerBag, fits] = rule
			.replace(/ bags?[.,] /g, ',')
			.split('bags contain')
			.map((x) => x.trim());

		let ruleObj = {};

		for (let fit of fits.split(',')) {
			let [count, col1, col2] = fit.trim().split(' ');
			let colour = col1 + ' ' + col2;
			ruleObj[colour] = +count;
		}
		rules[outerBag] = ruleObj;
		// break;
	}

	countBags(rules, [bag]);
	console.log([...new Set(foundBags)].length);
}

bagFitting();
