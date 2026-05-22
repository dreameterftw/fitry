
import courseData from '../src/data/courses.js';

console.log('--- Fitry Course Catalog Audit ---');
Object.entries(courseData).forEach(([id, course]) => {
  const levelCounts = (course.levels || []).map(l => ({
    label: l.label,
    lessons: (l.lessons || []).length
  }));
  const totalLessons = levelCounts.reduce((sum, l) => sum + l.lessons, 0);
  
  console.log(`Course ${id}: ${course.title}`);
  levelCounts.forEach(l => {
    console.log(`  - ${l.label}: ${l.lessons} lessons`);
  });
  console.log(`  TOTAL: ${totalLessons} lessons`);
  console.log('----------------------------------');
});
