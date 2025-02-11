import Data.Hash.MD5 (Str (Str), md5s)
import Data.List
import Data.List.Extra (sort, trim, wordsBy)
import Data.Set (fromList, toList)
import Data.String.Utils (startswith)

input = readFile "input/day06.txt"

type Coord = (Int, Int)

data State = On Coord Coord | Off Coord Coord | Toggle Coord Coord

coord :: String -> Coord
coord s = do
  let x = map read $ wordsBy (== ',') s
  (head x, last x)

parseState s = do
  let (x : y : xs) = words s
  case (x, y) of
    ("turn", "on") -> On (coord $ head xs) (coord $ last xs)
    ("turn", "off") -> Off (coord $ head xs) (coord $ last xs)
    ("toggle", _) -> Toggle (coord y) (coord $ last xs)

instance Show State where
  show (On x y) = "On " ++ show x ++ show y
  show (Off x y) = "Off " ++ show x ++ show y
  show (Toggle x y) = "Toggle " ++ show x ++ show y

contains (lx,ly) (hx,hy) (x,y) = lx <= x && ly <= y && hx >= x && hy >= y

isLit :: [State] -> Coord -> Bool
isLit [] c = False
isLit (Toggle low high:ss) c
  | contains low high c = not $ isLit ss c
  | otherwise = isLit ss c
isLit (On low high:ss) c
  | contains low high c = True
  | otherwise = isLit ss c
isLit (Off low high:ss) c
  | contains low high c = False
  | otherwise = isLit ss c

grid = [(x, y) | x <- [0..999], y <- [0..999]]

brightness :: [State] -> Coord -> Int
brightness [] c = 0
brightness (Toggle low high:ss) c
  | contains low high c = brightness ss c + 2
  | otherwise = brightness ss c
brightness (On low high:ss) c
  | contains low high c = brightness ss c + 1
  | otherwise = brightness ss c
brightness (Off low high:ss) c
  | contains low high c = max 0 $ brightness ss c - 1
  | otherwise = brightness ss c

main :: IO ()
main = do
  x <- input
  let y = trim x
  let states = map parseState $ wordsBy (== '\n') y
  print $ length $ filter (isLit (reverse states)) grid
  print $ sum $ map (brightness (reverse states)) grid
