// ─────────────────────────────────────────────────────────────────────────────
//  API helper — calls Gemini directly from the frontend (Firebase Spark plan)
//  Key is stored in VITE_GEMINI_API_KEY in your .env file
// ─────────────────────────────────────────────────────────────────────────────

import { auth, db } from './firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { SALARY_INSIGHTS } from '../data/roleMap';

// ── Firestore profile & progress helpers ─────────────────────

export async function createUserProfile(uid, displayName, email) {
  await setDoc(doc(db, "users", uid), {
    displayName,
    email,
    photoURL: null,
    selectedTrack: null,        // set after onboarding quiz
    githubUsername: null,
    createdAt: serverTimestamp(),
    lastActiveDate: null,
    totalXP: 0,
    weeklyXP: 0,
    currentStreak: 0,
    longestStreak: 0,
    league: "bronze",
    leagueRank: null,
    rankDelta: 0,
  });
}

export async function initCourseProgress(uid, courseId, courseTitle, domain) {
  await setDoc(doc(db, "users", uid, "progress", String(courseId)), {
    courseId: String(courseId),
    courseTitle,
    domain,
    startedAt: serverTimestamp(),
    lastActivityAt: serverTimestamp(),
    levels: {
      beginner:     { status: "in_progress", unlockedAt: serverTimestamp(), completedAt: null, bestScore: null, xpEarned: 0 },
      intermediate: { status: "locked",      unlockedAt: null,              completedAt: null, bestScore: null, xpEarned: 0 },
      advanced:     { status: "locked",      unlockedAt: null,              completedAt: null, bestScore: null, xpEarned: 0 },
    },
    lessons: {},      // populated as user completes lessons
    isComplete: false,
    completedAt: null,
    certificateId: null,
  });
}

const WORKER_URL = 'https://fitry-proxy.dr3amtoosadr07.workers.dev';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

