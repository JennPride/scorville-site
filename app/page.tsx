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
          <span className="brand-mark" aria-hidden="true">S</span>
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

        <div className="hero-art" aria-label="Scorville app preview">
          <div className="glow glow-one" />
          <div className="glow glow-two" />
          <div className="phone-preview">
            <div className="phone-top"><span className="mini-mark">S</span><span>SCORVILLE</span><b>•••</b></div>
            <div className="phone-kicker">TRENDING THIS WEEK</div>
            <h2>Find your fire.</h2>
            <div className="sauce-preview">
              <div className="image-placeholder sauce-image-placeholder" role="img" aria-label="Placeholder for a hot sauce image">
                <span>IMAGE</span>
                <small>Replace me</small>
              </div>
              <div><span className="sauce-brand">HEAT SEEKER CO.</span><strong>Cherry Bomb</strong><p>Smoky • Tangy • Hot</p><div className="pepper-rating">● ● ● ● ○</div></div>
            </div>
            <div className="phone-stats"><span><b>4.8</b>RATING</span><span><b>1.2k</b>CHECK-INS</span><span><b>Hot</b>HEAT</span></div>
          </div>
          <div className="floating-card taste-card"><span>TASTE PROFILE</span><strong>Smoky + bright</strong><div><i /><i /><i /><i /></div></div>
          <div className="floating-card checkin-card"><span>NEW CHECK-IN</span><strong>🔥 +24 today</strong></div>
        </div>
      </section>

      <section className="marquee" aria-label="Scorville features">
        <div>DISCOVER <span>✦</span> RATE <span>✦</span> TRACK <span>✦</span> SHARE <span>✦</span> DISCOVER <span>✦</span> RATE</div>
      </section>

      <section className="features" id="features">
        <div className="section-heading">
          <p className="eyebrow"><span /> One place for every sauce</p>
          <h2>Know your heat.<br />Share your taste.</h2>
        </div>
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
          <h2>Built by a fellow<br />heat seeker.</h2>
          <p>Scorville is an independent project created from a simple idea: discovering and remembering great hot sauce should be easier, more social, and a lot more fun.</p>
          <p>I’m building a place where curious tasters and passionate makers can meet—one bottle, one check-in, and one very spicy recommendation at a time.</p>
          <div className="creator-tags"><span>Independent creator</span><span>Product builder</span><span>Hot sauce fan</span></div>
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

      <footer><a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true">S</span><span>SCORVILLE</span></a><p>Made for people who put hot sauce on everything.</p><p>© 2026 Scorville</p></footer>
    </main>
  );
}
