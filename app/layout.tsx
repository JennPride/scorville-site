import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scorville — Find Your Next Favorite Hot Sauce",
  description: "Track what you taste, rate the burn, and discover hot sauces you'll love. Join the Scorville beta waitlist.",
  openGraph: { title: "Scorville — Bring the Heat", description: "Discover, rate, and track your favorite hot sauces." },
  twitter: { card: "summary", title: "Scorville — Bring the Heat", description: "Discover, rate, and track your favorite hot sauces." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
