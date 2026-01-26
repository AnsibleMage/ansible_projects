/**
 * Task 3.3.2: Record Validation
 *
 * Validates record submission:
 * - Check for duplicate submissions
 * - Validate time improvement
 * - Check submission rate limits
 * - Verify record integrity
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
export interface ExistingRecord {
  email: string;
  time: number;
  date: Date;
}
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}
export class RecordValidator {
  private readonly emailRegex = stryMutAct_9fa48("1475") ? /^[^\s@]+@[^\s@]+\.[^\S@]+$/ : stryMutAct_9fa48("1474") ? /^[^\s@]+@[^\s@]+\.[\s@]+$/ : stryMutAct_9fa48("1473") ? /^[^\s@]+@[^\s@]+\.[^\s@]$/ : stryMutAct_9fa48("1472") ? /^[^\s@]+@[^\S@]+\.[^\s@]+$/ : stryMutAct_9fa48("1471") ? /^[^\s@]+@[\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("1470") ? /^[^\s@]+@[^\s@]\.[^\s@]+$/ : stryMutAct_9fa48("1469") ? /^[^\S@]+@[^\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("1468") ? /^[\s@]+@[^\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("1467") ? /^[^\s@]@[^\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("1466") ? /^[^\s@]+@[^\s@]+\.[^\s@]+/ : stryMutAct_9fa48("1465") ? /[^\s@]+@[^\s@]+\.[^\s@]+$/ : (stryCov_9fa48("1465", "1466", "1467", "1468", "1469", "1470", "1471", "1472", "1473", "1474", "1475"), /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  private readonly maxReasonableTime = 3600000; // 1 hour in ms
  private readonly rateLimitWindow = 60000; // 1 minute in ms

  /**
   * Validates a record submission against existing records
   */
  public validateSubmission(email: string, time: number, existingRecords: ExistingRecord[]): ValidationResult {
    if (stryMutAct_9fa48("1476")) {
      {}
    } else {
      stryCov_9fa48("1476");
      // Validate email format
      if (stryMutAct_9fa48("1479") ? false : stryMutAct_9fa48("1478") ? true : stryMutAct_9fa48("1477") ? this.emailRegex.test(email) : (stryCov_9fa48("1477", "1478", "1479"), !this.emailRegex.test(email))) {
        if (stryMutAct_9fa48("1480")) {
          {}
        } else {
          stryCov_9fa48("1480");
          return stryMutAct_9fa48("1481") ? {} : (stryCov_9fa48("1481"), {
            isValid: stryMutAct_9fa48("1482") ? true : (stryCov_9fa48("1482"), false),
            error: stryMutAct_9fa48("1483") ? "" : (stryCov_9fa48("1483"), 'Invalid email format')
          });
        }
      }

      // Validate time is reasonable
      if (stryMutAct_9fa48("1487") ? time <= this.maxReasonableTime : stryMutAct_9fa48("1486") ? time >= this.maxReasonableTime : stryMutAct_9fa48("1485") ? false : stryMutAct_9fa48("1484") ? true : (stryCov_9fa48("1484", "1485", "1486", "1487"), time > this.maxReasonableTime)) {
        if (stryMutAct_9fa48("1488")) {
          {}
        } else {
          stryCov_9fa48("1488");
          return stryMutAct_9fa48("1489") ? {} : (stryCov_9fa48("1489"), {
            isValid: stryMutAct_9fa48("1490") ? true : (stryCov_9fa48("1490"), false),
            error: stryMutAct_9fa48("1491") ? "" : (stryCov_9fa48("1491"), 'Time must be reasonable')
          });
        }
      }

      // Find user's existing record
      const userRecord = existingRecords.find(stryMutAct_9fa48("1492") ? () => undefined : (stryCov_9fa48("1492"), record => stryMutAct_9fa48("1495") ? record.email !== email : stryMutAct_9fa48("1494") ? false : stryMutAct_9fa48("1493") ? true : (stryCov_9fa48("1493", "1494", "1495"), record.email === email)));
      if (stryMutAct_9fa48("1498") ? false : stryMutAct_9fa48("1497") ? true : stryMutAct_9fa48("1496") ? userRecord : (stryCov_9fa48("1496", "1497", "1498"), !userRecord)) {
        if (stryMutAct_9fa48("1499")) {
          {}
        } else {
          stryCov_9fa48("1499");
          // First submission - valid
          return stryMutAct_9fa48("1500") ? {} : (stryCov_9fa48("1500"), {
            isValid: stryMutAct_9fa48("1501") ? false : (stryCov_9fa48("1501"), true)
          });
        }
      }

      // Check for improvement (must be faster)
      // This also handles duplicates (same time)
      if (stryMutAct_9fa48("1505") ? time < userRecord.time : stryMutAct_9fa48("1504") ? time > userRecord.time : stryMutAct_9fa48("1503") ? false : stryMutAct_9fa48("1502") ? true : (stryCov_9fa48("1502", "1503", "1504", "1505"), time >= userRecord.time)) {
        if (stryMutAct_9fa48("1506")) {
          {}
        } else {
          stryCov_9fa48("1506");
          return stryMutAct_9fa48("1507") ? {} : (stryCov_9fa48("1507"), {
            isValid: stryMutAct_9fa48("1508") ? true : (stryCov_9fa48("1508"), false),
            error: stryMutAct_9fa48("1509") ? "" : (stryCov_9fa48("1509"), 'No improvement over existing record')
          });
        }
      }

      // Check rate limiting
      const timeSinceLastSubmission = stryMutAct_9fa48("1510") ? Date.now() + userRecord.date.getTime() : (stryCov_9fa48("1510"), Date.now() - userRecord.date.getTime());
      if (stryMutAct_9fa48("1514") ? timeSinceLastSubmission >= this.rateLimitWindow : stryMutAct_9fa48("1513") ? timeSinceLastSubmission <= this.rateLimitWindow : stryMutAct_9fa48("1512") ? false : stryMutAct_9fa48("1511") ? true : (stryCov_9fa48("1511", "1512", "1513", "1514"), timeSinceLastSubmission < this.rateLimitWindow)) {
        if (stryMutAct_9fa48("1515")) {
          {}
        } else {
          stryCov_9fa48("1515");
          return stryMutAct_9fa48("1516") ? {} : (stryCov_9fa48("1516"), {
            isValid: stryMutAct_9fa48("1517") ? true : (stryCov_9fa48("1517"), false),
            error: stryMutAct_9fa48("1518") ? "" : (stryCov_9fa48("1518"), 'Rate limit exceeded - please wait before submitting again')
          });
        }
      }

      // All checks passed
      return stryMutAct_9fa48("1519") ? {} : (stryCov_9fa48("1519"), {
        isValid: stryMutAct_9fa48("1520") ? false : (stryCov_9fa48("1520"), true)
      });
    }
  }
}