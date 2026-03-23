"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ─── TODO: Replace this with the real OpenTable Restaurant ID ────────────────
// 1. Sign up / log in at restaurant.opentable.com
// 2. Go to Restaurant Profile → Reservation Widget → Customize → Copy Code
// 3. Find the `rid=XXXXXXXX` value in the copied code and paste it below
const OPENTABLE_RID = "XXXXXXXX"; // ← swap this out
// ─────────────────────────────────────────────────────────────────────────────

function OpenTableWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || OPENTABLE_RID === "XXXXXXXX") return;

    // Remove any previously injected script so hot-reload doesn't duplicate it
    const existing = containerRef.current.querySelector("script");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `//www.opentable.com/widget/reservation/loader?rid=${OPENTABLE_RID}&type=standard&theme=standard&color=1&dark=true&iframe=true&domain=com&lang=en-US&newtab=false&ot_source=Restaurant%20website`;
    script.async = true;
    containerRef.current.appendChild(script);
  }, []);

  // Placeholder shown until the real RID is configured
  if (OPENTABLE_RID === "XXXXXXXX") {
    return (
      <div
        className="flex flex-col items-center justify-center text-center gap-5 border border-dashed border-[rgba(197,160,89,0.25)] bg-[#0f0f0f]"
        style={{ minHeight: "380px", padding: "3rem" }}
      >
        {/* OpenTable logo mark */}
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="20" fill="#DA3743" />
          <path
            d="M20 11a9 9 0 100 18A9 9 0 0020 11zm0 15a6 6 0 110-12 6 6 0 010 12z"
            fill="white"
          />
          <circle cx="20" cy="20" r="2.5" fill="white" />
        </svg>
        <div>
          <p className="font-serif text-lg font-semibold text-[#F0EBE1] mb-2">
            OpenTable Widget
          </p>
          <p className="font-sans text-[12px] text-[#6A5E4E] leading-relaxed max-w-[260px]">
            Configure your OpenTable Restaurant ID in{" "}
            <code className="text-[#C5A059] text-[11px]">Reservations.tsx</code>{" "}
            to enable live bookings here.
          </p>
        </div>
        <a
          href="https://restaurant.opentable.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-[11px] tracking-[0.18em] uppercase text-[#C5A059] border-b border-[rgba(197,160,89,0.35)] pb-px hover:border-[#C5A059] transition-colors"
        >
          Set Up OpenTable →
        </a>
      </div>
    );
  }

  return <div ref={containerRef} className="w-full" />;
}

export default function Reservations() {
  return (
    <section
      id="reservations"
      className="w-full flex justify-center px-6 bg-[#070707] overflow-hidden"
      style={{ position: "relative", paddingTop: "8rem", paddingBottom: "8rem" }}
      aria-label="Reservations and Contact"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(#C5A059 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[rgba(197,160,89,0.03)] to-transparent pointer-events-none" />

      <div className="w-full max-w-5xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-4">
            Private Dining
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F0EBE1] mb-4">
            Reserve a Table
          </h2>
          <p className="font-sans text-[15px] text-[#8A7E6E] max-w-md leading-relaxed">
            Whether it&apos;s an anniversary, corporate event, or a special evening out,
            we&apos;ll ensure your experience is unforgettable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left — Contact details (unchanged) */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#6A5E4E] mb-2">Call Us</p>
              <a
                href="tel:4792025106"
                className="font-serif text-3xl font-bold text-[#C5A059] hover:text-[#E6C875] transition-colors"
              >
                479.202.5106
              </a>
            </div>

            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#6A5E4E] mb-2">Email</p>
              <a
                href="mailto:TheFatChefNWA@gmail.com"
                className="font-sans text-base text-[#C5A059] hover:text-[#E6C875] transition-colors"
              >
                TheFatChefNWA@gmail.com
              </a>
            </div>

            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#6A5E4E] mb-2">Location</p>
              <address className="font-sans text-base text-[#8A7E6E] not-italic leading-relaxed">
                14550 E HWY 12<br />
                Rogers, AR 72756
              </address>
              <a
                href="https://maps.google.com/?q=14550+E+HWY+12+Rogers+AR+72756"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 font-sans text-xs tracking-widest uppercase text-[#C5A059] border-b border-[rgba(197,160,89,0.4)] pb-px hover:border-[#C5A059] transition-colors"
              >
                Get Directions →
              </a>
            </div>

            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#6A5E4E] mb-2">Hours</p>
              <p className="font-sans text-base text-[#8A7E6E]">Wednesday – Saturday</p>
              <p className="font-sans text-base text-[#C5A059] font-semibold">5:00 PM – 9:00 PM</p>
            </div>

            {/* OpenTable badge — shown when live */}
            {OPENTABLE_RID !== "XXXXXXXX" && (
              <div className="flex items-center gap-2 pt-2">
                <svg width="18" height="18" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <circle cx="20" cy="20" r="20" fill="#DA3743" />
                  <path d="M20 11a9 9 0 100 18A9 9 0 0020 11zm0 15a6 6 0 110-12 6 6 0 010 12z" fill="white" />
                  <circle cx="20" cy="20" r="2.5" fill="white" />
                </svg>
                <span className="font-sans text-[11px] text-[#6A5E4E] tracking-wide">
                  Reservations powered by OpenTable
                </span>
              </div>
            )}
          </motion.div>

          {/* Right — OpenTable widget */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <OpenTableWidget />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
