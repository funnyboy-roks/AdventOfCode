import { readFileSync } from 'fs';

export const load = (day: Number): string => {
    const d = (day + '').padStart(2, '0');
    return readFileSync(`../input/day${d}.txt`, 'utf-8').trim();
}

export const loadLines = (day: Number): string[] => {
    return load(day).split('\n');
}