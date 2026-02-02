"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipTextProps {
  word: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
}

function FlipText({
  word,
  duration = 0.5,
  delayMultiple = 0.08,
  framerProps = {
    hidden: { rotateX: -90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
  },
  className,
}: FlipTextProps) {
  return (
    <div className="flex justify-center">
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={cn("flex", className)}
        >
          {word.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={framerProps}
              transition={{ duration, delay: i * delayMultiple }}
              className="origin-center drop-shadow-sm"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export { FlipText };
