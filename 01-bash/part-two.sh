#!/bin/sh
# usage: ./part-two.sh <file>

file=$1

if [ -z $file ]; then
    echo "Usage: $1 <file>" >&2
    exit 1
fi

IFS=$'\n' left=($(cat $file | awk -F'   ' '{ print $1 }' | sort))
IFS=$'\n' right=($(cat $file | awk -F'   ' '{ print $2 }' | sort))

sum=0

for l in ${left[@]}; do
    count=$(printf '%s\n' "${right[@]}" | grep -c $l)
    let sum+=($l*$count)
done

echo $sum
