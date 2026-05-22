const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../fitry-app/.env') });
const admin = require('firebase-admin');

const projectId = process.env.VITE_FIREBASE_PROJECT_ID || 'fitry-2df38';

console.log(`\n🚀 Seeding Firestore Leaderboard for project: ${projectId}\n`);

// Attempt to load service account key
const serviceAccountPath = path.join(__dirname, '../service-account.json');
let credential;

if (fs.existsSync(serviceAccountPath)) {
  console.log('✅ Found service-account.json, using it for authentication...');
  const serviceAccount = require(serviceAccountPath);
  credential = admin.credential.cert(serviceAccount);
} else {
  console.log('⚠️ No service-account.json found at root.');
  console.log('   Using Application Default Credentials (ADC) / CLI Authentication...');
  console.log('   If this fails, please download a service account key JSON from:');
  console.log('   Firebase Console -> Settings -> Service Accounts, and save it as "service-account.json" at the project root.\n');
  
  // Set project ID for ADC fallback
  process.env.GOOGLE_CLOUD_PROJECT = projectId;
  try {
    credential = admin.credential.applicationDefault();
  } catch (err) {
    console.error('❌ Failed to initialize Application Default Credentials:', err.message);
    console.log('Fallback: Attempting to initialize with default credentials...');
    credential = admin.credential.applicationDefault();
  }
}

try {
  admin.initializeApp({
    credential,
    projectId
  });
} catch (err) {
  // If already initialized
  console.log('Already initialized admin SDK.');
}

const db = admin.firestore();

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

async function seed() {
  const batch = db.batch();
  const leaderboardRef = db.collection('leaderboard');

  console.log('🧹 Clearing old mock leaderboard entries...');
  const snapshot = await leaderboardRef.get();
  snapshot.forEach(doc => {
    if (doc.id.startsWith('mock_user_')) {
      batch.delete(doc.ref);
    }
  });

  console.log('✍️ Writing new mock leaderboard entries...');
  mockEntries.forEach(entry => {
    const docRef = leaderboardRef.doc(entry.uid);
    batch.set(docRef, entry);
  });

  await batch.commit();
  console.log('🎉 Successfully seeded mock leaderboard data!\n');
}

seed().catch(err => {
  console.error('❌ Seeding failed:', err);
});
