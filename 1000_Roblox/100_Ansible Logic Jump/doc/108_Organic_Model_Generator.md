> **Original User Prompt**: "동그런 원만 떠다니는데 다시 만들어줘"

# 108_Organic_Model_Generator: 유기적 조경 생성 코드 설계

## 1. 개요 (Overview)
단순한 '막대기 위 공' 형태의 나무를 폐기하고, AI가 파이썬 스크립트로 생성할 다중 구조의 유기적 나무 모델링 데이터 구조를 정의합니다.

## 2. 나무 모델 구조 (Tree Schematic)
```json
{
  "Trunk_Base": { "Size": [3, 4, 3], "Material": "Wood" },
  "Trunk_Top": { "Size": [2, 6, 2], "Position_Y_Offset": 5 },
  "Leaf_Cluster_1": { "Shape": "Ball", "Size": [6, 6, 6], "Offset": [2, 9, 0] },
  "Leaf_Cluster_2": { "Shape": "Ball", "Size": [7, 7, 7], "Offset": [-2, 10, 1] },
  "Leaf_Cluster_3": { "Shape": "Ball", "Size": [5, 5, 5], "Offset": [0, 11, -2] }
}
```

## 3. 랜덤 변수 프로토콜 (Randomization)
*   **Rotation**: 모든 나뭇잎 클러스터의 회전값을 다르게 설정하여 비정형성 확보.
*   **Scale**: 각 나무의 높이를 10~15스터드 사이에서 무작위 결정.
*   **Density**: 트랙에서 멀어질수록 나무의 밀도를 높여 울창한 숲의 느낌을 시각적으로 구현.

## 4. 실행 순서
1.  기존 `ForestTree_*` 객체 전량 삭제.
2.  본 설계도 기반의 뉴 제너레이션 나무 30그루 일괄 소환.
3.  라이팅 효과 주입과 동시 실행.

---
**Manifestation System V3.0 — Organic Logic Locked.**
