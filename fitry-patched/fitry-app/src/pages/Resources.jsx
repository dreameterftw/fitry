import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Library, Sparkles, Filter, Info } from 'lucide-react';
import { getAuth } from 'firebase/auth';
import Navbar from '../components/Navbar';
import { useUser } from '../hooks/useUser';
import { useAllProgress } from '../hooks/useProgress';
import courseData, { allCourses } from '../data/courses';
import staticResources from '../data/resources';
import './Resources.css';

/**
 * Extracts resources directly from courseData (docs and YouTube links)
 */
export function extractResources() {
  const extracted = [];

  Object.entries(courseData || {}).forEach(([courseIdStr, course]) => {
    const courseId = Number(courseIdStr);
    const courseTitle = course.title || '';
    const domain = course.domain || '';

    // 1. Extract docs
    if (course.docs?.url) {
      extracted.push({
        id: `extracted-docs-${courseId}`.toLowerCase(),
        title: course.docs.label || `${courseTitle} Docs`,
        type: 'Docs',
        url: course.docs.url,
        description: `Official documentation and reference guide for ${courseTitle}.`,
        lessonIds: ['beginner_0'],
        courseIds: [courseId],
        courseTitle,
        domain
      });
    }

    // 2. Extract youtube main
    if (course.youtube?.main?.url) {
      extracted.push({
        id: `extracted-yt-main-${courseId}`.toLowerCase(),
        title: course.youtube.main.title || `${courseTitle} Full Course`,
        type: 'Video',
        url: course.youtube.main.url,
        description: `Comprehensive video tutorial by ${course.youtube.main.channel || 'expert instructors'}.`,
        lessonIds: ['beginner_0'],
        courseIds: [courseId],
        courseTitle,
        domain
      });
    }

    // 3. Extract youtube extras
    if (course.youtube?.extras && Array.isArray(course.youtube.extras)) {
      course.youtube.extras.forEach((extra, idx) => {
        if (extra.url) {
          extracted.push({
            id: `extracted-yt-extra-${courseId}-${idx}`.toLowerCase(),
            title: extra.title || `${courseTitle} Extra Tutorial`,
            type: 'Video',
            url: extra.url,
            description: `Supplementary video tutorial by ${extra.channel || 'expert instructors'}.`,
            lessonIds: ['beginner_0'],
            courseIds: [courseId],
            courseTitle,
            domain
          });
        }
      });
    }
  });

  // Merge both extracted resources and static resources, deduplicated by URL
  const allMerged = [...extracted, ...staticResources];
  const seenUrls = new Set();
  const deduped = [];
  
  allMerged.forEach(item => {
    if (item.url && !seenUrls.has(item.url)) {
      seenUrls.add(item.url);
      deduped.push(item);
    }
  });

  return deduped;
}

// Find user's most recently completed lesson from profile.courseProgress
function findRecentCompletedLesson(user) {
  if (!user || !user.courseProgress) return null;

  const completed = [];

  Object.entries(user.courseProgress).forEach(([courseId, cp]) => {
    if (!cp.levels) return;
    Object.entries(cp.levels).forEach(([levelId, lvl]) => {
      if (!lvl.lessons) return;
      Object.entries(lvl.lessons).forEach(([lessonId, les]) => {
        if (les && les.theory && les.mcq && les.challenge) {
          completed.push({
            courseId: Number(courseId),
            levelId,
            lessonId,
            completedAt: les.completedAt || null,
            score: les.score || 0
          });
        }
      });
    });
  });

  if (completed.length === 0) return null;

  // Sort descending: highest completedAt first, then highest courseId & lessonId
  completed.sort((a, b) => {
    if (a.completedAt && b.completedAt) {
      return b.completedAt - a.completedAt;
    }
    if (a.courseId !== b.courseId) {
      return b.courseId - a.courseId;
    }
    return b.lessonId.localeCompare(a.lessonId);
  });

  return completed[0];
}

// Find lesson details by IDs
function getLessonDetails(courseId, levelId, lessonId) {
  const course = courseData[courseId];
  if (!course) return null;
  const level = (course.levels || []).find(l => l.id === levelId);
  if (!level) return null;
  const lesson = (level.lessons || []).find(ls => ls.id === lessonId);
  if (!lesson) return null;
  return {
    courseTitle: course.title,
    lessonTitle: lesson.title
  };
}

