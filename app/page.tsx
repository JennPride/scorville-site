"use client";

import { useCallback, useState, type CSSProperties, type MouseEvent, type SVGProps } from "react";
import { mdiFire } from "@mdi/js";

type Audience = "beta" | "brand";

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
  beta: "For Users",
  brand: "For Brands",
};

const detailScores = [
  ["FLAVOR", "10/10"],
  ["UNIQUENESS", "6/10"],
  ["VERSATILITY", "7/10"],
];

const features = [
  ["01", "Discover", "Explore sauces by flavor, pepper, brand, heat level, or folks with similar taste."],
  ["02", "Check In", "Rate every sauce you try and build a personal history of your heat journey."],
  ["03", "Connect", "Follow fellow heat seekers and discover the independent brands behind the bottle."],
];

const brandBenefits = [
  ["01", "Own your presence", "Claim your brand profile, keep sauce details accurate, and give heat seekers a trusted place to explore your lineup."],
  ["02", "Learn what lands", "See how people score flavor, heat, versatility, and repeat-purchase intent—feedback you can actually use."],
  ["03", "Utilize new features", "Scorville is just getting started. Join the listserve to be among the first to try new features and programs as they roll out."],
];

const tickerItems = ["DISCOVER", "RATE", "TRACK", "SHARE", "COMPETE"];

const tickerLoopItems = Array.from({ length: 4 }, (_, repeat) =>
  tickerItems.map((label) => ({ label, key: `${repeat}-${label}` })),
).flat();

const focusRing = "focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-scorville-yellow";


