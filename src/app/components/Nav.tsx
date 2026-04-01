"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Our Story" },
  { href: "/reservations", label: "Reserve" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const isHome = path === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [path]);

  const transparent = isHome && !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full flex justify-center fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          transparent ? "bg-transparent" : "nav-glass border-b border-[rgba(197,160,89,0.12)]"
        }`}
      >
        <div className="w-full max-w-7xl px-6 h-20 flex items-center justify-between">
          <Link href="/" aria-label="The Fat Chef — Home">
            <Image
              src="https://static.wixstatic.com/media/019c1a_c87be2dca2204b02a9aed5f1a5f72057~mv2.png/v1/fill/w_464,h_140,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Asset%201Vector.png"
              alt="The Fat Chef"
              width={150} height={46}
              className="object-contain h-9 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-9" aria-label="Main navigation">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative font-sans text-[11px] font-medium tracking-[0.16em] uppercase transition-colors duration-300 pb-1 ${
                  path === l.href ? "text-[#E6C875]" : "text-[#8A7E6E] hover:text-[#E6C875]"
                }`}
              >
                {l.label}
                {path === l.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#C5A059]"
                  />
                )}
              </Link>
            ))}
            <a
              href="tel:4792025106"
              className="font-sans text-[11px] font-semibold tracking-[0.14em] uppercase px-5 py-2.5 border border-[rgba(197,160,89,0.4)] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#070707] transition-all duration-300"
            >
              479.202.5106
            </a>
          </nav>

          <button
            className="md:hidden p-2 flex flex-col gap-[5px]"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className={`block w-6 h-px bg-[#C5A059] transition-transform duration-300 origin-center ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`block w-6 h-px bg-[#C5A059] transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-[#C5A059] transition-transform duration-300 origin-center ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 nav-glass flex flex-col items-center justify-center gap-8"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-serif text-4xl font-bold transition-colors ${
                  path === l.href ? "text-[#E6C875]" : "text-[#F0EBE1] hover:text-[#E6C875]"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="tel:4792025106"
              className="mt-4 font-sans text-sm tracking-widest uppercase text-[#C5A059] border border-[rgba(197,160,89,0.4)] px-8 py-3"
            >
              479.202.5106
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
