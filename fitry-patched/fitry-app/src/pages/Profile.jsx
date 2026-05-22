import { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Award, Download, Share2, BookOpen, Zap, Clock, Lock, ChevronRight, MessageCircle, Lightbulb, GraduationCap, TrendingUp, Search, Trophy } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useLeaderboard } from '../hooks/useLeaderboard';
import './Profile.css';
import { allCourses } from '../data/courses';

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

/* ── Senior / Faculty advice bank ─────────────────────────────
   Replace these placeholder quotes with real advice when available.
   Mapped by track name (from the quiz). Falls back to 'general'.
   ──────────────────────────────────────────────────────────── */
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

const renderRankDelta = (delta) => {
  if (delta === 'UP') return <span className="delta-up" title="Rank Up">▲</span>;
  if (delta === 'DOWN') return <span className="delta-down" title="Rank Down">▼</span>;
  if (delta === 'NEW') return <span className="delta-new" title="New Entry">NEW</span>;
  return <span className="delta-same" title="No Change">–</span>;
};

function getAdviceForTrack(track) {
  if (!track) return adviceByTrack.general;
  // Try exact match first, then partial match
  const exact = adviceByTrack[track];
  if (exact) return exact;
  const key = Object.keys(adviceByTrack).find(k => track.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(track.toLowerCase()));
  return adviceByTrack[key] || adviceByTrack.general;
}

