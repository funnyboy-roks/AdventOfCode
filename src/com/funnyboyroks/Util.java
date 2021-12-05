package com.funnyboyroks;

import org.intellij.lang.annotations.Language;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.function.Function;
import java.util.regex.MatchResult;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class Util {

    public static File getFile(String s) {
        File f = new File(s);
        if (!f.exists()) {
            throw new RuntimeException("File `" + s + "` not found");
        }
        return f;
    }

    public static String getInput(String path) {
        try {
            return Files.readString(getFile(path).toPath()).trim();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static String getInput(int day) {
        return getInput("input/day" + day + ".txt");
    }

    public static List<String> lines(int day) {
        return getInput(day).lines().collect(Collectors.toList());
    }

    public static List<String> split(int day, String delimiter) {
        return Arrays.stream(getInput(day).split(delimiter)).collect(Collectors.toList());
    }

    public static List<Integer> ints(int day, String delimiter) {
        return split(day, delimiter).stream().map(Integer::parseInt).collect(Collectors.toList());
    }

    public static List<Integer> ints(int day) {
        return ints(day, "\n");
    }

    /**
     * Break a string into lines and map it to certain values
     */
    public static <T> List<T> values(int day, Function<String, T> mapper) {
        return lines(day).stream().map(mapper).collect(Collectors.toList());
    }

    public static String padStart(String s, int finalLength, char c) {
        int len = finalLength - s.length();
        if (len < 0) return s.substring(0, finalLength);
        return (c + "").repeat(len) + s;
    }

    public static String padEnd(String s, int finalLength, char c) {
        int len = finalLength - s.length();
        if (len < 0) return s.substring(0, finalLength);
        return s + (c + "").repeat(len);
    }

    public static String replaceAll(String input, @Language("RegExp") String regex, Function<MatchResult, String> matcher) {
        return Pattern.compile(regex).matcher(input).replaceAll(matcher);
    }

    public static List<Integer> sumInts(Collection<Integer> nums, int sum, int amount) {
        if (amount == 0) return Arrays.asList(1); // Rather than List#of, so it's mutable
        if (amount == 1) return nums.stream().filter(i -> i == sum).collect(Collectors.toList());
        List<Integer> result = new ArrayList<>();
        for (Integer i : nums) {
            int complement = sum - i;
            List<Integer> product = sumInts(nums, complement, amount - 1);
            if (product.size() > 0) {
                result.add(product.get(0));
            }
        }
        return result;
    }

    /**
     * Effectively function like JavaScript String.match(RegExp) -- Returns a list from the groups in the regex
     */
    public static List<String> match(String input, @Language("RegExp") String regex) {
        List<String> out = new ArrayList<>();
        Matcher matcher = Pattern.compile(regex).matcher(input);
        while (matcher.find()) {
            out.add(matcher.group());

        }
        return out;
    }
}
