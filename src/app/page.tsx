"use client";


import LuxImage from "./components/primitives/LuxImage";
import Link from "next/link";
import HomeHero from "./components/HomeHero";
import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";
import { sendGAEvent } from '@next/third-parties/google';

const Accolades = dynamic(() => import("./components/Accolades"));
const Testimonials = dynamic(() => import("./components/Testimonials"));
const LocationSection = dynamic(() => import("./components/LocationSection"));

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  return (
    <main>
      <HomeHero />

      {/* AWARDS & TESTIMONIALS */}
      <Accolades />
      <Testimonials />

      {/* ABOUT TEASER */}
      <section className="w-full flex justify-center py-24 px-6 bg-[#070707]" aria-label="About">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <LuxImage
              src="/post-pics/outdoor-owners-1.jpg"
              alt="The owners of The Fat Chef standing outdoors next to the chef statue" fill className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(7,7,7,0.55)] to-transparent" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-4">Our Story</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F0EBE1] mb-6 leading-tight">
              Born from a <em className="not-italic" style={{ color: "#C5A059" }}>Passion</em><br/>for Quality
            </h2>
            <div className="w-10 h-px mb-6" style={{ background: "rgba(197,160,89,0.5)" }} />
            <blockquote className="font-serif italic text-lg leading-relaxed mb-6 pl-5" style={{ color: "#C5A059", borderLeft: "2px solid rgba(197,160,89,0.35)" }}>
              &ldquo;Looking for the perfect night out? Come to one of Northwest Arkansas’ most highly recommended hidden gems, The Fat Chef!&rdquo;
            </blockquote>
            <p className="font-sans text-[14px] leading-relaxed mb-8" style={{ color: "#6A5E4E" }}>
              Our five-star dining menu features All Prime Grade, hand cut steaks, flown-in-fresh Chilean Sea Bass, Scottish Salmon, real Scallops, and huge Maine lobster tails. Everything is made from scratch including sides, dressings, and our fresh bread with herbed butter.
              <br/><br/>
              Treat yourself with a homemade dessert and one of our signature cocktails. The Fat Chef. Where exceptional food is served in an intimate relaxed atmosphere. Make your reservation now.
            </p>
            <Link href="/about" className="inline-block font-sans text-[11px] font-semibold tracking-[0.18em] uppercase px-8 py-3 border border-[rgba(197,160,89,0.4)] text-[#C5A059] hover:bg-[rgba(197,160,89,0.08)] transition-all duration-300">
              Read Our Full Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* DINING ROOM AMBIANCE */}
      <section className="w-full flex justify-center py-20 px-6 bg-[#0a0a0a]" aria-label="The atmosphere">
        <div className="w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-3">The Setting</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F0EBE1]">Log Cabin Charm, Fine Dining Prestige</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "16/7" }}
          >
            <LuxImage
              src="/post-pics/dining-room-interior.jpg"
              alt="The Fat Chef dining room — rustic log cabin interior with elegant table settings"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.6)] via-transparent to-[rgba(10,10,10,0.2)]" />
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <p className="font-serif text-xl md:text-2xl font-bold text-[#F0EBE1]">Intimate & Warm</p>
              <p className="font-sans text-xs text-[#C5A059] mt-1 tracking-widest uppercase">An Evening You Won&apos;t Forget</p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* MENU PREVIEW */}
      <section className="w-full flex justify-center py-24 px-6 bg-[#0a0a0a]" aria-label="Menu preview">
        <div className="w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-3">Crafted Daily</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F0EBE1]">A Taste of What Awaits</h2>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 gap-4 mb-10"
          >
            {[
              { src: "/post-pics/big-steak-and-shrimp.jpg", alt: "USDA Prime steak", label: "Prime Steaks", sub: "USDA Prime · Hand Cut Daily" },
              { src: "/post-pics/fish-sweet-potato-1.jpg", alt: "Seared tuna", label: "Fresh Seafood", sub: "From the Sea · Market Fresh" },
            ].map((img) => (
              <motion.div key={img.label} variants={fadeUp} className="relative overflow-hidden group" style={{ aspectRatio: "16/8" }}>
                <LuxImage src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,7,7,0.85)] to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="font-serif text-xl font-bold text-[#F0EBE1]">{img.label}</p>
                  <p className="font-sans text-xs text-[#C5A059] mt-1">{img.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center"
          >
            <Link href="/menu" className="inline-block font-sans text-[11px] font-bold tracking-[0.2em] uppercase px-12 py-4 bg-[#C5A059] text-[#070707] hover:bg-[#E6C875] transition-colors duration-300">
              Explore Full Menu
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="py-20 px-6 bg-[#070707] border-t border-[rgba(197,160,89,0.1)] flex justify-center" aria-label="Reserve">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl text-center"
        >
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-4">Join Us</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F0EBE1] mb-4">Ready for an Unforgettable Evening?</h2>
          <div className="w-16 h-px mx-auto my-6" style={{ background: "rgba(197,160,89,0.4)" }} />
          <p className="font-sans text-[15px] leading-relaxed mb-10" style={{ color: "#6A5E4E" }}>Wednesday through Saturday · 5 PM to 9 PM</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link href="/reservations" className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase px-10 py-4 bg-[#C5A059] text-[#070707] hover:bg-[#E6C875] transition-colors duration-300 text-center">
              Reserve a Table
            </Link>
            <a href="tel:4792025106" onClick={() => sendGAEvent('event', 'phone_call_initiated', { source: 'home_cta' })} className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase px-10 py-4 border border-[rgba(197,160,89,0.4)] text-[#C5A059] hover:bg-[rgba(197,160,89,0.08)] transition-all duration-300 text-center">
              Call 479.202.5106
            </a>
          </div>
        </motion.div>
      </section>

      {/* EPIC LOCATION SECTION */}
      <LocationSection />
    </main>
  );
}
