/**
 * Task 3.3.1: Record Submission
 *
 * Handles record submission:
 * - Create submission payload
 * - Validate required fields
 * - Generate submission timestamp
 * - Format submission data
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
export interface SubmissionResult {
  email: string;
  time: number;
  submittedAt: Date;
  isValid: boolean;
  error?: string;
}
export class RecordSubmission {
  private readonly emailRegex = stryMutAct_9fa48("1434") ? /^[^\s@]+@[^\s@]+\.[^\S@]+$/ : stryMutAct_9fa48("1433") ? /^[^\s@]+@[^\s@]+\.[\s@]+$/ : stryMutAct_9fa48("1432") ? /^[^\s@]+@[^\s@]+\.[^\s@]$/ : stryMutAct_9fa48("1431") ? /^[^\s@]+@[^\S@]+\.[^\s@]+$/ : stryMutAct_9fa48("1430") ? /^[^\s@]+@[\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("1429") ? /^[^\s@]+@[^\s@]\.[^\s@]+$/ : stryMutAct_9fa48("1428") ? /^[^\S@]+@[^\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("1427") ? /^[\s@]+@[^\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("1426") ? /^[^\s@]@[^\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("1425") ? /^[^\s@]+@[^\s@]+\.[^\s@]+/ : stryMutAct_9fa48("1424") ? /[^\s@]+@[^\s@]+\.[^\s@]+$/ : (stryCov_9fa48("1424", "1425", "1426", "1427", "1428", "1429", "1430", "1431", "1432", "1433", "1434"), /^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  /**
   * Creates a record submission with validation
   */
  public createSubmission(email: string, time: number): SubmissionResult {
    if (stryMutAct_9fa48("1435")) {
      {}
    } else {
      stryCov_9fa48("1435");
      const submittedAt = new Date();

      // Validate email
      if (stryMutAct_9fa48("1438") ? !email && email.trim() === '' : stryMutAct_9fa48("1437") ? false : stryMutAct_9fa48("1436") ? true : (stryCov_9fa48("1436", "1437", "1438"), (stryMutAct_9fa48("1439") ? email : (stryCov_9fa48("1439"), !email)) || (stryMutAct_9fa48("1441") ? email.trim() !== '' : stryMutAct_9fa48("1440") ? false : (stryCov_9fa48("1440", "1441"), (stryMutAct_9fa48("1442") ? email : (stryCov_9fa48("1442"), email.trim())) === (stryMutAct_9fa48("1443") ? "Stryker was here!" : (stryCov_9fa48("1443"), '')))))) {
        if (stryMutAct_9fa48("1444")) {
          {}
        } else {
          stryCov_9fa48("1444");
          return stryMutAct_9fa48("1445") ? {} : (stryCov_9fa48("1445"), {
            email,
            time,
            submittedAt,
            isValid: stryMutAct_9fa48("1446") ? true : (stryCov_9fa48("1446"), false),
            error: stryMutAct_9fa48("1447") ? "" : (stryCov_9fa48("1447"), 'Email is required')
          });
        }
      }
      if (stryMutAct_9fa48("1450") ? false : stryMutAct_9fa48("1449") ? true : stryMutAct_9fa48("1448") ? this.emailRegex.test(email) : (stryCov_9fa48("1448", "1449", "1450"), !this.emailRegex.test(email))) {
        if (stryMutAct_9fa48("1451")) {
          {}
        } else {
          stryCov_9fa48("1451");
          return stryMutAct_9fa48("1452") ? {} : (stryCov_9fa48("1452"), {
            email,
            time,
            submittedAt,
            isValid: stryMutAct_9fa48("1453") ? true : (stryCov_9fa48("1453"), false),
            error: stryMutAct_9fa48("1454") ? "" : (stryCov_9fa48("1454"), 'Invalid email format')
          });
        }
      }

      // Validate time
      if (stryMutAct_9fa48("1458") ? time > 0 : stryMutAct_9fa48("1457") ? time < 0 : stryMutAct_9fa48("1456") ? false : stryMutAct_9fa48("1455") ? true : (stryCov_9fa48("1455", "1456", "1457", "1458"), time <= 0)) {
        if (stryMutAct_9fa48("1459")) {
          {}
        } else {
          stryCov_9fa48("1459");
          return stryMutAct_9fa48("1460") ? {} : (stryCov_9fa48("1460"), {
            email,
            time,
            submittedAt,
            isValid: stryMutAct_9fa48("1461") ? true : (stryCov_9fa48("1461"), false),
            error: stryMutAct_9fa48("1462") ? "" : (stryCov_9fa48("1462"), 'Time must be positive')
          });
        }
      }

      // Valid submission
      return stryMutAct_9fa48("1463") ? {} : (stryCov_9fa48("1463"), {
        email,
        time,
        submittedAt,
        isValid: stryMutAct_9fa48("1464") ? false : (stryCov_9fa48("1464"), true)
      });
    }
  }
}