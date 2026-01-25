> **Original User Prompt**: "로블록스 스튜디오와 브이에스 코드를 설치했어 확인해줘 스튜디오는 로그인 해두었고 코드는 아직 로그인 전이야"

# 105_로블록스 프로젝트 스캐폴딩(Scaffolding) 가이드

## 1. 개요
로블록스 게임 개발의 기반이 되는 폴더 구조를 Rojo를 통해 생성했습니다. 이 구조는 VS Code에서 코드를 작성하고 로블록스 스튜디오로 실시간 동기화하기 위한 표준입니다.

## 2. 생성된 프로젝트 구조
현재 `/Users/changjaeyou/Documents/AnsibleMage/ansible_projects/1000_Roblox` 폴더에 다음과 같은 구조가 생성되었습니다.

*   **src/**: 실제 소스 코드가 들어가는 폴더
    *   **server/**: 서버측 스크립트 (ServerScriptService로 동기화)
    *   **client/**: 클라이언트측 스크립트 (StarterPlayerScripts 등으로 동기화)
    *   **shared/**: 양측 공용 모듈 스크립트 (ReplicatedStorage로 동기화)
*   **default.project.json**: Rojo 설정 파일. 폴더와 로블록스 게임 객체 간의 매핑을 정의합니다.
*   **README.md**: 프로젝트 기초 안내 파일.

## 3. VS Code 자동화 설정 (중요)
안티그래비티가 VS Code를 더 원활하게 제어하기 위해 다음 설정을 권장합니다.

1.  **VS Code 실행**
2.  `Cmd + Shift + P`를 눌러 명령 팔레트 열기
3.  **"Shell Command: Install 'code' command in PATH"** 검색 및 실행
    *   이 작업을 완료하시면 제가 터미널에서 `code .` 명령어로 프로젝트를 직접 열어드릴 수 있습니다.

## 4. Rojo 서버 실행 방법
터미널에서 다음 명령어를 입력하면 동기화 서버가 가동됩니다.
```bash
rojo serve
```
이후 로블록스 스튜디오에서 Rojo 플러그인을 열고 **Connect**를 누르면 VS Code와 연결됩니다.

## 5. 다음 단계
*   **106_Neon_Galaxy_Core_Scripts.md**: 실제 네온 발판과 리듬 로직을 담은 첫 번째 Luau 스크립트 작성을 시작하겠습니다.
