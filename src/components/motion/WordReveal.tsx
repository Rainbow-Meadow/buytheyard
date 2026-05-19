import { motion } from "framer-motion";
import { easeOutExpressive } from "@/lib/motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

/** Per-word mask reveal — splits text by whitespace and animates each word from 110% y. */
export function WordReveal({ text, className, delay = 0, stagger = 0.06 }: Props) {
  const words = text.split(/(\s+)/); // keep the spaces so layout is preserved

  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) {
          return <span key={`s-${i}`}> </span>;
        }
        return (
          <span
            key={`w-${i}`}
            className="inline-block overflow-hidden align-baseline pb-[0.06em]"
            aria-hidden="true"
          >
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.75,
                ease: easeOutExpressive,
                delay: delay + i * stagger,
              }}
            >
              {w}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}