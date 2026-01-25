# 📡 1000_Roblox: The Ansible Core Hub

> **"The central coordinates for all manifestations within the Roblox frontier."**

`1000_Roblox`는 **Ansible Station**의 로블록스 개발 인프라를 총괄하는 최상위 코어 리포지토리입니다.

---

## 🎮 프로젝트 포트폴리오

### ✅ 100_Ansible Logic Jump - **LIVE ON ROBLOX** 🟢
**상태**: 런칭 완료 (2026-01-25)

**게임 정보**:
- **공식명**: Ansible Jump 001
- **개발자**: @AnsibleMage
- **장르**: 극한 고공 점프맵 / 타임 어택
- **서버**: 최대 50명

**핵심 기능**:
- 🏔️ 25개 고공 발판 (높이 10~20m)
- ⏱️ 0.01초 단위 정밀 타이머
- 💀 원샷 데스 시스템
- 🏆 DataStore 최고 기록 저장
- 🌲 프리미엄 환경 (30그루 나무 + 고급 라이팅)

**개발 기간**: 4.5시간  
**기술 스택**: Rojo 7.6.1, Python 3, Lua/Luau

**주요 문서**:
- [PRD](./100_Ansible%20Logic%20Jump/doc/111_Forest_Sprint_Premium_PRD_Advanced.md)
- [디버깅 로그](./100_Ansible%20Logic%20Jump/doc/119_Debugging_Log_And_Lessons_Learned.md)
- [런칭 완료](./100_Ansible%20Logic%20Jump/doc/120_Launch_Completion_Celebration.md)

---

## 🏗 Core-Local Architecture

본 저장소는 **중앙 인프라(Core)**와 **개별 프로젝트(Local)**의 명확한 분리를 지향합니다.

*   **Core Hub (`/doc`)**: 전역 설정 및 툴 체인 가이드
*   **Localized Projects (`/100_...`)**: 실제 게임 구현 및 전용 문서

---

## 📂 Infrastructure Hub (`/doc`)

핵심 가이드라인:
*   [102_Setup_Guide](./doc/102_Roblox_Setup_and_AI_Integration_Guide.md): 맥북 프로 환경 구축
*   [111_MCP_Server](./doc/111_Roblox_Studio_MCP_Server_Execution_Guide.md): AI 연결
*   [112_Security_Settings](./doc/112_Roblox_Game_Settings_and_Publish_Guide.md): 보안 권한 설정
*   [117_Core_Architecture](./doc/117_Roblox_Project_Core_Architecture_Guide.md): 전체 구조 설명

---

## 🛠 Global Toolchain

표준 도구:
*   **Engine**: Roblox Studio
*   **Sync**: Rojo 7.6.1
*   **Quality**: Selene (Linter), StyLua (Formatter)
*   **AI Protocol**: Model Context Protocol (MCP)

---

## 📚 개발 환경 설정

### 프로젝트 시작하기
```bash
# 프로젝트 폴더로 이동
cd "100_Ansible Logic Jump"

# Rojo 서버 시작
./rojo serve

# 로블록스 스튜디오: Plugins → Rojo → Connect
```

---

## 🚀 다음 프로젝트

### 계획 중
- **메가 점프맵**: 100개+ 발판, 섹션별 난이도
- **협동 점프맵**: 멀티플레이 협동 기믹
- **스토리 어드벤처**: 퀘스트 기반 탐험

---

**Orchestrated by Antigravity System V3.0**  
**마지막 업데이트**: 2026-01-25  
**프로젝트 상태**: ✅ 1개 완료, 🔄 0개 진행 중
