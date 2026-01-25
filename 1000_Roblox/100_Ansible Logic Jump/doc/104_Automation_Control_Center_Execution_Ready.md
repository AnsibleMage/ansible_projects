> **Original User Prompt**: "상황에 따라서는 스크립트나 파이썬파일이나 등등 너가 하기 쉽게 빠르게 정확하게 할 수 있는 모든 방법을 강구해서 진행해줘"

# 104_Automation_Control_Center: 실행 및 자동화 커맨드 센터

## 1. 개요 (Overview)
본 문서는 안티그래비티가 `102_`, `103_`에 정의된 설계도를 실제 로블록스 프로젝트 파일로 변환하기 위해 실행할 **최종 자동화 명령어셋**입니다.

## 2. 프로젝트 스캐폴딩 명령어 (Project Scaffolding)
```bash
# 디렉토리 구조 검증 및 생성
mkdir -p src/server src/client src/shared
```

## 3. 리소스 생성 스크립트 (Python/Shell Automation)
안티그래비티가 대량의 나무 에셋 좌표를 계산하거나 `default.project.json`을 수정할 때 사용할 파이썬 스크립트 로직입니다.

```python
# tree_generator.py (Pseudo)
import random

def generate_tree_positions(count=20):
    trees = {}
    for i in range(count):
        side = 20 if random.random() > 0.5 else -20
        pos = [side + random.uniform(-5, 5), 0, random.uniform(0, 300)]
        trees[f"ForestTree_{i}"] = {"Position": pos}
    return trees
```

## 4. 최종 주입 커맨드 (Final Injection)
1.  **JSON Patch**: `default.project.json`에 `102_`에서 정의된 파트들을 일괄 주입.
2.  **Luau Sync**: `src/server/RaceEngine.server.lua` 생성 및 `103_` 로직 주입.
3.  **UI Sync**: `src/client/TimerGui.client.luau` 생성.

## 5. 안티그래비티 실행 동적 체인 가동 조건
- [ ] `100_`, `101_`, `102_`, `103_` 문서가 모두 존재할 것.
- [ ] 로블로록스 스튜디오의 `Rojo` 및 `MCP` 서버가 'Active' 상태일 것.
- [ ] 사용자로부터 "설계도대로 현현을 시작해줘"라는 최종 프로토콜 수신.

---
**Manifestation System V3.0 — Execution Ready.**
