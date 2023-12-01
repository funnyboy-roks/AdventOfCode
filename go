#! /bin/sh

file="./src/day$(printf "%02d" $1).js"
if [ ! -e $file ]; then
    cp ./src/template.js $file
fi
nvim $file
