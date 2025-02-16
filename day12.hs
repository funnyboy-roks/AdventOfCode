import Data.Char
import Data.Int
import Data.List
import Data.List.Extra (sort, trim, wordsBy)
import Data.String.Utils (startswith)
import Data.Maybe (fromMaybe, isJust)
import Data.Aeson (decode, Value(..), pairs)
import Data.Aeson.KeyMap qualified as KM
import Data.Vector qualified as V
import Data.ByteString.Lazy qualified as BS
import Data.Aeson.Types (Value)
import Data.Scientific
import Data.Text qualified as T

input = BS.readFile "input/day12.txt"

foo :: BS.ByteString -> Maybe Value
foo = decode

unwrap :: Maybe a -> a
unwrap (Just a) = a

mySum :: Value -> Scientific
mySum (Number x) = x
mySum (Object x) = sum $ map (mySum . snd) $ KM.toList x
mySum (Array x) = sum $ map mySum $ V.toList x
mySum (String _) = 0
mySum (Bool _) = 0

hasRed x = isJust $ find (\x -> snd x == String (T.pack "red")) $ KM.toList x

mySum2 :: Value -> Scientific
mySum2 (Object x)
  | hasRed x = 0
  | otherwise = sum $ map (mySum2 . snd) $ KM.toList x
mySum2 (Array x) = sum $ map mySum2 $ V.toList x
mySum2 (Number x) = x
mySum2 (String _) = 0
mySum2 (Bool _) = 0

main :: IO ()
main = do
  x <- input
  print $ mySum $ unwrap $ foo x
  print $ mySum2 $ unwrap $ foo x
