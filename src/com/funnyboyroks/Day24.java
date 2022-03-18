package com.funnyboyroks;

import com.funnyboyroks.util.Tuple;
import com.funnyboyroks.util.Util;

import java.util.*;
import java.util.stream.Collectors;

public class Day24 {

    public static void main(String[] args) {
        List<String> input = Util.lines(24);

        List<Tuple.Three<String, Character, String>> data = parseData(input);

        Util.time(() -> {
            System.out.println("Part One: " + partOne(data)); // ##:##
//            System.out.println("Part Two: " + partTwo(data)); // ##:##
        });
    }

    private static List<Tuple.Three<String, Character, String>> parseData(List<String> input) {
        return input.stream().map(s -> {
            String[] parts = s.split(" ");
            return new Tuple.Three<>(parts[0], parts[1].charAt(0), parts.length >= 3 ? parts[2] : null);
        }).collect(Collectors.toList());
    }

    public static long partOne(List<Tuple.Three<String, Character, String>> data) {



        return -1;
    }


    public static int partTwo(List<Tuple.Three<String, Character, String>> data) {

        return -1;
    }

}