export interface Env {
	RATE_LIMIT_KV: KVNamespace;
	GROQ_API_KEY: string;
	RESEND_API_KEY: string;
	ADZUNA_APP_ID: string;
	ADZUNA_API_KEY: string;
	FIREBASE_API_KEY: string;
}

const ALLOWED_ORIGINS = [
	"https://fitry-2df38.web.app",
	"https://fitry-2df38.firebaseapp.com",
	"http://localhost:5173",
	"http://localhost:5178",
	"http://localhost:5179",
];

const RATE_LIMIT_WINDOW = 60; // seconds
const MAX_REQUESTS = 20; // requests per window

async function verifyFirebaseToken(token: string | null, apiKey: string): Promise<string | null> {
	if (!token) return null;
	try {
		const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ idToken: token }),
		});
		if (!res.ok) return null;
		const data: any = await res.json();
		return data.users?.[0]?.localId || null;
	} catch (e) {
		return null;
	}
}

async function checkRateLimit(
	kv: KVNamespace,
	userId: string,
	config: { requests: number; windowSeconds: number } = { requests: MAX_REQUESTS, windowSeconds: RATE_LIMIT_WINDOW }
): Promise<boolean> {
	if (!kv) return true; // Fail open if KV not bound yet for testing
	const key = userId.includes(":") ? userId : `ratelimit:${userId}`;
	const current = await kv.get(key);
	const count = current ? parseInt(current) : 0;

	if (count >= config.requests) {
		return false;
	}

	await kv.put(key, (count + 1).toString(), { expirationTtl: config.windowSeconds });
	return true;
}

