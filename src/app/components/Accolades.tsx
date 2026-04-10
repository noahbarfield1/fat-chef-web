"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const awards = [
  {
    title: "Best Steakhouse",
    subtitle: "Northwest Arkansas",
    year: "2021",
    tier: "Gold",
    tierColor: "#C5A059",
    src: "/awards/gold-2021.png",
  },
  {
    title: "Best Romantic Dinner",
    subtitle: "Northwest Arkansas",
    year: "2021",
    tier: "Silver",
    tierColor: "#A8B2B8",
    src: "/awards/silver-2021.png",
  },
  {
    title: "Best New Restaurant",
    subtitle: "Northwest Arkansas",
    year: "2021",
    tier: "Gold",
    tierColor: "#C5A059",
    src: "/awards/gold-2021.png",
  },
  {
    title: "Best Fine Dining",
    subtitle: "Northwest Arkansas",
    year: "2021",
    tier: "Gold",
    tierColor: "#C5A059",
    src: "/awards/gold-2021.png",
  },
  {
    title: "Best Seafood",
    subtitle: "Northwest Arkansas",
    year: "2021",
    tier: "Gold",
    tierColor: "#C5A059",
    src: "/awards/gold-2021.png",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

export default function Accolades() {
  return (
    <section
      className="w-full flex justify-center bg-[#0a0a0a] border-y border-[rgba(197,160,89,0.12)]"
      style={{ position: "relative", paddingTop: "4rem", paddingBottom: "4rem" }}
      aria-label="Awards and accolades"
    >
      <div className="w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-14"
        >
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-3">Recognition</p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-[#F0EBE1]">
            Award-Winning Excellence
          </h2>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#5A4E3E] mt-2 md:hidden">
            Northwest Arkansas · 2021
          </p>
        </motion.div>

        {/* Desktop: 5-column grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="hidden md:grid md:grid-cols-5 gap-3 justify-items-center"
        >
          {awards.map((a) => (
            <motion.div
              key={a.title}
              variants={item}
              className="accolade-card p-6 text-center flex flex-col items-center gap-3 relative"
            >
              {a.tier && (
                <span
                  className="absolute top-3 right-3 font-sans text-[8px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full"
                  style={{
                    color: a.tierColor,
                    border: `1px solid ${a.tierColor}55`,
                    background: `${a.tierColor}10`,
                  }}
                >
                  {a.tier}
                </span>
              )}
              <div className="relative w-16 h-16 mb-2 drop-shadow-[0_8px_16px_rgba(197,160,89,0.25)]">
                <Image src={a.src} alt={`${a.tier} Winner 2021`} fill className="object-contain" />
              </div>
              <div>
                <p className="font-serif text-sm font-bold leading-tight" style={{ color: a.tierColor }}>
                  {a.title}
                </p>
                <p className="font-sans text-[10px] tracking-widest uppercase text-[#8A7E6E] mt-1">
                  {a.subtitle}
                </p>
                {a.year && (
                  <p className="font-sans text-[9px] tracking-widest uppercase text-[#5A4E3E] mt-1">
                    {a.year}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: horizontal scroll strip */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="flex md:hidden gap-3 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {awards.map((a) => (
            <motion.div
              key={a.title}
              variants={item}
              className="snap-center shrink-0 flex flex-col items-center gap-2 rounded-lg px-5 py-4 text-center"
              style={{
                width: "140px",
                background: "rgba(197,160,89,0.04)",
                border: "1px solid rgba(197,160,89,0.1)",
              }}
            >
              <div className="relative w-10 h-10 drop-shadow-[0_4px_8px_rgba(197,160,89,0.2)]">
                <Image src={a.src} alt={`${a.tier} Winner`} fill className="object-contain" />
              </div>
              <p className="font-serif text-[12px] font-bold leading-tight" style={{ color: a.tierColor }}>
                {a.title}
              </p>
              <span
                className="font-sans text-[7px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full"
                style={{
                  color: a.tierColor,
                  border: `1px solid ${a.tierColor}44`,
                  background: `${a.tierColor}0A`,
                }}
              >
                {a.tier}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
