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
import { useSocialStore } from '../../../stores/socialStore';
const getMedal = (rank: number): string | null => {
  if (stryMutAct_9fa48("1831")) {
    {}
  } else {
    stryCov_9fa48("1831");
    if (stryMutAct_9fa48("1834") ? rank !== 1 : stryMutAct_9fa48("1833") ? false : stryMutAct_9fa48("1832") ? true : (stryCov_9fa48("1832", "1833", "1834"), rank === 1)) return stryMutAct_9fa48("1835") ? "" : (stryCov_9fa48("1835"), '🥇');
    if (stryMutAct_9fa48("1838") ? rank !== 2 : stryMutAct_9fa48("1837") ? false : stryMutAct_9fa48("1836") ? true : (stryCov_9fa48("1836", "1837", "1838"), rank === 2)) return stryMutAct_9fa48("1839") ? "" : (stryCov_9fa48("1839"), '🥈');
    if (stryMutAct_9fa48("1842") ? rank !== 3 : stryMutAct_9fa48("1841") ? false : stryMutAct_9fa48("1840") ? true : (stryCov_9fa48("1840", "1841", "1842"), rank === 3)) return stryMutAct_9fa48("1843") ? "" : (stryCov_9fa48("1843"), '🥉');
    return null;
  }
};
const getRankColor = (rank: number): string => {
  if (stryMutAct_9fa48("1844")) {
    {}
  } else {
    stryCov_9fa48("1844");
    if (stryMutAct_9fa48("1848") ? rank > 3 : stryMutAct_9fa48("1847") ? rank < 3 : stryMutAct_9fa48("1846") ? false : stryMutAct_9fa48("1845") ? true : (stryCov_9fa48("1845", "1846", "1847", "1848"), rank <= 3)) return stryMutAct_9fa48("1849") ? "" : (stryCov_9fa48("1849"), 'text-yellow-500');
    if (stryMutAct_9fa48("1853") ? rank > 10 : stryMutAct_9fa48("1852") ? rank < 10 : stryMutAct_9fa48("1851") ? false : stryMutAct_9fa48("1850") ? true : (stryCov_9fa48("1850", "1851", "1852", "1853"), rank <= 10)) return stryMutAct_9fa48("1854") ? "" : (stryCov_9fa48("1854"), 'text-white');
    return stryMutAct_9fa48("1855") ? "" : (stryCov_9fa48("1855"), 'text-gray-400');
  }
};
const MEDAL_STYLES = stryMutAct_9fa48("1856") ? "" : (stryCov_9fa48("1856"), 'text-4xl mb-2');
const RANK_TEXT_STYLES = stryMutAct_9fa48("1857") ? "" : (stryCov_9fa48("1857"), 'text-2xl font-bold');
export const LeaderboardPosition = () => {
  if (stryMutAct_9fa48("1858")) {
    {}
  } else {
    stryCov_9fa48("1858");
    const currentUser = useSocialStore(stryMutAct_9fa48("1859") ? () => undefined : (stryCov_9fa48("1859"), state => state.currentUser));
    if (stryMutAct_9fa48("1862") ? false : stryMutAct_9fa48("1861") ? true : stryMutAct_9fa48("1860") ? currentUser : (stryCov_9fa48("1860", "1861", "1862"), !currentUser)) {
      if (stryMutAct_9fa48("1863")) {
        {}
      } else {
        stryCov_9fa48("1863");
        return null;
      }
    }
    const {
      rank
    } = currentUser;
    const medal = getMedal(rank);
    const colorClass = getRankColor(rank);
    return <div data-testid="leaderboard-position" className="text-center mt-6">
      {stryMutAct_9fa48("1866") ? medal || <div className={MEDAL_STYLES}>{medal}</div> : stryMutAct_9fa48("1865") ? false : stryMutAct_9fa48("1864") ? true : (stryCov_9fa48("1864", "1865", "1866"), medal && <div className={MEDAL_STYLES}>{medal}</div>)}
      <div className={stryMutAct_9fa48("1867") ? `` : (stryCov_9fa48("1867"), `${RANK_TEXT_STYLES} ${colorClass}`)}>
        You ranked #{rank}!
      </div>
    </div>;
  }
};