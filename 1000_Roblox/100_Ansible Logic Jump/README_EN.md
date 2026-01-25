# 🎮 Ansible Jump 001

> **Extreme Sky Jump Map - LIVE ON ROBLOX** 🟢

---

## 📋 Game Information

**Official Name**: Ansible Jump 001  
**Developer**: @AnsibleMage  
**Genre**: Extreme Sky Jump Map / Time Attack  
**Status**: ✅ Launched (2026-01-25)  
**Max Players**: 50

---

## 🎯 Game Features

### Core Mechanics
- 🏔️ **25 Sky-High Platforms**: Extreme altitude platforms at 10~20m
- ⏱️ **Precision Timer**: Time attack with 0.01s accuracy
- 💀 **One-Hit Death**: Fall and die instantly + auto respawn
- 🏆 **Record Tracking**: DataStore-based personal best system

### Premium Environment
- 🌲 30 multi-part trees (2 Trunks + 3~5 Leaves each)
- ✨ Advanced Lighting (Atmosphere, Bloom, SunRays)
- 🛤️ 60 Path Markers
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

# Connect in Roblox Studio
# Plugins → Rojo → Connect

# Test in Play mode
```

---

## 📁 Project Structure

```
100_Ansible Logic Jump/
├── src/
│   ├── server/
│   │   ├── RaceEngine.server.lua      # Timer & record saving
│   │   └── DeathZone.server.lua       # Fall detection & respawn
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

## 📚 Key Documentation

### Development Docs
- [111_Premium_PRD](./doc/111_Forest_Sprint_Premium_PRD_Advanced.md) - Product Requirements
- [112_Implementation_Roadmap](./doc/112_Implementation_Roadmap_Advanced.md) - Phase 1 Roadmap
- [113_Phase2_Enhancement](./doc/113_Phase2_Enhancement_Roadmap.md) - Phase 2 Path/Platforms
- [116_Phase3_Extreme](./doc/116_Phase3_Extreme_Jump_Map_Roadmap.md) - Phase 3 Extreme Mode

### Reference Docs
- [119_Debugging_Log](./doc/119_Debugging_Log_And_Lessons_Learned.md) - Debugging Log & Lessons
- [120_Launch_Completion](./doc/120_Launch_Completion_Celebration.md) - Launch Celebration
- [118_Launch_Guide](./doc/118_Roblox_Launch_Guide.md) - Roblox Publishing Guide

---

## 🎮 Gameplay

### How to Play
1. **Spawn**: Start at Y=10 high in the sky
2. **Objective**: Jump across 25 platforms to reach the finish line
3. **Rules**: 
   - Land precisely on each platform
   - Fall = instant death → restart from beginning
   - Challenge for the best record!

### Difficulty
- **Start**: Lower platforms (Y=10)
- **Mid-game**: Progressive ascent
- **Final**: Peak altitude (Y=20)

---

## 🔧 Development History

### Phase 1: Environment Setup ✅
- Premium forest environment
- Advanced lighting system
- Basic timer & track

### Phase 2: Jump Map Features ✅
- 60 path markers
- 15 jump platforms (initial)

### Phase 3: Extreme Jump Map ✅
- Expanded to 25 platforms
- Elevated to 10~20m altitude
- Death zone implementation
- Death/Respawn system

### Final Debugging ✅
- Rojo sync optimization
- KillBrick position adjustment
- Timer reset logic
- Finish platform addition

**Total Development Time**: ~4.5 hours

---

## 🏆 Key Achievements

### Technical Achievements
- ✅ Rojo workflow mastery
- ✅ Python automation (trees, platforms generation)
- ✅ Server-client synchronization
- ✅ DataStore persistent record storage

### Game Design Achievements
- ✅ Quality-first development
- ✅ Phased expansion (Phase 1→2→3)
- ✅ Perfect gameplay experience
- ✅ Successful launch

---

## 📊 Final Statistics

- **Platforms**: 25
- **Trees**: 30 (5~7 parts each)
- **Path Markers**: 60
- **Code**: 3 Lua scripts (225 lines)
- **Documentation**: 20 markdown files

---

## 🚀 Next Steps

### Short-term Improvements
- Friend invites & feedback collection
- Difficulty balancing
- Play data analysis

### Mid-term Plans
- Checkpoint system
- Leaderboard UI
- Particle effects
- Background music

### Long-term Vision
- Mega jump map (100+ platforms)
- Various mechanics (moving/rotating platforms)
- Cooperative multiplayer

---

## 👥 Credits

**Developer**: @AnsibleMage  
**AI Partner**: Antigravity System V3.0  
**Platform**: Roblox  
**Launch Date**: 2026-01-25

---

**"A 100-meter start becomes the foundation of a 1000-meter metaverse."**

**Powered by Antigravity V3.0** 🤖✨
