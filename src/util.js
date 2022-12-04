import fs from 'fs/promises';
import { JSDOM } from 'jsdom';
import './util/bad-but-great.js';
import { existsSync } from 'fs';
import env from '../.env.js';

import V from './util/Vec.js';
export const Vec = V;

const day = +process.argv[1].match(/.+?(\d+)\.js$/i)[1];

/**
 * @param {number} dayArg
 */
export const read = async (dayArg = day) => {
	let d = (dayArg + '').padStart(2, '0');
	const path = `input/day${d}.txt`;
	if (!existsSync(path)) {
		console.log(`Downloading Day ${dayArg} input`);

		const res = await fetch(`https://adventofcode.com/2022/day/${dayArg}/input`, {
			headers: {
				Cookie: `session=${env.cookie.trim()}`,
				'User-Agent': 'https://github.com/funnyboy-roks/AdventOfCode by funnyboyroks@gmail.com',
			},
		});

		if (res.status === 404) throw new Error('This day has not started yet!');
		const text = (await res.text()).trim();
		await fs.writeFile(path, text);
		return text;
	}
	return (await fs.readFile(path, 'utf-8')).trim();
};

export const readEx = async () => {
	let d = (day + '').padStart(2, '0');
	const path = `input/day${d}-ex.txt`;
	if (!existsSync(path)) {
		console.log(`Downloading Day ${day} example input`);

		const res = await fetch(`https://adventofcode.com/2022/day/${day}`, {
			headers: {
				Cookie: `session=${env.cookie.trim()}`,
				'User-Agent': 'https://github.com/funnyboy-roks/AdventOfCode by funnyboyroks@gmail.com',
			},
		});

		if (res.status === 404) throw new Error('This day has not started yet!');
		const text = (await res.text()).trim();

		const dom = new JSDOM(text);
		const ex = dom.window.document.querySelector('pre code');
		const { textContent } = ex;
		console.log(textContent);
		if (textContent) await fs.writeFile(path, textContent);
		else throw new Error('Invalid Text Content from ' + ex);
		return textContent.trim();
	}
	return (await fs.readFile(path, 'utf-8')).trim();
};

export const loadRaw = read;

export const createMatrix = (width, height, defaultValueCreator) => {
	return new Array(height).fill(0).map((n) => new Array(width).fill(0).map(defaultValueCreator));
};
