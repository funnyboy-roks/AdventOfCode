package com.funnyboyroks;

import java.awt.*;
import java.util.Objects;

public class DayTwoA {

    public static void main(String[] args) {
        String[] input = Util.lines(2);
        Instruction[] data = parseData(input);
//        Instruction[] data = parseData("forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2".split("\n"));

        partOne(data); // 08:55
        // Part 2 done in DayTwoB.java
    }

    public static Instruction[] parseData(String[] data) {
        Instruction[] instructions = new Instruction[data.length];
        for (int i = 0; i < data.length; i++) {
            String[] parts = data[i].split(" ");
            instructions[i] = new Instruction(parts[0], Integer.parseInt(parts[1]));
        }
        return instructions;
    }

    public static void partOne(Instruction[] data) {

        Point pos = new Point(0, 0);
        for (Instruction instruction : data) {

            pos.translate(instruction.control.dx * instruction.a, instruction.control.dy * instruction.a);
        }
        System.out.println(pos.x * pos.y);
    }

    private static final class Instruction {

        private final Control control;
        private final int a;

        private Instruction(Control control, int a) {
            this.control = control;
            this.a = a;
        }

        public Instruction(String control, int a) {
            this.control = Control.valueOf(control.toUpperCase());
            this.a = a;
        }

        public Control control() {
            return control;
        }

        public int a() {
            return a;
        }

        @Override
        public boolean equals(Object obj) {
            if (obj == this) return true;
            if (obj == null || obj.getClass() != this.getClass()) return false;
            var that = (Instruction) obj;
            return Objects.equals(this.control, that.control) &&
                this.a == that.a;
        }

        @Override
        public int hashCode() {
            return Objects.hash(control, a);
        }

        @Override
        public String toString() {
            return "Instruction[" +
                "control=" + control + ", " +
                "a=" + a + ']';
        }


    }

    private enum Control {
        FORWARD(1, 0),
        UP(0, -1),
        DOWN(0, 1),
        ;

        public final int dx;
        public final int dy;

        Control(int dx, int dy) {
            this.dx = dx;
            this.dy = dy;
        }
    }

}
