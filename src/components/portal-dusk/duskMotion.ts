import type { Variants, Transition } from "framer-motion";

/** Matches cairn-brand-portal's `lib/motion-variants.ts` exactly. */
export const easeReveal: Transition = { duration: 0.9, ease: [0.16, 1, 0.3, 1] };

export const springTouch: Transition = { type: "spring", stiffness: 320, damping: 26, mass: 0.9 };

export const springSnappy: Transition = { type: "spring", stiffness: 500, damping: 30, mass: 0.7 };

export const sceneReveal: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: easeReveal },
};

export const staggerContainer = (stagger = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: easeReveal },
};

export const staggerItemSpring: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: springTouch },
};

export const springIn: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1, transition: springSnappy },
};

export const kineticWord: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number = 0) => ({ y: "0%", opacity: 1, transition: { ...easeReveal, delay: i * 0.055 } }),
};

export const panelSlide: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: springTouch },
  exit: { opacity: 0, x: 24, transition: { duration: 0.25, ease: "easeIn" } },
};

export const accordionContent: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: "auto", opacity: 1, transition: { height: springTouch, opacity: { duration: 0.3, delay: 0.05 } } },
};
