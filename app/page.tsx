import Link from "next/link";
import { Navbar } from "./components/landing/Navbar";
import { Hero } from "./components/landing/Hero";
import { Features } from "./components/landing/Features";
import { CTA } from "./components/landing/CTA";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}