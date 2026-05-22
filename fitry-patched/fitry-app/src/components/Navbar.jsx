import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, User, Bot, LogOut, Library, Briefcase } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const navigate  = useNavigate();

  const links = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
    { to: '/courses',   icon: BookOpen,         label: 'Courses' },
    { to: '/career-bot',icon: Bot,              label: 'Career Guide' },
    { to: '/job-finder',icon: Briefcase,        label: 'Job Finder' },
    { to: '/resources', icon: Library,          label: 'Resources' },
    { to: '/profile',   icon: User,             label: 'Profile' },
  ];

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      await signOut(auth);
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-logo">
        <span className="logo-bracket">&gt;</span> Fitry
      </Link>
      <div className="navbar-links">
        {links.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`navbar-link ${location.pathname === to ? 'active' : ''}`}
          >
            <Icon size={15} />{label}
          </Link>
        ))}
      </div>
      <button className="navbar-logout" onClick={handleLogout}>
        <LogOut size={14} /> Logout
      </button>
    </nav>
  );
}
