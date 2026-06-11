import { useState, useRef, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Award, Download, Share2, BookOpen, Zap, Clock, Lock, ChevronRight,
  MessageCircle, Lightbulb, GraduationCap, TrendingUp, Search, Trophy,
  Flame, Target, PlayCircle, Edit3, CheckCircle2, Sparkles, Crown,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useLeaderboard } from '../hooks/useLeaderboard';
import './Profile.css';
import { allCourses } from '../data/courses';

/* ── Certificate canvas generator (unchanged behaviour) ──────── */
function generateCertificate(canvasRef, certData) {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = 900, h = 620;
  ctx.fillStyle = '#080c09'; ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(168,255,107,0.3)'; ctx.lineWidth = 1; ctx.strokeRect(20, 20, w - 40, h - 40);
  ctx.strokeStyle = 'rgba(168,255,107,0.12)'; ctx.strokeRect(32, 32, w - 64, h - 64);
  const g = ctx.createLinearGradient(100, 0, w - 100, 0);
  g.addColorStop(0, 'transparent'); g.addColorStop(0.5, '#a8ff6b'); g.addColorStop(1, 'transparent');
  ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(100, 60); ctx.lineTo(w - 100, 60); ctx.stroke();
  ctx.font = '500 18px "JetBrains Mono",monospace'; ctx.fillStyle = '#a8ff6b'; ctx.textAlign = 'center'; ctx.fillText('> Fitry', w / 2, 100);
  ctx.font = '400 12px Inter,sans-serif'; ctx.fillStyle = 'rgba(168,255,107,0.6)'; ctx.fillText('CERTIFICATE OF COMPLETION', w / 2, 140);
  ctx.font = '700 52px Inter,sans-serif'; ctx.fillStyle = '#f0f7f0'; ctx.fillText(certData.name, w / 2, 230);
  ctx.font = '300 16px Inter,sans-serif'; ctx.fillStyle = 'rgba(200,220,201,0.6)'; ctx.fillText('has successfully completed', w / 2, 275);
  ctx.font = '600 28px Inter,sans-serif'; ctx.fillStyle = '#a8ff6b'; ctx.fillText(certData.course, w / 2, 330);
  const g2 = ctx.createLinearGradient(200, 0, w - 200, 0);
  g2.addColorStop(0, 'transparent'); g2.addColorStop(0.5, 'rgba(168,255,107,0.25)'); g2.addColorStop(1, 'transparent');
  ctx.strokeStyle = g2; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(200, 370); ctx.lineTo(w - 200, 370); ctx.stroke();
  ctx.font = '500 14px "JetBrains Mono",monospace'; ctx.fillStyle = 'rgba(200,220,201,0.5)';
  ctx.fillText(`> score: ${certData.score}/100  |  > track: ${certData.track}`, w / 2, 405);
  ctx.font = '400 13px Inter,sans-serif'; ctx.fillStyle = 'rgba(200,220,201,0.4)'; ctx.fillText(`Issued: ${certData.date}`, w / 2, 445);
  ctx.font = '400 11px "JetBrains Mono",monospace'; ctx.fillStyle = 'rgba(168,255,107,0.35)'; ctx.fillText(`Verification ID: ${certData.id}`, w / 2, 490);
  const g3 = ctx.createLinearGradient(100, 0, w - 100, 0);
  g3.addColorStop(0, 'transparent'); g3.addColorStop(0.5, '#a8ff6b'); g3.addColorStop(1, 'transparent');
  ctx.strokeStyle = g3; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(100, h - 60); ctx.lineTo(w - 100, h - 60); ctx.stroke();
  ctx.font = '300 11px Inter,sans-serif'; ctx.fillStyle = 'rgba(200,220,201,0.3)';
  ctx.fillText('"You finished what you started. That already puts you ahead."', w / 2, h - 38);
}

