package com.funnyboyroks.refactor;

import com.funnyboyroks.util.Util;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class DayFour {

    public static void main(String[] args) {
        String data = Util.getInput(4);
//        data = """
//            7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1
//
//            22 13 17 11  0
//             8  2 23  4 24
//            21  9 14 16  7
//             6 10  3 18  5
//             1 12 20 15 19
//
//             3 15  0  2 22
//             9 18 13 17  5
//            19  8  7 25 23
//            20 11 10 24  4
//            14 21 16 12  6
//
//            14 21 17 24  4
//            10 16 15  9 19
//            18  8 23 26 20
//            22 11 13  6  5
//             2  0 12  3  7""";

//        partOne(data); // 23:53
        partTwo(data); // 01:26:09
    }

    private static List<List<List<Square>>> parseBoards(String data) {
        String[] split = data.split("\n{2}");
        List<String> boardStrs = List.of(split).subList(1, split.length);
        List<List<List<Square>>> boards = new ArrayList<>();
        for (String boardStr : boardStrs) {
            List<List<Square>> board = new ArrayList<>();
            for (String row : boardStr.split("\n")) {
                row = row.trim();
                List<Square> ints = Stream.of(row.split("\\s+"))
                    .map(Integer::parseInt)
                    .map(Square::new)
                    .collect(Collectors.toList());
                board.add(ints);

            }
            boards.add(board);
        }
        return boards;
    }

    public static int checkBingoWinners(List<List<List<Square>>> boards) {
        for (int i = 0; i < boards.size(); i++) {
            List<List<Square>> board = boards.get(i); // Check rows
            for (List<Square> row : board) {
                if (row.stream().allMatch(s -> s.checked)) {
                    return i;
                }
            }
        }
        for (int k = 0; k < boards.size(); k++) {
            List<List<Square>> board = boards.get(k); // Check columns
            for (int i = 0; i < board.get(0).size(); i++) {
                List<Square> col = new ArrayList<>();
                boolean j = true;
                for (List<Square> l : board) {
                    Square square = l.get(i);
                    j &= square.checked;
                }
                if (j) {
                    return k;
                }
                ;

            }
        }
        return -1;
    }

    public static boolean isBingoWinner(List<List<Square>> board) {
        for (List<Square> row : board) {
            if (row.stream().allMatch(s -> s.checked)) {
                return true;
            }
        }
        for (int i = 0; i < board.get(0).size(); i++) {
            int finalI = i;
            if(board.stream().map(l -> l.get(finalI))
                .allMatch(s -> s.checked)) return true;

        }
        return false;
    }


    public static void partOne(String data) {
        List<List<List<Square>>> boards = parseBoards(data);
        System.out.println(boards.get(0));
        List<Integer> input = Arrays.stream(data.lines().toList().get(0).split(",")).map(Integer::parseInt).collect(Collectors.toList());
        while (!input.isEmpty()) {
            int val = input.remove(0);
            checkOffBoards(boards, val);
            int winnerI = checkBingoWinners(boards);
            List<List<Square>> winner = winnerI == -1 ? null : boards.get(winnerI);
            if (winner != null) {
                System.out.println(val);
                System.out.println(winner);
                System.out.println(uncheckedSum(winner) * val);
                break;
            }
        }
    }

    private static void checkOffBoards(List<List<List<Square>>> boards, int val) {
        for (List<List<Square>> board : boards) {
            for (List<Square> row : board) {
                for (Square square : row) {
                    if (val == square.num) {
                        square.checked = true;
                    }
                }
            }
        }
    }

    private static int uncheckedSum(List<List<Square>> board) {
        return board.stream().flatMap(Collection::stream).filter(s -> !s.checked).mapToInt(s -> s.num).sum();
    }

    public static void partTwo(String data) { // This is absolute shit, but I just kinda gave up and starting typing random stuff after a while lol
        List<List<List<Square>>> boards = parseBoards(data);
        List<Integer> input = Arrays.stream(data.lines().toList().get(0).split(",")).map(Integer::parseInt).collect(Collectors.toList());
        List<Map.Entry<List<List<Square>>, Integer>> winners = new ArrayList<>();
        for (int val : input) {
            checkOffBoards(boards, val);
            int winnerI = checkBingoWinners(boards);
            List<List<Square>> winner = winnerI == -1 ? null : boards.get(winnerI);
            if (winner != null) {
                boards= boards.stream().filter(board -> !isBingoWinner(board)).collect(Collectors.toList());
                winners.add(new AbstractMap.SimpleEntry<>(winner, val));
            }
        }
////        System.out.println(boards);
//        System.out.println(input);
////        checkOffBoards(boards, input.get(0));
//        System.out.println(input.get(0) * uncheckedSum(boards.get(0)));
        System.out.println(winners.toString().replaceAll("\\[\\[", "\n\n[[").replaceAll("], ", "],\n"));
        Map.Entry<List<List<Square>>, Integer> win = winners.get(winners.size() - 1);
        System.out.println(uncheckedSum(win.getKey()) * win.getValue());

    }

    private static class Square {

        int num;
        boolean checked;

        public Square(int num) {
            this.num = num;
            this.checked = false;
        }

        @Override
        public String toString() {
            return num + (checked ? "*" : "");
        }
    }

}
