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
import { GameStateMachine } from './t2-game-state-machine';
import { CollisionHandler } from './t3-collision-handler';
import type { createGameStateStore } from './t4-game-state-store';
export class GameController {
  private fsm: GameStateMachine;
  private collisionHandler: CollisionHandler;
  private store: ReturnType<typeof createGameStateStore>;
  constructor(store: ReturnType<typeof createGameStateStore>) {
    if (stryMutAct_9fa48("1230")) {
      {}
    } else {
      stryCov_9fa48("1230");
      this.fsm = new GameStateMachine();
      this.collisionHandler = new CollisionHandler();
      this.store = store;
      this.collisionHandler.onCollision(id => {
        if (stryMutAct_9fa48("1231")) {
          {}
        } else {
          stryCov_9fa48("1231");
          this.store.getState().incrementCollisionCount();
        }
      });
      this.collisionHandler.onCheckpoint(id => {
        if (stryMutAct_9fa48("1232")) {
          {}
        } else {
          stryCov_9fa48("1232");
          this.store.getState().incrementCheckpointsPassed();
        }
      });
    }
  }
  public startGame(): void {
    if (stryMutAct_9fa48("1233")) {
      {}
    } else {
      stryCov_9fa48("1233");
      this.fsm.start();
      this.store.getState().setGameState(stryMutAct_9fa48("1234") ? "" : (stryCov_9fa48("1234"), 'playing'));
    }
  }
  public pauseGame(): void {
    if (stryMutAct_9fa48("1235")) {
      {}
    } else {
      stryCov_9fa48("1235");
      this.fsm.pause();
      this.store.getState().setGameState(stryMutAct_9fa48("1236") ? "" : (stryCov_9fa48("1236"), 'paused'));
    }
  }
  public resumeGame(): void {
    if (stryMutAct_9fa48("1237")) {
      {}
    } else {
      stryCov_9fa48("1237");
      this.fsm.resume();
      this.store.getState().setGameState(stryMutAct_9fa48("1238") ? "" : (stryCov_9fa48("1238"), 'playing'));
    }
  }
  public finishGame(): void {
    if (stryMutAct_9fa48("1239")) {
      {}
    } else {
      stryCov_9fa48("1239");
      this.fsm.finish();
      this.store.getState().setGameState(stryMutAct_9fa48("1240") ? "" : (stryCov_9fa48("1240"), 'finished'));
    }
  }
  public resetGame(): void {
    if (stryMutAct_9fa48("1241")) {
      {}
    } else {
      stryCov_9fa48("1241");
      this.fsm.reset();
      this.store.getState().reset();
    }
  }
  public handleObstacleCollision(obstacleId: string): void {
    if (stryMutAct_9fa48("1242")) {
      {}
    } else {
      stryCov_9fa48("1242");
      this.collisionHandler.handleCollision(obstacleId);
    }
  }
  public handleCheckpointPass(checkpointId: string): void {
    if (stryMutAct_9fa48("1243")) {
      {}
    } else {
      stryCov_9fa48("1243");
      this.collisionHandler.handleCheckpoint(checkpointId);
    }
  }
}