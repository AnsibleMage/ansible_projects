import { Variants } from 'framer-motion';

// 결과 화면 Fade In 애니메이션
export const resultVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

// 신기록 축하 애니메이션 (Confetti 효과)
export const confettiVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'backOut',
      delay: 0.2,
    },
  },
};
