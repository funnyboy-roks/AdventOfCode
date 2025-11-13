import sys
import re
import numpy

with open(sys.argv[-1]) as f:
    s = f.read()

def split_indiv(s: str):
    [(ax, ay), (bx, by)] = re.findall(r"Button .: X\+(\d+), Y\+(\d+)", s)
    [(px, py)] = re.findall(r"Prize: X=(\d+), Y=(\d+)", s)
    return [
        (int(ax), int(ay)),
        (int(bx), int(by)),
        (int(px) + 10000000000000, int(py) + 10000000000000),
    ]

lines = list(map(split_indiv, s.strip().split('\n\n')))

sum = 0
for [(ax, ay), (bx, by), (px, py)] in lines:
    [a, b] = numpy.linalg.solve([[ax, bx], [ay, by]], [px, py]).round(2)
    if a.is_integer() and a.is_integer():
        sum += 3*int(a) + 1*int(b)

print(sum)

