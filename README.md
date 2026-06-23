# Fitry

> A career-first tech learning platform that takes learners from their first line of code to being genuinely ready to apply for a tech job.

Fitry is not another course platform.

Most learning platforms stop at teaching concepts and issuing certificates. Fitry bridges the gap between learning and employment by combining structured learning, AI-powered feedback, career guidance, skill-gap analysis, portfolio building, and live job opportunities into a single ecosystem.

The platform is designed primarily for students, beginners, career switchers, and self-taught developers who need a clear roadmap into technology without wasting months on the wrong skills or courses.

---
 
# The Problem

The current online learning ecosystem has three major issues:

### 1. Learners don't know what to learn

Most beginners choose courses based on trends, YouTube recommendations, or what their friends are doing.

They often spend months learning technologies that don't align with their interests or career goals.

### 2. Learning platforms don't lead to jobs

Completing a course rarely answers important questions:

* Am I ready for interviews?
* What skills am I missing?
* What should I learn next?
* Which jobs can I realistically apply for?

### 3. Certificates don't prove ability

Most certificates simply prove participation.

Employers have no way to verify whether a learner actually understood the content or built real projects.

---

# Our Solution

Fitry creates a complete learning-to-employment pipeline.

Every feature exists to answer one question:

> "What is the fastest and most effective path from where I am today to becoming job-ready?"

The platform helps users:

* Discover suitable career paths
* Learn through structured roadmaps
* Complete gated projects
* Receive AI-generated feedback
* Track progress and skill gaps
* Build portfolios
* Assess interview readiness
* Find relevant job opportunities

---

# Core Features

## Structured Learning Paths

Fitry currently includes multiple learning tracks including:

* Web Development
* Python Programming
* Data Analytics
* Machine Learning
* Additional expansion-ready tracks

Each course contains:

### Beginner Level

* Core concepts
* Foundational exercises
* MCQ assessments

### Intermediate Level

* Applied learning
* Coding challenges
* Real-world practice

### Advanced Level

* Project-based implementation
* Portfolio-ready work
* Industry-oriented scenarios

Progression is gated.

Users cannot skip ahead without completing the previous level successfully.

---

## AI Coding Challenge Grader

Traditional platforms use multiple-choice quizzes.

Fitry evaluates actual code.

Users submit solutions to coding challenges and receive:

* Score (0–100)
* Correctness feedback
* Improvement suggestions
* Retry opportunities

This creates a learning experience closer to real software development and code review.

---

## AI Career Assistant

One of Fitry's most important features.

Unlike generic AI chatbots, the Fitry assistant understands the user's actual progress before generating responses.

Before every interaction, the assistant reads:

* Completed courses
* XP
* Streaks
* Skill gaps
* Current learning track
* Progress history

The assistant then provides personalized guidance.

### Career Guidance Mode

Explains career paths and role requirements.

### Resume Coach Mode

Reviews resumes and suggests improvements.

### Mock Interview Mode

Conducts role-specific interviews with feedback.

### Learning Advisor Mode

Recommends what to learn next.

### Job Readiness Mode

Provides realistic assessments of hiring readiness.

---

## Career Guide

The Career Guide acts as a personalized roadmap.

It provides:

### Skill Gap Analysis

Shows:

* Required skills
* Skills already completed
* Missing skills

### Role Roadmaps

Visual learning paths for:

* Frontend Development
* Backend Development
* Data Analytics
* Machine Learning
* Additional tracks

### Portfolio Checklist

Tracks project completion and portfolio readiness.

---

## Job Finder

Fitry integrates real job opportunities directly into the platform.

Users can search jobs and instantly see:

* Job details
* Required skills
* Experience expectations
* Hiring readiness assessment

The system compares the user's progress against job requirements and generates personalized feedback.

---

## XP, Streaks & Leaderboards

To improve consistency and retention, Fitry incorporates gamification systems inspired by successful learning platforms.

Features include:

* Daily streak tracking
* XP rewards
* Weekly leaderboards
* League promotion and demotion
* Competitive rankings

These mechanics encourage long-term engagement and learning discipline.

---

## Verified Certificates

Certificates are generated only after genuine completion.

Requirements include:

* Course completion
* Level completion
* Challenge completion
* Mini-project completion

