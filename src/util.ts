import { JSDOM } from 'jsdom';
import './util/prototype-shenanigans.js';
import { existsSync } from 'node:fs';
import env from '../.env.js';
import process from 'node:process';

import V from './util/Vec.ts';
import clipboard from 'clipboardy';
export const Vec = V;

const day = +Deno.mainModule.match(/.+?(\d+)(.*)\.js$/i)![1];
const year = new Date().getFullYear();

const exists = async (file: string) => {
    try {
        await Deno.lstat(file);
        return true;
    } catch (err) {
        if (!(err instanceof Deno.errors.NotFound)) {
            throw err;
        }
    }
    return false;
};

export const read = async (dayArg: number = day): Promise<string> => {
	const d = (dayArg + '').padStart(2, '0');
	const path = `input/day${d}.txt`;
	if (!await exists(path)) {
		console.log(`Downloading Day ${dayArg} input`);

		const res = await fetch(`https://adventofcode.com/${year}/day/${dayArg}/input`, {
			headers: {
				Cookie: `session=${env.cookie.trim()}`,
				'User-Agent': 'https://github.com/funnyboy-roks/AdventOfCode by funnyboyroks@gmail.com',
			},
		});

		if (res.status === 404) {
            console.error('This day has not started yet!');
            process.exit(1);
        }

		const text = (await res.text()).trim();
        await Deno.mkdir('input', { recursive: true });
		await Deno.writeTextFile(path, text);
		return text;
	}
	return (await Deno.readTextFile(path)).trim();
};

export const readEx = async (): Promise<string> => {
	const d = (day + '').padStart(2, '0');
	const path = `input/day${d}-ex.txt`;
	if (!existsSync(path)) {
		console.log(`Downloading Day ${day} example input`);

		const res = await fetch(`https://adventofcode.com/${year}/day/${day}`, {
			headers: {
				Cookie: `session=${env.cookie.trim()}`,
				'User-Agent': 'https://github.com/funnyboy-roks/AdventOfCode by funnyboyroks@gmail.com',
			},
		});

		if (res.status === 404) {
            console.error('This day has not started yet!');
            process.exit(1);
        }
		const text = (await res.text()).trim();

		const dom = new JSDOM(text);
		const ex = dom.window.document.querySelector('pre code');
		const { textContent } = ex;
		console.log(textContent);
        await Deno.mkdir('input', { recursive: true });
		if (textContent) await Deno.writeTextFile(path, textContent);
		else {
            console.error('Invalid Text Content from', ex);
            process.exit(1);
        }
		return textContent.trim();
	}
	return (await Deno.readTextFile(path)).trim();
};

export const createMatrix = (width: number, height: number, defaultValueCreator = (_x: number, _y: number) => 0) => {
	return new Array(height).fill(0).map((y) => new Array(width).fill(0).map((x) => defaultValueCreator(x, y)));
};

export const copy = (text: string) => {
	clipboard.writeSync(text);
};

export const time = (fn: () => void) => {
    const start = new Date().valueOf();
    fn();
    const elapsed = new Date().valueOf() - start;

    console.log(`elapsed: ${elapsed}ms`);
};
