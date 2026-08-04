import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scorville — Find Your Next Favorite Hot Sauce",
  description: "Track what you taste, rate the burn, and discover hot sauces you'll love. Join the Scorville beta waitlist.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Scorville — Bring the Heat", description: "Discover, rate, and track your favorite hot sauces.", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Scorville — Find your next favorite hot sauce" }] },
  twitter: { card: "summary_large_image", title: "Scorville — Bring the Heat", description: "Discover, rate, and track your favorite hot sauces.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
