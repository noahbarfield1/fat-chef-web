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
      className="w-full flex justify-center px-6 bg-[#0a0a0a] border-y border-[rgba(197,160,89,0.12)]"
      style={{ position: "relative", paddingTop: "6rem", paddingBottom: "6rem" }}
      aria-label="Awards and accolades"
    >
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-4">Recognition</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F0EBE1]">
            Award-Winning Excellence
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 justify-items-center"
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
                <p
                  className="font-serif text-sm font-bold leading-tight"
                  style={{ color: a.tierColor }}
                >
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
      </div>
    </section>
  );
}
