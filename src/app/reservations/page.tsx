"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ReservationsPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", guests: "2", notes: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Reservation Request — ${form.name} — ${form.date}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nDate: ${form.date}\nGuests: ${form.guests}\nNotes: ${form.notes}`
    );
    window.location.href = `mailto:TheFatChefNWA@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

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
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center border border-[rgba(197,160,89,0.2)] p-16 text-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5" className="mb-6" aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <p className="font-serif text-2xl font-bold text-[#F0EBE1] mb-3">Request Sent</p>
                <p className="font-sans text-[14px] text-[#6A5E4E] mb-8">We&apos;ll be in touch shortly to confirm.</p>
                <Link href="/" className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase px-8 py-3 border border-[rgba(197,160,89,0.4)] text-[#C5A059] hover:bg-[rgba(197,160,89,0.08)] transition-all duration-300">
                  Back to Home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-[rgba(197,160,89,0.15)] bg-[#0f0f0f] p-8 md:p-10 flex flex-col gap-5" aria-label="Reservation request form">
                <h2 className="font-serif text-2xl font-bold text-[#F0EBE1] mb-2">Request a Reservation</h2>
                {[
                  { id: "name",  label: "Full Name",        type: "text",  req: true,  ph: "Your name" },
                  { id: "email", label: "Email Address",    type: "email", req: true,  ph: "your@email.com" },
                  { id: "phone", label: "Phone Number",     type: "tel",   req: false, ph: "479-000-0000" },
                  { id: "date",  label: "Preferred Date",   type: "date",  req: true,  ph: "" },
                ].map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block font-sans text-[10px] tracking-[0.16em] uppercase text-[#5A4E40] mb-2">
                      {f.label}{f.req && <span className="text-[#C5A059] ml-1">*</span>}
                    </label>
                    <input id={f.id} type={f.type} placeholder={f.ph} required={f.req}
                      value={form[f.id as keyof typeof form]}
                      onChange={(e) => setForm((p) => ({ ...p, [f.id]: e.target.value }))}
                      className="w-full bg-[#161616] border border-[rgba(197,160,89,0.18)] text-[#F0EBE1] font-sans text-sm px-4 py-3 outline-none focus:border-[#C5A059] transition-colors placeholder:text-[#3A3228]"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="guests" className="block font-sans text-[10px] tracking-[0.16em] uppercase text-[#5A4E40] mb-2">Party Size <span className="text-[#C5A059]">*</span></label>
                  <select id="guests" value={form.guests} onChange={(e) => setForm((p) => ({ ...p, guests: e.target.value }))}
                    className="w-full bg-[#161616] border border-[rgba(197,160,89,0.18)] text-[#F0EBE1] font-sans text-sm px-4 py-3 outline-none focus:border-[#C5A059] transition-colors">
                    {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n} {n===1?"Guest":"Guests"}</option>)}
                    <option value="9+">9+ Guests (Private Event)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="notes" className="block font-sans text-[10px] tracking-[0.16em] uppercase text-[#5A4E40] mb-2">Special Requests</label>
                  <textarea id="notes" rows={3} placeholder="Allergies, occasions, dietary needs..."
                    value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                    className="w-full bg-[#161616] border border-[rgba(197,160,89,0.18)] text-[#F0EBE1] font-sans text-sm px-4 py-3 outline-none focus:border-[#C5A059] transition-colors resize-none placeholder:text-[#3A3228]"
                  />
                </div>
                <button type="submit" className="mt-1 w-full py-4 bg-[#C5A059] text-[#070707] font-sans text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#E6C875] transition-colors duration-300">
                  Send Reservation Request
                </button>
                <p className="font-sans text-[11px] text-center text-[#3A3228]">We confirm within 24 hours by phone or email.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
