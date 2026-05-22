import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { saveQuizResult, updateUserProfile } from '../lib/userStore';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, SkipForward, ArrowLeft, Brain } from 'lucide-react';
import './Quiz.css';

const questions = [
  {
    id: 1,
    question: "When you encounter a problem you've never seen before, what's your first instinct?",
    options: [
      { label: "Break it into small logical steps", tags: { systems: 2, logic: 2 } },
      { label: "Look for patterns from things I already know", tags: { analytical: 2, data: 1 } },
      { label: "Visualize the end result first", tags: { creative: 2, web: 2 } },
      { label: "Try something and see what happens", tags: { creative: 1, web: 1, mobile: 1 } },
    ]
  },
  {
    id: 2,
    question: "Which of these excites you the most?",
    options: [
      { label: "Building apps people can actually see and use", tags: { web: 3, mobile: 2 } },
      { label: "Making machines learn from data", tags: { data: 3, ai: 3 } },
      { label: "Keeping systems secure from attackers", tags: { security: 3, systems: 1 } },
      { label: "Optimizing code that runs fast and efficiently", tags: { systems: 3, logic: 2 } },
    ]
  },
  {
    id: 3,
    question: "How do you feel about ambiguity — situations with no clear right answer?",
    options: [
      { label: "I love it. Exploring possibilities is fun.", tags: { creative: 2, data: 1 } },
      { label: "I'm okay with it but prefer structure eventually", tags: { web: 1, analytical: 2 } },
      { label: "I prefer clear rules and well-defined problems", tags: { systems: 2, logic: 3 } },
      { label: "I'll work through it if the goal is clear", tags: { mobile: 1, web: 1 } },
    ]
  },
  {
    id: 4,
    question: "Pick the project that sounds most interesting to you:",
    options: [
      { label: "A website that adapts to each user's personality", tags: { web: 3, creative: 2 } },
      { label: "A model that predicts stock prices", tags: { data: 3, ai: 2, analytical: 2 } },
      { label: "An app that tracks fitness goals", tags: { mobile: 3, web: 1 } },
      { label: "A program that cracks encrypted messages", tags: { security: 3, logic: 2 } },
    ]
  },
  {
    id: 5,
    question: "What kind of feedback motivates you most?",
    options: [
      { label: "Seeing something I built actually work", tags: { web: 2, mobile: 2 } },
      { label: "Numbers improving — accuracy, speed, efficiency", tags: { data: 2, systems: 2, analytical: 2 } },
      { label: "People telling me my work helped them", tags: { web: 1, mobile: 2, creative: 1 } },
      { label: "Solving something nobody else could figure out", tags: { security: 2, logic: 2 } },
    ]
  },
  {
    id: 6,
    question: "How do you feel about math and statistics?",
    options: [
      { label: "Love it — give me formulas and graphs", tags: { data: 3, ai: 2, analytical: 3 } },
      { label: "Fine with it when it serves a purpose", tags: { systems: 1, security: 1 } },
      { label: "I prefer logic over numbers", tags: { logic: 3, systems: 2 } },
      { label: "I try to avoid heavy math", tags: { web: 2, mobile: 2, creative: 2 } },
    ]
  },
  {
    id: 7,
    question: "Which describes how you prefer to work?",
    options: [
      { label: "Deep focus on one complex thing for hours", tags: { systems: 2, data: 1, logic: 2 } },
      { label: "Switching between tasks and experimenting", tags: { creative: 2, web: 1 } },
      { label: "Collaborating and building for an audience", tags: { web: 2, mobile: 2 } },
      { label: "Methodically following a process", tags: { security: 2, analytical: 2 } },
    ]
  },
  {
    id: 8,
    question: "If you had to choose a superpower, which fits you?",
    options: [
      { label: "X-ray vision — seeing hidden patterns in chaos", tags: { data: 3, ai: 2 } },
      { label: "Architect's eye — designing perfect structures", tags: { systems: 3, logic: 2 } },
      { label: "Artist's touch — making anything beautiful and usable", tags: { creative: 3, web: 3 } },
      { label: "Hacker's mind — finding flaws before anyone else", tags: { security: 3 } },
    ]
  },
];

