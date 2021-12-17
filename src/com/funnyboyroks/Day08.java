package com.funnyboyroks;

import com.funnyboyroks.util.Util;

import java.util.*;
import java.util.concurrent.atomic.LongAdder;
import java.util.stream.Collectors;

public class Day08 {

    public static int[][] digits = new int[][]{
        //         a  b  c  d  e  f  g
        //         0  1  2  3  4  5  6
        new int[]{ 1, 1, 1, 0, 1, 1, 1 },
        new int[]{ 0, 0, 1, 0, 0, 1, 0 },
        new int[]{ 1, 0, 1, 1, 1, 0, 1 },
        new int[]{ 1, 0, 1, 1, 0, 1, 1 },
        new int[]{ 0, 1, 1, 1, 0, 1, 0 },
        new int[]{ 1, 1, 0, 1, 0, 1, 1 },
        new int[]{ 1, 1, 0, 1, 1, 1, 1 },
        new int[]{ 1, 0, 1, 0, 0, 1, 0 },
        new int[]{ 1, 1, 1, 1, 1, 1, 1 },
        new int[]{ 1, 1, 1, 1, 0, 1, 1 },
        };


    public static void main(String[] args) {
        List<String[]> data = Util.values(8, (str) -> Arrays.stream(str.split(" \\| ")).map(String::trim).toArray(String[]::new));
//        data = List.of(
//            "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe".split(" \\| "),
//            "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc".split(" \\| "),
//            "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg".split(" \\| "),
//            "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb".split(" \\| "),
//            "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea".split(" \\| "),
//            "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb".split(" \\| "),
//            "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe".split(" \\| "),
//            "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef".split(" \\| "),
//            "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb".split(" \\| "),
//            "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce".split(" \\| ")
//        );
//        data = Collections.singletonList("acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf".split(" \\| "));

//        partOne(data); // 00:17:03
        partTwo(data); // 02:08:08
    }

    public static void partOne(List<String[]> data) {

        int sum = 0;

        for (String[] line : data) {
            String[] parts1 = line[0].split(" ");
            String[] parts2 = line[1].split(" ");
            String[] digits = new String[10];

            for (String str : parts1) {
                switch (str.length()) {
                    case 3 -> { // 7
                        digits[7] = str;
                    }
                    case 4 -> { // 4
                        digits[4] = str;
                    }
                    case 2 -> { // 1
                        digits[1] = str;
                    }
                    case 7 -> { // 8
                        digits[8] = str;
                    }

                }
            }
            for (String s : parts2) {
                for (int n : new int[]{ 1, 4, 7, 8 }) {
                    if (anagrammatic(digits[n], s)) {
                        sum++;
                    }
                }
            }
        }
        System.out.println("sum = " + sum);


    }

    public static boolean anagrammatic(String str1, String str2) {
        // Check if two strings are anagrams of each other
        if (str1.length() != str2.length()) {
            return false;
        }

        if (str1.equals(str2)) {
            return true;
        }

        Map<Character, Integer> map1 = new HashMap<>();
        Map<Character, Integer> map2 = new HashMap<>();

        for (int i = 0; i < str1.length(); i++) {
            char c = str1.charAt(i);
            map1.merge(c, 1, Integer::sum);
        }

        for (int i = 0; i < str2.length(); i++) {
            char c = str2.charAt(i);
            map2.merge(c, 1, Integer::sum);
        }

        return map1.equals(map2);
    }

