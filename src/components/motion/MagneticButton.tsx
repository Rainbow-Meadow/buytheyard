import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

/**
 * Subtle magnetic pull on hover — only activates on fine-pointer devices.
 * Falls back to a plain anchor/button when reduced-motion is set.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.18,
  href,
  onClick,
  type = "button",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 240, damping: 22, mass: 0.6 });
  const ys = useSpring(y, { stiffness: 240, damping: 22, mass: 0.6 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(dx);
    y.set(dy);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.div style={{ x: xs, y: ys }} className="inline-block">
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="inline-block"
      >
        <a href={href} className={className} onClick={onClick}>
          {inner}
        </a>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block"
    >
      <button type={type} onClick={onClick} className={className}>
        {inner}
      </button>
    </div>
  );
}