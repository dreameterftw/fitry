import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import BackgroundIcons from './components/BackgroundIcons';
import Landing    from './pages/Landing';
import Login      from './pages/Login';
import Quiz       from './pages/Quiz';
import Dashboard  from './pages/Dashboard';
import Courses    from './pages/Courses';
import CourseView from './pages/CourseView';
import CareerBot  from './pages/CareerBot';
import JobFinder  from './pages/JobFinder';
import Insights   from './pages/Insights';
import Profile    from './pages/Profile';
import Resources  from './pages/Resources';


function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="app-loading">&gt; loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { user, profile, loading } = useAuth();
  if (loading) return <div className="app-loading">&gt; loading...</div>;
  if (user) return <Navigate to={profile?.quizDone ? '/dashboard' : '/quiz'} replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Site-wide decorative coding-icon background.
          Mounted once so every page picks it up (landing, quiz,
          dashboard, courses, course view, etc.). pointer-events:none. */}
      <BackgroundIcons />

      <Routes>
        {/* Landing — always public */}
        <Route path="/"       element={<Landing />} />

        {/* Auth — redirect away if already logged in */}
        <Route path="/login"  element={<PublicRoute><Login /></PublicRoute>} />

        {/* Protected app */}
        <Route path="/quiz"        element={<PrivateRoute><Quiz /></PrivateRoute>} />
        <Route path="/dashboard"   element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/courses"     element={<PrivateRoute><Courses /></PrivateRoute>} />
        <Route path="/course/:id"  element={<PrivateRoute><CourseView /></PrivateRoute>} />
        <Route path="/career-bot"  element={<PrivateRoute><CareerBot /></PrivateRoute>} />
        <Route path="/job-finder"  element={<PrivateRoute><JobFinder /></PrivateRoute>} />
        <Route path="/insights"    element={<PrivateRoute><Insights /></PrivateRoute>} />
        <Route path="/profile"     element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/resources"   element={<PrivateRoute><Resources /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