    public static void partTwo(List<String[]> data) {
        int sum = 0;

        for (String[] line : data) {
            List<String> parts1 = Arrays.asList(line[0].split(" "));
            String[] parts2 = line[1].split(" ");

            String[] given = new String[10];
            Map<Character, LongAdder> occurrences = new HashMap<>();

            List<String> p1d = new ArrayList<>();
            for (String s : parts1) {
                boolean good = true;
                for (String s1 : p1d) {
                    if (anagrammatic(s, s1)) {
                        good = false;
                        break;
                    }
                }
                if (good) {
                    p1d.add(s);
                }
            }

            for (String str : parts1) {
                switch (str.length()) {
                    case 3 -> given[7] = str;
                    case 4 -> given[4] = str;
                    case 2 -> given[1] = str;
                    case 7 -> given[8] = str;
                }
                str.chars().forEach(c -> {
                    occurrences.putIfAbsent((char) c, new LongAdder());
                    occurrences.get((char) c).add(1);
                });
            }


            char[] mapping = new char[7]; // side : int

            mapping[0] = removeChars(given[7], given[1]).charAt(0);

            String eg = removeChars(given[8], given[1], given[4], given[7]); // eg or ge

            List<Character> freqSort = occurrences.entrySet().stream().sorted(Comparator.comparingInt(a -> a.getValue().intValue())).map(Map.Entry::getKey).collect(Collectors.toList());

            mapping[4] = freqSort.remove(0);
            Collections.reverse(freqSort);
            System.out.println("a " + freqSort);

            mapping[5] = freqSort.remove(0);
            mapping[2] = freqSort.remove(freqSort.get(0) == mapping[0] ? 1 : 0);
            freqSort.remove(0);

            System.out.println("b " + freqSort);

            mapping[3] = freqSort.remove(0);

            char[] mapClone = mapping.clone();
            mapClone[1] = freqSort.get(0);
            if(n(join(mapClone), given[4]) == 4) {
                mapping[1] = freqSort.remove(0);
                mapping[6] = freqSort.remove(0);
            } else {
                mapping[6] = freqSort.remove(0);
                mapping[1] = freqSort.remove(0);
            }

            System.out.println("c " + freqSort);

            System.out.println(mapping);
            System.out.println("0123456");
            System.out.println(occurrences);
            System.out.println(n(join(mapping), "ab"));
            String outStr = Arrays.stream(parts2)
                .map(str -> {
                    System.out.println(str);
                    return switch (str.length()) {
                        case 2 -> "1";
                        case 4 -> "4";
                        case 3 -> "7";
                        case 7 -> "8";
                        default -> "" + lu(m(join(mapping)), str);//str(join(mapping), str);
                    };
                })
                .collect(Collectors.joining());
            sum += Integer.parseInt(outStr);
        }
        System.out.println("sum = " + sum);


    }

    public static int lu(Map<String, Integer> map, String str) {
        int val = map.entrySet()
            .stream()
            .filter(e -> anagrammatic(e.getKey(), str))
            .map(Map.Entry::getValue)
            .findFirst()
            .orElse(0);
        return val;
    }

    public static Map<String, Integer> m(String lookup) {
        Map<String, Integer> vals = new HashMap<>();

        for (int j = 0; j < digits.length; j++) {
            int[] digit = digits[j];
            StringBuilder sb = new StringBuilder();
            for (int k = 0; k < digit.length; k++) {
                int i = digit[k];
                if (i != 0) {
                    sb.append(lookup.charAt(k));
                }
            }
            vals.put(sb.toString(), j);
        }
        return vals;
    }

    public static int n(String lookup, String str) {
        Map<String, Integer> vals = m(lookup);
        System.out.println(vals);
        return vals.get(str) == null ? -1 : vals.get(str);
    }

    public static String str(String lookup, int... ints) {
        StringBuilder sb = new StringBuilder();
        for (int anInt : ints) {
            sb.append(lookup.charAt(anInt));
        }
        return sb.toString();
    }

    public static String join(char... chars) {
        StringBuilder sb = new StringBuilder();
        for (char aChar : chars) {
            sb.append(aChar);
        }
        return sb.toString();
    }

    public static String removeChars(String s, String... s1) {
        List<Character> chars = Arrays.stream(s1).flatMap(str -> str.chars().mapToObj(c -> (char) c)).toList();
        for (char c : chars) {
            s = s.replace(c + "", "");
        }
        return s;
    }

    public static int get(String[] digits, String val) {
        for (int i = 0; i < digits.length; i++) {
            if (anagrammatic(digits[i], val)) {
                return i;
            }
        }
        return -1;

    }
}
