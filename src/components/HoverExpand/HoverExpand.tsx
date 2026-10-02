import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HoverExpandProps } from "./HoverExpand.types";
import { DEFAULT_HOVER_EXPAND_ITEMS } from "./HoverExpand.data";

/**
 * SSR-safe media query hook matching Skiper UI's responsive detection
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

/**
 * HoverExpand (Skiper35)
 *
 * Exact reconstruction of the Skiper UI Hover Expand component.
 * - Desktop: Smooth horizontal accordion with vertical -90deg rotated text, expands on hover.
 * - Mobile: Vertical accordion expanding on tap.
 */
export const HoverExpand: React.FC<HoverExpandProps> = ({
  items = DEFAULT_HOVER_EXPAND_ITEMS,
  defaultActiveIndex = 15,
  activeIndex: controlledActiveIndex,
  onActiveChange,
  className = "",
  expandedWidth = "28rem",
  collapsedWidth = "4rem",
  expandedHeightMobile = "500px",
  collapsedHeightMobile = "4rem",
}) => {
  const [internalActiveIndex, setInternalActiveIndex] = useState<number>(defaultActiveIndex);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const currentIndex = controlledActiveIndex !== undefined ? controlledActiveIndex : internalActiveIndex;

  const handleSelect = (index: number) => {
    if (controlledActiveIndex === undefined) {
      setInternalActiveIndex(index);
    }
    if (items[index]) {
      onActiveChange?.(index, items[index]);
    }
  };

  return (
    <section className={`h-full w-full bg-[#121212] text-[#F1F1F1] ${className}`}>
      <div className="overflow-hidden md:h-full">
        <motion.div className="mx-auto flex w-full flex-col md:h-full md:flex-row lg:min-w-[1600px]">
          {items.map((item, index) => {
            const isActive = currentIndex === index;

            return (
              <motion.div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                aria-label={item.label}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(index);
                  }
                }}
                className="relative h-full w-full cursor-pointer border-0 border-b border-white/30 md:border-b-0 md:border-r focus:outline-none"
                onClick={isMobile ? () => handleSelect(index) : undefined}
                onMouseEnter={isMobile ? undefined : () => handleSelect(index)}
                initial={
                  isMobile
                    ? { height: collapsedHeightMobile, width: "100%" }
                    : { width: collapsedWidth, height: "100%" }
                }
                animate={
                  isMobile
                    ? { height: isActive ? expandedHeightMobile : collapsedHeightMobile, width: "100%" }
                    : { width: isActive ? expandedWidth : collapsedWidth, height: "100%" }
                }
                transition={{
                  stiffness: 200,
                  damping: 25,
                  type: "spring",
                }}
              >
                {/* Rotated text label strip */}
                <motion.div
                  className="pointer-events-none absolute bottom-0 left-[2vw] z-10 flex w-[calc(100vh-2.6vw)] origin-[0_50%] transform justify-between pr-5 text-xl font-medium leading-[2.6vw] tracking-[-0.03em] md:-rotate-90 md:text-[2vw]"
                  animate={{
                    color: isActive ? "#F1F1F1" : "rgba(241, 241, 241, 0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="label w-full border-b py-2 md:w-auto md:border-0 md:py-0">
                    {item.label}
                  </p>
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        className="year font-normal tabular-nums"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.year}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Expanded preview image container */}
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  className="h-[92%] rounded-[0.6vw] object-cover pl-2 pr-[1.3vw] pt-[1.3vw] md:h-full md:pb-[1.3vw] md:pl-[4vw]"
                >
                  <motion.img
                    src={item.image}
                    alt={item.alt || item.label}
                    className="w-full rounded-xl"
                    style={{ height: "100%", objectFit: "cover" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export const Skiper35 = HoverExpand;
export default HoverExpand;
