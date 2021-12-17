package com.funnyboyroks;

import com.funnyboyroks.util.Util;

import java.awt.*;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Day05 {

    public static void main(String[] args) {
        List<String> input = Util.lines(5);

//        input = Arrays.stream(
//            """
//                0,9 -> 5,9
//                8,0 -> 0,8
//                9,4 -> 3,4
//                2,2 -> 2,1
//                7,0 -> 7,4
//                6,4 -> 2,0
//                0,9 -> 2,9
//                3,4 -> 1,4
//                0,0 -> 8,8
//                5,5 -> 8,2""".trim().split("\n")).map(String::trim).collect(Collectors.toList());

        List<List<Integer>> data = input.stream().map((s) -> Arrays.stream(s.split(",|( -> )")).map(Integer::parseInt).collect(Collectors.toList())).collect(Collectors.toList());

        partOne(data); // 22:02
//        partTwo(data); // 27:14
    }

    public static int countMoreThan(int[][] grid, int n) {
        int count = 0;
        for (int[] row : grid) {
            for (int i : row) {
                if (i > n) {
                    count++;
                }
            }
        }
        return count;
    }

    public static void partOne(List<List<Integer>> data) {
        int max = Math.max(
            data.stream().map(l -> Math.max(l.get(0), l.get(2))).max(Integer::compareTo).orElseThrow(),
            data.stream().map(l -> Math.max(l.get(1), l.get(3))).max(Integer::compareTo).orElseThrow()
        );
        System.out.println(max);
        int[][] grid = new int[max + 1][max + 1];
        for (List<Integer> line : data) {
            Point a = new Point(line.get(0), line.get(1));
            Point b = new Point(line.get(2), line.get(3));
            if(a.x == b.x) { // Vert line
                int mi = Math.min(a.y, b.y);
                int ma = Math.max(a.y, b.y);
                for (int i = mi; i <= ma; i++) {
                    grid[i][a.x]++;
                }

            } else if (a.y == b.y) { // Horz line
                int mi = Math.min(a.x, b.x);
                int ma = Math.max(a.x, b.x);
                for (int i = mi; i <= ma; i++) {
                    grid[a.y][i]++;
                }
            }
        }
        System.out.println(Arrays.deepToString(grid).replaceAll("\\[", "\n[").replace('0', '.').replace(", ", ""));
        System.out.println(countMoreThan(grid, 1));
    }

    public static void partTwo(List<List<Integer>> data) {
        int max = Math.max(
            data.stream().map(l -> Math.max(l.get(0), l.get(2))).max(Integer::compareTo).orElseThrow(),
            data.stream().map(l -> Math.max(l.get(1), l.get(3))).max(Integer::compareTo).orElseThrow()
        );
        System.out.println(max);
        int[][] grid = new int[max + 1][max + 1];
        for (List<Integer> line : data) {
            Point a = new Point(line.get(0), line.get(1));
            Point b = new Point(line.get(2), line.get(3));
            if(a.x == b.x) { // Vert line
                int mi = Math.min(a.y, b.y);
                int ma = Math.max(a.y, b.y);
                for (int i = mi; i <= ma; i++) {
                    grid[i][a.x]++;
                }

            } else if (a.y == b.y) { // Horz line
                int mi = Math.min(a.x, b.x);
                int ma = Math.max(a.x, b.x);
                for (int i = mi; i <= ma; i++) {
                    grid[a.y][i]++;
                }
            } else { // Diagonal Line
                boolean down = a.y < b.y;
                boolean right = a.x < b.x;
                int x = a.x;
                int y = a.y;
                while (x != b.x && y != b.y) {
                    grid[y][x]++;
                    y += down ? 1 : -1;
                    x += right ? 1 : -1;
                }
                grid[y][x]++;
            }
        }
        System.out.println(Arrays.deepToString(grid).replaceAll("\\[", "\n[").replace('0', '.').replace(", ", ""));
        System.out.println(countMoreThan(grid, 1));

    }

}
