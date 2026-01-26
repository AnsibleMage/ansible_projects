/**
 * Task 1.1.2: Mouse Input Detection
 *
 * Detects mouse movement and clicks in real-time.
 * Calculates delta movement and tracks click state.
 *
 * @example
 * const handler = new MouseInputHandler()
 * const state = handler.getState() // { deltaX: 0, deltaY: 0, isClicked: false }
 * handler.resetDelta() // Reset accumulated deltas
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
export interface MouseState {
  deltaX: number; // Horizontal movement (accumulated)
  deltaY: number; // Vertical movement (accumulated)
  isClicked: boolean; // Mouse button state
}
const INITIAL_STATE: MouseState = stryMutAct_9fa48("25") ? {} : (stryCov_9fa48("25"), {
  deltaX: 0,
  deltaY: 0,
  isClicked: stryMutAct_9fa48("26") ? true : (stryCov_9fa48("26"), false)
});
export class MouseInputHandler {
  private state: MouseState;
  private handleMouseMove: (e: MouseEvent) => void;
  private handleMouseDown: (e: MouseEvent) => void;
  private handleMouseUp: (e: MouseEvent) => void;
  constructor() {
    if (stryMutAct_9fa48("27")) {
      {}
    } else {
      stryCov_9fa48("27");
      this.state = stryMutAct_9fa48("28") ? {} : (stryCov_9fa48("28"), {
        ...INITIAL_STATE
      });

      // Bind event handlers to maintain correct 'this' context
      this.handleMouseMove = this.onMouseMove.bind(this);
      this.handleMouseDown = this.onMouseDown.bind(this);
      this.handleMouseUp = this.onMouseUp.bind(this);
      this.registerListeners();
    }
  }
  private registerListeners(): void {
    if (stryMutAct_9fa48("29")) {
      {}
    } else {
      stryCov_9fa48("29");
      window.addEventListener(stryMutAct_9fa48("30") ? "" : (stryCov_9fa48("30"), 'mousemove'), this.handleMouseMove);
      window.addEventListener(stryMutAct_9fa48("31") ? "" : (stryCov_9fa48("31"), 'mousedown'), this.handleMouseDown);
      window.addEventListener(stryMutAct_9fa48("32") ? "" : (stryCov_9fa48("32"), 'mouseup'), this.handleMouseUp);
    }
  }
  private onMouseMove(e: MouseEvent): void {
    if (stryMutAct_9fa48("33")) {
      {}
    } else {
      stryCov_9fa48("33");
      // Accumulate delta movement
      stryMutAct_9fa48("34") ? this.state.deltaX -= e.movementX : (stryCov_9fa48("34"), this.state.deltaX += e.movementX);
      stryMutAct_9fa48("35") ? this.state.deltaY -= e.movementY : (stryCov_9fa48("35"), this.state.deltaY += e.movementY);
    }
  }
  private onMouseDown(_e: MouseEvent): void {
    if (stryMutAct_9fa48("36")) {
      {}
    } else {
      stryCov_9fa48("36");
      this.state.isClicked = stryMutAct_9fa48("37") ? false : (stryCov_9fa48("37"), true);
    }
  }
  private onMouseUp(_e: MouseEvent): void {
    if (stryMutAct_9fa48("38")) {
      {}
    } else {
      stryCov_9fa48("38");
      this.state.isClicked = stryMutAct_9fa48("39") ? true : (stryCov_9fa48("39"), false);
    }
  }
  public getState(): MouseState {
    if (stryMutAct_9fa48("40")) {
      {}
    } else {
      stryCov_9fa48("40");
      // Return a copy to prevent external mutation
      return stryMutAct_9fa48("41") ? {} : (stryCov_9fa48("41"), {
        ...this.state
      });
    }
  }
  public resetDelta(): void {
    if (stryMutAct_9fa48("42")) {
      {}
    } else {
      stryCov_9fa48("42");
      this.state.deltaX = 0;
      this.state.deltaY = 0;
    }
  }
  public cleanup(): void {
    if (stryMutAct_9fa48("43")) {
      {}
    } else {
      stryCov_9fa48("43");
      window.removeEventListener(stryMutAct_9fa48("44") ? "" : (stryCov_9fa48("44"), 'mousemove'), this.handleMouseMove);
      window.removeEventListener(stryMutAct_9fa48("45") ? "" : (stryCov_9fa48("45"), 'mousedown'), this.handleMouseDown);
      window.removeEventListener(stryMutAct_9fa48("46") ? "" : (stryCov_9fa48("46"), 'mouseup'), this.handleMouseUp);
      this.state = stryMutAct_9fa48("47") ? {} : (stryCov_9fa48("47"), {
        ...INITIAL_STATE
      });
    }
  }
}