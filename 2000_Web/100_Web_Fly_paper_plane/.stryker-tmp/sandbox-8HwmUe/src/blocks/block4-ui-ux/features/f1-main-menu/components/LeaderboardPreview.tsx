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
import { useState } from 'react';
import { useSocialStore } from '../../../stores/socialStore';
import { MenuButton } from './MenuButton';
const PANEL_LABELS = {
  TITLE: 'Leaderboard',
  CLOSE: 'Close',
  LOADING: 'Loading...',
  EMPTY_MESSAGE: '아직 기록이 없습니다',
  HEADER_RANK: 'Rank',
  HEADER_EMAIL: 'Email',
  HEADER_TIME: 'Time'
} as const;
const TOP_ENTRIES_LIMIT = 10;
const formatTime = (milliseconds: number): string => {
  if (stryMutAct_9fa48("1640")) {
    {}
  } else {
    stryCov_9fa48("1640");
    const totalSeconds = Math.floor(stryMutAct_9fa48("1641") ? milliseconds * 1000 : (stryCov_9fa48("1641"), milliseconds / 1000));
    const minutes = Math.floor(stryMutAct_9fa48("1642") ? totalSeconds * 60 : (stryCov_9fa48("1642"), totalSeconds / 60));
    const seconds = stryMutAct_9fa48("1643") ? totalSeconds * 60 : (stryCov_9fa48("1643"), totalSeconds % 60);
    return stryMutAct_9fa48("1644") ? `` : (stryCov_9fa48("1644"), `${String(minutes).padStart(2, stryMutAct_9fa48("1645") ? "" : (stryCov_9fa48("1645"), '0'))}:${String(seconds).padStart(2, stryMutAct_9fa48("1646") ? "" : (stryCov_9fa48("1646"), '0'))}`);
  }
};
export const LeaderboardPreview = () => {
  if (stryMutAct_9fa48("1647")) {
    {}
  } else {
    stryCov_9fa48("1647");
    const [isOpen, setIsOpen] = useState(stryMutAct_9fa48("1648") ? true : (stryCov_9fa48("1648"), false));
    const entries = useSocialStore(stryMutAct_9fa48("1649") ? () => undefined : (stryCov_9fa48("1649"), state => state.entries));
    const isLoading = useSocialStore(stryMutAct_9fa48("1650") ? () => undefined : (stryCov_9fa48("1650"), state => state.isLoading));

    // 상위 10개만 표시
    const topEntries = stryMutAct_9fa48("1651") ? entries : (stryCov_9fa48("1651"), entries.slice(0, TOP_ENTRIES_LIMIT));
    const handleOpenPanel = stryMutAct_9fa48("1652") ? () => undefined : (stryCov_9fa48("1652"), (() => {
      const handleOpenPanel = () => setIsOpen(stryMutAct_9fa48("1653") ? false : (stryCov_9fa48("1653"), true));
      return handleOpenPanel;
    })());
    const handleClosePanel = stryMutAct_9fa48("1654") ? () => undefined : (stryCov_9fa48("1654"), (() => {
      const handleClosePanel = () => setIsOpen(stryMutAct_9fa48("1655") ? true : (stryCov_9fa48("1655"), false));
      return handleClosePanel;
    })());
    return <>
      {/* Leaderboard 버튼 */}
      <MenuButton variant="secondary" onClick={handleOpenPanel}>
        {PANEL_LABELS.TITLE}
      </MenuButton>

      {/* Leaderboard 패널 */}
      {stryMutAct_9fa48("1658") ? isOpen || <div role="dialog" aria-labelledby="leaderboard-title" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-8 w-[600px] max-w-full">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-6">
              <h2 id="leaderboard-title" className="text-2xl font-game text-white">
                {PANEL_LABELS.TITLE}
              </h2>
              <button onClick={handleClosePanel} className="text-white hover:text-gray-300" aria-label={PANEL_LABELS.CLOSE}>
                ✕
              </button>
            </div>

            {/* 로딩 상태 */}
            {isLoading && <div className="text-center text-white py-8">
                {PANEL_LABELS.LOADING}
              </div>}

            {/* 빈 데이터 */}
            {!isLoading && topEntries.length === 0 && <div className="text-center text-white py-8">
                {PANEL_LABELS.EMPTY_MESSAGE}
              </div>}

            {/* 리더보드 테이블 */}
            {!isLoading && topEntries.length > 0 && <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-2 px-4 text-left">{PANEL_LABELS.HEADER_RANK}</th>
                    <th className="py-2 px-4 text-left">{PANEL_LABELS.HEADER_EMAIL}</th>
                    <th className="py-2 px-4 text-right">{PANEL_LABELS.HEADER_TIME}</th>
                  </tr>
                </thead>
                <tbody>
                  {topEntries.map(entry => <tr key={entry.rank} className="border-b border-gray-700">
                      <td className="py-2 px-4">{entry.rank}</td>
                      <td className="py-2 px-4">{entry.email}</td>
                      <td className="py-2 px-4 text-right">{formatTime(entry.time)}</td>
                    </tr>)}
                </tbody>
              </table>}
          </div>
        </div> : stryMutAct_9fa48("1657") ? false : stryMutAct_9fa48("1656") ? true : (stryCov_9fa48("1656", "1657", "1658"), isOpen && <div role="dialog" aria-labelledby="leaderboard-title" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-8 w-[600px] max-w-full">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-6">
              <h2 id="leaderboard-title" className="text-2xl font-game text-white">
                {PANEL_LABELS.TITLE}
              </h2>
              <button onClick={handleClosePanel} className="text-white hover:text-gray-300" aria-label={PANEL_LABELS.CLOSE}>
                ✕
              </button>
            </div>

            {/* 로딩 상태 */}
            {stryMutAct_9fa48("1661") ? isLoading || <div className="text-center text-white py-8">
                {PANEL_LABELS.LOADING}
              </div> : stryMutAct_9fa48("1660") ? false : stryMutAct_9fa48("1659") ? true : (stryCov_9fa48("1659", "1660", "1661"), isLoading && <div className="text-center text-white py-8">
                {PANEL_LABELS.LOADING}
              </div>)}

            {/* 빈 데이터 */}
            {stryMutAct_9fa48("1664") ? !isLoading && topEntries.length === 0 || <div className="text-center text-white py-8">
                {PANEL_LABELS.EMPTY_MESSAGE}
              </div> : stryMutAct_9fa48("1663") ? false : stryMutAct_9fa48("1662") ? true : (stryCov_9fa48("1662", "1663", "1664"), (stryMutAct_9fa48("1666") ? !isLoading || topEntries.length === 0 : stryMutAct_9fa48("1665") ? true : (stryCov_9fa48("1665", "1666"), (stryMutAct_9fa48("1667") ? isLoading : (stryCov_9fa48("1667"), !isLoading)) && (stryMutAct_9fa48("1669") ? topEntries.length !== 0 : stryMutAct_9fa48("1668") ? true : (stryCov_9fa48("1668", "1669"), topEntries.length === 0)))) && <div className="text-center text-white py-8">
                {PANEL_LABELS.EMPTY_MESSAGE}
              </div>)}

            {/* 리더보드 테이블 */}
            {stryMutAct_9fa48("1672") ? !isLoading && topEntries.length > 0 || <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-2 px-4 text-left">{PANEL_LABELS.HEADER_RANK}</th>
                    <th className="py-2 px-4 text-left">{PANEL_LABELS.HEADER_EMAIL}</th>
                    <th className="py-2 px-4 text-right">{PANEL_LABELS.HEADER_TIME}</th>
                  </tr>
                </thead>
                <tbody>
                  {topEntries.map(entry => <tr key={entry.rank} className="border-b border-gray-700">
                      <td className="py-2 px-4">{entry.rank}</td>
                      <td className="py-2 px-4">{entry.email}</td>
                      <td className="py-2 px-4 text-right">{formatTime(entry.time)}</td>
                    </tr>)}
                </tbody>
              </table> : stryMutAct_9fa48("1671") ? false : stryMutAct_9fa48("1670") ? true : (stryCov_9fa48("1670", "1671", "1672"), (stryMutAct_9fa48("1674") ? !isLoading || topEntries.length > 0 : stryMutAct_9fa48("1673") ? true : (stryCov_9fa48("1673", "1674"), (stryMutAct_9fa48("1675") ? isLoading : (stryCov_9fa48("1675"), !isLoading)) && (stryMutAct_9fa48("1678") ? topEntries.length <= 0 : stryMutAct_9fa48("1677") ? topEntries.length >= 0 : stryMutAct_9fa48("1676") ? true : (stryCov_9fa48("1676", "1677", "1678"), topEntries.length > 0)))) && <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-2 px-4 text-left">{PANEL_LABELS.HEADER_RANK}</th>
                    <th className="py-2 px-4 text-left">{PANEL_LABELS.HEADER_EMAIL}</th>
                    <th className="py-2 px-4 text-right">{PANEL_LABELS.HEADER_TIME}</th>
                  </tr>
                </thead>
                <tbody>
                  {topEntries.map(stryMutAct_9fa48("1679") ? () => undefined : (stryCov_9fa48("1679"), entry => <tr key={entry.rank} className="border-b border-gray-700">
                      <td className="py-2 px-4">{entry.rank}</td>
                      <td className="py-2 px-4">{entry.email}</td>
                      <td className="py-2 px-4 text-right">{formatTime(entry.time)}</td>
                    </tr>))}
                </tbody>
              </table>)}
          </div>
        </div>)}
    </>;
  }
};