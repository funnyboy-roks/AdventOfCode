package com.funnyboyroks;

import java.util.*;

public class DayTwo {

    public static void main(String[] args) {
        String input = Util.getInput("input2.txt");
        String[] data = parseData(input.trim());

//        partOne(data); // ##:##
        partTwo(data); // ##:##
    }

    public static String[] parseData(String input) {
//        input = """
//            5 9 2 8
//            9 4 7 3
//            3 8 6 5""";
        return input.split("\n");
    }

    public static void partOne(String[] data) {
        int sum = 0;
        for (String line : data) {
            List<Integer> vals = Arrays.stream(line.trim().split("\\s")).filter(s -> !s.isBlank()).map(Integer::parseInt).toList();
            int max = vals.stream().max(Comparator.naturalOrder()).orElse(0);
            int min = vals.stream().min(Comparator.naturalOrder()).orElse(0);
            sum += max - min;
        }
        System.out.println(sum);
    }

    public static void partTwo(String[] data) {
            int sum = 0;
            for (String line : data) {
                List<Integer> vals = Arrays.stream(line.trim().split("\\s")).filter(s -> !s.isBlank()).map(Integer::parseInt).toList();
                List<Integer> divisors = new ArrayList<>();
                for (Integer a : vals) {
                    for (Integer b : vals) {
                        if(!Objects.equals(a, b) && a % b == 0) {
                            divisors.add(a);
                            divisors.add(b);
                            break;
                        }
                    }
                    if(!divisors.isEmpty()) break;
                }
                int[] ints = divisors.stream().mapToInt(s -> s).toArray();
                int max = Math.max(ints[0], ints[1]);
                int min = Math.min(ints[0], ints[1]);
                sum += max / min;
            }
            System.out.println(sum);

    }

}