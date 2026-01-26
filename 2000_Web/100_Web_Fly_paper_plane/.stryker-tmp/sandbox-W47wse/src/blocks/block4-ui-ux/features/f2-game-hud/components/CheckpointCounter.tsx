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
import { useGameStore } from '../../../stores/gameStore';
const BASE_STYLES = stryMutAct_9fa48("1776") ? "" : (stryCov_9fa48("1776"), 'absolute top-4 right-4 bg-black/50 px-4 py-2 rounded');
const TEXT_STYLES = stryMutAct_9fa48("1777") ? "" : (stryCov_9fa48("1777"), 'text-2xl font-bold text-white');
export const CheckpointCounter = () => {
  if (stryMutAct_9fa48("1778")) {
    {}
  } else {
    stryCov_9fa48("1778");
    const checkpointsPassed = useGameStore(stryMutAct_9fa48("1779") ? () => undefined : (stryCov_9fa48("1779"), state => state.checkpointsPassed));
    const totalCheckpoints = useGameStore(stryMutAct_9fa48("1780") ? () => undefined : (stryCov_9fa48("1780"), state => state.totalCheckpoints));

    // 음수 방어 및 최대값 클램핑
    const currentCheckpoint = stryMutAct_9fa48("1781") ? Math.min(0, Math.min(checkpointsPassed, totalCheckpoints)) : (stryCov_9fa48("1781"), Math.max(0, stryMutAct_9fa48("1782") ? Math.max(checkpointsPassed, totalCheckpoints) : (stryCov_9fa48("1782"), Math.min(checkpointsPassed, totalCheckpoints))));
    return <div data-testid="checkpoint-counter" className={stryMutAct_9fa48("1783") ? `` : (stryCov_9fa48("1783"), `${BASE_STYLES} ${TEXT_STYLES}`)}>
      {currentCheckpoint}/{totalCheckpoints}
    </div>;
  }
};