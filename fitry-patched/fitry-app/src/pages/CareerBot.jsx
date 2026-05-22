import { useState, useRef, useEffect, useMemo } from 'react';
import {
  Send,
  ChevronRight,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Lock,
  ClipboardList,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Loader2,
  Circle,
  Building2,
  Zap,
  Target,
  FileText,
  Mic,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useUser } from '../hooks/useUser';
import { useAllProgress } from '../hooks/useProgress';
import { askCareerBotWithMode } from '../lib/api';
import { buildCareerContext, formatContextForPrompt } from '../lib/buildCareerContext';
import { ROLE_ROADMAPS } from '../data/roleRoadmaps';
import './CareerBot.css';

// ── Mode definitions ────────────────────────────────────────
const MODES = [
  { key: 'career',    label: 'Career guidance', icon: Target },
  { key: 'resume',    label: 'Resume coach',    icon: FileText },
  { key: 'interview', label: 'Mock interview',  icon: Mic },
  { key: 'learn',     label: 'What to learn',   icon: BookOpen },
  { key: 'ready',     label: 'Am I ready?',     icon: ShieldCheck },
];

const MODE_PLACEHOLDERS = {
  career:    'Ask anything about your career path...',
  resume:    'Paste a resume section or ask a question...',
  interview: 'Type your answer...',
  learn:     'Ask what to focus on next...',
  ready:     'Ask if you are ready to apply...',
};

const MODE_EMPTY_MESSAGES = {
  career:    'Ask me anything about tech careers. I\'ll give you honest, specific advice — no buzzwords, no pressure.',
  resume:    'I\'ll coach you through building a strong resume for your track — one section at a time.',
  interview: 'I\'ll run a mock interview based on your actual progress. One question at a time.',
  learn:     'I\'ll recommend exactly what to learn next based on where you are right now.',
  ready:     'I\'ll give you an honest assessment of your job readiness — no sugarcoating.',
};

const MODE_EMOJIS = {
  career: '🧭', resume: '📝', interview: '🎤', learn: '📚', ready: '✅',
};

const MODE_QUESTIONS = {
  career: [
    "What are the highest paying roles in this track?",
    "Should I specialize or stay a generalist?",
    "How do I transition to senior roles?",
    "What industries hire the most in this track?",
    "How does the job market look for junior developers?",
    "What soft skills are most valued by engineering managers?",
    "How should I negotiate my first developer salary?",
    "What is the difference between working at a startup vs enterprise?"
  ],
  resume: [
    "How can I describe my projects to look senior?",
    "What keywords are resume ATS scanners looking for?",
    "Can you review my experience description?",
    "How long should my resume be?",
    "Should I include non-tech work experience?",
    "How do I write a compelling summary statement?",
    "What is the best way to list my technical skills?",
    "How can I quantify the impact of my projects?"
  ],
  interview: [
    "Start a beginner mock interview",
    "Give me an advanced system design question",
    "How should I answer 'tell me about yourself'?",
    "Give me some behavioral interview tips",
    "How do I handle coding questions when I get stuck?",
    "What are good questions to ask the interviewer?",
    "Can you give me a javascript mock question?",
    "What is the STAR method for behavioral questions?"
  ],
  learn: [
    "What order of courses should I take?",
    "What is a good side project to build?",
    "What tools/frameworks should I master next?",
    "Should I learn TypeScript or stick to JS?",
    "What are the best resources to learn database design?",
    "How do I master CSS layout techniques?",
    "What are the must-know concepts in React?",
    "How do I learn back-end system architecture?"
  ],
  ready: [
    "Evaluate if my project portfolio is ready",
    "Am I ready to apply for junior roles?",
    "What are the exact criteria for a senior role?",
    "How do I know when I'm ready to interview?",
    "How many projects do I need in my portfolio?",
    "What makes a project stand out to recruiters?",
    "Should I publish my projects to GitHub?",
    "Is my LinkedIn profile optimized for tech jobs?"
  ],
};

