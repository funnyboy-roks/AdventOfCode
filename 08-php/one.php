<?php
$content = trim(file_get_contents($argv[$argc-1]));
$lines = explode("\n", $content);


$locations = array();

$height = sizeof($lines);
$width = strlen($lines[0]);

for ($y = 0; $y < $height; ++$y) {
    for ($x = 0; $x < $width; ++$x) {
        $char = $lines[$y][$x];
        if ($char != '.') {
            if (array_key_exists($char, $locations)) {
                $locations[$char][] = array($x, $y);
            } else {
                $locations[$char] = array(array($x, $y));
            }
        }
    }
}


$antennas = [];

foreach ($locations as $key => $items) {
    foreach ($items as $self) {
        $self_x = $self[0];
        $self_y = $self[1];
        foreach ($items as $item) {
            if ($self == $item) continue;
            $item_x = $item[0];
            $item_y = $item[1];

            $diff_x = $self_x - $item_x;
            $diff_y = $self_y - $item_y;

            $new_x = $self_x + $diff_x;
            $new_y = $self_y + $diff_y;

            if (0 <= $new_x && $new_x < $width && 0 <= $new_y && $new_y < $height) {
                $antennas[$new_x . "," . $new_y] = 1;
            }

        }
    }
}

var_dump($antennas);

echo sizeof($antennas);
