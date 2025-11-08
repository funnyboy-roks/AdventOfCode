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

func thing(ls: seq[string]): State =
  for y in 0..<ls.len:
    for x in 0..<ls[y].len:
      if ls[y][x] == '^':
        return State(x:x, y:y, facing: Up)

proc is_loop(ls: var seq[string]): bool =
  var dude = thing(ls)
  var history = initHashSet[State]()

  while true:
    var found = false
    case dude.facing:
      of Up:
        for y in countdown(dude.y-1, 0):
          if ls[y][dude.x] == '#':
            dude.y = y + 1
            dude.facing = Right
            found = true
            break
          ls[y][dude.x] = 'x'
      of Down:
        for y in dude.y..<ls.len:
          if ls[y][dude.x] == '#':
            dude.y = y - 1
            dude.facing = Left
            found = true
            break
          ls[y][dude.x] = 'x'
      of Left:
        for x in countdown(dude.x-1, 0):
          if ls[dude.y][x] == '#':
            dude.x = x + 1
            dude.facing = Up
            found = true
            break
          ls[dude.y][x] = 'x'
      of Right:
        for x in dude.x..<ls[0].len:
          if ls[dude.y][x] == '#':
            dude.x = x - 1
            dude.facing = Down
            found = true
            break
          ls[dude.y][x] = 'x'

    if not found:
      return false

    if history.contains(dude):
      return true

    history.incl(dude)

  return false

# update ls
discard is_loop ls

var count = 0
for y in 0..<ls.len:
  for x in 0..<ls[y].len:
    if ls[y][x] == 'x':
      var ls2 = content.strip().split('\n')
      ls2[y][x] = '#'
      if is_loop ls2:
        count += 1

echo count
