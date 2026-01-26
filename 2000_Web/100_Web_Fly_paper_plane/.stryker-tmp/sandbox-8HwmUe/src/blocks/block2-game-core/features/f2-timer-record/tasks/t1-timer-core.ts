/**
 * Task 2.2.1: Timer Core
 *
 * Core timer functionality:
 * - Start/pause/resume/stop/reset
 * - Track elapsed time in milliseconds
 * - Update callbacks
 * - State management
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
export type TimerState = 'idle' | 'running' | 'paused' | 'stopped';
export class GameTimer {
  private state: TimerState = stryMutAct_9fa48("937") ? "" : (stryCov_9fa48("937"), 'idle');
  private startTime: number = 0;
  private pausedTime: number = 0;
  private elapsedTime: number = 0;
  private intervalId: number | null = null;
  private updateCallback: ((time: number) => void) | null = null;
  public start(): void {
    if (stryMutAct_9fa48("938")) {
      {}
    } else {
      stryCov_9fa48("938");
      if (stryMutAct_9fa48("941") ? this.state !== 'running' : stryMutAct_9fa48("940") ? false : stryMutAct_9fa48("939") ? true : (stryCov_9fa48("939", "940", "941"), this.state === (stryMutAct_9fa48("942") ? "" : (stryCov_9fa48("942"), 'running')))) return;
      this.state = stryMutAct_9fa48("943") ? "" : (stryCov_9fa48("943"), 'running');
      this.startTime = stryMutAct_9fa48("944") ? Date.now() + this.pausedTime : (stryCov_9fa48("944"), Date.now() - this.pausedTime);
      this.startInterval();
    }
  }
  public pause(): void {
    if (stryMutAct_9fa48("945")) {
      {}
    } else {
      stryCov_9fa48("945");
      if (stryMutAct_9fa48("948") ? this.state === 'running' : stryMutAct_9fa48("947") ? false : stryMutAct_9fa48("946") ? true : (stryCov_9fa48("946", "947", "948"), this.state !== (stryMutAct_9fa48("949") ? "" : (stryCov_9fa48("949"), 'running')))) return;
      this.state = stryMutAct_9fa48("950") ? "" : (stryCov_9fa48("950"), 'paused');
      this.pausedTime = stryMutAct_9fa48("951") ? Date.now() + this.startTime : (stryCov_9fa48("951"), Date.now() - this.startTime);
      this.stopInterval();
    }
  }
  public resume(): void {
    if (stryMutAct_9fa48("952")) {
      {}
    } else {
      stryCov_9fa48("952");
      if (stryMutAct_9fa48("955") ? this.state === 'paused' : stryMutAct_9fa48("954") ? false : stryMutAct_9fa48("953") ? true : (stryCov_9fa48("953", "954", "955"), this.state !== (stryMutAct_9fa48("956") ? "" : (stryCov_9fa48("956"), 'paused')))) return;
      this.state = stryMutAct_9fa48("957") ? "" : (stryCov_9fa48("957"), 'running');
      this.startTime = stryMutAct_9fa48("958") ? Date.now() + this.pausedTime : (stryCov_9fa48("958"), Date.now() - this.pausedTime);
      this.startInterval();
    }
  }
  public stop(): void {
    if (stryMutAct_9fa48("959")) {
      {}
    } else {
      stryCov_9fa48("959");
      this.state = stryMutAct_9fa48("960") ? "" : (stryCov_9fa48("960"), 'stopped');
      this.elapsedTime = stryMutAct_9fa48("961") ? Date.now() + this.startTime : (stryCov_9fa48("961"), Date.now() - this.startTime);
      this.stopInterval();
    }
  }
  public reset(): void {
    if (stryMutAct_9fa48("962")) {
      {}
    } else {
      stryCov_9fa48("962");
      this.state = stryMutAct_9fa48("963") ? "" : (stryCov_9fa48("963"), 'idle');
      this.startTime = 0;
      this.pausedTime = 0;
      this.elapsedTime = 0;
      this.stopInterval();
    }
  }
  public getState(): TimerState {
    if (stryMutAct_9fa48("964")) {
      {}
    } else {
      stryCov_9fa48("964");
      return this.state;
    }
  }
  public getElapsedTime(): number {
    if (stryMutAct_9fa48("965")) {
      {}
    } else {
      stryCov_9fa48("965");
      if (stryMutAct_9fa48("968") ? this.state !== 'running' : stryMutAct_9fa48("967") ? false : stryMutAct_9fa48("966") ? true : (stryCov_9fa48("966", "967", "968"), this.state === (stryMutAct_9fa48("969") ? "" : (stryCov_9fa48("969"), 'running')))) {
        if (stryMutAct_9fa48("970")) {
          {}
        } else {
          stryCov_9fa48("970");
          return stryMutAct_9fa48("971") ? Date.now() + this.startTime : (stryCov_9fa48("971"), Date.now() - this.startTime);
        }
      } else if (stryMutAct_9fa48("974") ? this.state !== 'paused' : stryMutAct_9fa48("973") ? false : stryMutAct_9fa48("972") ? true : (stryCov_9fa48("972", "973", "974"), this.state === (stryMutAct_9fa48("975") ? "" : (stryCov_9fa48("975"), 'paused')))) {
        if (stryMutAct_9fa48("976")) {
          {}
        } else {
          stryCov_9fa48("976");
          return this.pausedTime;
        }
      } else if (stryMutAct_9fa48("979") ? this.state !== 'stopped' : stryMutAct_9fa48("978") ? false : stryMutAct_9fa48("977") ? true : (stryCov_9fa48("977", "978", "979"), this.state === (stryMutAct_9fa48("980") ? "" : (stryCov_9fa48("980"), 'stopped')))) {
        if (stryMutAct_9fa48("981")) {
          {}
        } else {
          stryCov_9fa48("981");
          return this.elapsedTime;
        }
      }
      return 0;
    }
  }
  public onUpdate(callback: (time: number) => void): void {
    if (stryMutAct_9fa48("982")) {
      {}
    } else {
      stryCov_9fa48("982");
      this.updateCallback = callback;
    }
  }
  private startInterval(): void {
    if (stryMutAct_9fa48("983")) {
      {}
    } else {
      stryCov_9fa48("983");
      this.stopInterval();
      this.intervalId = window.setInterval(() => {
        if (stryMutAct_9fa48("984")) {
          {}
        } else {
          stryCov_9fa48("984");
          if (stryMutAct_9fa48("986") ? false : stryMutAct_9fa48("985") ? true : (stryCov_9fa48("985", "986"), this.updateCallback)) {
            if (stryMutAct_9fa48("987")) {
              {}
            } else {
              stryCov_9fa48("987");
              this.updateCallback(this.getElapsedTime());
            }
          }
        }
      }, 16); // ~60 FPS
    }
  }
  private stopInterval(): void {
    if (stryMutAct_9fa48("988")) {
      {}
    } else {
      stryCov_9fa48("988");
      if (stryMutAct_9fa48("991") ? this.intervalId === null : stryMutAct_9fa48("990") ? false : stryMutAct_9fa48("989") ? true : (stryCov_9fa48("989", "990", "991"), this.intervalId !== null)) {
        if (stryMutAct_9fa48("992")) {
          {}
        } else {
          stryCov_9fa48("992");
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
      }
    }
  }
}