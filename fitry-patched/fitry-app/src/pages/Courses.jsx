import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, BookOpen, Star, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import { allCourses } from '../data/courses';
import './Courses.css';

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDiff, setActiveDiff] = useState('All');

  const filtered = allCourses.filter(c => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      c.title.toLowerCase().includes(q) ||
      c.why.toLowerCase().includes(q) ||
      c.domain.toLowerCase().includes(q) ||
      (c.lang && c.lang.toLowerCase().includes(q));

    const matchesDiff = activeDiff === 'All' || c.difficulty === activeDiff;

    return matchesSearch && matchesDiff;
  });

  return (
    <div className="courses-page">
      <Navbar />
      <div className="courses-bg-glow" />

      <div className="courses-content">
        <div className="courses-header fade-up">
          <p className="prompt-label" style={{ marginBottom: 12 }}>courses.explore</p>
          <h1 className="courses-title">Every path starts here.</h1>
          <p className="courses-sub">Browse all courses. Each one is built for beginners and explains exactly why it matters.</p>
        </div>

        {/* Search Bar + 3 Difficulty buttons */}
        <div className="courses-filters-row fade-up-1">
          <div className="search-wrapper">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search courses by title, keywords, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="diff-filters">
            {['Beginner', 'Intermediate', 'Advanced'].map(d => (
              <button
                key={d}
                className={`filter-btn ${activeDiff === d ? 'active' : ''}`}
                onClick={() => setActiveDiff(activeDiff === d ? 'All' : d)}
                data-diff={d}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="courses-grid fade-up-2">
          {filtered.map(course => (
            <Link to={`/course/${course.id}`} key={course.id} className="course-card" style={{ '--c': course.color }}>
              <div className="cc-top">
                <div className="cc-tags">
                  <span className="cc-domain">{course.domain}</span>
                  <span className="cc-diff" data-diff={course.difficulty}>{course.difficulty}</span>
                </div>
                <div className="cc-lang">{course.lang}</div>
              </div>

              <h3 className="cc-title">{course.title}</h3>
              <p className="cc-why">{course.why}</p>

              <div className="cc-meta">
                <span><Clock size={12} /> {course.time}</span>
                <span><BookOpen size={12} /> {course.lessons} lessons</span>
              </div>

              <div className="cc-footer">
                <span className="cc-start">Start Course <ChevronRight size={13} /></span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="no-results fade-up">
            <p className="prompt-label">results.empty</p>
            <p>No courses match that filter. Try a different combination.</p>
          </div>
        )}
      </div>
    </div>
  );
}
