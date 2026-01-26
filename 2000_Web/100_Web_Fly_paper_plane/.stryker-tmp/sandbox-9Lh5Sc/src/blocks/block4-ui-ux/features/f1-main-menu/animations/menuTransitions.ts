// @ts-nocheck
import { Variants } from 'framer-motion';

// Animation timing (milliseconds)
export const ANIMATION_DURATION = 300;

// Animation duration in seconds (for Framer Motion)
const DURATION_SECONDS = ANIMATION_DURATION / 1000;

// Easing functions
const EASE_OUT = 'easeOut';
const EASE_IN = 'easeIn';

// Animation distances
const FADE_IN_OFFSET_Y = 20; // Fade in from slightly below
const SLIDE_OUT_OFFSET_X = -100; // Slide out to the left

// Opacity values
const OPACITY_HIDDEN = 0;
const OPACITY_VISIBLE = 1;

/**
 * Menu screen animation variants
 * - initial: Fade in from below (opacity 0, y +20)
 * - animate: Fully visible at center (opacity 1, y 0)
 * - exit: Slide out to left (opacity 0, x -100)
 */
export const menuVariants: Variants = {
  initial: {
    opacity: OPACITY_HIDDEN,
    y: FADE_IN_OFFSET_Y,
  },
  animate: {
    opacity: OPACITY_VISIBLE,
    y: 0,
    transition: {
      duration: DURATION_SECONDS,
      ease: EASE_OUT,
    },
  },
  exit: {
    opacity: OPACITY_HIDDEN,
    x: SLIDE_OUT_OFFSET_X,
    transition: {
      duration: DURATION_SECONDS,
      ease: EASE_IN,
    },
  },
};
