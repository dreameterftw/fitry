import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { getUserProfile } from '../lib/userStore';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      try {
        if (firebaseUser) {
          const data = await getUserProfile(firebaseUser.uid);
          setProfile(data);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error('[Auth] Failed to load profile:', err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });
    return unsub;
  }, []);

  // useCallback ensures refreshProfile always closes over the latest `user`
  // and can be safely listed in dependency arrays without causing stale closures
  // or infinite re-render loops.
  const refreshProfile = useCallback(async () => {
    if (user) {
      const data = await getUserProfile(user.uid);
      setProfile(data);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
