fs = require('fs');


let goodPw = [];
fs.readFile('input', 'utf8', (err, data) => {

    let vals = []
    for(let x of data.split('\n')){
        vals.push(x);
    }

    for(let x of vals){
        let policy = x.split(':')[0];
        let pw = x.split(':')[1].replace(/ /g,'');

        let pcount = policy.split(' ')[0].replace(/[ :]/g,'')
        let pchar = policy.split(' ')[1]

        let count = 0;
        for(let y of pw.split('')){
            if(y == pchar){
                count ++
            }
        }
        if(count >= +pcount.split('-')[0] && count <= +pcount.split('-')[1]){
            goodPw.push(pw)
        }
        
    }

    console.log(goodPw.length)
})