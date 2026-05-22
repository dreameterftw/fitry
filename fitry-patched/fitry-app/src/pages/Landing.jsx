import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Sparkles, Target, ShieldCheck, ArrowRight, Mail, ChevronDown, Send, CheckCircle } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const simResponseRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // FAQ state
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq(prev => prev === i ? null : i);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState('idle'); // idle | sending | sent | error
  const [contactError, setContactError] = useState('');

  const handleContactChange = (e) => {
    setContactForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('sending');
    setContactError('');
    try {
      const res = await fetch('https://fitry-proxy.dr3amtoosadr07.workers.dev/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Error ${res.status}`);
      }
      setContactStatus('sent');
      setContactForm({ name: '', email: '', message: '' });
    } catch (err) {
      setContactError(err.message || 'Something went wrong. Please try again.');
      setContactStatus('error');
    }
  };

  // Close dropdown when clicking outside
  const handleOutsideClick = useCallback((e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  // Load the original landing CSS (scoped via link tag)
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/index-landing.css?v=1.0.1';
    link.id = 'landing-css';
    document.head.appendChild(link);
    return () => {
      const el = document.getElementById('landing-css');
      if (el) el.remove();
    };
  }, []);

  // All JS logic from landing.js, ported to React
  useEffect(() => {
    // 1. Phase scroll reveal & spine tracking
    const phaseBlocks = document.querySelectorAll('.phase-block');
    const spineNodes = document.querySelectorAll('.spine-node');

    function updateSpineNodes(activePhase) {
      spineNodes.forEach(node => {
        const nodePhase = parseInt(node.getAttribute('data-phase'));
        node.classList.toggle('active', nodePhase === activePhase);
      });
    }

    const phaseObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          const phaseNum = entry.target.id.split('-')[1];
          updateSpineNodes(parseInt(phaseNum));
        }
      });
    }, { threshold: 0.4, rootMargin: '0px 0px -10% 0px' });

    phaseBlocks.forEach(b => phaseObserver.observe(b));

    // 2. Smooth scroll for skip link
    const skipLink = document.querySelector('.phases-skip-link');
    const handleSkip = (e) => {
      e.preventDefault();
      const target = document.querySelector(skipLink.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    if (skipLink) skipLink.addEventListener('click', handleSkip);

    // 3. Reality simulator
    const simBtns = document.querySelectorAll('.sim-btn');
    const responseArea = document.getElementById('sim-response');
    const responseText = responseArea?.querySelector('.response-text');

    const simSection = document.querySelector('.simulator-section');
    const simObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.2 });
    if (simSection) simObserver.observe(simSection);

    const handleSimBtn = (btn) => () => {
      simBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      responseArea?.classList.remove('is-visible');
      setTimeout(() => {
        if (responseText) responseText.textContent = btn.getAttribute('data-response');
        responseArea?.classList.add('is-visible');
      }, 300);
    };
    const simHandlers = [];
    simBtns.forEach(btn => {
      const h = handleSimBtn(btn);
      simHandlers.push({ btn, h });
      btn.addEventListener('click', h);
    });

    // 4. Senior panel scroll reveal
    const seniorSection = document.querySelector('.senior-panel-section');
    const seniorObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.15 });
    if (seniorSection) seniorObserver.observe(seniorSection);

    // 5. Mode radio → senior panel track
    const modeRadios = document.querySelectorAll('input[name="system-mode"]');
    const updateSeniorTrack = (val) => {
      if (seniorSection) {
        const map = { analytical: 'structured', balanced: 'logical', creative: 'creative' };
        seniorSection.setAttribute('data-track', map[val] || 'logical');
      }
    };
    const radioHandlers = [];
    modeRadios.forEach(radio => {
      const h = (e) => updateSeniorTrack(e.target.value);
      radioHandlers.push({ radio, h });
      radio.addEventListener('change', h);
    });
    const initialMode = document.querySelector('input[name="system-mode"]:checked');
    if (initialMode) updateSeniorTrack(initialMode.value);

    // 6. Chat window reveal
    const chatWindow = document.querySelector('.cb-chat-window');
    const chatObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.25 });
    if (chatWindow) chatObserver.observe(chatWindow);

    // 7. Career-bot section reveal (whole block fades up)
    const cbSection = document.querySelector('.careerbot-section');
    const cbObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.15 });
    if (cbSection) cbObserver.observe(cbSection);

    // 8. Footer scroll reveal
    const footer = document.querySelector('.site-footer');
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.1 });
    if (footer) footerObserver.observe(footer);

    return () => {
      phaseObserver.disconnect();
      simObserver.disconnect();
      seniorObserver.disconnect();
      chatObserver.disconnect();
      cbObserver.disconnect();
      footerObserver.disconnect();
      if (skipLink) skipLink.removeEventListener('click', handleSkip);
      simHandlers.forEach(({ btn, h }) => btn.removeEventListener('click', h));
      radioHandlers.forEach(({ radio, h }) => radio.removeEventListener('change', h));
    };
  }, []);

  const goLogin = (e) => { e.preventDefault(); navigate('/login?mode=login'); };
  const goSignup = (e) => { e.preventDefault(); navigate('/login?mode=signup'); };

  return (
    <>
      {/* HEADER */}
      <header className="site-header" id="site-header">
        <div className="header-inner">
          <a href="#" className="logo" id="logo">
            <span className="logo-bracket">&gt;</span> Fitry
          </a>

          {/* Desktop nav */}
          <nav className="nav-center">
            <div 
              className="nav-item dropdown" 
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <a
                href="#"
                className="nav-link dropdown-toggle"
                id="nav-course"
                aria-expanded={dropdownOpen}
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(o => !o);
                }}
              >
                Courses
                <span className={`dropdown-arrow${dropdownOpen ? ' open' : ''}`}></span>
              </a>
              <div className={`dropdown-menu dropdown-menu-compact${dropdownOpen ? ' is-open' : ''}`}>
                <a href="/login" className="dropdown-item" onClick={(e) => { setDropdownOpen(false); goSignup(e); }}>HTML &amp; CSS Fundamentals</a>
                <a href="/login" className="dropdown-item" onClick={(e) => { setDropdownOpen(false); goSignup(e); }}>JavaScript Fundamentals</a>
                <a href="/login" className="dropdown-item" onClick={(e) => { setDropdownOpen(false); goSignup(e); }}>Python for Everyone</a>
                <a href="/login" className="dropdown-item" onClick={(e) => { setDropdownOpen(false); goSignup(e); }}>Machine Learning Foundations</a>
                <a href="/login" className="dropdown-item" onClick={(e) => { setDropdownOpen(false); goSignup(e); }}>Cybersecurity Basics</a>
                <div className="dropdown-divider"></div>
                <a href="/login" className="dropdown-item dropdown-more" onClick={(e) => { setDropdownOpen(false); goSignup(e); }}>
                  Browse all 13 paths <span className="more-arrow">→</span>
                </a>
              </div>
            </div>
            <a href="#about" className="nav-link" id="nav-about">About</a>
            <a href="#contact" className="nav-link" id="nav-contact">Contact</a>
          </nav>

          <div className="nav-right">
            <a href="/login" className="nav-cta nav-login-btn" id="nav-login" onClick={goLogin}>Log In</a>
            <a href="/login" className="nav-cta nav-signup-btn" id="nav-signup" onClick={goSignup}>Sign Up</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="hero" id="hero">
          <img src="/img1.png" alt="Cozy retro gaming café at night" className="hero-bg" id="hero-bg" />
          <div className="crt-scanlines" aria-hidden="true"></div>
          <div className="crt-reflection" aria-hidden="true"></div>
          <div className="dust" aria-hidden="true">
            <span className="dust-p"></span><span className="dust-p"></span>
            <span className="dust-p"></span><span className="dust-p"></span>
            <span className="dust-p"></span><span className="dust-p"></span>
            <span className="dust-p"></span><span className="dust-p"></span>
          </div>
          <div className="hero-overlay-left" aria-hidden="true"></div>
          <div className="hero-overlay-bottom" aria-hidden="true"></div>
          <div className="hero-overlay-vignette" aria-hidden="true"></div>
          <div className="hero-warm-glow" aria-hidden="true"></div>

          <div className="hero-content" id="hero-content">
            <p className="hero-eyebrow" id="hero-eyebrow">
              <span className="eyebrow-prompt">&gt;</span> tech discovery platform
            </p>
            <div className="headline-glow" aria-hidden="true"></div>
            <h1 className="hero-title" id="hero-title">
              You're not late
              <br />
              <span className="hero-title-accent">You're just starting</span>
            </h1>
            <p className="hero-sub" id="hero-sub">
              Explore Web Dev, Python, AI, Cybersecurity, and more —
              before committing months to the wrong path.
            </p>
            <div className="hero-actions" id="hero-actions">
              <a href="/login" className="btn btn-primary" id="hero-cta" onClick={goSignup}>
                <span className="btn-icon">☕</span>
                Enter the Café
              </a>
              <a href="#smarter-way" className="btn btn-ghost" id="hero-how">
                How It Works
                <span className="btn-arrow">→</span>
              </a>
            </div>
            <p className="hero-note">
              No experience needed &nbsp;·&nbsp; Free to start
            </p>
          </div>
        </section>

        {/* SMARTER WAY SECTION — unchanged */}
        <section className="phases-section" id="about">
          <div className="phases-bg-glow" aria-hidden="true"></div>
          <div className="phases-noise" aria-hidden="true"></div>
          <div className="phases-grid-bg" aria-hidden="true"></div>
          <div className="phases-container">
            <header className="phases-header">
              <h2 className="phases-title">A Smarter Way to Begin</h2>
              <p className="phases-subtext">Before you commit months to a path, experience what it actually feels like.</p>
              <div className="phases-header-divider"></div>
              <a href="#phase-02" className="phases-skip-link">
                Already confident? Skip to the starter experience <span className="skip-arrow">→</span>
              </a>
            </header>
            <div className="phases-layout">
              <aside className="phases-spine-col" aria-hidden="true">
                <div className="spine-line"></div>
                <div className="spine-nodes">
                  <div className="spine-node active" data-phase="1">01</div>
                  <div className="spine-node" data-phase="2">02</div>
                  <div className="spine-node" data-phase="3">03</div>
                  <div className="spine-node" data-phase="4">04</div>
                </div>
              </aside>
              <div className="phases-content-col">
                <div className="phase-block" id="phase-01">
                  <div className="phase-bg-num">01</div>
                  <div className="phase-inner">
                    <span className="phase-tag">No popularity bias</span>
                    <h3 className="phase-title">Discover Your Inclination</h3>
                    <p className="phase-desc">Answer 8–10 focused questions. Rule-based scoring suggests two tracks aligned with how you think.</p>
                    <ul className="phase-bullets">
                      <li><span className="bullet-dot"></span> How you approach problems</li>
                      <li><span className="bullet-dot"></span> What energizes you</li>
                      <li><span className="bullet-dot"></span> How you handle ambiguity</li>
                    </ul>
                  </div>
                </div>
                <div className="phase-block" id="phase-02">
                  <div className="phase-bg-num">02</div>
                  <div className="phase-inner">
                    <span className="phase-tag">Reality check included</span>
                    <h3 className="phase-title">Try Before You Commit</h3>
                    <p className="phase-desc">Complete one real micro-task and read three honest senior insights.</p>
                    <ul className="phase-bullets">
                      <li><span className="bullet-dot"></span> Real beginner exercise</li>
                      <li><span className="bullet-dot"></span> Honest reflections</li>
                      <li><span className="bullet-dot"></span> No curated success stories</li>
                    </ul>
                  </div>
                </div>
                <div className="phase-block" id="phase-03">
                  <div className="phase-bg-num">03</div>
                  <div className="phase-inner">
                    <span className="phase-tag">Safe experimentation</span>
                    <h3 className="phase-title">Experience Beginner Friction</h3>
                    <p className="phase-desc">Interact with realistic beginner struggles in a safe environment.</p>
                    <ul className="phase-bullets">
                      <li><span className="bullet-dot"></span> Static real-world scenarios</li>
                      <li><span className="bullet-dot"></span> Multiple-choice reactions</li>
                      <li><span className="bullet-dot"></span> Immediate reflection text</li>
                    </ul>
                  </div>
                </div>
                <div className="phase-block" id="phase-04">
                  <div className="phase-bg-num">04</div>
                  <div className="phase-inner">
                    <span className="phase-tag">No pressure. No guilt.</span>
                    <h3 className="phase-title">Reflect Before You Decide</h3>
                    <p className="phase-desc">Choose how the experience felt and understand what that means.</p>
                    <ul className="phase-bullets">
                      <li><span className="bullet-dot"></span> Liked it</li>
                      <li><span className="bullet-dot"></span> Hard but interesting</li>
                      <li><span className="bullet-dot"></span> Not for me</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SYSTEM SECTION — unchanged */}
        <section className="system-section" id="system">
          <div className="system-lights" aria-hidden="true">
            <div className="light-orb orb-green-1"></div>
            <div className="light-orb orb-green-2"></div>
            <div className="light-orb orb-orange-1"></div>
            <div className="light-orb orb-orange-2"></div>
          </div>
          <div className="system-warm-echo" aria-hidden="true"></div>
          <div className="system-grid-bg" aria-hidden="true"></div>
          <div className="system-ambient-glow" aria-hidden="true"></div>
          <div className="system-content">
            <div className="heading-glow" aria-hidden="true"></div>
            <div className="terminal-line" aria-hidden="true"></div>
            <p className="system-label" id="system-label">
              <span className="system-caret" aria-hidden="true">&gt;</span> choose your path
            </p>
            <h2 className="system-headline" id="system-title">Not sure where to begin?</h2>
            <p className="system-subtext" id="system-sub">
              You don't need to commit yet. Start by understanding what fits you.
            </p>
            <div className="terminal-strip">
              <div className="strip-msg">
                &gt; analyzing preferences... &nbsp;&nbsp; &gt; generating potential paths... &nbsp;&nbsp; &gt; system ready &nbsp;&nbsp; &gt; optimization complete... &nbsp;&nbsp; &gt; analyzing preferences... &nbsp;&nbsp; &gt; generating potential paths... &nbsp;&nbsp; &gt; system ready &nbsp;&nbsp; &gt; optimization complete...
              </div>
            </div>
            <div className="system-toggle-root">
              <div className="system-toggle" id="mode-selector">
                <input type="radio" name="system-mode" id="mode-analytical" value="analytical" />
                <label htmlFor="mode-analytical">Analytical</label>
                <input type="radio" name="system-mode" id="mode-balanced" value="balanced" defaultChecked />
                <label htmlFor="mode-balanced">Balanced</label>
                <input type="radio" name="system-mode" id="mode-creative" value="creative" />
                <label htmlFor="mode-creative">Creative</label>
                <div className="toggle-track" aria-hidden="true"></div>
              </div>
            </div>
            <div className="system-grid" id="system-grid">
              <div className="system-card" id="card-structured">
                <div className="card-glow" aria-hidden="true"></div>
                <div className="system-icon">⚙️</div>
                <h3>Structured Thinker</h3>
                <p>You enjoy systems, control, and understanding how things work from the ground up. Perfect for those who love logic and deep control.</p>
                <div className="system-suggestion">&gt; Suggested: C++ for Systems · Cybersecurity</div>
              </div>
              <div className="system-card" id="card-logical">
                <div className="card-glow" aria-hidden="true"></div>
                <div className="system-icon">🧩</div>
                <h3>Logical Builder</h3>
                <p>You value clarity, problem-solving, and efficiency. You like analyzing data and building intelligent solutions.</p>
                <div className="system-suggestion">&gt; Suggested: Python · Data Analysis · Machine Learning</div>
              </div>
              <div className="system-card" id="card-interactive">
                <div className="card-glow" aria-hidden="true"></div>
                <div className="system-icon">🎨</div>
                <h3>Interactive Creator</h3>
                <p>You thrive on creativity and visual feedback. You want to build experiences that people can see, touch, and interact with instantly.</p>
                <div className="system-suggestion">&gt; Suggested: HTML & CSS · JavaScript · React · React Native</div>
              </div>
            </div>
            <div className="system-progression" id="system-progression">
              <div className="prog-step" data-step="discover">Discover</div>
              <div className="prog-line"></div>
              <div className="prog-step" data-step="learn">Learn</div>
              <div className="prog-line"></div>
              <div className="prog-step" data-step="build">Build</div>
              <div className="prog-line"></div>
              <div className="prog-step" data-step="deploy">Deploy</div>
            </div>
          </div>
        </section>

        {/* SIMULATOR SECTION — unchanged */}
        <section className="simulator-section" id="simulator">
          <div className="simulator-container">
            <header className="simulator-header">
              <h2 className="simulator-title">Try the Reality Simulator</h2>
              <p className="simulator-subtext">See how you respond when things don't go perfectly.</p>
            </header>
            <div className="simulator-card">
              <div className="simulator-scenario">
                <p>"You're following a tutorial, but your output doesn't match the result shown."</p>
              </div>
              <div className="simulator-options">
                <button className="sim-btn" data-response="Beginners who debug step-by-step often feel slower at first — but gain deep confidence over time.">Try debugging step-by-step</button>
                <button className="sim-btn" data-response="The ability to find answers independently is one of the most valuable skills in modern engineering.">Search online for the issue</button>
                <button className="sim-btn" data-response="Momentum is crucial, but remember that unresolved gaps can sometimes create frustration later.">Skip this part for now</button>
                <button className="sim-btn" data-response="Recognizing when your brain needs rest is a sign of high-level professional maturity.">Stop for the day</button>
              </div>
              <div className="simulator-response" id="sim-response" ref={simResponseRef}>
                <p className="response-text"></p>
              </div>
            </div>
            <footer className="simulator-footer">
              <p>No scoring. No pressure. Just awareness.</p>
              <div className="simulator-cta">
                Join the Club — <a href="/login" className="quiz-link" onClick={goSignup}>Take the Quiz</a>
              </div>
            </footer>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            CAREER GUIDANCE BOT SECTION — REALIGNED
            ───────────────────────────────────────────── */}
        <section className="careerbot-section" id="career-bot">
          <div className="careerbot-bg-glow" aria-hidden="true"></div>
          <div className="careerbot-noise" aria-hidden="true"></div>
          <div className="careerbot-container">

            {/* Centered header — matches the headers of phases / system / simulator */}
            <header className="careerbot-header">
              <p className="careerbot-tagline">
                <span className="label-prompt">&gt;</span> Stop guessing. Start building a career.
              </p>
              <h2 className="careerbot-title">Your personal career guide.</h2>
              <p className="careerbot-subtext">
                Honest, grounded answers about tech careers — no buzzwords, no pressure.
                Built for people who would rather know now than waste a year.
              </p>
            </header>

            {/* Two-column body */}
            <div className="careerbot-layout">
              {/* Left: features + CTA */}
              <div className="careerbot-info">
                <div className="careerbot-features">
                  <div className="cb-feature">
                    <span className="cb-feature-icon"><Compass size={18} strokeWidth={1.75} /></span>
                    <div>
                      <h4>Ask anything</h4>
                      <p>Career paths, salaries, which language to learn first — it's all fair game.</p>
                    </div>
                  </div>
                  <div className="cb-feature">
                    <span className="cb-feature-icon"><Target size={18} strokeWidth={1.75} /></span>
                    <div>
                      <h4>Grounded answers</h4>
                      <p>Real timelines, real salary ranges, advice rooted in industry data — not hype.</p>
                    </div>
                  </div>
                  <div className="cb-feature">
                    <span className="cb-feature-icon"><ShieldCheck size={18} strokeWidth={1.75} /></span>
                    <div>
                      <h4>Stays on topic</h4>
                      <p>Focused entirely on tech. It will not wander off into unrelated territory.</p>
                    </div>
                  </div>
                </div>

                <div className="careerbot-actions">
                  <a href="/login" className="btn btn-primary" onClick={goSignup}>
                    <Sparkles size={14} />
                    Talk to the Guide
                  </a>
                  <a href="#smarter-way" className="btn btn-ghost">
                    See how it works
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Right: Mock chat */}
              <div className="careerbot-preview">
                <div className="cb-chat-window">
                  <div className="cb-chat-header">
                    <div className="cb-chat-dot red"></div>
                    <div className="cb-chat-dot yellow"></div>
                    <div className="cb-chat-dot green"></div>
                    <span className="cb-chat-title">&gt; career.guide</span>
                  </div>
                  <div className="cb-chat-body">
                    <div className="cb-msg user">
                      <span className="cb-msg-label">You</span>
                      <p>Which career fits someone who likes design and logic?</p>
                    </div>
                    <div className="cb-msg bot">
                      <span className="cb-msg-label">&gt; career.guide</span>
                      <p>If you enjoy both design and logic, <strong>frontend development</strong> is a natural fit. You'd use HTML/CSS for visuals and JavaScript/React for behaviour. Many frontend engineers earn ₹8–25 LPA in India within 2–3 years.</p>
                    </div>
                    <div className="cb-msg user">
                      <span className="cb-msg-label">You</span>
                      <p>How long to become job-ready?</p>
                    </div>
                    <div className="cb-msg bot">
                      <span className="cb-msg-label">&gt; career.guide</span>
                      <p>With consistent practice (2–3 hrs/day), most people are job-ready in <strong>4–6 months</strong>. The key is shipping real projects — not just tutorials.</p>
                    </div>
                  </div>
                  <div className="cb-chat-input-mock">
                    <span>Ask about your career path...</span>
                    <span className="cb-send-icon">↑</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SENIOR REALITY PANEL — unchanged */}
        <section className="senior-panel-section" id="seniors">
          <div className="senior-bg-glow" aria-hidden="true"></div>
          <div className="senior-noise" aria-hidden="true"></div>
          <div className="senior-vignette" aria-hidden="true"></div>
          <div className="senior-container">
            <div className="senior-header">
              <p className="senior-micro-label">
                <span className="label-prompt">&gt;</span> from those ahead of you
              </p>
              <h2 className="senior-title">What seniors wish they knew earlier.</h2>
              <p className="senior-subtext">Advice from people who started exactly where you are.</p>
            </div>
            <div className="senior-cards">
              <div className="senior-card">
                <div className="senior-card-header">
                  <span className="senior-name">Arjun Mehta</span>
                  <span className="senior-role">Senior Frontend Engineer · 6 years</span>
                </div>
                <div className="senior-card-divider"></div>
                <p className="senior-quote">"I almost quit in my first month because nothing worked like tutorials showed. Debugging confusion is the first real skill you learn."</p>
              </div>
              <div className="senior-card">
                <div className="senior-card-header">
                  <span className="senior-name">Maya Thompson</span>
                  <span className="senior-role">Backend Engineer · 8 years</span>
                </div>
                <div className="senior-card-divider"></div>
                <p className="senior-quote">"The early frustration isn't a signal to stop. It's proof your brain is adapting. The people who succeed just stayed curious longer."</p>
              </div>
              <div className="senior-card">
                <div className="senior-card-header">
                  <span className="senior-name">Daniel Okafor</span>
                  <span className="senior-role">Product Engineer · 5 years</span>
                </div>
                <div className="senior-card-divider"></div>
                <p className="senior-quote">"I didn't feel confident for two years. Even now I Google daily. Confidence comes from surviving confusion — not avoiding it."</p>
              </div>
            </div>
            <div className="senior-cta-block">
              <h3 className="cta-title">If you're still here, that says something.</h3>
              <p className="cta-subtitle">You don't need certainty. You need direction.</p>
              <div className="cta-buttons">
                <a href="/login" className="btn btn-primary" onClick={goSignup}>Start your path</a>
                <a href="#simulator" className="btn btn-ghost">Explore again</a>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            FAQ & CONTACT SECTION
            ───────────────────────────────────────────── */}
        <section className="faq-contact-section" id="contact">
          <div className="faq-contact-bg-glow" aria-hidden="true"></div>
          <div className="faq-contact-noise" aria-hidden="true"></div>
          <div className="faq-contact-container">

            <header className="faq-contact-header">
              <p className="faq-contact-tagline">
                <span className="label-prompt">&gt;</span> got questions?
              </p>
              <h2 className="faq-contact-title">FAQ & Get in Touch</h2>
              <p className="faq-contact-subtext">
                Quick answers below — or drop us a message and we'll get back to you.
              </p>
            </header>

            <div className="faq-contact-layout">
              {/* LEFT: FAQ Accordion */}
              <div className="faq-column">
                <h3 className="faq-column-title"><Mail size={16} /> Frequently Asked</h3>
                {[
                  {
                    q: 'Is Fitry really free?',
                    a: 'Yes! Fitry is completely free to start. All discovery phases, the career guide bot, and beginner courses are available at no cost. We believe everyone deserves a clear starting point.'
                  },
                  {
                    q: 'Do I need any coding experience?',
                    a: 'Not at all. Fitry is designed for absolute beginners. Our discovery system helps you find the right path before you write a single line of code.'
                  },
                  {
                    q: 'What courses are available?',
                    a: 'We currently offer HTML & CSS Fundamentals, JavaScript Basics, and Python Crash Course — with more paths like React, Cybersecurity, and Data Science coming soon.'
                  },
                  {
                    q: 'How does the Career Guide Bot work?',
                    a: 'It\'s an AI-powered advisor focused exclusively on tech careers. Ask about salaries, learning timelines, which language to learn first, or domain comparisons — and get honest, grounded answers.'
                  },
                  {
                    q: 'Can I switch my learning path later?',
                    a: 'Absolutely. Fitry is built around exploration. You can retake the discovery quiz, try different tracks, and switch anytime — there\'s no lock-in.'
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`faq-item${openFaq === i ? ' is-open' : ''}`}
                    onClick={() => toggleFaq(i)}
                  >
                    <div className="faq-question">
                      <span>{item.q}</span>
                      <ChevronDown size={16} className="faq-chevron" />
                    </div>
                    <div className="faq-answer">
                      <p>{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT: Contact Form */}
              <div className="contact-column">
                <h3 className="contact-column-title"><Send size={16} /> Send Us a Message</h3>

                {contactStatus === 'sent' ? (
                  <div className="contact-success">
                    <CheckCircle size={40} />
                    <h4>Message Sent!</h4>
                    <p>Thanks for reaching out. We'll get back to you soon.</p>
                    <button
                      className="btn btn-ghost contact-reset-btn"
                      onClick={() => setContactStatus('idle')}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleContactSubmit}>
                    <div className="contact-field">
                      <label htmlFor="contact-name">Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        required
                      />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="contact-email">Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        required
                      />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows="4"
                        placeholder="Your question or feedback…"
                        value={contactForm.message}
                        onChange={handleContactChange}
                        required
                      />
                    </div>

                    {contactStatus === 'error' && (
                      <p className="contact-error-msg">{contactError}</p>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary contact-submit-btn"
                      disabled={contactStatus === 'sending'}
                    >
                      {contactStatus === 'sending' ? (
                        <><span className="contact-spinner"></span> Sending…</>
                      ) : (
                        <><Send size={14} /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="site-footer">
          <div className="footer-vignette" aria-hidden="true"></div>
          <div className="footer-scanlines" aria-hidden="true"></div>
          <div className="footer-container">

            <div className="footer-bottom">
              <p className="footer-human-note">"Learning is messy. That's normal."</p>
              <div className="footer-legal">
                <a href="#privacy">Privacy</a>
                <a href="#terms">Terms</a>
                <span className="footer-copyright">&copy; 2026 Fitry</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
