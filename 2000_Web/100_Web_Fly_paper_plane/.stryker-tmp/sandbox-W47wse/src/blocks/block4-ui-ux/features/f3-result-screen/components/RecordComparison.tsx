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
import { useTimerStore } from '../../../stores/timerStore';
const formatTime = (milliseconds: number): string => {
  if (stryMutAct_9fa48("1868")) {
    {}
  } else {
    stryCov_9fa48("1868");
    const time = stryMutAct_9fa48("1869") ? Math.min(0, milliseconds) : (stryCov_9fa48("1869"), Math.max(0, milliseconds));
    const totalSeconds = Math.floor(stryMutAct_9fa48("1870") ? time * 1000 : (stryCov_9fa48("1870"), time / 1000));
    const minutes = Math.floor(stryMutAct_9fa48("1871") ? totalSeconds * 60 : (stryCov_9fa48("1871"), totalSeconds / 60));
    const seconds = stryMutAct_9fa48("1872") ? totalSeconds * 60 : (stryCov_9fa48("1872"), totalSeconds % 60);
    const ms = stryMutAct_9fa48("1873") ? time * 1000 : (stryCov_9fa48("1873"), time % 1000);
    const paddedMinutes = String(minutes).padStart(2, stryMutAct_9fa48("1874") ? "" : (stryCov_9fa48("1874"), '0'));
    const paddedSeconds = String(seconds).padStart(2, stryMutAct_9fa48("1875") ? "" : (stryCov_9fa48("1875"), '0'));
    const paddedMs = String(ms).padStart(3, stryMutAct_9fa48("1876") ? "" : (stryCov_9fa48("1876"), '0'));
    return stryMutAct_9fa48("1877") ? `` : (stryCov_9fa48("1877"), `${paddedMinutes}:${paddedSeconds}.${paddedMs}`);
  }
};
const formatTimeDifference = (diffMs: number): string => {
  if (stryMutAct_9fa48("1878")) {
    {}
  } else {
    stryCov_9fa48("1878");
    const diffSeconds = stryMutAct_9fa48("1879") ? diffMs * 1000 : (stryCov_9fa48("1879"), diffMs / 1000);
    const absoluteDiff = Math.abs(diffSeconds);
    const formatted = absoluteDiff.toFixed(3);
    if (stryMutAct_9fa48("1883") ? diffSeconds >= 0 : stryMutAct_9fa48("1882") ? diffSeconds <= 0 : stryMutAct_9fa48("1881") ? false : stryMutAct_9fa48("1880") ? true : (stryCov_9fa48("1880", "1881", "1882", "1883"), diffSeconds < 0)) {
      if (stryMutAct_9fa48("1884")) {
        {}
      } else {
        stryCov_9fa48("1884");
        return stryMutAct_9fa48("1885") ? `` : (stryCov_9fa48("1885"), `-${formatted}s`);
      }
    } else if (stryMutAct_9fa48("1889") ? diffSeconds <= 0 : stryMutAct_9fa48("1888") ? diffSeconds >= 0 : stryMutAct_9fa48("1887") ? false : stryMutAct_9fa48("1886") ? true : (stryCov_9fa48("1886", "1887", "1888", "1889"), diffSeconds > 0)) {
      if (stryMutAct_9fa48("1890")) {
        {}
      } else {
        stryCov_9fa48("1890");
        return stryMutAct_9fa48("1891") ? `` : (stryCov_9fa48("1891"), `+${formatted}s`);
      }
    } else {
      if (stryMutAct_9fa48("1892")) {
        {}
      } else {
        stryCov_9fa48("1892");
        return stryMutAct_9fa48("1893") ? `` : (stryCov_9fa48("1893"), `±${formatted}s`);
      }
    }
  }
};
const MESSAGE_STYLES = stryMutAct_9fa48("1894") ? "" : (stryCov_9fa48("1894"), 'text-3xl font-bold mb-2');
const PREVIOUS_BEST_STYLES = stryMutAct_9fa48("1895") ? "" : (stryCov_9fa48("1895"), 'text-xl text-gray-400 mb-1');
const DIFF_STYLES = stryMutAct_9fa48("1896") ? "" : (stryCov_9fa48("1896"), 'text-2xl font-bold');
export const RecordComparison = () => {
  if (stryMutAct_9fa48("1897")) {
    {}
  } else {
    stryCov_9fa48("1897");
    const finalTime = useGameStore(stryMutAct_9fa48("1898") ? () => undefined : (stryCov_9fa48("1898"), state => state.finalTime));
    const personalBest = useTimerStore(stryMutAct_9fa48("1899") ? () => undefined : (stryCov_9fa48("1899"), state => state.personalBest));

    // 첫 플레이
    if (stryMutAct_9fa48("1902") ? personalBest !== null : stryMutAct_9fa48("1901") ? false : stryMutAct_9fa48("1900") ? true : (stryCov_9fa48("1900", "1901", "1902"), personalBest === null)) {
      if (stryMutAct_9fa48("1903")) {
        {}
      } else {
        stryCov_9fa48("1903");
        return <div data-testid="record-comparison" className="text-center mt-6">
        <div className={stryMutAct_9fa48("1904") ? `` : (stryCov_9fa48("1904"), `${MESSAGE_STYLES} text-blue-500`)}>First Play!</div>
      </div>;
      }
    }
    const isNewRecord = stryMutAct_9fa48("1908") ? finalTime >= personalBest : stryMutAct_9fa48("1907") ? finalTime <= personalBest : stryMutAct_9fa48("1906") ? false : stryMutAct_9fa48("1905") ? true : (stryCov_9fa48("1905", "1906", "1907", "1908"), finalTime < personalBest);
    const timeDifference = stryMutAct_9fa48("1909") ? finalTime + personalBest : (stryCov_9fa48("1909"), finalTime - personalBest);

    // 신기록
    if (stryMutAct_9fa48("1911") ? false : stryMutAct_9fa48("1910") ? true : (stryCov_9fa48("1910", "1911"), isNewRecord)) {
      if (stryMutAct_9fa48("1912")) {
        {}
      } else {
        stryCov_9fa48("1912");
        return <div data-testid="record-comparison" className="text-center mt-6">
        <div className={stryMutAct_9fa48("1913") ? `` : (stryCov_9fa48("1913"), `${MESSAGE_STYLES} text-green-500`)}>New Record!</div>
        <div className={stryMutAct_9fa48("1914") ? `` : (stryCov_9fa48("1914"), `${DIFF_STYLES} text-green-500`)}>
          {formatTimeDifference(timeDifference)}
        </div>
      </div>;
      }
    }

    // 기록 미달
    const diffColor = (stryMutAct_9fa48("1917") ? timeDifference !== 0 : stryMutAct_9fa48("1916") ? false : stryMutAct_9fa48("1915") ? true : (stryCov_9fa48("1915", "1916", "1917"), timeDifference === 0)) ? stryMutAct_9fa48("1918") ? "" : (stryCov_9fa48("1918"), 'text-yellow-500') : stryMutAct_9fa48("1919") ? "" : (stryCov_9fa48("1919"), 'text-red-500');
    return <div data-testid="record-comparison" className="text-center mt-6">
      <div className={PREVIOUS_BEST_STYLES}>Previous Best</div>
      <div className="text-2xl text-white mb-2">{formatTime(personalBest)}</div>
      <div className={stryMutAct_9fa48("1920") ? `` : (stryCov_9fa48("1920"), `${DIFF_STYLES} ${diffColor}`)}>
        {formatTimeDifference(timeDifference)}
      </div>
    </div>;
  }
};