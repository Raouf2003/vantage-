import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vantage Group | Where Vision Meets Engineering",
  description:
    "Vantage Group is a multi-disciplinary holding company operating at the intersection of digital technology, cinema production, and strategic investment.",
  keywords: [
    "Vantage Group",
    "holding company",
    "digital technology",
    "cinema production",
    "strategic investment",
  ],
  icons: {
    icon: "/images/Vantage.png",
  },
  openGraph: {
    title: "Vantage Group | Where Vision Meets Engineering",
    description:
      "A multi-disciplinary holding company operating at the intersection of digital technology, cinema production, and strategic investment.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#f8f8f6] text-[#161616]">
        {children}
      </body>
    </html>
  );
}
