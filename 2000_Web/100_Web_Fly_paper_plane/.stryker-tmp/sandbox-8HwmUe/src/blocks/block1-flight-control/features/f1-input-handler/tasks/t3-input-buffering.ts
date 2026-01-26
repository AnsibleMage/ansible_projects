/**
 * Task 1.1.3: Input Buffering & Interpolation
 *
 * Stores input signals in a buffer and provides interpolation
 * for smooth movement. Supports frame-independent smoothing.
 *
 * @example
 * // Buffer management
 * const buffer = new InputBufferManager(10)
 * buffer.addSnapshot({ forward: true, ..., timestamp: Date.now() })
 * const latest = buffer.getLatest()
 *
 * // Interpolation
 * const interpolated = lerp(0, 10, 0.5) // 5
 * const smoothed = smoothDamp(current, target, deltaTime, 0.1)
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
export interface InputSnapshot {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  timestamp: number; // Timestamp for frame timing
}

// Default configuration (Explicit, Adaptive)
const DEFAULT_BUFFER_SIZE = 10;
const SMOOTH_DAMP_COEFFICIENTS = {
  LINEAR: 0.48,
  CUBIC: 0.235
} as const;
export class InputBufferManager {
  private queue: InputSnapshot[];
  private readonly maxSize: number;
  constructor(maxSize: number = DEFAULT_BUFFER_SIZE) {
    if (stryMutAct_9fa48("48")) {
      {}
    } else {
      stryCov_9fa48("48");
      this.queue = stryMutAct_9fa48("49") ? ["Stryker was here"] : (stryCov_9fa48("49"), []);
      this.maxSize = maxSize;
    }
  }
  public addSnapshot(snapshot: InputSnapshot): void {
    if (stryMutAct_9fa48("50")) {
      {}
    } else {
      stryCov_9fa48("50");
      this.queue.push(snapshot);

      // FIFO: Remove oldest if exceeds max size
      if (stryMutAct_9fa48("54") ? this.queue.length <= this.maxSize : stryMutAct_9fa48("53") ? this.queue.length >= this.maxSize : stryMutAct_9fa48("52") ? false : stryMutAct_9fa48("51") ? true : (stryCov_9fa48("51", "52", "53", "54"), this.queue.length > this.maxSize)) {
        if (stryMutAct_9fa48("55")) {
          {}
        } else {
          stryCov_9fa48("55");
          this.queue.shift();
        }
      }
    }
  }
  public getLatest(): InputSnapshot | null {
    if (stryMutAct_9fa48("56")) {
      {}
    } else {
      stryCov_9fa48("56");
      if (stryMutAct_9fa48("59") ? this.queue.length !== 0 : stryMutAct_9fa48("58") ? false : stryMutAct_9fa48("57") ? true : (stryCov_9fa48("57", "58", "59"), this.queue.length === 0)) return null;
      return this.queue[stryMutAct_9fa48("60") ? this.queue.length + 1 : (stryCov_9fa48("60"), this.queue.length - 1)];
    }
  }
  public getOldest(): InputSnapshot | null {
    if (stryMutAct_9fa48("61")) {
      {}
    } else {
      stryCov_9fa48("61");
      if (stryMutAct_9fa48("64") ? this.queue.length !== 0 : stryMutAct_9fa48("63") ? false : stryMutAct_9fa48("62") ? true : (stryCov_9fa48("62", "63", "64"), this.queue.length === 0)) return null;
      return this.queue[0];
    }
  }
  public getSize(): number {
    if (stryMutAct_9fa48("65")) {
      {}
    } else {
      stryCov_9fa48("65");
      return this.queue.length;
    }
  }
  public clear(): void {
    if (stryMutAct_9fa48("66")) {
      {}
    } else {
      stryCov_9fa48("66");
      this.queue = stryMutAct_9fa48("67") ? ["Stryker was here"] : (stryCov_9fa48("67"), []);
    }
  }
}

/**
 * Linear interpolation between two values
 * @param start - Starting value
 * @param end - Target value
 * @param t - Interpolation factor (0 to 1)
 * @returns Interpolated value
 */
