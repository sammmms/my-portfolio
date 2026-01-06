"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const StarBackground = () => {
  const { theme } = useTheme();
  const [stars, setStars] = useState<
    { id: number; top: string; left: string; size: number; duration: number }[]
  >([]);

  useEffect(() => {
    // Generate random stars
    const starCount = 15;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1, // Size between 1px and 4px
      duration: Math.random() * 40 + 60, // Slow movement duration between 60s and 100s
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{
            top: star.top,
            left: star.left,
            opacity: 0.2, // Start with low opacity
          }}
          animate={{
            top: [
              star.top,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ], // Move to random positions
            left: [
              star.left,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
            opacity: [0.2, 0.5, 0.2], // Twinkle effect
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "linear",
            opacity: {
              duration: Math.random() * 3 + 2, // Twinkle speed
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className={`absolute rounded-full ${
            theme === "dark" ? "bg-white" : "bg-neutral-800"
          }`}
          style={{
            width: star.size,
            height: star.size,
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