const trackMap = {
  web:        { label: 'Web Development',           lang: 'HTML/CSS, JS, React',             why: 'You think visually and love building things people interact with.' },
  mobile:     { label: 'Mobile Development',         lang: 'React Native (iOS/Android)',      why: 'You want to build for people on the go and love hands-on usability.' },
  data:       { label: 'Data Science & Analysis',    lang: 'Python, Pandas, SQL',             why: 'You love patterns, numbers, and finding meaning in information.' },
  ai:         { label: 'Artificial Intelligence',    lang: 'Python, ML Foundations',          why: 'You want to build intelligent systems that learn and adapt.' },
  security:   { label: 'Cybersecurity',              lang: 'Python, Linux, Security Basics',  why: 'You think like an attacker, love puzzles, and want to protect systems.' },
  systems:    { label: 'Systems & Backend',          lang: 'C++, Go, Java',                   why: 'You love performance, efficiency, and the engine under the hood.' },
  logic:      { label: 'Algorithms & CP',            lang: 'C++, Java, Algorithms',           why: 'You are drawn to pure problem-solving and elegant logic.' },
  analytical: { label: 'Data & Databases',           lang: 'SQL, Database Design',            why: 'You love structured systems that process and move data at scale.' },
  creative:   { label: 'UI/UX Engineering',          lang: 'Design + React.js',               why: 'Design and code intersect for you — you make technology feel human.' },
};

function computeResult(answers) {
  const scores = {};
  answers.forEach(ans => {
    Object.entries(ans.tags).forEach(([tag, val]) => {
      scores[tag] = (scores[tag] || 0) + val;
    });
  });
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, 2).map(([tag]) => trackMap[tag] || trackMap.web);
}

// ── VIEWS ─────────────────────────────────────────────────────
// 'intro' → 'quiz' → 'result'

