import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";

import { Onest, Oi, Bricolage_Grotesque } from 'next/font/google'

const onest = Onest({ subsets: ['latin'], variable: '--font-onest' })
const oi = Oi({ subsets: ['latin'], weight: '400', variable: '--font-oi' })
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: ['400', '700', '800'], variable: '--font-bricolage' })

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${onest.variable} ${oi.variable} ${bricolage.variable}`}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}