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
const formatTimeDifference = (diffMs: number): string => {
  if (stryMutAct_9fa48("1729")) {
    {}
  } else {
    stryCov_9fa48("1729");
    // 초 단위로 변환 (3자리 밀리초 포함)
    const diffSeconds = stryMutAct_9fa48("1730") ? diffMs * 1000 : (stryCov_9fa48("1730"), diffMs / 1000);
    const absoluteDiff = Math.abs(diffSeconds);

    // ±X.XXX 형식으로 포맷팅
    const formatted = absoluteDiff.toFixed(3);
    if (stryMutAct_9fa48("1734") ? diffSeconds >= 0 : stryMutAct_9fa48("1733") ? diffSeconds <= 0 : stryMutAct_9fa48("1732") ? false : stryMutAct_9fa48("1731") ? true : (stryCov_9fa48("1731", "1732", "1733", "1734"), diffSeconds < 0)) {
      if (stryMutAct_9fa48("1735")) {
        {}
      } else {
        stryCov_9fa48("1735");
        return stryMutAct_9fa48("1736") ? `` : (stryCov_9fa48("1736"), `-${formatted}`);
      }
    } else if (stryMutAct_9fa48("1740") ? diffSeconds <= 0 : stryMutAct_9fa48("1739") ? diffSeconds >= 0 : stryMutAct_9fa48("1738") ? false : stryMutAct_9fa48("1737") ? true : (stryCov_9fa48("1737", "1738", "1739", "1740"), diffSeconds > 0)) {
      if (stryMutAct_9fa48("1741")) {
        {}
      } else {
        stryCov_9fa48("1741");
        return stryMutAct_9fa48("1742") ? `` : (stryCov_9fa48("1742"), `+${formatted}`);
      }
    } else {
      if (stryMutAct_9fa48("1743")) {
        {}
      } else {
        stryCov_9fa48("1743");
        return stryMutAct_9fa48("1744") ? `` : (stryCov_9fa48("1744"), `±${formatted}`);
      }
    }
  }
};
const getDifferenceColor = (diffMs: number): string => {
  if (stryMutAct_9fa48("1745")) {
    {}
  } else {
    stryCov_9fa48("1745");
    if (stryMutAct_9fa48("1749") ? diffMs >= 0 : stryMutAct_9fa48("1748") ? diffMs <= 0 : stryMutAct_9fa48("1747") ? false : stryMutAct_9fa48("1746") ? true : (stryCov_9fa48("1746", "1747", "1748", "1749"), diffMs < 0)) {
      if (stryMutAct_9fa48("1750")) {
        {}
      } else {
        stryCov_9fa48("1750");
        return stryMutAct_9fa48("1751") ? "" : (stryCov_9fa48("1751"), 'text-green-500'); // 더 빠름
      }
    } else if (stryMutAct_9fa48("1755") ? diffMs <= 0 : stryMutAct_9fa48("1754") ? diffMs >= 0 : stryMutAct_9fa48("1753") ? false : stryMutAct_9fa48("1752") ? true : (stryCov_9fa48("1752", "1753", "1754", "1755"), diffMs > 0)) {
      if (stryMutAct_9fa48("1756")) {
        {}
      } else {
        stryCov_9fa48("1756");
        return stryMutAct_9fa48("1757") ? "" : (stryCov_9fa48("1757"), 'text-red-500'); // 더 느림
      }
    } else {
      if (stryMutAct_9fa48("1758")) {
        {}
      } else {
        stryCov_9fa48("1758");
        return stryMutAct_9fa48("1759") ? "" : (stryCov_9fa48("1759"), 'text-yellow-500'); // 같음
      }
    }
  }
};
const BASE_STYLES = stryMutAct_9fa48("1760") ? "" : (stryCov_9fa48("1760"), 'absolute top-16 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-1 rounded');
const TEXT_STYLES = stryMutAct_9fa48("1761") ? "" : (stryCov_9fa48("1761"), 'text-xl');
export const BestTimeGhost = () => {
  if (stryMutAct_9fa48("1762")) {
    {}
  } else {
    stryCov_9fa48("1762");
    const elapsedTime = useTimerStore(stryMutAct_9fa48("1763") ? () => undefined : (stryCov_9fa48("1763"), state => state.elapsedTime));
    const personalBest = useTimerStore(stryMutAct_9fa48("1764") ? () => undefined : (stryCov_9fa48("1764"), state => state.personalBest));

    // personalBest가 없거나 음수면 렌더링 안함
    if (stryMutAct_9fa48("1767") ? personalBest === null && personalBest < 0 : stryMutAct_9fa48("1766") ? false : stryMutAct_9fa48("1765") ? true : (stryCov_9fa48("1765", "1766", "1767"), (stryMutAct_9fa48("1769") ? personalBest !== null : stryMutAct_9fa48("1768") ? false : (stryCov_9fa48("1768", "1769"), personalBest === null)) || (stryMutAct_9fa48("1772") ? personalBest >= 0 : stryMutAct_9fa48("1771") ? personalBest <= 0 : stryMutAct_9fa48("1770") ? false : (stryCov_9fa48("1770", "1771", "1772"), personalBest < 0)))) {
      if (stryMutAct_9fa48("1773")) {
        {}
      } else {
        stryCov_9fa48("1773");
        return null;
      }
    }

    // 현재 시간 - 최고 기록 (양수면 느림, 음수면 빠름)
    const timeDifference = stryMutAct_9fa48("1774") ? elapsedTime + personalBest : (stryCov_9fa48("1774"), elapsedTime - personalBest);
    const formattedDiff = formatTimeDifference(timeDifference);
    const colorClass = getDifferenceColor(timeDifference);
    return <div data-testid="best-time-ghost" className={stryMutAct_9fa48("1775") ? `` : (stryCov_9fa48("1775"), `${BASE_STYLES} ${TEXT_STYLES} ${colorClass}`)}>
      {formattedDiff}
    </div>;
  }
};