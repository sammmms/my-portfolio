"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string[];
  className?: string;
}

export function TypingText({ text, className = "" }: TypingTextProps) {
  const [index, setIndex] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayText, setDisplayText] = useState("");

  const currentText = text[index];

  useEffect(() => {
    // Reset animation when index changes
    const controls = animate(count, currentText.length, {
      type: "tween",
      duration: 1.5,
      ease: "linear",
      onUpdate: (latest) => {
        setDisplayText(currentText.slice(0, Math.round(latest)));
      },
      onComplete: () => {
        // Wait then delete
        setTimeout(() => {
          animate(count, 0, {
            type: "tween",
            duration: 1,
            ease: "linear",
            onUpdate: (latest) => {
              setDisplayText(currentText.slice(0, Math.round(latest)));
            },
            onComplete: () => {
              setIndex((prev) => (prev + 1) % text.length);
            },
          });
        }, 2000);
      },
    });

    return () => controls.stop();
  }, [index, currentText, count, text.length]);

  return (
    <motion.span className={`inline-block ${className}`}>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="inline-block w-px h-[1em] bg-current ml-0.5 align-middle"
      />
    </motion.span>
  );
}