/* ── Advice bank (unchanged) ─────────────────────────────────── */
const adviceByTrack = {
  'Web Development': [
    { name: 'Heet Patel', role: 'BTech IT 2nd Year', icon: MessageCircle, quote: '“Don’t skip arrays, objects, functions, and the DOM — they become the base for everything in React and Node.”', color: '#a8ff6b' },
    { name: 'Heet Patel', role: 'BTech IT 2nd Year', icon: Lightbulb, quote: '“Tutorials help only until a point. Real growth starts when you build projects without copying.”', color: '#ffc46b' },
    { name: 'Heet Patel', role: 'BTech IT 2nd Year', icon: GraduationCap, quote: '“End-to-end projects teach more than isolated practice problems. Go slow and understand the ‘why’ behind things.”', color: '#6bddff' },
  ],
  'Data Science': [
    { name: 'Dhanya', role: 'MBATech AI 2nd Year', icon: MessageCircle, quote: '“Strong basics in Python, data structures, loops, functions, and CSV handling make Pandas much easier to learn.”', color: '#a8ff6b' },
    { name: 'Dhanya', role: 'MBATech AI 2nd Year', icon: Lightbulb, quote: '“Learning basic statistics alongside Pandas helps you understand what your data is actually saying.”', color: '#ffc46b' },
    { name: 'Dhanya', role: 'MBATech AI 2nd Year', icon: GraduationCap, quote: '“Real datasets from Kaggle teach data analysis better than isolated tutorial examples.”', color: '#6bddff' },
  ],
  'Mobile Development': [
    { name: 'Heet Patel', role: 'BTech IT 2nd Year', icon: MessageCircle, quote: '“Strong OOP fundamentals matter more than jumping into frameworks too early.”', color: '#a8ff6b' },
    { name: 'Heet Patel', role: 'BTech IT 2nd Year', icon: Lightbulb, quote: '“A common beginner mistake is writing everything inside main() instead of using proper functions and constructors.”', color: '#ffc46b' },
    { name: 'Heet Patel', role: 'BTech IT 2nd Year', icon: GraduationCap, quote: '“Projects like chat apps or library systems help connect Java concepts practically.”', color: '#6bddff' },
  ],
  'Cybersecurity': [
    { name: 'Heet Patel', role: 'BTech IT 2nd Year', icon: MessageCircle, quote: '“Learn concepts deeply before coding — dry runs save more time than debugging blindly.”', color: '#a8ff6b' },
    { name: 'Heet Patel', role: 'BTech IT 2nd Year', icon: Lightbulb, quote: '“Pointers, vectors, maps, references, and loops should become second nature.”', color: '#ffc46b' },
    { name: 'Heet Patel', role: 'BTech IT 2nd Year', icon: GraduationCap, quote: '“Competitive programming and terminal-based games improve logic faster than theory alone.”', color: '#6bddff' },
    { name: 'Kartik Jain', role: 'Tech Supercore', icon: Zap, quote: '“Cybersecurity is not ‘movie-style hacking’ — most real work involves defence, patching, and compliance.”', color: '#c46bff' },
  ],
  'AI & Machine Learning': [
    { name: 'Dhanya', role: 'MBATech AI 2nd Year', icon: MessageCircle, quote: '“Don’t just memorize syntax — understand data structures and when to use them.”', color: '#a8ff6b' },
    { name: 'Dhanya', role: 'MBATech AI 2nd Year', icon: Lightbulb, quote: '“Lists, tuples, dictionaries, loops, and functions should feel natural before advanced Python.”', color: '#ffc46b' },
    { name: 'Dhanya', role: 'MBATech AI 2nd Year', icon: GraduationCap, quote: '“Logic building matters more than remembering commands. Strong problem-solving makes learning easier later.”', color: '#6bddff' },
  ],
  'React': [
    { name: 'Kartik Jain', role: 'Tech Supercore', icon: MessageCircle, quote: '“Before learning React, ES6+ concepts like arrow functions, destructuring, async/await, and array methods should feel natural.”', color: '#a8ff6b' },
    { name: 'Parth Gupta', role: 'Technicals Head', icon: Lightbulb, quote: '“Many developers start using React for every project, even when simple HTML or backend-rendered applications would work better.”', color: '#ffc46b' },
    { name: 'Parth Gupta', role: 'Technicals Head', icon: GraduationCap, quote: '“Overusing useEffect can create unnecessary renders and slower applications.”', color: '#6bddff' },
  ],
  'Django': [
    { name: 'Kartik Jain', role: 'Tech Supercore', icon: MessageCircle, quote: '“Strong Python OOP fundamentals make learning Django significantly easier.”', color: '#a8ff6b' },
    { name: 'Kartik Jain', role: 'Tech Supercore', icon: Lightbulb, quote: '“Database migrations can break projects quickly if you don’t understand what’s happening underneath.”', color: '#ffc46b' },
  ],
  'SQL': [
    { name: 'Kartik Jain', role: 'Tech Supercore', icon: MessageCircle, quote: '“Primary keys, foreign keys, normalization, and joins are concepts beginners should deeply understand early.”', color: '#a8ff6b' },
    { name: 'Kartik Jain', role: 'Tech Supercore', icon: Lightbulb, quote: '“Designing schemas for apps like Uber or Airbnb teaches database thinking much better than memorizing queries.”', color: '#ffc46b' },
    { name: 'Parth Gupta', role: 'Technicals Head', icon: GraduationCap, quote: '“Database design matters just as much as writing queries.”', color: '#6bddff' },
    { name: 'Parth Gupta', role: 'Technicals Head', icon: Zap, quote: '“Trying multiple query approaches for the same problem helps you understand performance tradeoffs much better.”', color: '#c46bff' },
  ],
  'C++': [
    { name: 'Parth Gupta', role: 'Technicals Head', icon: MessageCircle, quote: '“Understanding pointers deeply gives you a much stronger understanding of memory and computer architecture.”', color: '#a8ff6b' },
    { name: 'Parth Gupta', role: 'Technicals Head', icon: Lightbulb, quote: '“OOP concepts like encapsulation and abstraction are important for writing clean, production-level code.”', color: '#ffc46b' },
  ],
  'Java': [
    { name: 'Aaniya Sachdeva', role: 'IT', icon: MessageCircle, quote: '“Java makes much more sense once you deeply understand OOP concepts like polymorphism, encapsulation, abstraction, and inheritance.”', color: '#a8ff6b' },
    { name: 'Aaniya Sachdeva', role: 'IT', icon: Lightbulb, quote: '“Collections like Lists, Maps, Sets, Queues, and Stacks are important — but knowing when to use each matters even more.”', color: '#ffc46b' },
    { name: 'Aaniya Sachdeva', role: 'IT', icon: GraduationCap, quote: '“Exception handling should never be ignored. Empty catch blocks create bigger problems later.”', color: '#6bddff' },
    { name: 'Aaniya Sachdeva', role: 'IT', icon: Zap, quote: '“Making every variable or method public creates bad coding habits and makes projects harder to maintain.”', color: '#c46bff' },
    { name: 'Aaniya Sachdeva', role: 'IT', icon: BookOpen, quote: '“Projects like banking systems or to-do apps naturally teach OOP concepts and data handling.”', color: '#a8ff6b' },
    { name: 'Aaniya Sachdeva', role: 'IT', icon: Trophy, quote: '“Building multithreaded projects teaches concurrency in the most practical way possible.”', color: '#ffc46b' },
  ],
  general: [
    { name: 'Dhanya', role: 'MBATech AI 2nd Year', icon: MessageCircle, quote: '“Balancing academics and coding is something I’m still figuring out — consistency matters more than perfection.”', color: '#a8ff6b' },
    { name: 'Dhanya', role: 'MBATech AI 2nd Year', icon: Lightbulb, quote: '“Relying too much on AI tools slowed my growth as a beginner.”', color: '#ffc46b' },
    { name: 'Dhanya', role: 'MBATech AI 2nd Year', icon: GraduationCap, quote: '“You’re probably ready for the next topic when you can apply the current one without constantly following along.”', color: '#6bddff' },
  ],
};

