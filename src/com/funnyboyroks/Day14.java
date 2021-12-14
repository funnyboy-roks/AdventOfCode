package com.funnyboyroks;

import java.util.*;
import java.util.stream.Collectors;

public class Day14 {

    public static void main(String[] args) {
        List<String> rawData = Util.lines(14);

        rawData = """
            NNCB

            CH -> B
            HH -> N
            CB -> H
            NH -> C
            HB -> C
            HC -> B
            HN -> C
            NN -> C
            BH -> H
            NC -> B
            NB -> B
            BN -> B
            BB -> N
            BC -> B
            CC -> N
            CN -> C""".lines().map(String::trim).toList();

        Map.Entry<String, Map<String, String>> data = parseData(rawData);

//        Util.time(() -> {
//        System.out.println(partOne(data.getKey(), data.getValue())); // ##:##
        System.out.println(partTwo(data.getKey(), data.getValue())); // ##:##
//        });
    }

    private static Map.Entry<String, Map<String, String>> parseData(List<String> rawData) {
        rawData = Util.mut(rawData);
        String data = rawData.remove(0);
        Map<String, String> insertions = rawData.stream()
            .filter(s -> !s.isEmpty())
            .map(s -> s.split(" -> "))
            .collect(Collectors.toMap(s -> s[0], s -> s[1]));

        return new AbstractMap.SimpleEntry<>(data, insertions);
    }

    public static int partOne(String template, Map<String, String> insertions) {

        System.out.println(insertions);

        for (int j = 0; j < 10; j++) {

            char[] chars = template.toCharArray();
            template = "";
            for (int i = 1; i < chars.length; i++) {
                char c1 = chars[i - 1];
                char c2 = chars[i];
                String insert = insertions.get("" + c1 + c2);
                template += c1;
                if (insert != null) {
                    template += insert;
                }
//            out += c2;
            }
            template += chars[chars.length - 1];
            System.out.println(j + " - " + template.length());
        }

        Map<Character, Integer> counts = new HashMap<>();
        for (int i = 0; i < template.length(); i++) {
            char c = template.charAt(i);
            counts.put(c, counts.getOrDefault(c, 0) + 1);
        }

        int mostCommon = counts.entrySet().stream().max(Map.Entry.comparingByValue()).orElseThrow().getValue();
        int leastCommon = counts.entrySet().stream().min(Map.Entry.comparingByValue()).orElseThrow().getValue();

//        System.out.println(pairs.stream().map(Arrays::toString).collect(Collectors.joining(", ")));
        System.out.println(template);

        return mostCommon - leastCommon;
    }

    public static long partTwo(String template, Map<String, String> insertions) {

        Map<Character, Long> out = run(40, template, insertions);
        long largest = out.entrySet().stream().max(Map.Entry.comparingByValue()).orElseThrow().getValue();
        long smallest = out.entrySet().stream().min(Map.Entry.comparingByValue()).orElseThrow().getValue();
        return largest - smallest;
    }

    private static Map<Character, Long> run(int steps, String template, Map<String, String> insertions) {

        // Split string into pairs -- NNCB -> [NN, NC, CB] (Value is for occurrences later)
        Map<String, Long> pairs = new HashMap<>();
        for (int i = 0; i < template.length() - 1; i++) {
            inc(pairs, template.substring(i, i + 2), 1);
        }

        // Counts of each character occurrence
        Map<Character, Long> counts = new HashMap<>();
        template.chars().forEach(s -> inc(counts, (char) s, 1));

        for (int s = 1; s < steps + 1; ++s) {
            Map<String, Long> newPairs = new HashMap<>();
            for (String pair : pairs.keySet()) {
                long increment = pairs.get(pair);

                if (insertions.containsKey(pair)) {
                    String key = insertions.get(pair);

                    inc(newPairs, pair.charAt(0) + key, increment);
                    inc(newPairs, key + pair.charAt(1), increment);

                    inc(counts, key.charAt(0), increment);
                } else {
                    inc(newPairs, pair, increment);
                }
            }
            pairs = newPairs;
        }
        return counts;
    }

    public static <T> void inc(Map<T, Long> map, T key, long increment) {
        map.put(key, map.getOrDefault(key, 0L) + increment);
    }

}