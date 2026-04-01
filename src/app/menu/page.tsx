"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";

// Note: metadata cannot be exported from "use client" components.
// SEO for this page is set in the parent layout via generateMetadata in a server wrapper.
// To add page-specific metadata without removing "use client", wrap in a server layout file.

// ─── TYPES ────────────────────────────────────────────────────────────────────
type MenuItem = { name: string; price: string; desc?: string };
type MenuCategory = {
  category: string;
  note?: string;
  footer?: string;
  items: MenuItem[];
  images?: string[]; 
};



// ─── DINNER DATA (Rich Images) ────────────────────────────────────────────────
const dinnerMenu: MenuCategory[] = [
  {
    category: "Appetizers",
    images: [
      "/post-pics/crab-rangoon-dip-1.jpg",
      "/post-pics/beef-wellington.jpg",
    ],
    items: [
      { name: "Crab Rangoon Dip", price: "36", desc: "Rich, creamy dip served with wonton chips" },
      { name: "Mushrooms & Onion Ring Combination", price: "29", desc: "Hand-breaded and fried until golden" },
      { name: "Prime Steak & Spinach Dip with Bacon", price: "34", desc: "Savory dip topped with prime steak" },
      { name: "Beef Wellington Bites", price: "36", desc: "Tender beef wrapped in flaky puff pastry" },
      { name: "Stuffed Mushrooms", price: "28", desc: "Classic preparation with savory filling" },
    ],
  },
  {
    category: "Salads & Soups",
    images: ["/post-pics/salads-1.jpg"],
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
      "/post-pics/steak-with-potato-and-green-beans-2.jpg",
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
    category: "Sides to Share",
    images: [
      "/post-pics/onion-rings.jpg",
      "/post-pics/macaroni.jpg",
      "/post-pics/mushrooms-1.jpg"
    ],
    items: [
      { name: "Sautéed Mushrooms", price: "12", desc: "Pan-seared in garlic butter" },
      { name: "Classic Onion Rings", price: "10", desc: "Hand-breaded sweet onion rings fried golden" },
      { name: "Macaroni & Cheese", price: "14", desc: "Rich, creamy baked pasta with a premium cheese blend" },
    ],
  },

  {
    category: "From the Sea",
    images: [
      "/post-pics/shrimp-entree.jpg",
      "/post-pics/surf-and-turf.jpg",
      "/post-pics/seafood-pasta-1.jpg",
      "/post-pics/shrimp-cocktail-2.jpg"
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
    images: ["/post-pics/creme-brulee.jpg"],
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

// ─── BAR / WINE DATA (Text only menus) ──────────────────────────────────────
const barData: MenuCategory[] = [
  { category: "Signature Drinks", items: [
    { name: "Bloody Mary", price: "", desc: "Premium Vodka, perfect mix. Spicy on request." },
    { name: "Cosmopolitan", price: "", desc: "Premium Vodka, triple sec, cranberry, lime." },
    { name: "Classic Martini", price: "", desc: "Premium Vodka or Gin, shaken or stirred." },
    { name: "Classic Margarita", price: "", desc: "Premium Tequila, Triple Sec, sour, lime juice." },
    { name: "French 75", price: "", desc: "Premium Gin, lemon juice, Champagne." },
    { name: "Manhattan", price: "", desc: "Premium Bourbon, dash of sweet vermouth." },
    { name: "Negroni", price: "", desc: "Premium Gin, sweet vermouth, Campari." },
  ]},
  { category: "House Wines by the Glass", items: [
    { name: "Cabernet", price: "" },{ name: "Chardonnay", price: "" },
    { name: "Merlot", price: "" },{ name: "Pinot Noir", price: "" },
    { name: "Sauvignon Blanc", price: "" },{ name: "Pinot Grigio", price: "" },
  ]},
  { category: "Specialty Drinks by the Glass", items: [
    { name: "Sake Sunset", price: "", desc: "Sake, Orange Juice, Grenadine" },
    { name: "PlumTini", price: "", desc: "Sake and Plum Wine" },
    { name: "Classic Mimosa", price: "" },
    { name: "Glass of Champagne", price: "" },
  ]},
  { category: "Local & Craft Beer", items: [
    { name: "Black Apple Hibiscus", price: "" },
    { name: "Blue Moon", price: "" },
    { name: "Ozark IPA", price: "" },
    { name: "Ozark Cream Stout", price: "" },
  ]},
  { category: "Premium Reds - Cabernet", items: [
    { name: "Sebastiani Cabernet", price: "", desc: "North Coast, California" },
    { name: "Cloisonne Cabernet", price: "", desc: "Napa Valley, California" },
    { name: "Caymus Cabernet", price: "", desc: "Napa Valley, California" },
    { name: "Shafer One Point Five", price: "", desc: "Stags Leap District, Napa" },
  ]},
  { category: "Premium Reds - Pinot Noir", items: [
    { name: "Block 9 Pinot Noir", price: "", desc: "Caiden's Vineyard, CA" },
    { name: "Alexana Pinot Noir", price: "", desc: "Dundee Hills, Oregon" },
    { name: "Albert Bichot Bourgogne", price: "", desc: "Burgundy, France" },
  ]},
  { category: "White Wines & Rosé", items: [
    { name: "Ron Rubin Chardonnay", price: "", desc: "North Coast, California" },
    { name: "Albert Bichot Pouilly Fuissé", price: "", desc: "Burgundy, France" },
    { name: "Santa Margherita Pinot Grigio", price: "", desc: "Alto Adige, Italy" },
    { name: "Gerard Bertrand Source of Joy Rosé", price: "", desc: "Languedoc, France" },
    { name: "Piper-Heidsieck Brut", price: "", desc: "Champagne, France" },
  ]},
];


// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const rowIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// ─── ROTATING IMAGE ───────────────────────────────────────────────────────────
function RotatingImage({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] md:h-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={images[idx]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[idx]}
            alt={alt}
            fill
            quality={65}
            priority={idx === 0}
            className="object-cover"
            sizes="(max-width:768px) 100vw, 45vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicator dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`block rounded-full transition-all duration-500 ${
                i === idx ? "w-5 h-1.5 bg-[#C5A059]" : "w-1.5 h-1.5 bg-[rgba(197,160,89,0.4)]"
              }`}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Edge gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(10,10,10,0.8)] to-transparent pointer-events-none" />
      {/* md+ Right edge gradient for overlaying text block smoothly */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[rgba(10,10,10,0.8)] to-transparent pointer-events-none" />
    </div>
  );
}

// ─── MENU ROW ─────────────────────────────────────────────────────────────────
function MenuRow({ item }: { item: MenuItem }) {
  const priceDisplay = item.price && item.price !== "" ? 
    (item.price === "Market" ? "Market Price" : item.price.includes("/") ? `$${item.price.replace(" / ", " / $")}` : `$${item.price}`) : "";

  return (
    <motion.div
      variants={rowIn}
      className="group border-b border-[rgba(197,160,89,0.06)] last:border-0"
      style={{ paddingBlock: "0.85rem" }}
    >
      <div className="flex items-baseline gap-2">
        <span className="font-serif text-[16px] md:text-[17px] font-semibold text-[#F0EBE1] group-hover:text-[#E6C875] transition-colors duration-300 shrink-0">
          {item.name}
        </span>
        <span className="flex-1 border-b border-dotted border-[rgba(197,160,89,0.22)] mb-[6px]" aria-hidden="true" />
        {priceDisplay && (
          <span className="font-serif text-[15px] pb-0.5 font-bold text-[#C5A059] shrink-0 tabular-nums">
            {priceDisplay}
          </span>
        )}
      </div>
      {item.desc && (
          <p className="font-sans text-[12.5px] text-[#A6998A] leading-relaxed mt-[3px]">
          {item.desc}
        </p>
      )}
    </motion.div>
  );
}

// ─── DINNER CATEGORY BLOCK (With alternating images) ──────────────────────────
function ImageCategoryBlock({ cat, imageRight }: { cat: MenuCategory; imageRight: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px] border-b border-[rgba(197,160,89,0.1)]">
      {/* Image Column */}
      <div className={`relative ${imageRight ? "md:order-2" : "md:order-1"}`}>
        {cat.images && <RotatingImage images={cat.images} alt={cat.category} />}
      </div>
      
      {/* Text Column */}
      <div className={`flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 md:py-20 ${imageRight ? "md:order-1" : "md:order-2"}`}>
        <div className="mb-8">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.8 }}
            className="font-serif font-bold text-4xl md:text-5xl"
            style={{
              background: "linear-gradient(135deg, #E6C875 0%, #C5A059 45%, #8A6A30 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            {cat.category}
          </motion.h3>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-px w-20 bg-gradient-to-r from-[#C5A059] to-transparent mt-3 origin-left"
          />
          {cat.note && (
            <p className="font-sans text-[13px] text-[#A6998A] italic mt-4 max-w-sm leading-relaxed">{cat.note}</p>
          )}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {cat.items.map((item) => (
            <MenuRow key={item.name} item={item} />
          ))}
          {cat.footer && (
            <motion.p
              variants={rowIn}
              className="font-sans text-[11.5px] text-[#A6998A] italic mt-5 leading-relaxed"
            >
              {cat.footer}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}


export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<"dinner" | "bar">("dinner");

  return (
    <main className="bg-[#0a0a0a] min-h-screen pt-[72px]">
      
      {/* Hero Header */}
      <div className="relative h-[35vh] md:h-[45vh] w-full flex flex-col items-center justify-center overflow-hidden">
        <Image
          src="/post-pics/big-steak-and-shrimp.jpg"
          alt="The Fat Chef signature steak dish" fill className="object-cover opacity-20" priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          <Image 
            src="https://static.wixstatic.com/media/019c1a_c87be2dca2204b02a9aed5f1a5f72057~mv2.png/v1/fill/w_464,h_140,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Asset%201Vector.png" 
            alt="The Fat Chef Logo" width={180} height={54} className="object-contain mb-6 opacity-90" 
          />
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#F0EBE1] tracking-tight">
            Our Menus
          </h1>
          <p className="mt-6 font-serif italic text-[#C5A059] text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            &ldquo;You’ll never trust a skinny chef again when you visit The Fat Chef. In Rogers!&rdquo;
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-[rgba(197,160,89,0.6)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-[rgba(197,160,89,0.6)]" />
          </div>
        </div>
      </div>

      {/* Sticky Tab Nav */}
      <div className="sticky top-[72px] z-30 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[rgba(197,160,89,0.15)] w-full flex justify-center py-4 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex border border-[rgba(197,160,89,0.3)] rounded-sm overflow-hidden bg-[#070707]">
          {(["dinner", "bar"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-10 py-3.5 font-sans text-[12px] font-bold tracking-[0.18em] uppercase transition-all duration-300 ${
                activeTab === t 
                  ? "bg-[#C5A059] text-black" 
                  : "text-[#8A7E6E] hover:text-[#E6C875] hover:bg-[rgba(197,160,89,0.05)]"
              }`}
            >
              {t === "dinner" ? "Dinner Collection" : "Cocktails & Wine"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full pb-24"
        >
          {activeTab === "dinner" ? (
            <div className="flex flex-col w-full">
              {dinnerMenu.map((cat, i) => (
                <ImageCategoryBlock key={cat.category} cat={cat} imageRight={i % 2 !== 0} />
              ))}

            </div>
          ) : (
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
                {barData.map((cat, i) => (
                  <motion.div 
                    key={cat.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: (i % 2) * 0.1, duration: 0.6 }}
                  >
                  <div className="mb-8 pb-4 border-b border-[rgba(197,160,89,0.2)]">
                      <h3 className="font-serif text-3xl font-bold text-[#E6C875]">{cat.category}</h3>
                    </div>
                    <div className="flex flex-col">
                      {cat.items.map(item => (
                        <MenuRow key={item.name} item={item} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </main>
  );
}
