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
        
        let pos1 = pw[(+pcount.split('-')[0])-1] == pchar
        let pos2 = pw[(+pcount.split('-')[1])-1] == pchar
        if((pos1 || pos2) && pos1 != pos2){
            goodPw.push(pw)
        }
        
    }

    console.log(goodPw.length)
})