"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

// ─── DROP YOUR GEMINI VIDEO URL HERE ────────────────────────────────────────
const VIDEO_SRC = "/videos/fat-chef-hero.mp4"; // e.g. "/videos/fat-chef-intro.mp4" or a hosted URL
// ────────────────────────────────────────────────────────────────────────────

const FALLBACK_IMG =
  "https://static.wixstatic.com/media/019c1a_a4ea7513132c4145933f7cac161a41ce~mv2.jpg/v1/fill/w_1920,h_1043,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/019c1a_a4ea7513132c4145933f7cac161a41ce~mv2.jpg";

/* Splits a word into individually animated letters */
function AnimatedWord({ word, delay = 0 }: { word: string; delay?: number }) {
  return (
    <span className="inline-flex overflow-hidden">
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.045,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [curtainDone, setCurtainDone] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], ["0%", "12%"]);

  // When video loads, mark ready
  useEffect(() => {
    if (!VIDEO_SRC) { setVideoReady(false); return; }
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => setVideoReady(true);
    v.addEventListener("canplay", onReady);
    return () => v.removeEventListener("canplay", onReady);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-screen min-h-[720px] flex items-center justify-center overflow-hidden bg-[#030303]"
      aria-label="The Fat Chef — Welcome"
    >
      {/* ── Cinematic top & bottom letterbox bars ── */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => setCurtainDone(true)}
        style={{ originY: 0 }}
        className="absolute top-0 left-0 right-0 h-[12vh] bg-[#030303] z-30 pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        style={{ originY: 1 }}
        className="absolute bottom-0 left-0 right-0 h-[12vh] bg-[#030303] z-30 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Background: video (if provided) or parallax image ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-[1.08]">
        {VIDEO_SRC ? (
          <>
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Fade image out once video is ready */}
            <AnimatePresence>
              {!videoReady && (
                <motion.div
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0"
                >
                  <Image src={FALLBACK_IMG} alt="" fill className="object-cover" priority sizes="100vw" />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Image
            src={FALLBACK_IMG}
            alt="The Fat Chef restaurant interior — warm log cabin fine dining"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}

        {/* Overlay layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[rgba(3,3,3,0.52)] to-[rgba(3,3,3,0.22)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(3,3,3,0.45)] via-transparent to-[rgba(3,3,3,0.45)]" />
        {/* Vignette */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(3,3,3,0.65) 100%)"
        }} />
      </motion.div>

      {/* ── Animated gold scan line ── */}
      <AnimatePresence>
        {curtainDone && (
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent z-20 pointer-events-none"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Main content ── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Eyebrow — fade in */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.28em" }}
          transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 1 }}
            className="block h-px w-14 bg-[rgba(197,160,89,0.7)]"
          />
          <span className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase text-[#C5A059]">
            Rogers, Arkansas &nbsp;·&nbsp; Fine Dining
          </span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="block h-px w-14 bg-[rgba(197,160,89,0.7)]"
          />
        </motion.div>

        {/* Headline — per-letter reveal */}
        <h1
          className="font-serif font-black leading-[0.95] tracking-tight text-[#F0EBE1] mb-4"
          style={{ fontSize: "clamp(58px, 10vw, 112px)" }}
        >
          <span className="block">
            <AnimatedWord word="The" delay={1.1} />
            {" "}
            <span className="inline-flex overflow-hidden">
              {["F","a","t"].map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.9, delay: 1.1 + (3 + i) * 0.045, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block gold-text"
                >
                  {c}
                </motion.span>
              ))}
            </span>
          </span>
          <span className="block">
            <AnimatedWord word="Chef" delay={1.38} />
          </span>
        </h1>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-7"
          aria-hidden="true"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.05, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-[#C5A059] mb-12 leading-relaxed"
          style={{ fontSize: "clamp(15px, 2.2vw, 20px)" }}
        >
          USDA Prime Steaks &nbsp;·&nbsp; Fresh Seafood &nbsp;·&nbsp; Handcrafted Cuisine
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#reservations"
            className="font-sans text-xs font-bold tracking-[0.2em] uppercase px-12 py-4 bg-[#C5A059] text-[#030303] hover:bg-[#E6C875] transition-colors duration-300 min-w-[210px] text-center"
          >
            Reserve a Table
          </a>
          <a
            href="#menu"
            className="font-sans text-xs font-semibold tracking-[0.2em] uppercase px-12 py-4 border border-[rgba(197,160,89,0.45)] text-[#E6C875] hover:bg-[rgba(197,160,89,0.08)] transition-all duration-300 min-w-[210px] text-center"
          >
            View Our Menu
          </a>
        </motion.div>

        {/* Hours */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.6 }}
          className="mt-14 font-sans text-[11px] tracking-[0.2em] uppercase text-[#6A5E4E]"
        >
          Wednesday – Saturday &nbsp;·&nbsp; 5:00 PM – 9:00 PM
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#6A5E4E]">Discover</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-[rgba(197,160,89,0.7)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
