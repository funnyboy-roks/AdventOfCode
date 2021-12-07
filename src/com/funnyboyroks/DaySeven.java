package com.funnyboyroks;

import java.util.List;
import java.util.stream.IntStream;

public class DaySeven {

    public static void main(String[] args) {
        List<Integer> data = Util.ints(7, ",");
//        data = List.of(16, 1, 2, 0, 4, 2, 7, 1, 2, 14); // sample

        System.out.println(partOne(data)); // 09:18
        System.out.println(partTwo(data)); // TODO: (idk -- stats temp disabled)
    }

    public static int partOne(List<Integer> data) {
        int maxDist = data.stream().mapToInt(i -> i).max().orElse(0);
        int minDist = data.stream().mapToInt(i -> i).min().orElse(0);

        return IntStream.rangeClosed(minDist, maxDist)
            .map(n -> data.stream()
                .map(i1 -> i1 - n)
                .map(Math::abs)
                .reduce(0, Integer::sum)
            )
            .min()
            .orElseThrow();
    }

    public static int partTwo(List<Integer> data) {
        int maxDist = data.stream().mapToInt(i -> i).max().orElse(0);
        int minDist = data.stream().mapToInt(i -> i).min().orElse(0);

        return IntStream.rangeClosed(minDist, maxDist)
            .map(n -> data.stream()
                .map(i1 -> i1 - n)
                .map(Math::abs)
                .map(DaySeven::wtf)
                .reduce(0, Integer::sum)
            )
            .min()
            .orElseThrow();
    }

    public static int wtf(int n) { // Why am I so dumb? There's an equation for this, right?
        int step = 1;
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += step;
            step++;
        }
        return sum;
    }

}
