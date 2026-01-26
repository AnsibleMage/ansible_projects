/**
 * VolumeControl Component
 *
 * 볼륨 조절 UI 컴포넌트
 * - Master volume 슬라이더
 * - VolumeStore와 연동
 * - LocalStorage 자동 저장
 */

import { useVolumeStore } from '../blocks/block4-ui-ux/features/f5-sound-system/state/volumeStore';

export function VolumeControl() {
  const { masterVolume, setMasterVolume } = useVolumeStore();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) / 100; // 0-100 → 0-1
    setMasterVolume(value);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '1rem',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '1rem',
        borderRadius: '8px',
        minWidth: '200px',
        zIndex: 1000,
      }}
    >
      <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
        볼륨: {Math.round(masterVolume * 100)}%
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={Math.round(masterVolume * 100)}
        onChange={handleVolumeChange}
        data-testid="volume-slider"
        style={{
          width: '100%',
          cursor: 'pointer',
        }}
      />
    </div>
  );
}
