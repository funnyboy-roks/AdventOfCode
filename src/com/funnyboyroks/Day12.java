package com.funnyboyroks;

import com.funnyboyroks.util.Util;

import java.util.*;

public class Day12 {

    public static void main(String[] args) {
        List<String[]> data = Util.values(12, (s) -> s.split("-"));

        Util.time(() -> {

        System.out.println(partOne(data)); // 00:25:01
//        System.out.println(partTwo(data)); // 01:43:12
        });
    }

    public static int partOne(List<String[]> data) {

        Map<String, List<String>> graph = new HashMap<>(); // adjacency list

        for (String[] edge : data) {
            graph.computeIfAbsent(edge[0], k -> new ArrayList<>()).add(edge[1]);
            graph.computeIfAbsent(edge[1], k -> new ArrayList<>()).add(edge[0]);

        }

        List<List<String>> paths = getPaths(graph, "start", "end", new ArrayList<>());

//        System.out.println(paths.stream().map(Object::toString).collect(Collectors.joining("\n")));
        return paths.size();
    }

    public static List<List<String>> getPaths(Map<String, List<String>> graph, String src, String dst, List<String> visited) {
        List<List<String>> paths = new ArrayList<>();
        visited.add(src);

        if (src.equals(dst)) {
            paths.add(visited);
        } else {
            for (String neighbor : graph.get(src)) {
                if (!visited.contains(neighbor.toLowerCase())) {
                    List<String> newVisited = new ArrayList<>(visited);
                    paths.addAll(getPaths(graph, neighbor, dst, newVisited));
                }
            }
        }

        return paths;
    }

    public static Map<String, Integer> smallCaves(List<String> caves) {
        Map<String, Integer> map = new HashMap<>();
        for (String cave : caves) {
            if (cave.toLowerCase().equals(cave) && !cave.equalsIgnoreCase("start") && !cave.equalsIgnoreCase("end")) {
                map.put(cave, map.getOrDefault(cave, 0) + 1);
            }
        }
        return map;
    }

    public static int occurrences(List<String> paths, String str) {
        return (int) paths.stream().filter(s -> s.contains(str)).count();
    }

    public static Map.Entry<String, Integer> mostOccurrences(List<String> paths) {
        Map<String, Integer> caves = smallCaves(paths);
        return caves.entrySet().stream().max(Comparator.comparingInt(Map.Entry::getValue)).orElse(new AbstractMap.SimpleEntry<>("", 0));
    }

    public static List<List<String>> getPaths2(Map<String, List<String>> graph, String src, String dst, List<String> visited) {
        List<List<String>> paths = new ArrayList<>();
        visited.add(src);

        if (src.equals(dst)) {
            paths.add(visited);
        } else {
            for (String neighbor : graph.get(src)) {
                Map.Entry<String, Integer> most = mostOccurrences(visited);
                if ((neighbor.equals("start") || neighbor.equals("end")) && visited.contains(neighbor)) {
                    continue;
                }

                if (
                    neighbor.equals("start") || neighbor.equals("end") || neighbor.toUpperCase().equals(neighbor) || most.getValue() < 2 || !most.getKey().equals(neighbor) && occurrences(visited, neighbor) < 1
                ) {
                    paths.addAll(getPaths2(graph, neighbor, dst, new ArrayList<>(visited)));
                }
            }
        }

        return paths;
    }

    public static int partTwo(List<String[]> data) {

        Map<String, List<String>> graph = new HashMap<>(); // adjacency list

        for (String[] edge : data) {
            graph.computeIfAbsent(edge[0], k -> new ArrayList<>()).add(edge[1]);
            graph.computeIfAbsent(edge[1], k -> new ArrayList<>()).add(edge[0]);

        }

        List<List<String>> paths = getPaths2(graph, "start", "end", new ArrayList<>());

//        System.out.println(paths.stream().map(l -> l + " - " + l.size()).collect(Collectors.joining("\n")));
        return paths.size();
    }

}