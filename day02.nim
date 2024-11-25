import strutils

proc part1() =
  let f = open "input/day02.txt"
  defer: f.close()
  let text = f.readAll
  let lines = text.splitLines false

  var count = 0;
  for idx, line in lines.pairs:
    if line.len == 0: continue
    let game = (line.split ": ")[1];
    var (red, green, blue) = (0, 0, 0)
    for run in game.split "; ":
      var (r, g, b) = (0, 0, 0)
      for count in run.split ", ":
        let split = count.split " "
        let (n, kind) = (parseInt(split[0]), split[1])
        case kind:
          of "red":
            red = max(red, n)
          of "green":
            green = max(green, n)
          of "blue":
            blue = max(blue, n)
    if red <= 12 and green <= 13 and blue <= 14:
      count += idx + 1
  echo "count = ", count

proc part2() =
  let f = open "input/day02.txt"
  defer: f.close()
  let text = f.readAll
  let lines = text.splitLines false

  var count = 0;
  for idx, line in lines.pairs:
    if line.len == 0: continue
    let game = (line.split ": ")[1];
    var (red, green, blue) = (0, 0, 0)
    for run in game.split "; ":
      for count in run.split ", ":
        let split = count.split " "
        let (n, kind) = (parseInt(split[0]), split[1])
        case kind:
          of "red":
            red = max(red, n)
          of "green":
            green = max(green, n)
          of "blue":
            blue = max(blue, n)
    echo (red, green, blue)
    echo red * green * blue
    count += red * green * blue
  echo "count = ", count

when isMainModule:
  # part1()
  part2()
