// @ts-nocheck
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SettingsPanel } from './SettingsPanel';

describe('SettingsPanel Component', () => {
  beforeEach(() => {
    // LocalStorage 초기화
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('렌더링 및 열기/닫기', () => {
    it('패널이 닫힌 상태로 시작해야 함', () => {
      render(<SettingsPanel />);

      const panel = screen.queryByRole('dialog');
      expect(panel).not.toBeInTheDocument();
    });

    it('Settings 버튼 클릭 시 패널이 열려야 함', () => {
      render(<SettingsPanel />);

      const openButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(openButton);

      const panel = screen.getByRole('dialog');
      expect(panel).toBeInTheDocument();
    });

    it('Close 버튼 클릭 시 패널이 닫혀야 함', () => {
      render(<SettingsPanel />);

      // 패널 열기
      const openButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(openButton);

      // 패널 닫기
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);

      const panel = screen.queryByRole('dialog');
      expect(panel).not.toBeInTheDocument();
    });
  });

  describe('볼륨 슬라이더', () => {
    it('Master 볼륨 슬라이더가 렌더링되어야 함', () => {
      render(<SettingsPanel />);

      const openButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(openButton);

      const masterSlider = screen.getByRole('slider', { name: /master volume/i });
      expect(masterSlider).toBeInTheDocument();
      expect(masterSlider).toHaveAttribute('min', '0');
      expect(masterSlider).toHaveAttribute('max', '100');
    });

    it('Music 볼륨 슬라이더가 렌더링되어야 함', () => {
      render(<SettingsPanel />);

      const openButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(openButton);

      const musicSlider = screen.getByRole('slider', { name: /music volume/i });
      expect(musicSlider).toBeInTheDocument();
      expect(musicSlider).toHaveAttribute('min', '0');
      expect(musicSlider).toHaveAttribute('max', '100');
    });

    it('SFX 볼륨 슬라이더가 렌더링되어야 함', () => {
      render(<SettingsPanel />);

      const openButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(openButton);

      const sfxSlider = screen.getByRole('slider', { name: /sfx volume/i });
      expect(sfxSlider).toBeInTheDocument();
      expect(sfxSlider).toHaveAttribute('min', '0');
      expect(sfxSlider).toHaveAttribute('max', '100');
    });

    it('Master 볼륨 슬라이더 값 변경이 반영되어야 함', () => {
      render(<SettingsPanel />);

      const openButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(openButton);

      const masterSlider = screen.getByRole('slider', { name: /master volume/i });
      fireEvent.change(masterSlider, { target: { value: '75' } });

      expect(masterSlider).toHaveValue('75');
    });

    it('Music 볼륨 슬라이더 값 변경이 반영되어야 함', () => {
      render(<SettingsPanel />);

      const openButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(openButton);

      const musicSlider = screen.getByRole('slider', { name: /music volume/i });
      fireEvent.change(musicSlider, { target: { value: '65' } });

      expect(musicSlider).toHaveValue('65');
    });

    it('SFX 볼륨 슬라이더 값 변경이 반영되어야 함', () => {
      render(<SettingsPanel />);

      const openButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(openButton);

      const sfxSlider = screen.getByRole('slider', { name: /sfx volume/i });
      fireEvent.change(sfxSlider, { target: { value: '85' } });

      expect(sfxSlider).toHaveValue('85');
    });

    it('기본 볼륨 값이 50이어야 함', () => {
      render(<SettingsPanel />);

      const openButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(openButton);

      const masterSlider = screen.getByRole('slider', { name: /master volume/i });
      const musicSlider = screen.getByRole('slider', { name: /music volume/i });
      const sfxSlider = screen.getByRole('slider', { name: /sfx volume/i });

      expect(masterSlider).toHaveValue('50');
      expect(musicSlider).toHaveValue('50');
      expect(sfxSlider).toHaveValue('50');
    });
  });

  describe('그래픽 옵션', () => {
    it('그래픽 옵션 드롭다운이 렌더링되어야 함', () => {
      render(<SettingsPanel />);

      const openButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(openButton);

      const graphicsSelect = screen.getByRole('combobox', { name: /graphics quality/i });
      expect(graphicsSelect).toBeInTheDocument();
    });

    it('그래픽 옵션이 Low, Medium, High를 포함해야 함', () => {
      render(<SettingsPanel />);

      const openButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(openButton);

      const lowOption = screen.getByRole('option', { name: /low/i });
      const mediumOption = screen.getByRole('option', { name: /medium/i });
      const highOption = screen.getByRole('option', { name: /high/i });

      expect(lowOption).toBeInTheDocument();
      expect(mediumOption).toBeInTheDocument();
      expect(highOption).toBeInTheDocument();
    });

    it('그래픽 옵션 변경이 반영되어야 함', () => {
      render(<SettingsPanel />);

      const openButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(openButton);

      const graphicsSelect = screen.getByRole('combobox', { name: /graphics quality/i });
      fireEvent.change(graphicsSelect, { target: { value: 'high' } });

      expect(graphicsSelect).toHaveValue('high');
    });

    it('기본 그래픽 옵션이 medium이어야 함', () => {
      render(<SettingsPanel />);

      const openButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(openButton);

      const graphicsSelect = screen.getByRole('combobox', { name: /graphics quality/i });
      expect(graphicsSelect).toHaveValue('medium');
    });
  });

  describe('LocalStorage 저장/불러오기', () => {
    it('Master 볼륨 변경 시 LocalStorage에 저장되어야 함', () => {
      render(<SettingsPanel />);

      const openButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(openButton);

      const masterSlider = screen.getByRole('slider', { name: /master volume/i });
      fireEvent.change(masterSlider, { target: { value: '80' } });

      const savedSettings = localStorage.getItem('gameSettings');
      expect(savedSettings).toBeTruthy();

      const parsedSettings = JSON.parse(savedSettings!);
      expect(parsedSettings.masterVolume).toBe(80);
    });

    it('Music 볼륨 변경 시 LocalStorage에 저장되어야 함', () => {
      render(<SettingsPanel />);

      const openButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(openButton);

      const musicSlider = screen.getByRole('slider', { name: /music volume/i });
      fireEvent.change(musicSlider, { target: { value: '70' } });

      const savedSettings = localStorage.getItem('gameSettings');
      expect(savedSettings).toBeTruthy();

      const parsedSettings = JSON.parse(savedSettings!);
      expect(parsedSettings.musicVolume).toBe(70);
    });

    it('SFX 볼륨 변경 시 LocalStorage에 저장되어야 함', () => {
      render(<SettingsPanel />);

      const openButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(openButton);

      const sfxSlider = screen.getByRole('slider', { name: /sfx volume/i });
      fireEvent.change(sfxSlider, { target: { value: '90' } });

      const savedSettings = localStorage.getItem('gameSettings');
      expect(savedSettings).toBeTruthy();

      const parsedSettings = JSON.parse(savedSettings!);
      expect(parsedSettings.sfxVolume).toBe(90);
    });

    it('저장된 설정을 불러와야 함', () => {
      // 미리 설정 저장
      const savedSettings = {
        masterVolume: 60,
        musicVolume: 70,
        sfxVolume: 80,
        graphicsQuality: 'high',
      };
      localStorage.setItem('gameSettings', JSON.stringify(savedSettings));

      render(<SettingsPanel />);

      const openButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(openButton);

      const masterSlider = screen.getByRole('slider', { name: /master volume/i });
      const musicSlider = screen.getByRole('slider', { name: /music volume/i });
      const sfxSlider = screen.getByRole('slider', { name: /sfx volume/i });
      const graphicsSelect = screen.getByRole('combobox', { name: /graphics quality/i });

      expect(masterSlider).toHaveValue('60');
      expect(musicSlider).toHaveValue('70');
      expect(sfxSlider).toHaveValue('80');
      expect(graphicsSelect).toHaveValue('high');
    });
  });
});
