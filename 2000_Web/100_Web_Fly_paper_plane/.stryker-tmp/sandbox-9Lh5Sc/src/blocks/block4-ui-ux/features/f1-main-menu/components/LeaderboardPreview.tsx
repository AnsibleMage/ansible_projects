// @ts-nocheck
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
  HEADER_TIME: 'Time',
} as const;

const TOP_ENTRIES_LIMIT = 10;

const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const LeaderboardPreview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const entries = useSocialStore((state) => state.entries);
  const isLoading = useSocialStore((state) => state.isLoading);

  // 상위 10개만 표시
  const topEntries = entries.slice(0, TOP_ENTRIES_LIMIT);

  const handleOpenPanel = () => setIsOpen(true);
  const handleClosePanel = () => setIsOpen(false);

  return (
    <>
      {/* Leaderboard 버튼 */}
      <MenuButton variant="secondary" onClick={handleOpenPanel}>
        {PANEL_LABELS.TITLE}
      </MenuButton>

      {/* Leaderboard 패널 */}
      {isOpen && (
        <div
          role="dialog"
          aria-labelledby="leaderboard-title"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-gray-800 rounded-lg p-8 w-[600px] max-w-full">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-6">
              <h2 id="leaderboard-title" className="text-2xl font-game text-white">
                {PANEL_LABELS.TITLE}
              </h2>
              <button
                onClick={handleClosePanel}
                className="text-white hover:text-gray-300"
                aria-label={PANEL_LABELS.CLOSE}
              >
                ✕
              </button>
            </div>

            {/* 로딩 상태 */}
            {isLoading && (
              <div className="text-center text-white py-8">
                {PANEL_LABELS.LOADING}
              </div>
            )}

            {/* 빈 데이터 */}
            {!isLoading && topEntries.length === 0 && (
              <div className="text-center text-white py-8">
                {PANEL_LABELS.EMPTY_MESSAGE}
              </div>
            )}

            {/* 리더보드 테이블 */}
            {!isLoading && topEntries.length > 0 && (
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-2 px-4 text-left">{PANEL_LABELS.HEADER_RANK}</th>
                    <th className="py-2 px-4 text-left">{PANEL_LABELS.HEADER_EMAIL}</th>
                    <th className="py-2 px-4 text-right">{PANEL_LABELS.HEADER_TIME}</th>
                  </tr>
                </thead>
                <tbody>
                  {topEntries.map((entry) => (
                    <tr key={entry.rank} className="border-b border-gray-700">
                      <td className="py-2 px-4">{entry.rank}</td>
                      <td className="py-2 px-4">{entry.email}</td>
                      <td className="py-2 px-4 text-right">{formatTime(entry.time)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </>
  );
};
