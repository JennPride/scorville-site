"use client";

import { useCallback, useState, type SVGProps } from "react";
import { mdiFire } from "@mdi/js";

type Audience = "beta" | "brand" | "both";

function MdiIcon({ path, className, ...props }: SVGProps<SVGSVGElement> & { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d={path} />
    </svg>
  );
}

const audienceLabels: Record<Audience, string> = {
  beta: "Beta Tester",
  brand: "Sauce Brand",
  both: "Both",
};

const scores = [
  ["OVERALL", "8/10"],
  ["HEAT", "3/10"],
  ["FLAVOR", "7/10"],
  ["UNIQUENESS", "6/10"],
  ["VERSATILITY", "7/10"],
  ["BUY AGAIN", "Yes"],
];

const features = [
  ["01", "Discover", "Explore sauces by flavor, pepper, heat level, or the people you trust."],
  ["02", "Check in", "Rate every sauce you try and build a personal history of your heat journey."],
  ["03", "Connect", "Follow fellow heat seekers and discover the independent brands behind the bottle."],
];

const focusRing = "focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-scorville-yellow";

export default function Home() {
  const [audience, setAudience] = useState<Audience>("beta");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(async (event: any) => {
    console.log(event)
    console.log(email)
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, audience }),
    });
    const result = (await response.json()) as { message?: string };
    setStatus(response.ok ? "success" : "error");
    setMessage(result.message ?? (response.ok ? "You're on the list." : "Something went wrong. Please try again."));
    if (response.ok) {
      setEmail("");
    }
  }, [])

  return (
    <main className="overflow-hidden bg-scorville-bg text-scorville-text">
      <nav
        className="sticky top-0 z-100 flex min-h-21 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-scorville-border bg-scorville-bg/92 px-[clamp(22px,5vw,72px)] py-3 backdrop-blur-2xl min-[881px]:flex-nowrap min-[881px]:gap-6"
        aria-label="Main navigation"
      >
        <a
          className={`flex items-center whitespace-nowrap text-sm font-black tracking-[.11em] min-[521px]:text-lg ${focusRing}`}
          href="#top"
          aria-label="Scorville home"
        >
          SCORVILLE
        </a>
        <div
          className="order-3 flex w-full items-center justify-center gap-1 rounded-xl border border-scorville-border bg-scorville-surface p-1 min-[881px]:order-none min-[881px]:w-auto"
          aria-label="Jump to section"
        >
          {["Overview", "Features", "About"].map((label) => (
            <a
              key={label}
              className={`flex-1 rounded-lg px-[13px] py-2 text-center text-xs font-bold text-scorville-muted transition-colors hover:bg-scorville-surface-muted hover:text-scorville-text min-[881px]:flex-none ${focusRing}`}
              href={label === "Overview" ? "#top" : `#${label.toLowerCase()}`}
            >
              {label}
            </a>
          ))}
        </div>
        <a
          className={`rounded-xl border border-scorville-pink bg-scorville-pink px-3.5 py-2.5 text-[0] font-black whitespace-nowrap text-white transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(255,59,99,.25)] min-[521px]:px-[18px] min-[521px]:py-3 min-[521px]:text-[13px] ${focusRing}`}
          href="#waitlist"
        >
          Join the waitlist <span className="ml-0 text-[17px] min-[521px]:ml-2 min-[521px]:text-[13px]" aria-hidden="true">↘</span>
        </a>
      </nav>

      <section
        className="grid min-h-200 scroll-mt-33 grid-cols-1 overflow-hidden min-[881px]:scroll-mt-25 min-[881px]:grid-cols-[minmax(0,1fr)_minmax(450px,1fr)]"
        id="top"
      >
        <div className="px-[clamp(24px,6vw,88px)] pt-16.5 pb-17.5 min-[521px]:py-[clamp(80px,9vw,132px)]">
          <p className="mb-6 flex items-center gap-2.5 text-xs font-black tracking-[.11em] text-scorville-pink uppercase">
            <span className="h-0.5 w-6 bg-current" /> The community for heat seekers
          </p>
          <h1 className="font-display text-[clamp(60px,7vw,106px)] leading-[.94] font-black tracking-[-.045em]">
            Find your<br />next <em className="not-italic text-scorville-pink">favorite</em><br />hot sauce.
          </h1>
          <p className="my-[30px] max-w-125 text-[19px] leading-[1.55] text-scorville-muted">
            Track what you taste. Rate the burn. Discover sauces you’ll love—and compete against other pepper heads.
          </p>
          <a
            className={`inline-flex items-center gap-8.5 rounded-xl bg-scorville-pink px-5 py-4 text-xs font-black tracking-[.08em] text-white uppercase shadow-[0_12px_30px_rgba(255,59,99,.25)] transition-transform hover:-translate-y-0.5 ${focusRing}`}
            href="#waitlist"
          >
            Get Early Access <span aria-hidden="true">→</span>
          </a>
        </div>

        <div
          className="relative min-h-180 overflow-hidden border-t border-scorville-border bg-[radial-gradient(circle_at_50%_45%,#3a1d28_0,#25191f_50%,#171014_100%)] min-[521px]:min-h-197.5 min-[881px]:min-h-200 min-[881px]:border-t-0 min-[881px]:border-l"
          aria-label="Scorville app check-in preview"
        >
          <div className="absolute top-[4%] -right-[8%] h-80 w-80 rounded-full bg-scorville-pink/16 opacity-75 blur-[6px]" />
          <div className="absolute -bottom-[3%] -left-[4%] h-65 w-65 rounded-full bg-scorville-orange/12 opacity-75 blur-[6px]" />

          <div
            className="absolute top-[51%] left-1/2 h-168.5 w-[calc(100%-36px)] -translate-x-1/2 -translate-y-1/2 -rotate-1 overflow-hidden rounded-[31px] border border-scorville-border bg-scorville-bg px-[13px] pt-[13px] pb-16 shadow-[0_30px_70px_rgba(0,0,0,.45),0_0_0_8px_rgba(255,243,237,.03)] min-[521px]:h-183.5 min-[521px]:w-[min(420px,78%)] min-[521px]:rounded-[38px] min-[521px]:px-[18px] min-[521px]:pt-4 min-[521px]:pb-18"
            aria-hidden="true"
          >
            <div className="flex justify-between px-1 pb-2.5 text-[8px] font-black text-[#8c7b80]">
              <span>4:20</span><span>● 5G</span>
            </div>
            <div className="flex items-center justify-between gap-3.5 px-0.5 pb-[13px] min-[521px]:pb-4">
              <div>
                <span className="block text-[10px] font-black tracking-[.12em] text-scorville-pink">SCORVILLE</span>
                <h2 className="mt-[7px] mb-[5px] font-display text-[29px] leading-[.94] font-black tracking-[-.045em] min-[521px]:text-[33px]">Get Saucey</h2>
                <p className="m-0 text-[10px] font-bold text-scorville-muted min-[521px]:text-[11px]">Signed in as heatseeker</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-t-[17px] border-2 border-scorville-pink bg-scorville-surface">
              <div className="relative grid min-h-[119px] grid-cols-[62px_minmax(0,1fr)] gap-[11px] border-b border-scorville-border py-[13px] pr-14 pl-[13px] min-[521px]:min-h-[137px] min-[521px]:grid-cols-[72px_minmax(0,1fr)] min-[521px]:gap-3.5 min-[521px]:pt-[17px] min-[521px]:pr-17 min-[521px]:pb-4 min-[521px]:pl-[17px]">
                <div className="flex h-[93px] flex-col items-center justify-center overflow-hidden rounded-[13px] border border-dashed border-[#7a3348] bg-[repeating-linear-gradient(135deg,#302128_0,#302128_10px,#25191f_10px,#25191f_20px)] text-[#ff8fa6] min-[521px]:h-[105px]">
                  <span className="text-[10px] font-black tracking-[.1em]">PHOTO</span>
                  <small className="mt-[3px] text-[8px] text-scorville-muted">Replace me</small>
                </div>
                <div className="min-w-0">
                  <span className="block text-[9px] text-scorville-muted">@hurtssogood</span>
                  <strong className="block text-lg">Bird&apos;s eye</strong>
                  <span className="block text-[9px] font-black tracking-[.12em] text-scorville-pink min-[521px]">TRADER JOE&apos;S</span>
                  <span className="block text-[9px] text-scorville-muted">Rating</span>
                  <div className="flex text-scorville-orange">
                    <MdiIcon path={mdiFire} className="h-4 w-4" />
                    <MdiIcon path={mdiFire} className="h-4 w-4" />
                    <MdiIcon path={mdiFire} className="h-4 w-4" />
                    <MdiIcon path={mdiFire} className="h-4 w-4" />
                    <MdiIcon path={mdiFire} className="h-4 w-4" />
                  </div>
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[9px] font-bold text-scorville-muted">overall 8/10 · heat 3/10 · flavor 7/10</p>
                  <span className="block text-[10px] text-scorville-muted">7/31/2026</span>
                </div>
                <span className="absolute top-[13px] right-2 rounded-[10px] bg-[#421d2a] px-2 py-[7px] text-[10px] font-black text-[#ff9db1] min-[521px]:right-3 min-[521px]:px-[11px] min-[521px]:py-2">Close</span>
              </div>

              <div className="grid grid-cols-2 gap-[7px] p-3 min-[521px]:gap-[9px] min-[521px]:p-4">
                {scores.map(([label, value]) => (
                  <div key={label} className="min-h-13.5 rounded-xl bg-scorville-surface-muted px-[11px] py-[9px] min-[521px]:min-h-[61px] min-[521px]:px-[13px] min-[521px]:py-[11px]">
                    <span className="block text-[8px] font-black text-scorville-muted">{label}</span>
                    <strong className="mt-1 block text-base min-[521px]:text-lg">{value}</strong>
                  </div>
                ))}
              </div>

              <div className="px-3 pb-[11px] min-[521px]:px-4 min-[521px]:pb-3.5">
                <strong className="mb-[9px] block text-[13px]">Pairings</strong>
                <div className="flex gap-[7px]">
                  {["fish tacos", "seafood", "burritos"].map((pairing) => (
                    <span key={pairing} className="rounded-full border border-scorville-border px-2 py-[5px] text-[8px] font-black text-scorville-orange min-[521px]:px-[11px] min-[521px]:py-1.5 min-[521px]:text-[9px]">{pairing}</span>
                  ))}
                </div>
              </div>

              <div className="grid gap-1.5 px-3 pb-3 min-[521px]:gap-2 min-[521px]:px-4 min-[521px]:pb-[17px]">
                <span className="rounded-[11px] bg-scorville-pink p-[9px] text-center text-[13px] font-black text-white min-[521px]:p-[11px]">View Brand</span>
                <span className="rounded-[11px] bg-scorville-orange p-[9px] text-center text-[13px] font-black text-white min-[521px]:p-[11px]">View Sauce</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-33 overflow-hidden border-y border-scorville-border bg-scorville-surface min-[881px]:scroll-mt-25" aria-label="Scorville features">
        <div className="px-0 py-3.5 text-xs font-black tracking-[.14em] whitespace-nowrap text-scorville-muted [word-spacing:24px]">
          DISCOVER <span className="text-scorville-pink">✦</span> RATE <span className="text-scorville-pink">✦</span> TRACK <span className="text-scorville-pink">✦</span> SHARE <span className="text-scorville-pink">✦ COMPETE</span>
        </div>
      </section>

      <section className="scroll-mt-33 px-[clamp(24px,6vw,88px)] pt-22.5 pb-30 min-[881px]:scroll-mt-25 min-[881px]:pt-30" id="features">
        <div className="grid grid-cols-1 gap-4 min-[881px]:grid-cols-3">
          {features.map(([number, title, copy]) => (
            <article key={number} className="min-h-62.5 rounded-2xl border border-scorville-border bg-scorville-surface p-6.5 transition-[transform,border-color] hover:-translate-y-1 hover:border-scorville-pink min-[881px]:min-h-90">
              <span className="text-[10px] font-black text-scorville-muted">{number}</span>
              <div className="my-[18px] grid aspect-2/1 place-items-center rounded-xl border border-dashed border-[#7a3348] bg-[repeating-linear-gradient(135deg,#302128_0,#302128_12px,#25191f_12px,#25191f_24px)] text-[#ff8fa6]">
                <span className="text-[9px] font-black tracking-[.12em]">YOUR IMAGE</span>
              </div>
              <h3 className="mb-2.5 font-display text-[27px] font-black">{title}</h3>
              <p className="max-w-71.25 text-[15px] leading-[1.55] text-scorville-muted">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="grid scroll-mt-33 grid-cols-1 items-center gap-[clamp(50px,8vw,120px)] border-y border-scorville-border bg-scorville-surface px-[clamp(24px,6vw,88px)] py-27.5 min-[881px]:scroll-mt-25 min-[881px]:grid-cols-[minmax(300px,.78fr)_1.22fr]"
        id="about"
      >
        <div
          className="flex min-h-85 flex-col items-center justify-center rounded-[18px] border border-dashed border-[#7a3348] bg-[repeating-linear-gradient(135deg,#302128_0,#302128_16px,#25191f_16px,#25191f_32px)] text-[#ff8fa6] min-[521px]:min-h-105 min-[881px]:min-h-130"
          role="img"
          aria-label="Placeholder for a photograph of the creator"
        >
          <span className="text-[11px] font-black tracking-[.14em]">CREATOR PHOTO</span>
          <small className="mt-1.5 text-[10px] text-scorville-muted">Replace me</small>
        </div>
        <div>
          <p className="mb-6 flex items-center gap-2.5 text-xs font-black tracking-[.11em] text-scorville-pink uppercase">
            <span className="h-0.5 w-6 bg-current" /> About the creator
          </p>
          <h2 className="mb-7 font-display text-[clamp(52px,6vw,88px)] leading-[.94] font-black tracking-[-.045em]">Built by a fellow<br />hot sauce fanatic</h2>
          <p className="max-w-152.5 text-base leading-[1.65] text-scorville-muted min-[521px]:text-lg">
            Hello, I&apos;m Jenn! I fell in love with everything spicy from an early age thanks to my Mom and her crazy tolerance. I absolutely adore trying new sauces and testing my limits, and I thought it would be fun to build a place for other heat seekers to do the same. If you have any questions, feedback, or just want to say hi, feel free to reach out via email to{" "}
            <a className={`text-[#ff8fa6] underline decoration-scorville-border underline-offset-4 ${focusRing}`} href="mailto:jenn@scorville.com">jenn@scorville.com</a>!
          </p>
        </div>
      </section>

      <section
        className="grid scroll-mt-33 grid-cols-1 items-center gap-[8vw] border-b border-scorville-border bg-scorville-bg px-[clamp(24px,6vw,88px)] py-26.25 min-[881px]:scroll-mt-25 min-[881px]:grid-cols-[1fr_1.12fr]"
        id="waitlist"
      >
        <div>
          <p className="mb-6 flex items-center gap-2.5 text-xs font-black tracking-[.11em] text-scorville-pink uppercase"><span className="h-0.5 w-6 bg-current" /> Coming soon</p>
          <h2 className="font-display text-[clamp(58px,7vw,96px)] leading-[.94] font-black tracking-[-.045em]">Ready to<br />bring the heat?</h2>
          <p className="max-w-107.5 text-lg leading-[1.6] text-scorville-muted">Join the early list for first access, launch updates, and a chance to help shape Scorville.</p>
        </div>

        <div className="rounded-2xl border border-scorville-border bg-scorville-surface p-5.5 shadow-[0_24px_60px_rgba(0,0,0,.25)] min-[521px]:p-8" onSubmit={handleSubmit}>
          <div className="m-0 mb-7 border-0 p-0">
            <legend className="mb-[11px] block text-[10px] font-black tracking-[.12em] text-scorville-muted uppercase">I’m joining as a…</legend>
            <div className="grid grid-cols-1 gap-2 min-[521px]:grid-cols-3">
              {(Object.keys(audienceLabels) as Audience[]).map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`cursor-pointer rounded-[10px] border px-2 py-3 text-xs font-bold transition-colors ${focusRing} ${audience === option ? "border-scorville-pink bg-[#3a1d28] text-[#ff8fa6]" : "border-scorville-border bg-scorville-bg text-scorville-muted"}`}
                  onClick={() => setAudience(option)}
                  aria-pressed={audience === option}
                >
                  {audienceLabels[option]}
                </button>
              ))}
            </div>
          </div>

          <label className="mb-[11px] block text-[10px] font-black tracking-[.12em] text-scorville-muted uppercase" htmlFor="email">Email address</label>
          <div className="block gap-2.5 min-[521px]:flex">
            <input
              className={`min-w-0 w-full flex-1 rounded-xl border border-scorville-border bg-scorville-bg p-[15px] text-scorville-text placeholder:text-scorville-muted ${focusRing}`}
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button
              className={`mt-2.5 w-full cursor-pointer rounded-xl border-0 bg-scorville-pink px-5 py-[15px] font-black whitespace-nowrap text-white disabled:opacity-65 min-[521px]:mt-0 min-[521px]:w-auto ${focusRing}`}
              type="submit"
              disabled={status === "loading"}
              onClick={handleSubmit}
            >
              {status === "loading" ? "Joining…" : "Join the List"} <span className="ml-3" aria-hidden="true">→</span>
            </button>
          </div>
          <p
            className={`mt-[11px] min-h-4 text-[11px] ${status === "success" ? "font-bold text-scorville-success" : status === "error" ? "font-bold text-[#ff8fa6]" : "text-scorville-muted"}`}
            role="status"
          >
            {message || "No spam. Just the good, spicy stuff."}
          </p>
        </div>
      </section>

      <footer className="flex min-h-27 flex-col items-center justify-between gap-5 px-[clamp(24px,6vw,88px)] py-6 text-center text-[10px] font-bold tracking-[.08em] text-scorville-muted uppercase min-[521px]:flex-row min-[521px]:text-left">
        <a className={`flex items-center whitespace-nowrap text-lg font-black tracking-[.11em] text-scorville-text ${focusRing}`} href="#top">SCORVILLE</a>
        <p>Made for people who put hot sauce on everything.</p>
        <p>© 2026 Scorville</p>
      </footer>
    </main>
  );
}
