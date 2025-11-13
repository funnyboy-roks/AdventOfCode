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

    Vector2 opBinary(string op : "+")(Vector2 rhs)
    {
        return Vector2(this.x + rhs.x, this.y + rhs.y);
    }

    Vector2 opBinary(string op : "%")(Vector2 rhs)
    {
        return Vector2(wrapMod(this.x, rhs.x), wrapMod(this.y, rhs.y));
    }

    Vector2 opBinary(string op : "*")(int rhs)
    {
        return Vector2(this.x * rhs, this.y * rhs);
    }
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

    auto pos = robits.map!((r) => (r.p + r.v*100)%size).array();

    auto quadrants = [0, 0, 0, 0];

    foreach (p; pos) {
        if (p.x == size.x / 2 || p.y == size.y / 2) continue;
        auto qx = (p.x * 2 / size.x);
        auto qy = (p.y * 2 / size.y);
        auto qi = qy * 2 + qx;
        quadrants[qi] += 1;
    }

    writeln("quadrants = ", quadrants);
    writeln("quadrants = ", quadrants.fold!((a, b) => a * b));
}
