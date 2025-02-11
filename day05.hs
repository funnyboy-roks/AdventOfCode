import Data.Hash.MD5 (Str (Str), md5s)
import Data.List
import Data.List.Extra (sort, trim, wordsBy)
import Data.Set (fromList, toList)
import Data.String.Utils (startswith)

input = readFile "input/day05.txt"

has3Vowel 3 _ = True
has3Vowel _ "" = False
has3Vowel n (x : xs)
  | x `elem` "aeiou" = has3Vowel (n + 1) xs
  | otherwise = has3Vowel n xs

hasDouble [x] = False
hasDouble [] = False
hasDouble (x : y : xs)
  | x == y = True
  | otherwise = hasDouble (y:xs)

hasBad "" = False
hasBad [x] = False
hasBad (x : y : s)
  | [x, y] `elem` ["ab", "cd", "pq", "xy"] = True
  | otherwise = hasBad (y : s)

check1 n = has3Vowel 0 n && hasDouble n && not (hasBad n)

hasPair _ [] = False
hasPair _ [x] = False
hasPair pair (x:y:xs)
  | pair == [x,y] = True
  | otherwise = hasPair pair (y:xs)

hasDoublePair [] = False
hasDoublePair [x] = False
hasDoublePair (x:y:cs)
  | hasPair [x,y] cs = True
  | otherwise = hasDoublePair (y:cs)

hasSpacedRepeat [] = False
hasSpacedRepeat [x] = False
hasSpacedRepeat [x,y] = False
hasSpacedRepeat (x:y:z:xs)
  | x == z = True
  | otherwise = hasSpacedRepeat (y:z:xs)

main :: IO ()
main = do
  x <- input
  let y = trim x

  print $ length $ filter check1 (words x)
  print $ length $ filter (\x -> hasDoublePair x && hasSpacedRepeat x) $ words x
