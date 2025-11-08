{-# LANGUAGE CPP #-}
{-# LANGUAGE NoRebindableSyntax #-}
#if __GLASGOW_HASKELL__ >= 810
{-# OPTIONS_GHC -Wno-prepositive-qualified-module #-}
#endif
{-# OPTIONS_GHC -fno-warn-missing-import-lists #-}
{-# OPTIONS_GHC -w #-}
module Paths_x07_haskell (
    version,
    getBinDir, getLibDir, getDynLibDir, getDataDir, getLibexecDir,
    getDataFileName, getSysconfDir
  ) where


import qualified Control.Exception as Exception
import qualified Data.List as List
import Data.Version (Version(..))
import System.Environment (getEnv)
import Prelude


#if defined(VERSION_base)

#if MIN_VERSION_base(4,0,0)
catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
#else
catchIO :: IO a -> (Exception.Exception -> IO a) -> IO a
#endif

#else
catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
#endif
catchIO = Exception.catch

version :: Version
version = Version [0,1,0,0] []

getDataFileName :: FilePath -> IO FilePath
getDataFileName name = do
  dir <- getDataDir
  return (dir `joinFileName` name)

getBinDir, getLibDir, getDynLibDir, getDataDir, getLibexecDir, getSysconfDir :: IO FilePath




bindir, libdir, dynlibdir, datadir, libexecdir, sysconfdir :: FilePath
bindir     = "/home/funnyboy_roks/.cabal/bin"
libdir     = "/home/funnyboy_roks/.cabal/lib/x86_64-linux-ghc-9.6.6/x07-haskell-0.1.0.0-inplace-x07-haskell"
dynlibdir  = "/home/funnyboy_roks/.cabal/lib/x86_64-linux-ghc-9.6.6"
datadir    = "/home/funnyboy_roks/.cabal/share/x86_64-linux-ghc-9.6.6/x07-haskell-0.1.0.0"
libexecdir = "/home/funnyboy_roks/.cabal/libexec/x86_64-linux-ghc-9.6.6/x07-haskell-0.1.0.0"
sysconfdir = "/home/funnyboy_roks/.cabal/etc"

getBinDir     = catchIO (getEnv "x07_haskell_bindir")     (\_ -> return bindir)
getLibDir     = catchIO (getEnv "x07_haskell_libdir")     (\_ -> return libdir)
getDynLibDir  = catchIO (getEnv "x07_haskell_dynlibdir")  (\_ -> return dynlibdir)
getDataDir    = catchIO (getEnv "x07_haskell_datadir")    (\_ -> return datadir)
getLibexecDir = catchIO (getEnv "x07_haskell_libexecdir") (\_ -> return libexecdir)
getSysconfDir = catchIO (getEnv "x07_haskell_sysconfdir") (\_ -> return sysconfdir)



joinFileName :: String -> String -> FilePath
joinFileName ""  fname = fname
joinFileName "." fname = fname
joinFileName dir ""    = dir
joinFileName dir fname
  | isPathSeparator (List.last dir) = dir ++ fname
  | otherwise                       = dir ++ pathSeparator : fname

pathSeparator :: Char
pathSeparator = '/'

isPathSeparator :: Char -> Bool
isPathSeparator c = c == '/'
