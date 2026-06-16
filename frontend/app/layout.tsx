import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "🏆 EuphoriaSportz | Convertible Multi-Sport Turf Platform",
  description: "Experience the future of sports. FIFA-grade football turf that structurally converts into high-impact box cricket or basketball courts within seconds. Secure your slot instantly.",
  keywords: ["convertible turf", "sports complex booking", "football court booking", "box cricket slot", "basketball court reservation", "EuphoriaSportz"],
  authors: [{ name: "EuphoriaSportz Team" }],
  openGraph: {
    title: "🏆 EuphoriaSportz | Convertible Multi-Sport Turf Platform",
    description: "FIFA-grade football turf converting into box cricket or basketball courts within seconds.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} dark scroll-smooth`} suppressHydrationWarning>
      <body className="bg-[#060709] text-gray-100 min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <Suspense fallback={<div className="h-20 bg-[#060709] border-b border-white/5" />}>
          <Navbar />
        </Suspense>
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
