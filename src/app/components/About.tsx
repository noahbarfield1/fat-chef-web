"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="w-full flex justify-center px-6 bg-[#070707]"
      style={{ position: "relative", paddingTop: "7rem", paddingBottom: "7rem" }}
      aria-label="Our story"
    >
      <div className="w-full max-w-7xl grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Images */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative pb-14 md:pb-20"
        >
          {/* Main image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="https://static.wixstatic.com/media/019c1a_6a3e4beb359e44fb8c6983f9d8f4cc0c~mv2.jpg/v1/fill/w_1220,h_681,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/019c1a_6a3e4beb359e44fb8c6983f9d8f4cc0c~mv2.jpg"
              alt="The Fat Chef bar and interior ambiance"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(7,7,7,0.6)] to-transparent" />
          </div>
          {/* Inset second image */}
          <div className="absolute bottom-0 -right-6 w-1/2 aspect-[3/4] border-4 border-[#070707] overflow-hidden hidden md:block">
            <Image
              src="https://static.wixstatic.com/media/019c1a_754d9b825c2f4dbd9fa38b3b3100f3ba~mv2.jpg/v1/fill/w_1220,h_681,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/019c1a_754d9b825c2f4dbd9fa38b3b3100f3ba~mv2.jpg"
              alt="The Fat Chef patio dining area"
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="md:pt-12"
        >
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-5">Our Story</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F0EBE1] mb-6 leading-tight">
            Born from a<br />
            <em className="gold-text">Passion for Quality</em>
          </h2>

          <div className="w-12 h-px bg-[rgba(197,160,89,0.5)] mb-8" />

          <blockquote className="font-serif italic text-lg md:text-xl text-[#C5A059] leading-relaxed mb-8 border-l-2 border-[rgba(197,160,89,0.4)] pl-6">
            &ldquo;Seven years ago my wife and I stopped by this building on our way home when we lived out at Rocky Branch on Beaver Lake. We had struggled to find the kind of restaurant that offered quality sit-down dining without having to go all the way into Bentonville.&rdquo;
          </blockquote>

          <p className="font-sans text-[15px] text-[#8A7E6E] leading-relaxed mb-6">
            We welcome you all to have a wonderful dining experience with high-quality food, a lot of fun in a pleasant atmosphere. We are by no means a fast-food restaurant, but instead offer a dining experience meant to be savored and enjoyed.
          </p>

          <p className="font-sans text-[14px] text-[#6A5E4E] italic">
            — Richard, Christine &amp; Joan, Family &amp; Founders
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="border border-[rgba(197,160,89,0.18)] p-4">
              <p className="font-serif text-2xl font-bold text-[#C5A059]">Wed–Sat</p>
              <p className="font-sans text-xs tracking-widest uppercase text-[#8A7E6E] mt-1">Open for Dinner</p>
            </div>
            <div className="border border-[rgba(197,160,89,0.18)] p-4">
              <p className="font-serif text-2xl font-bold text-[#C5A059]">5–9 PM</p>
              <p className="font-sans text-xs tracking-widest uppercase text-[#8A7E6E] mt-1">Dinner Service</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
