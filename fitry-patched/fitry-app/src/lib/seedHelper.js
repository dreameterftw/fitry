import { doc, writeBatch, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function seedMockLeaderboard() {
  console.log("Starting client-side leaderboard seeding...");
  const batch = writeBatch(db);
  const leaderboardRef = collection(db, "leaderboard");

  const mockEntries = [
    {
      uid: 'mock_user_1',
      displayName: 'Alex Rivers',
      photoURL: null,
      selectedTrack: 'React',
      totalXP: 5400,
      weeklyXP: 1250,
      league: 'Gold',
      rankDelta: '↑3',
      updatedAt: new Date().toISOString()
    },
    {
      uid: 'mock_user_2',
      displayName: 'Priya Patel',
      photoURL: null,
      selectedTrack: 'ML Fundamentals',
      totalXP: 6200,
      weeklyXP: 1100,
      league: 'Gold',
      rankDelta: '—',
      updatedAt: new Date().toISOString()
    },
    {
      uid: 'mock_user_3',
      displayName: 'Marcus Vance',
      photoURL: null,
      selectedTrack: 'Cybersecurity',
      totalXP: 4500,
      weeklyXP: 980,
      league: 'Gold',
      rankDelta: '↓1',
      updatedAt: new Date().toISOString()
    },
    {
      uid: 'mock_user_4',
      displayName: 'Sarah Jenkins',
      photoURL: null,
      selectedTrack: 'JavaScript',
      totalXP: 3100,
      weeklyXP: 850,
      league: 'Silver',
      rankDelta: 'NEW',
      updatedAt: new Date().toISOString()
    },
    {
      uid: 'mock_user_5',
      displayName: 'Evelyn Chen',
      photoURL: null,
      selectedTrack: 'Python',
      totalXP: 2900,
      weeklyXP: 720,
      league: 'Silver',
      rankDelta: '↑5',
      updatedAt: new Date().toISOString()
    },
    {
      uid: 'mock_user_6',
      displayName: 'Lucas Miller',
      photoURL: null,
      selectedTrack: 'C++',
      totalXP: 2400,
      weeklyXP: 600,
      league: 'Silver',
      rankDelta: '↓2',
      updatedAt: new Date().toISOString()
    },
    {
      uid: 'mock_user_7',
      displayName: 'David Kim',
      photoURL: null,
      selectedTrack: 'HTML & CSS',
      totalXP: 1200,
      weeklyXP: 480,
      league: 'Bronze',
      rankDelta: '—',
      updatedAt: new Date().toISOString()
    },
    {
      uid: 'mock_user_8',
      displayName: 'Sofia Alami',
      photoURL: null,
      selectedTrack: 'Pandas',
      totalXP: 950,
      weeklyXP: 350,
      league: 'Bronze',
      rankDelta: 'NEW',
      updatedAt: new Date().toISOString()
    },
    {
      uid: 'mock_user_9',
      displayName: 'Jordan Taylor',
      photoURL: null,
      selectedTrack: 'React Native',
      totalXP: 800,
      weeklyXP: 290,
      league: 'Bronze',
      rankDelta: '↑1',
      updatedAt: new Date().toISOString()
    },
    {
      uid: 'mock_user_10',
      displayName: 'Liam Johnson',
      photoURL: null,
      selectedTrack: 'React',
      totalXP: 500,
      weeklyXP: 150,
      league: 'Bronze',
      rankDelta: '↓3',
      updatedAt: new Date().toISOString()
    }
  ];

  try {
    // Clear old mock documents
    const snapshot = await getDocs(leaderboardRef);
    snapshot.forEach(docSnap => {
      if (docSnap.id.startsWith('mock_user_')) {
        batch.delete(docSnap.ref);
      }
    });

    // Write new mock documents
    mockEntries.forEach(entry => {
      const docRef = doc(db, "leaderboard", entry.uid);
      batch.set(docRef, entry);
    });

    await batch.commit();
    console.log("Client-side leaderboard seeding succeeded!");
    return true;
  } catch (error) {
    console.error("Client-side seeding failed:", error);
    throw error;
  }
}
