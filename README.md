# Fitry

A career-first tech learning platform that takes beginners
from their first line of code to being genuinely ready
to apply for a tech job.

## What it does
Fitry connects every lesson to a job role, every project
to a portfolio, and every learner to an honest AI assessment
of their hiring readiness.

## Tech stack
- Frontend: React + Vite
- Database: Firebase Firestore
- Auth: Firebase Authentication
- Hosting: Firebase Hosting
- AI: Groq API (Llama 3.3 70B)
- Proxy & Rate limiting: Cloudflare Workers + KV
- Jobs: Adzuna API + Remotive API
- Email: Resend

## Features
- 9 courses across 5 tracks — 3 gated levels each
- AI grader for every coding challenge
- Personalised career bot with 5 modes
- Live job finder with readiness assessment
- Weekly XP leaderboard with league system
- Verified certificates on course completion
- Role roadmaps, skill gap analysis, portfolio checklist
- Resources tab with post-lesson recommendations

## Running locally

1. Clone the repo
   ```bash
   git clone https://github.com/dreameterftw/fitry.git
   cd fitry/fitry-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a .env file in the root with:
   ```env
   VITE_WORKER_URL=your_cloudflare_worker_url
   ```

4. Run the dev server
   ```bash
   npm run dev
   ```
 
## Environment variables
All API keys (Groq, Adzuna, Resend) are stored as
Cloudflare Worker secrets and never exposed client-side.
The only environment variable needed locally is VITE_WORKER_URL.
