> **Original User Prompt**: "차분히 진행해주고 모든 결과는 문서로 정리해서 ... 인간인 내가 보는 문서가 아니야 너가 보는거야. 상황에 따라서는 스크립트나 파이썬파일이나 등등 너가 하기 쉽게 빠르게 정확하게 할 수 있는 모든 방법을 강구해서 진행해줘"

# 102_Architect_Blueprint: 공간 및 환경 물리 설계 (Machine-Readable)

## 1. 개요 (Overview)
본 문서는 안티그래비티(AI)가 로블록스 월드 내에 `Forest Sprint` 환경을 자동 생성하기 위한 좌표계와 물리적 상수를 정의합니다.

## 2. 환경 설정 프로토콜 (Environment Config)
다음 값들은 `Lighting` 및 `Workspace`의 전역 속성으로 주입됩니다.

| Category | Property | Value | Note |
| :--- | :--- | :--- | :--- |
| **Baseplate** | Material | `Enum.Material.Grass` | 숲속 느낌의 잔디 바닥 |
| **Baseplate** | Color | `Color3.fromRGB(58, 125, 21)` | 깊은 숲의 초록색 |
| **Lighting** | Technology | `Enum.Technology.Future` | 고해상도 그림자 및 광원 |
| **Lighting** | Ambient | `Color3.fromRGB(130, 150, 130)` | 부드러운 숲속 대기광 |

## 3. 공간 좌표계 (Spatial Coordinates)

| Instance Name | Position (X, Y, Z) | Size (X, Y, Z) | Orientation |
| :--- | :--- | :--- | :--- |
| **StartLine** | `0, 0.5, 0` | `20, 1, 2` | `0, 0, 0` |
| **FinishLine** | `0, 0.5, 300` (100m) | `20, 1, 2` | `0, 0, 0` |
| **SprintTrack** | `0, 0.1, 150` | `15, 0.1, 300` | `0, 0, 0` |
| **Tree_Anchor_1** | `15, 0, 50` | `Random` | `Random` |
| **Tree_Anchor_2** | `-15, 0, 100` | `Random` | `Random` |

## 4. 장애물 정의 (Obstacle Manifest)
*   **Log_Hurdle_1**: Position `(0, 1, 100)`, Size `(10, 2, 2)`, Material `Wood`
*   **Log_Hurdle_2**: Position `(0, 1, 200)`, Size `(10, 2, 2)`, Material `Wood`

## 5. 실행용 루아 코드 스니펫 (Execution Snippet)
```lua
-- Architect Manifestation Script
local function createEnvironment()
	local workspace = game:GetService("Workspace")
	local baseplate = workspace:FindFirstChild("Baseplate")
	if baseplate then
		baseplate.Material = Enum.Material.Grass
		baseplate.Color = Color3.fromRGB(58, 125, 21)
	end
	-- Start/Finish Lines will be injected via default.project.json for Rojo stability
end
```

---
**Manifestation System V3.0 — Architectural Data Locked.**
