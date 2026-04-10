"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendGAEvent } from '@next/third-parties/google';

// --------------------------------------------------------------------------
// Config
// --------------------------------------------------------------------------
const OT_RID  = "1503088";
const OT_SLUG = "the-fat-chef-reservations-rogers";

// Dinner service hours: Wed–Sat, 5:00 PM – 9:00 PM (30-min slots)
const TIME_SLOTS = [
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
  "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM",
];

const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8];

// Allowed days: Wed (3) Thu (4) Fri (5) Sat (6)
const ALLOWED_DAYS = [3, 4, 5, 6];

// --------------------------------------------------------------------------
// Tiny helpers
// --------------------------------------------------------------------------
function toDateTimeParam(dateStr: string, timeStr: string): string {
  // dateStr: "YYYY-MM-DD", timeStr: "7:00 PM"  →  "YYYY-MM-DDTHH:MM"
  const [time, meridiem] = timeStr.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (meridiem === "PM" && h !== 12) h += 12;
  if (meridiem === "AM" && h === 12) h = 0;
  return `${dateStr}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return "";
  const [y, mo, d] = dateStr.split("-").map(Number);
  const names = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const days  = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const dt    = new Date(y, mo - 1, d);
  return `${days[dt.getDay()]}, ${names[mo - 1]} ${d}, ${y}`;
}

// Get today's or next valid date (Wed–Sat)
function getNextValidDate(): string {
  const d = new Date();
  while (!ALLOWED_DAYS.includes(d.getDay())) {
    d.setDate(d.getDate() + 1);
  }
  return d.toISOString().split("T")[0];
}

// --------------------------------------------------------------------------
// Icons (inline SVG, no extra deps)
// --------------------------------------------------------------------------
const CalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/>
  </svg>
);

const PersonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const OTIcon = () => (
  <svg width="14" height="14" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <circle cx="20" cy="20" r="20" fill="#DA3743"/>
    <path d="M20 11a9 9 0 100 18A9 9 0 0020 11zm0 15a6 6 0 110-12 6 6 0 010 12z" fill="white"/>
    <circle cx="20" cy="20" r="2.5" fill="white"/>
  </svg>
);

// --------------------------------------------------------------------------
// Custom Select
// --------------------------------------------------------------------------
type SelectOption = { label: string; value: string; disabled?: boolean };

function LuxSelect({
  icon,
  value,
  options,
  onChange,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  options: SelectOption[];
  onChange: (v: string) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const ref             = useRef<HTMLDivElement>(null);
  const selected        = options.find(o => o.value === value);

  // Close on outside click
  const handleBlur = () => setTimeout(() => setOpen(false), 150);

  return (
    <div
      ref={ref}
      className="relative"
      onBlur={handleBlur}
    >
      <button
        type="button"
        onClick={() => setOpen(p => !p)}
        aria-label={label}
        aria-expanded={open}
        className={`
          group w-full flex items-center gap-3 px-5 py-4 text-left
          border transition-all duration-300 outline-none focus-visible:ring-0
          ${open
            ? "border-[#C5A059] bg-[#0f0e0b]"
            : "border-[rgba(197,160,89,0.35)] bg-[#0a0a0a] hover:border-[rgba(197,160,89,0.5)] hover:bg-[#0f0e0b]"
          }
        `}
      >
        <span className={`flex-shrink-0 transition-colors duration-300 ${open ? "text-[#C5A059]" : "text-[#8A7E6E] group-hover:text-[#C5A059]"}`}>
          {icon}
        </span>
        <span className="flex-1 font-sans text-[13px] tracking-wide text-[#F0EBE1] truncate">
          {selected?.label || "—"}
        </span>
        <span className={`flex-shrink-0 transition-all duration-300 text-[#5A4E3E] ${open ? "rotate-180 text-[#C5A059]" : ""}`}>
          <ChevronIcon />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ originY: 0 }}
            className="absolute left-0 right-0 top-full z-50 mt-1 bg-[#0f0e0b] border border-[rgba(197,160,89,0.3)] shadow-[0_24px_48px_rgba(0,0,0,0.8)] max-h-60 overflow-y-auto"
            role="listbox"
          >
            {options.map(opt => (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={opt.value === value}
                disabled={opt.disabled}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`
                  w-full flex items-center px-5 py-3.5 text-left font-sans text-[13px] transition-all duration-150
                  ${opt.disabled ? "text-[#3A3028] cursor-not-allowed" : "cursor-pointer"}
                  ${opt.value === value
                    ? "text-[#C5A059] bg-[rgba(197,160,89,0.08)]"
                    : opt.disabled ? "" : "text-[#B8A99A] hover:text-[#F0EBE1] hover:bg-[rgba(197,160,89,0.05)]"
                  }
                `}
              >
                {opt.value === value && (
                  <span className="mr-2 text-[#C5A059]">✓</span>
                )}
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --------------------------------------------------------------------------
// Main Component
// --------------------------------------------------------------------------
export default function LuxReservationForm() {
  const [date,      setDate]      = useState(getNextValidDate());
  const [time,      setTime]      = useState("7:00 PM");
  const [partySize, setPartySize] = useState("2");
  const [hovering,  setHovering]  = useState(false);

  // Build 90 days of future dates (Wed–Sat only)
  const dateOptions: SelectOption[] = (() => {
    const opts: SelectOption[] = [];
    const today = new Date();
    for (let i = 0; i < 90; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (!ALLOWED_DAYS.includes(d.getDay())) continue;
      const iso = d.toISOString().split("T")[0];
      const [y, mo, dd] = iso.split("-").map(Number);
      const dayNames  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      const monNames  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      opts.push({
        label: `${dayNames[d.getDay()]}, ${monNames[mo - 1]} ${dd}`,
        value: iso,
      });
    }
    return opts;
  })();

  const timeOptions: SelectOption[] = TIME_SLOTS.map(t => ({
    label: t,
    value: t,
  }));

  const partyOptions: SelectOption[] = [
    ...PARTY_SIZES.map(n => ({ label: `${n} ${n === 1 ? "guest" : "guests"}`, value: String(n) })),
    { label: "9+ guests — please call us", value: "9", disabled: false },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(partySize) >= 9) {
      sendGAEvent('event', 'large_party_call_initiated', { party_size: partySize });
      window.location.href = "tel:4792025106";
      return;
    }
    
    // Track standard reservations
    sendGAEvent('event', 'reservation_initiated', { 
      party_size: partySize,
      booking_date: date,
      booking_time: time
    });

    const dt = toDateTimeParam(date, time);
    const url = `https://www.opentable.com/r/${OT_SLUG}?restref=${OT_RID}&lang=en-US&ot_source=Restaurant%20website&covers=${partySize}&dateTime=${dt}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full"
    >
      {/* Subtle top gold line accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

      <form
        onSubmit={handleSubmit}
        className="bg-[#0a0a0a] border border-[rgba(197,160,89,0.2)] p-8 md:p-10 relative overflow-hidden"
        aria-label="Book a table at The Fat Chef"
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#C5A059] opacity-[0.04] blur-3xl pointer-events-none rounded-full" />

        {/* Form header */}
        <div className="mb-8">
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-3">
            Online Booking
          </p>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#F0EBE1]">
            Reserve Your Table
          </h3>
          <div className="w-10 h-px bg-gradient-to-r from-[#C5A059] to-transparent mt-3" />
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-3 mb-8">
          {/* Date */}
          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-[#8A7E6E] mb-2">
              Date
            </label>
            <LuxSelect
              icon={<CalIcon />}
              label="Select a date"
              value={date}
              options={dateOptions}
              onChange={setDate}
            />
            {date && (
              <p className="font-sans text-[11px] text-[#6A5E4E] mt-1.5 pl-1">
                {formatDisplayDate(date)}
              </p>
            )}
          </div>

          {/* Time */}
          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-[#8A7E6E] mb-2">
              Time
            </label>
            <LuxSelect
              icon={<ClockIcon />}
              label="Select a time"
              value={time}
              options={timeOptions}
              onChange={setTime}
            />
          </div>

          {/* Party Size */}
          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-[#8A7E6E] mb-2">
              Party Size
            </label>
            <LuxSelect
              icon={<PersonIcon />}
              label="Select party size"
              value={partySize}
              options={partyOptions}
              onChange={setPartySize}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="relative">
          <motion.button
            type="submit"
            onHoverStart={() => setHovering(true)}
            onHoverEnd={() => setHovering(false)}
            whileTap={{ scale: 0.985 }}
            className="relative w-full overflow-hidden font-sans text-[12px] font-bold tracking-[0.22em] uppercase py-5 text-[#070707] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            style={{ background: "#C5A059" }}
          >
            {/* Shimmer on hover */}
            <motion.div
              initial={{ x: "-100%", opacity: 0.6 }}
              animate={hovering ? { x: "200%", opacity: 0 } : { x: "-100%", opacity: 0.6 }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
              style={{ skewX: "-15deg" }}
            />
            <span className="relative z-10">
              {Number(partySize) >= 9 ? "Call to Reserve →" : "Check Availability →"}
            </span>
          </motion.button>
        </div>

        {/* OpenTable Attribution (required by OT terms) */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <OTIcon />
          <span className="font-sans text-[10px] tracking-widest uppercase text-[#3A3028]">
            Reservations powered by OpenTable
          </span>
        </div>
      </form>

      {/* Hours note */}
      <div className="mt-5 px-1 flex items-start gap-2">
        <div className="w-px h-8 bg-gradient-to-b from-[#C5A059] to-transparent flex-shrink-0 mt-0.5" />
        <p className="font-sans text-[11px] text-[#6A5E4E] leading-relaxed">
          We are open Wednesday–Saturday, 5:00–9:00 PM.<br/>
          For parties of 9 or more, please{" "}
          <a href="tel:4792025106" onClick={() => sendGAEvent('event', 'phone_call_initiated', { source: 'reservation_form_note' })} className="text-[#5A4E3E] underline underline-offset-2 hover:text-[#C5A059] transition-colors">
            call us directly
          </a>.
        </p>
      </div>
    </motion.div>
  );
}
