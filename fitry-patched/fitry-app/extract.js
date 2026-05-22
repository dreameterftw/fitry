import courseData from './src/data/courses.js';
import fs from 'fs';

const coursesOfInterest = [
  "JavaScript Fundamentals",
  "Cybersecurity Basics",
  "React Native Mobile Apps",
  "Java Programming"
];

const map = {};

for (const key of Object.keys(courseData)) {
  const course = courseData[key];
  if (coursesOfInterest.includes(course.title)) {
     map[course.title] = {};
     for (const level of course.levels) {
         map[course.title][level.label] = [];
         for (const lesson of level.lessons) {
             map[course.title][level.label].push(lesson.title);
         }
     }
  }
}

fs.writeFileSync('lessons_map.json', JSON.stringify(map, null, 2));
console.log('Saved to lessons_map.json');

let output = '';
for (const [id, course] of Object.entries(courseData)) {
  output += `\n--- Course: ${course.title} ---\n`;
  course.levels.forEach((level, i) => {
    if (level.miniProject) {
      output += `Level ${i+1} Project: ${level.miniProject.title}\nBrief: ${level.miniProject.brief}\nExpected Output: ${level.miniProject.expectedOutput}\n\n`;
    } else {
      output += `Level ${i+1}: No Project\n\n`;
    }
  });
}
fs.writeFileSync('projects_audit.txt', output);
console.log('Done!');
