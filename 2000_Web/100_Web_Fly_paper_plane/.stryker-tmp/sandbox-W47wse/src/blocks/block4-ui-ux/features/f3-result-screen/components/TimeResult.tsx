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
const formatTime = (milliseconds: number): string => {
  if (stryMutAct_9fa48("1933")) {
    {}
  } else {
    stryCov_9fa48("1933");
    const time = stryMutAct_9fa48("1934") ? Math.min(0, milliseconds) : (stryCov_9fa48("1934"), Math.max(0, milliseconds));
    const totalSeconds = Math.floor(stryMutAct_9fa48("1935") ? time * 1000 : (stryCov_9fa48("1935"), time / 1000));
    const minutes = Math.floor(stryMutAct_9fa48("1936") ? totalSeconds * 60 : (stryCov_9fa48("1936"), totalSeconds / 60));
    const seconds = stryMutAct_9fa48("1937") ? totalSeconds * 60 : (stryCov_9fa48("1937"), totalSeconds % 60);
    const ms = stryMutAct_9fa48("1938") ? time * 1000 : (stryCov_9fa48("1938"), time % 1000);
    const paddedMinutes = String(minutes).padStart(2, stryMutAct_9fa48("1939") ? "" : (stryCov_9fa48("1939"), '0'));
    const paddedSeconds = String(seconds).padStart(2, stryMutAct_9fa48("1940") ? "" : (stryCov_9fa48("1940"), '0'));
    const paddedMs = String(ms).padStart(3, stryMutAct_9fa48("1941") ? "" : (stryCov_9fa48("1941"), '0'));
    return stryMutAct_9fa48("1942") ? `` : (stryCov_9fa48("1942"), `${paddedMinutes}:${paddedSeconds}.${paddedMs}`);
  }
};
const LABEL_STYLES = stryMutAct_9fa48("1943") ? "" : (stryCov_9fa48("1943"), 'text-xl text-gray-400 mb-2');
const TIME_STYLES = stryMutAct_9fa48("1944") ? "" : (stryCov_9fa48("1944"), 'text-6xl font-bold text-white');
export const TimeResult = () => {
  if (stryMutAct_9fa48("1945")) {
    {}
  } else {
    stryCov_9fa48("1945");
    const finalTime = useGameStore(stryMutAct_9fa48("1946") ? () => undefined : (stryCov_9fa48("1946"), state => state.finalTime));
    const formattedTime = formatTime(finalTime);
    return <div data-testid="time-result" className="text-center">
      <div className={LABEL_STYLES}>Final Time</div>
      <div className={TIME_STYLES}>{formattedTime}</div>
    </div>;
  }
};