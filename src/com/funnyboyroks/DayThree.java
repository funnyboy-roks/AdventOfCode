package com.funnyboyroks;

import java.awt.*;
import java.util.HashMap;
import java.util.Map;

public class DayThree {

    public static void main(String[] args) {
//        String input = "1";
//        String input = "12";
//        String input = "23";
//        String input = "1024";
        String input = "312051";
        int data = Integer.parseInt(input.trim());

//        partOne(data); // ##:##
        partTwo(data); // ##:##
    }

    public static void partOne(int data) {
        Point c = new Point(0, 0);
        Point d = new Point(0, 0);
        Point min = new Point(0, 0); // bottom-left
        Point max = new Point(0, 0); // top-right

        for (int i = 1; i < data; i++) {
            if(c.x == max.x) {
                if(c.y == min.y) { // Bottom-Right
                    max.translate(0, 1);
                    d.move(0, 1);
                } else if(c.y == max.y) { // Top-Right
                    min.translate(-1, 0);
                    d.move(-1, 0);
                }
            } else if (c.x == min.x) {
                if(c.y == max.y) { // Top-Left
                    min.translate(0, -1);
                    d.move(0, -1);
                } else if (c.y == min.y) { // Bottom-Left
                    max.translate(1, 0);
                    d.move(1, 0);
                }
            }
            c.translate(d.x, d.y);
        }
        System.out.println(c);
        System.out.println(Math.abs(c.x) + Math.abs(c.y));
    }

    public static void partTwo(int data) {
        Point c = new Point(0, 0);
        Point d = new Point(0, 0);
        Point min = new Point(0, 0); // bottom-left
        Point max = new Point(0, 0); // top-right

        Map<Point, Integer> vals = new HashMap<>();
        vals.put(new Point(0, 0), 1);
        int lastN = 0;
        while (lastN <= data) {
            Point point = new Point();
            if(c.x == max.x) {
                if(c.y == min.y) { // Bottom-Right
                    max.translate(0, 1);
                    d.move(0, 1);
                } else if(c.y == max.y) { // Top-Right
                    min.translate(-1, 0);
                    d.move(-1, 0);
                }
            } else if (c.x == min.x) {
                if(c.y == max.y) { // Top-Left
                    min.translate(0, -1);
                    d.move(0, -1);
                } else if (c.y == min.y) { // Bottom-Left
                    max.translate(1, 0);
                    d.move(1, 0);
                }
            }
            c.translate(d.x, d.y);
            point.setLocation(c);
            lastN = sumNeighbours(vals, point);
            vals.put(point, lastN);
            System.out.println(point.x + ", " + point.y + " - " + lastN);
        }
        System.out.println(lastN);
    }

    private static Integer sumNeighbours(Map<Point, Integer> vals, Point point) {
        return vals.entrySet().stream()
            .filter(pt -> Math.abs(pt.getKey().x - point.x) == 1 ||
                Math.abs(pt.getKey().y - point.y) == 1)
            .map(Map.Entry::getValue)
            .reduce(Integer::sum)
            .orElse(1);
    }

}