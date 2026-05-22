// ─────────────────────────────────────────────────────────────
//  Firestore helpers — all user data reads/writes go here
//  Updated for tiered progression system
// ─────────────────────────────────────────────────────────────
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// Create a new user document when they sign up
export async function createUserProfile(uid, { displayName, email, track = '' }) {
  await setDoc(doc(db, 'users', uid), {
    displayName,
    email,
    track,
    xp: 0,
    streak: 0,
    totalHours: 0,
    avgScore: 0,
    lessonsCompleted: 0,
    courseProgress: {},
    quizDone: false,
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
  });

  // Also initialize leaderboard entry
  try {
    await setDoc(doc(db, 'leaderboard', uid), {
      uid,
      displayName,
      photoURL: null,
      selectedTrack: track || 'HTML & CSS',
      totalXP: 0,
      weeklyXP: 0,
      league: 'Bronze',
      rankDelta: 'NEW',
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('Failed to initialize leaderboard document:', err);
  }
}

// Fetch user profile
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

// Update any subset of profile fields
export async function updateUserProfile(uid, fields) {
  await setDoc(doc(db, 'users', uid), { ...fields, lastLogin: serverTimestamp() }, { merge: true });
}

// Save quiz result (track selection)
export async function saveQuizResult(uid, track) {
  await updateDoc(doc(db, 'users', uid), { track, quizDone: true });
}

/*
  courseProgress schema (per course):
  courseProgress.{courseId} = {
    currentLevel: 'beginner' | 'intermediate' | 'advanced',
    levels: {
      beginner:     { unlocked: true,  completed: false, lessons: { 1: { theory: true, mcq: true, challenge: true, score: 85 }, ... }, project: { completed: false, score: null } },
      intermediate: { unlocked: false, completed: false, lessons: {}, project: { completed: false, score: null } },
      advanced:     { unlocked: false, completed: false, lessons: {}, project: { completed: false, score: null } },
    },
    totalXp: 0,
  }
*/

const EMPTY_LEVEL = { unlocked: false, completed: false, lessons: {}, project: { completed: false, score: null } };

// Initialize course progress for a user
export function getDefaultCourseProgress() {
  return {
    currentLevel: 'beginner',
    levels: {
      beginner:     { ...EMPTY_LEVEL, unlocked: true },
      intermediate: { ...EMPTY_LEVEL },
      advanced:     { ...EMPTY_LEVEL },
    },
    totalXp: 0,
  };
}

// Get or initialize course progress
export async function getCourseProgress(uid, courseId) {
  const profile = await getUserProfile(uid);
  const cp = profile?.courseProgress?.[courseId];
  if (cp) return cp;
  const def = getDefaultCourseProgress();
  await updateDoc(doc(db, 'users', uid), { [`courseProgress.${courseId}`]: def });
  return def;
}

// Mark lesson theory as read
export async function markTheoryComplete(uid, courseId, level, lessonId) {
  const path = `courseProgress.${courseId}.levels.${level}.lessons.${lessonId}.theory`;
  await updateDoc(doc(db, 'users', uid), { [path]: true });
}

// Mark MCQ as passed
export async function markMcqComplete(uid, courseId, level, lessonId) {
  const path = `courseProgress.${courseId}.levels.${level}.lessons.${lessonId}.mcq`;
  await updateDoc(doc(db, 'users', uid), { [path]: true });
}

// Mark challenge as completed with score
export async function markChallengeComplete(uid, courseId, level, lessonId, score) {
  const basePath = `courseProgress.${courseId}.levels.${level}.lessons.${lessonId}`;
  await updateDoc(doc(db, 'users', uid), {
    [`${basePath}.challenge`]: true,
    [`${basePath}.score`]: score,
  });
}

// Mark mini project as completed
export async function markProjectComplete(uid, courseId, level, score) {
  const path = `courseProgress.${courseId}.levels.${level}.project`;
  await updateDoc(doc(db, 'users', uid), {
    [`${path}.completed`]: true,
    [`${path}.score`]: score ?? null,
  });
}

// Check if all 5 lessons in a level are complete
export function isLevelComplete(levelData) {
  if (!levelData?.lessons) return false;
  const lessonIds = Object.keys(levelData.lessons);
  if (lessonIds.length < 5) return false;
  return lessonIds.every(id => {
    const l = levelData.lessons[id];
    return l.theory && l.mcq && l.challenge;
  }) && levelData.project?.completed;
}

// Unlock next level if current is complete
export async function tryUnlockNextLevel(uid, courseId, currentLevel) {
  const profile = await getUserProfile(uid);
  const cp = profile?.courseProgress?.[courseId];
  if (!cp) return false;

  const levelOrder = ['beginner', 'intermediate', 'advanced'];
  const idx = levelOrder.indexOf(currentLevel);
  if (idx < 0 || idx >= 2) return false; // already last level

  const currentData = cp.levels[currentLevel];
  if (!isLevelComplete(currentData)) return false;

  const nextLevel = levelOrder[idx + 1];
  if (cp.levels[nextLevel]?.unlocked) return false; // already unlocked

  await updateDoc(doc(db, 'users', uid), {
    [`courseProgress.${courseId}.levels.${currentLevel}.completed`]: true,
    [`courseProgress.${courseId}.levels.${nextLevel}.unlocked`]: true,
    [`courseProgress.${courseId}.currentLevel`]: nextLevel,
  });
  return true;
}

// Add XP to user
export async function addXp(uid, amount, courseId) {
  const profile = await getUserProfile(uid);
  const currentXp = profile?.xp || 0;
  const courseXp = profile?.courseProgress?.[courseId]?.totalXp || 0;
  const newXp = currentXp + amount;

  await updateDoc(doc(db, 'users', uid), {
    xp: newXp,
    [`courseProgress.${courseId}.totalXp`]: courseXp + amount,
  });

  // Also update leaderboard entry in real-time
  try {
    const leaderboardRef = doc(db, 'leaderboard', uid);
    const leaderboardSnap = await getDoc(leaderboardRef);
    if (leaderboardSnap.exists()) {
      const data = leaderboardSnap.data();
      await updateDoc(leaderboardRef, {
        totalXP: newXp,
        weeklyXP: (data.weeklyXP || 0) + amount,
        selectedTrack: profile?.track || 'HTML & CSS',
        displayName: profile?.displayName || data.displayName || 'You',
        updatedAt: new Date().toISOString()
      });
    } else {
      await setDoc(leaderboardRef, {
        uid,
        displayName: profile?.displayName || 'You',
        photoURL: profile?.photoURL || null,
        selectedTrack: profile?.track || 'HTML & CSS',
        totalXP: newXp,
        weeklyXP: amount,
        league: 'Bronze',
        rankDelta: 'NEW',
        updatedAt: new Date().toISOString()
      });
    }
  } catch (err) {
    console.error('Failed to sync XP to leaderboard:', err);
  }
}

// Legacy compat — old saveCourseProgress
export async function saveCourseProgress(uid, courseId, { progress, done, score }) {
  const userRef = doc(db, 'users', uid);
  
  // First update the specific course progress
  await updateDoc(userRef, {
    [`courseProgress.${courseId}.progress`]: progress,
    [`courseProgress.${courseId}.done`]:     done,
    [`courseProgress.${courseId}.score`]:    score ?? null,
  });

  // Fetch updated profile to compute aggregates
  const profile = await getUserProfile(uid);
  if (profile && profile.courseProgress) {
    let totalDone = 0;
    let totalScore = 0;
    let scoreCount = 0;

    Object.entries(profile.courseProgress).forEach(([cid, cpData]) => {
      totalDone += (cpData.done || 0);
      if (typeof cpData.score === 'number' && cpData.score > 0) {
        totalScore += cpData.score;
        scoreCount++;
      }
    });

    const avgScore = scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0;

    await updateDoc(userRef, {
      lessonsCompleted: totalDone,
      avgScore: avgScore,
    });
  }
}

