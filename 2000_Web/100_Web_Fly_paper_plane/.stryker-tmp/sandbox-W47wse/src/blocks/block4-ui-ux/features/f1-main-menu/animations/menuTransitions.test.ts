// @ts-nocheck
import { describe, it, expect } from 'vitest';
import { menuVariants, ANIMATION_DURATION } from './menuTransitions';

describe('Menu Transitions', () => {
  describe('menuVariants', () => {
    it('initial 상태가 정의되어야 함', () => {
      expect(menuVariants.initial).toBeDefined();
    });

    it('animate 상태가 정의되어야 함', () => {
      expect(menuVariants.animate).toBeDefined();
    });

    it('exit 상태가 정의되어야 함', () => {
      expect(menuVariants.exit).toBeDefined();
    });

    describe('Fade In 애니메이션', () => {
      it('initial 상태에서 opacity가 0이어야 함', () => {
        expect(menuVariants.initial).toHaveProperty('opacity', 0);
      });

      it('animate 상태에서 opacity가 1이어야 함', () => {
        expect(menuVariants.animate).toHaveProperty('opacity', 1);
      });

      it('initial 상태에서 y 위치가 20이어야 함 (약간 아래에서 시작)', () => {
        expect(menuVariants.initial).toHaveProperty('y', 20);
      });

      it('animate 상태에서 y 위치가 0이어야 함', () => {
        expect(menuVariants.animate).toHaveProperty('y', 0);
      });
    });

    describe('Slide Out 애니메이션', () => {
      it('exit 상태에서 opacity가 0이어야 함', () => {
        expect(menuVariants.exit).toHaveProperty('opacity', 0);
      });

      it('exit 상태에서 x 위치가 -100이어야 함 (왼쪽으로 슬라이드)', () => {
        expect(menuVariants.exit).toHaveProperty('x', -100);
      });
    });

    describe('Transition 설정', () => {
      it('animate 상태에 transition이 정의되어야 함', () => {
        expect(menuVariants.animate).toHaveProperty('transition');
      });

      it('transition duration이 0.3초여야 함', () => {
        const transition = menuVariants.animate.transition;
        expect(transition).toHaveProperty('duration', 0.3);
      });

      it('transition ease가 정의되어야 함', () => {
        const transition = menuVariants.animate.transition;
        expect(transition).toHaveProperty('ease');
      });

      it('animate transition ease가 easeOut이어야 함', () => {
        const transition = menuVariants.animate.transition;
        expect(transition.ease).toBe('easeOut');
      });

      it('exit 상태에 transition이 정의되어야 함', () => {
        expect(menuVariants.exit).toHaveProperty('transition');
      });

      it('exit transition duration이 0.3초여야 함', () => {
        const transition = menuVariants.exit.transition;
        expect(transition).toHaveProperty('duration', 0.3);
      });

      it('exit transition ease가 easeIn이어야 함', () => {
        const transition = menuVariants.exit.transition;
        expect(transition.ease).toBe('easeIn');
      });
    });
  });

  describe('상수', () => {
    it('ANIMATION_DURATION이 300ms여야 함', () => {
      expect(ANIMATION_DURATION).toBe(300);
    });
  });
});
