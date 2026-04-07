"use client";
import LuxImage from "./primitives/LuxImage";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], display: "swap" });

// ── Hero video (served from GCS on desktop, compressed local on mobile) ──
const VIDEO_SRC = "https://storage.googleapis.com/fat-chef-assets/videos/fat-chef-hero.mp4";
const VIDEO_MOBILE = "/videos/fat-chef-hero-mobile.mp4";
// ────────────────────────────────────────────────

const BG = "/post-pics/candle-red-ambiance-muted.jpg";

function Char({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.span
      initial={{ y: "115%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block"
    >
      {char}
    </motion.span>
  );
}

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  // Initialise from matchMedia synchronously to avoid a layout flash.
  // useState initializer runs once on mount so this is safe (no cascading setState).
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    // Only subscribe for changes — initial value already handled above
    const fn = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  // Only run parallax on desktop — scroll transforms cause major jank on mobile
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgYDesktop  = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const fadeDesktop = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const moveYDesktop = useTransform(scrollYProgress, [0, 0.5], ["0%", "10%"]);

  // Static values for mobile (no parallax)
  const bgY   = isMobile ? "0%" : bgYDesktop;
  const fade  = isMobile ? 1    : fadeDesktop;
  const moveY = isMobile ? "0%" : moveYDesktop;

  return (
    <section ref={ref} id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#030303]" aria-label="Welcome to The Fat Chef">

      {/* Letterbox open — desktop only, too heavy for mobile composite layers */}
      {!isMobile && (
        <>
          <motion.div initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 1.3, delay: 0.15, ease: [0.76,0,0.24,1] }} style={{ originY: 0 }} className="absolute top-0 inset-x-0 h-[12vh] bg-[#030303] z-30 pointer-events-none" aria-hidden="true" />
          <motion.div initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 1.3, delay: 0.15, ease: [0.76,0,0.24,1] }} style={{ originY: 1 }} className="absolute bottom-0 inset-x-0 h-[12vh] bg-[#030303] z-30 pointer-events-none" aria-hidden="true" />
        </>
      )}

      {/* Background — video on desktop, static image on mobile */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-[1.04]">
        <video
          src={isMobile ? VIDEO_MOBILE : VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload={isMobile ? "metadata" : "auto"}
          poster={BG}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[rgba(3,3,3,0.5)] to-[rgba(3,3,3,0.2)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(3,3,3,0.4)] via-transparent to-[rgba(3,3,3,0.4)]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(3,3,3,0.6) 100%)" }} />
      </motion.div>

      {/* Gold scan line — desktop only */}
      {!isMobile && (
        <motion.div initial={{ scaleX: 0, opacity: 1 }} animate={{ scaleX: 1, opacity: 0 }} transition={{ duration: 1.1, delay: 1.4, ease: [0.16,1,0.3,1] }} style={{ originX: 0 }} className="absolute top-1/2 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent z-20 pointer-events-none" aria-hidden="true" />
      )}

      {/* Content */}
      <motion.div style={{ opacity: fade, y: moveY }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: isMobile ? 0.2 : 0.9 }} className="flex items-center justify-center gap-4 mb-10">
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: isMobile ? 0.3 : 1.05 }} style={{ originX: 1 }} className="block h-px w-12 bg-[rgba(197,160,89,0.65)]" />
          <span className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase text-[#C5A059]">Rogers, Arkansas · Fine Dining</span>
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: isMobile ? 0.3 : 1.05 }} style={{ originX: 0 }} className="block h-px w-12 bg-[rgba(197,160,89,0.65)]" />
        </motion.div>

        {/* Title — per-letter on desktop, word-level fade on mobile (much lighter) */}
        {isMobile ? (
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-black leading-[0.95] tracking-tight text-[#F0EBE1] mb-4"
            style={{ fontSize: "clamp(56px,14vw,96px)" }}
          >
            The Fat Chef
          </motion.h1>
        ) : (
          <h1 className="font-serif font-black leading-[0.95] tracking-tight text-[#F0EBE1] mb-4" style={{ fontSize: "clamp(56px,10vw,110px)" }}>
            <span className="block overflow-hidden">
              {"The ".split("").map((c, i) => <Char key={i} char={c} delay={1.1 + i * 0.045} />)}
            </span>
            <span className="block overflow-hidden">
              {"Fat".split("").map((c, i) => <Char key={i} char={c === " " ? "\u00a0" : c} delay={1.3 + i * 0.05} />)}{" "}
              {"Chef".split("").map((c, i) => <span key={i} className="inline-flex overflow-hidden"><Char char={c} delay={1.48 + i * 0.05} /></span>)}
            </span>
          </h1>
        )}

        {/* Animated Cursive Quote */}
        <motion.div
          initial={{ clipPath: "inset(-20% 100% -20% -20%)", opacity: 0 }}
          animate={{ clipPath: "inset(-20% -20% -20% -20%)", opacity: 1 }}
          transition={{ duration: isMobile ? 1.2 : 2.4, delay: isMobile ? 0.55 : 1.8, ease: "easeInOut" }}
          className={`text-4xl md:text-5xl lg:text-[64px] text-[#FFEDBA] -mt-2 mb-4 flex justify-center text-center w-full relative z-20 ${greatVibes.className}`}
          style={{
            lineHeight: "1.3",
            paddingRight: "10px",
            textShadow: "0 0 12px rgba(255,237,186,0.7), 0 0 24px rgba(197,160,89,0.5), 2px 4px 10px rgba(0,0,0,0.9)"
          }}
        >
          Never trust a skinny chef&nbsp;
        </motion.div>

        {/* Divider */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: isMobile ? 0.7 : 1.9 }} className="w-20 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-7" aria-hidden="true" />

        {/* Tagline */}
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: isMobile ? 0.8 : 2.05 }} className="font-serif italic text-[#C5A059] mb-12 leading-relaxed" style={{ fontSize: "clamp(14px,2vw,19px)" }}>
          USDA Prime Steaks &nbsp;·&nbsp; Fresh Seafood &nbsp;·&nbsp; Handcrafted Cuisine
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: isMobile ? 0.95 : 2.25 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/reservations" className="font-sans text-xs font-bold tracking-[0.2em] uppercase px-12 py-4 bg-[#C5A059] text-[#030303] hover:bg-[#E6C875] transition-colors duration-300 min-w-[210px] text-center">Reserve a Table</Link>
          <Link href="/menu" className="font-sans text-xs font-semibold tracking-[0.2em] uppercase px-12 py-4 border border-[rgba(197,160,89,0.45)] text-[#E6C875] hover:bg-[rgba(197,160,89,0.08)] transition-all duration-300 min-w-[210px] text-center">View Our Menu</Link>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: isMobile ? 1.1 : 2.6 }} className="mt-12 font-sans text-[11px] tracking-[0.2em] uppercase text-[#5A4E40]">
          Wednesday – Saturday &nbsp;·&nbsp; 5:00 PM – 9:00 PM
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: isMobile ? 1.3 : 3, duration: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#5A4E40]">Scroll</span>
        <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-px h-10 bg-gradient-to-b from-[rgba(197,160,89,0.6)] to-transparent" />
      </motion.div>
    </section>
  );
}