const getLeagueEmoji = (league) => {
  switch (league?.toLowerCase()) {
    case 'bronze': return '🥉';
    case 'silver': return '🥈';
    case 'gold': return '🥇';
    case 'sapphire': return '💎';
    case 'ruby': return '🔴';
    default: return '🥉';
  }
};

const LEAGUE_ORDER = ['Bronze', 'Silver', 'Gold', 'Sapphire', 'Ruby'];
const LEAGUE_THRESHOLDS = { Bronze: 500, Silver: 1500, Gold: 3500, Sapphire: 7000, Ruby: 12000 };

const renderRankDelta = (delta) => {
  if (delta === 'UP') return <span className="delta-up" title="Rank Up">▲</span>;
  if (delta === 'DOWN') return <span className="delta-down" title="Rank Down">▼</span>;
  if (delta === 'NEW') return <span className="delta-new" title="New Entry">NEW</span>;
  return <span className="delta-same" title="No Change">–</span>;
};

function getAdviceForTrack(track) {
  if (!track) return adviceByTrack.general;
  const exact = adviceByTrack[track];
  if (exact) return exact;
  const key = Object.keys(adviceByTrack).find(k =>
    track.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(track.toLowerCase())
  );
  return adviceByTrack[key] || adviceByTrack.general;
}

/* Circular progress ring (XP toward next league) */
function ProgressRing({ value = 0, size = 96, stroke = 8, color = 'var(--green)', children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="ring-svg">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--green-border)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <div className="ring-center">{children}</div>
    </div>
  );
}

