#!/bin/perl
use warnings;

my $filename = $ARGV[0];
open(FH, '<', $filename) or die $1;

my $sum = 0;
while (<FH>) {
    while ($_ =~ /mul\((\d+),(\d+)\)/g) {
        $sum += $1 * $2;
    }
}
print $sum;

close(FH);
