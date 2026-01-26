# 📡 1000_Roblox: The Ansible Core Hub

> **"The central coordinates for all manifestations within the Roblox frontier."**

`1000_Roblox` is the top-level core repository that oversees the Roblox development infrastructure for **Ansible Station**.

---

## 🎮 Project Portfolio

### ✅ 100_Ansible Logic Jump - **LIVE ON ROBLOX** 🟢
**Status**: Launched (2026-01-25)

**Game Information**:
- **Official Name**: Ansible Jump 001
- **Developer**: @AnsibleMage
- **Genre**: Extreme Sky Jump Map / Time Attack
- **Server**: Up to 50 players

**Core Features**:
- 🏔️ 25 sky-high platforms (10~20m altitude)
- ⏱️ Precision timer (0.01s accuracy)
- 💀 One-hit death system
- 🏆 DataStore record tracking
- 🌲 Premium environment (30 multi-part trees + advanced lighting)

**Development Duration**: 4.5 hours  
**Tech Stack**: Rojo 7.6.1, Python 3, Lua/Luau

**Key Documents**:
- [PRD](./100_Ansible%20Logic%20Jump/doc/111_Forest_Sprint_Premium_PRD_Advanced.md)
- [Debugging Log](./100_Ansible%20Logic%20Jump/doc/119_Debugging_Log_And_Lessons_Learned.md)
- [Launch Complete](./100_Ansible%20Logic%20Jump/doc/120_Launch_Completion_Celebration.md)

---

### 🔄 200_Roblox_Fly_paper_plane - **In Development** 🟡
**Status**: Debugging boarding bug (2026-01-26)

**Game Information**:
- **Official Name**: Fly Paper Plane
- **Developer**: @AnsibleMage
- **Genre**: Paper Airplane Flight Simulation
- **Concept**: First-person flight control

**Core Features** (In Progress):
- ✈️ Paper airplane creation and boarding
- 🎮 WASD flight control
- 📷 First-person/third-person camera toggle
- ⚡ BodyVelocity/BodyGyro physics engine

**Current Issues**:
- Client-server synchronization problem
- VehicleSeat boarding logic bug

**Tech Stack**: Rojo 7.7.0-rc.1, Lua/Luau

**Key Documents**:
- [README](./200_Roblox_Fly_paper_plane/README.md)
- [PRD](./200_Roblox_Fly_paper_plane/doc/100_Product_PRD_Roblox_Fly_Paper_Plane.md)
- [Debugging Log](./200_Roblox_Fly_paper_plane/doc/150_Debugging_Log.md)

---

## 📖 Development Methodology (`/doc/Roblox_Dev Methodology`)

Custom development methodologies for Roblox:
- [VCR Methodology v1.1](./doc/Roblox_Dev%20Methodology/203_VCR_개발방법론_v1.1.md): Verify-Code-Refactor cycle
- [CJ AI Methodology v1.0](./doc/Roblox_Dev%20Methodology/202_CJ_AI_개발방법론_Roblox_v1.0.md): AI-collaborative development standard
- [Research Report](./doc/Roblox_Dev%20Methodology/200_Roblox_개발방법론_조사분석_보고서.md): Methodology analysis

**Templates**:
- [PRD Template](./doc/Roblox_Dev%20Methodology/204_Product_PRD_템플릿_Roblox.md)
- [Block Template](./doc/Roblox_Dev%20Methodology/205_Block_템플릿_Roblox.md)
- [Debugging Log Template](./doc/Roblox_Dev%20Methodology/206_Debugging_Log_템플릿_Roblox.md)

---

## 🏗 Core-Local Architecture

This repository maintains a clear separation between **central infrastructure (Core)** and **individual projects (Local)**.

*   **Core Hub (`/doc`)**: Global configuration and toolchain guides
*   **Localized Projects (`/100_...`)**: Actual game implementations and project-specific documentation

---

## 📂 Infrastructure Hub (`/doc`)

Essential guidelines:
*   [102_Setup_Guide](./doc/102_Roblox_Setup_and_AI_Integration_Guide.md): MacBook Pro environment setup
*   [111_MCP_Server](./doc/111_Roblox_Studio_MCP_Server_Execution_Guide.md): AI integration
*   [112_Security_Settings](./doc/112_Roblox_Game_Settings_and_Publish_Guide.md): Security permissions
*   [117_Core_Architecture](./doc/117_Roblox_Project_Core_Architecture_Guide.md): System architecture overview

---

## 🛠 Global Toolchain

Standard tools:
*   **Engine**: Roblox Studio
*   **Sync**: Rojo 7.6.1
*   **Quality**: Selene (Linter), StyLua (Formatter)
*   **AI Protocol**: Model Context Protocol (MCP)

---

## 📚 Development Setup

### Getting Started
```bash
# Navigate to project folder
cd "100_Ansible Logic Jump"

# Start Rojo server
./rojo serve

# In Roblox Studio: Plugins → Rojo → Connect
```

---

## 🚀 Upcoming Projects

### In Planning
- **Mega Jump Map**: 100+ platforms, sectioned difficulty
- **Co-op Jump Map**: Multiplayer cooperative mechanics
- **Story Adventure**: Quest-based exploration

---

**Orchestrated by Antigravity System V3.0**  
**Last Updated**: 2026-01-26  
**Project Status**: ✅ 1 Completed, 🔄 1 In Progress
