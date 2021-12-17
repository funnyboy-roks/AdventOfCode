package com.funnyboyroks.refactor;

import com.funnyboyroks.util.Util;

import java.awt.*;
import java.util.List;
import java.util.stream.Collectors;

public class DayThree {

    public static void main(String[] args) {
        List<String> data = Util.lines(3); // Initially written when Util#lines returned String[]
        data = """
            00100
            11110
            10110
            10111
            10101
            01111
            00111
            11100
            10000
            11001
            00010
            01010""".trim().lines().map(String::trim).collect(Collectors.toList());

        partOne(data);
//        partTwo(data);
    }

    public static void partOne(List<String> data) {
        int g = getCommon(data);
        System.out.println(g * ~g);
    }

    public static int getCommon(List<String> data) {
        List<Integer> nums = data.stream().map(n -> Integer.parseInt(n, 2)).toList();
        int length = data.get(0).length();
        return getCommon(nums, length).x;
    }

    // Initially in partOne, but moved for use in partTwo
    public static Point getCommon(List<Integer> data, int length) {
        int m = 0;
        for (int i = 0; i < length; i++) {
            int finalI = i;
            if (
                data.stream()
                    .mapToInt(n -> ((int) Math.pow(2, finalI) & n) >> finalI)
                    .reduce(0, Integer::sum)
                > data.size() / 2) {
                m |= (int) Math.pow(2, i); // Change correct bit
            }
        }
        int e = m ^ (int) (Math.pow(2, length) - 1); // All ones (with same length as other strings)
        return new Point(m, e);
    }

//    public static void partTwo(List<String> input) {
//        int length = input.get(0).length();
//        List<Integer> data = input.stream().map(n -> Integer.parseInt(n, 2)).collect(Collectors.toList());
//
//        int gamma = getCommon(data).x;
//        int epsilon = getCommon(data).y;
//
//        List<String> o2 = new ArrayList<>(data);
//        List<String> co2 = new ArrayList<>(data);
//        for (int i = 0; i < length; i++) {
//            int finalI = i;
//            if (o2.size() > 1) {
//                o2 = o2.stream()
//                    .filter(line -> line.charAt(finalI) == most.charAt(finalI))
//                    .collect(Collectors.toList());
//                gamma = getCommon(o2).x;
//            }
//            if (co2.size() > 1) {
//
//                String finalLeastCommonBits = leastCommonBits;
//                co2 = co2.stream()
//                    .filter(line -> line.charAt(finalI) == finalLeastCommonBits.charAt(finalI))
//                    .collect(Collectors.toList());
//                epsilon= getCommon(co2).y;
//            }
//        }
//        int o = Integer.parseInt(o2.get(0), 2);
//        int c = Integer.parseInt(co2.get(0), 2);
//        System.out.println(o * c);
//
//    }

}
