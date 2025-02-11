import Data.List.Extra (wordsBy, sort)
input = readFile "input/day2.txt"

dims :: String -> [Int]
dims s = map read $ wordsBy (=='x') s

sides [x, y, z] = [x * y, y * z, x * z]

part2 n = sum (map (2*) $ init $ sort n) + product n

area n = sum (map (*2) n) + minimum n

main :: IO ()
main = do
    x <- input
    print $ sum . map (area . sides . dims) $ words x
    print $ sum . map (part2 . dims) $ words x
