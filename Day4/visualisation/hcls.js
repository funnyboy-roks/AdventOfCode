fs = require('fs');
utils = require('../../utils.js');
let data = fs.readFileSync('hcls', 'utf8');
console.log('-= Data Loaded =-');

let hexCodes = data.split('\n');

let outHTML = `<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&display=swap" rel="stylesheet"> 
<style>
*{
    font-family: 'JetBrains Mono', monospace;
}
</style>
`;

hexCodes.sort((a, b) =>{
    let hexa = a.replace(/#/, '');
    let hexb = b.replace(/#/, '');
    let hsla = utils.rgbToHsl(
        parseInt(hexa.substr(1,2), 16),
        parseInt(hexa.substr(3,2), 16),
        parseInt(hexa.substr(5,2), 16),
    )
    let hslb = utils.rgbToHsl(
        parseInt(hexb.substr(1,2), 16),
        parseInt(hexb.substr(3,2), 16),
        parseInt(hexb.substr(5,2), 16),
    )
    return hslb[0] - hsla[0];
});

hexCodes.forEach((x) => {
	outHTML += `
    <span style="background: ${x}">${x}</span>`;
});

fs.writeFile('out.html', outHTML, (e) => {
	return;
});
