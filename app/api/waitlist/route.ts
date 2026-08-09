import { env } from "cloudflare:workers";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AUDIENCES = new Set(["beta", "brand", "both"]);

type BrevoEnvironment = {
  BREVO_API_KEY?: string;
  BREVO_BETA_LIST_ID?: string;
  BREVO_BRAND_LIST_ID?: string;
};

function parseListId(value: string | undefined) {
  const listId = Number(value);
  return Number.isInteger(listId) && listId > 0 ? listId : null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { email?: unknown; audience?: unknown };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const audience = typeof body.audience === "string" ? body.audience : "beta";

    if (!EMAIL_PATTERN.test(email) || !AUDIENCES.has(audience)) {
      return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    const brevoEnv = env as unknown as BrevoEnvironment;
    const betaListId = parseListId(brevoEnv.BREVO_BETA_LIST_ID);
    const brandListId = parseListId(brevoEnv.BREVO_BRAND_LIST_ID);

    if (!brevoEnv.BREVO_API_KEY || !betaListId || !brandListId) {
      console.error("Brevo waitlist environment variables are incomplete.");
      return Response.json(
        { message: "The waitlist is being configured. Please try again soon." },
        { status: 503 },
      );
    }

    const listIds = audience === "both"
      ? [betaListId, brandListId]
      : [audience === "brand" ? brandListId : betaListId];

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": brevoEnv.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        listIds,
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      console.error("Brevo waitlist request failed", response.status, await response.text());
      return Response.json(
        { message: "We couldn't add you just yet. Please try again." },
        { status: 502 },
      );
    }

    return Response.json({ message: "You're in! We'll keep you posted." });
  } catch (error) {
    console.error("Waitlist signup failed", error);
    return Response.json(
      { message: "We couldn't add you just yet. Please try again." },
      { status: 500 },
    );
  }
}
