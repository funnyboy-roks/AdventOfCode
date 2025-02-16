import Data.Char
import Data.Int
import Data.List
import Data.List.Extra (sort, trim, wordsBy)
import Data.String.Utils (startswith)
import Data.Maybe (fromMaybe)

input = do
    x <- readFile "input/day11.txt"
    return $ trim x

hasInc "" = False
hasInc (x : y : z : xs) = ord x + 1 == ord y && ord y + 1 == ord z || hasInc (y : z : xs)
hasInc (x : z : xs) = hasInc (z : xs)
hasInc (x : xs) = hasInc xs

hasBad "" = False
hasBad ('i' : _) = True
hasBad ('o' : _) = True
hasBad ('l' : _) = True
hasBad (_ : xs) = hasBad xs

hasPair [] = False
hasPair [x] = False
hasPair (x : y : xs)
  | x == y = True
  | otherwise = hasPair (y : xs)

hasDoublePair [] = False
hasDoublePair [x] = False
hasDoublePair (x : y : cs)
  | x == y && hasPair cs = True
  | otherwise = hasDoublePair (y : cs)

isValid s = not (hasBad s) && hasInc s && hasDoublePair s

fromString :: String -> Int
fromString [] = 0
fromString [x] = ord x - 97
fromString xs = (ord x - 97) + fromString (init xs) * 26 
  where x = last xs

toString :: Int -> String
toString n = replicate (8 - length x) 'a' ++ x
  where
    rawToString :: Int -> String
    rawToString 0 = ""
    rawToString n = rawToString (n `div` 26) ++ [toEnum ((n `mod` 26) + 97)]
    x = rawToString n

main :: IO ()
main = do
  x <- input
  let z = [fromString x..]
  let part1 = fromMaybe "" $ find isValid $ map toString z
  print part1
  let z = [fromString part1 + 1..]
  let part2 = fromMaybe "" $ find isValid $ map toString z
  print part2