// ── Helper: get course status from allProgress ───────────────
function getCourseStatus(courseId, allProgress) {
  const p = allProgress.find(x => String(x.courseId || x.id) === String(courseId));
  if (!p) return 'locked';
  const levels = p.levels || {};
  if (levels.advanced?.status === 'complete' || levels.advanced?.completed) return 'completed';
  if (levels.intermediate?.status === 'complete' || levels.intermediate?.completed) return 'completed';
  if (levels.beginner?.status === 'complete' || levels.beginner?.completed) return 'completed';
  if (
    levels.beginner?.status === 'in_progress' ||
    levels.intermediate?.status === 'in_progress' ||
    levels.advanced?.status === 'in_progress'
  ) return 'in-progress';
  // Check embedded schema
  if (levels.beginner?.unlocked) return 'in-progress';
  return 'locked';
}

// ── Helper: derive skills from completed courses ─────────────
function getCompletedSkills(completedCourses, roadmap) {
  if (!roadmap) return [];
  const completedTitles = completedCourses.map(c => (c.courseTitle || '').toLowerCase());
  return roadmap.requiredSkills.filter(s =>
    completedTitles.some(t => t.includes(s.toLowerCase()))
  );
}

export default function CareerBot() {
  const { user, loading: userLoading } = useUser();
  const { allProgress, loading: progressLoading } = useAllProgress();

  // Chat state
  const [mode, setMode] = useState('career');
  const [sidebarTab, setSidebarTab] = useState('questions');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const chatSectionRef = useRef(null);

  // Roadmap state
  const track = user?.track || user?.selectedTrack || null;
  const trackRoadmaps = ROLE_ROADMAPS[track] || [];
  const [selectedRoleIdx, setSelectedRoleIdx] = useState(0);
  const selectedRole = trackRoadmaps[selectedRoleIdx] || null;

  // Portfolio checklist state (persisted per-session only)
  const [checkedItems, setCheckedItems] = useState({});

  // Build context for display
  const context = useMemo(() => {
    if (!user) return null;
    return buildCareerContext(user, allProgress);
  }, [user, allProgress]);

  const completedSkills = useMemo(() => {
    if (!context || !selectedRole) return [];
    return getCompletedSkills(context.completedCourses, selectedRole);
  }, [context, selectedRole]);

  const missingSkills = useMemo(() => {
    if (!selectedRole) return [];
    return selectedRole.requiredSkills.filter(s => !completedSkills.includes(s));
  }, [selectedRole, completedSkills]);

  // Auto-check portfolio items based on progress
  const portfolioStatus = useMemo(() => {
    if (!selectedRole || !allProgress.length) return {};
    const checklist = selectedRole.portfolioChecklist || [];
    const status = {};

    // Map items: 0–1 → beginner, 2–3 → intermediate, 4 → advanced
    const levelMap = ['beginner', 'beginner', 'intermediate', 'intermediate', 'advanced'];

    checklist.forEach((item, i) => {
      const requiredLevel = levelMap[i] || 'advanced';
      // Check if any course in the path has that level complete
      const pathCourses = selectedRole.path || [];
      const isAutoComplete = pathCourses.some(pc => {
        const p = allProgress.find(x => String(x.courseId || x.id) === String(pc.courseId));
        if (!p) return false;
        const lv = p.levels?.[requiredLevel];
        return lv?.status === 'complete' || lv?.completed;
      });
      status[i] = isAutoComplete || !!checkedItems[`${selectedRoleIdx}-${i}`];
    });
    return status;
  }, [selectedRole, allProgress, selectedRoleIdx, checkedItems]);

  const portfolioCompleted = Object.values(portfolioStatus).filter(Boolean).length;
  const portfolioTotal = selectedRole?.portfolioChecklist?.length || 0;

  // Scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Clear messages on mode switch
  function switchMode(newMode) {
    if (newMode === mode) return;
    setMode(newMode);
    setMessages([]);
    setInput('');
  }

  // Send message
  const send = async (text) => {
    const msg = text || input;
    if (!msg.trim() || loading) return;
    const userMsg = { role: 'user', content: msg };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);
    try {
      // Build fresh context every call
      const freshCtx = buildCareerContext(user, allProgress);
      const ctxStr = formatContextForPrompt(freshCtx);
      const { reply } = await askCareerBotWithMode(mode, ctxStr, newMsgs);
      setMessages(m => [...m, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(m => [...m, { role: 'assistant', content: `Connection error: ${err.message}. Is the AI proxy offline?` }]);
    }
    setLoading(false);
  };

  // Quick actions
  const askLearnNext = () => {
    switchMode('learn');
    setTimeout(() => send('Based on my progress, what should I learn next?'), 100);
  };

  const startMockInterview = () => {
    switchMode('interview');
    chatSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => send(`Start my mock interview for ${track || 'tech'} roles`), 300);
  };

  // No track selected guard
  if (!userLoading && !progressLoading && !track) {
    return (
      <div className="career-page">
        <Navbar />
        <div className="career-bg-glow" />
        <div className="career-no-track fade-up">
          <GraduationCap size={48} />
          <h2>Complete the onboarding quiz first</h2>
          <p>To get personalised career guidance, we need to know your learning track. Take the quiz to get started.</p>
          <a href="/quiz" className="btn btn-primary">Take the Quiz →</a>
        </div>
      </div>
    );
  }

  // Loading state
  if (userLoading || progressLoading) {
    return (
      <div className="career-page">
        <Navbar />
        <div className="career-bg-glow" />
        <div className="career-no-track fade-up">
          <Loader2 size={32} className="spinner" />
          <p>Loading your career data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="career-page fullscreen">
      <Navbar />
      <div className="career-bg-glow" />

      <div className="career-container fullscreen-layout">
        {/* ─── Left Sidebar ─────────────────────────────────── */}
        <div className="career-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <Sparkles size={16} className="sidebar-brand-icon" />
              <span>CAREER.DASHBOARD</span>
            </div>
            <span className="cg-track-badge">{track}</span>
          </div>

          <div className="sidebar-content">
            <div className="sidebar-section fade-up">
              <h3>Curated Prompts</h3>
              <p className="sidebar-subtitle-text">
                Select a sample question to ask the AI coach in your current mode:
              </p>
              <div className="sample-questions-list">
                {(MODE_QUESTIONS[mode] || []).map((q, idx) => (
                  <button
                    key={idx}
                    className="sample-question-btn"
                    onClick={() => send(q)}
                    disabled={loading}
                  >
                    <div className="bullet-dot" />
                    <span className="question-text">{q}</span>
                    <ChevronRight size={14} className="question-chevron" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Right Chat Area ──────────────────────────────── */}
        <div className="career-chat-area" ref={chatSectionRef}>
          <div className="chat-area-header">
            <div className="chat-header-title">
              <Sparkles size={16} className="cg-header-icon" />
              <h2>{MODES.find(m => m.key === mode)?.label}</h2>
            </div>
            
            <div className="cg-mode-pills chat-header-pills">
              {MODES.map(m => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.key}
                    className={`cg-mode-pill ${mode === m.key ? 'active' : ''}`}
                    onClick={() => switchMode(m.key)}
                  >
                    <Icon size={13} />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="cg-chat-panel chat-area-panel">
            <div className="cg-chat-messages">
              {messages.length === 0 && (
                <div className="cg-chat-empty fade-up">
                  <div className="cg-chat-empty-avatar">{MODE_EMOJIS[mode]}</div>
                  <h3>{MODES.find(m => m.key === mode)?.label} — online</h3>
                  <p>{MODE_EMPTY_MESSAGES[mode]}</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`chat-msg ${msg.role}`}>
                  <div className="msg-label">{msg.role === 'user' ? 'You' : '> career.guide'}</div>
                  <div className="msg-bubble">
                    {msg.content.split('\n').map((line, j) => {
                      if (!line.trim()) return <br key={j} />;
                      return <p key={j}>{line}</p>;
                    })}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="chat-msg assistant">
                  <div className="msg-label">&gt; career.guide</div>
                  <div className="msg-bubble typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            <div className="chat-input-area">
              <div className="chat-input-container">
                <input
                  className="chat-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder={MODE_PLACEHOLDERS[mode]}
                />
                <button className="chat-send" onClick={() => send()} disabled={loading || !input.trim()}>
                  <Send size={16} />
                </button>
              </div>
              <p className="chat-note" style={{ marginTop: '8px', marginBottom: 0 }}>
                Mode: {MODES.find(m => m.key === mode)?.label} · Personalised to your progress
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
