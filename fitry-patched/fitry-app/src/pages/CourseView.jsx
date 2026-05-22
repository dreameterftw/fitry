import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Lock, Send, ChevronLeft, CheckCircle, Lightbulb,
  PlayCircle, BookOpen, Briefcase, Star, ChevronDown, Laptop, Monitor,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile, saveCourseProgress, addXp } from '../lib/userStore';
import { askCourseBot, gradeSubmission } from '../lib/api';
import courseData from '../data/courses';
import './CourseView.css';

const LOCK_SECONDS = 120; // 2 minutes

function Timer({ seconds, onUnlock }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) { onUnlock(); return; }
    const t = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  const pct = ((seconds - remaining) / seconds) * 100;
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;

  return (
    <div className="timer-lock">
      <div className="timer-icon"><Lock size={18} /></div>
      <p className="timer-title">Assistant unlocks soon</p>
      <p className="timer-desc">Take a moment to try the challenge yourself first.</p>
      <div className="timer-ring-wrap">
        <svg className="timer-ring" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="34" className="ring-bg" />
          <circle
            cx="40" cy="40" r="34"
            className="ring-fill"
            strokeDasharray={`${2 * Math.PI * 34}`}
            strokeDashoffset={`${2 * Math.PI * 34 * (1 - pct / 100)}`}
          />
        </svg>
        <div className="timer-time">{mins}:{secs.toString().padStart(2, '0')}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Setup-instructions collapsible (Lesson 1 only)
   ───────────────────────────────────────────── */
function SetupBlock({ setup, color }) {
  const [open, setOpen] = useState(false);
  const [os, setOs] = useState('windows');
  if (!setup) return null;

  const steps = setup[os] || [];

  return (
    <div className="cv-setup" style={{ '--lc': color }}>
      <button
        className={`cv-setup-toggle ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <span className="cv-setup-toggle-left">
          <Star size={14} />
          <span>Setup instructions — get your machine ready</span>
        </span>
        <ChevronDown size={16} className="cv-setup-chev" />
      </button>

      {open && (
        <div className="cv-setup-body">
          <div className="cv-setup-os-tabs" role="tablist">
            <button
              className={`cv-setup-os ${os === 'windows' ? 'active' : ''}`}
              onClick={() => setOs('windows')}
              role="tab"
            >
              <Monitor size={13} /> Windows
            </button>
            <button
              className={`cv-setup-os ${os === 'mac' ? 'active' : ''}`}
              onClick={() => setOs('mac')}
              role="tab"
            >
              <Laptop size={13} /> macOS
            </button>
          </div>
          <ol className="cv-setup-steps">
            {steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Resources tab
   ───────────────────────────────────────────── */
function ResourcesTab({ course }) {
  const { slogan, youtube, docs, jobs, color } = course;

  return (
    <div className="cv-resources fade-up-3" style={{ '--lc': color }}>
      {/* Motivational slogan banner */}
      <div className="cv-slogan">
        <Star size={14} />
        <p>{slogan}</p>
      </div>

      {/* YouTube picks */}
      <div className="cv-res-block">
        <h3 className="cv-res-heading"><PlayCircle size={16} /> Best YouTube picks</h3>
        <div className="cv-yt-list">
          <a className="cv-yt-card main" href={youtube.main.url} target="_blank" rel="noreferrer">
            <span className="cv-yt-tag">Main playlist</span>
            <h4>{youtube.main.title}</h4>
            <p>{youtube.main.channel}</p>
            <span className="cv-yt-watch">Watch →</span>
          </a>
          {youtube.extras.map((v, i) => (
            <a key={i} className="cv-yt-card" href={v.url} target="_blank" rel="noreferrer">
              <h4>{v.title}</h4>
              <p>{v.channel}</p>
              <span className="cv-yt-watch">Watch →</span>
            </a>
          ))}
        </div>
      </div>

      {/* Docs + Jobs side by side */}
      <div className="cv-res-row">
        <a className="cv-res-card" href={docs.url} target="_blank" rel="noreferrer">
          <div className="cv-res-card-icon"><BookOpen size={16} /></div>
          <div>
            <p className="cv-res-card-label">Official docs</p>
            <h4>{docs.label}</h4>
            <span className="cv-res-card-cta">Read docs →</span>
          </div>
        </a>

        <div className="cv-res-card jobs">
          <div className="cv-res-card-icon"><Briefcase size={16} /></div>
          <div>
            <p className="cv-res-card-label">Where this skill takes you</p>
            <ul className="cv-jobs-roles">
              {jobs.roles.map(r => <li key={r}>{r}</li>)}
            </ul>
            <span className="cv-jobs-salary">{jobs.salary}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main view
   ───────────────────────────────────────────── */
export default function CourseView() {
  const { id } = useParams();
  const course = courseData[id] || courseData[1];
  const { user, profile, refreshProfile } = useAuth();
  const [lessonIdx, setLessonIdx] = useState(0);
  const [activeMiniProject, setActiveMiniProject] = useState(null);
  const [hasInitializedProgress, setHasInitializedProgress] = useState(false);

  // Set initial lessonIdx based on user's saved progress
  useEffect(() => {
    if (profile && profile.courseProgress?.[id] && !hasInitializedProgress) {
      const savedDone = profile.courseProgress[id].done || 0;
      const targetIdx = Math.min(savedDone, course.lessons.length - 1);
      if (targetIdx > 0) {
        setLessonIdx(targetIdx);
      }
      setHasInitializedProgress(true);
    }
  }, [profile, id, course.lessons.length, hasInitializedProgress]);

  const [unlocked, setUnlocked] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [askCount, setAskCount] = useState(0);
  const [submission, setSubmission] = useState('');
  const [grade, setGrade] = useState(null);
  const [grading, setGrading] = useState(false);
  const [tab, setTab] = useState('lesson'); // lesson | challenge | resources | bot
  const chatEndRef = useRef(null);
  const isMiniProject = activeMiniProject !== null;
  let lesson;
  if (isMiniProject) {
    const mp = course.levels[activeMiniProject].miniProject;
    let snippet = mp.starterCode ? `\n\nStarter Code / Code Snippet:\n\n${mp.starterCode}` : "";
    lesson = {
      id: `mp-${activeMiniProject}`,
      title: mp.title,
      content: "Instructions\n\n" + mp.brief + "\n\nPlease complete this mini project in your own IDE (preferably VS Code). Once you are done, paste your solution in the Challenge section for evaluation." + snippet,
      challenge: mp.title,
      expectedOutput: mp.expectedOutput,
      hints: [],
      starterCode: mp.starterCode || "// Paste your complete mini-project code here\n",
      xpReward: 50,
    };
  } else {
    lesson = course.lessons?.[lessonIdx] || null;
  }

  // Auto-set track when user opens a course and has no track yet
  useEffect(() => {
    if (user && profile && !profile.track && course.domain) {
      updateUserProfile(user.uid, { track: course.domain })
        .then(() => refreshProfile())
        .catch(err => console.error('[CourseView] Failed to set track:', err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, profile?.track, course.domain]);

  // Pre-fill submission with starter code when lesson changes
  useEffect(() => {
    setUnlocked(false);
    setMessages([]);
    setAskCount(0);
    setGrade(null);
    setSubmission(lesson?.starterCode || '');
    setTab('lesson');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonIdx, activeMiniProject, id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const newCount = askCount + 1;
    setAskCount(newCount);
    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const { reply } = await askCourseBot(newMessages, {
        lessonTitle: lesson.title,
        challenge: lesson.challenge,
        expectedOutput: lesson.expectedOutput,
        hints: lesson.hints,
        askCount: newCount,
      });
      setMessages(m => [...m, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(m => [...m, { role: 'assistant', content: `Connection error: ${err.message}. Is the backend running?` }]);
    }
    setLoading(false);
  };

  const submitCode = async () => {
    if (!submission.trim() || grading) return;
    setGrading(true);
    let finalGrade = null;
    try {
      finalGrade = await gradeSubmission({
        submission,
        challenge: lesson.challenge,
        expectedOutput: lesson.expectedOutput,
        lessonTitle: lesson.title,
      });
    } catch (err) {
      finalGrade = { score: 65, passed: true, feedback: `Auto-grader unavailable: ${err.message}`, improvements: [] };
    }
    
    setGrade(finalGrade);
    
    if (finalGrade && finalGrade.passed && user) {
      try {
        const done = Math.max(profile?.courseProgress?.[id]?.done || 0, lessonIdx + 1);
        const progress = Math.round((done / course.lessons.length) * 100);
        
        // Calculate the course-specific average score
        const oldScore = profile?.courseProgress?.[id]?.score || 0;
        const newScore = oldScore === 0
          ? finalGrade.score
          : Math.round((oldScore * (done - 1) + finalGrade.score) / done);

        await saveCourseProgress(user.uid, id, {
          progress,
          done,
          score: newScore,
        });

        // XP rewards!
        const xpReward = lesson.xpReward || 10;
        await addXp(user.uid, xpReward, id);
        
        // Sync layout & state
        await refreshProfile();
      } catch (err) {
        console.error('[CourseView] Failed to save progress/XP:', err);
      }
    }
    setGrading(false);
  };

  const TABS = [
    { key: 'lesson',     label: '📖 Lesson' },
    { key: 'challenge',  label: '⚡ Challenge' },
    { key: 'resources',  label: '🎯 Resources' },
  ];

  const currentLevelIndex = !isMiniProject && lesson ? course.levels.findIndex(l => l.lessons.some(lsn => lsn.id === lesson.id)) : -1;
  const isLastInLevel = currentLevelIndex !== -1 ? course.levels[currentLevelIndex].lessons[course.levels[currentLevelIndex].lessons.length - 1].id === lesson.id : false;

  // If the course has no lessons yet, show a coming-soon state
  if (!lesson) {
    return (
      <div className="cv-page">
        <Navbar />
        <div className="cv-bg-glow" />
        <div className="cv-layout">
          <div className="cv-left">
            <div className="cv-breadcrumb fade-up">
              <Link to="/courses" className="cv-back"><ChevronLeft size={14} /> All Courses</Link>
              <span className="cv-course-name">{course.title}</span>
            </div>
            <div className="cv-lesson-content fade-up-3" style={{ textAlign: 'center', padding: '80px 20px' }}>
              <h1 className="cv-lesson-title" style={{ color: course.color }}>🚧 Coming Soon</h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginTop: 12 }}>
                Lessons for <strong style={{ color: course.color }}>{course.title}</strong> are being built. Check back soon!
              </p>
              <Link to="/courses" className="btn btn-primary" style={{ marginTop: 32, display: 'inline-flex' }}>
                ← Browse other courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cv-page">
      <Navbar />
      <div className="cv-bg-glow" />

      <div className="cv-layout">
        {/* Left: Lesson Content */}
        <div className="cv-left">
          <div className="cv-breadcrumb fade-up">
            <Link to="/courses" className="cv-back"><ChevronLeft size={14} /> All Courses</Link>
            <span className="cv-course-name">{course.title}</span>
          </div>

          {/* Level-based Lesson Nav */}
          <div className="cv-levels-nav fade-up-1">
            {course.levels?.map((level, lIdx) => (
              <div key={level.id} className="cv-level-group">
                <div className="cv-level-header">
                  <div className="cv-level-badge">LEVEL {lIdx + 1}</div>
                  <h4 className="cv-level-label">{level.label}</h4>
                  <span className="cv-level-xp">+{level.xpReward} XP</span>
                </div>
                <div className="cv-level-lessons">
                  {level.lessons.map((l) => {
                    const gIdx = course.lessons.findIndex(lsn => lsn.id === l.id);
                    const isActive = gIdx === lessonIdx;
                    const savedDone = profile?.courseProgress?.[id]?.done || 0;
                    const isDone = gIdx < savedDone;
                    
                    return (
                      <button
                        key={l.id}
                        className={`cv-lesson-item ${isActive && !isMiniProject ? 'active' : ''} ${isDone ? 'done' : ''}`}
                        onClick={() => { setLessonIdx(gIdx); setActiveMiniProject(null); }}
                        style={{ '--lc': course.color }}
                      >
                        <div className="cv-lesson-indicator">
                          {isDone ? <CheckCircle size={12} /> : <span className="cv-lesson-dot" />}
                        </div>
                        <span className="cv-lesson-name">{l.title}</span>
                        {isActive && <div className="cv-active-indicator" />}
                      </button>
                    );
                  })}
                  
                  {/* Mini Project Milestone */}
                  {level.miniProject && (
                    <div className="cv-milestone">
                      <div className="cv-milestone-line" />
                      <div 
                        className={`cv-milestone-card ${activeMiniProject === lIdx ? 'active' : ''}`}
                        onClick={() => setActiveMiniProject(lIdx)}
                        style={{ cursor: 'pointer', ...(activeMiniProject === lIdx ? { borderColor: course.color, background: 'rgba(255,255,255,0.05)' } : {}) }}
                      >
                        <div className="cv-milestone-icon"><Star size={12} /></div>
                        <div className="cv-milestone-info">
                          <p className="cv-milestone-tag">Milestone</p>
                          <h5 className="cv-milestone-title">{level.miniProject.title}</h5>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Tab switcher */}
          <div className="cv-tabs fade-up-2">
            {TABS.map(t => (
              <button
                key={t.key}
                className={`cv-tab ${tab === t.key ? 'active' : ''}`}
                onClick={() => setTab(t.key)}
                style={{ '--lc': course.color }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Lesson Tab */}
          {tab === 'lesson' && (
            <div className="cv-lesson-content fade-up-3">
              <h1 className="cv-lesson-title" style={{ color: course.color }}>{lesson.title}</h1>

              {/* Setup block — only on Lesson 1 */}
              {lessonIdx === 0 && lesson.setup && (
                <SetupBlock setup={lesson.setup} color={course.color} />
              )}

              <div className="cv-lesson-body">
                {lesson.content.split('\n').map((line, i) =>
                  line.startsWith('  ') || line.startsWith('<!') || line.startsWith('<') ||
                  line.startsWith('}') || line.startsWith('h1') || line.startsWith('def ') ||
                  line.startsWith('  ') || line.startsWith('import ') || line.startsWith('from ') ||
                  line.startsWith('#include') || line.startsWith('int ') || line.startsWith('const ') ||
                  line.startsWith('let ') || line.startsWith('function ') || line.startsWith('return ') ||
                  line.startsWith('print(') || line.includes('  ') ?
                    <pre key={i} className="cv-code-line">{line}</pre> :
                    line === '' ? <br key={i} /> :
                    <p key={i}>{line}</p>
                )}
              </div>
              <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => setTab('challenge')}>
                Go to Challenge ⚡
              </button>
            </div>
          )}

          {/* Challenge Tab — friendlier: starter code pre-filled, run & check */}
          {tab === 'challenge' && (
            <div className="cv-challenge fade-up-3">
              <div className="challenge-header">
                <p className="prompt-label" style={{ marginBottom: 8 }}>challenge.active</p>
                <h2 className="challenge-title">{lesson.challenge}</h2>
                <p className="challenge-expected">Expected: {lesson.expectedOutput}</p>
              </div>

              <div className="challenge-hints">
                <p className="hints-label"><Lightbulb size={13} /> Hints (the assistant has more)</p>
                {lesson.hints.map((h, i) => (
                  <div key={i} className="hint-item">
                    <span className="hint-num">{i + 1}</span>
                    <span className="hint-text">{h}</span>
                  </div>
                ))}
              </div>

              <div className="challenge-submit">
                <p className="submit-label">Your code (starter pre-filled — replace the TODOs):</p>
                <textarea
                  className="submit-textarea"
                  value={submission}
                  onChange={e => setSubmission(e.target.value)}
                  placeholder="// start here"
                  rows={12}
                />
                {!grade && (
                  <button className={`btn btn-primary ${grading ? 'disabled' : ''}`} onClick={submitCode} disabled={grading}>
                    {grading ? 'Checking...' : 'Run & Check ▶'}
                  </button>
                )}

                {grade && (
                  <div className={`grade-result ${grade.passed ? 'passed' : 'failed'}`}>
                    <div className="grade-score-row">
                      <span className="grade-score" style={{ color: grade.passed ? 'var(--green)' : 'var(--amber)' }}>
                        {grade.score}/100
                      </span>
                      <span className={`grade-badge ${grade.passed ? 'pass' : 'fail'}`}>
                        {grade.passed ? '✓ Nice work' : '↻ Try again'}
                      </span>
                    </div>
                    <p className="grade-feedback">{grade.feedback}</p>
                    {grade.improvements?.length > 0 && (
                      <ul className="grade-improvements">
                        {grade.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
                      </ul>
                    )}
                    <div className="grade-actions">
                      <button className="btn btn-ghost" onClick={() => setGrade(null)}>Tweak & retry</button>
                      {grade.passed && !isMiniProject && isLastInLevel && course.levels[currentLevelIndex]?.miniProject ? (
                        <button className="btn btn-primary" onClick={() => setActiveMiniProject(currentLevelIndex)}>
                          Go to Mini Project →
                        </button>
                      ) : grade.passed && !isMiniProject && lessonIdx + 1 < course.lessons.length ? (
                        <button className="btn btn-primary" onClick={() => { setLessonIdx(i => i + 1); setActiveMiniProject(null); }}>
                          Next lesson →
                        </button>
                      ) : grade.passed && isMiniProject && activeMiniProject + 1 < course.levels.length ? (
                        <button className="btn btn-primary" onClick={() => {
                          const nextLevel = course.levels[activeMiniProject + 1];
                          const nextLessonGlobalIdx = course.lessons.findIndex(lsn => lsn.id === nextLevel.lessons[0].id);
                          if (nextLessonGlobalIdx !== -1) setLessonIdx(nextLessonGlobalIdx);
                          setActiveMiniProject(null);
                        }}>
                          Next level →
                        </button>
                      ) : grade.passed ? (
                        <Link to="/profile" className="btn btn-primaryclaim" style={{ background: 'var(--green)', color: '#000', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                          Claim Certificate 🎓
                        </Link>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {tab === 'resources' && <ResourcesTab course={course} />}


        </div>

        {/* Right: Chatbot Panel */}
        <div className="cv-right">
          <div className="cv-bot-panel">
            <div className="bot-header">
              <p className="prompt-label">lesson.assistant</p>
              <div className="bot-ask-count">
                <span>{askCount} / 3 asks before answer</span>
              </div>
            </div>

            {isMiniProject ? (
              <div className="bot-empty">
                <div className="bot-empty-icon" style={{ display: 'flex', justifyContent: 'center' }}><Lock size={32}/></div>
                <p className="bot-empty-title" style={{ textAlign: 'center', marginTop: 16 }}>Assistant Locked</p>
                <p className="bot-empty-sub" style={{textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '12px'}}>
                  This is a mini project. You must complete it independently in your own IDE. The assistant is disabled for this challenge.
                </p>
              </div>
            ) : !unlocked ? (
              <Timer seconds={LOCK_SECONDS} onUnlock={() => setUnlocked(true)} />
            ) : (
              <>
                <div className="bot-messages">
                  {messages.length === 0 && (
                    <div className="bot-empty">
                      <div className="bot-empty-icon">🤖</div>
                      <p className="bot-empty-title">Assistant ready</p>
                      <p className="bot-empty-sub">Stuck on the challenge? I'll give you hints — not answers. Ask away.</p>
                    </div>
                  )}
                  {messages.map((msg, i) => (
                    <div key={i} className={`bot-msg ${msg.role}`}>
                      <div className="msg-role">{msg.role === 'user' ? 'You' : '> bot'}</div>
                      <div className="msg-content">{msg.content}</div>
                    </div>
                  ))}
                  {loading && (
                    <div className="bot-msg assistant">
                      <div className="msg-role">&gt; bot</div>
                      <div className="msg-typing"><span/><span/><span/></div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="bot-input-row">
                  <input
                    className="bot-input"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask for a hint..."
                  />
                  <button className="bot-send" onClick={sendMessage} disabled={loading || !input.trim()}>
                    <Send size={15} />
                  </button>
                </div>
                {askCount >= 3 && (
                  <p className="bot-hint-note">You've asked 3 times. The bot will now give you the full answer if you ask.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
