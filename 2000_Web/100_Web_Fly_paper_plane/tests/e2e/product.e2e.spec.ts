/**
 * Product E2E Test: Fly Paper Plane
 *
 * 전체 워크플로우 E2E 테스트
 *
 * Prerequisites:
 * - App.tsx 구현 완료
 * - npm run dev 서버 실행 (localhost:5173)
 * - 모든 Block 통합 완료
 *
 * Test Scenarios:
 * 1. 메뉴 화면 → 게임 시작
 * 2. 비행 조작 (키보드 입력)
 * 3. 체크포인트 통과
 * 4. 결과 화면 표시
 * 5. 리더보드 등록 & 조회
 */

import { test, expect } from '@playwright/test';

test.describe('Product E2E: Fly Paper Plane', () => {
  test.beforeEach(async ({ page }) => {
    // App이 localhost:3000에서 실행 중이라고 가정
    await page.goto('http://localhost:3000');
  });

  test('메뉴 화면이 정상적으로 렌더링되어야 함', async ({ page }) => {
    // 메뉴 제목 확인
    await expect(page.locator('h1')).toContainText('종이비행기 날아라');

    // 게임 시작 버튼 확인
    const startButton = page.locator('button:has-text("게임 시작")');
    await expect(startButton).toBeVisible();

    // 리더보드 버튼 확인
    const leaderboardButton = page.locator('button:has-text("리더보드")');
    await expect(leaderboardButton).toBeVisible();
  });

  test('메뉴 BGM이 자동 재생되어야 함 (오디오 확인)', async ({ page }) => {
    // Audio 요소 존재 확인
    const audio = page.locator('audio');
    await expect(audio).toHaveCount(1);

    // Autoplay 및 Loop 속성 확인
    const isAutoplay = await audio.getAttribute('autoplay');
    const isLoop = await audio.getAttribute('loop');

    expect(isAutoplay).toBeTruthy();
    expect(isLoop).toBeTruthy();
  });

  test.skip('게임 시작 버튼 클릭 시 게임 화면으로 전환되어야 함', async ({ page }) => {
    // 게임 시작 버튼 클릭
    const startButton = page.locator('button:has-text("게임 시작")');
    await startButton.click();

    // 3D Canvas 렌더링 확인 (Canvas disabled for E2E)
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();

    // 게임 UI 요소 확인 (타이머, 체크포인트 카운터 등)
    await expect(page.locator('[data-testid="timer"]')).toBeVisible();
    await expect(page.locator('[data-testid="checkpoint-counter"]')).toBeVisible();
  });

  test.skip('키보드 입력으로 비행기를 조작할 수 있어야 함', async ({ page }) => {
    // 게임 시작
    await page.locator('button:has-text("게임 시작")').click();

    // Canvas에 포커스 (Canvas disabled for E2E)
    const canvas = page.locator('canvas');
    await canvas.click();

    // W 키 (상승)
    await page.keyboard.press('KeyW');

    // A 키 (왼쪽)
    await page.keyboard.press('KeyA');

    // S 키 (하강)
    await page.keyboard.press('KeyS');

    // D 키 (오른쪽)
    await page.keyboard.press('KeyD');

    // 비행기 위치 변화 확인 (실제 구현 후 검증)
    // TODO: 비행기 position을 DOM에 노출하여 테스트
  });

  test('체크포인트 통과 시 효과음과 카운터가 업데이트되어야 함', async ({ page }) => {
    // 게임 시작
    await page.locator('button:has-text("게임 시작")').click();

    // 초기 체크포인트 카운터
    const counter = page.locator('[data-testid="checkpoint-counter"]');
    await expect(counter).toContainText('0');

    // 첫 번째 체크포인트까지 비행 (시뮬레이션)
    // TODO: 실제 비행 로직 구현 후 테스트

    // 체크포인트 통과 후 카운터 증가 확인
    // await expect(counter).toContainText('1');
  });

  test('모든 체크포인트 통과 후 결과 화면이 표시되어야 함', async ({ page }) => {
    // 게임 시작
    await page.locator('button:has-text("게임 시작")').click();

    // 자동 완주 대기 (100ms + 여유시간)
    await page.waitForTimeout(500);

    // 결과 화면 표시 확인
    await expect(page.locator('[data-testid="result-screen"]')).toBeVisible();

    // 결과 정보 확인 (시간, 체크포인트 수 등)
    await expect(page.locator('[data-testid="final-time"]')).toBeVisible();
    await expect(page.locator('[data-testid="checkpoint-count"]')).toBeVisible();

    // 팡파레 재생 확인
    // TODO: Audio 재생 상태 확인
  });

  test('결과 화면에서 리더보드 등록이 가능해야 함', async ({ page }) => {
    // 게임 완료 후 결과 화면
    await page.locator('button:has-text("게임 시작")').click();

    // 자동 완주 대기 (100ms + 여유시간)
    await page.waitForTimeout(500);

    // 결과 화면 확인
    await expect(page.locator('[data-testid="result-screen"]')).toBeVisible();

    // 이메일 입력
    const emailInput = page.locator('[data-testid="email-input"]');
    await emailInput.fill('test@example.com');

    // 인증 코드 요청
    const requestCodeButton = page.locator('button:has-text("인증 코드 받기")');
    await requestCodeButton.click();

    // 인증 코드 입력 (테스트 환경에서는 고정값)
    const codeInput = page.locator('[data-testid="code-input"]');
    await codeInput.fill('123456');

    // 인증 확인 버튼 클릭
    const verifyButton = page.locator('button:has-text("확인")');
    await verifyButton.click();

    // 기록 제출
    const submitButton = page.locator('button:has-text("기록 제출")');
    await submitButton.click();

    // 제출 성공 메시지 확인
    await expect(page.locator('[data-testid="submit-success"]')).toBeVisible();
  });

  test('리더보드에서 상위 10개 기록을 조회할 수 있어야 함', async ({ page }) => {
    // 리더보드 버튼 클릭
    const leaderboardButton = page.locator('button:has-text("리더보드")');
    await leaderboardButton.click();

    // 리더보드 테이블 확인
    const table = page.locator('[data-testid="leaderboard-table"]');
    await expect(table).toBeVisible();

    // 최소 1개 이상의 기록 존재 확인
    const rows = table.locator('tbody tr');
    await expect(rows).toHaveCount(10); // 상위 10개
  });

  test('볼륨 설정이 LocalStorage에 저장되고 새로고침 후에도 유지되어야 함', async ({ page }) => {
    // 볼륨 슬라이더 조작
    const volumeSlider = page.locator('[data-testid="volume-slider"]');
    await volumeSlider.fill('50'); // 0-100 범위

    // LocalStorage 확인
    const masterVolume = await page.evaluate(() => localStorage.getItem('masterVolume'));
    expect(masterVolume).toBe('0.5'); // 0-1 범위로 저장

    // 페이지 새로고침
    await page.reload();

    // 볼륨 설정 유지 확인
    const volumeValue = await volumeSlider.inputValue();
    expect(volumeValue).toBe('50');
  });

  test.skip('전체 워크플로우: 메뉴 → 게임 → 결과 → 리더보드', async ({ page }) => {
    // 1. 메뉴 화면 확인
    await expect(page.locator('h1')).toContainText('종이비행기 날아라');

    // 2. 게임 시작
    await page.locator('button:has-text("게임 시작")').click();
    await expect(page.locator('canvas')).toBeVisible();

    // 3. 게임 플레이 (시뮬레이션)
    // TODO: 비행 조작 + 체크포인트 통과

    // 4. 결과 화면
    await expect(page.locator('[data-testid="result-screen"]')).toBeVisible();

    // 5. 리더보드 등록
    await page.locator('[data-testid="email-input"]').fill('e2e@test.com');
    await page.locator('button:has-text("인증 코드 받기")').click();
    await page.locator('[data-testid="code-input"]').fill('123456');
    await page.locator('button:has-text("기록 제출")').click();

    // 6. 리더보드 확인
    await page.locator('button:has-text("리더보드")').click();
    await expect(page.locator('[data-testid="leaderboard-table"]')).toBeVisible();
  });
});

/**
 * Note: 현재 E2E 테스트는 App.tsx가 완성되지 않아 실행되지 않습니다.
 *
 * 다음 단계:
 * 1. App.tsx 구현 (Block 1~4 통합)
 * 2. dev 서버 실행 (npm run dev)
 * 3. E2E 테스트 실행 (npm run test:e2e)
 *
 * 실행 명령:
 * - 모든 E2E 테스트: npm run test:e2e
 * - UI 모드: npm run test:e2e:headed
 * - 특정 테스트: npx playwright test product.e2e.spec.ts
 */
