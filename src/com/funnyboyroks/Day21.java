package com.funnyboyroks;

import com.funnyboyroks.util.Util;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Day21 {

    public static void main(String[] args) {
        List<String> input = Util.lines(21);

//        input = """
//            Player 1 starting position: 4
//            Player 2 starting position: 8""".lines().map(String::trim).collect(Collectors.toList());

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
        long rolls = 0;

        loop:
//        for (int loop = 0; loop < 4; loop++) {
        while (true) {
            for (int i = 0; i < 2; i++) {
                long[] arr = data.get(i % 2);
                arr[0] += Arrays.stream(current).sum();
                arr[0] = (arr[0] - 1) % 10 + 1;
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

    public static long partTwo(List<long[]> data) { // idk how, but it works lol
        long[] pos = { data.get(0)[0], data.get(1)[0] };
        int[] scores = { 0, 0 };

        return // 🤮
            roll(pos, scores, 9, true)
            + roll(pos, scores, 8, true) * 3
            + roll(pos, scores, 7, true) * 6
            + roll(pos, scores, 6, true) * 7
            + roll(pos, scores, 5, true) * 6
            + roll(pos, scores, 4, true) * 3
            + roll(pos, scores, 3, true);
    }

    public static long roll(long[] pos, int[] scores, int roll, boolean p1Turn) {
        pos = pos.clone(); // Mutability is for chumps
        scores = scores.clone();

        int p = (p1Turn = !p1Turn) ? 1 : 0;
        scores[p] += ((pos[p] += roll) - 1) % 10 + 1; // 😉

        if (scores[0] >= 21 || scores[1] >= 21) {
            return scores[0] >= 21 ? 1 : 0;
        }
        return roll(pos, scores, 9, p1Turn)
               + roll(pos, scores, 8, p1Turn) * 3
               + roll(pos, scores, 7, p1Turn) * 6
               + roll(pos, scores, 6, p1Turn) * 7
               + roll(pos, scores, 5, p1Turn) * 6
               + roll(pos, scores, 4, p1Turn) * 3
               + roll(pos, scores, 3, p1Turn);
    }

}