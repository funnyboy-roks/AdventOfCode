package com.funnyboyroks;

import java.awt.*;
import java.util.*;
import java.util.List;

public class Day11 {

    public static void main(String[] args) {
        int[][] data = Util.values(11, (s) ->
            Arrays.stream(s.split(""))
                .mapToInt(Integer::parseInt)
                .toArray()
        ).toArray(int[][]::new);

//        data = """
//            5483143223
//            2745854711
//            5264556173
//            6141336146
//            6357385478
//            4167524645
//            2176841721
//            6882881134
//            4846848554
//            5283751526""".lines()
//            .map(String::trim)
//            .map(s -> Arrays.stream(s.split(""))
//                .mapToInt(Integer::parseInt)
//                .toArray()
//            ).toArray(int[][]::new);

//        Util.time(() -> {
//        System.out.println(partOne(data)); // ##:##
            System.out.println(partTwo(data)); // ##:##
//        });
    }

    public static int partOne(int[][] data) {
        int count = 0;
        for (int i = 0; i < 100; ++i) {
            print(data);
            count += cycle(data);
            System.out.printf("--- %d ---%n", count);
        }


        return count;
    }


    public static int partTwo(int[][] data) {
        for (int i = 0; i < 10000; ++i) {
            print(data);
            cycle(data);
            int val = data[0][0];
            boolean good = true;
            for (int[] row : data) {
                for (int n : row) {
                    good &= n == val;
                }
            }
            if (good) {
                return i+1;
            }

            System.out.printf("--- %d ---%n", i+1);
        }


        return -1;
    }

    public static List<Point> flashers(int[][] data) {
        List<Point> flash = new ArrayList<>();
        for (int y = 0; y < data.length; y++) {
            int[] row = data[y];
            for (int x = 0; x < row.length; x++) {
                data[y][x]++;
                if (data[y][x] > 9) {
                    flash.add(new Point(x, y));
                }

            }
        }
        return flash;
    }

    public static List<Point> cycleFlashers(List<Point> flashers, int[][] data) {
        List<Point> flashed = new ArrayList<>();
        while (!flashers.isEmpty()) {
            Point p = flashers.remove(flashers.size() - 1);
            List<Point> ns = neighbours(p, data);
            for (Point n : ns) {
                data[n.y][n.x]++;
                if (data[n.y][n.x] == 10) {
                    flashers.add(n);
                }
            }
            flashed.add(p);
        }
        return flashed;
    }

    public static List<Point> neighbours(Point p, int[][] data) {
        List<Point> ns = new ArrayList<>();
        for (int i = -1; i <= 1; i++) {
            for (int j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }
                int x = p.x + i;
                int y = p.y + j;
                if (x >= 0 && x < data[0].length && y >= 0 && y < data.length) {
                    ns.add(new Point(p.x + i, p.y + j));
                }
            }
        }
        return ns;
    }

    public static int cycle(int[][] data) {
        List<Point> flashers = flashers(data);
        List<Point> flashed = cycleFlashers(flashers, data);
        for (Point f : flashed) {
            data[f.y][f.x] = 0;
        }
        return flashed.size();
    }

    public static void print(int[][] data) {
        for (int[] row : data) {
            for (int n : row) {
                System.out.print(n + " ");
            }
            System.out.println();
        }
    }

}