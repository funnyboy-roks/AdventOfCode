package com.funnyboyroks;

import java.awt.*;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

public class DayThirteen {

    public static void main(String[] args) {
        List<String> rawData = Util.lines(13);

//        rawData = """
//            6,10
//            0,14
//            9,10
//            0,3
//            10,4
//            4,11
//            6,0
//            6,12
//            4,1
//            0,13
//            10,12
//            3,4
//            3,0
//            8,4
//            1,10
//            2,14
//            8,10
//            9,0
//
//            fold along y=7
//            fold along x=5""".lines().map(String::trim).collect(Collectors.toList());

        // ~ Pair<List<Point>, List<Pair<String, Integer>>>
        Map.Entry<List<Point>, List<Map.Entry<String, Integer>>> data = parseData(rawData);

//        Util.time(() -> {
//        System.out.println(run(data.getKey(), data.getValue(), true)); // ##:##
        System.out.println(run(data.getKey(), data.getValue(), false)); // ##:##
//        });
    }

    public static Map.Entry<List<Point>, List<Map.Entry<String, Integer>>> parseData(List<String> data) {
        List<Point> points = new ArrayList<>();
        List<Map.Entry<String, Integer>> directions = new ArrayList<>();

        for (String line : data) {
            if (line.isEmpty()) continue;
            if (line.contains(",")) {
                String[] split = line.split(",");
                points.add(new Point(Integer.parseInt(split[0]), Integer.parseInt(split[1])));
            } else {
                String[] split = line.split(" ");
                split = split[split.length - 1].split("=");
                directions.add(new AbstractMap.SimpleEntry<>(split[0], Integer.parseInt(split[1])));
            }
        }
        return new AbstractMap.SimpleEntry<>(points, directions);
    }

    public static int run(List<Point> points, List<Map.Entry<String, Integer>> directions, boolean partOne) {
        int maxX = (int) points.stream().mapToDouble(Point::getX).max().orElse(0);
        int maxY = (int) points.stream().mapToDouble(Point::getY).max().orElse(0);

//        int[][] grid = new int[maxY + 1][maxX + 1];
        List<List<Integer>> grid = fillGrid(maxX + 1, maxY + 1);
        points.forEach(p -> grid.get(p.y).set(p.x, 1));
//        print(grid);
        System.out.println();

        for (Map.Entry<String, Integer> direction : directions) {
            String axis = direction.getKey();
            int value = direction.getValue();

            switch (axis) {
                case "x" -> {
//                    System.out.println("x -> " + value);
                    List<List<Integer>> removed = verticalSublist(grid, value + 1, grid.get(0).size());
                    removed = Util.mut(removed);
                    removed.forEach(Collections::reverse);
//                    print(removed);
                    removeRight(grid, value);
                    merge(grid, removed);
//                    System.out.println();
                }
                case "y" -> {
                    List<List<Integer>> removed = grid.subList(value + 1, grid.size());
                    removed = Util.mut(removed);
//                    print(removed);
                    grid.subList(value, grid.size()).clear();
//                    System.out.println();
                    Collections.reverse(removed);
//                    print(removed);
                    merge(grid, removed);
                }
            }
            if (partOne) {
                return count(grid); // Remove after one cycle (I assume part 2 is for all directions)
            }
        }
//        System.out.println();
        print(grid);
        return -1;
    }

    public static int count(List<List<Integer>> grid) {
        return grid.stream().flatMapToInt(l -> l.stream().mapToInt(i -> i)).sum();
    }

    public static void removeRight(List<List<Integer>> grid, int start) {
        for (int i = 0; i < grid.size(); i++) {
            grid.set(i, grid.get(i).subList(0, start));
        }
    }

    public static List<List<Integer>> verticalSublist(List<List<Integer>> grid, int start, int end) {
        List<List<Integer>> out = new ArrayList<>();
        for (List<Integer> row : grid) {
            out.add(row.subList(start, end));
        }
        return out;
    }

    public static void merge(List<List<Integer>> grid, List<List<Integer>> grid2) {
        assert grid.size() >= grid2.size();
        for (int i = 0; i < grid2.size(); i++) {
            List<Integer> row = grid2.get(i);
            for (int j = 0; j < row.size(); j++) {
                grid.get(i).set(j, grid.get(i).get(j) | row.get(j));
            }
        }

    }

    public static List<List<Integer>> fillGrid(int w, int h) {
        List<List<Integer>> grid = new ArrayList<>();
        for (int i = 0; i < h; i++) {
            grid.add(new ArrayList<>());
            for (int j = 0; j < w; j++) {
                grid.get(i).add(0);
            }
        }
        return grid;

    }

    public static void print(List<List<Integer>> grid) {
        for (List<Integer> row : grid) {
            System.out.println(row.stream().map(a -> a == 0 ? " " : "#").collect(Collectors.joining()));
        }
    }

}