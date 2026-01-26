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
const DEFAULT_SETTINGS: GameSettings = stryMutAct_9fa48("1692") ? {} : (stryCov_9fa48("1692"), {
  masterVolume: 50,
  musicVolume: 50,
  sfxVolume: 50,
  graphicsQuality: stryMutAct_9fa48("1693") ? "" : (stryCov_9fa48("1693"), 'medium')
});
const STORAGE_KEY = stryMutAct_9fa48("1694") ? "" : (stryCov_9fa48("1694"), 'gameSettings');
const VOLUME_RANGE = {
  MIN: 0,
  MAX: 100
} as const;
const PANEL_LABELS = {
  TITLE: 'Settings',
  CLOSE: 'Close',
  MASTER_VOLUME: 'Master Volume',
  MUSIC_VOLUME: 'Music Volume',
  SFX_VOLUME: 'SFX Volume',
  GRAPHICS_QUALITY: 'Graphics Quality'
} as const;
const GRAPHICS_OPTIONS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const;

// 볼륨 슬라이더 컴포넌트 (DRY 원칙)
const VolumeSlider = stryMutAct_9fa48("1695") ? () => undefined : (stryCov_9fa48("1695"), (() => {
  const VolumeSlider = ({
    id,
    label,
    value,
    onChange
  }: VolumeSliderProps) => <div>
    <label htmlFor={id} className="block text-white mb-2">
      {label}
    </label>
    <input id={id} type="range" min={VOLUME_RANGE.MIN} max={VOLUME_RANGE.MAX} value={value} onChange={stryMutAct_9fa48("1696") ? () => undefined : (stryCov_9fa48("1696"), e => onChange(Number(e.target.value)))} aria-label={label} className="w-full" />
    <span className="text-white text-sm">{value}%</span>
  </div>;
  return VolumeSlider;
})());
export const SettingsPanel = () => {
  if (stryMutAct_9fa48("1697")) {
    {}
  } else {
    stryCov_9fa48("1697");
    const [isOpen, setIsOpen] = useState(stryMutAct_9fa48("1698") ? true : (stryCov_9fa48("1698"), false));
    const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);

    // LocalStorage에서 설정 불러오기
    useEffect(() => {
      if (stryMutAct_9fa48("1699")) {
        {}
      } else {
        stryCov_9fa48("1699");
        const savedSettings = localStorage.getItem(STORAGE_KEY);
        if (stryMutAct_9fa48("1701") ? false : stryMutAct_9fa48("1700") ? true : (stryCov_9fa48("1700", "1701"), savedSettings)) {
          if (stryMutAct_9fa48("1702")) {
            {}
          } else {
            stryCov_9fa48("1702");
            setSettings(JSON.parse(savedSettings));
          }
        }
      }
    }, stryMutAct_9fa48("1703") ? ["Stryker was here"] : (stryCov_9fa48("1703"), []));

    // 설정 변경 시 LocalStorage에 저장
    const updateSettings = (newSettings: Partial<GameSettings>) => {
      if (stryMutAct_9fa48("1704")) {
        {}
      } else {
        stryCov_9fa48("1704");
        const updatedSettings = stryMutAct_9fa48("1705") ? {} : (stryCov_9fa48("1705"), {
          ...settings,
          ...newSettings
        });
        setSettings(updatedSettings);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));
      }
    };
    const handleOpenPanel = stryMutAct_9fa48("1706") ? () => undefined : (stryCov_9fa48("1706"), (() => {
      const handleOpenPanel = () => setIsOpen(stryMutAct_9fa48("1707") ? false : (stryCov_9fa48("1707"), true));
      return handleOpenPanel;
    })());
    const handleClosePanel = stryMutAct_9fa48("1708") ? () => undefined : (stryCov_9fa48("1708"), (() => {
      const handleClosePanel = () => setIsOpen(stryMutAct_9fa48("1709") ? true : (stryCov_9fa48("1709"), false));
      return handleClosePanel;
    })());
    return <>
      {/* Settings 버튼 */}
      <MenuButton variant="secondary" onClick={handleOpenPanel}>
        {PANEL_LABELS.TITLE}
      </MenuButton>

      {/* Settings 패널 */}
      {stryMutAct_9fa48("1712") ? isOpen || <div role="dialog" aria-labelledby="settings-title" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-8 w-96 max-w-full">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-6">
              <h2 id="settings-title" className="text-2xl font-game text-white">
                {PANEL_LABELS.TITLE}
              </h2>
              <button onClick={handleClosePanel} className="text-white hover:text-gray-300" aria-label={PANEL_LABELS.CLOSE}>
                ✕
              </button>
            </div>

            {/* 볼륨 설정 */}
            <div className="space-y-4 mb-6">
              <VolumeSlider id="master-volume" label={PANEL_LABELS.MASTER_VOLUME} value={settings.masterVolume} onChange={value => updateSettings({
              masterVolume: value
            })} />
              <VolumeSlider id="music-volume" label={PANEL_LABELS.MUSIC_VOLUME} value={settings.musicVolume} onChange={value => updateSettings({
              musicVolume: value
            })} />
              <VolumeSlider id="sfx-volume" label={PANEL_LABELS.SFX_VOLUME} value={settings.sfxVolume} onChange={value => updateSettings({
              sfxVolume: value
            })} />
            </div>

            {/* 그래픽 설정 */}
            <div className="mb-6">
              <label htmlFor="graphics-quality" className="block text-white mb-2">
                {PANEL_LABELS.GRAPHICS_QUALITY}
              </label>
              <select id="graphics-quality" value={settings.graphicsQuality} onChange={e => updateSettings({
              graphicsQuality: e.target.value as 'low' | 'medium' | 'high'
            })} aria-label={PANEL_LABELS.GRAPHICS_QUALITY} className="w-full bg-gray-700 text-white px-4 py-2 rounded">
                <option value={GRAPHICS_OPTIONS.LOW}>Low</option>
                <option value={GRAPHICS_OPTIONS.MEDIUM}>Medium</option>
                <option value={GRAPHICS_OPTIONS.HIGH}>High</option>
              </select>
            </div>
          </div>
        </div> : stryMutAct_9fa48("1711") ? false : stryMutAct_9fa48("1710") ? true : (stryCov_9fa48("1710", "1711", "1712"), isOpen && <div role="dialog" aria-labelledby="settings-title" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-8 w-96 max-w-full">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-6">
              <h2 id="settings-title" className="text-2xl font-game text-white">
                {PANEL_LABELS.TITLE}
              </h2>
              <button onClick={handleClosePanel} className="text-white hover:text-gray-300" aria-label={PANEL_LABELS.CLOSE}>
                ✕
              </button>
            </div>

            {/* 볼륨 설정 */}
            <div className="space-y-4 mb-6">
              <VolumeSlider id="master-volume" label={PANEL_LABELS.MASTER_VOLUME} value={settings.masterVolume} onChange={stryMutAct_9fa48("1713") ? () => undefined : (stryCov_9fa48("1713"), value => updateSettings(stryMutAct_9fa48("1714") ? {} : (stryCov_9fa48("1714"), {
              masterVolume: value
            })))} />
              <VolumeSlider id="music-volume" label={PANEL_LABELS.MUSIC_VOLUME} value={settings.musicVolume} onChange={stryMutAct_9fa48("1715") ? () => undefined : (stryCov_9fa48("1715"), value => updateSettings(stryMutAct_9fa48("1716") ? {} : (stryCov_9fa48("1716"), {
              musicVolume: value
            })))} />
              <VolumeSlider id="sfx-volume" label={PANEL_LABELS.SFX_VOLUME} value={settings.sfxVolume} onChange={stryMutAct_9fa48("1717") ? () => undefined : (stryCov_9fa48("1717"), value => updateSettings(stryMutAct_9fa48("1718") ? {} : (stryCov_9fa48("1718"), {
              sfxVolume: value
            })))} />
            </div>

            {/* 그래픽 설정 */}
            <div className="mb-6">
              <label htmlFor="graphics-quality" className="block text-white mb-2">
                {PANEL_LABELS.GRAPHICS_QUALITY}
              </label>
              <select id="graphics-quality" value={settings.graphicsQuality} onChange={stryMutAct_9fa48("1719") ? () => undefined : (stryCov_9fa48("1719"), e => updateSettings(stryMutAct_9fa48("1720") ? {} : (stryCov_9fa48("1720"), {
              graphicsQuality: e.target.value as 'low' | 'medium' | 'high'
            })))} aria-label={PANEL_LABELS.GRAPHICS_QUALITY} className="w-full bg-gray-700 text-white px-4 py-2 rounded">
                <option value={GRAPHICS_OPTIONS.LOW}>Low</option>
                <option value={GRAPHICS_OPTIONS.MEDIUM}>Medium</option>
                <option value={GRAPHICS_OPTIONS.HIGH}>High</option>
              </select>
            </div>
          </div>
        </div>)}
    </>;
  }
};