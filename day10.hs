import Data.Int
import Data.List
import Data.List.Extra (sort, trim, wordsBy)
import Data.String.Utils (startswith)

input = readFile "input/day10.txt"

prefix :: String -> (Char, Int)
prefix "" = ('x', 0)
prefix [x] = (x, 1)
prefix (x:y:xs)
  | x == y = (x, 1 + snd (prefix (y:xs)))
  | x /= y = (x, 1)

step :: String -> String
step "" = ""
step s = case prefix s of
  (_, 0) -> ""
  t@(_, n) -> fuckYou t ++ step (drop n s)

stepn :: Int -> String -> String
stepn 0 s = s
stepn n s = stepn (n - 1) $ step s

fuckYou (x, n) = show n ++ [x]

main :: IO ()
main = do
  x <- input
  print $ length $ stepn 40 $ trim x
  print $ length $ stepn 50 $ trim x
