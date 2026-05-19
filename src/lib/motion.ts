import type { Variants, Transition } from "framer-motion";

/** Default easing inspired by editorial sites — gentle out-quart curve. */
export const easeOutExpressive: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOutExpressive } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: easeOutExpressive } },
};

export const stagger = (gap = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

export const wordReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.75, ease: easeOutExpressive },
  },
};

export const viewportOnce = { once: true, amount: 0.2 } as const;

export const springSnappy: Transition = { type: "spring", stiffness: 240, damping: 28 };