function isComputerEngineeringRole(role: string): boolean {
	const normalized = role.toLowerCase().trim();
	if (!normalized) return false;

	// Allowed computer engineering, software, and technology keywords
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

	// Non-computer engineering fields blocklist (to prevent false positives from generic words like "engineer" or "systems")
	const NON_COMP_ENG_KEYWORDS = [
		"mechanical", "civil", "chemical", "construction", "plumber", "doctor", "nurse", "hospital", "dentist", 
		"chef", "cooking", "restaurant", "lawyer", "legal", "real estate", "accountant", "finance", "audit", 
		"biomedical", "biological", "physics", "teacher", "professor", "physician", "surgeon", "pharmacist", 
		"therapist", "driver", "pilot", "dentistry", "veterinarian", "carpenter", "mason", "electrician"
	];

	// 1. Must not contain any forbidden non-comp-eng keywords
	for (const block of NON_COMP_ENG_KEYWORDS) {
		if (normalized.includes(block)) {
			return false;
		}
	}

	// 2. Must contain at least one allowed comp-eng keyword
	for (const allow of COMP_ENG_KEYWORDS) {
		if (normalized.includes(allow)) {
			return true;
		}
	}

	return false;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const origin = request.headers.get("Origin");

		// Handle CORS preflight
		if (request.method === "OPTIONS") {
			return new Response(null, {
				headers: {
					"Access-Control-Allow-Origin": origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
					"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type, X-User-Id, Authorization, X-Firebase-Token",
					"Access-Control-Max-Age": "86400",
				},
			});
		}

		// Origin validation
		if (origin && !ALLOWED_ORIGINS.includes(origin)) {
			return new Response("Forbidden: Invalid Origin", { status: 403 });
		}

		// User identification for rate limiting
		const userId = request.headers.get("X-User-Id") || "anonymous";
		
		// Rate limiting (only for authenticated routes or specific paths)
		const isAllowed = await checkRateLimit(env.RATE_LIMIT_KV, userId);
		if (!isAllowed) {
			return new Response("Too Many Requests", { 
				status: 429,
				headers: {
					"Access-Control-Allow-Origin": origin || ALLOWED_ORIGINS[0],
				}
			});
		}

		// Route: /api/jobs
		if (url.pathname === "/api/jobs") {
			if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
			
			const token = request.headers.get("X-Firebase-Token");
			const uid = await verifyFirebaseToken(token, env.FIREBASE_API_KEY);
			
			const corsHeaders = {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": origin || ALLOWED_ORIGINS[0],
			};

			if (!uid) {
				return new Response(JSON.stringify({ error: "Unauthorized" }), {
					status: 401,
					headers: corsHeaders,
				});
			}

			// Rate limit — 30 job searches per day per user
			const withinLimit = await checkRateLimit(
				env.RATE_LIMIT_KV,
				`jobs:day:${uid}`,
				{ requests: 30, windowSeconds: 86400 }
			);
			if (!withinLimit) {
				return new Response(
					JSON.stringify({ error: "Daily job search limit reached. Resets at midnight." }),
					{ status: 429, headers: corsHeaders }
				);
			}

			const { role, location = "india" } = await request.json() as { role: string; location?: string };

			if (!role || !isComputerEngineeringRole(role)) {
				return new Response(
					JSON.stringify({ 
						error: "The Job Finder is strictly restricted to computer engineering, software, and technology roles. Please search for a technology-related role." 
					}),
					{ status: 400, headers: corsHeaders }
				);
			}

			// Adzuna — India roles with salary data
			const adzunaRes = await fetch(
				`https://api.adzuna.com/v1/api/jobs/in/search/1` +
				`?app_id=${env.ADZUNA_APP_ID}&app_key=${env.ADZUNA_API_KEY}` +
				`&results_per_page=8&what=${encodeURIComponent(role)}` +
				`&where=${encodeURIComponent(location)}&content-type=application/json`
			);
			const adzunaData: any = adzunaRes.ok ? await adzunaRes.json() : { results: [] };

			// Remotive — remote tech jobs, no key needed
			const remotiveRes = await fetch(
				`https://remotive.com/api/remote-jobs?search=${encodeURIComponent(role)}&limit=5`
			);
			const remotiveData: any = remotiveRes.ok ? await remotiveRes.json() : { jobs: [] };

			// Normalise both into the same shape
			const jobs = [
				...(adzunaData.results || []).map((j: any) => ({
					id: String(j.id),
					title: j.title,
					company: j.company?.display_name || "Unknown",
					location: j.location?.display_name || "India",
					salary: j.salary_min && j.salary_max
						? `₹${Math.round(j.salary_min / 100000)}–${Math.round(j.salary_max / 100000)} LPA`
						: "Not disclosed",
					url: j.redirect_url,
					source: "Adzuna",
					remote: false,
					postedAt: j.created,
				})),
				...(remotiveData.jobs || []).map((j: any) => ({
					id: String(j.id),
					title: j.title,
					company: j.company_name,
					location: "Remote",
					salary: j.salary || "Not disclosed",
					url: j.url,
					source: "Remotive",
					remote: true,
					postedAt: j.publication_date,
				})),
			];

			return new Response(JSON.stringify({ jobs }), { headers: corsHeaders });
		}

		// Route: /api/groq
		if (url.pathname === "/api/groq") {
			if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

			const corsHeaders = {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": origin || ALLOWED_ORIGINS[0],
			};

			// Verify Firebase ID token for authenticated access
			const token = request.headers.get("X-Firebase-Token");
			const uid = await verifyFirebaseToken(token, env.FIREBASE_API_KEY);
			if (!uid) {
				return new Response(JSON.stringify({ error: "Unauthorized" }), {
					status: 401,
					headers: corsHeaders,
				});
			}

			// Rate limit — 60 AI requests per minute per user
			const withinLimit = await checkRateLimit(
				env.RATE_LIMIT_KV,
				`groq:${uid}`,
				{ requests: 60, windowSeconds: 60 }
			);
			if (!withinLimit) {
				return new Response(
					JSON.stringify({ error: { message: "Rate limit exceeded. Please wait a moment before trying again." } }),
					{ status: 429, headers: corsHeaders }
				);
			}

			const body = await request.json() as any;
			const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${env.GROQ_API_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});

			const data = await response.json() as any;
			return new Response(JSON.stringify(data), {
				headers: corsHeaders,
			});
		}

		// Route: /api/contact
		if (url.pathname === "/api/contact") {
			if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

			const body = await request.json() as any;

			// Input validation
			const name = (body.name || "").trim();
			const email = (body.email || "").trim();
			const message = (body.message || "").trim();

			const corsHeaders = {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": origin || ALLOWED_ORIGINS[0],
			};

			if (!name || !email || !message) {
				return new Response(JSON.stringify({ error: "All fields (name, email, message) are required." }), {
					status: 400,
					headers: corsHeaders,
				});
			}

			// Basic email format check
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
				return new Response(JSON.stringify({ error: "Invalid email format." }), {
					status: 400,
					headers: corsHeaders,
				});
			}

			// Sanitize HTML to prevent injection
			const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

			// Resend API implementation
			const response = await fetch("https://api.resend.com/emails", {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${env.RESEND_API_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					from: "Fitry Contact <onboarding@resend.dev>",
					to: ["dr3amtoosadr07@gmail.com"],
					subject: `Fitry Contact — ${esc(name)}`,
					html: `<div style="font-family:sans-serif;max-width:560px">
						<h2 style="color:#1a1a1a">New message from Fitry</h2>
						<p><strong>Name:</strong> ${esc(name)}</p>
						<p><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
						<hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
						<p style="white-space:pre-wrap">${esc(message)}</p>
					</div>`,
				}),
			});

			const data = await response.json() as any;
			const status = response.ok ? 200 : response.status;
			return new Response(JSON.stringify(data), {
				status,
				headers: corsHeaders,
			});
		}

		return new Response("Not Found", { 
			status: 404,
			headers: {
				"Access-Control-Allow-Origin": origin || ALLOWED_ORIGINS[0],
			}
		});
	},
};
