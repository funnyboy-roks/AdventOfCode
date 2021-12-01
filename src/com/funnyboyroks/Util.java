package com.funnyboyroks;

import java.io.File;
import java.util.Scanner;

public class Util {

    public static void main(String[] args) {
        // write your code here
    }

    public static Scanner getFile(String s) {
        try {
            return new Scanner(new File(s));
        } catch (Exception e) {
            System.out.println("File `" + s + "` not found");
            System.exit(0);
        }
        return null;
    }

    public static String getInput(String s) {
        Scanner sc = getFile(s);
        StringBuilder sb = new StringBuilder();
        while (sc.hasNextLine()) {
            sb.append('\n').append(sc.nextLine());
        }

        return sb.toString();
    }
}