async function callGroq(systemPrompt, messages, maxTokens = 1000) {
  // Get a fresh Firebase ID token for authenticated access
  const idToken = auth.currentUser
    ? await auth.currentUser.getIdToken()
    : null;

  const contents = [
    { role: 'system', content: systemPrompt },
    ...messages
  ];

  const res = await fetch(`${WORKER_URL}/api/groq`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'X-Firebase-Token': idToken || '',
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: contents,
      max_tokens: maxTokens,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Proxy error ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.';
}

// ── Off-topic guard (career bot) ─────────────────────────────
const OFF_TOPIC_PATTERNS = [
  /\b(write|generate|create|give me|make|build|code|implement|program)\b.{0,40}\b(code|function|script|program|snippet|class|component|algorithm)\b/i,
  /\b(homework|assignment|essay|solve this|answer this|do this for me)\b/i,
  /\b(what is the capital|who invented|history of|explain quantum|recipe for|how to cook|weather|sports|movie|song|lyrics)\b/i,
  /\b(calculate|solve|integral|derivative|equation|matrix|what is \d+)\b/i,
  /\b(i feel sad|i am depressed|relationship advice|my girlfriend|my boyfriend|breakup)\b/i,
  /\b(ignore (previous|above|all) instructions|you are now|pretend you are|act as|DAN|jailbreak|bypass)\b/i,
  /\b(translate this|summarize this article|summarize this text|tldr this)\b/i,
];
const CAREER_KEYWORDS = [
  'career','job','salary','learn','language','path','developer','engineer','data','web',
  'mobile','ai','ml','security','frontend','backend','fullstack','python','javascript',
  'react','java','c++','course','skill','hire','internship','fresher','domain','field',
  'industry','work','role','position','study','worth','future','scope','demand','package',
  'lpa','switch','transition','start','beginner','roadmap','devops','cybersecurity','fitry',
];
const OFF_TOPIC_REPLY =
  '> career.guide: That is outside what I can help with.\n\n' +
  'I am built specifically for tech career guidance.\n\n' +
  'Try asking:\n• "Is web development worth learning in 2026?"\n' +
  '• "What skills do I need for a data science job?"';

function isOffTopic(text) {
  const lower = text.toLowerCase();
  for (const p of OFF_TOPIC_PATTERNS) if (p.test(lower)) return true;
  const wordCount = lower.split(/\s+/).length;
  if (wordCount > 8 && !CAREER_KEYWORDS.some(kw => lower.includes(kw))) return true;
  return false;
}

const CAREER_SYSTEM = `You are Fitry's Career Guide — a focused advisor for tech career guidance ONLY.
YOUR PURPOSE: Help beginners choose the right tech career path and understand what it takes to get there.
WHAT YOU ANSWER: Career path comparisons, salary expectations (₹X–₹Y LPA / $X–$Y), time-to-job-ready estimates, which language to learn first, job market demand in 2026, domain transitions.
CAREER PATHS: Web Development, Mobile Development, Data Science, AI/ML, Cybersecurity, Systems Engineering, UI/UX, Data Engineering, DevOps, Competitive Programming.
WHAT YOU NEVER DO: Write/debug/explain code, answer general knowledge or math, discuss non-career topics.
IF OFF-TOPIC: Reply "I am built only for tech career guidance. Ask me about careers, salaries, learning paths, or which domain suits you best."
RESPONSE FORMAT: Warm, honest, direct. Under 200 words unless detailed comparison asked.

Here is the exact real-time salary insights database for various roles. Always reference these precise ranges when asked about salary or package expectations for these roles in India:
${JSON.stringify(SALARY_INSIGHTS, null, 2)}`;

// ── Mode-specific system prompts ─────────────────────────────

const MODE_PROMPTS = {
  career: `You are a senior tech career advisor specialising in the Indian tech industry.
Based on the user context above, give specific and actionable career advice.
Never give generic advice — always reference their actual track, completed
courses, current level, and missing skills. Be honest, warm, and direct.
If they ask about something outside career guidance, gently redirect them
to the relevant mode (resume coach, interview prep, etc).

Here is the exact real-time salary insights database for various roles. Always reference these precise ranges when asked about salary or package expectations for these roles in India:
${JSON.stringify(SALARY_INSIGHTS, null, 2)}`,

  resume: `You are an expert tech resume coach with 10 years of experience hiring for
top Indian tech companies. Your job is to educate and guide the user on
building a professional resume for their track — not to write it for them
and not to handle any files.

You do NOT accept, read, or generate files or PDFs of any kind. If the user
asks you to read their resume file or generate a PDF, respond with:
"I work purely through conversation — paste the text of your resume section
directly into the chat and I will give you specific feedback on it."

Your coaching approach — follow this order strictly:
1. Start by asking one focused question: do they have a resume, what stage
   are they at, what role are they targeting.
2. Teach one section at a time in this order: Contact info → Summary →
   Skills → Projects → Education → Certifications.
3. For each section explain: what to include, what to avoid, and give a
   concrete example tailored to their track and completed courses from the
   context above.
4. When the user pastes text from their resume into the chat, give specific
   feedback — what works, what to change, and exactly why.
5. If their completed courses are limited, tell them honestly what is missing
   from a resume perspective and recommend the exact Fitry course or level
   to complete next to strengthen it — reference course names from their
   context, not generic suggestions.

Rules:
- One coaching point per message — never overwhelm
- Always reference their actual completed courses when discussing the Skills
  and Projects sections
- Never suggest listing skills they have not yet learned — only suggest
  learning them
- If input looks like a file path, base64 string, or attachment request,
  decline and redirect to pasting text`,

  interview: `You are a technical interviewer conducting a mock interview for a role in
the user's track. Ask one question at a time — never multiple questions
in one message. After the user answers, give brief structured feedback:
what was strong, what was missing or could be improved, then ask the
next question.

Question difficulty must match their progress from the context above —
start with concepts from their completed courses, gradually increase
difficulty. Do not ask about topics they have not covered yet.

Start immediately with: "Let's begin your mock interview for [track] roles.
Here is your first question:" followed by one question.

If the user asks to skip, give them the model answer briefly then move on.
If the user says stop, end the session with a short summary of their
performance — what they did well and one area to focus on.`,

  learn: `You are a learning advisor for Fitry, an online learning platform.
Based on the user context above, recommend exactly what they should
learn next and why — be specific, not generic.

Structure your response as exactly 3 steps:
Step 1: The immediate next thing to do (specific lesson or level in their
  current course)
Step 2: The next course or level to start after that
Step 3: A skill or project that will make them more hireable once Steps
  1 and 2 are done

For each step explain: what it is, why it matters for their target role,
and what it unlocks. Keep each step to 2–3 sentences maximum.
Do not recommend anything outside the Fitry course catalogue unless it
is a free external resource that directly fills a gap.`,

  ready: `You are a hiring manager with 10 years of experience at top Indian tech
companies. The user wants an honest assessment of whether they are ready
to apply for roles in their track.

Based on their completed courses, current level, XP, league, and missing
skills from the context above, give an assessment structured as:

What you have that employers want: (bullet points — be specific)
What is still missing: (bullet points — reference actual missing skills)
Realistic timeline: (if they maintain their current pace, how long to
  be job-ready — base this on their streak and XP progress)
One thing to do this week: (one specific, actionable next step)

Be direct and honest — do not sugarcoat. Be encouraging but realistic.
Never tell someone they are ready if their completed courses do not
support it.`,
};

// ── Public API ────────────────────────────────────────────────

export async function askCareerBot(messages) {
  const last = [...messages].reverse().find(m => m.role === 'user');
  if (last && isOffTopic(last.content)) {
    return { reply: OFF_TOPIC_REPLY, blocked: true };
  }
  const reply = await callGroq(CAREER_SYSTEM, messages, 700);
  return { reply, blocked: false };
}

/**
 * Mode-specific career bot — prepends user context to the right system prompt.
 * @param {string} mode — one of: career, resume, interview, learn, ready
 * @param {string} contextString — formatted user context from formatContextForPrompt()
 * @param {Array} messages — conversation history
 */
export async function askCareerBotWithMode(mode, contextString, messages) {
  const modePrompt = MODE_PROMPTS[mode] || MODE_PROMPTS.career;

  // For career and resume modes, apply off-topic guard
  if (mode === 'career' || mode === 'resume') {
    const last = [...messages].reverse().find(m => m.role === 'user');
    if (last && isOffTopic(last.content)) {
      return { reply: OFF_TOPIC_REPLY, blocked: true };
    }
  }

  const systemPrompt = `${contextString}\n\n${modePrompt}`;
  const reply = await callGroq(systemPrompt, messages, 800);
  return { reply, blocked: false };
}

export async function askCourseBot(messages, { lessonTitle, challenge, expectedOutput = '', hints = [], askCount = 0 }) {
  const giveAnswer = askCount >= 3;
  const system = `You are a patient coding assistant on Fitry, an educational platform for beginners.
CURRENT LESSON: "${lessonTitle}"
CHALLENGE: ${challenge}
EXPECTED OUTPUT: ${expectedOutput}
AVAILABLE HINTS: ${hints.length ? hints.join(' | ') : 'None'}
TIMES ASKED: ${askCount}
${giveAnswer
    ? 'The student has asked 3+ times. You MAY now provide the complete solution with a clear explanation.'
    : `Do NOT give the full answer yet. Give one small, specific hint. Student has asked ${askCount} time(s).`}
- Never answer questions unrelated to this lesson. Say: "I am only here to help with this lesson!"
- Be encouraging — this is a complete beginner
- Keep responses under 150 words unless showing code. Format code with backticks.`;

  const reply = await callGroq(system, messages, 600);
  return { reply, gaveAnswer: giveAnswer };
}

export async function gradeSubmission({ submission, challenge, expectedOutput, lessonTitle = 'Unknown Lesson' }) {
  const system = `You are a coding instructor grading a beginner student's submission on Fitry.
LESSON: ${lessonTitle}
CHALLENGE: ${challenge}
EXPECTED OUTPUT: ${expectedOutput}
GRADING RULES:
- Be encouraging but honest. Award partial credit generously.
- Score 0–100: 90–100=essentially correct, 70–89=mostly correct, 50–69=partial, 0–49=missing core concepts
- passed = true if score >= 60
- Keep feedback under 60 words
- Give 1–3 concrete improvement tips
RESPOND WITH ONLY VALID JSON — no markdown, no backticks, no preamble:
{"score":<0-100>,"passed":<boolean>,"feedback":"<string>","improvements":["<tip1>","<tip2>"]}`;

  const raw = await callGroq(system, [{ role: 'user', content: `Student submission:\n\n${submission}` }], 400);
  const clean = raw.replace(/```json|```/g, '').trim();
  let parsed;
  try { parsed = JSON.parse(clean); }
  catch { parsed = { score: 65, passed: true, feedback: 'Your submission was received. Keep going!', improvements: [] }; }

  return {
    score:        typeof parsed.score === 'number' ? Math.min(100, Math.max(0, parsed.score)) : 65,
    passed:       typeof parsed.passed === 'boolean' ? parsed.passed : parsed.score >= 60,
    feedback:     typeof parsed.feedback === 'string' ? parsed.feedback : 'Good attempt!',
    improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
  };
}

export async function assessJobReadiness(jobTitle, jobDescription, track, completedCourses) {
  const coursesStr = completedCourses && completedCourses.length > 0 
    ? completedCourses.map(c => `• ${c.courseTitle} (ID: ${c.courseId})`).join('\n')
    : 'No courses completed yet.';

  const systemPrompt = `You are a high-level technical recruiter and career coach at Fitry.
Your task is to analyze a student's job readiness for a target job role based on their course completions on Fitry.

STUDENT STATS:
- Current learning track: ${track}
- Completed courses:
${coursesStr}

TARGET JOB ROLE:
- Title: ${jobTitle}
- Description / Context: ${jobDescription}

YOUR GOAL:
Provide a quick, highly actionable readiness assessment under 150 words.
Structure your response exactly like this:
- **Readiness Score**: X% (where X is 0-100 based on matches between completed courses and target job skills)
- **Strengths**: A one-line summary of what they have already mastered that is relevant.
- **Skill Gaps**: 2-3 specific topics or concepts they need to learn next on Fitry or build.
- **Verdict**: A friendly, encouraging sentence on what they should do today to bridge the gap.

Be extremely honest but highly encouraging. Do not output any code, and keep formatting clean and bulleted.`;

  const userMsg = { role: 'user', content: `Please assess my readiness for the role: ${jobTitle}.` };
  
  return await callGroq(systemPrompt, [userMsg], 500);
}
