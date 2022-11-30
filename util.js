import fs from 'fs';

/**
 * @param {number} day 
 */
export const raw = (day) => {
    d = day + '';
    d = d.padStart(2, '0');
    return fs.readFileSync(`input/day${d}.txt`, 'utf-8');
}

/**
 * @param {number} day
 * @param {string} sep
 */
export const array = (day, sep = '\n') => {
    const rawData = raw(day);
    return rawData.split(sep);
}

/**
 * @param {number} day
 * @param {string} sep
 */
export const nums = (day, sep = '\n') => {
    return array(day, sep).map(n => +n);
}