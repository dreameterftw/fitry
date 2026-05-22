import { Link } from 'react-router-dom';
import { ChevronRight, Zap, BookOpen, Bot, Award, TrendingUp, Clock, HelpCircle, Trophy } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { allCourses } from '../data/courses';
import { useLeaderboard } from '../hooks/useLeaderboard';
import './Dashboard.css';

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

  // Filter for display in the "Active" section
  const activeCourses = courseProgress.filter(c => c.progress > 0);
  const displayCourses = activeCourses.length > 0 ? activeCourses : courseProgress.slice(0, 3);

  const stats = [
    { label: 'Day Streak',   value: profile?.streak            ?? 0,    icon: Zap,         color: '#ffc46b', suffix: '' },
    { label: 'Lessons Done', value: profile?.lessonsCompleted  ?? 0,    icon: BookOpen,    color: '#a8ff6b', suffix: '' },
    { label: 'Avg Score',    value: `${profile?.avgScore ?? 0}%`,       icon: TrendingUp,  color: '#6bddff', suffix: '' },
    { label: 'Hours Spent',  value: `${profile?.totalHours ?? 0}h`,     icon: Clock,       color: '#c46bff', suffix: '' },
  ];

  // Find the most-in-progress course that isn't 100%
  const nextCourse = [...courseProgress].sort((a, b) => b.progress - a.progress)
    .find(c => c.progress < 100) || courseProgress[0];

  // Show progress for the ongoing course (most-in-progress non-100%),
  // so the certificate widget tracks the active course instead of the max across all courses.
  const topProgress = nextCourse?.progress ?? 0;

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dash-bg-glow" />

      <div className="dash-content">
        {/* Welcome */}
        <div className="dash-welcome fade-up">
          <p className="prompt-label" style={{ marginBottom: 10 }}>system.boot</p>
          <h1 className="dash-title">
            Welcome back, <span className="dash-name">{firstName}.</span>
          </h1>
          <p className="dash-subtitle">
            {track ? (
              <>Your path: <span style={{ color: 'var(--green)' }}>{track}</span> &nbsp;·&nbsp; Keep going. You're building something real.</>
            ) : (
              <>Not sure where to start? <Link to="/quiz" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Take the quiz</Link> to discover your ideal path.</>  
            )}
          </p>
        </div>

        {/* Stats Row */}
        <div className="dash-stats fade-up-1">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div className="stat-card" key={label} style={{ '--stat-color': color }}>
              <div className="stat-icon"><Icon size={16} /></div>
              <div className="stat-value">{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="dash-grid">
          <div className="dash-left-col">
            {/* Current Courses */}
            <div className="dash-section fade-up-2">
              <div className="section-header">
                <p className="prompt-label">courses.active</p>
                <Link to="/courses" className="section-link">View all <ChevronRight size={13} /></Link>
              </div>

              <div className="course-list">
                {displayCourses.map(course => (
                  <Link to={`/course/${course.id}`} key={course.id} className="course-item" style={{ '--course-color': course.color }}>
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
                    <ChevronRight size={16} className="course-arrow" />
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
                    <span className="l-stat-value">
                      {userRank ? `#${userRank}` : 'Unranked'}
                    </span>
                  </div>
                  <div className="l-stat">
                    <span className="l-stat-label">Weekly XP</span>
                    <span className="l-stat-value">
                      {userEntry?.weeklyXP !== undefined ? `${userEntry.weeklyXP} XP` : '0 XP'}
                    </span>
                  </div>
                  <div className="l-stat">
                    <span className="l-stat-label">League</span>
                    <span className="l-stat-value league-val" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {userEntry?.league ? (
                        <>
                          <span style={{ fontSize: 14 }}>{getLeagueEmoji(userEntry.league)}</span>
                          <span>{userEntry.league}</span>
                        </>
                      ) : (
                        'Bronze'
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="dash-right">
            <div className="dash-next-step card fade-up-3">
              <p className="prompt-label" style={{ marginBottom: 12 }}>next.action</p>
              {!track && topProgress === 0 ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <HelpCircle size={20} style={{ color: 'var(--green)' }} />
                    <h3 className="next-title">Discover your path</h3>
                  </div>
                  <p className="next-desc">Take a quick quiz to find the tech career that fits you best, or browse courses and start learning.</p>
                  <Link to="/quiz" className="btn btn-primary" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>
                    Take the Quiz <ChevronRight size={15} />
                  </Link>
                  <Link to="/courses" className="btn btn-ghost" style={{ marginTop: 8, width: '100%', justifyContent: 'center', fontSize: 13 }}>
                    Browse Courses
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="next-title">Continue where you left off</h3>
                  <p className="next-desc">{nextCourse.title} · {nextCourse.done} lessons done</p>
                  <Link to={`/course/${nextCourse.id}`} className="btn btn-primary" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>
                    Resume Lesson <ChevronRight size={15} />
                  </Link>
                </>
              )}
            </div>

            <div className="dash-bot-card card fade-up-4">
              <div className="bot-card-icon"><Bot size={20} /></div>
              <h3 className="bot-card-title">Not sure about your path?</h3>
              <p className="bot-card-desc">Talk to the Career Guide bot — it answers questions like "Is web dev still worth learning?" in seconds.</p>
              <Link to="/career-bot" className="btn btn-ghost" style={{ marginTop: 16, fontSize: 13 }}>
                Open Career Guide <ChevronRight size={13} />
              </Link>
            </div>

            <div className="dash-cert-card card fade-up-5">
              <Award size={18} style={{ color: 'var(--amber)', marginBottom: 10 }} />
              <h3 className="cert-title">{topProgress}% to your first certificate</h3>
              <div className="cert-bar-wrap">
                <div className="cert-bar">
                  <div className="cert-bar-fill" style={{ width: `${topProgress}%` }} />
                </div>
              </div>
              <p className="cert-note">Complete {nextCourse.title} to earn it.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
