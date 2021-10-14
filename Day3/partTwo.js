const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const visited = [];

const santa = {
	x: 0,
	y: 0,
};

const roboSanta = {
	x: 0,
	y: 0,
};

const hasVisited = (x, y) => {
	for (const house of visited) {
		if (x === house.x && y === house.y) {
			return true;
		}
	}
	return false;
};

for (let i = 0; i < input.length; ++i) {
	const c = input[i];
	const v = i % 2 == 0 ? santa : roboSanta;
	switch (c) {
		case '<':
			v.x--;
			break;
		case '>':
			v.x++;
			break;
		case 'v':
			v.y++;
			break;
		case '^':
			v.y--;
			break;
	}
	if (!hasVisited(v.x, v.y)) {
		visited.push({ x: v.x, y: v.y });
	}
}

console.log(visited.length);
