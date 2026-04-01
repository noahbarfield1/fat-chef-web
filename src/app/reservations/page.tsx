"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function OpenTableWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const existing = containerRef.current.querySelector("script");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//www.opentable.com/widget/reservation/loader?rid=1503088&type=standard&theme=standard&color=1&dark=true&iframe=true&domain=com&lang=en-US&newtab=false&ot_source=Restaurant%20website&cfe=true";
    script.async = true;
    containerRef.current.appendChild(script);
  }, []);

  return <div ref={containerRef} className="w-full bg-[#0f0f0f] border border-[rgba(197,160,89,0.15)] p-4 md:p-8" />;
}

export default function ReservationsPage() {

  return (
    <main className="pt-20 bg-[#070707] min-h-screen">
      {/* Page header */}
      <div className="w-full flex justify-center py-16 px-6 border-b border-[rgba(197,160,89,0.1)] bg-[#0a0a0a]">
        <div className="w-full max-w-6xl">
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-2">Private Dining</p>
          <h1 className="font-serif text-5xl md:text-6xl font-black text-[#F0EBE1]">Reserve a Table</h1>
        </div>
      </div>

      <div className="w-full flex justify-center py-20 px-6">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-16">

          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }} className="flex flex-col gap-10">
            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#6A5E4E] mb-3">Prefer to call?</p>
              <a href="tel:4792025106" className="font-serif text-4xl font-bold text-[#C5A059] hover:text-[#E6C875] transition-colors block mb-1">479.202.5106</a>
              <p className="font-sans text-[13px] text-[#5A4E40]">We&apos;d love to hear from you directly.</p>
            </div>
            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#6A5E4E] mb-2">Email</p>
              <a href="mailto:TheFatChefNWA@gmail.com" className="font-sans text-base text-[#C5A059] hover:text-[#E6C875] transition-colors">TheFatChefNWA@gmail.com</a>
            </div>
            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#6A5E4E] mb-2">Hours</p>
              <p className="font-sans text-base text-[#8A7E6E]">Wednesday – Saturday</p>
              <p className="font-serif text-xl font-bold text-[#C5A059]">5:00 PM – 9:00 PM</p>
            </div>
            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#6A5E4E] mb-2">Location</p>
              <address className="not-italic font-sans text-base text-[#8A7E6E] leading-relaxed">
                14550 E HWY 12<br/>Rogers, AR 72756
              </address>
              <a href="https://maps.google.com/?q=14550+E+HWY+12+Rogers+AR+72756" target="_blank" rel="noopener noreferrer"
                className="inline-block mt-3 font-sans text-[11px] tracking-widest uppercase text-[#C5A059] border-b border-[rgba(197,160,89,0.4)] hover:border-[#C5A059] transition-colors pb-px">
                Get Directions →
              </a>
            </div>
            <div className="card-border p-6 rounded-none">
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#6A5E4E] mb-3">Good to Know</p>
              <ul className="font-sans text-[13px] text-[#5A4E40] leading-relaxed space-y-2">
                <li>· We will confirm within 24 hours by phone or email</li>
                <li>· For parties of 9+, please call us directly</li>
                <li>· We accommodate dietary requirements with advance notice</li>
                <li>· A log cabin experience like no other in Northwest Arkansas</li>
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16,1,0.3,1] }}>
            <OpenTableWidget />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
