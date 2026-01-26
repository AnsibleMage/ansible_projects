// @ts-nocheck
import { describe, it, expect } from 'vitest';
import { resultVariants, confettiVariants } from './resultAnimations';

describe('Result Animations', () => {
  describe('resultVariants', () => {
    it('resultVariants가 정의되어야 함', () => {
      expect(resultVariants).toBeDefined();
    });

    it('initial 상태가 정의되어야 함', () => {
      expect(resultVariants.initial).toBeDefined();
    });

    it('animate 상태가 정의되어야 함', () => {
      expect(resultVariants.animate).toBeDefined();
    });

    it('exit 상태가 정의되어야 함', () => {
      expect(resultVariants.exit).toBeDefined();
    });

    it('initial: opacity가 0이어야 함', () => {
      expect(resultVariants.initial.opacity).toBe(0);
    });

    it('initial: y가 20이어야 함 (아래에서 시작)', () => {
      expect(resultVariants.initial.y).toBe(20);
    });

    it('animate: opacity가 1이어야 함', () => {
      expect(resultVariants.animate.opacity).toBe(1);
    });

    it('animate: y가 0이어야 함', () => {
      expect(resultVariants.animate.y).toBe(0);
    });

    it('exit: opacity가 0이어야 함', () => {
      expect(resultVariants.exit.opacity).toBe(0);
    });

    it('exit: y가 -20이어야 함 (위로 사라짐)', () => {
      expect(resultVariants.exit.y).toBe(-20);
    });

    it('animate transition이 정의되어야 함', () => {
      expect(resultVariants.animate.transition).toBeDefined();
    });

    it('animate transition duration이 0.5초여야 함', () => {
      expect(resultVariants.animate.transition?.duration).toBe(0.5);
    });

    it('animate transition ease가 "easeOut"이어야 함', () => {
      expect(resultVariants.animate.transition?.ease).toBe('easeOut');
    });
  });

  describe('confettiVariants', () => {
    it('confettiVariants가 정의되어야 함', () => {
      expect(confettiVariants).toBeDefined();
    });

    it('initial 상태가 정의되어야 함', () => {
      expect(confettiVariants.initial).toBeDefined();
    });

    it('animate 상태가 정의되어야 함', () => {
      expect(confettiVariants.animate).toBeDefined();
    });

    it('initial: scale이 0이어야 함', () => {
      expect(confettiVariants.initial.scale).toBe(0);
    });

    it('initial: opacity가 0이어야 함', () => {
      expect(confettiVariants.initial.opacity).toBe(0);
    });

    it('animate: scale이 1이어야 함', () => {
      expect(confettiVariants.animate.scale).toBe(1);
    });

    it('animate: opacity가 1이어야 함', () => {
      expect(confettiVariants.animate.opacity).toBe(1);
    });

    it('animate transition이 정의되어야 함', () => {
      expect(confettiVariants.animate.transition).toBeDefined();
    });

    it('animate transition duration이 0.6초여야 함', () => {
      expect(confettiVariants.animate.transition?.duration).toBe(0.6);
    });

    it('animate transition ease가 "backOut"이어야 함', () => {
      expect(confettiVariants.animate.transition?.ease).toBe('backOut');
    });

    it('animate transition delay가 0.2초여야 함 (결과 표시 후)', () => {
      expect(confettiVariants.animate.transition?.delay).toBe(0.2);
    });
  });
});
