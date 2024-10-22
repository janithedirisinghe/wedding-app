import type { Metadata } from "next";
import { Ruda, Indie_Flower, Satisfy, Poppins } from 'next/font/google';
import "../globals.css";

const indie = Indie_Flower({
  subsets: ["latin"],
  variable: "--font-indie",
  weight: "400",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: "400",
});

const ruda = Ruda({
  subsets: ["latin"],
  variable: "--font-ruda",
  weight: "400", // Choose the appropriate weight as per the Google Fonts page
});

const satisfy = Satisfy({
  subsets: ["latin"],
  variable: "--font-satisfy",
  weight: "400",
});

export const metadata: Metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body  className={`${indie.variable} ${ruda.variable} ${satisfy.variable} ${poppins.variable}`}>
        {children}
        </body>
    </html>
  )
}