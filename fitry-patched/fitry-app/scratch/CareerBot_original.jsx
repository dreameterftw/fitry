import { useState, useRef, useEffect } from 'react';
import { Send, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { askCareerBot } from '../lib/api';
import './CareerBot.css';

const suggestions = [
  "What career fits someone who likes design and logic?",
  "Is web development still worth learning in 2026?",
  "How long does it take to get a data science job?",
  "What is the difference between AI/ML and Data Science?",
  "Which path has the most job openings right now?",
  "I am good at math — what should I learn?",
];

export default function CareerBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text) => {
    const msg = text || input;
    if (!msg.trim() || loading) return;
    const userMsg = { role: 'user', content: msg };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);
    try {
      const { reply } = await askCareerBot(newMsgs);
      setMessages(m => [...m, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(m => [...m, { role: 'assistant', content: `Connection error: ${err.message}. Is the backend running?` }]);
    }
    setLoading(false);
  };

  return (
    <div className="career-page">
      <Navbar />
      <div className="career-bg-glow" />

      <div className="career-layout">
        {/* Left info panel */}
        <div className="career-info">
          <div className="fade-up">
            <p className="prompt-label" style={{ marginBottom: 14 }}>career.guide</p>
            <h1 className="career-title">Find your path in tech.</h1>
            <p className="career-desc">
              Ask anything about tech careers — salaries, timelines, what to learn first. This bot is trained to give you honest, grounded advice.
            </p>
          </div>

          <div className="career-scope fade-up-1">
            <p className="scope-title">&gt; What I can help with:</p>
            {[
              'Career path comparisons',
              'Salary expectations (India & global)',
              'Time to job-ready estimates',
              'Which language to learn first',
              'Job market demand in 2026',
              'Switching domains',
            ].map((item, i) => (
              <div key={i} className="scope-item">
                <span className="scope-dot" />
                {item}
              </div>
            ))}
          </div>

          <div className="career-suggestions fade-up-2">
            <p className="suggestions-title">Try asking:</p>
            {suggestions.map((s, i) => (
              <button key={i} className="suggestion-btn" onClick={() => send(s)}>
                {s} <ChevronRight size={12} />
              </button>
            ))}
          </div>
        </div>

        {/* Chat panel */}
        <div className="career-chat">
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-empty fade-up">
                <div className="chat-empty-avatar">🤖</div>
                <h3>Career Guide online</h3>
                <p>Ask me anything about tech careers. I will give you honest, specific advice — no buzzwords, no pressure.</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                <div className="msg-label">{msg.role === 'user' ? 'You' : '> career.guide'}</div>
                <div className="msg-bubble">
                  {msg.content.split('\n').map((line, j) => {
                    const cleanLine = line.trim();
                    if (cleanLine.startsWith('→') || cleanLine.startsWith('Suggested path on Fitry:')) return null;
                    return line ? <p key={j}>{line}</p> : <br key={j} />;
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
            <input
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask about any tech career path..."
            />
            <button className="chat-send" onClick={() => send()} disabled={loading || !input.trim()}>
              <Send size={16} />
            </button>
          </div>
          <p className="chat-note">Only responds to tech career questions. Scoped intentionally.</p>
        </div>
      </div>
    </div>
  );
}
