import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Zap, BookOpen, Bot, Award, TrendingUp, Clock,
  HelpCircle, Trophy, Sparkles, Target, Flame, Search, Command,
  Play, ArrowUpRight, Compass,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { allCourses } from '../data/courses';
import { useLeaderboard } from '../hooks/useLeaderboard';
import './Dashboard.css';

/* ---------- helpers ---------- */
const getLeagueEmoji = (league) => {
  switch (league?.toLowerCase()) {
    case 'bronze':   return '🥉';
    case 'silver':   return '🥈';
    case 'gold':     return '🥇';
    case 'sapphire': return '💎';
    case 'ruby':     return '🔴';
    default:         return '🥉';
  }
};

const greetingFor = (h) => {
  if (h < 5)  return 'Burning the midnight oil,';
  if (h < 12) return 'Good morning,';
  if (h < 17) return 'Good afternoon,';
  if (h < 21) return 'Good evening,';
  return 'Late night grind,';
};

const PROMPTS = [
  'Small reps, big stack. Ship a lesson today.',
  'You don\'t need motivation. You need momentum.',
  'One commit a day keeps stagnation away.',
  'Future-you is watching. Make them proud.',
  'Consistency > intensity. Always.',
];

/* Animated number that counts up on mount */
function CountUp({ to, suffix = '', duration = 900 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const target = Number(to) || 0;
    if (!target) { setN(0); return; }
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{n}{suffix}</>;
}

/* Circular progress ring */
function Ring({ value = 0, size = 132, stroke = 10, color = 'var(--green)', label, sub }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.max(0, Math.min(100, value)) / 100) * c;
  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="ring-svg">
        <circle cx={size/2} cy={size/2} r={r} stroke="var(--green-border)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size/2} cy={size/2} r={r}
          stroke={color} strokeWidth={stroke} fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.16,1,.3,1)', filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="ring-center">
        <div className="ring-value">{Math.round(value)}<span>%</span></div>
        {label && <div className="ring-label">{label}</div>}
        {sub && <div className="ring-sub">{sub}</div>}
      </div>
    </div>
  );
}

