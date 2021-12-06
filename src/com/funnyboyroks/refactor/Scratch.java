package com.funnyboyroks.refactor;

import com.funnyboyroks.Util;

import java.util.Scanner;

class Scratch {

    public static final int LENGTH = 5;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int a = scanner.nextInt();
        int b = scanner.nextInt();

        System.out.printf("  %s | %d\n& %s | %d\n= %s | %d\n", s(a), a, s(b), b, s(a | b), a | b);

        int n = 0;
        for (int i = 0; i < LENGTH; i++) {
//            if(((int) Math.pow(2, LENGTH-1-i) & a) > 0) {
                n |= (int) Math.pow(2, i) & a;
//            }
        }
        System.out.println(n);
    }

    public static String s(int n) {
        return Util.padStart(Integer.toString(n, 2), LENGTH, '0');
    }
}