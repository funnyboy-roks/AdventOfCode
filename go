#! /bin/sh

if [ $# -lt 1 ]; then
    echo "Usage: ./go <day>" >&2
    exit 1
fi
file="./src/day$(printf "%02d" $1).js"
if [ ! -e $file ]; then
    cp ./src/template.js $file
fi
exec nvim $file
