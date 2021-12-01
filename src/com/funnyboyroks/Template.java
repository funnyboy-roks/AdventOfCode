package com.funnyboyroks;

public class Template {

    public static void main(String[] args) {
        String input = Util.getInput("input1.txt");
        String[] data = parseData(input.trim());

        partOne(data); // ##:##
        partTwo(data); // ##:##
    }

    public static String[] parseData(String input) {
        return input.split("\n");
    }

    public static void partOne(String[] data) {

    }

    public static void partTwo(String[] data) {

    }

}