export default function Quiz() {
  const navigate = useNavigate();
  const { user, refreshProfile, loading } = useAuth();

  // ── ALL HOOKS MUST COME BEFORE ANY CONDITIONAL RETURNS ──────
  const [view, setView]           = useState('intro');   // 'intro' | 'quiz' | 'result'
  const [current, setCurrent]     = useState(0);
  const [answers, setAnswers]     = useState([]);
  const [selected, setSelected]   = useState(null);
  const [result, setResult]       = useState(null);
  const [animating, setAnimating] = useState(false);
  const [saving, setSaving]       = useState(false);

  // Auth guard via useEffect — never put a conditional return before hooks
  useEffect(() => {
    if (!loading && !user) {
      console.warn('[Quiz] No user detected, redirecting to login.');
      navigate('/login?mode=login');
    }
  }, [loading, user, navigate]);

  // Debug logging
  console.log('[Quiz] Rendered. User:', user);

  const progress = (current / questions.length) * 100;
  const q = questions[current];

  const handleSkip = async () => {
    console.log('[Quiz] handleSkip called. User:', user);
    setSaving(true);
    try {
      if (user) {
        await updateUserProfile(user.uid, { quizDone: true, track: '' });
        console.log('[Quiz] User profile updated for skip.');
        // Update profile in background, don't block navigation
        refreshProfile().catch(e => console.error('[Quiz] Background refresh failed:', e));
      }
      console.log('[Quiz] Navigating to dashboard (skip)...');
      navigate('/dashboard');
    } catch (err) {
      console.error('[Quiz] Error in handleSkip:', err);
      // Navigate anyway so user isn't stuck
      navigate('/dashboard');
    } finally {
      // In a real app, you might want to keep saving true until the next page loads,
      // but here we clear it to be safe.
      setSaving(false);
    }
  };

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      if (current + 1 >= questions.length) {
        console.log('[Quiz] Quiz complete. Answers:', newAnswers);
        setResult(computeResult(newAnswers));
        setView('result');
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
      }
    }, 300);
    setAnswers(newAnswers);
  };

  const handleContinue = async () => {
    console.log('[Quiz] handleContinue called. User:', user, 'Result:', result);
    setSaving(true);
    try {
      if (user) {
        await saveQuizResult(user.uid, result[0]?.label);
        console.log('[Quiz] Quiz result saved.');
        // Update profile in background
        refreshProfile().catch(e => console.error('[Quiz] Background refresh failed:', e));
      }
      console.log('[Quiz] Navigating to dashboard (continue)...');
      navigate('/dashboard');
    } catch (err) {
      console.error('[Quiz] Error in handleContinue:', err);
      navigate('/dashboard');
    } finally {
      setSaving(false);
    }
  };

  // Show loading state while auth resolves
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#0a0a0f', color: '#a0a0b0', fontFamily: 'Inter, sans-serif', fontSize: 16
      }}>
        Loading...
      </div>
    );
  }

  // If no user after loading, the useEffect will navigate — render nothing in the meantime
  if (!user) return null;

  // ── INTRO SCREEN ────────────────────────────────────────────
  if (view === 'intro') {
    return (
      <div className="quiz-page">
        <div className="quiz-bg-glow" />
        <div className="quiz-orb quiz-orb-1" />
        <div className="quiz-orb quiz-orb-2" />
        <div className="quiz-orb quiz-orb-3" />

        <div className="quiz-intro fade-up">
          <div className="intro-icon-wrap">
            <Brain size={32} />
          </div>

          <p className="prompt-label" style={{ marginBottom: 16 }}>career.quiz</p>

          <h1 className="intro-title">Find your path.</h1>

          <p className="intro-desc">
            8 questions. No right or wrong answers.<br />
            We map how you think to the tech career that actually fits you.
          </p>

          <div className="intro-meta-row">
            <span className="intro-meta-item">
              <span className="intro-meta-dot" /> 8 questions
            </span>
            <span className="intro-meta-item">
              <span className="intro-meta-dot" /> ~3 minutes
            </span>
            <span className="intro-meta-item">
              <span className="intro-meta-dot" /> No experience needed
            </span>
          </div>

          <button
            className="btn btn-primary intro-start-btn"
            onClick={() => setView('quiz')}
          >
            Begin the Quiz <ChevronRight size={18} />
          </button>

          <button type="button" className="intro-skip-btn" onClick={handleSkip} disabled={saving}>
            <SkipForward size={14} /> {saving ? 'Please wait...' : 'Skip for now — go to Dashboard'}
          </button>
        </div>
      </div>
    );
  }

  // ── RESULT SCREEN ───────────────────────────────────────────
  if (view === 'result') {
    return (
      <div className="quiz-page">
        <div className="quiz-bg-glow" />
        <div className="quiz-orb quiz-orb-1" />
        <div className="quiz-orb quiz-orb-2" />
        <div className="quiz-orb quiz-orb-3" />

        <div className="quiz-result fade-up">
          <p className="prompt-label" style={{ marginBottom: 20 }}>analysis.complete</p>
          <h1 className="result-title">Your path is clear.</h1>
          <p className="result-sub">Based on how you think and what excites you, here's where you should start:</p>

          <div className="result-tracks">
            {result.map((track, i) => (
              <div key={i} className={`result-track ${i === 0 ? 'primary' : 'secondary'}`}>
                <div className="track-rank">{i === 0 ? '— Best Match' : '— Also Fits'}</div>
                <h2 className="track-label">{track.label}</h2>
                <p className="track-lang">&gt; Start with: {track.lang}</p>
                <p className="track-why">{track.why}</p>
              </div>
            ))}
          </div>

          <div className="result-actions">
            <button className="btn btn-primary" onClick={handleContinue} disabled={saving}>
              {saving ? 'Saving...' : 'Start My Journey'} <ChevronRight size={16} />
            </button>
            <button className="btn btn-ghost" onClick={() => {
              setCurrent(0); setAnswers([]); setSelected(null);
              setResult(null); setView('intro');
            }}>
              Retake Quiz
            </button>
          </div>

          <p className="result-note">You can always change your path later from your profile.</p>
        </div>
      </div>
    );
  }

  // ── QUIZ SCREEN ─────────────────────────────────────────────
  return (
    <div className="quiz-page">
      <div className="quiz-bg-glow" />
      <div className="quiz-orb quiz-orb-1" />
      <div className="quiz-orb quiz-orb-2" />
      <div className="quiz-orb quiz-orb-3" />

      <div className="quiz-inner">
        {/* Header */}
        <div className="quiz-header fade-up">
          <p className="prompt-label">career.quiz</p>
          <div className="quiz-meta">
            <span className="quiz-count">{current + 1} / {questions.length}</span>
            <button type="button" className="quiz-skip" onClick={handleSkip} disabled={saving}>
              <SkipForward size={13} /> {saving ? 'Please wait...' : 'Skip quiz'}
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="quiz-progress fade-up-1">
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question */}
        <div className={`quiz-question-wrap ${animating ? 'animating' : ''}`}>
          <h2 className="quiz-question fade-up-2">{q.question}</h2>

          <div className="quiz-options fade-up-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                className={`quiz-option ${selected === opt ? 'selected' : ''}`}
                onClick={() => setSelected(opt)}
              >
                <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                <span className="option-text">{opt.label}</span>
                {selected === opt && <span className="option-check">✓</span>}
              </button>
            ))}
          </div>

          <div className="quiz-actions fade-up-4">
            {current > 0 && (
              <button className="btn btn-ghost" onClick={() => {
                setCurrent(c => c - 1);
                setSelected(answers[current - 1]);
                setAnswers(a => a.slice(0, -1));
              }}>
                <ArrowLeft size={14} /> Back
              </button>
            )}
            <button
              className={`btn btn-primary ${!selected ? 'disabled' : ''}`}
              onClick={handleNext}
              disabled={!selected}
            >
              {current + 1 === questions.length ? 'See My Path' : 'Next'} <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <p className="quiz-note fade-up-5">No right or wrong answers. Just honest ones.</p>
      </div>
    </div>
  );
}
