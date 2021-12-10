package com.funnyboyroks;

import java.util.*;
import java.util.stream.Collectors;

public class DayTen {

    public static void main(String[] args) {
        List<String> data = Util.lines(10);
//        data = """
//            [({(<(())[]>[[{[]{<()<>>
//            [(()[<>])]({[<{<<[]>>(
//            {([(<{}[<>[]}>{[]{[(<()>
//            (((({<>}<{<{<>}{[]{[]{}
//            [[<[([]))<([[{}[[()]]]
//            [{[{({}]{}}([{[{{{}}([]
//            {<[[]]>}<{[{[{[]{()[[[]
//            [<(<(<(<{}))><([]([]()
//            <{([([[(<>()){}]>(<<{{
//            <{([{{}}[<[[[<>{}]]]>[]]""".lines().map(String::trim).toList();

//        System.out.println(partOne(data)); // 12:22
            System.out.println(partTwo(data)); // 26:59 - I'm dumb
    }

    public static Map<Character, Integer> ERR_PTS = new HashMap<>();
    public static Map<Character, Integer> AC_PTS = new HashMap<>();

    static {
        ERR_PTS.put(')', 3);
        ERR_PTS.put(']', 57);
        ERR_PTS.put('}', 1197);
        ERR_PTS.put('>', 25137);

        AC_PTS.put('(', 1);
        AC_PTS.put('[', 2);
        AC_PTS.put('{', 3);
        AC_PTS.put('<', 4);
    }

    public static int partOne(List<String> data) {

        int sum = 0;
        for (String line : data) {
            Stack<Character> stack = new Stack<>();
            lineLoop:
            for (char c : line.toCharArray()) {
                switch (c) {
                    case '(':
                    case '[':
                    case '{':
                    case '<':
                        stack.push(c);
                        break;
                    case ')':
                    case ']':
                    case '}':
                    case '>':
                        if (stack.isEmpty()) {
                            break;
                        }
                        char top = stack.pop();
                        if (top == '(' && c != ')' || top == '[' && c != ']' || top == '{' && c != '}' || top == '<' && c != '>') {
                            sum += ERR_PTS.get(c);
                            System.out.println(c);
                            break lineLoop;
                        }
                        break;
                }
            }
        }

        return sum;
    }

    public static boolean valid(String line) {
        Stack<Character> stack = new Stack<>();
        for (char c : line.toCharArray()) {
            switch (c) {
                case '(', '[', '{', '<' -> stack.push(c);
                case ')', ']', '}', '>' -> {
                    if (stack.isEmpty()) {
                        break;
                    }
                    char top = stack.pop();
                    if (top == '(' && c != ')' || top == '[' && c != ']' || top == '{' && c != '}' || top == '<' && c != '>') {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    public static long partTwo(List<String> data) {

        data = data.stream().filter(DayTen::valid).collect(Collectors.toList());

        // Bruh, spent 10 minutes because I was using ints and not longs 🤦
        List<Long> sums = new ArrayList<>();
        for (String line : data) {
            Stack<Character> stack = new Stack<>();
            for (char c : line.toCharArray()) {
                switch (c) {
                    case '(', '[', '{', '<' -> stack.push(c);
                    case ')', ']', '}', '>' -> stack.pop();
                }
            }
            String chars = stack.stream().map(Object::toString).collect(Collectors.joining(""));
            long sum = 0;
            while(!stack.isEmpty()) {
                sum *= 5;
                sum += AC_PTS.get(stack.pop());
            }
            System.out.println(chars + " - " + sum);
            sums.add(sum);

        }
        System.out.println(sums.size());
        Collections.sort(sums);
        return sums.get(sums.size() / 2);
    }

}