Each certificate includes:

* Unique verification ID
* Public verification support
* Learner information
* Course details

This transforms certificates from participation badges into proof-of-work credentials.

---

# System Architecture

Fitry follows a modern serverless architecture designed for scalability, security, and low operational cost.

## Frontend

### React + Vite

Used for:

* Component-based UI
* Fast development workflow
* Optimized production builds
* Responsive user experience

---

## Authentication

### Firebase Authentication

Supports:

* User registration
* Login
* Session management
* Secure identity handling

---

## Database

### Firebase Firestore

Stores:

* User profiles
* Progress data
* XP records
* Leaderboards
* Certificates
* Career data

Benefits:

* Real-time updates
* Automatic scaling
* Serverless infrastructure

---

## AI Layer

### Groq API (Llama 3.3 70B)

Used for:

* Career coaching
* Resume feedback
* Mock interviews
* Job readiness analysis
* Code evaluation

The AI layer is context-aware and receives user-specific learning data before every interaction.

---

## Backend Proxy

### Cloudflare Workers

Acts as the platform's secure backend gateway.

Responsibilities include:

* API proxying
* Request validation
* Rate limiting
* Authentication verification
* Secret management

No third-party API keys are ever exposed to the browser.

---

## Rate Limiting

### Cloudflare KV

Used to:

* Track request counts
* Prevent abuse
* Enforce daily usage limits
* Protect external APIs

---

## Job Aggregation

### Adzuna API

### Remotive API

Provide:

* Real-time job listings
* Remote opportunities
* Skill requirements
* Market insights

---

## Email Services

### Resend

Handles:

* Contact forms
* User notifications
* Support communication
* Email verification workflows

---

# Security

Security was considered from the beginning of development.

Measures include:

### Secure API Architecture

All sensitive operations pass through Cloudflare Workers.

### Hidden Secrets

API keys remain stored as Worker secrets and never reach the frontend.

### Firebase Security Rules

Users can only access their own data.

### Authentication Verification

Requests are validated before accessing protected resources.

### Endpoint Rate Limiting

Prevents abuse and excessive API consumption.

---

# Scalability

Fitry was designed to scale from a few users to millions.

### Firestore

Automatically scales horizontally.

### Cloudflare Workers

Runs globally across hundreds of edge locations.

### Firebase Hosting

Provides CDN-based content delivery.

### Modular Course Architecture

New courses can be added with minimal development effort.

### Expansion Ready

Future tracks include:

* DevOps
* SQL
* DSA
* Game Development
* Cloud Computing

without requiring architectural changes.

---

# Future Roadmap

Planned features include:

* Resume Builder
* GitHub Integration
* Mobile Application
* AI-Powered Adaptive Learning Paths
* Recruiter Dashboard
* Mentor Marketplace
* Community Discussion System
* College Partnerships
* Employer-Verified Certifications
* Offline Learning Support

---

# Technology Stack

| Layer          | Technology                |
| -------------- | ------------------------- |
| Frontend       | React + Vite              |
| Authentication | Firebase Authentication   |
| Database       | Firebase Firestore        |
| Hosting        | Firebase Hosting          |
| AI             | Groq (Llama 3.3 70B)      |
| Backend Proxy  | Cloudflare Workers        |
| Rate Limiting  | Cloudflare KV             |
| Jobs           | Adzuna API + Remotive API |
| Email          | Resend                    |

---

# Local Development

## Clone Repository

```bash
git clone https://github.com/dreameterftw/fitry.git
cd fitry/fitry-app
```

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root.

```env
VITE_WORKER_URL=your_cloudflare_worker_url
```

## Start Development Server

```bash
npm run dev
```

---

# Environment Variables

The frontend requires only:

```env
VITE_WORKER_URL
```

All sensitive credentials remain inside Cloudflare Worker secrets:

* GROQ_API_KEY
* ADZUNA_APP_ID
* ADZUNA_APP_KEY
* RESEND_API_KEY

No API keys are exposed client-side.

---

# Vision

Our long-term goal is simple:

> Become the platform that guides learners from curiosity to competence, from competence to confidence, and from confidence to employment.

Fitry is not just a place to learn technology.

It is a system designed to help people build careers.
