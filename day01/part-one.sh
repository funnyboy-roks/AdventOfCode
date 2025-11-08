#!/bin/sh
# usage: ./part-one.sh <file>

file=$1

if [ -z $file ]; then
    echo "Usage: $1 <file>" >&2
    exit 1
fi

IFS=$'\n' left=($(cat $file | awk -F'   ' '{ print $1 }' | sort))
IFS=$'\n' right=($(cat $file | awk -F'   ' '{ print $2 }' | sort))

sum=0
for i in ${!left[@]}; do
    let diff=(${left[i]} - ${right[i]})
    let sum+=${diff#-}
done

echo $sum
