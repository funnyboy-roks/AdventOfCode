#include <assert.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>


int check_position(size_t width, size_t height, size_t x, size_t y, const char *buf) {
#define B(x, y, chr) (0 <= x && x < width && 0 <= y && y < height && buf[(y) * width + (x)] == chr)
    return (
        B(x, y, 'A')
        && (
            B(x - 1, y - 1, 'M') && B(x + 1, y + 1, 'S')
            || B(x - 1, y - 1, 'S') && B(x + 1, y + 1, 'M')
        ) && (
            B(x - 1, y + 1, 'M') && B(x + 1, y - 1, 'S')
            || B(x - 1, y + 1, 'S') && B(x + 1, y - 1, 'M')
        )
    );
}

int main(int argc, const char **argv) {
    assert(argc == 2);
    FILE *file = fopen(argv[1], "rb");

    char *line = NULL;
    size_t buf_len = 0;

    size_t lines = 0;
    ssize_t width;
    ssize_t len;
    while ((len = getline(&line, &buf_len, file)) > 0) {
        width = len;
        lines += 1;
    }
    fseek(file, 0, SEEK_SET);

    printf("width, height = %ld, %lu\n", width, lines);
    char *buf = malloc(width * lines * sizeof(char));

    size_t y = 0;
    while ((len = getline(&line, &buf_len, file)) > 0) {
        memcpy(&buf[y * width], line, width);
        y += 1;
    }

    // printf("%.*s\n", width * lines, buf);
    int match = 0;
    for (size_t y = 0; y < lines; ++y) {
        for (size_t x = 0; x < width; ++x) {
            match += check_position(width, lines, x, y, buf);
        }
    }
    printf("%d\n", match);
}
