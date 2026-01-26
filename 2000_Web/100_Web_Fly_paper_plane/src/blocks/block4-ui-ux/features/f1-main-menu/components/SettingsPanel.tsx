import { useState, useEffect } from 'react';
import { MenuButton } from './MenuButton';

interface GameSettings {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  graphicsQuality: 'low' | 'medium' | 'high';
}

interface VolumeSliderProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const DEFAULT_SETTINGS: GameSettings = {
  masterVolume: 50,
  musicVolume: 50,
  sfxVolume: 50,
  graphicsQuality: 'medium',
};

const STORAGE_KEY = 'gameSettings';

const VOLUME_RANGE = {
  MIN: 0,
  MAX: 100,
} as const;

const PANEL_LABELS = {
  TITLE: 'Settings',
  CLOSE: 'Close',
  MASTER_VOLUME: 'Master Volume',
  MUSIC_VOLUME: 'Music Volume',
  SFX_VOLUME: 'SFX Volume',
  GRAPHICS_QUALITY: 'Graphics Quality',
} as const;

const GRAPHICS_OPTIONS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

// 볼륨 슬라이더 컴포넌트 (DRY 원칙)
const VolumeSlider = ({ id, label, value, onChange }: VolumeSliderProps) => (
  <div>
    <label htmlFor={id} className="block text-white mb-2">
      {label}
    </label>
    <input
      id={id}
      type="range"
      min={VOLUME_RANGE.MIN}
      max={VOLUME_RANGE.MAX}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label={label}
      className="w-full"
    />
    <span className="text-white text-sm">{value}%</span>
  </div>
);

export const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);

  // LocalStorage에서 설정 불러오기
  useEffect(() => {
    const savedSettings = localStorage.getItem(STORAGE_KEY);
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // 설정 변경 시 LocalStorage에 저장
  const updateSettings = (newSettings: Partial<GameSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));
  };

  const handleOpenPanel = () => setIsOpen(true);
  const handleClosePanel = () => setIsOpen(false);

  return (
    <>
      {/* Settings 버튼 */}
      <MenuButton variant="secondary" onClick={handleOpenPanel}>
        {PANEL_LABELS.TITLE}
      </MenuButton>

      {/* Settings 패널 */}
      {isOpen && (
        <div
          role="dialog"
          aria-labelledby="settings-title"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-gray-800 rounded-lg p-8 w-96 max-w-full">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-6">
              <h2 id="settings-title" className="text-2xl font-game text-white">
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

            {/* 볼륨 설정 */}
            <div className="space-y-4 mb-6">
              <VolumeSlider
                id="master-volume"
                label={PANEL_LABELS.MASTER_VOLUME}
                value={settings.masterVolume}
                onChange={(value) => updateSettings({ masterVolume: value })}
              />
              <VolumeSlider
                id="music-volume"
                label={PANEL_LABELS.MUSIC_VOLUME}
                value={settings.musicVolume}
                onChange={(value) => updateSettings({ musicVolume: value })}
              />
              <VolumeSlider
                id="sfx-volume"
                label={PANEL_LABELS.SFX_VOLUME}
                value={settings.sfxVolume}
                onChange={(value) => updateSettings({ sfxVolume: value })}
              />
            </div>

            {/* 그래픽 설정 */}
            <div className="mb-6">
              <label
                htmlFor="graphics-quality"
                className="block text-white mb-2"
              >
                {PANEL_LABELS.GRAPHICS_QUALITY}
              </label>
              <select
                id="graphics-quality"
                value={settings.graphicsQuality}
                onChange={(e) =>
                  updateSettings({
                    graphicsQuality: e.target.value as 'low' | 'medium' | 'high',
                  })
                }
                aria-label={PANEL_LABELS.GRAPHICS_QUALITY}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded"
              >
                <option value={GRAPHICS_OPTIONS.LOW}>Low</option>
                <option value={GRAPHICS_OPTIONS.MEDIUM}>Medium</option>
                <option value={GRAPHICS_OPTIONS.HIGH}>High</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
