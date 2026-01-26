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
import { create } from 'zustand';

// Block 1 (Flight Control System)의 Flight State를 Block 4에서 사용하기 위한 store
// 실제 Block 1과 연동 시 해당 store로 대체 예정

interface FlightState {
  currentSpeed: number; // km/h
  setSpeed: (speed: number) => void;
}
export const useFlightStore = create<FlightState>(stryMutAct_9fa48("2186") ? () => undefined : (stryCov_9fa48("2186"), set => stryMutAct_9fa48("2187") ? {} : (stryCov_9fa48("2187"), {
  currentSpeed: 0,
  setSpeed: stryMutAct_9fa48("2188") ? () => undefined : (stryCov_9fa48("2188"), (speed: number) => set(stryMutAct_9fa48("2189") ? {} : (stryCov_9fa48("2189"), {
    currentSpeed: speed
  })))
})));