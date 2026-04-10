"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";

// ─── TYPES ────────────────────────────────────────────────────────────────────
type MenuItem = { name: string; price: string; desc?: string };
type MenuCategory = {
  category: string;
  note?: string;
  footer?: string;
  items: MenuItem[];
  images: string[]; // rotates through all images for this category
};

// ─── DINNER DATA ─────────────────────────────────────────────────────────────
const dinnerMenu: MenuCategory[] = [
  {
    category: "Appetizers",
    images: [
      "/post-pics/crab-rangoon-dip-1.jpg",
      "/post-pics/beef-wellington.jpg",
    ],
    items: [
      { name: "Duck Bacon Empanadas", price: "48", desc: "Three house-made empanadas with duck bacon, wilted spinach, topped with seared scallops" },
      { name: "Escargot", price: "34 / 36", desc: "Six succulent Helix escargot in sweet cream garlic butter sauce. Au Gratin available" },
      { name: "Shrimp Cocktail", price: "36", desc: "Colossal shrimp with house-made spicy cocktail sauce, served chilled on ice" },
      { name: "Handmade Onion Rings", price: "22", desc: "Hand dipped in our exclusive Belgium White Beer Batter. Served with house-made ranch" },
      { name: "Crab Rangoon Dip", price: "36", desc: "Fresh crab meat with bechamel cream and scallions, served bubbling hot with fried wonton chips" },
      { name: "Mushrooms & Onion Ring Combination", price: "29", desc: "Handpicked mushrooms in Belgium White Beer Batter with Homemade Onion Rings. Served with horseradish cream and ranch" },
      { name: "Prime Steak & Spinach Dip with Bacon", price: "34", desc: "Served bubbly hot with house-made chips" },
      { name: "Beef Wellington Bites", price: "36", desc: "Traditional beef wellington with classic duxelles and Madeira sauce" },
      { name: "Stuffed Mushrooms", price: "28", desc: "Stuffed Mushrooms Du Jour — your server will let you know Chef's choice today" },
    ],
  },
  {
    category: "Salads & Soups",
    images: ["/post-pics/salads-1.jpg", "/post-pics/tomato-soup.jpg"],
    items: [
      { name: "House Salad", price: "12", desc: "Mixed greens with choice of house-made dressing" },
      { name: "Wedge Salad", price: "15", desc: "Crisp iceberg, bacon, blue cheese, and tomatoes" },
      { name: "Caesar", price: "12", desc: "Romaine with classic Caesar dressing" },
      { name: "Caprese", price: "18", desc: "Fresh mozzarella, tomatoes, and balsamic glaze" },
      { name: "Dinner Salad", price: "36", desc: "Romaine & spinach with salmon and shrimp, warm bacon vinaigrette" },
      { name: "Soup Du Jour", price: "10 / 15", desc: "Cup or Bowl — ask your server" },
    ],
  },
  {
    category: "Prime Steaks",
    note: "All entrees include starch, vegetable du jour, house salad & fresh baked bread with herbed butter",
    footer: "* Steak enhancements: Blackened (+$5) · Oscar Style (+$18) · Au Poivre (+$20)",
    images: [
      "/post-pics/steak-with-potato-and-green-beans.jpg",
      "/post-pics/big-steak-and-shrimp.jpg",
    ],
    items: [
      { name: "Porterhouse (24–26 oz)", price: "98" },
      { name: "T-Bone (24–26 oz)", price: "88" },
      { name: "Filet (6 oz / 8 oz)", price: "60 / 72", desc: "Bacon wrapped, pan-seared to perfection" },
      { name: "Ribeye (14–16 oz)", price: "74", desc: "Rich marbling with robust flavor" },
      { name: "New York Strip (14–16 oz)", price: "70" },
      { name: "Surf & Turf", price: "128 / 140", desc: "6 oz or 8 oz Filet with 8–10 oz Maine Lobster tail" },
    ],
  },
  {
    category: "From the Sea",
    images: [
      "/post-pics/shrimp-entree.jpg",
      "/post-pics/shrimp-cocktail-new.jpg",
      "/post-pics/surf-and-turf.jpg",
      "/post-pics/seafood-pasta-1.jpg",
    ],
    items: [
      { name: "Sea Scallops", price: "68", desc: "Five pan-seared scallops, white wine & garlic butter" },
      { name: "Chilean Sea Bass", price: "74", desc: "Pan-seared with fresh herbs" },
      { name: "Crab Cakes", price: "66", desc: "Two lump crab cakes topped with quail eggs" },
      { name: "Great Northern Walleye", price: "52", desc: "Classically seasoned or Pecan Parmesan encrusted" },
      { name: "Atlantic Wild Salmon", price: "58", desc: "Pan-seared to medium with herb butter" },
      { name: "Classic Shrimp Scampi", price: "58", desc: "Colossal shrimp and lump crab in scampi butter" },
      { name: "Lobster Tail Dinner", price: "96", desc: "8–10 oz Maine Lobster with drawn butter" },
    ],
  },
  {
    category: "Perfect Pasta",
    images: ["/post-pics/seafood-pasta-1.jpg"],
    items: [
      { name: "Seafood Pasta", price: "78", desc: "Lobster, shrimp, scallops & clams in garlic parmesan cream" },
      { name: "Basil Chicken Pasta", price: "64", desc: "Pan-seared chicken, artichokes, tomatoes, and basil" },
      { name: "Lobster & Shrimp Ravioli", price: "84", desc: "House-made ravioli in white wine cream sauce" },
    ],
  },
  {
    category: "Desserts",
    images: ["/post-pics/creme-brulee.jpg", "/post-pics/strawberry-shortcake.jpg"],
    items: [
      { name: "Vanilla Bean Crème Brûlée", price: "16" },
      { name: "Spiced Carrot Cake with Cream Cheese Frosting", price: "16" },
      { name: "Pecan Cobbler with Vanilla Bean Ice Cream and Caramel Drizzle", price: "16" },
      { name: "Death by Chocolate Molten Cake", price: "16", desc: "Served warm with Vanilla Bean Ice Cream, Caramel and Chocolate Swirl" },
      { name: "Toffee and Caramel with Sea Salt Crêpe Cake", price: "16" },
      { name: "Ooey Gooey Brown Butter Cake with Vanilla Bean Ice Cream and Berries", price: "16" },
      { name: "Vanilla Bean Ice Cream", price: "8" },
    ],
  },
];