export default function Home() {
  const expanded = true;
  const wouldBuyAgain = true;
  const buyAgainColor = wouldBuyAgain ? "var(--color-scorville-buy-again)" : "var(--color-scorville-pink)";
  const [audience, setAudience] = useState<Audience>("beta");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEarlyAccessSubmit = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
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
  }, [email, audience]);

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
          <img src="/images/logo_flame.png" alt="Scorville" className="h-8 pb-1.5" /> SCORVILLE
        </a>
        <div
          className="order-3 flex w-full items-center justify-center gap-1 rounded-xl border border-scorville-border bg-scorville-surface p-1 min-[881px]:order-none min-[881px]:w-auto"
          aria-label="Jump to section"
        >
          {["Overview", "Features", "For Brands", "About"].map((label) => (
            <a
              key={label}
              className={`flex-1 rounded-lg px-[13px] py-2 text-center text-xs font-bold text-scorville-muted transition-colors hover:bg-scorville-surface-muted hover:text-scorville-text min-[881px]:flex-none ${focusRing}`}
              href={label === "Overview" ? "#top" : label === "For Brands" ? "#brands" : `#${label.toLowerCase()}`}
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
            aria-label="Scorville collapsed and expanded review card previews"
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
              <img className="h-10 w-10 shrink-0 rounded-full border-2 border-scorville-pink object-cover shadow-[0_5px_16px_rgba(255,59,99,.22)] min-[521px]:h-11 min-[521px]:w-11" src="/images/me.jpg" alt="Profile picture for the signed-in user" />
            </div>

            <div className="grid gap-2.5">
              <article className="overflow-hidden rounded-[15px] border-2 border-scorville-pink bg-scorville-surface shadow-[0_10px_24px_rgba(0,0,0,.2)]">
                <div className={`grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-2.5 p-2.5 min-[521px]:gap-3 min-[521px]:p-3 ${expanded ? "border-b border-scorville-border" : ""}`}>
                  <img className="h-full min-h-[116px] w-full rounded-[11px] border border-[#7a3348] object-cover min-[521px]:min-h-[128px]" src="/images/checkin.png" alt="The Last Dab XXX hot sauce bottle" />

                  <div className="min-w-0">
                    <span className="block text-[8px] text-scorville-muted">@hurtssogood</span>
                    <strong className="block font-display text-[14px] leading-[1.05] min-[521px]:text-base">The Last Dab XXX</strong>
                    <span className="mt-0.5 block text-[7px] font-black tracking-[.08em] text-scorville-pink min-[521px]:text-[8px]">TRADER JOE&apos;S <span className="tracking-normal text-scorville-muted">· 7/31/2026</span></span>

                    <div className="mt-1.5 grid grid-cols-[minmax(0,1fr)_78px] items-end gap-2 min-[521px]:grid-cols-[minmax(0,1fr)_88px]">
                      <div className="min-w-0">
                        <span className="block text-[6px] font-black tracking-[.08em] text-scorville-muted">OVERALL</span>
                        <strong className="block text-xl leading-none min-[521px]:text-[23px]">8/10</strong>
                        <div className="mt-1 flex text-scorville-orange" aria-label="Heat level 9 out of 10, very hot">
                          {[0, 1, 2, 3, 4].map((flame) => <MdiIcon key={flame} path={mdiFire} className="h-3 w-3 min-[521px]:h-3.5 min-[521px]:w-3.5" />)}
                        </div>
                        <span className="block text-[7px] font-black text-scorville-orange">VERY HOT · 9/10</span>
                        <span className="mt-1 block truncate text-[7px] font-bold text-scorville-muted">Reviewer avg 7.8/10</span>
                      </div>
                      <div
                        className="rounded-[10px] border-2 bg-scorville-bg/70 px-1.5 py-2 text-center"
                        style={{ borderColor: buyAgainColor, boxShadow: `0 4px 14px ${buyAgainColor}47` } as CSSProperties}
                      >
                        <span className="block text-[6px] leading-tight font-black text-scorville-text">WOULD BUY AGAIN</span>
                        <strong className="mt-0.5 block text-[22px] leading-none" style={{ color: buyAgainColor }}>{wouldBuyAgain ? "YES" : "NO"}</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <blockquote className="border-b border-scorville-border px-3 py-2 font-display text-[11px] leading-[1.3] min-[521px]:text-xs">
                    <span className="mr-1 text-scorville-pink">“</span>Smoky up front, then a slow-building heat with a bright citrus finish.<span className="text-scorville-pink">”</span>
                  </blockquote>

                  <div className="grid grid-cols-3 gap-1.5 p-2.5 min-[521px]:gap-2 min-[521px]:p-3">
                    {detailScores.map(([label, value]) => (
                      <div key={label} className="rounded-lg border border-scorville-border bg-scorville-surface-muted p-1.5 text-center min-[521px]:p-2">
                        <span className="block text-[6px] font-black text-scorville-muted">{label}</span>
                        <strong className="mt-0.5 block text-xs min-[521px]:text-sm">{value}</strong>
                      </div>
                    ))}
                  </div>

                  <div className="px-2.5 pb-2.5 min-[521px]:px-3">
                    <strong className="mb-1.5 block text-[9px]">Pairings</strong>
                    <div className="flex gap-1.5">
                      {["fish tacos", "seafood", "burritos"].map((pairing) => (
                        <span key={pairing} className="rounded-full border border-scorville-border px-2 py-0.5 text-[7px] font-black text-scorville-orange">{pairing}</span>
                      ))}
                    </div>
                  </div>
                  <nav className="grid grid-cols-2 gap-1.5 border-t border-scorville-border px-2.5 py-2 min-[521px]:px-3" aria-label="Review card actions">
                    <a className={`rounded-lg bg-scorville-pink p-1.5 text-center text-[9px] font-black text-white transition-opacity hover:opacity-90 ${focusRing}`} href="#about">View Brand</a>
                    <a className={`rounded-lg bg-scorville-orange p-1.5 text-center text-[9px] font-black text-white transition-opacity hover:opacity-90 ${focusRing}`} href="#features">View Sauce</a>
                  </nav>
                </div>
              </article>
              <article className="overflow-hidden rounded-[15px] border-2 border-scorville-pink bg-scorville-surface shadow-[0_10px_24px_rgba(0,0,0,.2)]">
                <div className={`grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-2.5 p-2.5 min-[521px]:gap-3 min-[521px]:p-3 ${expanded ? "border-b border-scorville-border" : ""}`}>
                  <img className="h-full min-h-[116px] w-full rounded-[11px] border border-[#7a3348] object-cover min-[521px]:min-h-[128px]" src="/images/checkin.png" alt="The Last Dab XXX hot sauce bottle" />

                  <div className="min-w-0">
                    <span className="block text-[8px] text-scorville-muted">@heatseaker</span>
                    <strong className="block font-display text-[14px] leading-[1.05] min-[521px]:text-base">Hell's Kitchen Habanero Hot Sauce</strong>
                    <span className="mt-0.5 block text-[7px] font-black tracking-[.08em] text-scorville-pink min-[521px]:text-[8px]">Grandy Greenhouse & Farm Market<span className="tracking-normal text-scorville-muted">· 7/31/2026</span></span>

                    <div className="mt-1.5 grid grid-cols-[minmax(0,1fr)_78px] items-end gap-2 min-[521px]:grid-cols-[minmax(0,1fr)_88px]">
                      <div className="min-w-0">
                        <span className="block text-[6px] font-black tracking-[.08em] text-scorville-muted">OVERALL</span>
                        <strong className="block text-xl leading-none min-[521px]:text-[23px]">9/10</strong>
                        <div className="mt-1 flex text-scorville-orange" aria-label="Heat level 7 out of 10, hot">
                          {[0, 1, 2, 3, 4].map((flame) => <MdiIcon key={flame} path={mdiFire} className="h-3 w-3 min-[521px]:h-3.5 min-[521px]:w-3.5" />)}
                        </div>
                        <span className="block text-[7px] font-black text-scorville-orange">HOT · 6/10</span>
                        <span className="mt-1 block truncate text-[7px] font-bold text-scorville-muted">Reviewer avg 8.2/10</span>
                      </div>
                      <div
                        className="rounded-[10px] border-2 bg-scorville-bg/70 px-1.5 py-2 text-center"
                        style={{ borderColor: buyAgainColor, boxShadow: `0 4px 14px ${buyAgainColor}47` } as CSSProperties}
                      >
                        <span className="block text-[6px] leading-tight font-black text-scorville-text">WOULD BUY AGAIN</span>
                        <strong className="mt-0.5 block text-[22px] leading-none" style={{ color: buyAgainColor }}>{wouldBuyAgain ? "YES" : "NO"}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section
        className="overflow-hidden border-y border-scorville-border bg-scorville-surface"
        aria-label="Discover, rate, track, share, and compete"
      >
        <div className="flex w-max animate-ticker py-3.5 text-xs font-black tracking-[.14em] text-scorville-muted will-change-transform motion-reduce:animate-none" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-6 pr-6">
              {tickerLoopItems.map((item) => (
                <span key={item.key} className="flex items-center gap-6 whitespace-nowrap">
                  <span className="text-scorville-pink">✦</span>
                  {item.label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="scroll-mt-33 px-[clamp(24px,6vw,88px)] pb-30 min-[881px]:scroll-mt-25 min-[881px]:pt-30" id="features">
        <div className="grid grid-cols-1 gap-4 min-[881px]:grid-cols-3">
          {features.map(([number, title, copy]) => (
            <article key={number} className="min-h-62.5 rounded-2xl border border-scorville-border bg-scorville-surface p-6.5 transition-[transform,border-color] hover:-translate-y-1 hover:border-scorville-pink min-[881px]:min-h-90">
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
        className="relative scroll-mt-33 overflow-hidden border-y border-scorville-border bg-scorville-surface px-[clamp(24px,6vw,88px)] py-24 min-[881px]:scroll-mt-25 min-[881px]:py-30"
        id="brands"
      >
        <div className="pointer-events-none absolute -top-36 -right-28 h-96 w-96 rounded-full bg-scorville-pink/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-scorville-orange/8 blur-3xl" />

        <div className="relative mx-auto max-w-360">
          <div className="grid grid-cols-1 items-end gap-8 min-[881px]:grid-cols-[1.15fr_.85fr] min-[881px]:gap-16">
            <div>
              <p className="mb-6 flex items-center gap-2.5 text-xs font-black tracking-[.11em] text-scorville-pink uppercase">
                <span className="h-0.5 w-6 bg-current" /> For sauce brands
              </p>
              <h2 className="font-display text-[clamp(52px,6vw,88px)] leading-[.94] font-black tracking-[-.045em]">
                Put your sauces in front of people who <em className="not-italic text-scorville-pink">crave</em> the burn
              </h2>
            </div>
            <div>
              <p className="mb-6 text-base leading-[1.65] text-scorville-muted min-[521px]:text-lg">
                Scorville helps independent makers turn real tasting experiences into discovery, useful feedback, and lasting customer relationships.
              </p>
              <a
                className={`inline-flex items-center gap-7 rounded-xl bg-scorville-pink px-5 py-4 text-xs font-black tracking-[.08em] text-white uppercase shadow-[0_12px_30px_rgba(255,59,99,.22)] transition-transform hover:-translate-y-0.5 ${focusRing}`}
                href="#waitlist"
                onClick={() => setAudience("brand")}
              >
                Join as a brand <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 min-[881px]:mt-18 min-[881px]:grid-cols-3">
            {brandBenefits.map(([number, title, copy]) => (
              <article key={number} className="rounded-2xl border border-scorville-border bg-scorville-bg/70 p-6 transition-[transform,border-color] hover:-translate-y-1 hover:border-scorville-pink min-[521px]:p-7">
                <h3 className="mb-3 font-display text-[27px] leading-tight font-black">{title}</h3>
                <p className="text-[15px] leading-[1.6] text-scorville-muted">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="grid scroll-mt-33 grid-cols-1 items-center gap-[clamp(50px,8vw,120px)] border-y border-scorville-border bg-scorville-surface px-[clamp(24px,6vw,88px)] py-27.5 min-[881px]:scroll-mt-25 min-[881px]:grid-cols-[minmax(300px,.78fr)_1.22fr]"
        id="about"
      >
        <div
          className="flex min-h-85 flex-col items-center justify-center"
        >
          <img className="mt-2.5 h-[300px] w-[300px] rounded-full border border-scorville-pink object-cover" src="/images/me.jpg" alt="Photograph of the creator, Jenn" />
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
          <p className="mb-6 flex items-center gap-2.5 text-xs font-black tracking-[.11em] text-scorville-pink uppercase"><span className="h-0.5 w-6 bg-current" /> Keep in touch</p>
          <h2 className="font-display text-[clamp(58px,7vw,96px)] leading-[.94] font-black tracking-[-.045em]">
            <>Ready to<br />bring the heat?</>
          </h2>
        </div>

        <div className="rounded-2xl border border-scorville-border bg-scorville-surface p-5.5 shadow-[0_24px_60px_rgba(0,0,0,.25)] min-[521px]:p-8">
          <div className="mb-7 rounded-xl border border-scorville-border bg-scorville-bg p-1" role="group" aria-label="Choose signup updates">
            <div className="grid grid-cols-2 gap-1">
              {(Object.keys(audienceLabels) as Audience[]).map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`cursor-pointer rounded-lg px-3 py-3 text-xs font-black transition-colors ${focusRing} ${audience === option ? "bg-scorville-pink text-white shadow-[0_6px_18px_rgba(255,59,99,.2)]" : "text-scorville-muted hover:bg-scorville-surface-muted hover:text-scorville-text"}`}
                  onClick={() => {
                    setAudience(option);
                    setStatus("idle");
                    setMessage("");
                  }}
                  aria-pressed={audience === option}
                >
                  {audienceLabels[option]}
                </button>
              ))}
            </div>
          </div>

          <p className="mb-5 text-sm leading-[1.55] text-scorville-muted">
            {audience === "beta"
              ? "Get invitations to our beta program, early feature previews, and first-launch alerts."
              : "Get brand feature news, early program invitations, and partnership opportunities."}
          </p>

          <label className="mb-[11px] block text-[10px] font-black tracking-[.12em] text-scorville-muted uppercase" htmlFor="signup-email">Email address</label>
          <div className="block gap-2.5 min-[521px]:flex">
            <input
              className={`min-w-0 w-full flex-1 rounded-xl border border-scorville-border bg-scorville-bg p-[15px] text-scorville-text placeholder:text-scorville-muted ${focusRing}`}
              id="signup-email"
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
              disabled={status === "loading" || !email}
              onClick={handleEarlyAccessSubmit}
            >
              {status === "loading" ? "Joining…" : "Join"} <span className="ml-3" aria-hidden="true">→</span>
            </button>
          </div>
          <p
            className={`mt-[11px] min-h-4 text-[11px] ${status === "success" ? "font-bold text-scorville-success" : status === "error" ? "font-bold text-[#ff8fa6]" : "text-scorville-muted"}`}
            role="status"
          >
            {message || (audience === "beta" ? "Beta news and launch alerts only." : "Feature news and worthwhile opportunities only.")}
          </p>
        </div>
      </section>

      <footer className="flex min-h-27 flex-col items-center justify-between gap-5 px-[clamp(24px,6vw,88px)] py-6 text-center text-[10px] font-bold tracking-[.08em] text-scorville-muted uppercase min-[521px]:flex-row min-[521px]:text-left">
        <a className={`flex items-center whitespace-nowrap text-lg font-black tracking-[.11em] text-scorville-text ${focusRing}`} href="#top">
          <img src="/images/logo_flame.png" alt="Scorville" className="h-8 pb-1.5" /> SCORVILLE
        </a>
        <p>Made for people who put hot sauce on everything.</p>
        <p>© 2026 Scorville</p>
      </footer>
    </main >
  );
}
