// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { Variants } from 'framer-motion';

// Animation timing (milliseconds)
export const ANIMATION_DURATION = 300;

// Animation duration in seconds (for Framer Motion)
const DURATION_SECONDS = stryMutAct_9fa48("1630") ? ANIMATION_DURATION * 1000 : (stryCov_9fa48("1630"), ANIMATION_DURATION / 1000);

// Easing functions
const EASE_OUT = stryMutAct_9fa48("1631") ? "" : (stryCov_9fa48("1631"), 'easeOut');
const EASE_IN = stryMutAct_9fa48("1632") ? "" : (stryCov_9fa48("1632"), 'easeIn');

// Animation distances
const FADE_IN_OFFSET_Y = 20; // Fade in from slightly below
const SLIDE_OUT_OFFSET_X = stryMutAct_9fa48("1633") ? +100 : (stryCov_9fa48("1633"), -100); // Slide out to the left

// Opacity values
const OPACITY_HIDDEN = 0;
const OPACITY_VISIBLE = 1;

/**
 * Menu screen animation variants
 * - initial: Fade in from below (opacity 0, y +20)
 * - animate: Fully visible at center (opacity 1, y 0)
 * - exit: Slide out to left (opacity 0, x -100)
 */
export const menuVariants: Variants = stryMutAct_9fa48("1634") ? {} : (stryCov_9fa48("1634"), {
  initial: stryMutAct_9fa48("1635") ? {} : (stryCov_9fa48("1635"), {
    opacity: OPACITY_HIDDEN,
    y: FADE_IN_OFFSET_Y
  }),
  animate: stryMutAct_9fa48("1636") ? {} : (stryCov_9fa48("1636"), {
    opacity: OPACITY_VISIBLE,
    y: 0,
    transition: stryMutAct_9fa48("1637") ? {} : (stryCov_9fa48("1637"), {
      duration: DURATION_SECONDS,
      ease: EASE_OUT
    })
  }),
  exit: stryMutAct_9fa48("1638") ? {} : (stryCov_9fa48("1638"), {
    opacity: OPACITY_HIDDEN,
    x: SLIDE_OUT_OFFSET_X,
    transition: stryMutAct_9fa48("1639") ? {} : (stryCov_9fa48("1639"), {
      duration: DURATION_SECONDS,
      ease: EASE_IN
    })
  })
});