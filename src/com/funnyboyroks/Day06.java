package com.funnyboyroks;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.LongStream;

public class Day06 {

    public static void main(String[] args) {
        List<Integer> data = Util.ints(6, ",");
//        data = List.of(3, 4, 3, 1, 2); // sample

        System.out.printf("One: %s%n", partOne(data)); // 00:09:11
//        System.out.printf("Two: %s%n", partTwo(data)); // 01:02:01
    }

    public static int partOne(List<Integer> data) {
        List<Fish> fish = data.stream().map(Fish::new).collect(Collectors.toList());
        for (int i = 0; i < 80; i++) {
            fish = fish.stream().flatMap(f -> f.tick().stream()).toList();
        }
        return fish.size();
    }

    public static long P(int t, int P0, double r) {
        return (long) (P0 * Math.exp(r * t));
    }

    public static long partTwo(List<Integer> data) { // (Comments written for clarity after submission)

        // Groups of fish numbers by days left -- effectively Map<Integer, Integer>
        long[] dayGroups = new long[9];

        // Update the values to count the amount in each group
        for (int d : data) {
            dayGroups[d]++;
        }

        for (int i = 0; i < 256; i++) {
            long d0 = dayGroups[0]; // Get the amount of fish at day 0 to add new fish and move to dayGroups[6]
            System.arraycopy(dayGroups, 1, dayGroups, 0, 8); // Rotate left (decrease all fish)
            dayGroups[6] += dayGroups[8] = d0; // Why not double assignment? :)
        }

        return LongStream.of(dayGroups).reduce(0, Long::sum); // Sum all numbers
    }

    public static class Fish {

        int daysLeft;

        public Fish(int daysLeft) {
            this.daysLeft = daysLeft;
        }

        public List<Fish> tick() {
            daysLeft--;
            if (daysLeft == -1) {
                daysLeft = 6;
                return List.of(this, new Fish(8));
            }
            return List.of(this);
        }
    }

}
