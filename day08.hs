import Data.Int
import Data.List
import Data.List.Extra (sort, trim, wordsBy)
import Data.String.Utils (startswith)

input = readFile "input/day08.txt"

decode "\"" = 0
decode ('\\' : '"' : xs) = 1 + decode xs
decode ('\\' : '\\' : xs) = 1 + decode xs
decode ('\\' : 'x' : _ : _ : xs) = 1 + decode xs
decode (_ : xs) = 1 + decode xs

main :: IO ()
main = do
  x <- input
  let y = wordsBy (== '\n') $ trim x
  print $ sum $ map (\x -> length x - decode (tail x)) y
  print $ sum $ map (\x -> length (show x) - length x) y
