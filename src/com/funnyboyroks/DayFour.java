package com.funnyboyroks;

import java.util.*;
import java.util.stream.Collectors;

public class DayFour {

    public static void main(String[] args) {
        String[] data = Util.lines(4);
//        String[] data = ("abcde fghij\nabcde xyz ecdab\na ab abc abd abf abj\niiii oiii ooii oooi oooo\noiii ioii iioi iiio").split("\n");

//        partOne(data); // ##:##
        partTwo(data); // ##:##
    }

    public static void partOne(String[] data) {
        int count = 0;
        for (String line : data) {
            String[] words = line.split("\\s");
            List<String> wordsUsed = new ArrayList<>();
            boolean add = true;
            for (String word : words) {
                if (wordsUsed.contains(word)) {
                    add = false;
                    break;
                }
                wordsUsed.add(word);
            }
            if (add) ++count;
        }
        System.out.println(count);
    }

    public static void partTwo(String[] data) {
        int count = 0;
        for (String line : data) {
            String[] words = line.split("\\s");
            boolean add = true;
            for (int i = 0; i < words.length; i++) {
                String word = words[i];
                for (int j = 0; j < words.length; j++) {
                    String word1 = words[j];
                    if(i == j) break;
                    boolean an = anagrammatic(word, word1);
                    if (an) {
                        add = false;
                        break;
                    }
                }
            }
            System.out.printf("%s - %b%n", line, add);
            if (add) ++count;
        }
        System.out.println(count);
    }

    public static boolean anagrammatic(String s1, String s2) {
        if(s1.equals(s2)) return false;
        List<String> chars1 = Arrays.stream(s1.split("")).collect(Collectors.toList());
        List<String> chars2 = Arrays.stream(s2.split("")).collect(Collectors.toList());
        for (String s : chars2) {
            chars1.remove(s);
        }
        return chars1.size() == 0;

    }

}
