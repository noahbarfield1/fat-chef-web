"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const columnAnim: any = {
  initial: { top: 0 },
  enter: (i: number) => ({
    top: "100vh",
    transition: {
      duration: 0.85,
      ease: [0.76, 0, 0.24, 1] as const,
      delay: 0.05 * i,
    },
    transitionEnd: { display: "none" }
  }),
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const columns = 5;

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="relative w-full h-full min-h-screen bg-[#070707]">
        
        {/* The Incoming Page Content */}
        <motion.div
           initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
           animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
           transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
           className="w-full h-full"
        >
          {children}
        </motion.div>

        {/* The Modern Staggered Column Wipe */}
        <div className="fixed inset-0 z-[100] w-screen h-screen flex pointer-events-none">
          {[...Array(columns)].map((_, i) => (
            <motion.div
              key={i}
              custom={columns - i - 1} // Stagger from left to right
              variants={columnAnim}
              initial="initial"
              animate="enter"
              className="h-full w-full bg-[#0e0e0e] relative border-r border-[#151515]"
              style={{ borderRightWidth: i === columns - 1 ? 0 : 1 }}
            >
               {/* Luxurious gold leading edge accent */}
               <motion.div 
                 className="absolute top-0 left-0 w-full h-[1px] bg-[#C5A059]" 
                 style={{ boxShadow: "0 0 10px rgba(197,160,89,0.5)" }} 
               />
            </motion.div>
          ))}
        </div>

      </div>
    </AnimatePresence>
  );
}
