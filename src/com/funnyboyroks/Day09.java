package com.funnyboyroks;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class Day09 {

    public static void main(String[] args) {
        List<List<Integer>> data = Util.values(9, (s) -> Stream.of(s.split("")).map(Integer::parseInt).toList());

//        List<List<Integer>> data = """
//            2199943210
//            3987894921
//            9856789892
//            8767896789
//            9899965678""".trim().lines().map(s -> Stream.of(s.split("")).map(Integer::parseInt).toList()).toList();

        System.out.println(Util.time(() -> {
            System.out.println(partOne(data)); // 00:16:18
            System.out.println(partTwo(data)); // 01:23:39
        }));
    }

    public static int partOne(List<List<Integer>> data) {
        int sum = 0;
        for (int y = 0; y < data.size(); y++) {
            List<Integer> row = data.get(y);
            for (int x = 0; x < row.size(); x++) {
                int spot = row.get(x);
                boolean smaller = true;
                List<Integer> neighbours = new ArrayList<>();
                for (int i = -1; i < 2; i++) {
                    for (int j = -1; j < 2; j++) {
                        if (Math.abs(i) == Math.abs(j)) {
                            continue;
                        }
                        if (x + i < 0 || x + i >= row.size() || y + j < 0 || y + j >= data.size()) {
                            continue;
                        }
                        if (spot >= data.get(y + j).get(x + i)) {
                            smaller = false;
                            break;
                        } else {
                            neighbours.add(data.get(y + j).get(x + i));
                        }
                    }
                }
                if (smaller) {
                    sum += spot + 1;
                }
            }
        }
        return sum;
    }

    public static int partTwo(List<List<Integer>> data) {
        List<Integer> basins = new ArrayList<>();
        for (int y = 0; y < data.size(); y++) {
            List<Integer> row = data.get(y);
            for (int x = 0; x < row.size(); x++) {
                int spot = row.get(x);
                List<Integer> neighbours = new ArrayList<>();
                for (int i = -1; i < 2; i++) {
                    for (int j = -1; j < 2; j++) {
                        if (Math.abs(i) == Math.abs(j)) {
                            continue;
                        }
                        if (x + i < 0 || x + i >= row.size() || y + j < 0 || y + j >= data.size()) {
                            continue;
                        }
                        neighbours.add(data.get(y + j).get(x + i));
                    }
                }
                if (neighbours.stream().min(Integer::compareTo).orElseThrow() - spot == 1) {
                    basins.add(1 + findBasin(data, x, y));
                }
            }
        }
        return basins.stream().sorted((a, b) -> b - a).limit(3).reduce(1, (a, b) -> a * b); // Print product of top 3
    }

    public static final List<Point> used = new ArrayList<>();

    public static int findBasin(List<List<Integer>> matrix, int x, int y) {
        if (x < 0 || x >= matrix.get(0).size() || y < 0 || y >= matrix.size()) return 0;
        if (used.stream().anyMatch(p -> p.x == x && p.y == y)) return 0;

        used.add(new Point(x, y));
        int sum = 0;
        for (int i = -1; i < 2; i++) {
            for (int j = -1; j < 2; j++) {
                if (Math.abs(i) == Math.abs(j)) {
                    continue;
                }
                int spot;
                try {
                    spot = matrix.get(y + j).get(x + i);
                } catch (IndexOutOfBoundsException e) { // fastest way to check if out of bounds :P
                    continue;
                }
                int finalI = i;
                int finalJ = j;
                if (spot != 9 && used.stream().noneMatch(p -> p.x == x + finalI && p.y == y + finalJ)) {
                    sum += 1 + findBasin(matrix, x + i, y + j);
                }
            }
        }
        return sum;
    }

}