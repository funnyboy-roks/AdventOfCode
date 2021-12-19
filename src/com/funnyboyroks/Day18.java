package com.funnyboyroks;

import com.funnyboyroks.util.Util;

import java.util.*;
import java.util.stream.IntStream;

public class Day18 {

    public static void main(String[] args) {
        List<SnailNumber> data = Util.values(18, Day18::parse);

        Util.time(() -> {
            System.out.println("Part One: " + partOne(data)); // ##:##
            System.out.println("Part Two: " + partTwo(data)); // ##:##
        });
    }

    public static int partOne(List<SnailNumber> data) {
        Queue<SnailNumber> sums = new LinkedList<>(data.stream().map(SnailNumber::copy).toList());
        SnailNumber sum = sums.poll();
        while (!sums.isEmpty()) {
            sum = sum.add(sums.poll());
        }
        return sum.mag();
    }

    public static int partTwo(List<SnailNumber> data) {
        int max = Integer.MIN_VALUE;
        for (SnailNumber n1 : data) {
            for (SnailNumber n2 : data) {
                if (n1 == n2) continue;
                max = IntStream.of(
                    max,
                    n1.copy().add(n2.copy()).mag(),
                    n2.copy().add(n1.copy()).mag()
                ).max().orElseThrow();
            }
        }
        return max;
    }

    public static SnailNumber parse(String data) {
        if (data.matches("^\\[.+,.+]$")) {
            int comma = getMiddleComma(data);
            return new SnailNumber(
                parse(data.substring(1, comma)),
                parse(data.substring(comma + 1, data.length() - 1))
            );
        }


        return new SnailNumber(Integer.parseInt(data));
    }

    public static int getMiddleComma(String str) {
        int depth = 0;
        for (int i = 0; i < str.toCharArray().length; i++) {
            if (str.charAt(i) == '[') {
                depth++;
            }
            if (str.charAt(i) == ']') {
                depth--;
            }
            if (str.charAt(i) == ',' && depth == 1) {
                return i;
            }
        }
        return -1;

    }

    private static final class SnailNumber {

        public SnailNumber left;
        public SnailNumber right;
        public Integer value;

        public SnailNumber parent;

        public SnailNumber(int value) {
            this.value = value;
        }

        public SnailNumber(SnailNumber left, SnailNumber right) {
            this.left = left;
            this.right = right;

            this.left.parent = this.right.parent = this;
        }

        public int mag() {
            if (isNum()) return value;
            return 3 * left.mag() + 2 * right.mag();
        }

        public void reduce() {
            while (explode() || split()) ;
        }

        public boolean explode() {
            if (!isNum()) {
                if (level() == 4) {
                    nearestDigit(left, -1).ifPresent(sn -> sn.value += left.value);
                    nearestDigit(right, 1).ifPresent(sn -> sn.value += right.value);
                    left = right = null;
                    value = 0;
                    return true;
                } else {
                    return left.explode() || right.explode();
                }
            }
            return false;
        }

        public boolean split() {
            if (isNum()) {
                if (value >= 10) {
                    left = new SnailNumber(value / 2);
                    right = new SnailNumber(value / 2 + value % 2);
                    left.parent = right.parent = this;
                    value = null;
                    return true;
                }
            } else {
                return left.split() || right.split();
            }
            return false;
        }

        public int level() {
            if (parent == null) return 0;
            return parent.level() + 1;
        }

        private Optional<SnailNumber> protect(List<SnailNumber> list, int i) {
            return (i < 0 || i >= list.size()) ? Optional.empty() : Optional.of(list.get(i));
        }

        private Optional<SnailNumber> nearestDigit(SnailNumber number, int delta) {
            List<SnailNumber> digits = this.getRoot().getNumbers();
            return protect(digits, digits.indexOf(number) + delta);
        }

        public SnailNumber getRoot() {
            SnailNumber n = this;
            while (n.parent != null) n = n.parent;
            return n;
        }


        public List<SnailNumber> getNumbers() {
            if (isNum()) return List.of(this);
            List<SnailNumber> n = new ArrayList<>();
            n.addAll(left.getNumbers());
            n.addAll(right.getNumbers());
            return n;
        }

        @Override
        public String toString() {
            if (isNum()) return String.valueOf(value);
            return "[" + left + "," + right + "]";
        }

        public SnailNumber add(SnailNumber o) {
            SnailNumber n = new SnailNumber(this, o);
            n.reduce();
            return n;
        }

        public boolean isNum() {
            return value != null;
        }

        public SnailNumber copy() {
            return isNum() ?
                new SnailNumber(this.value) :
                new SnailNumber(this.left.copy(), this.right.copy());
        }
    }

}