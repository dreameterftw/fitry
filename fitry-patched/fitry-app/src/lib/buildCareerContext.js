// ─────────────────────────────────────────────────────────────
//  buildCareerContext — assembles user context for career bot
// ─────────────────────────────────────────────────────────────

import { ROLE_ROADMAPS } from "../data/roleRoadmaps";
import { SALARY_INSIGHTS } from "../data/roleMap";

/**
 * Build a structured context object from user profile + all progress docs.
 * Works with both:
 *   - allProgress from useAllProgress() — subcollection docs with .levels
 *   - user.courseProgress from userStore — embedded map
 */
export function buildCareerContext(user, allProgress) {
  // Derive completed courses from the progress subcollection
  const completedCourses = (allProgress || [])
    .filter(p => {
      // Check subcollection schema (levels.beginner.status)
      if (p.levels?.beginner?.status === "complete") return true;
      // Check embedded schema (levels.beginner.completed)
      if (p.levels?.beginner?.completed) return true;
      return false;
    })
    .map(p => {
      const levels = p.levels || {};
      const highestLevel =
        (levels.advanced?.status === "complete" || levels.advanced?.completed) ? "advanced"
        : (levels.intermediate?.status === "complete" || levels.intermediate?.completed) ? "intermediate"
        : "beginner";

      const totalXP = Object.values(levels).reduce((sum, lv) => sum + (lv.xpEarned || 0), 0);

      return {
        courseId: p.courseId || p.id,
        courseTitle: p.courseTitle || p.id,
        highestLevel,
        totalXP,
      };
    });

  // Find the current in-progress course
  const currentCourse = (allProgress || []).find(p => {
    const levels = p.levels || {};
    return (
      levels.beginner?.status === "in_progress" ||
      levels.intermediate?.status === "in_progress" ||
      levels.advanced?.status === "in_progress"
    );
  });

  // Also check user.courseProgress embedded map for additional context
  const embeddedProgress = user?.courseProgress || {};
  const embeddedCompleted = Object.entries(embeddedProgress)
    .filter(([, cp]) => cp.progress >= 100 || cp.levels?.beginner?.completed)
    .map(([cid]) => cid);

  // Merge completed course titles
  const allCompletedTitles = [
    ...completedCourses.map(c => c.courseTitle),
    ...embeddedCompleted,
  ];

  const track = user?.track || user?.selectedTrack || null;
  const roadmap = ROLE_ROADMAPS[track]?.[0];
  const missingSkills = roadmap?.requiredSkills?.filter(s =>
    !allCompletedTitles.some(cs =>
      cs.toLowerCase().includes(s.toLowerCase())
    )
  ) || [];

  return {
    selectedTrack: track || "Not selected",
    league: user?.league || "bronze",
    totalXP: user?.xp || user?.totalXP || 0,
    currentStreak: user?.streak || user?.currentStreak || 0,
    completedCourses,
    currentCourse: currentCourse ? {
      courseTitle: currentCourse.courseTitle || currentCourse.id,
      currentLevel: Object.entries(currentCourse.levels || {})
        .find(([, v]) => v.status === "in_progress")?.[0] || "beginner",
    } : null,
    missingSkills,
    salaryInsights: SALARY_INSIGHTS,
  };
}

/**
 * Format the context object into a text block for system prompts.
 */
export function formatContextForPrompt(ctx) {
  return `
USER CONTEXT (read this before every response):
Track: ${ctx.selectedTrack}
League: ${ctx.league}
Total XP: ${ctx.totalXP}
Current streak: ${ctx.currentStreak} days
Completed courses: ${ctx.completedCourses.length > 0
    ? ctx.completedCourses.map(c => `${c.courseTitle} (${c.highestLevel})`).join(", ")
    : "None yet"}
Current course: ${ctx.currentCourse
    ? `${ctx.currentCourse.courseTitle}, ${ctx.currentCourse.currentLevel} level`
    : "None"}
Missing skills for target role: ${ctx.missingSkills.length > 0
    ? ctx.missingSkills.join(", ")
    : "None — profile looks strong"}
`.trim();
}
