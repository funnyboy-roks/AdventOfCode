package com.funnyboyroks;

import java.awt.*;
import java.util.AbstractMap;
import java.util.List;
import java.util.Map;

public class Day17 {

    public static void main(String[] args) {
        String input = Util.getInput(17);
//        input = "target area: x=20..30, y=-10..-5";

        Point[] data = parseData(input);

        Util.time(() -> {
            System.out.println("Part One: " + partOne(data[0], data[1])); // 29:07
            System.out.println("Part Two: " + partTwo(data[0], data[1])); // 34:08
        });
    }

    private static Point[] parseData(String input) {

        List<String> parts = Util.match(input, "^target area: x=(-?\\d+)..(-?\\d+), y=(-?\\d+)..(-?\\d+)$");
        return new Point[]{
            new Point(Integer.parseInt(parts.get(0)), Integer.parseInt(parts.get(2))),
            new Point(Integer.parseInt(parts.get(1)), Integer.parseInt(parts.get(3)))
        };
    }

    public static int partOne(Point min, Point max) {

        int maxX = Integer.MIN_VALUE;

        // Brute force lmao
        for (int x = 0; x < 1000; x++) {
            for (int y = 0; y < 1000; y++) {
                Map.Entry<Boolean, Integer> e = willEnter(new Point(x, y), min, max);
                if (e.getKey()) {
                    maxX = Math.max(maxX, e.getValue());
                }

            }
        }
        return maxX;
    }

    public static int partTwo(Point min, Point max) {

        int count = 0;

        // Brute force lmao
        for (int x = 0; x < 1000; x++) {
            for (int y = -1000; y < 1000; y++) {
                Map.Entry<Boolean, Integer> e = willEnter(new Point(x, y), min, max);
                if (e.getKey()) {
                    ++count;
                }

            }
        }
        return count;
    }

    public static Map.Entry<Boolean, Integer> willEnter(Point v, Point min, Point max) {
        Point p = new Point(0, 0);
        int maxY = Integer.MIN_VALUE;
        while (p.x < max.x && p.y > min.y) {
            p.x += v.x;
            p.y += v.y;
            v.x += v.x == 0 ? 0 : v.x / -Math.abs(v.x); // Mathz
            v.y -= 1;
            if (p.y > maxY) {
                maxY = p.y;
            }
            if (inside(p, min, max)) {
                return new AbstractMap.SimpleEntry<>(true, maxY);
            }
        }
        return new AbstractMap.SimpleEntry<>(inside(p, min, max), maxY);
    }

    public static boolean inside(Point p, Point min, Point max) {
        return p.x >= min.x && p.x <= max.x && p.y >= min.y && p.y <= max.y;
    }

}