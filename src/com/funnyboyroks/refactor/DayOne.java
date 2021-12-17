package com.funnyboyroks.refactor;

import com.funnyboyroks.util.Util;

import java.util.List;

public class DayOne {

    public static void main(String[] args) {
        List<Integer> data = Util.ints(1);

        System.out.println(" - " + Util.time(() -> partOne(data)));
        System.out.println(" - " + Util.time(() -> partTwo(data)));
    }

    public static void partOne(List<Integer> data) {
        int c = 0;
        int prev = data.get(0);
        for (int i = 1; i < data.size(); i++) {
            int curr = data.get(i);
            if (curr > prev) ++c;
            prev = curr;
        }
        System.out.println(c);

    }

    public static void partTwo(List<Integer> data) {
        int c = 0;
        int lastSum = data.subList(0, 4).stream().reduce(0, Integer::sum);
        for (int i = 3; i <= data.size(); i++) {
            int currSum = data.subList(i - 3, i).stream().reduce(0, Integer::sum);
            if (currSum > lastSum) ++c;
            lastSum = currSum;
        }
        System.out.println(c);
    }

}
