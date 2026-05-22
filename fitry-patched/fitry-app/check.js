const fs = require('fs');
const content = fs.readFileSync('src/data/courses.js', 'utf8');
const matches = [...content.matchAll(/title:\s*['"](.*?)['"]/g)];
console.log(matches.map(m => m[1]).filter((v, i, a) => a.indexOf(v) === i).slice(0, 15));
