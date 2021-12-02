package com.funnyboyroks;

import java.util.Arrays;
import java.util.regex.Pattern;

public class DayOne {

    public static void main(String[] args) {
        String input = Util.getInput(1);
        String[] data = parseData(input.trim());

//        partOne(data); // ##:##
        partTwo(data); // ##:##
    }

    public static String[] parseData(String input) {
        return input.split("");
    }

    public static void partOne(String[] data) {
        String prev = data[0];
        int sum = 0;
        for (int i = 1; i <= data.length; i++) {
            int p = i % data.length;
            String s = data[p];
            if(prev.equals(s)) {
                sum += Integer.parseInt(s);
            }
            prev = s;
        }

        System.out.println(sum);
    }

    public static void partTwo(String[] data) {
        int sum = 0;
        for (int i = 0; i < data.length; i++) {
            String s = data[i];
            String next = data[(i + data.length/2) % data.length];
            if(s.equals(next)) {
                sum += Integer.parseInt(s);
            }
        }

        System.out.println(sum);

    }

}