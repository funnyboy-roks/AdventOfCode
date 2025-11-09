#set table(
  stroke: (x, y) => if y == 0 {
    (bottom: 0.7pt + black)
  } else { 
    (
      bottom: .1pt + black,
      left: if x == 0 { none } else {
        .1pt + black
      }
    )
  },
  fill: (x, y) => if calc.rem(y, 2) == 1 {
    rgb(0, 0, 255, 0x11)
  }
)

#let s(x, y) = str(x) + "," + str(y)
#let text = read(sys.inputs.file);
#let grid = text.trim().split("\n");
#let height = grid.len();
#let width = grid.at(0).len();
#let valid(x, y, curr) = 0 <= x and x < width and 0 <= y and y < height and grid.at(y).at(x) == curr
#let validpt((x, y), curr) = valid(x, y, curr)

#let regions = {
  let fill(x, y, touched) = {
    if s(x, y) in touched {
      return none;
    }

    let curr = grid.at(y).at(x);
    touched.insert(s(x, y), curr);

    let pts = ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1));

    let region = ((x, y),);
    let perim = 0;
    let op = 0;
    let perims = (:);
    for (px, py) in pts {
      if valid(px, py, curr) {
        if not (s(px, py) in touched) {
          let val = fill(px, py, touched)
          if val == none { continue }
          region += val.region;
          perim += val.perim;
          touched += val.touched;
        }
      } else {
        perim += 1;
      }
    }

    (
      curr: curr,
      touched: touched,
      region: region,
      perim: perim,
    )
  }

  let regions = ();
  let touched = (:);
  for y in range(0, height) {
    for x in range(0, width) {
      if not (s(x, y) in touched) {
        let val = fill(x, y, touched)
        touched += val.touched;
        regions.push((
          symbol: val.curr,
          area: val.region.len(),
          perim: val.perim,
          points: val.region,
        ))
      }
    }
  }

  regions
}

#let UP = (0, -1)
#let RIGHT = (1, 0)
#let DOWN = (0, 1)
#let LEFT = (-1, 0)

// each direction must be a right turn
#let directions = (UP, RIGHT, DOWN, LEFT)
#let corner-dirs = (1, -1).map(n => ((n, n), (-n, n))).reduce((a, b) => a + b);
#let add((x, y), (dx, dy)) = (x + dx, y + dy);
#let turn-right(curr) = directions.at(calc.rem(directions.position(d => curr == d) + 1, directions.len()))
#let turn-left(curr) = directions.at(calc.rem(directions.position(d => curr == d) - 1 + directions.len(), directions.len()))

#let sides(region) = {
  let named(dir) = {
    if dir == UP { "up" }
    else if dir == DOWN { "down" }
    else if dir == LEFT { "left" }
    else if dir == RIGHT { "right" }
    else { panic() }
  };

  let x = ();
  let corners = 0;
  for pt in region.points {
    if (directions + corner-dirs).filter(d => not validpt(add(pt, d), region.symbol)) == 0 {
      continue;
    }

    let open = (:);
    open.up = not validpt(add(pt, UP), region.symbol)
    open.down = not validpt(add(pt, DOWN), region.symbol)
    open.left = not validpt(add(pt, LEFT), region.symbol)
    open.right = not validpt(add(pt, RIGHT), region.symbol)
    let sides = directions.filter(x => not open.at(named(x)));
    let open-corners = corner-dirs.filter(dir => not validpt(add(pt, dir), region.symbol));
    x += ((pt:pt,sides:sides, open-corners:open-corners),)

    if sides.len() == 4 and open-corners.len() == 0 { continue; }

    if sides.len() == 4 or sides.len() == 0 {
      corners += corner-dirs.filter(d => not validpt(add(pt, d), region.symbol)).len();
    } else if sides.len() == 3 {
      let left = sides.at(0);
      while not open.at(named(turn-left(left))) {
        left = turn-left(left);
      }

      if not validpt(add(pt, add(left, turn-right(left))), region.symbol) {
        corners += 1;
      }
      if not validpt(add(pt, add(turn-right(left), turn-right(turn-right(left)))), region.symbol) {
        corners += 1;
      }
    } else if sides.len() == 2 {
      if sides.at(0) != turn-left(turn-left(sides.at(1))) {
        corners += 1;
      }
      let d = add(sides.at(0), sides.at(1));
      if not validpt(add(pt, d), region.symbol) {
        corners += 1;
      }
    } else if sides.len() == 1 {
      corners += 2;
    }
  }

  corners
}

= Grid
#raw(block: true, grid.join("\n"))

= Regions

#table(
  columns: (auto, auto, auto, auto),
  table.header([Symbol], [Area], [Perimeter], [Sides]),
  ..regions.map((r) => (raw(r.symbol), [#r.area], [#r.perim], [#sides(r)])).flatten()
)

= Part 1
#regions.map((r) => r.area * r.perim).sum()

= Part 2
#regions.map((r) => r.area * sides(r)).sum()

