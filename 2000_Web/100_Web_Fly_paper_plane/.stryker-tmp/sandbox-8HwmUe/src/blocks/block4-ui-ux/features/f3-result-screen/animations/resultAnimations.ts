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

// 결과 화면 Fade In 애니메이션
export const resultVariants: Variants = stryMutAct_9fa48("1819") ? {} : (stryCov_9fa48("1819"), {
  initial: stryMutAct_9fa48("1820") ? {} : (stryCov_9fa48("1820"), {
    opacity: 0,
    y: 20
  }),
  animate: stryMutAct_9fa48("1821") ? {} : (stryCov_9fa48("1821"), {
    opacity: 1,
    y: 0,
    transition: stryMutAct_9fa48("1822") ? {} : (stryCov_9fa48("1822"), {
      duration: 0.5,
      ease: stryMutAct_9fa48("1823") ? "" : (stryCov_9fa48("1823"), 'easeOut')
    })
  }),
  exit: stryMutAct_9fa48("1824") ? {} : (stryCov_9fa48("1824"), {
    opacity: 0,
    y: stryMutAct_9fa48("1825") ? +20 : (stryCov_9fa48("1825"), -20)
  })
});

// 신기록 축하 애니메이션 (Confetti 효과)
export const confettiVariants: Variants = stryMutAct_9fa48("1826") ? {} : (stryCov_9fa48("1826"), {
  initial: stryMutAct_9fa48("1827") ? {} : (stryCov_9fa48("1827"), {
    scale: 0,
    opacity: 0
  }),
  animate: stryMutAct_9fa48("1828") ? {} : (stryCov_9fa48("1828"), {
    scale: 1,
    opacity: 1,
    transition: stryMutAct_9fa48("1829") ? {} : (stryCov_9fa48("1829"), {
      duration: 0.6,
      ease: stryMutAct_9fa48("1830") ? "" : (stryCov_9fa48("1830"), 'backOut'),
      delay: 0.2
    })
  })
});