import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { createUserProfile, getUserProfile } from '../lib/userStore';
import BackgroundIcons from '../components/BackgroundIcons';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Read ?mode=signup or ?mode=login from URL (set by landing page buttons)
  useEffect(() => {
    const m = searchParams.get('mode');
    if (m === 'signup' || m === 'login') setMode(m);
  }, [searchParams]);

  const handleSubmit = async () => {
    setError('');
    if (!email || !password) return setError('Please fill in all fields.');
    if (mode === 'signup' && !name.trim()) return setError('Please enter your name.');
    setLoading(true);

    try {
      if (mode === 'signup') {
        console.log('[Login] Signup started for', email);
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        console.log('[Login] Firebase user created:', cred.user);
        await updateProfile(cred.user, { displayName: name.trim() });
        console.log('[Login] User profile updated with displayName');
        await createUserProfile(cred.user.uid, { displayName: name.trim(), email, track: '' });
        console.log('[Login] Firestore user profile created');
        navigate('/quiz');
        console.log('[Login] Navigated to /quiz after signup');
      } else {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const profile = await getUserProfile(cred.user.uid);
        navigate(profile?.quizDone ? '/dashboard' : '/quiz');
      }
    } catch (err) {
      const msgs = {
        'auth/email-already-in-use': 'That email is already registered. Try logging in.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/wrong-password': 'Wrong password. Try again.',
        'auth/user-not-found': 'No account found with that email.',
        'auth/weak-password': 'Password must be at least 6 characters.',
        'auth/invalid-credential': 'Invalid email or password.',
      };
      console.error('[Login] Firebase Auth Error:', err);
      setError(msgs[err.code] || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      const profile = await getUserProfile(cred.user.uid);
      if (!profile) {
        await createUserProfile(cred.user.uid, {
          displayName: cred.user.displayName || 'User',
          email: cred.user.email,
          track: '',
        });
        navigate('/quiz');
      } else {
        navigate(profile.quizDone ? '/dashboard' : '/quiz');
      }
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      if (err.code === 'auth/popup-closed-by-user') return;
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <BackgroundIcons />
      <div className="login-bg-glow" />

      <div className="login-card fade-up">
        <Link to="/" className="login-back">&larr; Back to home</Link>

        <div className="login-logo">
          <span className="logo-bracket">&gt;</span> Fitry
        </div>
        <p className="login-tagline">Your tech career starts here.</p>

        <div className="login-tabs">
          <button className={`login-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setError(''); }}>Log In</button>
          <button className={`login-tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => { setMode('signup'); setError(''); }}>Sign Up</button>
        </div>

        <div className="login-fields">
          {mode === 'signup' && (
            <div className="field-group">
              <label className="field-label">Full Name</label>
              <input className="field-input" type="text" placeholder="Alex Johnson"
                value={name} onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()} autoFocus />
            </div>
          )}
          <div className="field-group">
            <label className="field-label">Email</label>
            <input className="field-input" type="email" placeholder="you@email.com"
              value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              autoFocus={mode === 'login'} />
          </div>
          <div className="field-group">
            <label className="field-label">Password</label>
            <input className="field-input" type="password"
              placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
              value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          </div>
        </div>

        {error && <p className="login-error">{error}</p>}

        <button className="btn btn-primary login-submit" onClick={handleSubmit} disabled={loading}>
          {loading
            ? (mode === 'login' ? 'Signing in...' : 'Creating account...')
            : (mode === 'login' ? 'Log In' : 'Create Account')}
        </button>

        <div className="login-divider">
          <span>or</span>
        </div>

        <button className="google-signin-btn" onClick={handleGoogleSignIn} disabled={loading}>
          <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <p className="login-switch">
          {mode === 'login'
            ? <>Don't have an account? <button onClick={() => { setMode('signup'); setError(''); }}>Sign up free</button></>
            : <>Already have an account? <button onClick={() => { setMode('login'); setError(''); }}>Log in</button></>}
        </p>
      </div>
    </div>
  );
}
