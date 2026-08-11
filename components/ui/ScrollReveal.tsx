"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = "up",
  distance = 30,
  className = "",
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (shouldReduceMotion || direction === "none") return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: distance };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      initial={{ opacity: 0, x: initialPos.x, y: initialPos.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : 0.5,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1.0] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