export function lerp(start: number, end: number, t: number): number {
  if (stryMutAct_9fa48("68")) {
    {}
  } else {
    stryCov_9fa48("68");
    return stryMutAct_9fa48("69") ? start - (end - start) * t : (stryCov_9fa48("69"), start + (stryMutAct_9fa48("70") ? (end - start) / t : (stryCov_9fa48("70"), (stryMutAct_9fa48("71") ? end + start : (stryCov_9fa48("71"), end - start)) * t)));
  }
}

/**
 * Frame-independent smooth damping (exponential decay)
 *
 * Uses a critically damped spring model for smooth transitions.
 * Frame-independent: works consistently regardless of FPS.
 *
 * @param current - Current value
 * @param target - Target value
 * @param deltaTime - Time since last frame (seconds)
 * @param smoothTime - Approximate time to reach target (seconds)
 * @returns Smoothed value
 */
export function smoothDamp(current: number, target: number, deltaTime: number, smoothTime: number): number {
  if (stryMutAct_9fa48("72")) {
    {}
  } else {
    stryCov_9fa48("72");
    if (stryMutAct_9fa48("75") ? deltaTime !== 0 : stryMutAct_9fa48("74") ? false : stryMutAct_9fa48("73") ? true : (stryCov_9fa48("73", "74", "75"), deltaTime === 0)) return current;
    if (stryMutAct_9fa48("78") ? smoothTime !== 0 : stryMutAct_9fa48("77") ? false : stryMutAct_9fa48("76") ? true : (stryCov_9fa48("76", "77", "78"), smoothTime === 0)) return target;

    // Exponential smooth damping formula (critically damped spring)
    const omega = stryMutAct_9fa48("79") ? 2 * smoothTime : (stryCov_9fa48("79"), 2 / smoothTime);
    const x = stryMutAct_9fa48("80") ? omega / deltaTime : (stryCov_9fa48("80"), omega * deltaTime);
    const {
      LINEAR,
      CUBIC
    } = SMOOTH_DAMP_COEFFICIENTS;
    const exp = stryMutAct_9fa48("81") ? 1 * (1 + x + LINEAR * x * x + CUBIC * x * x * x) : (stryCov_9fa48("81"), 1 / (stryMutAct_9fa48("82") ? 1 + x + LINEAR * x * x - CUBIC * x * x * x : (stryCov_9fa48("82"), (stryMutAct_9fa48("83") ? 1 + x - LINEAR * x * x : (stryCov_9fa48("83"), (stryMutAct_9fa48("84") ? 1 - x : (stryCov_9fa48("84"), 1 + x)) + (stryMutAct_9fa48("85") ? LINEAR * x / x : (stryCov_9fa48("85"), (stryMutAct_9fa48("86") ? LINEAR / x : (stryCov_9fa48("86"), LINEAR * x)) * x)))) + (stryMutAct_9fa48("87") ? CUBIC * x * x / x : (stryCov_9fa48("87"), (stryMutAct_9fa48("88") ? CUBIC * x / x : (stryCov_9fa48("88"), (stryMutAct_9fa48("89") ? CUBIC / x : (stryCov_9fa48("89"), CUBIC * x)) * x)) * x)))));
    return stryMutAct_9fa48("90") ? current - (target - current) * (1 - exp) : (stryCov_9fa48("90"), current + (stryMutAct_9fa48("91") ? (target - current) / (1 - exp) : (stryCov_9fa48("91"), (stryMutAct_9fa48("92") ? target + current : (stryCov_9fa48("92"), target - current)) * (stryMutAct_9fa48("93") ? 1 + exp : (stryCov_9fa48("93"), 1 - exp)))));
  }
}