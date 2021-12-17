package com.funnyboyroks.refactor;

import com.funnyboyroks.util.Util;

import java.awt.Point;
import java.util.List;

public class DayTwoA {

    public static void main(String[] args) {
        List<Command> data = Util.values(2, Command::new);

        System.out.println(" - " + Util.time(() -> partOne(data)));
        System.out.println(" - " + Util.time(() -> partTwo(data)));
    }

    public static void partOne(List<Command> data) {

        Point pos = new Point(0, 0);
        for (Command inst : data) {
            pos.translate(
                inst.control.dx * inst.a,
                inst.control.dy * inst.a
            );
        }
        System.out.println(pos.x * pos.y);
    }


    public static void partTwo(List<Command> data) {
        Point pos = new Point(0, 0);
        int aim = 0;
        for (Command cmd : data) {
            switch (cmd.control) {
                case UP -> aim -= cmd.a;
                case DOWN -> aim += cmd.a;
                case FORWARD -> pos.translate(cmd.a, aim * cmd.a);
            }
        }
        System.out.println(pos.x * pos.y);
    }

    private static final class Command {

        private final Control control;
        private final int a;

        public Command(String... args) {
            this.control = Control.valueOf(args[0].toUpperCase());
            this.a = Integer.parseInt(args[1]);
        }

        public Command(String s) {
            this(s.split(" "));
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

}
