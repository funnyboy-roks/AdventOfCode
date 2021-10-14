const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const visited = [];

let x = (y = 0);

const hasVisited = (x, y) => {
    for(const house of visited) {
        if(x === house.x && y === house.y) {
            return true;
        }
    }
    return false;
}

for (const c of input) {
	switch (c) {
		case '<':
			x--;
			break;
		case '>':
			x++;
			break;
		case 'v':
			y++;
			break;
		case '^':
			y--;
			break;
	}
    if(!hasVisited(x, y)) {
        visited.push({x,y});
    }
}

console.log(visited.length);
