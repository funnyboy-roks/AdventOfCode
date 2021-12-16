package com.funnyboyroks;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.function.BiFunction;

public class Day16 {

    public static void main(String[] args) {
        String input = Util.getInput(16);
//        input = "D2FE28";
//        input = "38006F45291200";
//        input = "EE00D40C823060";
//        input = "8A004A801A8002F478";
//        input = "620080001611562C8802118E34";
//        input = "CE00C43D881120";

        String data = parseData(input);

        Util.time(() -> {
            System.out.println(partOne(data)); // Didn't finish until next day
            System.out.println(partTwo(data)); // Didn't finish until next day
        });
    }

    public static String parseData(String data) {


        StringBuilder sb = new StringBuilder(new BigInteger(data, 16).toString(2));
        if (data.startsWith("0")) {
            sb.insert(0, "0000");
        }
        if (sb.length() % 4 > 0) {
            int add = (sb.length() / 4 + 1) * 4 - sb.length();
            for (int i = 0; i < add; i++) {
                sb.insert(0, "0");
            }
        }
        return sb.toString();

    }

    // Effectively Map of Integer : Function
    private static final List<BiFunction<Long, Long, Long>> ops = List.of(
        Long::sum,
        (a, b) -> a * b,
        (a, b) -> a < b ? a : b,
        (a, b) -> a > b ? a : b,
        (a, b) -> null, // not used -- type 4 is a value, not op
        (a, b) -> a > b ? 1 : 0L,
        (a, b) -> a < b ? 1 : 0L,
        (a, b) -> Objects.equals(a, b) ? 1 : 0L
    );


    public static int partOne(String data) {
        versionSum = 0;
        pos = 0;
        run(data);
        return versionSum;
    }


    public static long partTwo(String data) {
        versionSum = 0;
        pos = 0;
        return run(data);
    }

    // Global for ease
    private static int versionSum = 0;
    private static int pos = 0;

    public static long run(String data) {
        int version = Integer.parseInt(data.substring(pos, pos + 3), 2);
        int typeId = Integer.parseInt(data.substring(pos + 3, pos + 6), 2);
        versionSum += version;
        pos += 6;

        if (typeId == 4) {
            boolean last = false;
            StringBuilder s = new StringBuilder();
            while (!last) {
                String part = data.substring(pos, pos + 5);
                last = part.startsWith("0");
                s.append(part.substring(1));
                pos += 5;
            }
            return Long.parseLong(s.toString(), 2);
        } else {
            // I love making code confusing :)
            int lenTypeId = Integer.parseInt(data.substring(pos, ++pos), 2);
            int nextLen = lenTypeId == 0 ? 15 : 11;
            int length = Integer.parseInt(data.substring(pos, pos += nextLen), 2);

            List<Long> results = new ArrayList<>();
            switch (lenTypeId) {
                case 0 -> {
                    while (length > 0) {
                        int start = pos;
                        results.add(run(data));
                        length -= pos - start;
                    }
                }
                case 1 -> {
                    for (int i = 0; i < length; i++) {
                        results.add(run(data));
                    }
                }
                default -> throw new RuntimeException("Achievement Get: How did we get here?"); // Because IntelliJ wants a default branch :P
            }

            // Do the operation
            return results
                .stream()
                .reduce((a, b) -> ops.get(typeId).apply(a, b))
                .orElseThrow();
        }
    }


}