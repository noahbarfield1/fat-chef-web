"use client";
import { motion } from "framer-motion";
import LuxReservationForm from "../components/LuxReservationForm";

export default function ReservationsPage() {
  return (
    <main className="pt-20 bg-[#070707] min-h-screen">

      {/* Page header */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(197,160,89,0.04)] to-transparent pointer-events-none" />
        <div className="w-full flex justify-center py-20 px-6 border-b border-[rgba(197,160,89,0.1)] bg-[#0a0a0a]">
          <div className="w-full max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-3">Private Dining</p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-black text-[#F0EBE1] leading-tight">
                Reserve a Table
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-[#C5A059] to-transparent mt-5" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main two-column layout */}
      <div className="w-full flex justify-center py-20 px-6">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — Contact info + details */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-10"
          >
            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#6A5E4E] mb-3">Prefer to call?</p>
              <a href="tel:4792025106" className="font-serif text-4xl font-bold text-[#C5A059] hover:text-[#E6C875] transition-colors block mb-1">
                479.202.5106
              </a>
              <p className="font-sans text-[13px] text-[#5A4E40]">We&apos;d love to hear from you directly.</p>
            </div>

            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#6A5E4E] mb-2">Email</p>
              <a href="mailto:TheFatChefNWA@gmail.com" className="font-sans text-base text-[#C5A059] hover:text-[#E6C875] transition-colors">
                TheFatChefNWA@gmail.com
              </a>
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
              <a
                href="https://maps.google.com/?q=14550+E+HWY+12+Rogers+AR+72756"
                target="_blank" rel="noopener noreferrer"
                className="inline-block mt-3 font-sans text-[11px] tracking-widest uppercase text-[#C5A059] border-b border-[rgba(197,160,89,0.4)] hover:border-[#C5A059] transition-colors pb-px"
              >
                Get Directions →
              </a>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-[rgba(197,160,89,0.15)] to-transparent" />

            <div className="border border-[rgba(197,160,89,0.12)] bg-[rgba(197,160,89,0.02)] p-6">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#6A5E4E] mb-4">Good to Know</p>
              <ul className="font-sans text-[13px] text-[#8A7E6E] leading-relaxed space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-[#C5A059] mt-px flex-shrink-0">·</span>
                  <span>We confirm every reservation within 24 hours by phone or email</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C5A059] mt-px flex-shrink-0">·</span>
                  <span>For parties of 9 or more, please call us directly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C5A059] mt-px flex-shrink-0">·</span>
                  <span>Dietary requirements accommodated with advance notice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C5A059] mt-px flex-shrink-0">·</span>
                  <span>A log cabin dining experience like no other in Northwest Arkansas</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right — Custom luxury booking form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <LuxReservationForm />
          </motion.div>

        </div>
      </div>
    </main>
  );
}
