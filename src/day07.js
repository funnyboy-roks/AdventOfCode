import { read, readEx } from './util.js';
import { basename, parse } from 'path';

let data;

const doStuff = () => { // Just edited again :P
	let path = '';
	const lines = data.lines();

	const files = [];
	const dirs = [];

	for (let i = 0; i < lines.length; ++i) {
		const l = lines[i];
        l.log();
		if (l.startsWith('$')) {
			if (l.startsWith('$ cd')) {
				const newPath = l.substring('$ cd '.length);
				if (newPath.startsWith('/')) {
					path = newPath;
				} else if (newPath === '..') {
                    path.log()
					path = path.substring(0, path.substring(0, path.length - 1).lastIndexOf('/') + 1);
                    path.log()
				} else {
					path += newPath + '/';
				}
			}
		} else if (/^\d+/i.test(l)) {
            files.push({
                fullPath: path + l.substring(l.indexOf(' ') + 1),
                size: +l.substring(0, l.indexOf(' ')),
                parent: basename(path),
                fullParent: path,
            });
            // files.log();
        } else if (l.startsWith('dir')) {
            dirs.push(path + l.replaceAll('dir ', ''));
        }
	}
	files.log();
    dirs.log();
    const getParents = (f) => {
        if(f.length <= 1) return ['/'];
        return getParents(f.substring(0, f.substring(0, f.length - 1).lastIndexOf('/'))).concat([f.substring(0, f.substring(0, f.length - 1).lastIndexOf('/'))]).truthy()
        // return f.split('/').slice(0, f.split('/').length - 1).map(s => s + '/');
    }
    console.log('parents', getParents('/a/e/i/'))

    const sizes = {};
    files.forEach(f => {
        sizes[f.fullParent] ? sizes[f.fullParent] += f.size : sizes[f.fullParent] = f.size;
    });
    sizes.log();
    sizes.getEntries().forEach(([k, v]) => {
        getParents(k).forEach(p => {
            sizes[p] += v;
        })
    })

    dirs.log();
    dirs.push('/')

    const sizes2 = {};
    dirs.forEach(d => {
        files.forEach(f => {
            if(f.fullPath.startsWith(d)) {
                sizes2[d] ? sizes2[d] += f.size : sizes2[d] = f.size;
            }
        })
    })
    sizes2.log();
    // dirs.forEach(d => {
    //     sizes[parse(d).dir + '/'] += sizes[d] || 0
    // });
    // sizes.log()
    sizes2.values().filter(n => n<=100000).sum().log();

    // Part Two

    const unused = 70000000 - sizes2['/'];
    unused.log('unused');
    const s = [];
    sizes2.getEntries().forEach(([dir, size]) => {

        if(unused + size >= 30000000) {
            s.push(size);
        }

    })
    s.min().log();
};

if (process.argv[2]) {
	console.log('--- --- Running Sample Data --- ---');
	data = await readEx(); // Sample Data

	doStuff();
} else {
	console.log('--- --- Running Real Data --- ---');
	data = await read(); // Real Data

	doStuff(); // 1 - 00:36:05    2 - 00:39:32
}
