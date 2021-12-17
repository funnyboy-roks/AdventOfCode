package com.funnyboyroks;

import com.funnyboyroks.util.Util;

import java.util.ArrayList;
import java.util.List;

public class Day01 {

    public static void main(String[] args) {
        String[] data = Util.lines(1)
            .toArray(String[]::new); // Initially written when Util#lines returned String[]

//        partOne(data); // 8:31
//        partTwo(data); // 13:01
    }

    public static void partOne(String[] data) {
        int inc = 0;
        for (int i = 1; i < data.length; i++) {
            int curr = Integer.parseInt(data[i]);
            int prev = Integer.parseInt(data[i - 1]);
            if (curr > prev) ++inc;

        }
        System.out.println(inc);

    }

    public static void partTwo(String[] data) {
        List<Integer> measurements = new ArrayList<>();
        for (int i = 2; i < data.length; i++) {
            int x = Integer.parseInt(data[i - 2]);
            int y = Integer.parseInt(data[i - 1]);
            int z = Integer.parseInt(data[i]);
            measurements.add(x + y + z);
        }
        int inc = 0;
        for (int i = 1; i < measurements.size(); i++) {
            int curr = measurements.get(i);
            int prev = measurements.get(i - 1);
            if (curr > prev) ++inc;

        }
        System.out.println(inc);
    }

}