export default function Resources() {
  const { user: userProfile, loading: loadingUser } = useUser();
  const { allProgress } = useAllProgress();

  const [allResources] = useState(() => extractResources());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [activeTab, setActiveTab] = useState('All');

  // AI curation / Recommendations states
  const [recentLesson, setRecentLesson] = useState(null);
  const [recommendedResources, setRecommendedResources] = useState([]);
  const [aiPicks, setAiPicks] = useState([]);
  const [loadingAi, setLoadingAi] = useState(false);

  // Deriving the user's completed lesson and recommending related resources
  useEffect(() => {
    if (loadingUser || !userProfile) return;

    const completed = findRecentCompletedLesson(userProfile);
    setRecentLesson(completed);

    if (completed) {
      // Find static resources matching this lessonId
      const staticMatches = allResources.filter(res =>
        res.lessonIds && res.lessonIds.includes(completed.lessonId) && res.courseIds.includes(completed.courseId)
      );
      setRecommendedResources(staticMatches.slice(0, 3));

      // If matches < 2, call AI model for recommendation
      if (staticMatches.length < 2) {
        setLoadingAi(true);
        const details = getLessonDetails(completed.courseId, completed.levelId, completed.lessonId);
        const topic = details ? `"${details.lessonTitle}" in ${details.courseTitle}` : `Lesson ID ${completed.lessonId}`;

        const fetchAiPicks = async () => {
          try {
            const workerUrl = import.meta.env.VITE_WORKER_URL || 'https://fitry-proxy.dr3amtoosadr07.workers.dev';
            const uid = getAuth().currentUser?.uid || 'anonymous';

            const systemPrompt = `You are a helpful learning assistant for Fitry. Given the title/topic of a completed lesson, suggest 1 or 2 high-quality external resources (like specific YouTube videos, MDN/official docs, or tutorials).
The output MUST be a single JSON array of objects representing these resources, with NO other text or markdown blocks, like:
[
  {
    "id": "ai-res-1",
    "title": "Specific resource title",
    "type": "Video" | "Docs" | "Article" | "Tool",
    "url": "https://...",
    "description": "Short one-sentence description of the resource.",
    "isAiPick": true
  }
]
Use real, high-quality URLs (e.g. YouTube, MDN, Dev.to, freeCodeCamp, etc.) related specifically to the lesson topic. The types can be "Video", "Docs", "Article", or "Tool".`;

            const res = await fetch(`${workerUrl}/api/groq`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-User-Id': uid
              },
              body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                  { role: 'system', content: systemPrompt },
                  { role: 'user', content: `Suggest 1 or 2 resources for someone who just completed the lesson: ${topic}` }
                ],
                max_tokens: 600,
                temperature: 0.7,
              }),
            });

            if (res.ok) {
              const data = await res.json();
              const content = data.choices?.[0]?.message?.content ?? '';
              const clean = content.replace(/```json|```/g, '').trim();
              const parsed = JSON.parse(clean);
              if (Array.isArray(parsed)) {
                setAiPicks(parsed.map((item, idx) => ({
                  ...item,
                  id: item.id || `ai-rec-${idx}`,
                  isAiPick: true,
                  courseIds: [completed.courseId],
                  courseTitle: details?.courseTitle || '',
                  domain: allCourses.find(c => c.id === completed.courseId)?.domain || ''
                })));
              }
            }
          } catch (err) {
            console.error('Failed to load AI recommendations silently:', err);
          } finally {
            setLoadingAi(false);
          }
        };

        fetchAiPicks();
      } else {
        setAiPicks([]);
      }
    }
  }, [userProfile, loadingUser, allResources]);

  // Handle filtering
  const filteredResources = allResources.filter(res => {
    // 1. Filter by Course Selection
    if (selectedCourse !== 'all') {
      if (!res.courseIds || !res.courseIds.includes(Number(selectedCourse))) return false;
    }

    // 2. Filter by Resource Type Tab
    if (activeTab !== 'All') {
      if (res.type !== activeTab) return false;
    }

    // 3. Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = res.title && res.title.toLowerCase().includes(q);
      const descMatch = res.description && res.description.toLowerCase().includes(q);
      if (!titleMatch && !descMatch) return false;
    }

    return true;
  });

  const getBadgeClass = (type) => {
    switch (type) {
      case 'Video': return 'badge-video';
      case 'Docs': return 'badge-docs';
      case 'Article': return 'badge-article';
      case 'Tool': return 'badge-tool';
      default: return 'badge-default';
    }
  };

  const getCourseTitle = (courseIds) => {
    if (!courseIds || courseIds.length === 0) return '';
    const match = allCourses.find(c => c.id === courseIds[0]);
    return match ? match.title : '';
  };

  // Combine static and AI recommendations for the "Based on what you just learned" section
  const combinedRecommendations = [...recommendedResources, ...aiPicks];
  const lessonDetails = recentLesson ? getLessonDetails(recentLesson.courseId, recentLesson.levelId, recentLesson.lessonId) : null;

  return (
    <div className="resources-page">
      <Navbar />
      <div className="resources-bg-glow" />

      <div className="resources-content">
        {/* Header Section */}
        <div className="resources-header fade-up">
          <p className="prompt-label" style={{ marginBottom: 10 }}>library.index</p>
          <h1 className="resources-title">
            Dev <span className="green-text">Resources.</span>
          </h1>
          <p className="resources-sub">
            Handpicked videos, documentations, articles, and tools to supercharge your tech learning journey.
          </p>
        </div>

        {/* Based on What You Just Learned (Recommendations Section) */}
        {recentLesson && combinedRecommendations.length > 0 && (
          <div className="rec-section fade-up-1">
            <div className="rec-section-header">
              <Sparkles size={16} className="sparkle-icon" />
              <h3>Based on what you just learned</h3>
              {lessonDetails && (
                <span className="lesson-badge">
                  {lessonDetails.lessonTitle}
                </span>
              )}
            </div>

            <div className="rec-grid">
              {combinedRecommendations.map(res => (
                <div key={res.id} className="rec-card">
                  <div className="card-top">
                    <span className={`type-badge ${getBadgeClass(res.type)}`}>
                      {res.type}
                    </span>
                    {res.isAiPick && (
                      <span className="ai-pick-badge">
                        <Sparkles size={10} style={{ marginRight: 3 }} /> AI Pick
                      </span>
                    )}
                  </div>
                  <h4 className="rec-card-title">{res.title}</h4>
                  <p className="rec-card-desc">{res.description}</p>
                  <div className="rec-card-footer">
                    <span className="rec-card-course">
                      {res.courseTitle || getCourseTitle(res.courseIds)}
                    </span>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rec-link-btn"
                    >
                      Open <ExternalLink size={12} style={{ marginLeft: 4 }} />
                    </a>
                  </div>
                </div>
              ))}
              {loadingAi && (
                <div className="rec-card rec-loading-card">
                  <div className="spinner" />
                  <p>Curating personalized AI recommendations...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Filter Bar Controls */}
        <div className="controls-bar fade-up-2">
          {/* Search bar */}
          <div className="search-wrapper">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search resources by title or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Dropdown for Course select */}
          <div className="dropdown-wrapper">
            <Filter className="filter-icon" size={14} />
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="course-select"
            >
              <option value="all">All Courses</option>
              {allCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Resource Type Tabs */}
        <div className="tabs-container fade-up-2">
          {['All', 'Video', 'Docs', 'Article', 'Tool'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="resources-grid fade-up-3">
          {filteredResources.map(res => (
            <div key={res.id} className="resource-card-item">
              <div className="card-item-top">
                <span className={`type-badge-item ${getBadgeClass(res.type)}`}>
                  {res.type}
                </span>
                <span className="course-badge-item">
                  {res.courseTitle || getCourseTitle(res.courseIds)}
                </span>
              </div>
              <h3 className="card-item-title">{res.title}</h3>
              <p className="card-item-desc">{res.description}</p>
              <div className="card-item-footer">
                <span className="domain-text">{res.domain}</span>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-item-btn"
                >
                  Visit <ExternalLink size={13} style={{ marginLeft: 4 }} />
                </a>
              </div>
            </div>
          ))}

          {filteredResources.length === 0 && (
            <div className="no-resources-found">
              <Info size={28} className="info-icon" />
              <h3>No resources found matching filters</h3>
              <p>Try clearing your search query or selecting a different course/type.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
