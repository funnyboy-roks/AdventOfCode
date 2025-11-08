type Grid = Array[Array[Int]]

class Point(val x: Int, val y: Int):
  override def toString: String = s"($x, $y)"
  def +(other: Point): Point = Point(this.x + other.x, this.y + other.y)
  override def equals(o: Any) = o match {
    case other: Point => other.x == this.x && other.y == this.y
    case _ => false
  }
  override def hashCode = (this.x, this.y).hashCode
end Point

object Point {
  def unapply(self: Point) = Some(self.x, self.y)
}

def gridPositions(grid: Grid) =
  for y <- 0 until grid.length
      x <- 0 until grid(y).length
      if grid(y)(x) == 0
  yield Point(x, y)

def onGrid(pt: Point, grid: Grid) = 0 <= pt.y && pt.y < grid.length && 0 <= pt.x && pt.x < grid(0).length

def getPosition(pt: Point, grid: Grid) =
  if onGrid(pt, grid) then grid(pt.y)(pt.x)
  else throw new RuntimeException(s"Off of grid: $pt")

def getPath(pt: Point, grid: Grid): Seq[Point] =
  val Point(x, y) = pt;
  if !onGrid(pt, grid) then List()
  else if getPosition(pt, grid) == 9 then List(pt)
  else List(Point(0, 1), Point(0, -1), Point(1, 0), Point(-1, 0))
    .map(pt + _)
    .filter(onGrid(_, grid))
    .filter(getPosition(_, grid) == getPosition(pt, grid) + 1)
    .flatMap(getPath(_, grid))

@main
def main(path: String) =
  val lines = scala.io.Source.fromFile(path).mkString.split('\n')
  val grid = lines.map(_.chars.map(_ - '0').toArray).toArray
  println(gridPositions(grid).map(getPath(_, grid).toSet.size).sum)
  println(gridPositions(grid).map(getPath(_, grid).length).sum)
