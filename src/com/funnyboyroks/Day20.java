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

        input = """
            ..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

            #..#.
            #....
            ##..#
            ..#..
            ..###""".lines().map(String::trim).toList();

        Tuple.Two<String, List<String>> data = parseData(input);

        Util.time(() -> {
//            System.out.println("Part One: " + partOne(data.a(), data.b())); // ##:##
            System.out.println("Part Two: " + partTwo(data.a(), data.b())); // ##:##
        });
    }

    private static Tuple.Two<String, List<String>> parseData(List<String> input) {
        String algo = input.get(0).replaceAll("#", "1").replaceAll("\\.", "0");
        List<String> image = input.subList(2, input.size()).stream().map(s -> s.replaceAll("#", "1").replaceAll("\\.", "0")).toList();
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
        print(image);

        for (int loop = 0; loop < cycles; loop++) {
            List<String> newImage = new ArrayList<>();
            expand(image, 2);
            for (int y = 0; y < image.size(); y++) {
                String str = "";
                for (int x = 0; x < image.get(y).length(); x++) {
                    String current = "";
                    if (y > 0) {
                        current += image.get(y - 1).substring(Math.max(0, x - 1), Math.min(x + 2, image.get(y).length()));
                    }
                    current += image.get(y).substring(Math.max(0, x - 1), Math.min(x + 2, image.get(y).length()));
                    if (y < image.size() - 1) {
                        current += image.get(Math.min(y + 1, image.size() - 1)).substring(Math.max(0, x - 1), Math.min(x + 2, image.get(y).length()));
                    }
                    int n = Integer.parseInt(current, 2);
                    str += algo.charAt(n);
                }
                newImage.add(str);
            }
            image = newImage;
            shrink(image);
        }
        System.out.println();

        print(image);

        return sum(image);
    }

    public static void expand(List<String> list, int amount) {
        String c = "0".repeat(amount);
        for (int i = 0; i < list.size(); i++) {
            String l = list.get(i);
            list.set(i, c + l + c);
        }
        String str = list.get(0).replaceAll(".", "0");
        for (int i = 0; i < amount; i++) {

            list.add(0, str);
            list.add(str);
        }
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

    public static void print(List<String> l) {
        System.out.println(String.join("\n", l).replaceAll("1", "#").replaceAll("0", "."));
    }

    public static int sum(List<String> l) {
        int sum = 0;
        for (String row : l) {
            sum += row.chars().filter(c -> c == '1').count();
        }
        return sum;
    }
}