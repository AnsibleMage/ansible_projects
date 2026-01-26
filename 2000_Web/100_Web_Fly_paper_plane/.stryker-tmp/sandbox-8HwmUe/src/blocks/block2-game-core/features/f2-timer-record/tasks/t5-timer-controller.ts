/**
 * Task 2.2.5: Timer Controller
 *
 * Integrates timer, formatter, and record manager:
 * - Controls timer lifecycle
 * - Syncs time to store
 * - Manages records
 * - Provides formatted time
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
import { GameTimer } from './t1-timer-core';
import { TimeFormatter } from './t2-time-formatter';
import { RecordManager } from './t3-record-manager';
import type { createTimerStore } from './t4-timer-state-store';
export class TimerController {
  private timer: GameTimer;
  private formatter: TimeFormatter;
  private recordManager: RecordManager;
  private store: ReturnType<typeof createTimerStore>;
  constructor(store: ReturnType<typeof createTimerStore>) {
    if (stryMutAct_9fa48("1099")) {
      {}
    } else {
      stryCov_9fa48("1099");
      this.timer = new GameTimer();
      this.formatter = new TimeFormatter();
      this.recordManager = new RecordManager();
      this.store = store;

      // Sync timer updates to store
      this.timer.onUpdate(time => {
        if (stryMutAct_9fa48("1100")) {
          {}
        } else {
          stryCov_9fa48("1100");
          this.store.getState().setElapsedTime(time);
        }
      });
    }
  }
  public start(): void {
    if (stryMutAct_9fa48("1101")) {
      {}
    } else {
      stryCov_9fa48("1101");
      this.timer.start();
      this.store.getState().setTimerState(stryMutAct_9fa48("1102") ? "" : (stryCov_9fa48("1102"), 'running'));
    }
  }
  public pause(): void {
    if (stryMutAct_9fa48("1103")) {
      {}
    } else {
      stryCov_9fa48("1103");
      this.timer.pause();
      this.store.getState().setTimerState(stryMutAct_9fa48("1104") ? "" : (stryCov_9fa48("1104"), 'paused'));
    }
  }
  public resume(): void {
    if (stryMutAct_9fa48("1105")) {
      {}
    } else {
      stryCov_9fa48("1105");
      this.timer.resume();
      this.store.getState().setTimerState(stryMutAct_9fa48("1106") ? "" : (stryCov_9fa48("1106"), 'running'));
    }
  }
  public stop(courseId: string): void {
    if (stryMutAct_9fa48("1107")) {
      {}
    } else {
      stryCov_9fa48("1107");
      this.timer.stop();
      const finalTime = this.timer.getElapsedTime();
      this.store.getState().setTimerState(stryMutAct_9fa48("1108") ? "" : (stryCov_9fa48("1108"), 'stopped'));
      this.store.getState().setElapsedTime(finalTime);

      // Save record
      const record = stryMutAct_9fa48("1109") ? {} : (stryCov_9fa48("1109"), {
        time: finalTime,
        timestamp: Date.now(),
        courseId
      });
      this.recordManager.addRecord(record);
      this.store.getState().addRecord(record);

      // Update personal best if better
      if (stryMutAct_9fa48("1111") ? false : stryMutAct_9fa48("1110") ? true : (stryCov_9fa48("1110", "1111"), this.recordManager.updateIfBetter(finalTime))) {
        if (stryMutAct_9fa48("1112")) {
          {}
        } else {
          stryCov_9fa48("1112");
          this.store.getState().setPersonalBest(finalTime);
        }
      }
    }
  }
  public reset(): void {
    if (stryMutAct_9fa48("1113")) {
      {}
    } else {
      stryCov_9fa48("1113");
      this.timer.reset();
      this.store.getState().setTimerState(stryMutAct_9fa48("1114") ? "" : (stryCov_9fa48("1114"), 'idle'));
      this.store.getState().setElapsedTime(0);
    }
  }
  public getFormattedTime(): string {
    if (stryMutAct_9fa48("1115")) {
      {}
    } else {
      stryCov_9fa48("1115");
      const time = this.store.getState().elapsedTime;
      return this.formatter.format(time);
    }
  }
  public getFormattedShort(): string {
    if (stryMutAct_9fa48("1116")) {
      {}
    } else {
      stryCov_9fa48("1116");
      const time = this.store.getState().elapsedTime;
      return this.formatter.formatShort(time);
    }
  }
}