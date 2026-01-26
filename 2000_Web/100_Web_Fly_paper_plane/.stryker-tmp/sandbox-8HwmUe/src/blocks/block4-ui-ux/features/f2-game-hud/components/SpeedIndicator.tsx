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
import { useFlightStore } from '../../../stores/flightStore';
const SPEED_THRESHOLDS = {
  SLOW: 50,
  FAST: 150
} as const;
const SPEED_COLORS = {
  SLOW: 'text-blue-500',
  MEDIUM: 'text-yellow-500',
  FAST: 'text-red-500'
} as const;
const SPEED_UNIT = stryMutAct_9fa48("1786") ? "" : (stryCov_9fa48("1786"), 'km/h');
const BASE_STYLES = stryMutAct_9fa48("1787") ? "" : (stryCov_9fa48("1787"), 'absolute top-4 left-4 bg-black/50 px-4 py-2 rounded');
const getSpeedColor = (speed: number): string => {
  if (stryMutAct_9fa48("1788")) {
    {}
  } else {
    stryCov_9fa48("1788");
    if (stryMutAct_9fa48("1792") ? speed >= SPEED_THRESHOLDS.SLOW : stryMutAct_9fa48("1791") ? speed <= SPEED_THRESHOLDS.SLOW : stryMutAct_9fa48("1790") ? false : stryMutAct_9fa48("1789") ? true : (stryCov_9fa48("1789", "1790", "1791", "1792"), speed < SPEED_THRESHOLDS.SLOW)) {
      if (stryMutAct_9fa48("1793")) {
        {}
      } else {
        stryCov_9fa48("1793");
        return SPEED_COLORS.SLOW;
      }
    }
    if (stryMutAct_9fa48("1797") ? speed >= SPEED_THRESHOLDS.FAST : stryMutAct_9fa48("1796") ? speed <= SPEED_THRESHOLDS.FAST : stryMutAct_9fa48("1795") ? false : stryMutAct_9fa48("1794") ? true : (stryCov_9fa48("1794", "1795", "1796", "1797"), speed < SPEED_THRESHOLDS.FAST)) {
      if (stryMutAct_9fa48("1798")) {
        {}
      } else {
        stryCov_9fa48("1798");
        return SPEED_COLORS.MEDIUM;
      }
    }
    return SPEED_COLORS.FAST;
  }
};
export const SpeedIndicator = () => {
  if (stryMutAct_9fa48("1799")) {
    {}
  } else {
    stryCov_9fa48("1799");
    const currentSpeed = useFlightStore(stryMutAct_9fa48("1800") ? () => undefined : (stryCov_9fa48("1800"), state => state.currentSpeed));

    // 음수 속도는 0으로 처리
    const displaySpeed = stryMutAct_9fa48("1801") ? Math.min(0, currentSpeed) : (stryCov_9fa48("1801"), Math.max(0, currentSpeed));

    // 소수점 반올림
    const roundedSpeed = Math.round(displaySpeed);
    const speedColor = getSpeedColor(roundedSpeed);
    return <div data-testid="speed-indicator" className={stryMutAct_9fa48("1802") ? `` : (stryCov_9fa48("1802"), `${BASE_STYLES} ${speedColor}`)}>
      {roundedSpeed} {SPEED_UNIT}
    </div>;
  }
};