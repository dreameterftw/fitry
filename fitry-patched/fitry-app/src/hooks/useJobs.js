import { useState, useEffect, useRef } from 'react';
import { getAuth } from 'firebase/auth';

export default function useJobs(role, enabled) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rateLimited, setRateLimited] = useState(false);

  // Local cache stored inside ref for persistent session memory without extra re-renders
  const cacheRef = useRef({});

  useEffect(() => {
    if (!enabled || !role || !role.trim()) return;

    const trimmedRole = role.trim();

    // Return cached value if it already exists
    if (cacheRef.current[trimmedRole]) {
      const cached = cacheRef.current[trimmedRole];
      setJobs(cached.jobs);
      setRateLimited(cached.rateLimited || false);
      setError(cached.error || null);
      return;
    }

    let isMounted = true;

    async function fetchJobs() {
      setLoading(true);
      setError(null);
      setRateLimited(false);

      try {
        const authInstance = getAuth();
        const currentUser = authInstance.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated.");
        }

        // Freshly retrieve Firebase ID token before each call
        const token = await currentUser.getIdToken(true);
        const workerUrl = import.meta.env.VITE_WORKER_URL || 'https://fitry-proxy.dr3amtoosadr07.workers.dev';

        const res = await fetch(`${workerUrl}/api/jobs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Firebase-Token': token,
            'X-User-Id': currentUser.uid
          },
          body: JSON.stringify({ role: trimmedRole })
        });

        if (res.status === 429) {
          if (isMounted) {
            setRateLimited(true);
            setJobs([]);
            cacheRef.current[trimmedRole] = { jobs: [], rateLimited: true, error: null };
          }
          return;
        }

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Server error: ${res.status}`);
        }

        const data = await res.json();
        const fetchedJobs = data.jobs || [];

        if (isMounted) {
          setJobs(fetchedJobs);
          cacheRef.current[trimmedRole] = { jobs: fetchedJobs, rateLimited: false, error: null };
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Could not fetch listings. Check your connection and try again.');
          cacheRef.current[trimmedRole] = { jobs: [], rateLimited: false, error: err.message };
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, [role, enabled]);

  return { jobs, loading, error, rateLimited };
}
