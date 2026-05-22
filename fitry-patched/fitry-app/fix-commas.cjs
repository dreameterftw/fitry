const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/courses.js');
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('starterCode: "')) {
    // Check previous line, if it's not empty and doesn't end with a comma, add one
    let prevIndex = i - 1;
    while (prevIndex >= 0 && lines[prevIndex].trim() === '') {
      prevIndex--;
    }
    
    if (prevIndex >= 0) {
      const prevLine = lines[prevIndex];
      // Check if it ends with a comma
      if (!prevLine.trim().endsWith(',') && !prevLine.trim().endsWith('{')) {
        lines[prevIndex] = prevLine + ',';
      }
    }
  }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Fixed missing commas!');
