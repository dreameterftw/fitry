// ─────────────────────────────────────────────────────────────
//  Role Roadmaps — role paths, skills, portfolios, companies
//  per track (2+ roles each)
// ─────────────────────────────────────────────────────────────

export const ROLE_ROADMAPS = {
  "Web Development": [
    {
      role: "Frontend Developer",
      path: [
        { courseId: 1, title: "HTML & CSS", required: true },
        { courseId: 2, title: "JavaScript", required: true },
        { courseId: 3, title: "React", required: true },
      ],
      portfolioChecklist: [
        "Personal portfolio website",
        "A responsive landing page",
        "A JavaScript project using an API",
        "A React app with routing and state",
        "Code pushed to GitHub with clear READMEs",
      ],
      requiredSkills: ["HTML", "CSS", "Flexbox", "JavaScript", "DOM manipulation", "React", "REST APIs", "Git"],
      hiringCompanies: ["Razorpay", "CRED", "Zepto", "Swiggy", "Meesho", "Groww", "PhonePe"],
    },
    {
      role: "Full Stack Developer",
      path: [
        { courseId: 1, title: "HTML & CSS", required: true },
        { courseId: 2, title: "JavaScript", required: true },
        { courseId: 3, title: "React", required: true },
        { courseId: 10, title: "Node.js", required: true },
        { courseId: 11, title: "SQL", required: true },
      ],
      portfolioChecklist: [
        "A full-stack CRUD app with auth",
        "A REST API with database integration",
        "A React frontend connected to your backend",
        "A deployed project on Vercel/Railway",
        "Clean GitHub repos with API documentation",
      ],
      requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "SQL", "REST APIs", "Git", "Deployment"],
      hiringCompanies: ["Flipkart", "Paytm", "Freshworks", "BrowserStack", "Postman", "Atlassian India"],
    },
  ],
  "Data Science": [
    {
      role: "Data Analyst",
      path: [
        { courseId: 4, title: "Python", required: true },
        { courseId: 5, title: "Pandas", required: true },
        { courseId: 6, title: "ML Fundamentals", required: false },
      ],
      portfolioChecklist: [
        "A data cleaning project with a real dataset",
        "An exploratory data analysis notebook",
        "A dashboard or visualisation project",
        "A Pandas project with GroupBy and aggregation",
        "Published on GitHub or Kaggle",
      ],
      requiredSkills: ["Python", "Pandas", "NumPy", "SQL basics", "Data visualisation", "Excel", "Statistics"],
      hiringCompanies: ["Flipkart", "Amazon", "Paytm", "OYO", "Lenskart", "Urban Company", "Byju's"],
    },
    {
      role: "ML Engineer",
      path: [
        { courseId: 4, title: "Python", required: true },
        { courseId: 5, title: "Pandas", required: true },
        { courseId: 6, title: "ML Fundamentals", required: true },
      ],
      portfolioChecklist: [
        "A supervised learning project with evaluation metrics",
        "An end-to-end ML pipeline notebook",
        "A model served via a REST API",
        "A deep learning experiment (CNN or NLP)",
        "Published on Kaggle with leaderboard entry",
      ],
      requiredSkills: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow or PyTorch", "Feature engineering", "Model evaluation", "SQL"],
      hiringCompanies: ["Google India", "Microsoft India", "Amazon", "Myntra", "MakeMyTrip", "Jio"],
    },
  ],
  "Cybersecurity": [
    {
      role: "Security Analyst",
      path: [
        { courseId: 8, title: "Cybersecurity", required: true },
      ],
      portfolioChecklist: [
        "A documented CTF writeup",
        "A network reconnaissance report",
        "A vulnerability assessment on a test environment",
        "A professional penetration test report",
        "Published on GitHub",
      ],
      requiredSkills: ["Networking basics", "Linux", "Nmap", "OWASP Top 10", "Burp Suite", "Metasploit", "Report writing"],
      hiringCompanies: ["Wipro", "TCS", "HCL", "Quick Heal", "Tata Communications", "IBM India"],
    },
    {
      role: "Penetration Tester",
      path: [
        { courseId: 4, title: "Python", required: false },
        { courseId: 8, title: "Cybersecurity", required: true },
      ],
      portfolioChecklist: [
        "A HackTheBox or TryHackMe profile with 10+ machines",
        "A custom exploitation script in Python",
        "A web app pentest report following OWASP methodology",
        "A privilege escalation walkthrough",
        "CTF competition participation proof",
      ],
      requiredSkills: ["Linux administration", "Python scripting", "Nmap", "Burp Suite", "Metasploit", "OWASP Top 10", "Privilege escalation", "Social engineering basics"],
      hiringCompanies: ["Deloitte India", "EY India", "KPMG India", "Paladion", "Lucideus", "CrowdStrike India"],
    },
  ],
  "Mobile": [
    {
      role: "React Native Developer",
      path: [
        { courseId: 3, title: "React", required: true },
        { courseId: 9, title: "React Native", required: true },
      ],
      portfolioChecklist: [
        "A published Expo app",
        "An app with navigation and API integration",
        "An app with local storage",
        "A polished UI with animations",
        "App submitted to Play Store or TestFlight",
      ],
      requiredSkills: ["React", "React Native", "Expo", "Navigation", "REST APIs", "AsyncStorage", "App publishing"],
      hiringCompanies: ["Zomato", "Dream11", "ShareChat", "Nykaa", "Rapido", "Ola", "Dunzo"],
    },
    {
      role: "Mobile App Developer",
      path: [
        { courseId: 2, title: "JavaScript", required: true },
        { courseId: 3, title: "React", required: true },
        { courseId: 9, title: "React Native", required: true },
      ],
      portfolioChecklist: [
        "A cross-platform app with native features (camera, GPS)",
        "An app with push notifications",
        "An app using a state management library",
        "A performance-optimized app with lazy loading",
        "At least one app live on Google Play or App Store",
      ],
      requiredSkills: ["JavaScript", "React", "React Native", "Expo", "State management", "Native modules", "App Store publishing", "CI/CD for mobile"],
      hiringCompanies: ["PhonePe", "Paytm", "CRED", "Groww", "Swiggy", "Flipkart", "MPL"],
    },
  ],
  "Systems": [
    {
      role: "C++ Developer",
      path: [
        { courseId: 7, title: "C++", required: true },
      ],
      portfolioChecklist: [
        "A data structures implementation project",
        "A multithreaded application",
        "A memory-managed systems project",
        "A competitive programming profile (Codeforces or LeetCode)",
        "Published on GitHub with build instructions",
      ],
      requiredSkills: ["C++17", "OOP", "Pointers", "STL", "Memory management", "Multithreading", "Data structures"],
      hiringCompanies: ["Qualcomm", "Samsung R&D", "Intel India", "NVIDIA", "Siemens", "Texas Instruments"],
    },
    {
      role: "Systems Engineer",
      path: [
        { courseId: 7, title: "C++", required: true },
        { courseId: 4, title: "Python", required: false },
      ],
      portfolioChecklist: [
        "A custom shell or command-line tool",
        "A networking project (socket programming)",
        "An OS-level utility (file system, process manager)",
        "A performance benchmark comparison project",
        "Documented on GitHub with architecture diagrams",
      ],
      requiredSkills: ["C++", "Linux internals", "Shell scripting", "Networking", "Operating systems", "Docker basics", "Git", "Debugging tools"],
      hiringCompanies: ["VMware India", "Cisco", "Oracle India", "AMD India", "ARM India", "Nutanix"],
    },
  ],
};
