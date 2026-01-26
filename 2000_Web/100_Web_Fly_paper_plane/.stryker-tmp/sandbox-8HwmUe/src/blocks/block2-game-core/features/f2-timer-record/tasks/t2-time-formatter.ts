/**
 * Task 2.2.2: Time Formatter
 *
 * Formats elapsed time for display:
 * - mm:ss.ms format (00:05.234)
 * - Short format (00:05)
 * - Parse time strings back to milliseconds
 * - Extract time components
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
export class TimeFormatter {
  /**
   * Formats time in mm:ss.ms format
   */
  public format(milliseconds: number): string {
    if (stryMutAct_9fa48("993")) {
      {}
    } else {
      stryCov_9fa48("993");
      const minutes = Math.floor(stryMutAct_9fa48("994") ? milliseconds * 60000 : (stryCov_9fa48("994"), milliseconds / 60000));
      const seconds = Math.floor(stryMutAct_9fa48("995") ? milliseconds % 60000 * 1000 : (stryCov_9fa48("995"), (stryMutAct_9fa48("996") ? milliseconds * 60000 : (stryCov_9fa48("996"), milliseconds % 60000)) / 1000));
      const ms = stryMutAct_9fa48("997") ? milliseconds * 1000 : (stryCov_9fa48("997"), milliseconds % 1000);
      return stryMutAct_9fa48("998") ? `` : (stryCov_9fa48("998"), `${this.pad(minutes, 2)}:${this.pad(seconds, 2)}.${this.pad(ms, 3)}`);
    }
  }

  /**
   * Formats time in mm:ss format (no milliseconds)
   */
  public formatShort(milliseconds: number): string {
    if (stryMutAct_9fa48("999")) {
      {}
    } else {
      stryCov_9fa48("999");
      const minutes = Math.floor(stryMutAct_9fa48("1000") ? milliseconds * 60000 : (stryCov_9fa48("1000"), milliseconds / 60000));
      const seconds = Math.floor(stryMutAct_9fa48("1001") ? milliseconds % 60000 * 1000 : (stryCov_9fa48("1001"), (stryMutAct_9fa48("1002") ? milliseconds * 60000 : (stryCov_9fa48("1002"), milliseconds % 60000)) / 1000));
      return stryMutAct_9fa48("1003") ? `` : (stryCov_9fa48("1003"), `${this.pad(minutes, 2)}:${this.pad(seconds, 2)}`);
    }
  }

  /**
   * Parses formatted time string back to milliseconds
   */
  public parse(timeString: string): number {
    if (stryMutAct_9fa48("1004")) {
      {}
    } else {
      stryCov_9fa48("1004");
      const match = timeString.match(stryMutAct_9fa48("1012") ? /^(\d+):(\d+)\.(\D+)$/ : stryMutAct_9fa48("1011") ? /^(\d+):(\d+)\.(\d)$/ : stryMutAct_9fa48("1010") ? /^(\d+):(\D+)\.(\d+)$/ : stryMutAct_9fa48("1009") ? /^(\d+):(\d)\.(\d+)$/ : stryMutAct_9fa48("1008") ? /^(\D+):(\d+)\.(\d+)$/ : stryMutAct_9fa48("1007") ? /^(\d):(\d+)\.(\d+)$/ : stryMutAct_9fa48("1006") ? /^(\d+):(\d+)\.(\d+)/ : stryMutAct_9fa48("1005") ? /(\d+):(\d+)\.(\d+)$/ : (stryCov_9fa48("1005", "1006", "1007", "1008", "1009", "1010", "1011", "1012"), /^(\d+):(\d+)\.(\d+)$/));
      if (stryMutAct_9fa48("1015") ? false : stryMutAct_9fa48("1014") ? true : stryMutAct_9fa48("1013") ? match : (stryCov_9fa48("1013", "1014", "1015"), !match)) return 0;
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const ms = parseInt(match[3], 10);
      return stryMutAct_9fa48("1016") ? minutes * 60000 + seconds * 1000 - ms : (stryCov_9fa48("1016"), (stryMutAct_9fa48("1017") ? minutes * 60000 - seconds * 1000 : (stryCov_9fa48("1017"), (stryMutAct_9fa48("1018") ? minutes / 60000 : (stryCov_9fa48("1018"), minutes * 60000)) + (stryMutAct_9fa48("1019") ? seconds / 1000 : (stryCov_9fa48("1019"), seconds * 1000)))) + ms);
    }
  }

  /**
   * Gets minutes component
   */
  public getMinutes(milliseconds: number): number {
    if (stryMutAct_9fa48("1020")) {
      {}
    } else {
      stryCov_9fa48("1020");
      return Math.floor(stryMutAct_9fa48("1021") ? milliseconds * 60000 : (stryCov_9fa48("1021"), milliseconds / 60000));
    }
  }

  /**
   * Gets seconds component
   */
  public getSeconds(milliseconds: number): number {
    if (stryMutAct_9fa48("1022")) {
      {}
    } else {
      stryCov_9fa48("1022");
      return Math.floor(stryMutAct_9fa48("1023") ? milliseconds % 60000 * 1000 : (stryCov_9fa48("1023"), (stryMutAct_9fa48("1024") ? milliseconds * 60000 : (stryCov_9fa48("1024"), milliseconds % 60000)) / 1000));
    }
  }

  /**
   * Gets milliseconds component
   */
  public getMilliseconds(milliseconds: number): number {
    if (stryMutAct_9fa48("1025")) {
      {}
    } else {
      stryCov_9fa48("1025");
      return stryMutAct_9fa48("1026") ? milliseconds * 1000 : (stryCov_9fa48("1026"), milliseconds % 1000);
    }
  }

  /**
   * Pads a number with leading zeros
   */
  private pad(num: number, length: number): string {
    if (stryMutAct_9fa48("1027")) {
      {}
    } else {
      stryCov_9fa48("1027");
      return num.toString().padStart(length, stryMutAct_9fa48("1028") ? "" : (stryCov_9fa48("1028"), '0'));
    }
  }
}