export default function Profile() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedCertId, setCopiedCertId] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'journey';

  const [selectedTrack, setSelectedTrack] = useState('All');
  const [selectedLeague, setSelectedLeague] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const trackFilter = selectedTrack === 'All' ? null : selectedTrack;
  const leagueFilter = selectedLeague === 'All' ? null : selectedLeague;

  const { entries, userEntry, userRank, loading: leaderboardLoading, error: leaderboardError } =
    useLeaderboard(trackFilter, leagueFilter);

  const filteredEntries = entries.filter(entry => {
    if (!searchTerm) return true;
    const name = (entry.displayName || '').toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  const displayName = profile?.displayName || user?.displayName || 'Learner';
  const username = displayName.toLowerCase().replace(/\s+/g, '_');
  const track = profile?.track || '';
  const cp = profile?.courseProgress || {};

  const joinedDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'Recently';

  const courses = allCourses.map(c => {
    const p = cp[c.id];
    const progress = p?.progress ?? 0;
    const done = p?.done ?? 0;
    const score = p?.score ?? null;
    const status = progress >= 100 ? 'completed' : progress > 0 ? 'in-progress' : 'locked';
    return { ...c, progress, done, score, status };
  });

  const completedCount = courses.filter(c => c.status === 'completed').length;
  const inProgressCount = courses.filter(c => c.status === 'in-progress').length;

  /* League / XP progress for hero ring */
  const currentLeague = userEntry?.league || profile?.league || 'Bronze';
  const totalXP = userEntry?.totalXP ?? profile?.totalXP ?? 0;
  const currentIdx = Math.max(0, LEAGUE_ORDER.indexOf(currentLeague));
  const nextLeague = LEAGUE_ORDER[Math.min(currentIdx + 1, LEAGUE_ORDER.length - 1)];
  const prevThreshold = currentIdx === 0 ? 0 : LEAGUE_THRESHOLDS[LEAGUE_ORDER[currentIdx - 1]] || 0;
  const nextThreshold = LEAGUE_THRESHOLDS[currentLeague] || 500;
  const ringPct = nextLeague === currentLeague
    ? 100
    : Math.min(100, Math.max(0, ((totalXP - prevThreshold) / (nextThreshold - prevThreshold)) * 100));

  const stats = [
    { label: 'Day Streak',     value: profile?.streak ?? 0,           icon: Flame,      color: '#ffc46b', suffix: 'days' },
    { label: 'Hours Spent',    value: profile?.totalHours ?? 0,       icon: Clock,      color: '#a8ff6b', suffix: 'hrs'  },
    { label: 'Avg Score',      value: profile?.avgScore ?? 0,         icon: TrendingUp, color: '#6bddff', suffix: '%'    },
    { label: 'Lessons Done',   value: profile?.lessonsCompleted ?? 0, icon: BookOpen,   color: '#c46bff', suffix: ''     },
  ];

  const certificates = courses
    .filter(c => c.status === 'completed')
    .map(c => ({
      id: `FITRY-${new Date().getFullYear()}-${String(c.id).padStart(4, '0')}`,
      title: c.title,
      unlocked: true,
      progress: 100,
      score: c.score,
    }));

  const inProgress = courses.filter(c => c.status !== 'completed').slice(0, 1).map(c => ({
    id: `FITRY-${new Date().getFullYear()}-${String(c.id).padStart(4, '0')}`,
    title: c.title,
    unlocked: false,
    progress: c.progress,
    score: c.score,
  }));

  const allCerts = [...certificates, ...inProgress];

  const handleDownload = (cert) => {
    setDownloading(true);
    const certData = {
      name: displayName,
      course: cert.title,
      score: cert.score ?? profile?.avgScore ?? 85,
      track,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      id: cert.id,
    };
    setTimeout(() => {
      generateCertificate(canvasRef, certData);
      const link = document.createElement('a');
      link.download = `Fitry-Certificate-${certData.course.replace(/\s+/g, '-')}.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
      setDownloading(false);
    }, 300);
  };

  const handleCopyLink = (cert) => {
    navigator.clipboard.writeText(`https://fitry.dev/verify/${cert.id}`).then(() => {
      setCopied(true);
      setCopiedCertId(cert.id);
      setTimeout(() => { setCopied(false); setCopiedCertId(null); }, 2500);
    });
  };

  const handleShareProfile = () => {
    const url = `https://fitry.dev/u/${username}`;
    if (navigator.share) {
      navigator.share({ title: `${displayName} on Fitry`, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  const advice = getAdviceForTrack(track);

  /* Activity grid helpers */
  const actLog = profile?.activityLog || {};
  const WEEKS_TO_SHOW = 36;
  const activeWeeks = useMemo(() =>
    Array.from({ length: WEEKS_TO_SHOW }).filter((_, i) => (actLog[i] || 0) > 0).length, [actLog]);

  /* Podium = top 3 from raw entries */
  const podium = entries.slice(0, 3);
  const restEntries = filteredEntries; // table shows full filtered

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-bg-glow" />
      <canvas ref={canvasRef} width={900} height={620} style={{ display: 'none' }} />

      <div className="profile-content">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="profile-hero fade-up">
          <div className="hero-bg" />
          <div className="hero-inner">
            <div className="hero-left">
              <ProgressRing value={ringPct} size={104} stroke={6} color="var(--green)">
                <div className="hero-avatar">
                  <span>{displayName.charAt(0).toUpperCase()}</span>
                </div>
              </ProgressRing>

              <div className="hero-meta">
                <div className="hero-name-row">
                  <h1 className="profile-name">{displayName}</h1>
                  <span className={`league-chip league-${currentLeague.toLowerCase()}`}>
                    <Crown size={12} /> {currentLeague}
                  </span>
                </div>
                <p className="profile-handle">
                  <span className="mono handle-tag">&gt; @{username}</span>
                  <span className="profile-sep">·</span>
                  <span className="hero-meta-bit">Joined {joinedDate}</span>
                  <span className="profile-sep">·</span>
                  <span className="hero-meta-bit hero-track">
                    {track || 'No track yet — take the quiz!'}
                  </span>
                </p>
                <p className="hero-email">{user?.email}</p>

                <div className="hero-xp-row">
                  <div className="hero-xp-text">
                    <span className="mono hero-xp-num">{totalXP.toLocaleString()} XP</span>
                    {nextLeague !== currentLeague && (
                      <span className="hero-xp-next">
                        {Math.max(0, nextThreshold - totalXP)} XP to {nextLeague}
                      </span>
                    )}
                  </div>
                  <div className="hero-xp-bar">
                    <div className="hero-xp-fill" style={{ width: `${ringPct}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-actions">
              <button className="btn btn-ghost hero-btn" onClick={handleShareProfile}>
                <Share2 size={14} /> Share
              </button>
              <button className="btn btn-ghost hero-btn" onClick={() => navigate('/settings')}>
                <Edit3 size={14} /> Edit
              </button>
              {!track && (
                <button className="btn btn-amber hero-btn" onClick={() => navigate('/quiz')}>
                  <Sparkles size={14} /> Take Track Quiz
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── Tabs ─────────────────────────────────────────── */}
        <div className="profile-tabs fade-up-1" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'journey'}
            className={`tab-btn ${activeTab === 'journey' ? 'active' : ''}`}
            onClick={() => setSearchParams({ tab: 'journey' })}
          >
            <BookOpen size={14} /> My Journey
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'leaderboard'}
            className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
            onClick={() => setSearchParams({ tab: 'leaderboard' })}
          >
            <Trophy size={14} /> Weekly Leaderboard
          </button>
          <span
            className="tab-indicator"
            style={{ transform: activeTab === 'journey' ? 'translateX(0)' : 'translateX(100%)' }}
          />
        </div>

        {activeTab === 'journey' ? (
          <>
            {/* Stats */}
            <div className="profile-stats fade-up-1">
              {stats.map(({ label, value, icon: Icon, color, suffix }) => (
                <div className="ps-card" key={label} style={{ '--sc': color }}>
                  <div className="ps-card-top">
                    <div className="ps-icon-wrap"><Icon size={16} /></div>
                    <span className="ps-label">{label}</span>
                  </div>
                  <div className="ps-value">
                    {value}
                    {suffix && <span className="ps-suffix">{suffix}</span>}
                  </div>
                  <div className="ps-spark" aria-hidden>
                    <span /><span /><span /><span /><span /><span /><span />
                  </div>
                </div>
              ))}
            </div>

            <div className="profile-grid">
              <div className="profile-left">
                {/* Journey */}
                <div className="profile-section fade-up-2">
                  <div className="section-head">
                    <p className="prompt-label">course.journey</p>
                    <div className="section-head-meta">
                      <span className="chip-stat"><CheckCircle2 size={12} /> {completedCount} done</span>
                      <span className="chip-stat"><PlayCircle size={12} /> {inProgressCount} active</span>
                    </div>
                  </div>

                  <div className="journey-list">
                    {(() => {
                      const ongoingCourses = courses.filter(c => c.status === 'in-progress').slice(0, 3);
                      if (ongoingCourses.length === 0) {
                        return (
                          <div className="journey-empty-state">
                            <div className="empty-icon"><Target size={22} /></div>
                            <h4>No ongoing courses</h4>
                            <p>Pick a course and start building momentum today.</p>
                            <button className="btn btn-amber" onClick={() => navigate('/courses')}>
                              Explore Catalog <ChevronRight size={14} />
                            </button>
                          </div>
                        );
                      }
                      return ongoingCourses.map((course, i) => (
                        <div key={i} className={`journey-item ${course.status}`} style={{ '--jc': course.color || '#a8ff6b' }}>
                          <div className="ji-top">
                            <div className="ji-info">
                              <div className="ji-status-dot" />
                              <div>
                                <h3 className="ji-title">{course.title}</h3>
                                <p className="ji-meta">{course.done} / {course.lessons} lessons</p>
                              </div>
                            </div>
                            <div className="ji-right">
                              {course.score && <span className="ji-score">{course.score}/100</span>}
                              <span className={`ji-status-tag ${course.status}`}>In Progress</span>
                            </div>
                          </div>
                          <div className="ji-bar-wrap">
                            <div className="ji-bar">
                              <div className="ji-bar-fill" style={{ width: `${course.progress}%` }} />
                            </div>
                            <span className="ji-pct">{course.progress}%</span>
                          </div>
                          <div className="ji-actions">
                            <button
                              className="btn btn-ghost ji-cta"
                              onClick={() => navigate(`/courses/${course.id}`)}
                            >
                              <PlayCircle size={14} /> Continue Learning
                            </button>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* Activity log */}
                <div className="profile-section activity-section fade-up-3">
                  <div className="section-head">
                    <p className="prompt-label">activity.log</p>
                    <span className="chip-stat"><Flame size={12} /> {activeWeeks} active weeks</span>
                  </div>

                  <div className="activity-wrap">
                    <div className="activity-day-labels">
                      <span>Mon</span><span>Wed</span><span>Fri</span>
                    </div>
                    <div className="activity-grid">
                      {Array.from({ length: WEEKS_TO_SHOW }).map((_, i) => {
                        const intensity = actLog[i] || 0;
                        const active = intensity > 0;
                        return (
                          <div
                            key={i}
                            className="activity-cell"
                            style={{
                              background: active
                                ? `rgba(168,255,107,${0.18 + intensity * 0.55})`
                                : 'var(--bg-surface)',
                              borderColor: active
                                ? 'rgba(168,255,107,0.22)'
                                : 'var(--green-border)',
                            }}
                            title={`Week ${i + 1}${active ? ` — intensity ${(intensity * 100).toFixed(0)}%` : ' — no activity'}`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="activity-footer">
                    <span className="activity-note">Last 36 weeks</span>
                    <div className="activity-legend">
                      <span>Less</span>
                      <span className="leg-cell" style={{ background: 'var(--bg-surface)' }} />
                      <span className="leg-cell" style={{ background: 'rgba(168,255,107,0.2)' }} />
                      <span className="leg-cell" style={{ background: 'rgba(168,255,107,0.45)' }} />
                      <span className="leg-cell" style={{ background: 'rgba(168,255,107,0.7)' }} />
                      <span className="leg-cell" style={{ background: 'rgba(168,255,107,0.95)' }} />
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificates rail */}
              <div className="profile-right fade-up-3">
                <p className="prompt-label" style={{ marginBottom: 16 }}>certificates</p>

                {allCerts.length === 0 && (
                  <div className="cert-card locked cert-empty">
                    <Award size={22} />
                    <p>Complete your first course to earn a verifiable certificate.</p>
                  </div>
                )}

                {allCerts.map((cert, i) => (
                  <div key={i} className={`cert-card ${cert.unlocked ? 'unlocked' : 'locked'}`}>
                    <div className="cert-ribbon" />
                    <div className="cert-top">
                      <div className={`cert-icon ${cert.unlocked ? 'is-unlocked' : ''}`}>
                        {cert.unlocked ? <Award size={18} /> : <Lock size={16} />}
                      </div>
                      <div className="cert-info">
                        <h3 className="cert-title">{cert.title}</h3>
                        {cert.unlocked
                          ? <p className="cert-id">&gt; ID: {cert.id}</p>
                          : <p className="cert-progress-note">{cert.progress}% complete — {100 - cert.progress}% to go</p>
                        }
                      </div>
                    </div>

                    {cert.unlocked ? (
                      <>
                        <div className="cert-preview" aria-hidden>
                          <div className="cert-preview-stripe" />
                          <span className="cert-preview-name">{displayName}</span>
                          <span className="cert-preview-course">{cert.title}</span>
                        </div>
                        <div className="cert-actions">
                          <button
                            className="btn btn-amber"
                            style={{ flex: 1 }}
                            onClick={() => handleDownload(cert)}
                            disabled={downloading}
                          >
                            <Download size={14} /> {downloading ? 'Generating…' : 'Download'}
                          </button>
                          <button
                            className="btn btn-ghost"
                            style={{ flex: 1 }}
                            onClick={() => handleCopyLink(cert)}
                          >
                            <Share2 size={14} /> {copied && copiedCertId === cert.id ? 'Copied!' : 'Share'}
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="cert-locked-state">
                        <div className="cert-lock-bar">
                          <div className="cert-lock-fill" style={{ width: `${cert.progress}%` }} />
                        </div>
                        <p className="cert-lock-note"><Lock size={11} /> Complete the course to unlock</p>
                      </div>
                    )}
                  </div>
                ))}

                <div className="cert-verify-note">
                  <p className="prompt-label" style={{ marginBottom: 8, fontSize: 10 }}>verification</p>
                  <p>Every Fitry certificate has a unique ID. Share the link and employers can verify it at <span style={{ color: 'var(--green)' }}>fitry.dev/verify</span></p>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="profile-insights fade-up-4">
              <div className="section-head" style={{ marginBottom: 16 }}>
                <p className="prompt-label" style={{ margin: 0 }}>from.seniors.and.faculty</p>
                <span className="chip-stat"><Sparkles size={12} /> Curated for {track || 'you'}</span>
              </div>

              <div className="pi-cards">
                {advice.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="pi-card" style={{ '--ic': item.color }}>
                      <div className="pi-icon-wrap"><Icon size={18} /></div>
                      <div className="pi-card-body">
                        <p className="pi-card-quote">{item.quote}</p>
                        <p className="pi-card-advisor">
                          — {item.name} <span className="pi-card-role">{item.role}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="pi-see-all" onClick={() => navigate('/insights')}>
                <span>See all insights</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="profile-leaderboard-tab fade-up-1">
            {/* Podium */}
            {podium.length > 0 && (
              <div className="podium-wrap">
                {[1, 0, 2].map((slot) => {
                  const entry = podium[slot];
                  if (!entry) return <div key={slot} className="podium-empty" />;
                  const rank = slot + 1;
                  const isSelf = entry.uid === user?.uid;
                  return (
                    <div key={slot} className={`podium-card podium-${rank} ${isSelf ? 'is-self' : ''}`}>
                      <div className="podium-medal">{rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}</div>
                      <div className="podium-avatar">
                        {entry.photoURL
                          ? <img src={entry.photoURL} alt={entry.displayName} />
                          : <span>{(entry.displayName || 'D')[0].toUpperCase()}</span>}
                      </div>
                      <div className="podium-name">{entry.displayName || 'Developer'}</div>
                      <div className="podium-xp mono">{(entry.weeklyXP || 0).toLocaleString()} XP</div>
                      <div className="podium-bar" />
                    </div>
                  );
                })}
              </div>
            )}

            <div className="leaderboard-grid">
              <div className="leaderboard-list-card">
                <div className="section-head" style={{ marginBottom: 16 }}>
                  <p className="prompt-label" style={{ margin: 0 }}>leaderboard.entries</p>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--text-dim)' }}>
                    {filteredEntries.length} entries
                  </span>
                </div>

                {leaderboardLoading ? (
                  <div className="leaderboard-empty">
                    <div className="lb-skeleton" />
                    <div className="lb-skeleton" />
                    <div className="lb-skeleton" />
                  </div>
                ) : leaderboardError ? (
                  <div className="leaderboard-empty">
                    <p>Error loading leaderboard. Please try again.</p>
                  </div>
                ) : restEntries.length === 0 ? (
                  <div className="leaderboard-empty">
                    <p>No entries found matching filters.</p>
                  </div>
                ) : (
                  <div className="leaderboard-table-container">
                    <table className="leaderboard-table">
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>User</th>
                          <th>Track</th>
                          <th>Weekly</th>
                          <th>Total XP</th>
                          <th>League</th>
                          <th>Δ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {restEntries.map((entry, idx) => {
                          const isSelf = entry.uid === user?.uid;
                          const rank = idx + 1;
                          return (
                            <tr key={entry.id || entry.uid} className={isSelf ? 'is-self-row' : ''}>
                              <td>
                                <span className={`rank-badge rank-${rank}`}>{rank}</span>
                              </td>
                              <td>
                                <div className="table-user">
                                  <div className="table-avatar">
                                    {entry.photoURL ? (
                                      <img src={entry.photoURL} alt={entry.displayName} />
                                    ) : (
                                      <span className="avatar-initial">
                                        {(entry.displayName || 'D')[0].toUpperCase()}
                                      </span>
                                    )}
                                  </div>
                                  <div className="table-name-wrap">
                                    <span className="table-name">{entry.displayName || 'Developer'}</span>
                                    {isSelf && <span className="self-pill">You</span>}
                                  </div>
                                </div>
                              </td>
                              <td className="table-track">{entry.selectedTrack || 'HTML & CSS'}</td>
                              <td className="table-xp font-mono">{(entry.weeklyXP || 0).toLocaleString()}</td>
                              <td className="table-total-xp font-mono">{(entry.totalXP || 0).toLocaleString()}</td>
                              <td>
                                <span className={`league-tag ${entry.league?.toLowerCase()}`}>
                                  {getLeagueEmoji(entry.league)} {entry.league || 'Bronze'}
                                </span>
                              </td>
                              <td className="table-delta">{renderRankDelta(entry.rankDelta)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="standing-card">
                  <p className="standing-title">Your Standing</p>

                  <ProgressRing value={ringPct} size={110} stroke={7} color="var(--green)">
                    <div className="standing-avatar-inline">
                      <span>{displayName.charAt(0).toUpperCase()}</span>
                    </div>
                  </ProgressRing>

                  <h3 className="standing-name">{displayName}</h3>
                  <span className={`league-chip standing-league league-${currentLeague.toLowerCase()}`}>
                    {getLeagueEmoji(currentLeague)} {currentLeague}
                  </span>

                  <div className="standing-stats">
                    <div className="s-stat-box">
                      <div className="s-stat-val">#{userRank || '—'}</div>
                      <div className="s-stat-lbl">Rank</div>
                    </div>
                    <div className="s-stat-box">
                      <div className="s-stat-val mono">{(userEntry?.weeklyXP || 0).toLocaleString()}</div>
                      <div className="s-stat-lbl">Weekly XP</div>
                    </div>
                  </div>

                  <div className="standing-msg-box">
                    {(() => {
                      const userIndex = entries.findIndex(e => e.uid === user?.uid || e.id === user?.uid);
                      if (userIndex > 0) {
                        const nextUser = entries[userIndex - 1];
                        const diff = (nextUser.weeklyXP || 0) - (userEntry?.weeklyXP || 0);
                        return `Only ${diff} XP behind ${nextUser.displayName || `Rank ${userIndex}`}!`;
                      } else if (userIndex === 0) {
                        return '🏆 You are in 1st place! Outstanding work!';
                      } else if ((userEntry?.weeklyXP || 0) > 0) {
                        return 'Keep learning to climb higher on the board!';
                      } else {
                        return 'Complete a lesson to enter the leaderboard!';
                      }
                    })()}
                  </div>
                </div>

                <div className="leaderboard-filters-card">
                  <p className="prompt-label" style={{ marginBottom: 4 }}>filters</p>

                  <div className="filter-group">
                    <label className="filter-label">Search</label>
                    <div className="search-wrap">
                      <Search size={14} className="search-icon" />
                      <input
                        type="text"
                        placeholder="Search learner name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                      />
                    </div>
                  </div>

                  <div className="filter-group">
                    <label className="filter-label">Course Track</label>
                    <select
                      value={selectedTrack}
                      onChange={(e) => setSelectedTrack(e.target.value)}
                      className="filter-select"
                    >
                      <option value="All">All Tracks</option>
                      <option value="HTML & CSS">HTML & CSS</option>
                      <option value="JavaScript">JavaScript</option>
                      <option value="React">React</option>
                      <option value="Python">Python</option>
                      <option value="Pandas">Pandas</option>
                      <option value="ML Fundamentals">ML Fundamentals</option>
                      <option value="C++">C++</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="React Native">React Native</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label className="filter-label">League</label>
                    <select
                      value={selectedLeague}
                      onChange={(e) => setSelectedLeague(e.target.value)}
                      className="filter-select"
                    >
                      <option value="All">All Leagues</option>
                      <option value="Bronze">Bronze 🥉</option>
                      <option value="Silver">Silver 🥈</option>
                      <option value="Gold">Gold 🥇</option>
                      <option value="Sapphire">Sapphire 💎</option>
                      <option value="Ruby">Ruby 🔴</option>
                    </select>
                  </div>

                  {(selectedTrack !== 'All' || selectedLeague !== 'All' || searchTerm) && (
                    <button
                      className="btn btn-ghost"
                      style={{ fontSize: 12 }}
                      onClick={() => { setSelectedTrack('All'); setSelectedLeague('All'); setSearchTerm(''); }}
                    >
                      Reset filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
