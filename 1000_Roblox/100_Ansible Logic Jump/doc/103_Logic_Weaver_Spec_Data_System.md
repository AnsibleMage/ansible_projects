> **Original User Prompt**: "차분히 진행해주고 모든 결과는 문서로 정리해서 ... 나를 위한게 아니라 너를 위한거야."

# 103_Logic_Weaver_Spec: 타이머 및 데이터 로직 설계 (Machine-Readable)

## 1. 개요 (Overview)
본 문서는 `Forest Sprint`의 타임 어택 기능을 제어하는 서버 사이드 로직과 플레이어 데이터 저장 방식을 정의합니다.

## 2. 타이머 시스템 (Timer Logic)
*   **Trigger A (Start)**: `StartLine` 파트에 생성된 `Touched` 이벤트.
*   **Trigger B (Stop)**: `FinishLine` 파트에 생성된 `Touched` 이벤트.
*   **Variable**: 플레이어별 `StartTime` (상태값 보존 필요).

## 3. 데이터스토어 스키마 (DataStore Schema)
| Key | Value Type | Description |
| :--- | :--- | :--- |
| `BestTime` | `number` (float) | 플레이어의 최단 완주 기록 (초 단위) |
| `TotalRuns` | `int` | 총 완주 횟수 |

## 4. 리더보드 프로토콜 (Leaderboard Protocol)
*   **Display Name**: `Global Sprint Records`
*   **Sorting Order**: `Ascending` (낮은 시간이 높은 순위)
*   **Update Interval**: 완주 직후 실시간 업데이트

## 5. 실행용 베이스 코드 (Logic Blueprint)
```lua
-- Logic Weaver Protocol
local DataStoreService = game:GetService("DataStoreService")
local SprintStore = DataStoreService:GetDataStore("ForestSprintRecords")

local function onPlayerFinish(player, finishTime)
	local currentBest = SprintStore:GetAsync(player.UserId) or 9999
	if finishTime < currentBest then
		SprintStore:SetAsync(player.UserId, finishTime)
		-- Trigger Top Records Update
	end
end
```

## 6. 장애물 상호작용 (Obstacle Interaction)
*   **Mud_Puddle**: 플레이어의 `WalkSpeed`를 8로 감속 (3초간 지속).
*   **Hurdle**: 물리적 충돌체로 작동.

---
**Manifestation System V3.0 — Logic Architecture Locked.**
