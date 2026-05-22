const fs = require('fs');
const path = require('path');

const coursesPath = path.join(__dirname, 'src', 'data', 'courses.js');
let coursesContent = fs.readFileSync(coursesPath, 'utf-8');

const jsTheory = JSON.parse(fs.readFileSync(path.join(__dirname, 'js-theory.json'), 'utf-8'));
const cyberTheory = JSON.parse(fs.readFileSync(path.join(__dirname, 'cyber-theory.json'), 'utf-8'));
const javaTheory = JSON.parse(fs.readFileSync(path.join(__dirname, 'java-theory.json'), 'utf-8'));
const rnTheory = JSON.parse(fs.readFileSync(path.join(__dirname, 'react-native-theory.json'), 'utf-8'));

const allTheory = { ...jsTheory, ...cyberTheory, ...javaTheory, ...rnTheory };

let modifications = 0;

function injectTheory() {
  const lines = coursesContent.split('\n');
  let newLines = [];
  
  let currentCourseTitle = null;
  let currentLevelLabel = null;
  let currentLessonTitle = null;
  
  let i = 0;
  while (i < lines.length) {
    let line = lines[i];
    let indentLength = line.length - line.trimStart().length;
    
    // Check course title
    if (line.trimStart().startsWith('title:') && indentLength === 4) {
      const match = line.match(/title:\s*"([^"]+)"/);
      if (match) currentCourseTitle = match[1];
    }
    
    // Check level label
    if (line.includes('label:') && indentLength === 8) {
      const match = line.match(/label:\s*"([^"]+)"/);
      if (match) currentLevelLabel = match[1];
    }
    
    // Check lesson title
    if (line.trimStart().startsWith('title:') && indentLength === 12) {
      const match = line.match(/title:\s*"([^"]+)"/);
      if (match) currentLessonTitle = match[1];
    }
    
    // Check content
    if (line.trimStart().startsWith('content:')) {
      if (currentCourseTitle && currentLevelLabel && currentLessonTitle) {
        if (allTheory[currentCourseTitle] && allTheory[currentCourseTitle][currentLevelLabel] && allTheory[currentCourseTitle][currentLevelLabel][currentLessonTitle]) {
          const newTheory = allTheory[currentCourseTitle][currentLevelLabel][currentLessonTitle];
          
          // Replace content
          const indent = ' '.repeat(indentLength);
          newLines.push(`${indent}content: \`${newTheory.replace(/`/g, '\\`')}\`,`);
          
          // Skip the old content lines
          i++;
          while (i < lines.length) {
            const nextLine = lines[i];
            const nextIndent = nextLine.length - nextLine.trimStart().length;
            
            // If we encounter a new property at the same indentation level (like mcq: or challenge:), stop skipping
            if (nextIndent === indentLength && nextLine.trim() !== '' && !nextLine.trimStart().startsWith('+') && !nextLine.trimStart().startsWith('"')) {
              break;
            }
            i++;
          }
          modifications++;
          continue; // don't push the current line
        } else {
          console.log(`Missing theory for: ${currentCourseTitle} > ${currentLevelLabel} > ${currentLessonTitle}`);
        }
      }
    }
    
    newLines.push(line);
    i++;
  }
  
  fs.writeFileSync(coursesPath, newLines.join('\n'), 'utf-8');
  console.log(`Successfully enriched ${modifications} lessons.`);
}

injectTheory();