// ─── BAR ─────────────────────────────────────────────────────────────────────
const drinks = [
  { img: "/post-pics/bar-drinks-1.jpg", label: "Signature Cocktails", desc: "Classic and craft cocktails, handcrafted by our bar team." },
  { img: "/post-pics/bar-drinks-arty.png", label: "Curated Wine List", desc: "An expertly selected cellar of Old & New World wines." },
  { img: "/post-pics/bar-drinks-1.jpg", label: "Classic Spirits", desc: "Premium selections poured with precision." },
];

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};
const rowIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

// ─── ROTATING IMAGE ───────────────────────────────────────────────────────────
function RotatingImage({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "480px" }}>
      <AnimatePresence mode="sync">
        <motion.div
          key={images[idx]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[idx]}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 45vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicator dots — only show if multiple images */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`block rounded-full transition-all duration-500 ${
                i === idx
                  ? "w-4 h-1 bg-[#C5A059]"
                  : "w-1 h-1 bg-[rgba(197,160,89,0.35)]"
              }`}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Overlay gradient on bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(10,10,10,0.6)] to-transparent pointer-events-none" />
    </div>
  );
}

// ─── MENU ROW ─────────────────────────────────────────────────────────────────
function MenuRow({ item }: { item: MenuItem }) {
  return (
    <motion.div
      variants={rowIn}
      className="group border-b border-[rgba(197,160,89,0.06)] last:border-0"
      style={{ paddingBlock: "0.8rem" }}
    >
      <div className="flex items-baseline gap-2">
        <span className="font-serif text-[15px] font-semibold text-[#F0EBE1] group-hover:text-[#E6C875] transition-colors duration-300 shrink-0">
          {item.name}
        </span>
        <span className="flex-1 border-b border-dotted border-[rgba(197,160,89,0.22)] mb-[5px]" aria-hidden="true" />
        <span className="font-serif text-[14px] font-bold text-[#C5A059] shrink-0 tabular-nums">
          {item.price === "Market" ? "Market Price" : `$${item.price}`}
        </span>
      </div>
      {item.desc && (
        <p className="font-sans text-[12px] text-[#6A5E4E] leading-relaxed mt-[2px]">
          {item.desc}
        </p>
      )}
    </motion.div>
  );
}

