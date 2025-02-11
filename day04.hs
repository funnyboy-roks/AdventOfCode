import Data.List.Extra (wordsBy, sort, trim)
import Data.Set (toList, fromList)
import Data.Hash.MD5 (md5s, Str (Str))
import Data.String.Utils (startswith)
import Data.List

input = readFile "input/day04.txt"

isGood1 s n = isPrefixOf "00000" $ md5s $ Str (s ++ show n)
isGood2 s n = isPrefixOf "00000" $ md5s $ Str (s ++ show n)

main :: IO ()
main = do
    x <- input
    let y = trim x
    print $ find (isGood1 y) [1..]
    print $ find (isGood2 y) [1..]
