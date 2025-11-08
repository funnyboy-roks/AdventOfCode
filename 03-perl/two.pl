#!/bin/perl
use warnings;

my $filename = $ARGV[0];
open(FH, '<', $filename) or die $1;

my $s = "";
while (<FH>) { $s .= $_; }
$s =~ s/\s//g;

$s =~ s/don't\(\).*?(do\(\)|$)//g;

my $sum = 0;
while ($s =~ /mul\((\d+),(\d+)\)/g) {
    print "mul(", $1, ", ", $2, ")\n";
    $sum += $1 * $2;
}
print $sum;

close(FH);
