package com.funnyboyroks;

import com.funnyboyroks.util.Util;

import java.awt.*;
import java.util.*;
import java.util.List;

public class Day15 {


    public static List<Point> correct = List.of();

    public static void main(String[] args) {
        List<List<Integer>> data = Util.values(15, (s) -> Arrays.stream(s.split("")).map(Integer::parseInt).toList());

//        data = """
//            1163751742
//            1381373672
//            2136511328
//            3694931569
//            7463417111
//            1319128137
//            1359912421
//            3125421639
//            1293138521
//            2311944581""".lines().map(s -> Arrays.stream(s.split("")).map(Integer::parseInt).toList()).toList();


        int[][] grid = new int[data.size()][data.get(0).size()];
        for (int i = 0; i < data.size(); i++) {
            for (int j = 0; j < data.get(0).size(); j++) {
                grid[i][j] = data.get(i).get(j);
            }
        }

        Util.time(() -> {
//            System.out.println(partOne(grid)); // Didn't complete until next day
            System.out.println(partTwo(grid)); // Didn't complete until next day
        });
    }

    public static long partOne(int[][] data) {
        return shortestPath(data, new Point(0, 0), new Point(data.length - 1, data[0].length - 1));
    }

    public static long partTwo(int[][] data) {
//        print(expand(data));
//        return -1;
        data = expand(data);
        return shortestPath(data, new Point(0, 0), new Point(data.length - 1, data[0].length - 1));
    }

    private static int[][] expand(int[][] data) {
        int[][] grid = new int[data.length * 5][data[0].length * 5];
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                grid[i][j] = Math.abs(i / data.length) + Math.abs(j / data[0].length);
                grid[i][j] += data[i % data.length][j % data[0].length];
                if (grid[i][j] > 9) {
                    grid[i][j] %= 9;
                }
            }
        }
        return grid;
    }

    public static int shortestPath(int[][] graph, Point source, Point target) {
        int[][] dist = new int[graph.length][graph[0].length];

        List<Point> q = new ArrayList<>();
        for (int i = 0; i < graph.length; i++) {
            for (int j = 0; j < graph[0].length; j++) {
                dist[i][j] = Integer.MAX_VALUE;
                q.add(new Point(i, j));
            }
        }
        dist[0][0] = 0;
//        System.out.println(q.stream().map(p -> dist[p.y][p.x]).toList());

        while (!q.isEmpty()) {
            int i = min(q, dist);
            Point u = q.get(i);
            q.remove(i);
            for (Point v : neighbours(u)) {
                if (v.x < 0 || v.x >= graph[0].length || v.y < 0 || v.y >= graph.length) continue;
//                if (!q.contains(v)) continue;
                int alt = dist[u.y][u.x] + graph[v.y][v.x];
                if (alt < dist[v.y][v.x]) dist[v.y][v.x] = alt;
            }
        }

//        System.out.println(q.stream().map(p -> dist[p.y][p.x]).toList());
//        print(Arrays.stream(prev)
//                  .map(pl ->
//                           Arrays.stream(pl)
//                               .map(Day15::str)
//                               .toArray(String[]::new)
//                  ).toArray(String[][]::new));
//        printC(dist);
        return dist[target.y][target.x];

    }

    public static List<Point> neighbours(Point p) {
        return List.of(
            new Point(p.x, p.y - 1),
            new Point(p.x, p.y + 1),
            new Point(p.x - 1, p.y),
            new Point(p.x + 1, p.y)
        );
    }

    public static int min(List<Point> pts, int[][] dist) {
        int minI = 0;
        int minP = dist[pts.get(0).y][pts.get(0).x];
        for (int i = 1; i < pts.size(); i++) {
            Point p = pts.get(i);
            int d = dist[p.y][p.x];
            if (d < minP) {
                minP = d;
                minI = i;
            }
        }
        return minI;

    }

    public static void print(int[][] data) {
        for (int[] row : data) {
            for (int i : row) {
                System.out.print(i + " ");
            }
            System.out.println();
        }
    }

    public static <T> void print(T[][] data) {
        for (T[] row : data) {
            for (T i : row) {
                System.out.print(i + " ");
            }
            System.out.println();
        }
    }

    private static void printC(int[][] data) {
        for (int y = 0; y < data.length; y++) {
            int[] row = data[y];
            for (int x = 0; x < row.length; x++) {
                int i = row[x];
                boolean colour = contains(correct, new Point(x, y));
                String str = Util.padStart(i + "", 4, ' ');
                System.out.print((colour ? colour(str) : str) + " ");
            }
            System.out.println();
        }

    }

    public static void print(Collection<Map.Entry<Point, Integer>> pts) {
        System.out.println(pts.stream().map(p -> "(" + p.getKey().x + "," + p.getKey().y + "=" + p.getValue() + ")").toList());
    }

    public static boolean contains(Collection<Point> pts, Point p) {
        return pts.stream().anyMatch(p2 -> p2.x == p.x && p2.y == p.y);
    }

    public static String str(Point p) {
        return p == null ? "( , )" : "(" + p.x + "," + p.y + ")";
    }

    public static String colour(String str) {
        return "\033[1;97m" + str + "\u001B[0m";
    }

}