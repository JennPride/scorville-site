import { env } from "cloudflare:workers";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AUDIENCES = new Set(["beta", "brand", "both"]);

export async function POST(request: Request) {
  try {
    const body = await request.json() as { email?: unknown; audience?: unknown };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const audience = typeof body.audience === "string" ? body.audience : "beta";

    if (!EMAIL_PATTERN.test(email) || !AUDIENCES.has(audience)) {
      return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS waitlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      audience TEXT NOT NULL,
      created_at TEXT NOT NULL
    )`).run();

    await env.DB.prepare(
      "INSERT INTO waitlist (email, audience, created_at) VALUES (?, ?, ?) ON CONFLICT(email) DO UPDATE SET audience = excluded.audience"
    ).bind(email, audience, new Date().toISOString()).run();

    return Response.json({ message: "You're in! We'll keep you posted." });
  } catch {
    return Response.json({ message: "We couldn't add you just yet. Please try again." }, { status: 500 });
  }
}
