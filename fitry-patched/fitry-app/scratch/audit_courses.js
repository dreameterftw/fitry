import courseData from '../src/data/courses.js';

console.log('Course ID | Title | Levels | Lessons per Level | Total Lessons');
console.log('------------------------------------------------------------');

Object.entries(courseData).forEach(([id, course]) => {
    const levelCounts = (course.levels || []).map(l => (l.lessons || []).length);
    const totalLessons = levelCounts.reduce((a, b) => a + b, 0);
    console.log(`${id.padEnd(9)} | ${course.title.padEnd(20)} | ${(course.levels || []).length.toString().padEnd(6)} | ${levelCounts.join(', ').padEnd(17)} | ${totalLessons}`);
});
