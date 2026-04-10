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
      { name: "House Salad", price: "12", desc: "Special blend of iceberg and romaine lettuce, crudité, blended cheese, and house-made croutons" },
      { name: "Wedge Salad", price: "15", desc: "Classic Iceberg Wedge with homemade Blue Cheese Dressing, blue cheese crumbles, bacon, tomatoes and scallions" },
      { name: "Caesar", price: "12", desc: "Crisp Romaine lettuce with homemade Caesar dressing, parmesan, Pecorino Romano cheese, and homemade croutons" },
      { name: "Caprese", price: "18", desc: "Deliciously perfect tomatoes paired with Fresh Mozzarella, basil micro-greens and balsamic glaze" },
      { name: "Dinner Salad", price: "36", desc: "Romaine and spinach dinner size salad with salmon and shrimp topped with warm bacon vinaigrette" },
      { name: "Soup Du Jour", price: "10 / 15", desc: "Cup or Bowl — ask your server" },
    ],
  },
  {
    category: "Prime Steak and Land Offerings",
    note: "All Steak is Prime Meat and Hand Cut Daily. All entrees include starch, vegetable du jour, house salad & fresh baked bread with herbed butter",
    footer: "Enhancements: Blackened upon request (+$5) · Oscar Style with crab, asparagus, and house-made bearnaise (+$18) · Au Poivre Tri-Colored Peppercorn encrusted with brandy glaze (+$20) · Add a side of Grated Horseradish, Cream, or Melted Blue Cheese (+$7)",
    images: [
      "/post-pics/steak-with-potato-and-green-beans.jpg",
      "/post-pics/big-steak-and-shrimp.jpg",
      "/post-pics/steak-with-potato-and-green-beans-2.jpg",
    ],
    items: [
      { name: "Porterhouse USDA Prime (Charbroiled) 24–26 oz", price: "98", desc: "Cut to Order" },
      { name: "T-Bone USDA Prime (Charbroiled) 24–26 oz", price: "88", desc: "Cut to Order" },
      { name: "Filet USDA Prime (Pan Seared) 6 oz / 8 oz", price: "60 / 72", desc: "Bacon wrapped" },
      { name: "Ribeye USDA Prime (Charbroiled) 14–16 oz", price: "74" },
      { name: "New York Strip USDA Prime (Pan Seared) 14–16 oz", price: "70" },
      { name: "Surf & Turf USDA Prime", price: "128 / 140", desc: "6 oz or 8 oz Prime Tenderloin fillet with an 8–10 oz Maine Lobster tail" },
      { name: "Roasted Garlic Velouté Chicken", price: "38 / 46", desc: "One or Two breasts with caramelized onions" },
    ],
  },
  {
    category: "Prime Sides",
    images: [
      "/post-pics/onion-rings.jpg",
      "/post-pics/macaroni.jpg",
      "/post-pics/mushrooms-1.jpg"
    ],
    items: [
      { name: "Steakhouse Creamed Spinach", price: "14" },
      { name: "Corn Soufflé", price: "14" },
      { name: "Steakhouse Mac & Cheese", price: "18", desc: "Cracked black peppercorn white cheddar parmesan with bacon and green onions" },
      { name: "Sautéed Mushrooms", price: "9" },
      { name: "Asparagus", price: "7" },
      { name: "Broccoli", price: "7" },
      { name: "Caramelized Onions", price: "8" },
      { name: "Fettuccine", price: "14", desc: "In white wine and garlic parmesan cream sauce" },
    ],
  },
  {
    category: "Add Ons",
    images: [
      "/post-pics/shrimp-entree.jpg",
      "/post-pics/surf-and-turf.jpg",
    ],
    items: [
      { name: "Grilled Shrimp", price: "28" },
      { name: "Fried Shrimp", price: "28" },
      { name: "Scallops", price: "34" },
      { name: "Classic Walleye", price: "36" },
      { name: "Maine Lobster Tail", price: "82" },
    ],
  },
  {
    category: "From the Sea",
    images: [
      "/post-pics/shrimp-cocktail-new.jpg",
      "/post-pics/shrimp-entree.jpg",
      "/post-pics/surf-and-turf.jpg",
      "/post-pics/seafood-pasta-1.jpg",
      "/post-pics/shrimp-cocktail-2.jpg"
    ],
    items: [
      { name: "Pan Fried Perch", price: "58", desc: "Five pieces of classically prepared perch fillets pan fried to perfection" },
      { name: "Sea Scallops", price: "68", desc: "Five Sea Scallops pan seared to perfection and basted with white wine, fresh thyme, and garlic butter. Served with Fettuccine and toast points (no starch selection)" },
      { name: "Chilean Sea Bass", price: "74", desc: "Classic pan seared with fresh herbs and butter" },
      { name: "Crab Cakes", price: "66", desc: "Two gorgeous Lump Crab Cakes made to order and topped with quail eggs" },
      { name: "Great Northern Walleye", price: "52", desc: "Choose from Classically Seasoned or Pecan Parmesan Encrusted, pan seared to a golden brown" },
      { name: "Atlantic Wild Salmon", price: "58", desc: "Pan seared to a perfect medium and glazed in our herb butter" },
      { name: "Classic Shrimp Scampi", price: "58", desc: "Fine colossal shrimp topped with fresh lump crab in a traditional scampi butter. Served with fettuccine (no starch selection) and toast points" },
      { name: "Fried or Grilled Shrimp", price: "56", desc: "Colossal shrimp hand-breaded, seasoned and fried until golden. Or choose five colossal shrimp seasoned and grilled to perfection" },
      { name: "Lobster Tail Dinner", price: "96", desc: "8–10 oz of beautifully prepared Maine Lobster with drawn butter" },
      { name: "Colossal Shrimp and Sea Scallops with Cheesy Grits", price: "60", desc: "Drizzled with house-made hot sauce (no starch selection)" },
    ],
  },
  {
    category: "Perfect Pasta",
    note: "Served with house salad and warm bread with herbed butter",
    images: ["/post-pics/seafood-pasta-1.jpg"],
    items: [
      { name: "Seafood Pasta", price: "78", desc: "Fettuccine with white wine and garlic parmesan cream sauce, mixed with Lobster, Shrimp, Sea Scallops and hardshell petite Clams" },
      { name: "Basil Chicken Pasta", price: "64", desc: "Pan seared Chicken Breast served on our Fettuccine with white wine and garlic parmesan cream sauce with artichokes, tomatoes and fresh basil" },
      { name: "Chicken, Shrimp and Bacon Garlic Parmesan Pasta", price: "72", desc: "Our famous fettuccine mixed with our house-made white wine parmesan garlic sauce topped with crispy bacon and green onions" },
      { name: "Vegetable Pasta Primavera", price: "54", desc: "Beautiful assorted veggies mixed with our famous fettuccine and primavera sauce" },
      { name: "Lobster and Shrimp Ravioli", price: "84", desc: "House-made ravioli in a white wine and garlic cream sauce" },
    ],
  },
  {
    category: "Desserts",
    images: ["/post-pics/creme-brulee.jpg", "/post-pics/strawberry-shortcake.jpg"],
    items: [
      { name: "Vanilla Bean Crème Brûlée", price: "16" },
      { name: "Spiced Carrot Cake with Cream Cheese Frosting", price: "16" },
      { name: "Pecan Cobbler with Vanilla Bean Ice Cream and Caramel Drizzle", price: "16" },
      { name: "Death by Chocolate Molten Cake", price: "16", desc: "Served warm with Vanilla Bean Ice Cream, Caramel and Chocolate Swirls" },
      { name: "Toffee and Caramel with Sea Salt Crêpe Cake", price: "16" },
      { name: "Ooey Gooey Brown Butter Cake with Vanilla Bean Ice Cream and Berries", price: "16" },
      { name: "Vanilla Bean Ice Cream", price: "8" },
    ],
  },
  {
    category: "Kids Menu (10 and under)",
    images: [],
    items: [
      { name: "Grilled Cheese and Fries", price: "10" },
      { name: "Chicken Fingers and Fries", price: "12" },
      { name: "Mini Mac and Cheese", price: "12" },
      { name: "Pasta in cream sauce or buttered pasta", price: "12" },
    ],
  },
  {
    category: "Beverages",
    images: [],
    items: [
      { name: "Coke, Diet Coke, Coke Zero, Sprite, Dr Pepper", price: "4" },
      { name: "Ice or Hot Tea, Whole Milk, Shirley Temple", price: "4" },
      { name: "Hot Chocolate with Whipped Cream", price: "4" },
      { name: "Fresh Ground Coffee (regular or decaf)", price: "4" },
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
    const timer = setInterval(() => setIdx((i) => (i + 1) % images.length), 2500);
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
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
        <span className="font-serif text-[16px] md:text-[17px] font-semibold text-[#F0EBE1] group-hover:text-[#E6C875] transition-colors duration-300 leading-tight">
          {item.name}
        </span>
        <span className="hidden sm:block flex-1 border-b border-dotted border-[rgba(197,160,89,0.22)] mb-[6px]" aria-hidden="true" />
        {priceDisplay && (
          <span className="font-serif text-[15px] mt-1 sm:mt-0 pb-0.5 font-bold text-[#C5A059] shrink-0 tabular-nums">
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
  const hasImages = cat.images && cat.images.length > 0;

  if (!hasImages) {
    // Text-only block for categories without images (Kids Menu, Beverages, etc.)
    return (
      <div className="border-b border-[rgba(197,160,89,0.1)] max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-16 md:py-20">
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
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px] border-b border-[rgba(197,160,89,0.1)]">
      {/* Image Column */}
      <div className={`relative ${imageRight ? "md:order-2" : "md:order-1"}`}>
        <RotatingImage images={cat.images} alt={cat.category} />
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
      <div className="relative h-[70vh] md:h-[85vh] w-full flex flex-col items-center justify-center overflow-hidden">
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
            &ldquo;Never trust a skinny chef.&rdquo;
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
        <div className="flex divide-x divide-[rgba(197,160,89,0.3)] border border-[rgba(197,160,89,0.3)] rounded-sm overflow-hidden bg-[#070707]">
          {(["dinner", "bar"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-6 sm:px-10 py-3.5 font-sans text-[12px] font-bold tracking-[0.18em] uppercase transition-all duration-300 ${
                activeTab === t 
                  ? "bg-[#C5A059] text-black" 
                  : "text-[#8A7E6E] hover:text-[#E6C875] hover:bg-[rgba(197,160,89,0.05)]"
              }`}
            >
              {t === "dinner" ? (<><span className="sm:hidden">Dinner</span><span className="hidden sm:inline">Dinner Collection</span></>) : (<><span className="sm:hidden">Bar &amp; Wine</span><span className="hidden sm:inline">Cocktails &amp; Wine</span></>)}
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
