import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hacker's Paradise - Master Cybersecurity & Ethical Hacking",
  description: "Learn ethical hacking, penetration testing, and cybersecurity through hands-on courses, bug bounties, and real-world labs. Join 50K+ security professionals.",
  keywords: [
    "cybersecurity",
    "ethical hacking",
    "penetration testing",
    "bug bounty",
    "security training",
    "cyber security courses",
    "hacking tutorials",
    "security certifications",
    "CTF challenges",
    "security labs"
  ],
  authors: [{ name: "Hacker's Paradise Team" }],
  creator: "Hacker's Paradise",
  publisher: "Hacker's Paradise",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hackersparadise.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Hacker's Paradise - Master Cybersecurity & Ethical Hacking",
    description: "Learn ethical hacking, penetration testing, and cybersecurity through hands-on courses, bug bounties, and real-world labs.",
    url: 'https://hackersparadise.com',
    siteName: "Hacker's Paradise",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Hacker's Paradise - Cybersecurity Learning Platform",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hacker's Paradise - Master Cybersecurity & Ethical Hacking",
    description: "Learn ethical hacking, penetration testing, and cybersecurity through hands-on courses, bug bounties, and real-world labs.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
