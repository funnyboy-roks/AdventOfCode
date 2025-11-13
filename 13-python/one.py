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
        (int(px), int(py)),
    ]

lines = list(map(split_indiv, s.strip().split('\n\n')))

sum = 0
for [(ax, ay), (bx, by), (px, py)] in lines:
    # [a, b] = numpy.linalg.solve([[ax, bx], [ay, by]], [px, py])
    # print([a, b])
    # if abs(int(a) - a) < 1e-6 and abs(int(b) - b) < 1e-6 and a <= 100 and b <= 100:
    #     sum += 3*a + 1*b
    for i in range(0, 100):
        if i*ax > px or i*ay > py:
            break
        for j in range(0, 100):
            if i*ax + j*bx != px or i*ay + j*by != py:
                continue
            sum += i*3 + j*1

print(sum)

