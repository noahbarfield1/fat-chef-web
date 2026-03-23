"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Hero video (served from Vercel CDN) ─────────
const VIDEO_SRC = "https://fat-chef-pages.vercel.app/fat-chef-hero.mp4";
// ────────────────────────────────────────────────

const BG = "https://static.wixstatic.com/media/019c1a_a4ea7513132c4145933f7cac161a41ce~mv2.jpg/v1/fill/w_1920,h_1043,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/019c1a_a4ea7513132c4145933f7cac161a41ce~mv2.jpg";

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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY   = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const fade  = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const moveY = useTransform(scrollYProgress, [0, 0.5], ["0%", "10%"]);

  return (
    <section ref={ref} id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#030303]" aria-label="Welcome to The Fat Chef">

      {/* Letterbox open */}
      <motion.div initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 1.3, delay: 0.15, ease: [0.76,0,0.24,1] }} style={{ originY: 0 }} className="absolute top-0 inset-x-0 h-[12vh] bg-[#030303] z-30 pointer-events-none" aria-hidden="true" />
      <motion.div initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 1.3, delay: 0.15, ease: [0.76,0,0.24,1] }} style={{ originY: 1 }} className="absolute bottom-0 inset-x-0 h-[12vh] bg-[#030303] z-30 pointer-events-none" aria-hidden="true" />

      {/* Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-[1.08]">
        {VIDEO_SRC
          ? <video src={VIDEO_SRC} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
          : <Image src={BG} alt="The Fat Chef restaurant interior" fill priority className="object-cover" sizes="100vw" />
        }
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[rgba(3,3,3,0.5)] to-[rgba(3,3,3,0.2)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(3,3,3,0.4)] via-transparent to-[rgba(3,3,3,0.4)]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(3,3,3,0.6) 100%)" }} />
      </motion.div>

      {/* Gold scan line */}
      <motion.div initial={{ scaleX: 0, opacity: 1 }} animate={{ scaleX: 1, opacity: 0 }} transition={{ duration: 1.1, delay: 1.4, ease: [0.16,1,0.3,1] }} style={{ originX: 0 }} className="absolute top-1/2 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent z-20 pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <motion.div style={{ opacity: fade, y: moveY }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.9 }} className="flex items-center justify-center gap-4 mb-10">
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 1.05 }} style={{ originX: 1 }} className="block h-px w-12 bg-[rgba(197,160,89,0.65)]" />
          <span className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase text-[#C5A059]">Rogers, Arkansas · Fine Dining</span>
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 1.05 }} style={{ originX: 0 }} className="block h-px w-12 bg-[rgba(197,160,89,0.65)]" />
        </motion.div>

        {/* Title — per-letter */}
        <h1 className="font-serif font-black leading-[0.95] tracking-tight text-[#F0EBE1] mb-4" style={{ fontSize: "clamp(56px,10vw,110px)" }}>
          <span className="block overflow-hidden">
            {"The ".split("").map((c, i) => <Char key={i} char={c} delay={1.1 + i * 0.045} />)}
          </span>
          <span className="block overflow-hidden">
            {"Fat".split("").map((c, i) => <Char key={i} char={c === " " ? "\u00a0" : c} delay={1.3 + i * 0.05} />)}{" "}
            {"Chef".split("").map((c, i) => <span key={i} className="inline-flex overflow-hidden"><Char char={c} delay={1.48 + i * 0.05} /></span>)}
          </span>
        </h1>

        {/* Divider */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: 1.9 }} className="w-20 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-7" aria-hidden="true" />

        {/* Tagline */}
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 2.05 }} className="font-serif italic text-[#C5A059] mb-12 leading-relaxed" style={{ fontSize: "clamp(14px,2vw,19px)" }}>
          USDA Prime Steaks &nbsp;·&nbsp; Fresh Seafood &nbsp;·&nbsp; Handcrafted Cuisine
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 2.25 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/reservations" className="font-sans text-xs font-bold tracking-[0.2em] uppercase px-12 py-4 bg-[#C5A059] text-[#030303] hover:bg-[#E6C875] transition-colors duration-300 min-w-[210px] text-center">Reserve a Table</Link>
          <Link href="/menu" className="font-sans text-xs font-semibold tracking-[0.2em] uppercase px-12 py-4 border border-[rgba(197,160,89,0.45)] text-[#E6C875] hover:bg-[rgba(197,160,89,0.08)] transition-all duration-300 min-w-[210px] text-center">View Our Menu</Link>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.6 }} className="mt-12 font-sans text-[11px] tracking-[0.2em] uppercase text-[#5A4E40]">
          Wednesday – Saturday &nbsp;·&nbsp; 5:00 PM – 9:00 PM
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#5A4E40]">Scroll</span>
        <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-px h-10 bg-gradient-to-b from-[rgba(197,160,89,0.6)] to-transparent" />
      </motion.div>
    </section>
  );
}
