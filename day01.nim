import strutils

proc part1() =
  let f = open "input/day01.txt"
  defer: f.close()
  let text = f.readAll
  let lines = text.splitLines false
  var sum = 0;
  for line in lines:
    if line.len == 0: continue
    var first: char = '\0';
    var last: char = '\0';
    for c in line:
      if c.is_digit and first == '\0': first = c
      if c.is_digit: last = c
    let num = (int(first) - int('0')) * 10 + (int(last) - int('0'));
    sum += num
  echo "sum = ", sum

let nums = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine"
];

proc part2() =
  let f = open "input/day01.txt"
  defer: f.close
  let text = f.readAll
  let lines = text.splitLines false
  var sum = 0;
  for line in lines:
    if line.len == 0: continue

    var first = -1;
    
    for i, _ in line.pairs:
      let s = line[i..^1]
      for i, num in nums.pairs:
        if s.starts_with num:
          first = i + 1
          break
        elif s[0].is_digit:
          first = int(s[0]) - int('0')
          break
      if first != -1: break

    var last = -1;
    for i, _ in line.pairs:
      let s = line[0..^(i + 1)]
      for i, num in nums.pairs:
        if s.ends_with num:
          last = i + 1
          break
        elif s[^1].is_digit:
          last = int(s[^1]) - int('0')
          break
      if last != -1: break
    let num = first * 10 + last;
    sum += num
  echo "sum = ", sum

when isMainModule:
  part1()
  part2()
