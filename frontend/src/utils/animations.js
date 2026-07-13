/**
 * Shared scroll animation variants for consistent, professional motion
 * across all components — desktop and mobile.
 */

// Fade up — default for most elements
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Fade down — for headers / top elements
export const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Slide in from left
export const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Slide in from right
export const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Scale up from center
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Clip reveal — text lines wipe in
export const clipReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: (delay = 0) => ({
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Stagger container
export const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

// Stagger child — used inside staggerContainer
export const staggerChild = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

// Flip in — for cards
export const flipIn = {
  hidden: { opacity: 0, rotateX: 12, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Draw line — for timeline connectors
export const drawLine = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

// Shared viewport config — works on mobile too
export const viewport = { once: true, margin: "-60px 0px" };
export const viewportMobile = { once: true, margin: "-30px 0px" };
