import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Map;
import java.util.stream.Collectors;

public class One {

    public record RulesComp(int[][] rules) implements Comparator<Integer> {

		@Override
		public int compare(Integer arg0, Integer arg1) {
            for (int[] x : this.rules) {
                if (x[0] == arg0 && x[1] == arg1) {
                    return -1;
                } else if (x[0] == arg1 && x[1] == arg0) {
                    return 1;
                }
            }
            return 0;
		}

    }

    public static void main(String[] args) throws IOException {
        String file = Files.readString(Path.of(args[0]));
        String[] split = file.split("\n\n");
        var rules = new RulesComp(Arrays.stream(split[0].split("\n"))
            .map(s -> Arrays.stream(s.split("\\|"))
                .mapToInt(Integer::parseInt)
                .toArray()
            )
            .toArray(int[][]::new));
        var updates = split[1].lines()
            .map(l -> Arrays.stream(l.split(","))
                .map(Integer::parseInt)
                .toList()
            ).toList();

        var count = updates.stream()
            .filter(s -> {
                return s.stream().sorted(rules).toList().equals(s);
            })
            .mapToInt(s -> s.get(s.size() / 2))
            .sum();
        System.out.println(count);
    }
}
