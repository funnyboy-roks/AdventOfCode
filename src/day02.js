import { assert_eq, debug, read, readEx, time } from "./util.ts";
import Vec from "./util/Vec.ts";
import "./util/prototype-shenanigans.js";
import "./types.d.ts";

await readEx();
await read();

/** @type string **/
let data;

const partOne = () => {
    const items = data.split(",").map((l) => l.split`-`.map(BigInt));
    let sum = 0n;
    for (const [l, h] of items) {
        for (let i = l; i <= h; ++i) {
            let s = "" + i;
            if (s.substr(0, s.length / 2) == s.substr(s.length / 2)) {
                sum += i;
            }
        }
    }
    console.log(sum);
};

const partTwo = () => {
    const items = data.split(",").map((l) => l.split`-`.map(BigInt));
    let sum = 0n;
    for (const [l, h] of items) {
        for (let i = l; i <= h; ++i) {
            let s = "" + i;
            for (let o = 1; o < s.length; ++o) {
                let s2 = s.substring(0, o);
                if (s == s2.repeat(s.length / s2.length)) {
                    console.log('invalid', i);
                    sum += i;
                    break;
                }
            }
        }
    }
    console.log(sum);
};

if (Deno.args[0]) {
    console.log("Sample Data:");
    data = await readEx();
    console.log(data.lines().map((l) => "    " + l).join`\n`);
} else {
    console.log("Real Data");
    data = await read();
}
console.log("Output:");
time(partOne);
time(partTwo);
