import { Variants } from "framer-motion";

/** Shared easing/variant vocabulary so the pyramid, positioning map and archetype wheel animate as one system. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
};

export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

/** Standard viewport config for scroll-triggered reveals — fires once, a bit before full entry. */
export const VIEWPORT_ONCE = { once: true, amount: 0.3 } as const;

/** Shared spring configs — anything the user directly touches (hover/tap/drag) should use one of
 *  these instead of a duration-based transition, so interaction feels physical rather than timed. */
export const SPRING_SNAPPY = { type: "spring", stiffness: 340, damping: 26 } as const;
export const SPRING_SOFT = { type: "spring", stiffness: 200, damping: 24 } as const;

/** Slow breathing loop for hub/accent glow elements (e.g. the archetype wheel's center, a live indicator dot). */
export const glowPulse: Variants = {
  visible: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.06, 1],
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  },
};

/** Per-word hero reveal — pair with staggerContainer on the parent and split the heading into words. */
export const kineticWord: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: "0%", transition: { duration: 0.7, ease: EASE_OUT } },
};
