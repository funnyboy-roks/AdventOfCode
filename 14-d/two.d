import std.algorithm;
import std.array;
import std.conv : to;
import std.file;
import std.stdio;
import std.string;

int wrapMod(int n, int d) => ((n % d) + d) % d;

struct Vector2 {
    int x, y;

    static Vector2 fromString(string s) {
        auto a = s.split(',').map!(to!int);
        return Vector2(a[0], a[1]);
    }

    Vector2 opBinary(string op : "+")(Vector2 rhs) => Vector2(this.x + rhs.x, this.y + rhs.y);

    Vector2 opBinary(string op : "%")(Vector2 rhs) => Vector2(wrapMod(this.x, rhs.x), wrapMod(this.y, rhs.y));

    Vector2 opBinary(string op : "*")(int rhs) => Vector2(this.x * rhs, this.y * rhs);

    bool opEquals(Vector2 o) => this.x == o.x && this.y == o.y;
}

struct Robit {
    Vector2 p, v;
}

void main(string[] args) {
    auto content = readText(args[$-1]);
    auto robits = content
        .strip()
        .split('\n')
        .map!((s) {
            auto a = s.split(' ')
                      .map!(s => s.split('=')[1])
                      .map!(Vector2.fromString);
            return Robit(a[0], a[1]);
        })
        .array();
    auto size = Vector2(101, 103);

    int i;
outer:
    for (i = 0;; ++i) {
        auto pos = robits.map!((r) => (r.p + r.v*i)%size).array();

        foreach (p; pos) {
            bool all = true;
            for (int j = 0; j < 5; ++j) {
                if (
                        !pos.canFind(p + Vector2(0, j))
                        || !pos.canFind(p + Vector2(j, 0))
                ) {
                    all = false;
                }
            }
            if (all) break outer;
        }
    }

    writeln(i);
}
