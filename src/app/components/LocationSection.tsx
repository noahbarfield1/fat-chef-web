"use client";

import { motion } from "framer-motion";
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], display: "swap" });

export default function LocationSection() {
  return (
    <section className="relative w-full h-[65vh] min-h-[500px] bg-[#050505] border-t border-[rgba(197,160,89,0.12)] mb-0">
      
      {/* The Edge-to-Edge Map */}
      <div className="absolute inset-0 pointer-events-auto">
        <iframe 
          src="https://maps.google.com/maps?q=The%20Fat%20Chef,%2014550%20E%20Hwy%2012,%20Rogers,%20AR%2072756&t=&z=14&ie=UTF8&iwloc=&output=embed" 
          width="100%" height="100%" 
          style={{ 
            border: 0, 
            // Invert colors, shift hue to keep water blue but land dark, bump contrast to make roads pop
            filter: "invert(90%) hue-rotate(180deg) brightness(85%) contrast(120%) saturate(130%)" 
          }} 
          allowFullScreen loading="lazy">
        </iframe>
      </div>
      
      {/* Vignette Overlays for seamless blending */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-[#050505] via-[rgba(5,5,5,0.2)] to-transparent opacity-90" />
      <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_40px_100px_rgba(5,5,5,0.95)]" />
      
      {/* Content Container (Text + Card) */}
      <div className="absolute inset-0 p-8 md:p-16 z-20 pointer-events-none flex flex-col md:flex-row justify-between items-center h-full max-w-7xl mx-auto gap-8">
         
         {/* Animated Cursive Tagline over the map */}
         <motion.div 
           initial={{ clipPath: "inset(-20% 100% -20% -20%)", opacity: 0 }} 
           whileInView={{ clipPath: "inset(-20% -20% -20% -20%)", opacity: 1 }} 
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 2.2, delay: 0.4, ease: "easeInOut" }} 
           className={`text-4xl md:text-5xl lg:text-[60px] text-[#FFEDBA] text-center md:text-left max-w-xl pb-32 md:pb-0 ${greatVibes.className}`}
           style={{ 
             lineHeight: "1.2",
             textShadow: "0 0 12px rgba(255,237,186,0.6), 0 0 24px rgba(197,160,89,0.4), 2px 4px 10px rgba(0,0,0,0.9)"
           }}
         >
           Only 3 short miles from Downtown Rogers out<br/>Hwy 12
         </motion.div>

         {/* Floating Glassmorphic Info Card */}
         <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
           className="bg-[#050505]/85 backdrop-blur-xl border border-[rgba(197,160,89,0.25)] p-8 md:p-12 pointer-events-auto shadow-2xl w-full max-w-md relative overflow-hidden self-end md:self-auto"
         >
           {/* Subtle glow behind card */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059] opacity-[0.05] blur-3xl pointer-events-none" />

           <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#8A7E6E] mb-3">
             Location
           </p>
           <h2 className="font-serif text-3xl md:text-4xl text-[#F0EBE1] mb-2 relative">
             The Fat Chef
           </h2>
           <p className="font-sans text-[12px] text-[#C5A059] uppercase tracking-widest mb-8 border-b border-[rgba(197,160,89,0.15)] pb-6">
             Rogers, Arkansas
           </p>
           
           <address className="not-italic font-sans text-[14px] text-[#B8A99A] leading-relaxed mb-8 font-light">
             14550 E HWY 12<br/>
             Rogers, AR 72756
           </address>
           
           <a 
             href="https://www.google.com/maps/dir//The+Fat+Chef,+14550+E+Hwy+12,+Rogers,+AR+72756" 
             target="_blank" 
             rel="noreferrer"
             className="inline-block bg-transparent text-[#C5A059] border border-[#C5A059] px-7 py-3.5 font-sans text-[11px] uppercase tracking-[0.15em] hover:bg-[#C5A059] hover:text-[#050505] transition-all duration-500"
           >
             Get Directions
           </a>
         </motion.div>
      </div>
    </section>
  );
}
