fs = require('fs');
utils = require('../utils');
let data = fs.readFileSync('input.txt', 'utf8');
console.log('-= Data Loaded =-');

let max = 0;
let count = 0;
function countBags(rules, bags) {
	let outArr = [];
	let currentLevel = [];
	for (let b of bags) {
		let bag = rules[b];
		for (let contains in bag) {
			for (let i = 0; i < bag[contains]; ++i) {
				currentLevel.push(contains);
			}
		}
	}
	if (currentLevel.length > 0) {
		max = currentLevel.length > max ? currentLevel.length : max;
		count += currentLevel.length;
		return countBags(rules, currentLevel);
	}
	return max;
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

	console.log(countBags(rules, [bag]), count);
}

bagFitting();
