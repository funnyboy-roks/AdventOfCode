import Data.Hash.MD5 (Str (Str), md5s)
import Data.List
import Data.List.Extra (sort, trim, wordsBy)
import Data.Set (fromList, toList)
import Data.String.Utils (startswith)

input = readFile "input/day07.txt"

main :: IO ()
main = do
  x <- input
  let y = wordsBy (== '\n') $ trim x
  print y
