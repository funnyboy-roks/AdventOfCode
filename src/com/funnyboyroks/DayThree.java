package com.funnyboyroks;

import java.awt.*;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Collectors;

public class DayThree {

    public static void main(String[] args) {
        String[] data = Util.lines(3);

        partOne(data); // 06:50
//        partTwo(data); // 31:12
    }

    public static void partOne(String[] data) {
        Point p = getNumbers(data);
        System.out.println(p.x * p.y);
    }

    // Initially in partOne, but moved for use in partTwo
    public static Point getNumbers(String[] data) {
        int length = data[0].length();
        StringBuilder gamma = new StringBuilder();
        StringBuilder epsilon = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int ones = 0;
            int zeros = 0;
            for (String line : data) {
                boolean bit = line.charAt(i) == '1';
                if (bit) {
                    ones++;
                } else {
                    zeros++;
                }
            }
            gamma.append(ones >= zeros ? '1' : '0');
            epsilon.append(ones < zeros ? '1' : '0');
        }
        int g = Integer.parseInt(gamma.toString(), 2);
        int e = Integer.parseInt(epsilon.toString(), 2);
        return new Point(g, e);

    }

    public static String padLeft(String s, int n) {
        return String.format("%" + n + "s", s).replace(' ', '0');
    }

    public static void partTwo(String[] data) {
        int length = data[0].length();

        String mostCommonBits = padLeft(Integer.toString(getNumbers(data).x, 2), length);
        String leastCommonBits = padLeft(Integer.toString(getNumbers(data).y, 2), length);

        List<String> o2 = List.of(data);
        List<String> co2 = List.of(data);
        for (int i = 0; i < length; i++) {
            int finalI = i;
            if (o2.size() > 1) {
                String finalMostCommonBits = mostCommonBits;
                o2 = o2.stream()
                    .filter(line -> line.charAt(finalI) == finalMostCommonBits.charAt(finalI))
                    .collect(Collectors.toList());
                mostCommonBits = padLeft(Integer.toString(getNumbers(o2.toArray(new String[0])).x, 2), length);
            }
            if (co2.size() > 1) {

                String finalLeastCommonBits = leastCommonBits;
                co2 = co2.stream()
                    .filter(line -> line.charAt(finalI) == finalLeastCommonBits.charAt(finalI))
                    .collect(Collectors.toList());
                leastCommonBits = padLeft(Integer.toString(getNumbers(co2.toArray(new String[0])).y, 2), length);
            }
        }
        int o = Integer.parseInt(o2.get(0), 2);
        int c = Integer.parseInt(co2.get(0), 2);
        System.out.println(o * c);

    }

}
