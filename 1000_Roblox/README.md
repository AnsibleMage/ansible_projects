# 🌌 Ansible Jump 001: Neon Galaxy

> **"The galaxy responds to the rhythm of the Ansible."**

본 프로젝트는 최첨단 AI 에이전트 **Antigravity(안티그래비티)**와 로블록스 스튜디오를 **MCP(Model Context Protocol)** 및 **Rojo**로 연동하여 '바이브 코딩(Vibe Coding)'을 실현한 차세대 점프맵 프로젝트입니다.

---

## 🚀 Key Features
*   **Vibe Coding Infrastructure**: AI가 직접 로블록스 월드 내 객체를 소소환하고 스크립팅하는 자동화 환경 구축.
*   **Rhythmic Architecture**: 서버 사이드 Luau 스크립트를 통한 동적 네온 갤럭시 환경 구현.
*   **Automated Toolchain**: Rojo 7.6.1, Selene, StyLua를 활용한 고효율 개발 워크플로우.

## 🛠 Technical Stack
*   **Core Engine**: [Roblox Studio](https://www.roblox.com/create)
*   **Sync Engine**: [Rojo 7.6.1](https://github.com/rojo-rbx/rojo)
*   **AI Protocol**: [Roblox Studio MCP Server](https://github.com/boshyxd/robloxstudio-mcp)
*   **Language**: [Luau](https://luau-lang.org/)
*   **Quality Tools**: [Selene](https://github.com/Kampfkarren/selene) (Linter), [StyLua](https://github.com/JohnnyMorganz/StyLua) (Formatter)

## 📂 Project Structure
*   `src/server`: 서버 사이드 게임 로직 및 리듬 스크립트.
*   `src/shared`: 서버와 클라이언트가 공유하는 데이터 및 모듈.
*   `doc/`: 100~116번 이상의 프로젝트 설계 및 연동 가이드라인 문서.

## ⚡ Getting Started (Developer Only)

### 1. Servers Up
로컬 환경에서 동기화 및 AI 연동 서버를 가동합니다:
```bash
./rojo serve           # Rojo Sync Server (Port 34872)
npx robloxstudio-mcp   # AI Bridge Server (Port 3002)
```

### 2. Studio Connect
1. Roblox Studio에서 `Ansible Jump 001` 플레이스를 엽니다.
2. **Plugins** 탭에서 **Rojo** 및 **MCP Integration**의 `Connect` 버튼을 클릭합니다.

---
**Maintained by Antigravity System V3.0 (Cognitive Orchestrator).**