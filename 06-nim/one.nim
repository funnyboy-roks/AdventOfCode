import std/os
import std/sets
import std/strutils
import system/iterators
import std/sugar
import std/sequtils

type
  Direction = enum Up, Down, Left, Right
  State = object
    x, y: int
    facing: Direction

let content = readFile paramStr(1)
echo content

var ls = content.strip().split('\n')

proc thing(): State =
  for y in 0..<ls.len:
    for x in 0..<ls[y].len:
      if ls[y][x] == '^':
        return State(x:x, y:y, facing: Up)

var dude = thing()
var history = initHashSet[State]()

while true:
  echo dude
  echo history
  case dude.facing:
    of Up:
      for y in countdown(dude.y-1, 0):
        if ls[y][dude.x] == '#':
          dude.y = y + 1
          dude.facing = Right
          echo y
          break
        ls[y][dude.x] = 'x'
    of Down:
      for y in dude.y..<ls.len:
        if ls[y][dude.x] == '#':
          dude.y = y - 1
          dude.facing = Left
          echo y
          break
        ls[y][dude.x] = 'x'
    of Left:
      for x in countdown(dude.x-1, 0):
        if ls[dude.y][x] == '#':
          dude.x = x + 1
          dude.facing = Up
          echo x
          break
        ls[dude.y][x] = 'x'
    of Right:
      for x in dude.x..<ls[0].len:
        if ls[dude.y][x] == '#':
          dude.x = x - 1
          dude.facing = Down
          echo x
          break
        ls[dude.y][x] = 'x'
  if history.contains(dude):
    break;
  history.incl(dude)

echo ls.join("\n")

echo ls.map(x => x.filterIt(it == 'x').len).foldl(a + b)
