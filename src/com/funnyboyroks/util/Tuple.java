package com.funnyboyroks.util;

public class Tuple {

    public record Two<A, B>(A a, B b) {

    }

    public record Three<A, B, C>(A a, B b, C c) {

    }

    public record Four<A, B, C, D>(A a, B b, C c, D d) {

    }

    public record Five<A, B, C, D, E>(A a, B b, C c, D d, E e) {

    }

}
