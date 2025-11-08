module Main where

import System.Environment
import Data.List.Split

tup2 :: [String] -> (Int, [Int])
tup2 [x, y] = (read x, map read $ words y)
tup2 _ = error "hi"

options1 :: Int -> [Int] -> [Int]
options1 0 (x:xs) = options1 x xs
options1 curr [] = [curr]
options1 curr (x:xs) = options1 (curr*x) xs ++ options1 (curr+x) xs

part1 :: [(Int, [Int])] -> Int
part1 items = sum $ map fst $ filter snd $ map (\(a, b) -> (a, (/= 0) $ length $ filter (== a) $ options1 0 b)) items



options2 :: Int -> [Int] -> [Int]
options2 0 (x:xs) = options2 x xs
options2 curr [] = [curr]
options2 curr (x:xs) = options2 (curr*x) xs ++ options2 (curr+x) xs ++ options2 (read $ show curr ++ show x) xs

part2 :: [(Int, [Int])] -> Int
part2 items = sum $ map fst $ filter snd $ map (\(a, b) -> (a, (/= 0) $ length $ filter (== a) $ options2 0 b)) items

main :: IO ()
main = do
  content <- getArgs >>= readFile . last
  let items = map (tup2 . splitOn ": ") $ lines content in do
    putStrLn $ "Part 1: " ++ show (part1 items)
    putStrLn $ "Part 2: " ++ show (part2 items)
