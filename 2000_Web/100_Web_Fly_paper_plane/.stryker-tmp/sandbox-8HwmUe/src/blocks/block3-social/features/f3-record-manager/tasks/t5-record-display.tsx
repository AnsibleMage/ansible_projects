/**
 * Task 3.3.5: Record Display Component
 *
 * React component for displaying user records:
 * - Show user's best time
 * - Show user's rank
 * - Display record submission status
 * - Handle record updates
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
import type { GameRecord } from './t3-record-storage';
export interface RecordDisplayProps {
  userEmail: string;
  userRecord: GameRecord | null;
  newTime?: number;
  rank?: number;
  onSubmit?: () => void;
}
export function RecordDisplay({
  userEmail,
  userRecord,
  newTime,
  rank,
  onSubmit
}: RecordDisplayProps) {
  if (stryMutAct_9fa48("1583")) {
    {}
  } else {
    stryCov_9fa48("1583");
    const formatTime = (milliseconds: number): string => {
      if (stryMutAct_9fa48("1584")) {
        {}
      } else {
        stryCov_9fa48("1584");
        const minutes = Math.floor(stryMutAct_9fa48("1585") ? milliseconds * 60000 : (stryCov_9fa48("1585"), milliseconds / 60000));
        const seconds = Math.floor(stryMutAct_9fa48("1586") ? milliseconds % 60000 * 1000 : (stryCov_9fa48("1586"), (stryMutAct_9fa48("1587") ? milliseconds * 60000 : (stryCov_9fa48("1587"), milliseconds % 60000)) / 1000));
        const ms = stryMutAct_9fa48("1588") ? milliseconds * 1000 : (stryCov_9fa48("1588"), milliseconds % 1000);
        return stryMutAct_9fa48("1589") ? `` : (stryCov_9fa48("1589"), `${String(minutes).padStart(2, stryMutAct_9fa48("1590") ? "" : (stryCov_9fa48("1590"), '0'))}:${String(seconds).padStart(2, stryMutAct_9fa48("1591") ? "" : (stryCov_9fa48("1591"), '0'))}.${String(ms).padStart(3, stryMutAct_9fa48("1592") ? "" : (stryCov_9fa48("1592"), '0'))}`);
      }
    };
    const calculateImprovement = (oldTime: number, newTime: number): number => {
      if (stryMutAct_9fa48("1593")) {
        {}
      } else {
        stryCov_9fa48("1593");
        const improvement = stryMutAct_9fa48("1594") ? (oldTime - newTime) / oldTime / 100 : (stryCov_9fa48("1594"), (stryMutAct_9fa48("1595") ? (oldTime - newTime) * oldTime : (stryCov_9fa48("1595"), (stryMutAct_9fa48("1596") ? oldTime + newTime : (stryCov_9fa48("1596"), oldTime - newTime)) / oldTime)) * 100);
        return Math.round(improvement);
      }
    };

    // No record yet
    if (stryMutAct_9fa48("1599") ? false : stryMutAct_9fa48("1598") ? true : stryMutAct_9fa48("1597") ? userRecord : (stryCov_9fa48("1597", "1598", "1599"), !userRecord)) {
      if (stryMutAct_9fa48("1600")) {
        {}
      } else {
        stryCov_9fa48("1600");
        if (stryMutAct_9fa48("1603") ? newTime !== undefined || onSubmit : stryMutAct_9fa48("1602") ? false : stryMutAct_9fa48("1601") ? true : (stryCov_9fa48("1601", "1602", "1603"), (stryMutAct_9fa48("1605") ? newTime === undefined : stryMutAct_9fa48("1604") ? true : (stryCov_9fa48("1604", "1605"), newTime !== undefined)) && onSubmit)) {
          if (stryMutAct_9fa48("1606")) {
            {}
          } else {
            stryCov_9fa48("1606");
            return <div>
          <p>No record yet</p>
          <p>First Record: {formatTime(newTime)}</p>
          <button onClick={onSubmit}>Submit Record</button>
        </div>;
          }
        }
        return <div>
        <p>No record yet</p>
      </div>;
      }
    }

    // Has existing record
    const hasNewTime = stryMutAct_9fa48("1609") ? newTime !== undefined || newTime < userRecord.time : stryMutAct_9fa48("1608") ? false : stryMutAct_9fa48("1607") ? true : (stryCov_9fa48("1607", "1608", "1609"), (stryMutAct_9fa48("1611") ? newTime === undefined : stryMutAct_9fa48("1610") ? true : (stryCov_9fa48("1610", "1611"), newTime !== undefined)) && (stryMutAct_9fa48("1614") ? newTime >= userRecord.time : stryMutAct_9fa48("1613") ? newTime <= userRecord.time : stryMutAct_9fa48("1612") ? true : (stryCov_9fa48("1612", "1613", "1614"), newTime < userRecord.time)));
    return <div>
      <div>
        <h3>Best Time</h3>
        <p>{formatTime(userRecord.time)}</p>
      </div>

      {stryMutAct_9fa48("1617") ? rank !== undefined || <div>
          <h3>Rank</h3>
          <p>{rank}</p>
        </div> : stryMutAct_9fa48("1616") ? false : stryMutAct_9fa48("1615") ? true : (stryCov_9fa48("1615", "1616", "1617"), (stryMutAct_9fa48("1619") ? rank === undefined : stryMutAct_9fa48("1618") ? true : (stryCov_9fa48("1618", "1619"), rank !== undefined)) && <div>
          <h3>Rank</h3>
          <p>{rank}</p>
        </div>)}

      {stryMutAct_9fa48("1622") ? hasNewTime && newTime !== undefined || <div>
          <p>New Record: {formatTime(newTime)}</p>
          <p>{calculateImprovement(userRecord.time, newTime)}% faster</p>
          {onSubmit && <button onClick={onSubmit}>Submit Record</button>}
        </div> : stryMutAct_9fa48("1621") ? false : stryMutAct_9fa48("1620") ? true : (stryCov_9fa48("1620", "1621", "1622"), (stryMutAct_9fa48("1624") ? hasNewTime || newTime !== undefined : stryMutAct_9fa48("1623") ? true : (stryCov_9fa48("1623", "1624"), hasNewTime && (stryMutAct_9fa48("1626") ? newTime === undefined : stryMutAct_9fa48("1625") ? true : (stryCov_9fa48("1625", "1626"), newTime !== undefined)))) && <div>
          <p>New Record: {formatTime(newTime)}</p>
          <p>{calculateImprovement(userRecord.time, newTime)}% faster</p>
          {stryMutAct_9fa48("1629") ? onSubmit || <button onClick={onSubmit}>Submit Record</button> : stryMutAct_9fa48("1628") ? false : stryMutAct_9fa48("1627") ? true : (stryCov_9fa48("1627", "1628", "1629"), onSubmit && <button onClick={onSubmit}>Submit Record</button>)}
        </div>)}
    </div>;
  }
}