package com.funnyboyroks;

import com.funnyboyroks.util.Util;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Day25 {

    /*
    Merry Christmas! :D
     */

    public static void main(String[] args) {
        List<String> input = Util.lines(25);

//        input = """
//            ...>...
//            .......
//            ......>
//            v.....>
//            ......>
//            .......
//            ..vvv..""".lines().toList();
//
//        input = """
//            v...>>.vv>
//            .vv>>.vv..
//            >>.>v>...v
//            >>v>>.>.v.
//            v>v.vv.v..
//            >.>>..v...
//            .vv..>.>v.
//            v.v..>>v.v
//            ....v..v.>""".lines().toList();

        List<List<Character>> data = parseData(input);

        Util.time(() -> {
//            System.out.println("Part One: " + partOne(data)); // ##:##
            try {
                System.out.println("Part Two: " + partTwo(data)); // ##:##
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
    }

    private static List<List<Character>> parseData(List<String> input) {
        return input.stream().map(s -> s.chars().mapToObj(c -> (char) c).collect(Collectors.toList())).collect(Collectors.toList());
    }

    public static int partOne(List<List<Character>> data) {
        System.out.println(data.stream().map(l -> l.stream().map(Object::toString).collect(Collectors.joining())).collect(Collectors.joining("\n")));
        System.out.println("---");
        int i = 0;
        var prev = new ArrayList<>(data);
        while (true) {
            move(data);
            ++i;
            System.out.println("\nSteps: " + i);
//            System.out.println(data.stream().map(l -> l.stream().map(Object::toString).collect(Collectors.joining())).collect(Collectors.joining("\n")));
            if (eq(prev, data)) {
                break;
            }
            prev = new ArrayList<>(data);
        }
        return i;
    }

    private static boolean eq(ArrayList<List<Character>> prev, List<List<Character>> data) {
        for (int y = 0; y < data.size(); y++) {
            List<Character> row = data.get(y);
            List<Character> prevRow = prev.get(y);
            for (int x = 0; x < row.size(); x++) {
                if (row.get(x) != prevRow.get(x)) {
                    return false;
                }
            }
        }
        return true;
    }

    public static int partTwo(List<List<Character>> data) throws InterruptedException {
        String str = "Merry Christmas!";
        int d = 1;
        int i = 0;
        while (true) {
            System.out.print("\r" + str.substring(0, str.length() - i));
            if (i == str.length() - 1 && d == 1 || i == 1 && d == -1) {
                d = -d;
            }
            i += d;
            Thread.sleep(20);

        }
    }

    public static boolean move(List<List<Character>> data) {
        moveRight(data);
        moveDown(data);
        return false;
    }

    public static boolean moveRight(List<List<Character>> data) {
        var newData = copyClear(data);
        boolean moved = false;
        for (int y = 0; y < data.size(); y++) {
            List<Character> row = data.get(y);
            List<Character> newRow = newData.get(y);
            for (int x = 0; x < row.size(); x++) {
                Character c = row.get(x);
                if (c == '>') {
                    int front = (x + 1) % row.size();
//                    System.out.println(
//                        x + ", " + y + " -> " + front + ", " + y
//                    );
                    if (row.get(front) == '.') {
                        newData.get(y).set(front, '>');
                        newData.get(y).set(x, '.');
                        moved = true;
                    } else {
                        newRow.set(x, '>');
                    }
                } else {
                    if (newRow.get(x) != '>') {
                        newRow.set(x, c);
                    }
                }
            }
        }
        data.clear();
        data.addAll(newData);
        return moved;
    }

    public static boolean moveDown(List<List<Character>> data) {
        var newData = copyClear(data);
        boolean moved = false;
        for (int y = 0; y < data.size(); y++) {
            List<Character> row = data.get(y);
            for (int x = 0; x < row.size(); x++) {
                Character c = row.get(x);
                if (c == 'v') {
                    int front = (y + 1) % data.size();
//                    System.out.println(
//                        x + ", " + y + " -> " + x + ", " + front
//                    );
                    if (data.get(front).get(x) == '.') {
                        newData.get(front).set(x, 'v');
                        newData.get(y).set(x, '.');
                        moved = true;
                    } else {
                        newData.get(y).set(x, 'v');
                    }
                } else {
                    if (newData.get(y).get(x) != 'v') {
                        newData.get(y).set(x, c);
                    }
                }
            }
        }
        data.clear();
        data.addAll(newData);
        return moved;
    }

    public static List<List<Character>> copyClear(List<List<Character>> data) {
        // One-liners ftw
        return data.stream().map(l -> new ArrayList<>(l.stream().map(c -> '.').collect(Collectors.toList()))).collect(Collectors.toList());
    }

}