export default function Profile() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'journey';

  const [selectedTrack, setSelectedTrack] = useState('All');
  const [selectedLeague, setSelectedLeague] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const trackFilter = selectedTrack === 'All' ? null : selectedTrack;
  const leagueFilter = selectedLeague === 'All' ? null : selectedLeague;

  const { entries, userEntry, userRank, loading: leaderboardLoading, error: leaderboardError } = useLeaderboard(trackFilter, leagueFilter);

  // Client-side search filtering over entries
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

  const stats = [
    { label: 'Day Streak', value: profile?.streak ?? 0, icon: Zap, color: '#ffc46b', suffix: 'days' },
    { label: 'Hours Spent', value: profile?.totalHours ?? 0, icon: Clock, color: '#a8ff6b', suffix: 'hrs' },
    { label: 'Avg Score', value: profile?.avgScore ?? 0, icon: TrendingUp, color: '#6bddff', suffix: '%' },
    { label: 'Lessons Done', value: profile?.lessonsCompleted ?? 0, icon: BookOpen, color: '#c46bff', suffix: '' },
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
      setCopied(true); setTimeout(() => setCopied(false), 2500);
    });
  };

  /* ── Get track-relevant advice ────────────────────────────── */
  const advice = getAdviceForTrack(track);

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-bg-glow" />
      <canvas ref={canvasRef} width={900} height={620} style={{ display: 'none' }} />

      <div className="profile-content">
        <div className="profile-header fade-up">
          <div className="profile-avatar">
            <span>{displayName.charAt(0).toUpperCase()}</span>
          </div>
          <div className="profile-meta">
            <h1 className="profile-name">{displayName}</h1>
            <p className="profile-handle">
              <span className="mono" style={{ color: 'var(--green-dim)', fontSize: 13 }}>&gt; @{username}</span>
              <span className="profile-sep">·</span>
              <span style={{ color: 'var(--text-dim)', fontSize: 13 }}>Joined {joinedDate}</span>
              <span className="profile-sep">·</span>
              <span style={{ color: 'var(--green)', fontSize: 13 }}>{track || 'No track yet — take the quiz!'}</span>
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 4 }}>{user?.email}</p>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="profile-tabs fade-up-1">
          <button
            className={`tab-btn ${activeTab === 'journey' ? 'active' : ''}`}
            onClick={() => setSearchParams({ tab: 'journey' })}
          >
            My Journey
          </button>
          <button
            className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
            onClick={() => setSearchParams({ tab: 'leaderboard' })}
          >
            Weekly Leaderboard
          </button>
        </div>

        {activeTab === 'journey' ? (
          <>
            <div className="profile-stats fade-up-1">
              {stats.map(({ label, value, icon: Icon, color, suffix }) => (
                <div className="ps-card" key={label} style={{ '--sc': color }}>
                  <Icon size={16} className="ps-icon" />
                  <div className="ps-value">{value}<span className="ps-suffix">{suffix}</span></div>
                  <div className="ps-label">{label}</div>
                </div>
              ))}
            </div>

            <div className="profile-grid">
              <div className="profile-left">
                <div className="profile-section fade-up-2">
                  <p className="prompt-label" style={{ marginBottom: 20 }}>course.journey</p>
                  <div className="journey-list">
                    {(() => {
                      const ongoingCourses = courses.filter(c => c.status === 'in-progress').slice(0, 3);
                      if (ongoingCourses.length === 0) {
                        return (
                          <div className="journey-empty-state" style={{ padding: '30px 20px', textAlign: 'center', border: '1px dashed var(--green-border)', borderRadius: 'var(--radius)' }}>
                            <p style={{ color: 'var(--text-dim)', fontSize: 13, marginBottom: 12 }}>No ongoing courses at the moment.</p>
                            <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => navigate('/courses')}>
                              Explore Course Catalog
                            </button>
                          </div>
                        );
                      }
                      return ongoingCourses.map((course, i) => (
                        <div key={i} className={`journey-item ${course.status}`} style={{ '--jc': course.color }}>
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
                              <span className={`ji-status-tag ${course.status}`}>
                                In Progress
                              </span>
                            </div>
                          </div>
                          <div className="ji-bar-wrap">
                            <div className="ji-bar">
                              <div className="ji-bar-fill" style={{ width: `${course.progress}%` }} />
                            </div>
                            <span className="ji-pct">{course.progress}%</span>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                <div className="profile-section activity-section fade-up-3">
                  <p className="prompt-label" style={{ marginBottom: 20 }}>activity.log</p>
                  <div className="activity-grid">
                    {Array.from({ length: 52 }).map((_, i) => {
                      const actLog = profile?.activityLog || {};
                      const intensity = actLog[i] || 0; // 0 = no activity, 0.1–1.0 = activity level
                      const active = intensity > 0;
                      return (
                        <div
                          key={i}
                          className="activity-cell"
                          style={{
                            background: active ? `rgba(168,255,107,${0.15 + intensity * 0.6})` : 'var(--bg-surface)',
                            border: active ? '1px solid rgba(168,255,107,0.2)' : '1px solid var(--green-border)',
                          }}
                          title={`Week ${i + 1}${active ? ' — active' : ''}`}
                        />
                      );
                    })}
                  </div>
                  <p className="activity-note">Last 52 weeks · Green = active learning day</p>
                </div>
              </div>

              <div className="profile-right fade-up-3">
                <p className="prompt-label" style={{ marginBottom: 20 }}>certificates</p>

                {allCerts.map((cert, i) => (
                  <div key={i} className={`cert-card ${cert.unlocked ? 'unlocked' : 'locked'}`}>
                    <div className="cert-top">
                      <Award size={20} style={{ color: cert.unlocked ? 'var(--amber)' : 'var(--text-dim)' }} />
                      <div className="cert-info">
                        <h3 className="cert-title">{cert.title}</h3>
                        {cert.unlocked
                          ? <p className="cert-id">&gt; ID: {cert.id}</p>
                          : <p className="cert-progress-note">{cert.progress}% complete — {100 - cert.progress}% to go</p>
                        }
                      </div>
                    </div>

                    {cert.unlocked ? (
                      <div className="cert-actions">
                        <button className="btn btn-amber" style={{ fontSize: 13, flex: 1 }} onClick={() => handleDownload(cert)} disabled={downloading}>
                          <Download size={14} /> {downloading ? 'Generating...' : 'Download PNG'}
                        </button>
                        <button className="btn btn-ghost" style={{ fontSize: 13, flex: 1 }} onClick={() => handleCopyLink(cert)}>
                          <Share2 size={14} /> {copied ? 'Copied!' : 'Copy Link'}
                        </button>
                      </div>
                    ) : (
                      <div className="cert-locked-state">
                        <div className="cert-lock-bar">
                          <div className="cert-lock-fill" style={{ width: `${cert.progress}%` }} />
                        </div>
                        <p className="cert-lock-note"><Lock size={11} /> Complete the course to unlock this certificate</p>
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

            {/* ── Insights Preview Section ───────────────────────── */}
            <div className="profile-insights fade-up-4">
              <p className="prompt-label" style={{ marginBottom: 16 }}>from.seniors.and.faculty</p>

              <div className="pi-cards">
                {advice.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="pi-card" style={{ '--ic': item.color }}>
                      <div className="pi-icon-wrap">
                        <Icon size={18} />
                      </div>
                      <div className="pi-card-body">
                        <p className="pi-card-quote">{item.quote}</p>
                        <p className="pi-card-advisor">— {item.name} <span className="pi-card-role">{item.role}</span></p>
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
            <div className="leaderboard-grid">
              {/* Left Column: Leaderboard Table */}
              <div className="leaderboard-list-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <p className="prompt-label" style={{ margin: 0 }}>leaderboard.entries</p>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--text-dim)' }}>
                    {filteredEntries.length} entries matching
                  </span>
                </div>

                {leaderboardLoading ? (
                  <div className="leaderboard-empty">
                    <p>Loading leaderboard entries...</p>
                  </div>
                ) : leaderboardError ? (
                  <div className="leaderboard-empty">
                    <p>Error loading leaderboard. Please try again.</p>
                  </div>
                ) : filteredEntries.length === 0 ? (
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
                          <th>Weekly XP</th>
                          <th>Total XP</th>
                          <th>League</th>
                          <th>Delta</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEntries.map((entry, idx) => {
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
                              <td className="table-xp font-mono">{entry.weeklyXP || 0}</td>
                              <td className="table-total-xp font-mono">{entry.totalXP || 0}</td>
                              <td>
                                <span className={`league-tag ${entry.league?.toLowerCase()}`}>
                                  {getLeagueEmoji(entry.league)} {entry.league || 'Bronze'}
                                </span>
                              </td>
                              <td className="table-delta">
                                {renderRankDelta(entry.rankDelta)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Right Column: standing card + filters */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* User Standing Card */}
                <div className="standing-card">
                  <p className="standing-title">Your Standing</p>
                  <div className="standing-avatar">
                    <span>{displayName.charAt(0).toUpperCase()}</span>
                  </div>
                  <h3 className="standing-name">{displayName}</h3>
                  <div className="standing-stats">
                    <div className="s-stat-box">
                      <div className="s-stat-val">#{userRank || 'Unranked'}</div>
                      <div className="s-stat-lbl">Rank</div>
                    </div>
                    <div className="s-stat-box">
                      <div className="s-stat-val">{getLeagueEmoji(userEntry?.league || 'Bronze')}</div>
                      <div className="s-stat-lbl">{userEntry?.league || 'Bronze'}</div>
                    </div>
                  </div>
                  <div className="standing-stats" style={{ gridTemplateColumns: '1fr', marginTop: -8 }}>
                    <div className="s-stat-box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="s-stat-lbl">Weekly XP</span>
                      <span className="s-stat-val" style={{ fontSize: 15, margin: 0 }}>{userEntry?.weeklyXP || 0} XP</span>
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
                        return "🏆 You are in 1st place! Outstanding work!";
                      } else if ((userEntry?.weeklyXP || 0) > 0) {
                        return "Keep learning to climb higher on the board!";
                      } else {
                        return "Complete a lesson to enter the leaderboard!";
                      }
                    })()}
                  </div>
                </div>

                {/* Filters */}
                <div className="leaderboard-filters-card">
                  <div className="filter-group">
                    <label className="filter-label">Search User</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        placeholder="Search name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                        style={{ width: '100%', paddingLeft: 36 }}
                      />
                      <Search size={14} style={{ position: 'absolute', left: 12, top: 13, color: 'var(--text-dim)' }} />
                    </div>
                  </div>

                  <div className="filter-group">
                    <label className="filter-label">Filter by Course Track</label>
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
                    <label className="filter-label">Filter by League</label>
                    <select
                      value={selectedLeague}
                      onChange={(e) => setSelectedLeague(e.target.value)}
                      className="filter-select"
                    >
                      <option value="All">All Leagues</option>
                      <option value="Bronze">Bronze League 🥉</option>
                      <option value="Silver">Silver League 🥈</option>
                      <option value="Gold">Gold League 🥇</option>
                      <option value="Sapphire">Sapphire League 💎</option>
                      <option value="Ruby">Ruby League 🔴</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
