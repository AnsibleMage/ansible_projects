/**
 * Task 3.2.3: Rank Display Component
 *
 * Displays rank with visual styling:
 * - Show rank number
 * - Special styling for top 3 ranks
 * - Medal icons for podium positions
 * - Regular styling for other ranks
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
export interface RankDisplayProps {
  rank: number;
}
export function RankDisplay({
  rank
}: RankDisplayProps) {
  if (stryMutAct_9fa48("1377")) {
    {}
  } else {
    stryCov_9fa48("1377");
    const getMedalEmoji = (rank: number): string => {
      if (stryMutAct_9fa48("1378")) {
        {}
      } else {
        stryCov_9fa48("1378");
        switch (rank) {
          case 1:
            if (stryMutAct_9fa48("1379")) {} else {
              stryCov_9fa48("1379");
              return stryMutAct_9fa48("1380") ? "" : (stryCov_9fa48("1380"), '🥇');
            }
          case 2:
            if (stryMutAct_9fa48("1381")) {} else {
              stryCov_9fa48("1381");
              return stryMutAct_9fa48("1382") ? "" : (stryCov_9fa48("1382"), '🥈');
            }
          case 3:
            if (stryMutAct_9fa48("1383")) {} else {
              stryCov_9fa48("1383");
              return stryMutAct_9fa48("1384") ? "" : (stryCov_9fa48("1384"), '🥉');
            }
          default:
            if (stryMutAct_9fa48("1385")) {} else {
              stryCov_9fa48("1385");
              return stryMutAct_9fa48("1386") ? "Stryker was here!" : (stryCov_9fa48("1386"), '');
            }
        }
      }
    };
    const getRankClass = (rank: number): string => {
      if (stryMutAct_9fa48("1387")) {
        {}
      } else {
        stryCov_9fa48("1387");
        switch (rank) {
          case 1:
            if (stryMutAct_9fa48("1388")) {} else {
              stryCov_9fa48("1388");
              return stryMutAct_9fa48("1389") ? "" : (stryCov_9fa48("1389"), 'rank-gold');
            }
          case 2:
            if (stryMutAct_9fa48("1390")) {} else {
              stryCov_9fa48("1390");
              return stryMutAct_9fa48("1391") ? "" : (stryCov_9fa48("1391"), 'rank-silver');
            }
          case 3:
            if (stryMutAct_9fa48("1392")) {} else {
              stryCov_9fa48("1392");
              return stryMutAct_9fa48("1393") ? "" : (stryCov_9fa48("1393"), 'rank-bronze');
            }
          default:
            if (stryMutAct_9fa48("1394")) {} else {
              stryCov_9fa48("1394");
              return stryMutAct_9fa48("1395") ? "" : (stryCov_9fa48("1395"), 'rank-default');
            }
        }
      }
    };
    const medal = getMedalEmoji(rank);
    const className = getRankClass(rank);
    return <span className={className}>
      {stryMutAct_9fa48("1398") ? medal || <span>{medal} </span> : stryMutAct_9fa48("1397") ? false : stryMutAct_9fa48("1396") ? true : (stryCov_9fa48("1396", "1397", "1398"), medal && <span>{medal} </span>)}
      {rank}
    </span>;
  }
}