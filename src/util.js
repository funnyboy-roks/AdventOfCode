import fs from 'fs/promises';
import './util/bad-but-great.js';
import { existsSync } from 'fs';
import env from '../.env.js';


import V from './util/Vec.js';
export const Vec = V;

/**
 * @param {number} day
 */
export const read = async (day) => {
	let d = (day + '').padStart(2, '0');
	const path = `input/day${d}.txt`;
	if (!existsSync(path)) {
		console.log(`Downloading Day ${day} data`);

		const res = await fetch(`https://adventofcode.com/2022/day/${day}/input`, {
			headers: {
				Cookie: `session=${env.cookie.trim()}`,
				'User-Agent': 'https://github.com/funnyboy-roks/AdventOfCode by funnyboyroks@gmail.com',
			},
		});

		if (res.status === 404) throw new Error('This day has not started yet!');
		const text = (await res.text()).trim();
		fs.writeFile(path, text);
		return text;
	}
	return (await fs.readFile(path, 'utf-8')).trim();
};

export const loadRaw = read;

export const createMatrix = (width, height, defaultValueCreator) => {
	return new Array(height).fill(0).map((n) => new Array(width).fill(0).map(defaultValueCreator));
};
