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
import { useTimerStore } from '../../../stores/timerStore';
const formatTime = (milliseconds: number): string => {
  if (stryMutAct_9fa48("1803")) {
    {}
  } else {
    stryCov_9fa48("1803");
    // 음수 시간은 0으로 처리
    const time = stryMutAct_9fa48("1804") ? Math.min(0, milliseconds) : (stryCov_9fa48("1804"), Math.max(0, milliseconds));

    // 분, 초, 밀리초 계산
    const totalSeconds = Math.floor(stryMutAct_9fa48("1805") ? time * 1000 : (stryCov_9fa48("1805"), time / 1000));
    const minutes = Math.floor(stryMutAct_9fa48("1806") ? totalSeconds * 60 : (stryCov_9fa48("1806"), totalSeconds / 60));
    const seconds = stryMutAct_9fa48("1807") ? totalSeconds * 60 : (stryCov_9fa48("1807"), totalSeconds % 60);
    const ms = stryMutAct_9fa48("1808") ? time * 1000 : (stryCov_9fa48("1808"), time % 1000);

    // MM:SS.mmm 형식으로 포맷팅
    const paddedMinutes = String(minutes).padStart(2, stryMutAct_9fa48("1809") ? "" : (stryCov_9fa48("1809"), '0'));
    const paddedSeconds = String(seconds).padStart(2, stryMutAct_9fa48("1810") ? "" : (stryCov_9fa48("1810"), '0'));
    const paddedMs = String(ms).padStart(3, stryMutAct_9fa48("1811") ? "" : (stryCov_9fa48("1811"), '0'));
    return stryMutAct_9fa48("1812") ? `` : (stryCov_9fa48("1812"), `${paddedMinutes}:${paddedSeconds}.${paddedMs}`);
  }
};
const BASE_STYLES = stryMutAct_9fa48("1813") ? "" : (stryCov_9fa48("1813"), 'absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 px-6 py-3 rounded-lg');
const TEXT_STYLES = stryMutAct_9fa48("1814") ? "" : (stryCov_9fa48("1814"), 'text-4xl font-bold text-white');
export const TimerDisplay = () => {
  if (stryMutAct_9fa48("1815")) {
    {}
  } else {
    stryCov_9fa48("1815");
    const elapsedTime = useTimerStore(stryMutAct_9fa48("1816") ? () => undefined : (stryCov_9fa48("1816"), state => state.elapsedTime));
    const formattedTime = formatTime(elapsedTime);
    return <div data-testid="timer-display" className={stryMutAct_9fa48("1817") ? `` : (stryCov_9fa48("1817"), `${BASE_STYLES} ${TEXT_STYLES}`)}>
      {formattedTime}
    </div>;
  }
};