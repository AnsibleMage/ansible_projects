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
import { useState } from 'react';
import { useGameStore } from '../../../stores/gameStore';
import { MenuButton } from './MenuButton';
const BUTTON_TEXT = {
  START: 'Start',
  LOADING: 'Loading...'
} as const;
export const StartButton = () => {
  if (stryMutAct_9fa48("1721")) {
    {}
  } else {
    stryCov_9fa48("1721");
    const [isLoading, setIsLoading] = useState(stryMutAct_9fa48("1722") ? true : (stryCov_9fa48("1722"), false));
    const setGameState = useGameStore(stryMutAct_9fa48("1723") ? () => undefined : (stryCov_9fa48("1723"), state => state.setGameState));
    const handleStartGame = () => {
      if (stryMutAct_9fa48("1724")) {
        {}
      } else {
        stryCov_9fa48("1724");
        setIsLoading(stryMutAct_9fa48("1725") ? false : (stryCov_9fa48("1725"), true));
        setGameState(stryMutAct_9fa48("1726") ? "" : (stryCov_9fa48("1726"), 'playing'));
      }
    };
    return <MenuButton variant="primary" onClick={handleStartGame} disabled={isLoading}>
      {isLoading ? BUTTON_TEXT.LOADING : BUTTON_TEXT.START}
    </MenuButton>;
  }
};