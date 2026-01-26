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
const BUTTON_BASE_STYLES = stryMutAct_9fa48("1921") ? "" : (stryCov_9fa48("1921"), 'text-xl font-bold px-8 py-3 rounded-lg transition-colors');
const RETRY_BUTTON_STYLES = stryMutAct_9fa48("1922") ? "" : (stryCov_9fa48("1922"), 'bg-blue-600 hover:bg-blue-700 text-white');
const MENU_BUTTON_STYLES = stryMutAct_9fa48("1923") ? "" : (stryCov_9fa48("1923"), 'bg-gray-600 hover:bg-gray-700 text-white');
export const ResultButtons = () => {
  if (stryMutAct_9fa48("1924")) {
    {}
  } else {
    stryCov_9fa48("1924");
    const reset = useGameStore(stryMutAct_9fa48("1925") ? () => undefined : (stryCov_9fa48("1925"), state => state.reset));
    const setGameState = useGameStore(stryMutAct_9fa48("1926") ? () => undefined : (stryCov_9fa48("1926"), state => state.setGameState));
    const handleRetry = () => {
      if (stryMutAct_9fa48("1927")) {
        {}
      } else {
        stryCov_9fa48("1927");
        reset();
        setGameState(stryMutAct_9fa48("1928") ? "" : (stryCov_9fa48("1928"), 'playing'));
      }
    };
    const handleMainMenu = () => {
      if (stryMutAct_9fa48("1929")) {
        {}
      } else {
        stryCov_9fa48("1929");
        reset();
        setGameState(stryMutAct_9fa48("1930") ? "" : (stryCov_9fa48("1930"), 'menu'));
      }
    };
    return <div data-testid="result-buttons" className="flex gap-4 justify-center mt-8">
      <button onClick={handleRetry} className={stryMutAct_9fa48("1931") ? `` : (stryCov_9fa48("1931"), `${BUTTON_BASE_STYLES} ${RETRY_BUTTON_STYLES}`)}>
        Retry
      </button>
      <button onClick={handleMainMenu} className={stryMutAct_9fa48("1932") ? `` : (stryCov_9fa48("1932"), `${BUTTON_BASE_STYLES} ${MENU_BUTTON_STYLES}`)}>
        Main Menu
      </button>
    </div>;
  }
};