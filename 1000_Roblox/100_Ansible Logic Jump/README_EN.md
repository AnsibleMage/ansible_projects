# 🎮 Ansible Jump 001

> **Extreme Sky Platformer - LIVE ON ROBLOX** 🟢

---

## 📋 Game Info

**Official Name**: Ansible Jump 001
**Developer**: @AnsibleMage
**Genre**: Extreme Sky Platformer / Time Attack
**Status**: ✅ Launched (2026-01-25)
**Players**: Up to 50

---

## 🎮 Features

### Core Mechanics
- 🏔️ **25 Sky Platforms**: Extreme platforms at heights of 10–20m
- ⏱️ **Precision Timer**: Time attack with 0.01-second accuracy
- 💀 **One-Shot Death**: Fall = instant death + auto respawn
- 🏆 **Record System**: DataStore-based personal best tracking

### Premium Environment
- 🌲 30 multi-part trees (2 trunks + 3–5 leaf clusters each)
- ✨ Advanced lighting (Atmosphere, Bloom, SunRays)
- 🛤️ 60 path markers
- 🏁 Safe finish platform

---

## 🛠️ Tech Stack

- **Engine**: Roblox Studio
- **Sync**: Rojo 7.6.1
- **Scripts**: Lua/Luau
- **Automation**: Python 3
- **Quality**: Selene, StyLua

---

## 🚀 Local Development Setup

### Prerequisites
1. Roblox Studio (latest version)
2. Rojo 7.6.1+
3. Python 3.8+
4. Node.js (for robloxstudio-mcp)

### Running the Project
```bash
# Start Rojo server
./rojo serve

# Connect from Roblox Studio
# Plugins → Rojo → Connect

# Test in Play mode
```

---

## 📁 Project Structure

```
100_Ansible Logic Jump/
├── src/
│   ├── server/
│   │   ├── RaceEngine.server.lua      # Timer and record saving
│   │   └── DeathZone.server.lua       # Fall detection and respawn
│   ├── client/
│   │   └── TimerGui.client.luau       # UI timer display
│   └── shared/
├── doc/
│   ├── 111_Forest_Sprint_Premium_PRD_Advanced.md
│   ├── 119_Debugging_Log_And_Lessons_Learned.md
│   └── 120_Launch_Completion_Celebration.md
└── default.project.json               # Rojo project config
```

---

## 📚 Documentation

### Development Docs
- [111_Premium_PRD](./doc/111_Forest_Sprint_Premium_PRD_Advanced.md) - Product Requirements Document
- [112_Implementation_Roadmap](./doc/112_Implementation_Roadmap_Advanced.md) - Phase 1 Roadmap
- [113_Phase2_Enhancement](./doc/113_Phase2_Enhancement_Roadmap.md) - Phase 2 Paths & Platforms
- [116_Phase3_Extreme](./doc/116_Phase3_Extreme_Jump_Map_Roadmap.md) - Phase 3 Extreme Mode

### Reference Docs
- [119_Debugging_Log](./doc/119_Debugging_Log_And_Lessons_Learned.md) - Debugging Log & Lessons Learned
- [120_Launch_Completion](./doc/120_Launch_Completion_Celebration.md) - Launch Celebration
- [118_Launch_Guide](./doc/118_Roblox_Launch_Guide.md) - Roblox Publishing Guide

---

## 🎮 Gameplay

### How to Play
1. **Spawn**: Start high in the sky at Y=10
2. **Goal**: Jump across 25 platforms to reach the finish line
3. **Rules**:
   - Land precisely on each platform to advance
   - Fall = instant death → restart from the beginning
   - Beat your personal best!

### Difficulty
- **Start**: Lower platforms (Y=10)
- **Mid**: Gradually ascending
- **End**: Highest point (Y=20)

---

## 🔧 Development History

### Phase 1: Environment Setup ✅
- Premium forest environment
- Advanced lighting system
- Basic timer and track

### Phase 2: Jump Map Features ✅
- 60 path markers
- 15 jump platforms (initial)

### Phase 3: Extreme Jump Map ✅
- Expanded to 25 platforms
- Height range raised to 10–20m
- Death zone implementation
- Death/Respawn system

### Final Debugging ✅
- Rojo sync optimization
- KillBrick positioning adjustments
- Timer initialization logic
- Finish platform addition

**Total Development Time**: ~4.5 hours

---

## 🏆 Key Achievements

### Technical
- ✅ Mastered Rojo workflow
- ✅ Python automation (tree & platform generation)
- ✅ Server-client synchronization
- ✅ DataStore persistent record saving

### Game Design
- ✅ Quality-first development
- ✅ Incremental expansion (Phase 1→2→3)
- ✅ Polished gameplay
- ✅ Successful launch

---

## 📊 Final Stats

- **Platforms**: 25
- **Trees**: 30 (5–7 parts each)
- **Path Markers**: 60
- **Code**: 3 Lua scripts (225 lines)
- **Documentation**: 20 Markdown files

---

## 🚀 What's Next

### Short-term Improvements
- Friend invitations and feedback collection
- Difficulty balancing
- Play data analysis

### Mid-term Plans
- Checkpoint system
- Leaderboard UI
- Particle effects
- Background music

### Long-term Vision
- Mega jump map (100+ platforms)
- Dynamic gimmicks (moving/rotating platforms)
- Co-op multiplayer

---

## 👥 Credits

**Development**: @AnsibleMage
**AI Partner**: Antigravity System V3.0
**Platform**: Roblox
**Launch Date**: 2026-01-25

---

**"A 100-meter start builds the foundation for a 1,000-meter metaverse."**

**Powered by Antigravity V3.0** 🤖✨
