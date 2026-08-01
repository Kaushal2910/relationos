import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

/**
 * Scroll-reveal wrapper. Fades + lifts children into view once, when they
 * enter the viewport. Used to give every section a calm, editorial entrance
 * instead of the static "everything rendered at once" feel.
 */
interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  /** vertical travel in px */
  y?: number;
  as?: React.ElementType;
}

export function Reveal({
  delay = 0,
  y = 22,
  className,
  children,
  as: Tag = "div",
  ...rest
}: RevealProps) {
  const MotionTag = motion(Tag) as React.ElementType;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
