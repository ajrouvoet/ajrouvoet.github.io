#!/bin/bash

stack runhaskell --resolver lts-16.10 --package shake --package directory --package turtle shake.hs $@
