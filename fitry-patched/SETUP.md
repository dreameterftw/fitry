# Fitry — Setup & Deploy Guide (Firebase Spark / Free Plan)

## App flow
Landing (/) → Login/Signup (/login) → Quiz intro → Quiz → Dashboard → everything else

No backend server. No Cloud Functions. Everything runs on Firebase's free Spark plan.

---

## What gets deployed where

| Part | Service | Cost |
|------|---------|------|
| Frontend (React) | Firebase Hosting | Free |
| User accounts | Firebase Authentication | Free |
| User data | Firebase Firestore | Free |
| AI (Gemini bots, grading) | Called directly from browser | Free (Gemini free tier) |

---

## Prerequisites
- Node.js 18+ → https://nodejs.org
- A Google account

---

## STEP 1 — Create a Firebase project

1. Go to https://console.firebase.google.com
2. Click **Add project** → name it (e.g. `fitry`) → Create project
3. No need to upgrade — stay on the **Spark (free) plan**

Enable 3 services inside the project:

**Authentication**
Build → Authentication → Get started → Sign-in method → Email/Password → Enable → Save

**Firestore**
Build → Firestore Database → Create database → Start in test mode → Pick a region → Done

**Hosting**
Build → Hosting → Get started → click through the steps (we deploy via CLI)

---

## STEP 2 — Get your Firebase config keys

1. Click ⚙️ gear → **Project Settings**
2. Scroll to **Your apps** → **Add app** → Web (</>)
3. Register the app → copy the `firebaseConfig` values

---

## STEP 3 — Get your free Gemini API key

1. Go to https://aistudio.google.com/apikey
2. Click **Create API key** → copy it

---

## STEP 4 — Configure the project

In `fitry-app/`, copy `.env.example` to `.env`:
```
cp fitry-app/.env.example fitry-app/.env
```

Fill in all values:
```
VITE_FIREBASE_API_KEY=AIzaSy-...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

VITE_GEMINI_API_KEY=AIzaSy-...
```

---

## STEP 5 — Set your project ID in .firebaserc

Open `.firebaserc` and replace `YOUR_FIREBASE_PROJECT_ID`:
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

---

## STEP 6 — Install Firebase CLI & log in

```bash
npm install -g firebase-tools
firebase login
```

---

## STEP 7 — Deploy

```bash
# Install and build the frontend
cd fitry-app
npm install
npm run build
cd ..

# Deploy to Firebase Hosting
firebase deploy
```

Firebase will output:
```
Hosting URL: https://your-project.web.app
```

That's your live app. Share it with anyone.

---

## Re-deploying after changes

```bash
cd fitry-app && npm run build && cd ..
firebase deploy
```

---

## Viewing your users

Firebase Console → **Authentication → Users**
Every user's email, creation date, and last login.

Firebase Console → **Firestore → users collection**
Each user's track, progress, scores, streak.

---

## Firestore security rules (before going public)

Firebase Console → Firestore → **Rules** tab → replace with:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
Click **Publish**.
