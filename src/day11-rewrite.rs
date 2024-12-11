use std::collections::HashMap;
use std::fs;

fn run(stones: &[u64], depth: u64) -> u64 {
    fn rec(stone: u64, depth: u64, memo: &mut HashMap<(u64, u64), u64>) -> u64 {
        if let Some(val) = memo.get(&(stone, depth)) {
            return *val;
        }
        if depth == 0 {
            return 1;
        };
        if stone == 0 {
            let val = rec(1, depth - 1, memo);
            memo.insert((stone, depth), val);
            return val;
        }
        let s = stone.ilog10() + 1;
        if s % 2 == 0 {
            let exp = 10u64.pow(s as u32 / 2);
            let a = stone / exp;
            let b = stone % exp;
            let val = rec(a, depth - 1, memo) + rec(b, depth - 1, memo);
            memo.insert((stone, depth), val);
            return val;
        }
        let val = rec(stone * 2024, depth - 1, memo);
        memo.insert((stone, depth), val);
        val
    }
    let mut map = HashMap::new();
    stones.iter().map(|s| rec(*s, depth, &mut map)).sum()
}

fn main() {
    let s = fs::read_to_string("input/day11.txt").unwrap();
    let stones: Vec<_> = s.split_whitespace().map(|s| s.parse().unwrap()).collect();

    // part one
    let start = std::time::SystemTime::now();
    let ret = run(&stones, 25);
    let elapsed = start.elapsed().unwrap();
    println!("ret = {}", ret);
    println!("{}µs", elapsed.as_micros());

    // part two
    let start = std::time::SystemTime::now();
    let ret = run(&stones, 75);
    let elapsed = start.elapsed().unwrap();
    println!("ret = {}", ret);
    println!("{}µs", elapsed.as_micros());
}
