fs = require('fs');
utils = require('../utils');
let data = fs.readFileSync('input', 'utf8');
console.log('-= Data Loaded =-');

const reqFields = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];
const optFields = ['cid'];

const passports = data.split('\n\n');

// console.log(passports);

let count = 0;
for(let x of passports){
    let fields = [];
    x.replace(/\n/g, ' ').split(' ').forEach(y => {
        fields.push(y.split(':')[0]);
    })
    let neededFields = Array.from(reqFields);
    let bad = [];
    console.log(fields);
    let out = 1;
    for(let i = 0; i < neededFields.length; ++i){
        out *= Number(fields.includes(neededFields[i]))
        console.log(Number(fields.includes(neededFields[i])))
        if(!fields.includes(neededFields[i])){
            bad.push(neededFields[i])
        }
    };
    console.log(Boolean(out));
    console.log(bad);
    if(out){
        count ++;

    }

}
console.log(passports.length)
console.log(count);
