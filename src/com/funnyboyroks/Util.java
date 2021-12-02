package com.funnyboyroks;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Util {

    public static void main(String[] args) {
        // write your code here
    }

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
}
