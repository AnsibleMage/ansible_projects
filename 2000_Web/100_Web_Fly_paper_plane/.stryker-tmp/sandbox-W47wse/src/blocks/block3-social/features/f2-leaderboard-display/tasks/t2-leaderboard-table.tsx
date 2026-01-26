/**
 * Task 3.2.2: Leaderboard Table Component
 *
 * React table component for displaying leaderboard:
 * - Render leaderboard entries
 * - Display rank, email, time columns
 * - Handle empty state
 * - Format time display
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
import type { LeaderboardEntry } from './t1-leaderboard-data-model';
import { RankDisplay } from './t3-rank-display';
export interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}
export function LeaderboardTable({
  entries
}: LeaderboardTableProps) {
  if (stryMutAct_9fa48("1355")) {
    {}
  } else {
    stryCov_9fa48("1355");
    const formatTime = (milliseconds: number): string => {
      if (stryMutAct_9fa48("1356")) {
        {}
      } else {
        stryCov_9fa48("1356");
        const minutes = Math.floor(stryMutAct_9fa48("1357") ? milliseconds * 60000 : (stryCov_9fa48("1357"), milliseconds / 60000));
        const seconds = Math.floor(stryMutAct_9fa48("1358") ? milliseconds % 60000 * 1000 : (stryCov_9fa48("1358"), (stryMutAct_9fa48("1359") ? milliseconds * 60000 : (stryCov_9fa48("1359"), milliseconds % 60000)) / 1000));
        const ms = stryMutAct_9fa48("1360") ? milliseconds * 1000 : (stryCov_9fa48("1360"), milliseconds % 1000);
        return stryMutAct_9fa48("1361") ? `` : (stryCov_9fa48("1361"), `${String(minutes).padStart(2, stryMutAct_9fa48("1362") ? "" : (stryCov_9fa48("1362"), '0'))}:${String(seconds).padStart(2, stryMutAct_9fa48("1363") ? "" : (stryCov_9fa48("1363"), '0'))}.${String(ms).padStart(3, stryMutAct_9fa48("1364") ? "" : (stryCov_9fa48("1364"), '0'))}`);
      }
    };
    const formatDate = (date: Date): string => {
      if (stryMutAct_9fa48("1365")) {
        {}
      } else {
        stryCov_9fa48("1365");
        return date.toLocaleDateString(stryMutAct_9fa48("1366") ? "" : (stryCov_9fa48("1366"), 'en-US'), stryMutAct_9fa48("1367") ? {} : (stryCov_9fa48("1367"), {
          year: stryMutAct_9fa48("1368") ? "" : (stryCov_9fa48("1368"), 'numeric'),
          month: stryMutAct_9fa48("1369") ? "" : (stryCov_9fa48("1369"), '2-digit'),
          day: stryMutAct_9fa48("1370") ? "" : (stryCov_9fa48("1370"), '2-digit')
        }));
      }
    };
    if (stryMutAct_9fa48("1373") ? entries.length !== 0 : stryMutAct_9fa48("1372") ? false : stryMutAct_9fa48("1371") ? true : (stryCov_9fa48("1371", "1372", "1373"), entries.length === 0)) {
      if (stryMutAct_9fa48("1374")) {
        {}
      } else {
        stryCov_9fa48("1374");
        return <div>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
        </table>
        <p>No records yet</p>
      </div>;
      }
    }
    return <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Time</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(stryMutAct_9fa48("1375") ? () => undefined : (stryCov_9fa48("1375"), entry => <tr key={stryMutAct_9fa48("1376") ? `` : (stryCov_9fa48("1376"), `${entry.rank}-${entry.email}`)}>
            <td>
              <RankDisplay rank={entry.rank} />
            </td>
            <td>{entry.email}</td>
            <td>{formatTime(entry.time)}</td>
            <td>{formatDate(entry.date)}</td>
          </tr>))}
      </tbody>
    </table>;
  }
}