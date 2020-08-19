# [Shaken Not Made](#shaken)
## Better Glue Code using Haskell and Shake

Arjen Rouvoet -- August 19 2020

---

Recently, I prepared an [artifact](https://github.com/metaborgcube/java.mstx)
for a conference. This artifact consisted of some software packages and a test
suite, which was animated using a makefile and a bash script.  As is often the
case, this bit of shell script started out modest, but over time grew out into a
significant bit of software.  Not huge, but big enough to be considered more
than glue code.  This soon turns into a maintenance burden (if not nightmare),
exemplified best by bugs caused by different versions of shell utilities between
linuxes and macs.

There are various ways to dev-op your way out of this. For example, using a
[nix](https://nixos.org/) development shell.  In this blog post I will present
an approach using Haskell and [Shake](https://shakebuild.com/) instead of Bash
and Make.  This way we get all the benefits of a strongly typed language with an
ecosystem of mature packages.

First, I will summarize the task we have to automate.  Of course, these
techniques are applicable to all kinds of tasks!  Then I will present the
Haskell script that does the job.  At the end of this blog post you should have
a good idea of how one automates a bunch of tasks using Shake, and how this
compares to Make and Shell scripting.  This post is not for learning Haskell.

## The Task to Automate

We want to automate the task of running a test suite. The tests consist of a set
of java programs, together with an expectation for the outcome of type checking
these programs using two different type checkers: Javac and Statix. To keep things neat,
we describe the whole test in a single file, formatted like this:

```
STATIX fail some.*regex on the output
JAVAC  fail some.*regex on the output

[p/A.java]
package p;
class A {...}

[p/B.java]
package p;
class B extends A {...}

[...etc]
```

To execute this test, we need to:

1. Parse this format
2. Create a build directory
3. Write the java files to that directory
4. Execute `javac` on the set of java files.
5. Check and record the output of `javac`.
6. Execute `java2aterm` that creates `.aterm` files for every `.java` file.
7. Execute `statix` on the set of `.aterm` files.
8. Check and record the output of `statix`.
9. Check that both executions succeeded, and record the test outcome.

The bash script that we used previously that did most of the work (but did not
support test expectations) was ~150 lines of code. It used `awk` to parse the
test format, and---as is the nature of shell scripting---a lot of other kinds
of text manipulation to accomplish its task. As a result, it was hard to
maintain, hard to stabilize across users, and not very reliable. When anything
goes wrong, running `make clean` and starting over was the recommended way of proceeding.

A complication is that the `java2aterm` parser is very slow, so we want to reuse the aterm on
subsequent test runs *if and only if* the java files did not change---i.e., we
need an _incremental_ test runner. Usually one might use `make` for this, but
the targets are _dynamic_---i.e., one needs to first parse the test file to determine
which java/aterm files to make. Doing this with make requires staging, yielding
a complicated setup.

When we also wanted to add test expectations, to avoid false positives, we decided
it would be better to replace the runner entirely with something more reliable.

## Using Haskell and Shake

How does one make a script more robust, portable, and maintainable? 
My unbiased view on this is simple: you implement it in a language with a strong
type system and a mature package ecosystem. Enter Haskell.
How do we get reliable, incremental test runs? We use a scriptable build system.
Enter Shake.

Shake is like Make, but as an _embedded domain specific language_ (EDSL) in
Haskell.  The main benefit of using a Haskell EDSL is that you can leverage
arbitrary Haskell code (and libraries) to do complicated processing in a typed
manner.  For example, we can use the Parsec parser combinator library to parse
the above test format.  This may initially come across as over engineering. But
the result is a single Haskell script of a mere ~180 lines of Haskell. The 30
line increase in size is due to having more features (supporting test
expectations), _not_ due to overhead of the language!

To accomplish this, we set up a Haskell script as follows (if you want to hack
along, then peek at the Stack setup at the end of this post):

```haskell
(...)

import Development.Shake
import Development.Shake.Command
import Development.Shake.FilePath
import Development.Shake.Util

data Expect = ExpectOK | ExpectFail String deriving Show

data Test = Test
  { path   :: FilePath
  , files  :: [(String, String)] -- filename , contents
  , javac  :: Expect
  , statix :: Expect
  } deriving (Show)

main :: IO ()
main = do
  args <- getArgs
  case args of
    []      -> die "Missing argument: runner <input.test>"
    test:_  -> runTest test
    
runTest :: String -> IO ()
runTest testPath = do
    -- (1) parse test format
    txt        <- pack <$> readFile 
    let result =  parse (parseTest testPath) testPath txt
    test       <- case result of
      Left err   -> die $ "Could not parse test: " <> show err
      Right test -> return test

    -- (2) create java files in build directory
    forM_ (files test) $ \(fname, content) ->
      writeFileChanged (buildDir </> fname) content
    
    -- Let Shake do the remainder of the incremental build
    shake shakeOptions 
      { shakeFiles  = buildDir
      , shakeChange = ChangeDigest
      } 
      rules

buildDir :: String
buildDir = "./_build"

rules :: Test -> Rules ()
rules = _ -- TODO

-- Parser details omitted, but can be implemented using Parsec!
-- No more awk/grep/sed on my watch.
parseTest :: FilePath -> Parsec Text u Test
parseTest path = _
```

The runner has a simple command-line interface that takes a single test as input.
We then parse that test and create the files in a build directory.
Hereby we make use of the Shake utility `writeFileChanged` that only writes the
file if the content is modified. This ensures that the build is incremental.

Then we invoke Shake's main `shake` to do the heavy lifting.
The options we pass sets the directory where shake stores its state to the build
directory, and enables change detection based on digests rather than by
modification times, which is the default (and could also be a fine choice, since
we used `writeFileChanged` anyway).

We now focus on the `rules :: Rules ()` that automate the incremental build, 
and explain the steps inline:

```haskell
rules :: Rules ()
rules Test{ path, files, javac, statix } = do

  -- We compute the location of the java files using a list comprehension:
  let javaFiles  = [ buildDir </> j | (j, _) <- files ]

  -- We then similarly compute the set of aterms from that using the utility `(-<.>)`,
  -- which replaces file extensions:
  let aterms     = [ j -<.> "aterm" | j <- javafiles ]
  
  -- The result of the test will be stored on disk here:
  let result     = buildDir </> "result"
    
  -- Now we inform shake that we want to build the result:
  -- Even before we tell it how it can build this target.
  want [ result ]
  
  (...more to follow)
```  
 
Having informed Shake of what we *want*, we now have to inform it about how to
get it. This is done with make-like rules, as follows:

```haskell
  -- A build rule has a similar structure as a make rule, with the target on the
  -- left of the (%>) combinator. The `out` variable contains the path to write to.
  result %> \out -> do

    -- We always run this rule, so that the test result is always outputted.
    -- This is fine, because it basically just reads back the results of other rules.
    alwaysRerun

    -- We read the output of Javac and Statix.
    -- The use of readFile' informs Shake that these files are dependencies.
    stxRex <- readFile' $ buildDir </> "stx.result"
    stxRex <- readFile' $ buildDir </> "java.result"

    -- Compute the combined result
    let res = resultString $ stxRes == "SUCCESS" && javaRes == "SUCCESS"
    writeFileChanged out res

    -- Output the test result
    liftIO $ putStrLn $ "[" <> res <> "] " <> testPath
```  

This task thus describes how to build `result`, by reading some outputs from
dependencies and combining them into a new output.  Shake has [various
functions](https://hackage.haskell.org/package/shake-0.19.1) for adding
dependencies and invoking shell functions.

The above task depends on the files `{java,stx}.result`, which are produced by
`javac` and `statix` respectively:
    
```haskell
  -- From executing javac we will gather the output (stderr/out) and the result,
  -- i.e., whether it has met our expectation of the run.
  -- Such rules with multiple outputs use the combinator `(&%>)`:
  [ buildDir </> "java.out" , buildDir </> "java.result" ] &%> \[out, res] -> do

    -- We depend on the test and the set of javafiles:
    need [ testPath ]
    need javaFiles

    -- We can then invoke javac using the Shake primitive `cmd`,
    -- which is smart about combining/escaping arguments of various types,
    -- so that we can simply write the following.
    -- We capture the stdout and stderr in a single string `sout` on the LHS:
    (Exit code, Stdouterr sout) <- withVerbosity Verbose $
                                     cmd "javac -d" buildDir javaFiles
                                     
    -- We write the sout to a target file for debugging purposes.
    writeFileChanged out $ sout

    -- We then check the exit code and the output against our test expectation.
    -- And we write the result:
    let result = resultString (checkJavaExpectation javac code sout)
    writeFileChanged res result

    -- Finally we output the result we computed for commandline user:
    liftIO $ putStrLn $ "[JAVA:" <> result <> "] " <> testPath

   
  -- The rule for Statix takes the same shape:
  [ buildDir </> "stx.out" , buildDir </> "stx.result" ] &%> \[out, res] -> do

    -- We depend on the aterms here, which are incrementally produced by a
    -- separate rule below:
    need [ testPath ]
    need aterms
    
    (...)
```

The last task is similar to the `javac` one, except that it depends on some
auxiliary files (the aterms). These can be produced using a globbing rule,
similar to a make rule for `%.aterm`:

```haskell
  -- Rules can glob, just like in make:
  "//*.aterm" %> \out -> do
    let java = out -<.> "java"
    need [ java ]

    -- We again use a command to produce the target.
    -- This time we are not interested in the exitcodes/output, so we use `cmd_`
    cmd_ "java2aterm" java out
``` 
  
The example code used some auxiliary functions, which are just normal Haskell
functions:

```haskell
-- Auxiliary functions
----------------------

resultString :: Bool -> String
resultString ok = if ok then "SUCCESS" else "FAILURE"

-- Yes, you can use haskell libraries to implement these functions!
checkJavaExpectation :: Expect -> ExitCode -> String -> Bool
checkJavaExpectation = (...)
```

This is quite similar to what you would try to do with `make` and shell
scripts. But we were much less prone to making mistakes, because many are ruled
out by the types. We also were able to make use of more powerful libraries to do
the processing we needed to do. This integrates easily in the build system
because the rules are written embedded in Haskell. Finally, this script is
(potentially) much more portable, because we can easily pin down the versions of
libraries and utilities that we depend on using Stack.

## Reproducible and Portable Builds using Stack

To ensure that the build can be reproduced over time, and over different
platforms, we have to pin down our Haskell dependencies (e.g., GHC, Shake, etc).
Usually, people set up a project for this, using Cabal or Stack configurations.
For a single script this is inconvenient, but we can get what we want anyway
using Stack's `ghc` command:

```bash
stack ghc \
  --resolver lts-16.10 \
  --package shake \
  --package regex-base \
  --package regex-tdfa \
  --package (...)
  ./runner.hs
```

That is: we use a given resolver to pin the version of our dependencies.
We then instruct stack to build our script in an environment that includes the
necessary Haskell packages. This creates a `./runner` executable.

## Conclusion

We engineered some glue code for a software artifact using Haskell and Shake,
replacing Bash and Make.  We took good care of our dependencies, just like we
would for the rest of our artifact. This way, we maximize the reproducibility
and portability of the code. And, equally important: we minimize the pain of
getting it to work.

## Acknowledgments (and Apologies)

Thanks to Neil Mitchell for building and maintaining Shake, and for
kindly answering my questions on the Github issue tracker.

Apologies to my colleague [Gabriel](https://gkonat.github.io/), who recently
build a competitive product called [PIE](https://github.com/metaborg/pie).  PIE
has better support for dynamic and transitive dependencies, and does change
driven incremental builds, which are really cool features. However, unlike Shake
it is not an _embedded_ DSL, which is what I needed for this project.

## References

- [Shake documentation](https://shakebuild.com)
- [Stack documentation](https://docs.haskellstack.org/en/stable/README/)
- [Complete runner.hs](https://github.com/MetaBorgCube/java.mstx/blob/master/tests/runner.hs)
