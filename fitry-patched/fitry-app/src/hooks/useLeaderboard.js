import { useEffect, useState } from "react";
import { collection, query, where, orderBy, limit, onSnapshot, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

export function useLeaderboard(trackFilter = null, leagueFilter = null) {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [userEntry, setUserEntry] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Build the query
    const leaderboardRef = collection(db, "leaderboard");
    const queryConstraints = [
      orderBy("weeklyXP", "desc"),
      limit(100)
    ];

    if (trackFilter) {
      queryConstraints.push(where("selectedTrack", "==", trackFilter));
    }
    if (leagueFilter) {
      queryConstraints.push(where("league", "==", leagueFilter));
    }

    const q = query(leaderboardRef, ...queryConstraints);

    // Subscribe to the queried entries
    const unsubLeaderboard = onSnapshot(q, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setEntries(results);
      setLoading(false);
    }, (err) => {
      console.error("Leaderboard fetch error:", err);
      setError(err);
      setLoading(false);
    });

    // Subscribe to current user's entry if logged in
    let unsubUserEntry = null;
    if (user?.uid) {
      const userDocRef = doc(db, "leaderboard", user.uid);
      unsubUserEntry = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          setUserEntry({ id: docSnap.id, ...docSnap.data() });
        } else {
          setUserEntry(null);
        }
      }, (err) => {
        console.error("User leaderboard entry error:", err);
      });
    } else {
      setUserEntry(null);
    }

    return () => {
      unsubLeaderboard();
      if (unsubUserEntry) unsubUserEntry();
    };
  }, [trackFilter, leagueFilter, user?.uid]);

  // Compute user rank based on the results array
  useEffect(() => {
    if (user?.uid && entries.length > 0) {
      const index = entries.findIndex(e => (e.uid === user.uid || e.id === user.uid));
      if (index !== -1) {
        setUserRank(index + 1);
      } else {
        setUserRank(null);
      }
    } else {
      setUserRank(null);
    }
  }, [entries, user?.uid]);

  return { entries, userEntry, userRank, loading, error };
}
