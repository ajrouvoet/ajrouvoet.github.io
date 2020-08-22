import System.Exit
import System.Environment
import System.Directory

import Development.Shake hiding ((*>))
import Development.Shake.Command
import Development.Shake.FilePath hiding (FilePath)
import Development.Shake.Util

import Data.Text (Text, pack, unpack, strip)

-- entrypoint

main = do
  [target] <- getArgs
  rules target

findProjectRoot :: IO FilePath
findProjectRoot = do
  path <- getCurrentDirectory
  _findRoot path
  where
    _findRoot :: FilePath -> IO FilePath
    _findRoot p = do
      let root = (p </> ".git")
      exists <- doesPathExist root
      if exists
        then do
          return p
        else
          if p == "/"
          then die "Not in a project"
          else _findRoot (takeDirectory p)

-- rules

rules :: String -> IO ()
rules target = do
  findProjectRoot >>= setCurrentDirectory

  -- some directories
  let srcDir      = "./src"
  let contentDir  = srcDir     </> "content"
  let blogDir     = contentDir </> "blog"

  shake shakeOptions { shakeFiles  = ".shake"
                     , shakeChange = ChangeDigest } $ do

    want [ target ]

    blogDir </> "*.html" %> \out -> do
      let input = out -<.> "md"
      need [ input ]
      (Stdout sout) <- withVerbosity Verbose $
        cmd "pandoc" "-f markdown+header_attributes" "-t html" input
      writeFile' out sout
