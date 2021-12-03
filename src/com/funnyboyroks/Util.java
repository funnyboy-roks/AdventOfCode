package com.funnyboyroks;

import org.intellij.lang.annotations.Language;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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

    public static String[] lines(int day) {
        return getInput(day).split("\n");
    }

    public static String[] split(int day, String delimiter) {
        return getInput(day).split(delimiter);
    }

    public static List<Integer> ints(int day, String delimiter) {
        return Arrays.stream(split(day, delimiter)).map(Integer::parseInt).collect(Collectors.toList());
    }

    public static List<Integer> ints(int day) {
        return ints(day, "\n");
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
