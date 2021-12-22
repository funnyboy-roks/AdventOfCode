package com.funnyboyroks;

import com.funnyboyroks.util.Tuple;
import com.funnyboyroks.util.Util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Day20 {

    public static void main(String[] args) {
        List<String> input = Util.lines(20);

//        input = """
//            ..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#
//
//            #..#.
//            #....
//            ##..#
//            ..#..
//            ..###""".lines().map(String::trim).toList();

        Tuple.Two<String, List<String>> data = parseData(input);

        Util.time(() -> {
//            System.out.println("Part One: " + partOne(data.a(), data.b())); // ##:##
            System.out.println("Part Two: " + partTwo(data.a(), data.b())); // ##:##
        });
    }

    private static Tuple.Two<String, List<String>> parseData(List<String> input) {
        String algo = input.get(0);
        List<String> image = input.subList(2, input.size());
        return new Tuple.Two<>(algo, new ArrayList<>(image));
    }


    public static int partOne(String algo, List<String> image) {
        return run(algo, image, 2);
    }

    public static int partTwo(String algo, List<String> image) {
        // 32028 -- too high
        return run(algo, image, 50);
    }

    public static int run(String algo, List<String> image, int cycles) {
        for (int loop = 0; loop < cycles * 3; loop++) {
            expand(image);
        }
//        System.out.println(image.stream().map(Object::toString).collect(Collectors.joining("\n")));

        for (int loop = 0; loop < cycles; loop++) {
//            expand(image);
//            print(image);
            List<String> newImage = new ArrayList<>();
            for (int y = 1; y < image.size() - 1; y++) {
                String str = "";
                for (int x = 1; x < image.get(y).length() - 1; x++) {
                    String current = "";
                    for (int i = -1; i <= 1; i++) {
                        for (int j = -1; j <= 1; j++) {
                            if (x + i < 0 || y + j < 0 || x + i >= image.get(y + j).length() || y + j >= image.size()) {
                                current += getInsideBorder(image);
                                continue;
                            }
                            current += image.get(y + i).charAt(x + j);
                        }
                    }
//                    current += image.get(Math.max(0, y - 1)).substring(Math.max(0, x - 1), Math.min(x + 2, image.get(y).length()));
//                    current += image.get(y).substring(Math.max(0, x - 1), Math.min(x + 2, image.get(y).length()));
//                    current += image.get(Math.min(y + 1, image.size() - 1)).substring(Math.max(0, x - 1), Math.min(x + 2, image.get(y).length()));
                    int n = Integer.parseInt(current.replaceAll("#", "1").replaceAll("\\.", "0"), 2);
                    str += algo.charAt(n);
                }
                newImage.add(str);
            }
            image = newImage;
        }

        System.out.println();

        shrink(image);
        shrink(image);
        shrink(image);
        shrink(image);
        shrink(image);
        shrink(image);
        shrink(image);
        shrink(image);
        print(image);

        return sum(image);
    }

    public static void expand(List<String> list) {
        for (int i = 0; i < list.size(); i++) {
            String l = list.get(i);
            list.set(i, (".%s.").formatted(l));
        }
        String str = list.get(0).replaceAll(".", ".");
        list.add(0, str);
        list.add(str);
    }

    public static void shrink(List<String> list) {
        List<String> newList = new ArrayList<>();
        for (int i = 1; i < list.size() - 1; i++) {
            String l = list.get(i);
            newList.add(l.substring(1, l.length() - 1));
        }
        list.clear();
        list.addAll(newList);
    }

//    public static void print(List<List<String>> l) {
//        for (List<String> row : l) {
//            System.out.println(String.join("", row));
//        }
//    }

    public static char getInsideBorder(List<String> grid) {
        String top = grid.get(1).substring(1, grid.get(1).length() - 1);
        String bottom = grid.get(grid.size() - 2).substring(1, grid.get(1).length() - 1);
        return top.equals(bottom) ? top.charAt(0) : '.';
    }

    public static void print(List<String> l) {
        System.out.println(String.join("\n", l));//.replaceAll("#", "█").replaceAll("\\.", " "));
    }

    public static int sum(List<String> l) {
        int sum = 0;
        for (String row : l) {
            sum += row.chars().filter(c -> c == '#').count();
        }
        return sum;
    }
}