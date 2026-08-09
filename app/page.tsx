"use client";

import { FormEvent, useState } from "react";

type Audience = "beta" | "brand" | "both";

const audienceLabels: Record<Audience, string> = {
  beta: "Beta Tester",
  brand: "Sauce Brand",
  both: "Both",
};

export default function Home() {
  const [audience, setAudience] = useState<Audience>("beta");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), audience }),
    });
    const result = (await response.json()) as { message?: string };
    setStatus(response.ok ? "success" : "error");
    setMessage(result.message ?? (response.ok ? "You're on the list." : "Something went wrong. Please try again."));
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Scorville home">
          <span>SCORVILLE</span>
        </a>
        <div className="nav-links" aria-label="Jump to section">
          <a href="#top">Overview</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>
        <a className="nav-cta" href="#waitlist">Join the waitlist <span aria-hidden="true">↘</span></a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> The community for heat seekers</p>
          <h1>Find your<br />next <em>favorite</em><br />hot sauce.</h1>
          <p className="hero-text">Track what you taste. Rate the burn. Discover sauces you’ll love—and compete against other pepper heads.</p>
          <a className="primary-button" href="#waitlist">Get Early Access <span aria-hidden="true">→</span></a>
        </div>

        <div className="hero-art" aria-label="Scorville app check-in preview">
          <div className="glow glow-one" />
          <div className="glow glow-two" />
          <div className="phone-preview" aria-hidden="true">
            <div className="phone-status"><span>4:20</span><span>● 5G</span></div>
            <div className="phone-heading">
              <div>
                <span className="phone-brand">SCORVILLE</span>
                <h2>Get Saucey</h2>
                <p>Signed in as heatseeker</p>
              </div>
            </div>

            <div className="checkin-preview">
              <div className="checkin-summary">
                <div className="image-placeholder checkin-photo">
                  <span>PHOTO</span>
                  <small>Replace me</small>
                </div>
                <div className="checkin-copy">
                  <span className="checkin-user">@sgian</span>
                  <span className="checkin-brand">TRADER JOE&apos;S</span>
                  <strong>Bird&apos;s eye</strong>
                  <p>overall 8/10 · heat 3/10 · flavor 7/10</p>
                  <span className="checkin-date">7/31/2026</span>
                </div>
                <span className="close-chip">Close</span>
              </div>

              <div className="score-grid">
                <div className="score-tile"><span>OVERALL</span><strong>8/10</strong></div>
                <div className="score-tile"><span>HEAT</span><strong>3/10</strong></div>
                <div className="score-tile"><span>FLAVOR</span><strong>7/10</strong></div>
                <div className="score-tile"><span>UNIQUENESS</span><strong>6/10</strong></div>
                <div className="score-tile"><span>VERSATILITY</span><strong>7/10</strong></div>
                <div className="score-tile"><span>BUY AGAIN</span><strong>Yes</strong></div>
              </div>

              <div className="pairings">
                <strong>Pairings</strong>
                <div><span>fish tacos</span><span>seafood</span><span>burritos</span></div>
              </div>

              <div className="phone-actions">
                <span>View Brand</span>
                <span>View Sauce</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="marquee" aria-label="Scorville features">
        <div>DISCOVER <span>✦</span> RATE <span>✦</span> TRACK <span>✦</span> SHARE <span>✦</span><span> COMPETE </span></div>
      </section>

      <section className="features" id="features">
        <div className="feature-grid">
          <article><span className="feature-number">01</span><div className="feature-media-placeholder" aria-hidden="true"><span>YOUR IMAGE</span></div><h3>Discover</h3><p>Explore sauces by flavor, pepper, heat level, or the people you trust.</p></article>
          <article><span className="feature-number">02</span><div className="feature-media-placeholder" aria-hidden="true"><span>YOUR IMAGE</span></div><h3>Check in</h3><p>Rate every sauce you try and build a personal history of your heat journey.</p></article>
          <article><span className="feature-number">03</span><div className="feature-media-placeholder" aria-hidden="true"><span>YOUR IMAGE</span></div><h3>Connect</h3><p>Follow fellow heat seekers and discover the independent brands behind the bottle.</p></article>
        </div>
      </section>

      <section className="about" id="about">
        <div className="creator-image-placeholder" role="img" aria-label="Placeholder for a photograph of the creator">
          <span>CREATOR PHOTO</span>
          <small>Replace me</small>
        </div>
        <div className="about-copy">
          <p className="eyebrow"><span /> About the creator</p>
          <h2>Built by a fellow<br />hot sauce fanatic</h2>
          <p>Hello, I'm Jenn! I fell in love with everything spicy from an early age thanks to my Mom and her crazy tolerance.
            I absolutely adore trying new sauces and testing my limits, and I thought it would be fun to build a place for other heat seekers to do the same.
            If you have any questions, feedback, or just want to say hi, feel free to reach out via email to <a href="mailto:jenn@scorville.com">jenn@scorville.com</a>!
          </p>
        </div>
      </section>

      <section className="waitlist" id="waitlist">
        <div className="waitlist-copy">
          <p className="eyebrow light"><span /> Coming soon</p>
          <h2>Ready to<br />bring the heat?</h2>
          <p>Join the early list for first access, launch updates, and a chance to help shape Scorville.</p>
        </div>
        <form className="signup-card" onSubmit={handleSubmit}>
          <fieldset>
            <legend>I’m joining as a…</legend>
            <div className="audience-options">
              {(Object.keys(audienceLabels) as Audience[]).map((option) => (
                <button type="button" key={option} className={audience === option ? "active" : ""} onClick={() => setAudience(option)} aria-pressed={audience === option}>{audienceLabels[option]}</button>
              ))}
            </div>
          </fieldset>
          <label htmlFor="email">Email address</label>
          <div className="email-row">
            <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
            <button type="submit" disabled={status === "loading"}>{status === "loading" ? "Joining…" : "Join the list"} <span aria-hidden="true">→</span></button>
          </div>
          <p className={`form-status ${status}`} role="status">{message || "No spam. Just the good, spicy stuff."}</p>
        </form>
      </section>

      <footer><a className="brand footer-brand" href="#top"><span> SCORVILLE</span></a><p>Made for people who put hot sauce on everything.</p><p>© 2026 Scorville</p></footer>
    </main >
  );
}
