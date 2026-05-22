const fs = require('fs');
const content = fs.readFileSync('src/data/courses.js', 'utf8');
const titles = [];
const matches = content.matchAll(/miniProject:\s*\{[\s\S]*?title:\s*"([^"]+)",\s*brief:\s*"([^"]+)"/g);
for (const match of matches) {
  titles.push({ title: match[1], brief: match[2] });
}
console.log(JSON.stringify(titles, null, 2));