// ─── CATEGORY BLOCK (alternating image side) ──────────────────────────────────
function CategoryBlock({ cat, imageRight }: { cat: MenuCategory; imageRight: boolean }) {
  const imageCol = (
    <motion.div
      initial={{ opacity: 0, x: imageRight ? 24 : -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <RotatingImage images={cat.images} alt={cat.category} />
    </motion.div>
  );

  const textCol = (
    <motion.div
      initial={{ opacity: 0, x: imageRight ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-center py-8 md:py-12"
    >
      {/* Category heading — big & flashy */}
      <div style={{ marginBottom: "1.5rem" }}>
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-bold leading-none"
          style={{
            fontSize: "clamp(32px, 4.5vw, 58px)",
            background: "linear-gradient(135deg, #E6C875 0%, #C5A059 45%, #8A6A30 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.01em",
          }}
        >
          {cat.category}
        </motion.h3>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0, marginTop: "0.6rem" }}
          className="h-px w-16 bg-gradient-to-r from-[#C5A059] to-transparent"
        />
      </div>

      {cat.note && (
        <p className="font-sans text-[11px] text-[#4A3E2E] italic mb-5 leading-relaxed">{cat.note}</p>
      )}


      {/* Item rows */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20px" }}
      >
        {cat.items.map((item) => (
          <MenuRow key={item.name} item={item} />
        ))}
        {cat.footer && (
          <motion.p
            variants={rowIn}
            className="font-sans text-[11px] text-[#A6998A] italic mt-4 leading-relaxed"
          >
            {cat.footer}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
      {/* On mobile always stack image first. On desktop, alternate */}
      <div className={imageRight ? "md:order-2" : "md:order-1"}>
        {imageCol}
      </div>
      <div
        className={`px-8 lg:px-14 ${imageRight ? "md:order-1" : "md:order-2"}`}
        style={{ background: "rgba(255,255,255,0.015)", borderLeft: imageRight ? "none" : "1px solid rgba(197,160,89,0.06)", borderRight: imageRight ? "1px solid rgba(197,160,89,0.06)" : "none" }}
      >
        {textCol}
      </div>
    </div>
  );
}

export default function MenuSection() {
  return (
    <section id="menu" className="w-full bg-[#0a0a0a]" aria-label="Our menus">

      {/* ── Section header ─────────────────────────────────────────────── */}
      <div className="w-full flex justify-center px-6" style={{ paddingTop: "7rem", paddingBottom: "4rem" }}>
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
            style={{ marginBottom: "3rem" }}
          >
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059]" style={{ marginBottom: "0.75rem" }}>
              Crafted Daily
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F0EBE1]" style={{ marginBottom: "1.25rem" }}>
              Our Menus
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[rgba(197,160,89,0.5)] to-transparent mb-6" />
            <p className="font-sans text-sm text-[#6A5E4E] max-w-md leading-relaxed">
              All dinner entrees include choice of starch, vegetable du jour, house salad &amp; fresh baked bread with herbed butter.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Category blocks — full viewport width ────────────────────────── */}
      <div>
          {dinnerMenu.map((cat, i) => (
            <div key={cat.category} className="border-t border-[rgba(197,160,89,0.07)]">
              <div className="max-w-7xl mx-auto">
                <CategoryBlock cat={cat} imageRight={i % 2 === 0} />
              </div>
            </div>
          ))}

        </div>

      {/* ── Cocktails & Wine ───────────────────────────────────────────── */}
      <div className="w-full border-t border-[rgba(197,160,89,0.07)]" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <div className="w-full flex justify-center px-6">
        <div className="w-full max-w-5xl">
          {/* Divider + heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8 }}
            className="text-center"
            style={{ marginBottom: "3rem" }}
          >
            <div className="flex items-center gap-5 justify-center mb-5">
              <span className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-transparent to-[rgba(197,160,89,0.3)]" />
              <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#4A3E2E]">The Bar</p>
              <span className="flex-1 max-w-[120px] h-px bg-gradient-to-l from-transparent to-[rgba(197,160,89,0.3)]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F0EBE1]" style={{ marginBottom: "0.75rem" }}>
              Cocktails &amp; Wine
            </h2>
            <p className="font-sans text-sm text-[#6A5E4E]">
              Ask your server about our full cocktail list, local draft selections, and nightly wine specials.
            </p>
          </motion.div>

          {/* 3-up portrait cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {drinks.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden"
                style={{ aspectRatio: "3/4" }}
              >
                <Image
                  src={d.img}
                  alt={d.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.95)] via-[rgba(10,10,10,0.35)] to-[rgba(10,10,10,0.1)]" />
                <div
                  className="absolute top-0 inset-x-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(197,160,89,0.5), transparent)" }}
                />
                <div className="absolute bottom-0 left-0 p-6">
                  <h4 className="font-serif text-xl font-semibold text-[#E6C875] mb-1">{d.label}</h4>
                  <p className="font-sans text-[12px] text-[#8A7E6E] leading-relaxed">{d.desc}</p>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
