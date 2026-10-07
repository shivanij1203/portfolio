import type { Metadata } from "next";
import { Newsreader, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE = "https://shivani.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Shivani Jagannatham",
  description:
    "Software engineer across AI/ML, data, and backend. Java and Spring Boot at Verizon, now building production AI on AWS Bedrock.",
  openGraph: {
    title: "Shivani Jagannatham",
    description:
      "Software engineer across AI/ML, data, and backend. Java and Spring Boot at Verizon, now building production AI on AWS Bedrock.",
    url: SITE,
    siteName: "Shivani Jagannatham",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivani Jagannatham",
    description: "Software engineer across AI/ML, data, and backend.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // next/font declares its --font-* variables on whatever element carries these
    // classes. They must sit on <html> so the Tailwind @theme tokens on :root,
    // which reference them, can actually resolve.
    <html
      lang="en"
      className={`${newsreader.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
