package com.funnyboyroks;

import org.intellij.lang.annotations.Language;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.function.Function;
import java.util.regex.MatchResult;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class Util {

    public static void main(String[] args) {
        List<Integer> list = List.of(1974, 1773, 1841, 1932, 1951, 1852, 2000, 1988, 1998, 1670, 969, 2008, 1713, 2007, 1916, 1286, 1652, 1821, 1730, 2002, 1761, 1656, 814, 1999, 2010, 1936, 1794, 1905, 1250, 1920, 1986, 1709, 1914, 1681, 1820, 1982, 1961, 1931, 1331, 1923, 1972, 1631, 1643, 1719, 1926, 1994, 1952, 1981, 1847, 1774, 1296, 1946, 873, 2005, 173, 2006, 1960, 1872, 1894, 1695, 1769, 1800, 1734, 1675, 1860, 1383, 1947, 1768, 1827, 1877, 1721, 1738, 384, 1996, 1958, 1909, 1639, 1831, 1212, 1627, 1699, 1661, 1653, 1748, 1919, 1983, 1223, 1690, 1948, 1218, 1971, 1969, 1753, 1957, 1977, 1943, 1978, 1778, 1937, 1868, 1641, 1979, 1854, 1959, 1739, 2004, 1964, 760, 1890, 1701, 1940, 1840, 1817, 1966, 1799, 1941, 1934, 1929, 1962, 1691, 1927, 1764, 1945, 795, 1993, 1804, 1693, 1970, 1728, 1818, 1545, 1992, 1965, 1786, 2009, 1980, 1698, 1647, 1935, 1880, 1921, 1904, 1953, 1871, 1671, 1826, 1989, 1950, 1791, 1990, 1949, 1301, 1975, 1968, 1895, 1208, 1424, 1985, 1665, 1685, 1942, 1669, 64, 1832, 1995, 1987, 1955, 352, 1984, 1925, 1891, 1933, 1679, 2001, 1930, 1991, 1227, 1973, 1723, 1683, 132, 1718, 1944, 1908, 1900, 1657, 1954, 92, 1997, 1938, 1976, 1747, 1226, 1782, 1963, 1746, 1540, 1759, 1939);
        System.out.println(sumInts(list, 2020, 3));
    }

    public static File getFile(String s) {
        File f = new File(s);
        if (!f.exists()) {
            throw new RuntimeException("File `" + s + "` not found");
        }
        return f;
    }

    public static String getInput(String path) {
        try {
            return Files.readString(getFile(path).toPath()).trim();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static String getInput(int day) {
        return getInput("input/day" + day + ".txt");
    }

    public static List<String> lines(int day) {
        return getInput(day).lines().collect(Collectors.toList());
    }

    public static List<String> split(int day, String delimiter) {
        return Arrays.stream(getInput(day).split(delimiter)).collect(Collectors.toList());
    }

    public static List<Integer> ints(int day, String delimiter) {
        return split(day, delimiter).stream().map(Integer::parseInt).collect(Collectors.toList());
    }

    public static List<Integer> ints(int day) {
        return ints(day, "\n");
    }

    /**
     * Break a string into lines and map it to certain values
     */
    public static <T> List<T> values(int day, Function<String, T> mapper) {
        return lines(day).stream().map(mapper).collect(Collectors.toList());
    }

    public static String padStart(String s, int finalLength, char c) {
        int len = finalLength - s.length();
        if (len < 0) return s.substring(0, finalLength);
        return (c + "").repeat(len) + s;
    }

    public static String padEnd(String s, int finalLength, char c) {
        int len = finalLength - s.length();
        if (len < 0) return s.substring(0, finalLength);
        return s + (c + "").repeat(len);
    }

    public static String replaceAll(String input, @Language("RegExp") String regex, Function<MatchResult, String> matcher) {
        return Pattern.compile(regex).matcher(input).replaceAll(matcher);
    }

    public static List<Integer> sumInts(Collection<Integer> nums, int sum, int amount) {
        if (amount == 0) return Arrays.asList(1); // Rather than List#of, so it's mutable
        if (amount == 1) return nums.stream().filter(i -> i == sum).collect(Collectors.toList());
        List<Integer> result = new ArrayList<>();
        for (Integer i : nums) {
            int complement = sum - i;
            List<Integer> product = sumInts(nums, complement, amount - 1);
            if (product.size() > 0) {
                result.add(product.get(0));
            }
        }
        return result;
    }

    /**
     * Effectively function like JavaScript String.match(RegExp) -- Returns a list from the groups in the regex
     */
    public static List<String> match(String input, @Language("RegExp") String regex) {
        List<String> out = new ArrayList<>();
        Matcher matcher = Pattern.compile(regex).matcher(input);
        while (matcher.find()) {
            out.add(matcher.group());

        }
        return out;
    }
}
