import Data.List.Extra (wordsBy, sort, trim)
import Data.Set (toList, fromList)

input = readFile "input/day3.txt"

add (x, y) (a, b) = (x + a, y + b)

dir '<' = (-1, 0)
dir '>' = ( 1, 0)
dir 'v' = ( 0, 1)
dir '^' = ( 0,-1)

walk :: [Char] -> [(Int, Int)] -> [(Int, Int)]
walk [] curr = curr
walk (x:xs) curr = walk xs (add (dir x) (head curr) : curr)

walk2 :: [Char] -> [(Int, Int)] -> [(Int, Int)]
walk2 [] curr = curr
walk2 (x:y:xs) curr@(cx:cy:_) = walk2 xs (add (dir x) cx : add (dir y) cy : curr)

unique n = toList $ fromList n

main :: IO ()
main = do
    x <- input
    print $ length $ unique $ walk (trim x) [(0, 0)]
    print $ length $ unique $ walk2 (trim x) [(0, 0), (0, 0)]
