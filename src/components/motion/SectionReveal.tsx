import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
};

/** Wraps children in a viewport-triggered fade-up. Pass custom variants to override. */
export function SectionReveal({
  children,
  className,
  delay = 0,
  variants,
  as = "div",
}: Props) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants ?? fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}