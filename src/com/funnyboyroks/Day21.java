package com.funnyboyroks;

import com.funnyboyroks.util.Util;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Day21 {

    public static void main(String[] args) {
        List<String> input = Util.lines(21);

        input = """
            Player 1 starting position: 4
            Player 2 starting position: 8""".lines().map(String::trim).collect(Collectors.toList());

        List<long[]> data = parseData(input);

        Util.time(() -> {
//            System.out.println("Part One: " + partOne(data)); // ##:##
            System.out.println("Part Two: " + partTwo(data)); // ##:##
        });
    }

    private static List<long[]> parseData(List<String> input) {
        return input.stream().map(s -> Util.match(s, "Player \\d starting position: (\\d)+").get(0)).mapToInt(Integer::parseInt).mapToObj(i -> new long[]{ i, 0 }).collect(Collectors.toList());
    }

    //   data = Position : Score
    public static long partOne(List<long[]> data) {
        System.out.println(data.stream().map(Arrays::toString).toList());
        long[] current = new long[]{ 1, 2, 3 };
        long loop = 0;
        long rolls = 0;

        loop:
//        for (loop = 0; loop < 4; loop++) {
        for (loop = 0; true; loop++) {
            for (int i = 0; i < 2; i++) {
                long[] arr = data.get(i % 2);
                arr[0] += Arrays.stream(current).sum();
                arr[0] %= 10;
                if (arr[0] == 0) {
                    arr[0] = 10;
                }
                arr[1] += arr[0];
                for (int c = 0; c < current.length; c++) {
                    current[c] += 3;
                    if (current[c] > 100) {
                        current[c] -= 100;
                    }
                    rolls++;
                }
                if (data.get(0)[1] >= 1000 || data.get(1)[1] >= 1000) break loop;
            }
            System.out.println(Arrays.toString(current));
            System.out.println(data.stream().map(Arrays::toString).toList());
        }

        System.out.println(rolls);
        return rolls * data.stream().min(Comparator.comparingLong(l -> l[1])).orElseThrow()[1];
    }

    public static long partTwo(List<long[]> data) {
        // TODO: wtf
        return -1;
    }

}