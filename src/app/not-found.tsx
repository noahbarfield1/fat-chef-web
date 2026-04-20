"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center bg-[#070707] px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl text-center"
      >
        <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-[#C5A059] mb-4">
          Error 404
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#F0EBE1] mb-6 leading-tight">
          Page Not <em className="not-italic" style={{ color: "#C5A059" }}>Found</em>
        </h1>
        <div className="w-16 h-px mx-auto my-8" style={{ background: "rgba(197,160,89,0.4)" }} />
        <p className="font-sans text-[15px] leading-relaxed mb-10" style={{ color: "#8A7E6E" }}>
          We couldn&apos;t find the page you&apos;re looking for. It may have been moved, or the link may be broken. 
          Let&apos;s get you back to our menu of prime steaks and fresh seafood.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Link
            href="/"
            className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase px-10 py-4 bg-[#C5A059] text-[#070707] hover:bg-[#E6C875] transition-colors duration-300 text-center"
          >
            Return Home
          </Link>
          <Link
            href="/menu"
            className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase px-10 py-4 border border-[rgba(197,160,89,0.4)] text-[#C5A059] hover:bg-[rgba(197,160,89,0.08)] transition-all duration-300 text-center"
          >
            Explore Menu
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