/* Tiny sparkline from synthetic-but-stable seed (keeps it client-only, no data needed) */
function Spark({ color = 'var(--green)', seed = 1 }) {
  const pts = useMemo(() => {
    const out = [];
    let v = 30 + ((seed * 37) % 30);
    for (let i = 0; i < 14; i++) {
      v += ((Math.sin(i * seed) + 1) * 8) - 6;
      v = Math.max(8, Math.min(58, v));
      out.push(v);
    }
    return out;
  }, [seed]);
  const w = 100, h = 28;
  const step = w / (pts.length - 1);
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${i * step},${h - (p / 60) * h}`).join(' ');
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="spark" preserveAspectRatio="none">
      <path d={area} fill={color} opacity="0.12" />
      <path d={path} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* 7-day streak dots */
function StreakDots({ streak = 0 }) {
  const days = ['M','T','W','T','F','S','S'];
  const today = new Date().getDay(); // 0 Sun..6 Sat
  // Map JS day (Sun=0) to Mon-first index
  const todayIdx = (today + 6) % 7;
  return (
    <div className="streak-dots">
      {days.map((d, i) => {
        const active = i <= todayIdx && (todayIdx - i) < streak;
        const isToday = i === todayIdx;
        return (
          <div key={i} className={`sd ${active ? 'on' : ''} ${isToday ? 'today' : ''}`}>
            <span className="sd-dot" />
            <span className="sd-l">{d}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Dashboard() {
  const { profile, user } = useAuth();
  const { userEntry, userRank } = useLeaderboard();

  const firstName = (profile?.displayName || user?.displayName || 'there').split(' ')[0];
  const track     = profile?.track || '';
  const cp        = profile?.courseProgress || {};

  const courseProgress = allCourses.map(c => ({
    ...c,
    progress: cp[c.id]?.progress ?? 0,
    done:     cp[c.id]?.done     ?? 0,
  }));

  const activeCourses  = courseProgress.filter(c => c.progress > 0 && c.progress < 100);
  const completed      = courseProgress.filter(c => c.progress === 100);

  const [filter, setFilter] = useState('active'); // active | all | done
  const displayCourses = useMemo(() => {
    if (filter === 'all')  return courseProgress.slice(0, 6);
    if (filter === 'done') return completed.length ? completed : courseProgress.slice(0, 3);
    return activeCourses.length > 0 ? activeCourses : courseProgress.slice(0, 3);
  }, [filter, courseProgress, activeCourses, completed]);

  /* Greeting + rotating tagline */
  const hour = new Date().getHours();
  const greet = greetingFor(hour);
  const [promptIdx, setPromptIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPromptIdx(i => (i + 1) % PROMPTS.length), 6000);
    return () => clearInterval(id);
  }, []);

  /* Stats */
  const stats = [
    { label: 'Day Streak',   raw: profile?.streak           ?? 0, icon: Flame,      color: '#ffc46b', suffix: '' },
    { label: 'Lessons Done', raw: profile?.lessonsCompleted ?? 0, icon: BookOpen,   color: '#a8ff6b', suffix: '' },
    { label: 'Avg Score',    raw: profile?.avgScore         ?? 0, icon: TrendingUp, color: '#6bddff', suffix: '%' },
    { label: 'Hours Spent',  raw: profile?.totalHours       ?? 0, icon: Clock,      color: '#c46bff', suffix: 'h' },
  ];

  /* Most-in-progress, non-complete course */
  const nextCourse = [...courseProgress].sort((a, b) => b.progress - a.progress)
    .find(c => c.progress < 100) || courseProgress[0];
  const topProgress = nextCourse?.progress ?? 0;

  /* Daily goal: ratio of today's-ish work — derived from streak+lessons */
  const dailyTarget = 3;
  const lessonsToday = Math.min(dailyTarget, ((profile?.lessonsCompleted ?? 0) % (dailyTarget + 1)));
  const dailyPct = Math.round((lessonsToday / dailyTarget) * 100);

  /* Command palette hint (visual only) */
  const searchRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dash-bg-glow" />
      <div className="dash-bg-grid" aria-hidden />

      <div className="dash-content">
        {/* ===== Hero ===== */}
        <section className="dash-hero fade-up">
          <div className="hero-left">
            <p className="prompt-label">system.boot</p>
            <h1 className="dash-title">
              {greet} <span className="dash-name">{firstName}.</span>
            </h1>
            <p className="dash-subtitle">
              {track ? (
                <>Your path: <span className="hl">{track}</span> &nbsp;·&nbsp; Keep going. You're building something real.</>
              ) : (
                <>Not sure where to start? <Link to="/quiz" className="hl underline">Take the quiz</Link> to discover your ideal path.</>
              )}
            </p>

            <p className="hero-quote" key={promptIdx}>
              <Sparkles size={13} /> {PROMPTS[promptIdx]}
            </p>

            <div className="hero-actions">
              <Link to={nextCourse ? `/course/${nextCourse.id}` : '/courses'} className="btn btn-primary hero-cta">
                <Play size={14} /> {topProgress > 0 ? 'Resume lesson' : 'Start learning'}
              </Link>
              <Link to="/courses" className="btn btn-ghost">
                Browse courses <ArrowUpRight size={13} />
              </Link>
              <div className="kbd-search">
                <Search size={14} />
                <input ref={searchRef} placeholder="Search courses, lessons, topics…" />
                <span className="kbd"><Command size={11} /> K</span>
              </div>
            </div>

            <StreakDots streak={profile?.streak ?? 0} />
          </div>

          <div className="hero-right">
            <div className="hero-ring-card">
              <Ring value={dailyPct} label="Daily goal" sub={`${lessonsToday}/${dailyTarget} lessons`} />
              <div className="hero-ring-meta">
                <div className="hrm-row">
                  <Target size={13} /> <span>Today's goal</span>
                </div>
                <p className="hrm-note">
                  {dailyPct >= 100
                    ? 'Goal smashed. Keep the streak alive.'
                    : `${dailyTarget - lessonsToday} lesson${dailyTarget - lessonsToday === 1 ? '' : 's'} to hit today's goal.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Stats ===== */}
        <div className="dash-stats fade-up-1">
          {stats.map(({ label, raw, icon: Icon, color, suffix }, i) => (
            <div className="stat-card" key={label} style={{ '--stat-color': color }}>
              <div className="stat-top">
                <div className="stat-icon"><Icon size={16} /></div>
                <span className="stat-delta">+{((i + 1) * 3)}%</span>
              </div>
              <div className="stat-value">
                <CountUp to={raw} suffix={suffix} />
              </div>
              <div className="stat-label">{label}</div>
              <Spark color={color} seed={i + 2} />
            </div>
          ))}
        </div>

        {/* ===== Main Grid ===== */}
        <div className="dash-grid">
          <div className="dash-left-col">
            {/* Current Courses */}
            <div className="dash-section fade-up-2">
              <div className="section-header">
                <div className="sh-left">
                  <p className="prompt-label">courses.active</p>
                  <div className="filter-chips" role="tablist">
                    <button className={`chip ${filter==='active'?'on':''}`} onClick={() => setFilter('active')}>In progress</button>
                    <button className={`chip ${filter==='all'?'on':''}`}    onClick={() => setFilter('all')}>All</button>
                    <button className={`chip ${filter==='done'?'on':''}`}   onClick={() => setFilter('done')}>Completed</button>
                  </div>
                </div>
                <Link to="/courses" className="section-link">View all <ChevronRight size={13} /></Link>
              </div>

              <div className="course-list">
                {displayCourses.length === 0 && (
                  <div className="course-empty">
                    <Compass size={18} />
                    <p>Nothing here yet. Pick a course to get started.</p>
                    <Link to="/courses" className="btn btn-ghost">Browse courses <ChevronRight size={13} /></Link>
                  </div>
                )}

                {displayCourses.map(course => (
                  <Link
                    to={`/course/${course.id}`}
                    key={course.id}
                    className="course-item"
                    style={{ '--course-color': course.color }}
                  >
                    <div className="course-info">
                      <span className="course-tag">{course.tag}</span>
                      <h3 className="course-name">{course.title}</h3>
                      <p className="course-meta">{course.done} / {course.total} lessons</p>
                    </div>
                    <div className="course-progress-wrap">
                      <div className="course-progress-bar">
                        <div className="course-progress-fill" style={{ width: `${course.progress}%` }} />
                      </div>
                      <span className="course-pct">{course.progress}%</span>
                    </div>
                    <span className="course-cta">
                      {course.progress === 0 ? 'Start' : course.progress === 100 ? 'Review' : 'Resume'}
                      <ChevronRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Leaderboard Shortcut Box */}
            <div className="dash-leaderboard-box card fade-up-2-delayed">
              <div className="leaderboard-box-header">
                <div className="leaderboard-box-title-wrap">
                  <Trophy size={18} className="leaderboard-icon" />
                  <p className="prompt-label" style={{ margin: 0 }}>global.leaderboard</p>
                </div>
                <Link to="/profile?tab=leaderboard" className="leaderboard-box-link">
                  View full standings <ChevronRight size={13} />
                </Link>
              </div>

              <div className="leaderboard-box-body">
                <div className="leaderboard-box-info">
                  <h3 className="leaderboard-box-title">Weekly Arena</h3>
                  <p className="leaderboard-box-desc">
                    Climb the ranks, compete with other developers, and dominate the weekly leaderboard.
                  </p>
                </div>

                <div className="leaderboard-box-stats">
                  <div className="l-stat">
                    <span className="l-stat-label">Your Rank</span>
                    <span className="l-stat-value">{userRank ? `#${userRank}` : 'Unranked'}</span>
                  </div>
                  <div className="l-stat divider" />
                  <div className="l-stat">
                    <span className="l-stat-label">Weekly XP</span>
                    <span className="l-stat-value">{userEntry?.weeklyXP !== undefined ? `${userEntry.weeklyXP} XP` : '0 XP'}</span>
                  </div>
                  <div className="l-stat divider" />
                  <div className="l-stat">
                    <span className="l-stat-label">League</span>
                    <span className="l-stat-value league-val">
                      <span style={{ fontSize: 14 }}>{getLeagueEmoji(userEntry?.league)}</span>
                      <span>{userEntry?.league || 'Bronze'}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== Right Column ===== */}
          <div className="dash-right">
            <div className="dash-next-step card fade-up-3">
              <p className="prompt-label" style={{ marginBottom: 12 }}>next.action</p>
              {!track && topProgress === 0 ? (
                <>
                  <div className="ns-head">
                    <HelpCircle size={20} className="ns-icon" />
                    <h3 className="next-title">Discover your path</h3>
                  </div>
                  <p className="next-desc">Take a quick quiz to find the tech career that fits you best, or browse courses and start learning.</p>
                  <Link to="/quiz" className="btn btn-primary full">Take the quiz <ChevronRight size={15} /></Link>
                  <Link to="/courses" className="btn btn-ghost full small">Browse courses</Link>
                </>
              ) : (
                <>
                  <div className="ns-head">
                    <Zap size={18} className="ns-icon" />
                    <h3 className="next-title">Pick up where you left off</h3>
                  </div>
                  <p className="next-desc">
                    <span className="hl">{nextCourse.title}</span> · {nextCourse.done} / {nextCourse.total} lessons
                  </p>
                  <div className="ns-bar">
                    <div className="ns-bar-fill" style={{ width: `${topProgress}%` }} />
                  </div>
                  <Link to={`/course/${nextCourse.id}`} className="btn btn-primary full">
                    Resume lesson <ChevronRight size={15} />
                  </Link>
                </>
              )}
            </div>

            <div className="dash-bot-card card fade-up-4">
              <div className="bot-card-icon"><Bot size={20} /></div>
              <h3 className="bot-card-title">Not sure about your path?</h3>
              <p className="bot-card-desc">Talk to the Career Guide bot — it answers questions like "Is web dev still worth learning?" in seconds.</p>
              <Link to="/career-bot" className="btn btn-ghost small">
                Open Career Guide <ChevronRight size={13} />
              </Link>
            </div>

            <div className="dash-cert-card card fade-up-5">
              <div className="cert-head">
                <Award size={18} className="cert-ico" />
                <h3 className="cert-title">{topProgress}% to your first certificate</h3>
              </div>
              <div className="cert-bar-wrap">
                <div className="cert-bar">
                  <div className="cert-bar-fill" style={{ width: `${topProgress}%` }} />
                </div>
              </div>
              <p className="cert-note">Complete <span className="hl-amber">{nextCourse.title}</span> to earn it.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
