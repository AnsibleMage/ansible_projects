/**
 * Task 1.1.1: Keyboard Input Detection
 *
 * Detects WASD and Arrow Keys input in real-time and stores state.
 * Supports simultaneous input and prevents memory leaks.
 *
 * @example
 * const handler = new KeyboardInputHandler()
 * const state = handler.getState() // { forward: false, backward: false, ... }
 * handler.cleanup() // Remove listeners when done
 */
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
export interface KeyboardState {
  forward: boolean; // W, ArrowUp
  backward: boolean; // S, ArrowDown
  left: boolean; // A, ArrowLeft
  right: boolean; // D, ArrowRight
}
type KeyDirection = keyof KeyboardState;

// Key mapping configuration (Explicit, Adaptive)
const KEY_MAP: Record<string, KeyDirection> = {
  w: 'forward',
  arrowup: 'forward',
  s: 'backward',
  arrowdown: 'backward',
  a: 'left',
  arrowleft: 'left',
  d: 'right',
  arrowright: 'right'
} as const;
const INITIAL_STATE: KeyboardState = stryMutAct_9fa48("0") ? {} : (stryCov_9fa48("0"), {
  forward: stryMutAct_9fa48("1") ? true : (stryCov_9fa48("1"), false),
  backward: stryMutAct_9fa48("2") ? true : (stryCov_9fa48("2"), false),
  left: stryMutAct_9fa48("3") ? true : (stryCov_9fa48("3"), false),
  right: stryMutAct_9fa48("4") ? true : (stryCov_9fa48("4"), false)
});
export class KeyboardInputHandler {
  private state: KeyboardState;
  private handleKeyDown: (e: KeyboardEvent) => void;
  private handleKeyUp: (e: KeyboardEvent) => void;
  constructor() {
    if (stryMutAct_9fa48("5")) {
      {}
    } else {
      stryCov_9fa48("5");
      this.state = stryMutAct_9fa48("6") ? {} : (stryCov_9fa48("6"), {
        ...INITIAL_STATE
      });

      // Bind event handlers to maintain correct 'this' context
      this.handleKeyDown = this.onKeyDown.bind(this);
      this.handleKeyUp = this.onKeyUp.bind(this);
      this.registerListeners();
    }
  }
  private registerListeners(): void {
    if (stryMutAct_9fa48("7")) {
      {}
    } else {
      stryCov_9fa48("7");
      window.addEventListener(stryMutAct_9fa48("8") ? "" : (stryCov_9fa48("8"), 'keydown'), this.handleKeyDown);
      window.addEventListener(stryMutAct_9fa48("9") ? "" : (stryCov_9fa48("9"), 'keyup'), this.handleKeyUp);
    }
  }
  private onKeyDown(e: KeyboardEvent): void {
    if (stryMutAct_9fa48("10")) {
      {}
    } else {
      stryCov_9fa48("10");
      this.updateState(e.key, stryMutAct_9fa48("11") ? false : (stryCov_9fa48("11"), true));
    }
  }
  private onKeyUp(e: KeyboardEvent): void {
    if (stryMutAct_9fa48("12")) {
      {}
    } else {
      stryCov_9fa48("12");
      this.updateState(e.key, stryMutAct_9fa48("13") ? true : (stryCov_9fa48("13"), false));
    }
  }
  private updateState(key: string, pressed: boolean): void {
    if (stryMutAct_9fa48("14")) {
      {}
    } else {
      stryCov_9fa48("14");
      const normalizedKey = stryMutAct_9fa48("15") ? key.toUpperCase() : (stryCov_9fa48("15"), key.toLowerCase());
      const direction = KEY_MAP[normalizedKey];
      if (stryMutAct_9fa48("17") ? false : stryMutAct_9fa48("16") ? true : (stryCov_9fa48("16", "17"), direction)) {
        if (stryMutAct_9fa48("18")) {
          {}
        } else {
          stryCov_9fa48("18");
          this.state[direction] = pressed;
        }
      }
    }
  }
  public getState(): KeyboardState {
    if (stryMutAct_9fa48("19")) {
      {}
    } else {
      stryCov_9fa48("19");
      // Return a copy to prevent external mutation
      return stryMutAct_9fa48("20") ? {} : (stryCov_9fa48("20"), {
        ...this.state
      });
    }
  }
  public cleanup(): void {
    if (stryMutAct_9fa48("21")) {
      {}
    } else {
      stryCov_9fa48("21");
      window.removeEventListener(stryMutAct_9fa48("22") ? "" : (stryCov_9fa48("22"), 'keydown'), this.handleKeyDown);
      window.removeEventListener(stryMutAct_9fa48("23") ? "" : (stryCov_9fa48("23"), 'keyup'), this.handleKeyUp);
      this.state = stryMutAct_9fa48("24") ? {} : (stryCov_9fa48("24"), {
        ...INITIAL_STATE
      });
    }
  }
}