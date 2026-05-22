import { useState, useEffect } from 'react';
import { 
  Briefcase, 
  MapPin, 
  ExternalLink, 
  TrendingUp, 
  Sparkles, 
  Loader2, 
  AlertCircle,
  Search
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { assessJobReadiness } from '../lib/api';
import { useUser } from '../hooks/useUser';
import { useAllProgress } from '../hooks/useProgress';
import useJobs from '../hooks/useJobs';
import { ROLE_MAP, SALARY_INSIGHTS } from '../data/roleMap';
import './CareerBot.css';

function isComputerEngineeringRole(role) {
  const normalized = role.toLowerCase().trim();
  if (!normalized) return false;

  const COMP_ENG_KEYWORDS = [
    "software", "computer", "developer", "programmer", "dev", "coder", "coding", "sysadmin", "devops", "sre", 
    "hardware", "embedded", "firmware", "microcontroller", "vlsi", "asic", "fpga", "chip", "semiconductor", 
    "circuit", "robotics", "iot", "systems", "network", "networking", "frontend", "backend", "fullstack", 
    "full-stack", "web", "app", "application", "mobile", "ios", "android", "ui", "ux", "cloud", "saas", 
    "data", "database", "sql", "nosql", "artificial", "intelligence", "ai", "ml", "machine", "learning", 
    "deep", "nlp", "cyber", "cybersecurity", "security", "pentest", "penetration", "hacker", "hacking", 
    "forensics", "infosec", "javascript", "js", "typescript", "ts", "python", "django", "flask", "fastapi", 
    "react", "angular", "vue", "node", "nodejs", "java", "spring", "c++", "csharp", "c#", "rust", "golang", 
    "ruby", "rails", "php", "laravel", "swift", "kotlin", "flutter", "react-native", "aws", "azure", "gcp", 
    "docker", "kubernetes", "k8s", "linux", "unix", "tech", "technology", "it", "information", "architect",
    "qa", "quality", "test", "testing", "automation", "support", "infrastructure", "telecommunication", "system"
  ];

  const NON_COMP_ENG_KEYWORDS = [
    "mechanical", "civil", "chemical", "construction", "plumber", "doctor", "nurse", "hospital", "dentist", 
    "chef", "cooking", "restaurant", "lawyer", "legal", "real estate", "accountant", "finance", "audit", 
    "biomedical", "biological", "physics", "teacher", "professor", "physician", "surgeon", "pharmacist", 
    "therapist", "driver", "pilot", "dentistry", "veterinarian", "carpenter", "mason", "electrician"
  ];

  for (const block of NON_COMP_ENG_KEYWORDS) {
    if (normalized.includes(block)) return false;
  }

  for (const allow of COMP_ENG_KEYWORDS) {
    if (normalized.includes(allow)) return true;
  }

  return false;
}

export default function JobFinder() {
  const { user } = useUser();
  const { allProgress } = useAllProgress();

  // Job finder state
  const [selectedRole, setSelectedRole] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [searchTriggeredRole, setSearchTriggeredRole] = useState('');
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [assessments, setAssessments] = useState({}); // { [jobUrl]: { loading, result, error } }

  // Determine user track key and pre-fill pills
  const trackKey = user?.selectedTrack || "Web Development";
  let roleMapKey = "Web Development";
  if (trackKey.includes("Data")) roleMapKey = "Data Science";
  else if (trackKey.includes("Systems")) roleMapKey = "Systems";
  else if (trackKey.includes("Cyber") || trackKey.includes("Security")) roleMapKey = "Cybersecurity";
  else if (trackKey.includes("Mobile")) roleMapKey = "Mobile";
  else if (ROLE_MAP[trackKey]) roleMapKey = trackKey;

  const recommendedRoles = ROLE_MAP[roleMapKey] || ROLE_MAP["Web Development"];

  // Pre-select first pill when roles load
  useEffect(() => {
    if (recommendedRoles && recommendedRoles.length > 0 && !selectedRole && !customRole) {
      setSelectedRole(recommendedRoles[0]);
      setSearchTriggeredRole(recommendedRoles[0]);
      setSearchEnabled(true);
    }
  }, [recommendedRoles]);

  const handlePillClick = (role) => {
    setSelectedRole(role);
    setCustomRole('');
    setLocalError(null);
    setSearchTriggeredRole(role);
    setSearchEnabled(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = customRole.trim() || selectedRole;
    if (!query) return;

    if (!isComputerEngineeringRole(query)) {
      setLocalError("The Job Finder is strictly restricted to computer engineering, software, and technology roles. Please search for a technology-related role.");
      setSearchEnabled(false);
      return;
    }

    setLocalError(null);
    setSearchTriggeredRole(query);
    setSearchEnabled(true);
  };

  const handleAssessReadiness = async (job) => {
    const jobKey = job.url;
    setAssessments(prev => ({
      ...prev,
      [jobKey]: { loading: true, result: null, error: null }
    }));
    try {
      const completedCourses = allProgress?.filter(p => p.isComplete) || [];
      const responseText = await assessJobReadiness(
        job.title,
        `Company: ${job.company}, Location: ${job.location || 'Remote'}. Source: ${job.source}`,
        user?.selectedTrack || "Web Development",
        completedCourses
      );
      setAssessments(prev => ({
        ...prev,
        [jobKey]: { loading: false, result: responseText, error: null }
      }));
    } catch (err) {
      setAssessments(prev => ({
        ...prev,
        [jobKey]: { loading: false, result: null, error: err.message || 'Could not fetch assessment.' }
      }));
    }
  };

  // Call the job search hook
  const { jobs, loading: jobsLoading, error: jobsError, rateLimited } = useJobs(searchTriggeredRole, searchEnabled);

  // Salary insights resolver
  const getSalaryInsight = (roleName) => {
    if (!roleName) return null;
    const normalized = roleName.toLowerCase();
    
    // exact match
    for (const [key, value] of Object.entries(SALARY_INSIGHTS)) {
      if (key.toLowerCase() === normalized) return { role: key, ...value };
    }
    
    // substring match
    for (const [key, value] of Object.entries(SALARY_INSIGHTS)) {
      if (normalized.includes(key.toLowerCase()) || key.toLowerCase().includes(normalized)) {
        return { role: key, ...value };
      }
    }

    // general default
    return {
      role: roleName,
      entry: "₹4–8 LPA",
      mid: "₹8–18 LPA",
      senior: "₹18–35 LPA",
      cities: { Bangalore: "₹6–20 LPA", Mumbai: "₹5–18 LPA", Delhi: "₹5–16 LPA" }
    };
  };

  const salaryInsight = getSalaryInsight(selectedRole || customRole || searchTriggeredRole);

  return (
    <div className="career-page">
      <Navbar />
      <div className="career-bg-glow" />

      <div className="career-layout job-layout">
        {/* Left Filters/Insights panel */}
        <div className="career-info job-finder-info">
          <div className="job-finder-header">
            <p className="prompt-label" style={{ marginBottom: 10 }}>jobs.finder</p>
            <h2 className="job-finder-title">Find tech openings.</h2>
            <p className="career-desc">
              Search live remote and local opportunities in India. Powered by Adzuna & Remotive APIs.
            </p>
          </div>

          {/* Role selection pills */}
          <div className="job-pills-section">
            <p className="suggestions-title">Roles in your track ({trackKey}):</p>
            <div className="job-pills">
              {recommendedRoles.map((role) => (
                <button 
                  key={role} 
                  className={`job-pill ${selectedRole === role ? 'active' : ''}`}
                  onClick={() => handlePillClick(role)}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Custom search text input */}
          <form onSubmit={handleSearchSubmit} className="job-custom-search-form">
            <p className="suggestions-title">Or search custom role:</p>
            <div className="job-custom-input-wrapper">
              <input 
                type="text"
                placeholder="e.g. Django Developer, Python..."
                value={customRole}
                onChange={(e) => {
                  setCustomRole(e.target.value);
                  setSelectedRole('');
                }}
                className="job-custom-input"
              />
              <button type="submit" className="job-custom-search-btn" disabled={jobsLoading}>
                {jobsLoading ? <Loader2 size={16} className="spinner" /> : <Search size={16} />}
              </button>
            </div>
          </form>

          {/* Salary Insight Card */}
          {salaryInsight && (
            <div className="salary-insight-card">
              <div className="salary-card-header">
                <TrendingUp size={16} className="insight-icon" />
                <h4>Salary Insights: {salaryInsight.role}</h4>
              </div>
              <p className="salary-subtitle">Estimated market values in India:</p>
              <div className="salary-levels-grid">
                <div className="salary-level-item entry">
                  <span className="level-label">Entry Level</span>
                  <span className="level-val">{salaryInsight.entry}</span>
                </div>
                <div className="salary-level-item mid">
                  <span className="level-label">Mid Level</span>
                  <span className="level-val">{salaryInsight.mid}</span>
                </div>
                <div className="salary-level-item senior">
                  <span className="level-label">Senior</span>
                  <span className="level-val">{salaryInsight.senior}</span>
                </div>
              </div>
              {salaryInsight.cities && (
                <div className="salary-cities">
                  <p className="cities-title"><MapPin size={12} /> City Averages:</p>
                  <div className="cities-list">
                    {Object.entries(salaryInsight.cities).map(([city, val]) => (
                      <div key={city} className="city-item">
                        <span className="city-name">{city}:</span>
                        <span className="city-val">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Listings panel */}
        <div className="career-chat job-listings-panel">
          <div className="job-listings-header">
            <h3>Search results for: <span className="highlight-role">{searchTriggeredRole || 'All Roles'}</span></h3>
          </div>

          <div className="job-listings-content">
            {jobsLoading && (
              <div className="jobs-loading-state">
                <Loader2 size={36} className="spinner loading-spinner" />
                <p>Searching databases for matching job roles...</p>
              </div>
            )}

            {rateLimited && (
              <div className="jobs-warning-state">
                <AlertCircle size={28} className="warning-icon" />
                <h4>Search Limit Reached</h4>
                <p>Daily search limit of 30 queries reached. Resets at midnight. Please try again tomorrow!</p>
              </div>
            )}

            {(localError || (jobsError && !rateLimited)) && (
              <div className="jobs-error-state">
                <AlertCircle size={28} className="error-icon" />
                <h4>Search Error</h4>
                <p>{localError || jobsError}</p>
              </div>
            )}

            {!localError && !jobsLoading && !jobsError && !rateLimited && jobs.length === 0 && (
              <div className="jobs-empty-state">
                <Briefcase size={36} className="empty-icon" />
                <h4>No matching openings found</h4>
                <p>Try searching for a different role or matching spelling with standard fields.</p>
              </div>
            )}

            {!localError && !jobsLoading && !rateLimited && jobs.length > 0 && (
              <div className="jobs-grid">
                {jobs.map((job, idx) => {
                  const key = job.url || idx;
                  const assessment = assessments[job.url] || {};
                  return (
                    <div key={key} className="job-card fade-up">
                      <div className="job-card-top">
                        <div className="job-title-row">
                          <h4>{job.title}</h4>
                          <div className="job-badges">
                            {job.isRemote && <span className="job-badge remote">Remote</span>}
                            <span className={`job-badge source ${job.source?.toLowerCase()}`}>
                              {job.source}
                            </span>
                          </div>
                        </div>
                        <p className="job-company-row">
                          <Briefcase size={14} /> <span>{job.company}</span>
                        </p>
                        <p className="job-location-row">
                          <MapPin size={14} /> <span>{job.location || 'Global / Remote'}</span>
                        </p>
                        {job.salary && (
                          <p className="job-salary-row">
                            💰 <span>{job.salary}</span>
                          </p>
                        )}
                        {job.created && (
                          <p className="job-date-row">
                            📅 <span>Posted: {new Date(job.created).toLocaleDateString()}</span>
                          </p>
                        )}
                      </div>

                      <div className="job-card-actions">
                        <button 
                          className="assess-readiness-btn"
                          onClick={() => handleAssessReadiness(job)}
                          disabled={assessment.loading}
                        >
                          {assessment.loading ? (
                            <>
                              <Loader2 size={14} className="spinner" /> Analyzing...
                            </>
                          ) : (
                            <>
                              <Sparkles size={14} /> Am I ready?
                            </>
                          )}
                        </button>
                        
                        <a 
                          href={job.url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="apply-job-btn"
                        >
                          Apply <ExternalLink size={14} />
                        </a>
                      </div>

                      {/* Readiness Assessment Overlay */}
                      {assessment.loading && (
                        <div className="inline-assessment-container loading">
                          <div className="assessment-loading-spinner-wrapper">
                            <Loader2 size={20} className="spinner" />
                            <span>Analyzing your completed courses and skills...</span>
                          </div>
                        </div>
                      )}

                      {assessment.error && (
                        <div className="inline-assessment-container error">
                          <AlertCircle size={16} />
                          <span>Error: {assessment.error}</span>
                        </div>
                      )}

                      {assessment.result && (
                        <div className="inline-assessment-container success">
                          <div className="assessment-sparkle-title">
                            <Sparkles size={14} className="sparkle-icon" /> Fitry Job Readiness Assessment
                          </div>
                          <div className="assessment-content">
                            {assessment.result.split('\n').map((line, lIdx) => {
                              const trimmed = line.trim();
                              if (!trimmed) return null;
                              if (trimmed.startsWith('- **Readiness Score**:') || trimmed.startsWith('**Readiness Score**:') || trimmed.startsWith('- Readiness Score:')) {
                                const val = trimmed.split('Score**:')[1] || trimmed.split('Score:')[1] || '';
                                return (
                                  <div key={lIdx} className="assessment-score-badge">
                                    <span className="score-label">Readiness Rating:</span>
                                    <span className="score-val">{val.trim()}</span>
                                  </div>
                                );
                              }
                              return <p key={lIdx} className="assessment-text-line">{trimmed}</p>;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
